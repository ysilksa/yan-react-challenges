import { useState, type FormEvent } from 'react';
import type { Course } from '../utilities/fetch';

interface CourseFormProps {
  course: Course;
  onCancel: () => void;
}

const CoursesForm = ({ course, onCancel }: CourseFormProps) => {
  const [title, setTitle] = useState(course.title);
  const [meets, setMeets] = useState(course.meets);

  const onSubmit = () => {};

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="block font-semibold text-slate-900">
          Course Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="meets" className="block font-semibold text-slate-900">
          Course Time
        </label>
        <input
          id="meets"
          name="meets"
          type="text"
          value={meets}
          onChange={(event) => setMeets(event.target.value)}
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
      </div>

      <button
        type="button"
        onClick={onCancel}
        className="min-h-11 rounded-lg border border-slate-300 px-4 font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Cancel
      </button>
    </form>
  );
};

export default CoursesForm;
