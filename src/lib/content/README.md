# Editing the public site

An admin edits the marketing pages on the pages themselves. Sign in, open any
public page, and a **Edit page** button appears at the bottom right. Click it,
then click any text to type over it or hover any image for a **Replace image**
button. Changes save as you go and everyone sees them immediately — there is no
publish step and no deploy.

Nobody else sees the button. It is gated on the signed-in user's role being
`admin`, and Firestore's rules independently reject a write from anyone else,
so the gate is not just cosmetic.

## Keyboard

| Key                    | Does                                  |
| ---------------------- | ------------------------------------- |
| `Enter`                | Save and stop editing that field      |
| `Shift` + `Enter`      | Line break (in paragraphs)            |
| `Esc`                  | Cancel, restore the previous text     |
| Click elsewhere        | Save                                  |

Emptying a field cancels rather than saves, so copy cannot be deleted by
accident. To remove a section, remove it from the page component.

## Where the copy lives

| Layer | What it is |
| ----- | ---------- |
| `fallback` in the page component | The shipped copy. Renders until someone edits that key. |
| `content/{pageId}` in Firestore | Every edit, as `key → string`. Wins over the fallback. |
| `content-snapshot.json` | Build-time copy of the above, so the first paint is the edited text rather than a flash of the fallback. |

Images work the same way: `images/{pageId}__{key}` holds the replaced image as
a data URL (downscaled in the browser to stay well inside Firestore's 1MB
document limit), and `npm run build` writes it out to a real file under
`public/cms/` so Next can optimize it like any other image.

## Which pages are wired up

`/`, `/about`, `/solutions`, the five `/solutions/*` pages, `/events`,
`/contact` and `/get-started`. `src/lib/site-pages.ts` records this in each
page's `contentId`, and the admin console's Website tab lists it.

Blog posts are not part of this — they have their own editor at
**/ops/website → Blog Posts**.

A few strings are deliberately *not* editable: form field labels, the "Area of
Interest" options on `/get-started` (an option's label is also the value stored
on the lead), and every link destination. Editing changes what a page says,
never where it sends people or what it records.

## Wiring up a new page

```tsx
'use client';
import { PageContent } from '@/lib/content/ContentEdit';
import { EText, EImage } from '@/components/site/Editable';

export default function Page() {
  return (
    <PageContent id="my-page">
      <EText k="hero.title" fallback="Shipped headline" as="h1" className="..." />
      <EText k="hero.body" fallback="Shipped paragraph." as="p" />
      <EImage k="hero.photo" fallbackSrc="/photo.jpeg" alt="..." fill sizes="100vw" />
    </PageContent>
  );
}
```

Then add `contentId: 'my-page'` to the page's row in `src/lib/site-pages.ts`.
For a list, key by index: ``k={`items.${i}.title`}``. Keep the array itself in
the component — an editor changes the words, not how many cards there are.

## The pieces

| File | Does |
| ---- | ---- |
| `ContentEdit.tsx` | Firestore reads and writes, edit-mode state |
| `../../components/site/Editable.tsx` | `EText` and `EImage` |
| `../../components/site/EditToolbar.tsx` | The "Edit page" button |
| `../../../scripts/snapshot-content.mjs` | Build-time snapshot (npm `prebuild`) |
| `../../../firestore.rules` | World-readable, admin-writable |
