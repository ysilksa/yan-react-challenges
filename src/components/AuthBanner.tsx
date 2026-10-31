import { useState } from 'react';
import { signInWithGoogle, signOutUser } from '../services/auth';
import { useAuth } from '../utilities/AuthContext';

const AuthBanner = () => {
  const { user, isLoading, authError } = useAuth();
  const [actionError, setActionError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setActionError(null);

    try {
      await signInWithGoogle();
    } catch (error: unknown) {
      console.error('Unable to sign in with Google.', error);
      setActionError('Sign-in failed. Please try again.');
    }
  };

  const handleSignOut = async () => {
    setActionError(null);

    try {
      await signOutUser();
    } catch (error: unknown) {
      console.error('Unable to sign out.', error);
      setActionError('Sign-out failed. Please try again.');
    }
  };

  return (
    <header className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-semibold text-slate-900" role="status">
          {isLoading
            ? 'Checking sign-in status…'
            : user
              ? `Signed in as ${user.displayName ?? user.email ?? 'user'}`
              : 'You are not signed in.'}
        </p>
        {(authError || actionError) && (
          <p className="mt-1 text-sm text-red-700" role="alert">
            {authError ?? actionError}
          </p>
        )}
      </div>

      {user ? (
        <button
          type="button"
          onClick={() => void handleSignOut()}
          disabled={isLoading}
          className="min-h-11 rounded-lg border border-slate-300 px-4 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign out
        </button>
      ) : (
        <button
          type="button"
          onClick={() => void handleSignIn()}
          disabled={isLoading || Boolean(authError)}
          className="min-h-11 rounded-lg bg-indigo-600 px-4 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign in with Google
        </button>
      )}
    </header>
  );
};

export default AuthBanner;
