import { doc, getDoc } from 'firebase/firestore';
import { getFirebaseDb } from './firebase';

export const getAdminStatus = async (uid: string): Promise<boolean> => {
  const adminSnapshot = await getDoc(doc(getFirebaseDb(), 'admins', uid));

  if (!adminSnapshot.exists()) {
    return false;
  }

  const data: unknown = adminSnapshot.data();

  return (
    typeof data === 'object' &&
    data !== null &&
    'role' in data &&
    data.role === 'admin'
  );
};
