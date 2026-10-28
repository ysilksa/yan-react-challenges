import './App.css';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  RouterProvider,
  useNavigate,
} from '@tanstack/react-router';
import { useMemo } from 'react';
import CoursesPage from './components/CoursesPage.tsx';
import CoursesForm from './components/CoursesForm.tsx';
import {
  COURSE_SCHEDULE_ID,
  useFirestoreSchedule,
  type Schedule,
} from './utilities/fetch';

const CourseRouter = ({
  schedule,
  refresh,
}: {
  schedule: Schedule;
  refresh: () => void;
}) => {
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
        const navigate = useNavigate();
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

        return (
          <CoursesForm
            key={courseId}
            course={course}
            courseId={courseId}
            scheduleId={COURSE_SCHEDULE_ID}
            onCancel={() => void navigate({ to: '/' })}
            onSaved={() => {
              refresh();
              void navigate({ to: '/' });
            }}
          />
        );
      },
    });
    const routeTree = rootRoute.addChildren([courseListRoute, courseEditRoute]);

    return createRouter({ routeTree });
  }, [schedule]);

  return <RouterProvider router={router} />;
};

const App = () => {
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
        <p className="text-slate-600" role="status">Loading courses…</p>
      </main>
    );
  }
  if (!schedule) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="text-slate-600">The course schedule is unavailable.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8">
      <CourseRouter schedule={schedule} refresh={refresh} />
    </main>
  );
};

export default App;