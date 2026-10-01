import { useEffect, useState } from 'react';
import './App.css';
import CoursesList from './components/CoursesList';
import { fetchSchedules, type Schedule } from './utilities/fetch';

const App = () => {
  const [schedules, setSchedules] = useState<Record<string, Schedule> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;

    const loadSchedules = async () => {
      try {
        const data = await fetchSchedules();
        if (isCurrent) {
          setSchedules(data);
        }
      } catch (fetchError) {
        if (isCurrent) {
          setError(fetchError instanceof Error ? fetchError.message : 'Unable to load courses.');
        }
      }
    };

    void loadSchedules();
    return () => {
      isCurrent = false;
    };
  }, []);

  if (error) {
    return <main role="alert">{error}</main>;
  }

  if (!schedules) {
    return <main>Loading courses...</main>;
  }

  const schedule = schedules['CS-2018-2019'];

  if (!schedule) {
    return <main role="alert">The requested course schedule was not found.</main>;
  }

  return (
    <main>
      <h1>{schedule.title}</h1>
      <CoursesList schedule={schedule} />
    </main>
  );
};

export default App;