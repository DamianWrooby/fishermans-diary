import firebase from 'firebase/app';
import 'firebase/auth';

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
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.FIREBASE_DB_URL}`,
  projectId: 'fisherman-s-diary',
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const fbProvider = new firebase.auth.FacebookAuthProvider();

export const fbAuth = (): unknown => {
  return firebase.auth().signInWithPopup(fbProvider);
};

export const { auth } = firebase;
