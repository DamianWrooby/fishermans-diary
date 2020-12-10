import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let db;
interface firebaseConfiguration {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig: firebaseConfiguration = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: 'fisherman-s-diary',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  db = firebase.firestore();
}

const fbProvider = new firebase.auth.FacebookAuthProvider();
const gProvider = new firebase.auth.GoogleAuthProvider();

export const createUser = (email, password): unknown => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

export const resetPassword = (email): unknown => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const emailAuth = (email, password): unknown => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const fbAuth = (): unknown => {
  return firebase.auth().signInWithPopup(fbProvider);
};

export const gAuth = (): unknown => {
  return firebase.auth().signInWithPopup(gProvider);
};

export const signOut = (): unknown => {
  return firebase.auth().signOut();
};

export const deleteUser = (): unknown => {
  return firebase.auth().currentUser.delete();
};

export const { auth } = firebase;
export { db };
