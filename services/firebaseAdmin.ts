import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from '../fisherman-s-diary-firebase-adminsdk-sckjl-fdfb7a638b.json';

if (!firebaseAdmin.apps.length) {
  try {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        projectId: process.env.FIREBASE_PROJECT_ID,
      }),
      databaseURL: 'https://fisherman-s-diary.firebaseio.com',
    });
  } catch (error) {
    if (!/already exists/u.test(error.message)) {
      console.error('Firebase admin initialization error', error.stack);
    }
  }

  console.log(firebaseAdmin.app().name);
}

export default firebaseAdmin.firestore();
