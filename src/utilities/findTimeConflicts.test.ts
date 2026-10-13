import { describe, expect, it } from 'vitest';
import { findTimeConflicts } from './findTimeConflicts';
import type { Course } from './fetch';

const course = (term: string, meets: string): Course => ({
  term,
  meets,
  number: '101',
  title: 'Test course',
});

describe('findTimeConflicts', () => {
  it('finds courses in the same term with a shared day and overlapping times', () => {
    const allCourses = {
      selected: course('Fall', 'MWF 11:00-11:50'),
      conflict: course('Fall', 'M 11:30-12:00'),
      differentDay: course('Fall', 'TuTh 11:30-12:00'),
      differentTerm: course('Spring', 'MWF 11:30-12:00'),
      adjacent: course('Fall', 'MWF 11:50-12:00'),
    };

    expect(
      findTimeConflicts({ selectedCourses: ['selected'], allCourses }),
    ).toEqual(['conflict']);
  });

  it('supports a day shared through the Thursday abbreviation', () => {
    const allCourses = {
      selected: course('Fall', 'TuTh 9:30-10:50'),
      conflict: course('Fall', 'Th 10:00-11:00'),
    };

    expect(
      findTimeConflicts({ selectedCourses: ['selected'], allCourses }),
    ).toEqual(['conflict']);
  });

  it('does not report conflicts for empty or unparseable meeting times', () => {
    const allCourses = {
      selected: course('Fall', 'MWF 11:00-11:50'),
      empty: course('Fall', ''),
      unparseable: course('Fall', 'Meeting time unknown'),
    };

    expect(
      findTimeConflicts({ selectedCourses: ['selected'], allCourses }),
    ).toEqual([]);
  });
});
