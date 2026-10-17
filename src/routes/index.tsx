import { createFileRoute } from '@tanstack/react-router';
import CoursesPage from '../components/CoursesPage';
import { useSchedule } from '../utilities/ScheduleContext';

const Index = () => {
  const schedule = useSchedule();

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-5 py-10 sm:px-8">
      <CoursesPage schedule={schedule} />
    </main>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
