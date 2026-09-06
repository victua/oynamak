'use client';

/**
 * Editable primitives for the public site (see src/lib/content/ContentEdit.tsx
 * for the data layer and a full usage example).
 *
 *   <EText k="hero.title" fallback="Shipped copy" as="h1" className="..." />
 *   <EImage k="hero.photo" fallbackSrc="/oaktree1.jpeg" alt="..." fill />
 *
 * Both must be rendered inside a <PageContent id="..."> wrapper. For everyone
 * except an admin with edit mode ON they render exactly like plain text / a
 * plain image — zero visual difference from the shipped markup.
 *
 * Admin + edit mode ON:
 *   EText  — dashed gold outline on hover, contentEditable in place. Enter or
 *            blur saves, Escape cancels. Multi-line (the default for as="p",
 *            or via the `multiline` prop): Shift+Enter inserts a newline.
 *   EImage — dashed gold outline plus a "Replace image" button. Picked files
 *            are downscaled in the browser (max edge 1600px, JPEG q0.82,
 *            stepped down until <= 700KB, comfortably inside Firestore's 1MB
 *            document limit) and stored as a data URL in images/{pageId}__{key}.
 *
 * EImage renders next/image, so the shipped artwork keeps its responsive
 * srcset and lazy loading. Only an admin's freshly replaced image bypasses the
 * optimizer, because a data: URL has nothing for it to fetch — and the next
 * build's content snapshot turns that data URL back into a real file under
 * /cms/, which is optimized like any other.
 */

import Image from 'next/image';
import {
    useRef,
    useState,
    type CSSProperties,
    type FocusEvent,
    type KeyboardEvent,
    type MouseEvent,
    type ReactNode,
} from 'react';
import { downscaleToDataUrl } from '@/lib/image-downscale';
import {
    saveImageDoc,
    snapshotImageSrc,
    useEditMode,
    useImageDoc,
    usePageContent,
} from '@/lib/content/ContentEdit';

/* ────────────────────────────────────────────────────────────────────────
 * EText
 * ──────────────────────────────────────────────────────────────────────── */

type ETextTag =
    | 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'blockquote' | 'figcaption' | 'li' | 'strong' | 'small';

export interface ETextProps {
    /** Content key (dot-path, e.g. "hero.title") within the page's content doc. */
    k: string;
    /** Shipped copy — rendered until the key is edited in Firestore. */
    fallback: string;
    /** Rendered tag. Defaults to span (inline, style-neutral). */
    as?: ETextTag;
    className?: string;
    style?: CSSProperties;
    /** Allow newlines (Shift+Enter). Defaults to true when as="p". */
    multiline?: boolean;
    /**
     * Optional display-only renderer for the saved value (e.g. splitting a
     * headline across colours). Editing always operates on the plain string.
     */
    renderValue?: (value: string) => ReactNode;
}

export function EText({ k, fallback, as = 'span', className, style, multiline, renderValue }: ETextProps) {
    const { get, set } = usePageContent();
    const { editing } = useEditMode();
    const value = get(k, fallback);
    const allowNewlines = multiline ?? as === 'p';

    const cancelledRef = useRef(false);
    const [saving, setSaving] = useState(false);

    const Tag = as;
    // Edited copy may contain newlines; pre-line renders them while leaving
    // single-line fallbacks pixel-identical to the shipped markup.
    const mergedStyle: CSSProperties | undefined =
        value.includes('\n') || allowNewlines ? { whiteSpace: 'pre-line', ...style } : style;

    const commit = async (el: HTMLElement) => {
        const raw = el.innerText.replace(/\u00A0/g, ' '); // contentEditable inserts nbsp
        const next = (allowNewlines ? raw.replace(/\n+$/, '') : raw.replace(/\n/g, ' ')).trim();
        if (next === value || next === '') {
            // No change, or emptied out — treat as a cancel so copy cannot vanish.
            el.innerText = value;
            return;
        }
        setSaving(true);
        try {
            await set(k, next);
        } catch (error) {
            console.error(`ContentEdit: failed to save "${k}"`, error);
            el.innerText = value; // roll back on a permission or network failure
        } finally {
            setTimeout(() => setSaving(false), 350); // brief, visible pulse
        }
    };

    const onBlur = (e: FocusEvent<HTMLElement>) => {
        if (cancelledRef.current) {
            cancelledRef.current = false;
            return;
        }
        void commit(e.currentTarget);
    };

    const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Escape') {
            cancelledRef.current = true;
            e.currentTarget.innerText = value;
            e.currentTarget.blur();
            return;
        }
        if (e.key === 'Enter' && !(allowNewlines && e.shiftKey)) {
            e.preventDefault();
            e.currentTarget.blur(); // the blur handler saves
        }
    };

    // Text inside a link or a button (an accordion trigger, say): swallow the
    // navigation or toggle while editing and focus the text instead — the
    // caret goes to the end, arrow keys from there.
    const onClick = (e: MouseEvent<HTMLElement>) => {
        const el = e.currentTarget;
        if (el.closest('a, button, [role="button"]')) {
            e.preventDefault();
            e.stopPropagation();
            el.focus();
            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
        }
    };

    if (!editing) {
        return (
            <Tag className={className} style={mergedStyle}>
                {renderValue ? renderValue(value) : value}
            </Tag>
        );
    }

    return (
        <Tag
            // Remount when the saved value changes so React never has to
            // reconcile text nodes the browser rewrote during typing.
            key={value}
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onClick={onClick}
            className={[
                className,
                'cursor-text rounded-sm outline-dashed outline-1 outline-offset-4 outline-transparent',
                'transition-[outline-color,opacity] duration-150',
                'hover:outline-accent focus:outline focus:outline-accent',
                saving ? 'animate-pulse opacity-60' : '',
            ]
                .filter(Boolean)
                .join(' ')}
            style={mergedStyle}
        >
            {value}
        </Tag>
    );
}

