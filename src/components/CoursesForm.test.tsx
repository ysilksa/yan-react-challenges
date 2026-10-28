import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { updateCourse } from '../services/courses';
import CoursesForm from './CoursesForm';

vi.mock('../services/courses', () => ({
  updateCourse: vi.fn(),
}));

describe('CoursesForm', () => {
  const course = {
    title: 'Algorithms',
    term: 'Fall',
    number: '213',
    meets: '',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows a helpful meeting-time error while the field is edited', async () => {
    render(
      <CoursesForm
        course={course}
        courseId="algorithms"
        scheduleId="schedule-id"
        onCancel={() => undefined}
        onSaved={() => undefined}
      />,
    );

    fireEvent.change(screen.getByLabelText('Course Time'), {
      target: { value: 'MWF' },
    });

    expect(
      await screen.findByText(
        'Must contain days and start-end, ex. MWF 12:00-13:20',
      ),
    ).toBeTruthy();
  });

  it('does not save when there are no changes', async () => {
    render(
    <CoursesForm
      course={course}
      courseId="algorithms"
      scheduleId="schedule-id"
      onCancel={() => undefined}
      onSaved={() => undefined}
    />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
    expect(updateCourse).not.toHaveBeenCalled();
    });
  });

  it('does not save invalid changes', async () => {
    render(
    <CoursesForm
      course={course}
      courseId="algorithms"
      scheduleId="schedule-id"
      onCancel={() => undefined}
      onSaved={() => undefined}
    />,
    );

    fireEvent.change(screen.getByLabelText('Course Title'), {
    target: { value: 'A' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(await screen.findByText('Course title must be at least 2 characters.')).toBeTruthy();
    expect(updateCourse).not.toHaveBeenCalled();
  });

  it('saves valid changes and calls onSaved after the update succeeds', async () => {
    const onSaved = vi.fn();
    vi.mocked(updateCourse).mockResolvedValue(undefined);

    render(
    <CoursesForm
      course={course}
      courseId="algorithms"
      scheduleId="schedule-id"
      onCancel={() => undefined}
      onSaved={onSaved}
    />,
    );

    fireEvent.change(screen.getByLabelText('Course Title'), {
    target: { value: 'Advanced Algorithms' },
    });
    await waitFor(() => {
    expect(
      screen.getByRole('button', { name: 'Submit' }).getAttribute('disabled'),
    ).toBeNull();
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
    expect(updateCourse).toHaveBeenCalledWith('schedule-id', 'algorithms', {
      ...course,
      title: 'Advanced Algorithms',
    });
    expect(onSaved).toHaveBeenCalledOnce();
    });
  });

  it('shows an error when saving fails', async () => {
    vi.mocked(updateCourse).mockRejectedValue(new Error('Firestore unavailable'));
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    render(
    <CoursesForm
      course={course}
      courseId="algorithms"
      scheduleId="schedule-id"
      onCancel={() => undefined}
      onSaved={() => undefined}
    />,
    );

    fireEvent.change(screen.getByLabelText('Course Title'), {
    target: { value: 'Advanced Algorithms' },
    });
    await waitFor(() => {
    expect(
      screen.getByRole('button', { name: 'Submit' }).getAttribute('disabled'),
    ).toBeNull();
    });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    expect(
    await screen.findByText('Unable to save course changes. Please try again.'),
    ).toBeTruthy();
  });
});
