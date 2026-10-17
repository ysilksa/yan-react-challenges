import { createRootRoute, Outlet } from '@tanstack/react-router';
import { ScheduleContext } from '../utilities/ScheduleContext';
import { useJsonQuery, type Schedules } from '../utilities/fetch';

const Root = () => {
  const [json, isLoading, error] = useJsonQuery(
    'https://courses.cs.northwestern.edu/394/guides/data/cs-courses-firestore.php',
  );

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

  if (!json) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-slate-600">No courses found.</p>
      </main>
    );
  }

  const schedules = json as Schedules;
  const schedule = schedules.schedules['CS-2018-2019'];

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
    <ScheduleContext.Provider value={schedule}>
      <Outlet />
    </ScheduleContext.Provider>
  );
};

export const Route = createRootRoute({
  component: Root,
});
