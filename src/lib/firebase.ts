// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDcbaue733LFaYoc8xqeQSdMNHrAaT_Zyo",
    authDomain: "oaktreekenya.firebaseapp.com",
    projectId: "oaktreekenya",
    storageBucket: "oaktreekenya.firebasestorage.app",
    messagingSenderId: "715846352814",
    appId: "1:715846352814:web:313a5f895d7e2248af523f",
    measurementId: "G-LSXZY3GYMD"
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

// Initialize Firestore
db = getFirestore(app);

// Initialize Storage
storage = getStorage(app);

export { app, analytics, auth, db, storage };
