import { createContext, useContext } from 'react';
import type { Schedule } from './fetch';

interface ScheduleContextValue {
  schedule: Schedule;
  refresh: () => void;
}

export const ScheduleContext = createContext<ScheduleContextValue | null>(null);

const useScheduleContext = () => {
  const context = useContext(ScheduleContext);

  if (!context) {
    throw new Error('Schedule is not available.');
  }

  return context;
};

export const useSchedule = () => useScheduleContext().schedule;

export const useRefreshSchedule = () => useScheduleContext().refresh;
