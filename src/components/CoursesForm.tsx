import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  courseSchema,
  type CourseData,
  type CourseFormInput,
} from '../types/course';
import type { Course } from '../utilities/fetch';

interface CourseFormProps {
  course: Course;
  onCancel: () => void;
}

const CoursesForm = ({ course, onCancel }: CourseFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CourseFormInput, undefined, CourseData>({
    defaultValues: course,
    resolver: zodResolver(courseSchema),
    mode: 'onChange',
  });

  return (
    <form
      onSubmit={handleSubmit(() => undefined)}
      noValidate
      className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="space-y-2">
        <label htmlFor="title" className="block font-semibold text-slate-900">
          Course Title
        </label>
        <input
          id="title"
          type="text"
          aria-invalid={Boolean(errors.title)}
          aria-describedby={errors.title ? 'title-error' : undefined}
          {...register('title')}
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
        {errors.title && (
          <p id="title-error" className="text-sm text-red-700" role="alert">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="term" className="block font-semibold text-slate-900">
          Term
        </label>
        <select
          id="term"
          aria-invalid={Boolean(errors.term)}
          aria-describedby={errors.term ? 'term-error' : undefined}
          {...register('term')}
          className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <option value="">Select a term</option>
          <option value="Fall">Fall</option>
          <option value="Winter">Winter</option>
          <option value="Spring">Spring</option>
          <option value="Summer">Summer</option>
        </select>
        {errors.term && (
          <p id="term-error" className="text-sm text-red-700" role="alert">
            {errors.term.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="number" className="block font-semibold text-slate-900">
          Course Number
        </label>
        <input
          id="number"
          type="text"
          aria-invalid={Boolean(errors.number)}
          aria-describedby={errors.number ? 'number-error' : undefined}
          {...register('number')}
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
        {errors.number && (
          <p id="number-error" className="text-sm text-red-700" role="alert">
            {errors.number.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="meets" className="block font-semibold text-slate-900">
          Course Time
        </label>
        <input
          id="meets"
          type="text"
          aria-invalid={Boolean(errors.meets)}
          aria-describedby={errors.meets ? 'meets-error' : undefined}
          {...register('meets')}
          className="min-h-11 w-full rounded-lg border border-slate-300 px-3 text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        />
        {errors.meets && (
          <p id="meets-error" className="text-sm text-red-700" role="alert">
            {errors.meets.message}
          </p>
        )}
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
