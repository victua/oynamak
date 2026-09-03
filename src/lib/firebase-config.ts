// Shared between the client SDK (src/lib/firebase.ts) and the Admin SDK
// (src/lib/firebase-admin.ts) so the two can never drift apart.
//
// `tungacoke` is a shared Firebase project whose (default) database belongs to
// other products. Oynamak has its own named database.
export const FIRESTORE_DATABASE_ID = 'oynamak';
