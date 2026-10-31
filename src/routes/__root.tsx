import { createRootRoute, Outlet } from '@tanstack/react-router';
import AuthBanner from '../components/AuthBanner';
import { COURSE_SCHEDULE_ID } from '../services/courses';
import { AuthProvider } from '../utilities/AuthContext';
import { ScheduleContext } from '../utilities/ScheduleContext';
import { useFirestoreSchedule } from '../utilities/fetch';

const RootContent = () => {
  const [schedule, isLoading, error, refresh] =
    useFirestoreSchedule(COURSE_SCHEDULE_ID);

  return (
    <>
      <div className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <AuthBanner />
      </div>

      {error ? (
        <main className="mx-auto max-w-6xl px-6 py-16">
          <p
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
            role="alert"
          >
            Error loading courses: {error.message}
          </p>
        </main>
      ) : isLoading ? (
        <main className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-slate-600" role="status">
            Loading courses…
          </p>
        </main>
      ) : !schedule ? (
        <main className="mx-auto max-w-6xl px-6 py-16">
          <p
            className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900"
            role="alert"
          >
            The course schedule is unavailable.
          </p>
        </main>
      ) : (
        <ScheduleContext.Provider value={{ schedule, refresh }}>
          <Outlet />
        </ScheduleContext.Provider>
      )}
    </>
  );
};

const Root = () => (
  <AuthProvider>
    <RootContent />
  </AuthProvider>
);

export const Route = createRootRoute({
  component: Root,
});
