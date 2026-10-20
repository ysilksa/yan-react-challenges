import { z } from 'zod';

const courseTerms = ['Fall', 'Winter', 'Spring', 'Summer'] as const;

export type CourseTerm = (typeof courseTerms)[number];

const meetingTimePattern =
  /^(?:(?:Tu|Th|Sa|Su)|[MWF])+\s+((?:[01]?\d|2[0-3]):[0-5]\d)-((?:[01]?\d|2[0-3]):[0-5]\d)$/;

const timeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

const meetingTimeSchema = z.string().superRefine((value, context) => {
  if (value === '') {
    return;
  }

  const match = meetingTimePattern.exec(value);
  if (!match) {
    context.addIssue({
      code: 'custom',
      message: 'Must contain days and start-end, ex. MWF 12:00-13:20',
    });
    return;
  }

  const [, startTime, endTime] = match;
  if (timeToMinutes(endTime) < timeToMinutes(startTime)) {
    context.addIssue({
      code: 'custom',
      message: 'Ending time cannot be earlier than the starting time.',
    });
  }
});

export const courseSchema = z.object({
  title: z.string().trim().min(2, 'Course title must be at least 2 characters.'),
  term: z
    .string()
    .refine(
      (value): value is CourseTerm =>
        courseTerms.some((term) => term === value),
      'Choose Fall, Winter, Spring, or Summer.',
    ),
  number: z
    .string()
    .regex(
      /^\d+(?:-\d+)?$/,
      'Enter a course number, optionally followed by a section (e.g., 213 or 213-2).',
    ),
  meets: meetingTimeSchema,
});

export type CourseData = z.infer<typeof courseSchema>;
export type CourseFormInput = z.input<typeof courseSchema>;
