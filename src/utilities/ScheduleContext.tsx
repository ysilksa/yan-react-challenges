import { createContext, useContext } from 'react';
import type { Schedule } from './fetch';

export const ScheduleContext = createContext<Schedule | null>(null);

export const useSchedule = () => {
  const schedule = useContext(ScheduleContext);

  if (!schedule) {
    throw new Error('Schedule is not available.');
  }

  return schedule;
};
