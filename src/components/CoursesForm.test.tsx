import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import CoursesForm from './CoursesForm';

describe('CoursesForm', () => {
  it('shows a helpful meeting-time error while the field is edited', async () => {
    render(
      <CoursesForm
        course={{
          title: 'Algorithms',
          term: 'Fall',
          number: '213',
          meets: '',
        }}
        onCancel={() => undefined}
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
});
