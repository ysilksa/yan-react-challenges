import { createRootRoute, Outlet } from '@tanstack/react-router';
import { COURSE_SCHEDULE_ID } from '../services/courses';
import { ScheduleContext } from '../utilities/ScheduleContext';
import { useFirestoreSchedule } from '../utilities/fetch';

const Root = () => {
  const [schedule, isLoading, error, refresh] =
    useFirestoreSchedule(COURSE_SCHEDULE_ID);

  if (error) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800" role="alert">
          Error loading courses: {error.message}
        </p>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-slate-600" role="status">
          Loading courses…
        </p>
      </main>
    );
  }

  if (!schedule) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900" role="alert">
          The course schedule is unavailable.
        </p>
      </main>
    );
  }

  return (
    <ScheduleContext.Provider value={{ schedule, refresh }}>
      <Outlet />
    </ScheduleContext.Provider>
  );
};

export const Route = createRootRoute({
  component: Root,
});
