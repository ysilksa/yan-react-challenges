import { useCallback, useEffect, useState } from 'react';
import { COURSE_SCHEDULE_ID, getSchedule } from '../services/courses';
import type { Schedule } from '../types/schedule';

export type { Course, Schedule, Schedules } from '../types/schedule';

type ScheduleQueryResult = [
  Schedule | null,
  boolean,
  Error | null,
  () => void,
];

export const useFirestoreSchedule = (scheduleId: string): ScheduleQueryResult => {
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refreshCount, setRefreshCount] = useState(0);
  const refresh = useCallback(() => {
    setRefreshCount((count) => count + 1);
  }, []);

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
  }, [scheduleId, refreshCount]);

  return [schedule, loading, error, refresh];
};

export { COURSE_SCHEDULE_ID };
