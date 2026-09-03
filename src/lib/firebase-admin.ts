// Firebase Admin SDK — server-side only (API routes, server components).
// Never import this from a "use client" module.
//
// Credentials resolve in this order:
//   1. FIREBASE_SERVICE_ACCOUNT_KEY  — JSON blob, for CI or non-Google hosts
//   2. Application Default Credentials — Firebase App Hosting / Cloud Run in
//      production, and `gcloud auth application-default login` locally.

import { initializeApp, getApps, cert, applicationDefault, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { FIRESTORE_DATABASE_ID } from './firebase-config';

const PROJECT_ID = 'tungacoke';

function credential() {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (raw) {
        try {
            return cert(JSON.parse(raw));
        } catch {
            throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is set but is not valid JSON.');
        }
    }
    return applicationDefault();
}

const adminApp: App = getApps().length
    ? getApps()[0]
    : initializeApp({ credential: credential(), projectId: PROJECT_ID });

export const adminAuth = getAuth(adminApp);

// `tungacoke` is shared: Oynamak lives in its own named database, never (default).
export const adminDb = getFirestore(adminApp, FIRESTORE_DATABASE_ID);

export { adminApp };
