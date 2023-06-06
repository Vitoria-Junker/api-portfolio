import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage';
import dotenv from 'dotenv';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATA_BASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: 'gs://portfolio-vitoria.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { app, storage };