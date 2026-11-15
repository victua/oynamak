// Public web config for the Oynamak Firebase web app. These values are not secret.
export const firebaseConfig = {
  apiKey: 'AIzaSyAcNuBDhh0N_IFhaydqc3WgqwSJKOMxFUw',
  authDomain: 'tungacoke.firebaseapp.com',
  projectId: 'tungacoke',
  storageBucket: 'tungacoke.firebasestorage.app',
  messagingSenderId: '934867984633',
  appId: '1:934867984633:web:0a28158b899b0e2f2f0228',
};
/** Team sign-in runs on the Firebase project above. Data lives in the "oynamak" Firestore database in gonogasport. */
export const authConfigured = Boolean(firebaseConfig.apiKey);
/** Local development only: skip sign-in when PORTAL_DEV_BYPASS=1. Never honoured in production. */
export const devBypass = process.env.NODE_ENV !== 'production' && process.env.PORTAL_DEV_BYPASS === '1';
