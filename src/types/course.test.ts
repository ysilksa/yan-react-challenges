import { describe, expect, it } from 'vitest';
import { courseSchema } from './course';

const validCourse = {
  title: 'Algorithms',
  term: 'Fall',
  number: '213',
  meets: 'MWF 9:00-9:50',
};

describe('courseSchema', () => {
  it.each(['MWF 9:00-9:50', 'TuTh 14:00-15:20', ''])(
    'accepts meeting time %j',
    (meets) => {
      expect(courseSchema.safeParse({ ...validCourse, meets }).success).toBe(true);
    },
  );

  it.each(['MWF', 'TuTh 14:00', 'XYZ 9:00-9:50', 'MWF 25:00-26:00'])(
    'rejects malformed meeting time %j',
    (meets) => {
      const result = courseSchema.safeParse({ ...validCourse, meets });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0]?.message).toContain(
          'Must contain days and start-end',
        );
      }
    },
  );

  it('rejects an ending time earlier than the starting time', () => {
    const result = courseSchema.safeParse({
      ...validCourse,
      meets: 'MWF 10:00-9:50',
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        'Ending time cannot be earlier than the starting time.',
      );
    }
  });

  it.each([
    { title: 'A', term: 'Fall', number: '213', meets: '' },
    { ...validCourse, term: 'Autumn' },
    { ...validCourse, number: 'CS213' },
    { ...validCourse, number: '213-' },
  ])('rejects invalid course data: %j', (course) => {
    expect(courseSchema.safeParse(course).success).toBe(false);
  });

  it('accepts a course number with a section', () => {
    expect(
      courseSchema.safeParse({ ...validCourse, number: '213-2' }).success,
    ).toBe(true);
  });
});
