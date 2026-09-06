'use client';

/**
 * Browser-side image downscaling, shared by the in-place page editor
 * (src/components/site/Editable.tsx) and the events console.
 *
 * Images are stored as data URLs on the document that uses them rather than in
 * a separate storage bucket, which keeps them under the same Firestore rules
 * as the record they belong to. That only works if they stay comfortably
 * inside Firestore's 1MB document limit, which is what this enforces.
 */

const MAX_EDGE = 1600;
const START_QUALITY = 0.82;
const MAX_BYTES = 700 * 1024;

function loadImageFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        // document.createElement, not `new Image()` — next/image owns the
        // name `Image` in the modules that call this.
        const img = document.createElement('img');
        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Could not read that image file.'));
        };
        img.src = url;
    });
}

export function dataUrlBytes(dataUrl: string): number {
    const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
    return Math.ceil(base64.length * 0.75);
}

/** Downscale to <=1600px max edge, JPEG q0.82, stepping down until <=700KB. */
export async function downscaleToDataUrl(file: File): Promise<string> {
    const img = await loadImageFile(file);
    let maxEdge = MAX_EDGE;
    let quality = START_QUALITY;
    let dataUrl = '';

    for (let i = 0; i < 12; i++) {
        const scale = Math.min(1, maxEdge / Math.max(img.naturalWidth, img.naturalHeight));
        const w = Math.max(1, Math.round(img.naturalWidth * scale));
        const h = Math.max(1, Math.round(img.naturalHeight * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context unavailable');
        ctx.fillStyle = '#FFFFFF'; // JPEG has no alpha; flatten transparency onto white
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        dataUrl = canvas.toDataURL('image/jpeg', quality);
        if (dataUrlBytes(dataUrl) <= MAX_BYTES) return dataUrl;
        if (quality > 0.45) quality = Math.max(0.4, quality - 0.1);
        else maxEdge = Math.round(maxEdge * 0.8);
    }
    return dataUrl; // best effort after 12 passes
}
