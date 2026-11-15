import 'server-only';
import { getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { firebaseConfig } from './firebase-config';

/** Firestore lives in gonogasport (database "oynamak"). */
export const adminApp = () => getApps().find((a) => a.name === 'oynamak') ?? initializeApp({ projectId: process.env.GOOGLE_CLOUD_PROJECT || 'gonogasport' }, 'oynamak');
/** Sign-in tokens are issued by the Firebase project in firebase-config. Checking them needs no secret. */
export const adminAuth = () => getAuth(getApps().find((a) => a.name === 'oynamak-auth') ?? initializeApp({ projectId: firebaseConfig.projectId }, 'oynamak-auth'));
