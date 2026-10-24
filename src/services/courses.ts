import { doc, getDoc } from 'firebase/firestore';
import type { Course, Schedule } from '../types/schedule';
import { getFirebaseDb } from './firebase';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const parseSchedule = (value: unknown): Schedule => {
  if (
    !isRecord(value) ||
    typeof value.title !== 'string' ||
    !isRecord(value.courses)
  ) {
    throw new Error('The course schedule in Firestore has an invalid format.');
  }

  const courses: Record<string, Course> = {};

  for (const [courseId, course] of Object.entries(value.courses)) {
    if (
      !isRecord(course) ||
      typeof course.term !== 'string' ||
      typeof course.number !== 'string' ||
      typeof course.meets !== 'string' ||
      typeof course.title !== 'string'
    ) {
      throw new Error(`Course "${courseId}" in Firestore has an invalid format.`);
    }

    courses[courseId] = {
      term: course.term,
      number: course.number,
      meets: course.meets,
      title: course.title,
    };
  }

  return { title: value.title, courses };
};

export const getSchedule = async (scheduleId: string): Promise<Schedule | null> => {
  const scheduleSnapshot = await getDoc(
    doc(getFirebaseDb(), 'schedules', scheduleId),
  );

  if (!scheduleSnapshot.exists()) {
    return null;
  }

  const data: unknown = scheduleSnapshot.data();
  return parseSchedule(data);
};
