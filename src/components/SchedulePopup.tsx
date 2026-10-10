import { useEffect, useRef } from 'react';
import type { Schedule } from '../utilities/fetch';

interface SchedulePopupProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCourses: string[];
  schedule: Schedule;
}

const SchedulePopup = ({
  isOpen,
  onClose,
  selectedCourses,
  schedule,
}: SchedulePopupProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const selectedCourseDetails = selectedCourses.flatMap((key) => {
    const course = schedule.courses[key];
    return course ? [{ key, course }] : [];
  });

  const closeDialog = () => {
    if (dialogRef.current?.open) {
      dialogRef.current.close();
    }
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="schedule-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          closeDialog();
        }
      }}
      className="m-auto max-h-[min(85vh,700px)] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/60"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-6 py-5 sm:px-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
              Course planner
            </p>
            <h2 id="schedule-title" className="mt-1 text-2xl font-bold tracking-tight">
              My schedule
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {selectedCourseDetails.length}{' '}
              {selectedCourseDetails.length === 1 ? 'course' : 'courses'} selected
            </p>
          </div>
          <button
            type="button"
            onClick={closeDialog}
            aria-label="Close schedule"
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-2xl leading-none text-slate-500 transition hover:bg-slate-200 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>

      <div className="px-6 py-6 sm:px-8">
        {selectedCourseDetails.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-9 text-center">
            <p className="text-lg font-semibold text-slate-900">
              Your schedule is empty
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-600">
              Close this window, choose a term, and select courses to add them
              to your schedule.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {selectedCourseDetails.map(({ key, course }) => (
              <li
                key={key}
                className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-200"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">
                  {course.term} · CS {course.number}
                </p>
                <p className="mt-1 font-semibold text-slate-950">{course.title}</p>
                <p className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <span aria-hidden="true">◷</span>
                  <span>{course.meets || 'Meeting time not listed'}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
};

export default SchedulePopup;
