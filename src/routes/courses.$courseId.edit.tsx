import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import CoursesForm from '../components/CoursesForm';
import { COURSE_SCHEDULE_ID } from '../services/courses';
import { useRefreshSchedule, useSchedule } from '../utilities/ScheduleContext';

const EditCourse = () => {
  const { courseId } = Route.useParams();
  const schedule = useSchedule();
  const refresh = useRefreshSchedule();
  const navigate = useNavigate();
  const course = schedule.courses[courseId];

  if (!course) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-16">
        <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-900" role="alert">
          This course was not found.
        </p>
        <Link className="mt-4 inline-block font-semibold text-indigo-700 underline" to="/">
          Return to courses
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8">
      <section className="mx-auto max-w-xl space-y-6">
        <header>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
            Course planner
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Edit Course
          </h1>
        </header>
        <CoursesForm
          course={course}
          courseId={courseId}
          scheduleId={COURSE_SCHEDULE_ID}
          onCancel={() => void navigate({ to: '/' })}
          onSaved={() => {
            refresh();
            void navigate({ to: '/' });
          }}
        />
      </section>
    </main>
  );
};

export const Route = createFileRoute('/courses/$courseId/edit')({
  component: EditCourse,
});
