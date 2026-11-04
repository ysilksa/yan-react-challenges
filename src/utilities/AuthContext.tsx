import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { getAdminStatus } from '../services/admin';
import { getFirebaseAuth } from '../services/auth';

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;
    let requestId = 0;

    try {
      const unsubscribe = onAuthStateChanged(
        getFirebaseAuth(),
        (authenticatedUser) => {
          const currentRequestId = ++requestId;

          setUser(authenticatedUser);
          setIsAdmin(false);
          setAuthError(null);

          if (!authenticatedUser) {
            setIsLoading(false);
            return;
          }

          setIsLoading(true);

          void getAdminStatus(authenticatedUser.uid)
            .then((authenticatedUserIsAdmin) => {
              if (isActive && currentRequestId === requestId) {
                setIsAdmin(authenticatedUserIsAdmin);
              }
            })
            .catch((error: unknown) => {
              if (isActive && currentRequestId === requestId) {
                console.error('Unable to verify administrator access.', error);
                setAuthError(
                  'Unable to verify administrator access. Course editing is disabled.',
                );
              }
            })
            .finally(() => {
              if (isActive && currentRequestId === requestId) {
                setIsLoading(false);
              }
            });
        },
        (error) => {
          requestId += 1;
          console.error('Unable to determine Firebase authentication state.', error);
          setUser(null);
          setIsAdmin(false);
          setAuthError('Unable to check authentication. Please reload the page.');
          setIsLoading(false);
        },
      );

      return () => {
        isActive = false;
        unsubscribe();
      };
    } catch (error: unknown) {
      console.error('Unable to initialize Firebase authentication.', error);
      setAuthError(
        'Authentication is unavailable. Check the Firebase configuration.',
      );
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading, authError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('Authentication is not available.');
  }

  return context;
};
