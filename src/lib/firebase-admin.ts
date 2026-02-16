// Firebase Admin SDK for server-side operations
// This file is for server-side Firebase operations (API routes, server components, etc.)

import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let adminApp: App;

// Initialize Firebase Admin
if (!getApps().length) {
    // In production, use service account credentials
    // For now, we'll use application default credentials
    adminApp = initializeApp({
        projectId: 'oaktreekenya',
    });
} else {
    adminApp = getApps()[0];
}

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export { adminApp };
