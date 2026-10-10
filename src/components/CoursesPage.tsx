import { useState } from 'react';
import type { Schedule } from '../utilities/fetch';
import CoursesList from './CoursesList.tsx';
import SchedulePopup from './SchedulePopup.tsx';
import TermButtons from './TermSelection.tsx';

const CoursesPage = ({ schedule }: { schedule: Schedule }) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const handleSelect = (key: string) => {
    setSelectedCourses((current) =>
      current.includes(key)
        ? current.filter((courseKey) => courseKey !== key)
        : [...current, key]
    );
  };

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-indigo-600">
          Course planner
        </p>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              {schedule.title}
            </h1>
            <p className="mt-2 max-w-2xl text-slate-600">
              Explore courses by term and add the ones you want to your schedule.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsScheduleOpen(true)}
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:self-auto"
          >
            <span>My schedule</span>
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-sm" aria-label={`${selectedCourses.length} selected`}>
              {selectedCourses.length}
            </span>
          </button>
        </div>
      </header>

      <section className="space-y-5" aria-label="Browse courses">
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-slate-900">Browse by term</h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose a course card to add or remove it from your schedule.
            </p>
          </div>
          <TermButtons selected={selectedTerm} setSelected={setSelectedTerm} />
        </div>

        <CoursesList
          schedule={schedule}
          selectedTerm={selectedTerm}
          selectedCourses={selectedCourses}
          clickHandler={handleSelect}
        />
      </section>

      <SchedulePopup
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        selectedCourses={selectedCourses}
        schedule={schedule}
      />
    </div>
  );
};

export default CoursesPage;
