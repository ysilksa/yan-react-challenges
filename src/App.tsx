import './App.css';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  RouterProvider,
} from '@tanstack/react-router';
import { useMemo } from 'react';
import CoursesPage from './components/CoursesPage.tsx';
import CourseEditForm from './components/CourseEditForm.tsx';
import { useJsonQuery, type Schedule, type Schedules } from './utilities/fetch';

const CourseRouter = ({ schedule }: { schedule: Schedule }) => {
  const router = useMemo(() => {
    const rootRoute = createRootRoute();
    const courseListRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/',
      component: () => <CoursesPage schedule={schedule} />,
    });
    const courseEditRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: '/courses/$courseId',
      component: () => {
        const { courseId } = courseEditRoute.useParams();
        const course = schedule.courses[courseId];

        if (!course) {
          return (
            <main className="mx-auto max-w-6xl px-6 py-16">
              <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900" role="alert">
                The requested course is unavailable.
              </p>
              <Link className="mt-4 inline-block font-semibold text-indigo-700 underline" to="/">
                Return to courses
              </Link>
            </main>
          );
        }

        return <CourseEditForm key={courseId} course={course} />;
      },
    });
    const routeTree = rootRoute.addChildren([courseListRoute, courseEditRoute]);

    return createRouter({ routeTree });
  }, [schedule]);

  return <RouterProvider router={router} />;
};

const App = () => {
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
        <p className="text-slate-600" role="status">Loading courses…</p>
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
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8">
      <CourseRouter schedule={schedule} />
    </main>
  );
};

export default App;