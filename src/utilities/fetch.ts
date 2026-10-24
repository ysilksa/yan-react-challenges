import { useEffect, useState } from 'react';
import { getSchedule } from '../services/courses';
import type { Schedule } from '../types/schedule';

export type { Course, Schedule, Schedules } from '../types/schedule';

type ScheduleQueryResult = [Schedule | null, boolean, Error | null];

export const useFirestoreSchedule = (scheduleId: string): ScheduleQueryResult => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCurrent = true;

    const fetchSchedule = async () => {
      setLoading(true);
      setSchedule(null);
      setError(null);

      try {
        const result = await getSchedule(scheduleId);

        if (isCurrent) {
          setSchedule(result);
        }
      } catch (cause: unknown) {
        if (isCurrent) {
          setError(
            cause instanceof Error
              ? cause
              : new Error('An unexpected error occurred while loading courses.'),
          );
        }
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    void fetchSchedule();

    return () => {
      isCurrent = false;
    };
  }, [scheduleId]);

  return [schedule, loading, error];
};
