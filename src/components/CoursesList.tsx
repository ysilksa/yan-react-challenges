import type { Schedule } from '../utilities/fetch';
import { Link } from '@tanstack/react-router';

interface CoursesListProps {
  schedule: Schedule;
  selectedTerm: string;
  selectedCourses: string[];
  clickHandler: (courseKey: string) => void;
  conflictingCourses: string[];
}

const CoursesList = ({
  schedule,
  selectedTerm,
  selectedCourses,
  clickHandler,
  conflictingCourses,
}: CoursesListProps) => {
  const coursesList = Object.entries(schedule.courses).filter(
    ([, course]) => course.term === selectedTerm,
  );

  return (
    <>
      {coursesList.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center text-slate-600">
          No courses are listed for {selectedTerm}.
        </p>
      ) : (
        <ul className="grid auto-rows-fr grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-4">
          {coursesList.map(([key, course]) => {
            const isSelected = selectedCourses.includes(key);
            const isConflicting = conflictingCourses.includes(key);

            return (
              <li key={key} className="h-full">
                <article
                  className={`flex h-full min-h-48 flex-col rounded-2xl border shadow-sm ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 ring-1 ring-indigo-500'
                      : isConflicting
                        ? 'cursor-not-allowed border-slate-300 bg-slate-100 opacity-50 grayscale'
                        : 'border-slate-200 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    aria-pressed={isSelected}
                    aria-disabled={isConflicting}
                    onClick={() => {
                      if (isSelected || !isConflicting) {
                        clickHandler(key);
                      }
                    }}
                    className="flex min-h-40 w-full flex-1 flex-col justify-between rounded-t-2xl p-5 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <span>
                      <span className="flex items-start justify-between gap-3">
                        <span className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                          {course.term} · CS {course.number}
                        </span>
                        <span
                          className={`flex size-6 shrink-0 items-center justify-center rounded-full text-sm ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'border border-slate-300 text-transparent'
                          }`}
                          aria-hidden="true"
                        >
                          ✓
                        </span>
                      </span>
                      <span className="mt-3 block text-lg font-semibold leading-snug text-slate-950">
                        {course.title}
                      </span>
                    </span>
                    <span className="mt-5 flex items-center gap-2 border-t border-slate-200 pt-4 text-sm text-slate-600">
                      <span aria-hidden="true">◷</span>
                      <span>{course.meets || 'Meeting time not listed'}</span>
                    </span>
                  </button>
                  <Link
                    to="/courses/$courseId/edit"
                    params={{ courseId: key }}
                    aria-label={`Edit ${course.title}`}
                    className="min-h-11 border-t border-slate-200 px-5 py-3 text-left text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-indigo-600"
                  >
                    Edit Course
                  </Link>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default CoursesList;
