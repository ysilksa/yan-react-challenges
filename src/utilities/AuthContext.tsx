import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { getFirebaseAuth } from '../services/auth';

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    try {
      return onAuthStateChanged(
        getFirebaseAuth(),
        (authenticatedUser) => {
          setUser(authenticatedUser);
          setAuthError(null);
          setIsLoading(false);
        },
        (error) => {
          console.error('Unable to determine Firebase authentication state.', error);
          setUser(null);
          setAuthError('Unable to check authentication. Please reload the page.');
          setIsLoading(false);
        },
      );
    } catch (error: unknown) {
      console.error('Unable to initialize Firebase authentication.', error);
      setAuthError(
        'Authentication is unavailable. Check the Firebase configuration.',
      );
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, authError }}>
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
