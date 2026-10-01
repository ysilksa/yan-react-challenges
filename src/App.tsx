import './App.css';
import CoursesList from './components/CoursesList';
import { useJsonQuery , type Schedules } from './utilities/fetch';

const App = () => {
  // use the schedule to display courses
  const [json, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses-firestore.php")
  if (error) return <h2>Error in loading courses: {`${error}`}</h2>;
  if (isLoading) return <h2>Loading…</h2>;
  if (!json) return <h2>No courses found</h2>;

  const schedules = json as Schedules;
  const schedule = schedules.schedules["CS-2018-2019"];

  return (
    <main>
      <h1>{schedule.title}</h1>
      {/* call the const CoursesList to display the courses in the schedule */}
      <CoursesList schedule={schedule} />
    </main>
  );
}





export default App;