/* ────────────────────────────────────────────────────────────────────────
 * EImage
 * ──────────────────────────────────────────────────────────────────────── */

export interface EImageProps {
    /** Content key; the content doc stores the image doc id under this key. */
    k: string;
    /** Shipped image, used until an admin replaces it. */
    fallbackSrc: string;
    alt: string;
    className?: string;
    style?: CSSProperties;
    /**
     * Fill the nearest positioned ancestor, like next/image's `fill`. Use it
     * wherever the design already wraps the image in a `relative` box.
     */
    fill?: boolean;
    width?: number;
    height?: number;
    /** Hint for the browser; only meaningful when `fill` is set. */
    sizes?: string;
    priority?: boolean;
    /**
     * Read and write this exact images/{docId} doc instead of the page-scoped
     * one, so several pages can share one image (e.g. a site-wide hero photo).
     * Replacing it from any page updates them all.
     */
    sharedDocId?: string;
}

export function EImage({
    k,
    fallbackSrc,
    alt,
    className,
    style,
    fill,
    width,
    height,
    sizes,
    priority,
    sharedDocId,
}: EImageProps) {
    const { pageId, get, set } = usePageContent();
    const { editing } = useEditMode();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [busy, setBusy] = useState(false);

    const imageDocId = sharedDocId ?? get(k, '');
    const dataUrl = useImageDoc(imageDocId);
    // Live doc → build-time static extraction of that doc → shipped file.
    const src = dataUrl ?? snapshotImageSrc(imageDocId) ?? fallbackSrc;

    const onPick = async (file: File) => {
        setBusy(true);
        try {
            const url = await downscaleToDataUrl(file);
            const docId = sharedDocId ?? `${pageId}__${k}`;
            await saveImageDoc(docId, url);
            if (!sharedDocId) await set(k, docId); // content doc points at the image doc
        } catch (error) {
            console.error(`ContentEdit: failed to replace image "${k}"`, error);
        } finally {
            setBusy(false);
        }
    };

    const imgClass = [
        className,
        editing ? 'outline-dashed outline-1 outline-offset-4 outline-accent/70' : '',
        editing && busy ? 'animate-pulse opacity-60' : '',
    ]
        .filter(Boolean)
        .join(' ');

    // A data: URL is the image an admin just picked, held in Firestore until
    // the next build snapshots it to a file. There is nothing for the image
    // optimizer to fetch, so that one case renders unoptimized.
    const common = {
        src,
        alt,
        className: imgClass,
        style,
        priority,
        unoptimized: src.startsWith('data:'),
    };

    const img = fill
        ? <Image {...common} fill sizes={sizes} />
        : <Image {...common} width={width ?? 1200} height={height ?? 800} />;

    if (!editing) return img;

    const controls = (
        <>
            <button
                type="button"
                disabled={busy}
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    inputRef.current?.click();
                }}
                className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-accent px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground shadow-lg transition hover:brightness-95 disabled:opacity-70"
            >
                {busy ? 'Saving…' : 'Replace image'}
            </button>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    e.target.value = ''; // allow re-picking the same file
                    if (file) void onPick(file);
                }}
            />
        </>
    );

    // In fill mode the parent is already the positioning context, so the
    // button joins the image there rather than inside a wrapper that would
    // collapse to zero height.
    if (fill) {
        return (
            <>
                {img}
                {controls}
            </>
        );
    }

    return (
        <span className="relative inline-block align-top">
            {img}
            {controls}
        </span>
    );
}
