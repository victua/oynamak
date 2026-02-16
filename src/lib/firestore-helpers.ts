// Firestore helper functions for common database operations

import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    DocumentData,
    QueryConstraint
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Get a single document by ID
 */
export async function getDocument(collectionName: string, docId: string) {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting document:', error);
        throw error;
    }
}

/**
 * Get all documents from a collection
 */
export async function getDocuments(collectionName: string, constraints: QueryConstraint[] = []) {
    try {
        const collectionRef = collection(db, collectionName);
        const q = constraints.length > 0 ? query(collectionRef, ...constraints) : collectionRef;
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting documents:', error);
        throw error;
    }
}

/**
 * Add a new document to a collection
 */
export async function addDocument(collectionName: string, data: DocumentData) {
    try {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, {
            ...data,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });

        return docRef.id;
    } catch (error) {
        console.error('Error adding document:', error);
        throw error;
    }
}

/**
 * Update an existing document
 */
export async function updateDocument(collectionName: string, docId: string, data: DocumentData) {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });

        return true;
    } catch (error) {
        console.error('Error updating document:', error);
        throw error;
    }
}

/**
 * Delete a document
 */
export async function deleteDocument(collectionName: string, docId: string) {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);

        return true;
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
}

// Export query helpers for convenience
export { where, orderBy, limit };
