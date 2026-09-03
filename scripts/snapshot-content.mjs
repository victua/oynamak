#!/usr/bin/env node
// Build-time CMS snapshot. Runs before `next build` via the npm "prebuild"
// hook.
//
// The public site's copy is editable in Firestore (content/{pageId} docs,
// images/{docId} docs — see src/lib/content/ContentEdit.tsx). Loading that
// client-side alone means the FIRST paint shows the hardcoded fallbacks and
// then flashes to the edited copy. This script bakes the edited content into
// the build instead:
//
//   src/lib/content/content-snapshot.json   { pages, images }
//   public/cms/<docId>.jpg                  decoded image docs, as real files
//
// ContentEdit uses the snapshot as its initial state, so the first paint IS
// the last-published copy; the live subscription still applies newer edits
// after hydration. Failure-safe: if Firestore cannot be reached, an existing
// snapshot is kept rather than clobbered with an empty one, so a network
// blip during a deploy never reverts the site to its fallbacks.
//
// Both collections are world-readable by rules, so these REST reads only need
// the public web API key — no service account, which is why this can run in
// any build environment.

import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SNAPSHOT_PATH = join(ROOT, 'src/lib/content/content-snapshot.json');
const CMS_DIR = join(ROOT, 'public/cms');

const PROJECT = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'tungacoke';
// `tungacoke` is shared; Oynamak's data lives in its own named database.
// Kept in step with src/lib/firebase-config.ts.
const DATABASE = 'oynamak';
const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyAcNuBDhh0N_IFhaydqc3WgqwSJKOMxFUw';
const BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/${DATABASE}/documents`;

/** List every doc in a collection (handles paging). */
async function listDocs(collection) {
    const docs = [];
    let pageToken = '';
    do {
        const url = `${BASE}/${collection}?pageSize=300&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`${collection}: HTTP ${res.status} ${await res.text()}`);
        const body = await res.json();
        for (const d of body.documents ?? []) docs.push(d);
        pageToken = body.nextPageToken ?? '';
    } while (pageToken);
    return docs;
}

/** Firestore REST field → plain string (only strings matter to the CMS). */
function stringFields(doc) {
    const out = {};
    for (const [k, v] of Object.entries(doc.fields ?? {})) {
        if (typeof v.stringValue === 'string') out[k] = v.stringValue;
    }
    return out;
}

function docId(doc) {
    return decodeURIComponent(doc.name.split('/').pop());
}

/** "home__hero.image" → a filesystem-safe basename. */
function safeName(id) {
    return id.replace(/[^a-zA-Z0-9._-]/g, '_');
}

try {
    const [contentDocs, imageDocs] = await Promise.all([listDocs('content'), listDocs('images')]);

    const pages = {};
    for (const d of contentDocs) pages[docId(d)] = stringFields(d);

    mkdirSync(CMS_DIR, { recursive: true });
    const images = {};
    for (const d of imageDocs) {
        const id = docId(d);
        const dataUrl = d.fields?.dataUrl?.stringValue;
        if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) continue;
        const match = /^data:image\/(\w+);base64,(.+)$/s.exec(dataUrl);
        if (!match) continue;
        const ext = match[1] === 'jpeg' ? 'jpg' : match[1];
        const file = `${safeName(id)}.${ext}`;
        writeFileSync(join(CMS_DIR, file), Buffer.from(match[2], 'base64'));
        images[id] = `/cms/${file}`;
    }

    writeFileSync(SNAPSHOT_PATH, `${JSON.stringify({ pages, images }, null, 1)}\n`);
    console.log(
        `content snapshot: ${Object.keys(pages).length} pages, ${Object.keys(images).length} images → src/lib/content/content-snapshot.json + public/cms/`,
    );
} catch (err) {
    if (existsSync(SNAPSHOT_PATH)) {
        const prev = JSON.parse(readFileSync(SNAPSHOT_PATH, 'utf8'));
        console.warn(
            `content snapshot: fetch failed (${err.message}); keeping existing snapshot (${Object.keys(prev.pages ?? {}).length} pages)`,
        );
    } else {
        writeFileSync(SNAPSHOT_PATH, `${JSON.stringify({ pages: {}, images: {} }, null, 1)}\n`);
        console.warn(`content snapshot: fetch failed (${err.message}); wrote empty snapshot`);
    }
}
