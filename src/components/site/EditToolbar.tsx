'use client';

/**
 * Floating "Edit page" toggle for the public site. Mounted once in
 * src/app/layout.tsx inside <EditModeProvider>. It renders nothing for
 * signed-out visitors, clients and staff — only an admin ever sees it — and
 * nothing inside the two portals, which have their own editors.
 */

import { usePathname } from 'next/navigation';
import { Pencil } from 'lucide-react';
import { useEditMode } from '@/lib/content/ContentEdit';

/** Routes that are applications rather than marketing pages. */
const HIDDEN_PREFIXES = ['/ops', '/login'];

export function EditToolbar() {
    const pathname = usePathname() ?? '/';
    const { editing, setEditing, canEdit } = useEditMode();

    if (!canEdit) return null;
    if (HIDDEN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`))) {
        return null;
    }

    return (
        <div className="fixed bottom-5 right-5 z-[90] print:hidden">
            {editing ? (
                <div className="flex items-center gap-3 rounded-full bg-primary py-1.5 pl-4 pr-1.5 text-primary-foreground shadow-lg">
                    <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/85">
                        Editing — click any outlined text
                    </span>
                    <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="rounded-full bg-accent px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-accent-foreground transition hover:brightness-95"
                    >
                        Done
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground shadow-lg transition hover:bg-primary/90"
                >
                    <Pencil className="h-3.5 w-3.5" /> Edit page
                </button>
            )}
        </div>
    );
}
