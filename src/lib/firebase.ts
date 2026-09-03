// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { FIRESTORE_DATABASE_ID } from "./firebase-config";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcNuBDhh0N_IFhaydqc3WgqwSJKOMxFUw",
    authDomain: "tungacoke.firebaseapp.com",
    projectId: "tungacoke",
    storageBucket: "tungacoke.firebasestorage.app",
    messagingSenderId: "934867984633",
    appId: "1:934867984633:web:ae63eaf3d2f85a082f0228",
    measurementId: "G-56W6PHQBEV"
};

// Initialize Firebase (singleton pattern to avoid multiple initializations)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase services
let analytics: Analytics | null = null;
let auth: Auth;
let db: Firestore;
let storage: FirebaseStorage;

// Initialize Analytics only on client side
if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

// Initialize Auth
auth = getAuth(app);

// Initialize Firestore.
// `tungacoke` is a shared project: the (default) database belongs to other
// products (Isura et al). Oynamak has its own named database.
db = getFirestore(app, FIRESTORE_DATABASE_ID);

// Initialize Storage
storage = getStorage(app);

export { app, analytics, auth, db, storage };
