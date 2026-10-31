import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { getFirebaseApp } from './firebase';

export const getFirebaseAuth = () => getAuth(getFirebaseApp());

export const signInWithGoogle = async (): Promise<void> => {
  await signInWithPopup(getFirebaseAuth(), new GoogleAuthProvider());
};

export const signOutUser = async (): Promise<void> => {
  await firebaseSignOut(getFirebaseAuth());
};
