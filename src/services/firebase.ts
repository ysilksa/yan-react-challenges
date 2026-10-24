import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const requiredEnv = (name: keyof ImportMetaEnv): string => {
  const value = import.meta.env[name];

  if (!value) {
    throw new Error(`Missing required Firebase configuration: ${name}`);
  }

  return value;
};

export const getFirebaseDb = () => {
  const app =
    getApps().length > 0
      ? getApp()
      : initializeApp({
          apiKey: requiredEnv('VITE_FIREBASE_API_KEY'),
          authDomain: requiredEnv('VITE_FIREBASE_AUTH_DOMAIN'),
          projectId: requiredEnv('VITE_FIREBASE_PROJECT_ID'),
          storageBucket: requiredEnv('VITE_FIREBASE_STORAGE_BUCKET'),
          messagingSenderId: requiredEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
          appId: requiredEnv('VITE_FIREBASE_APP_ID'),
        });

  return getFirestore(app);
};
