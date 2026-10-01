import './App.css';
import CoursesList from './components/CoursesList';
import { useJsonQuery , type Schedules } from './utilities/fetch';

//
// schedules JSON object given from "Display courses" task.
//
const schedules = {
    "CS-2018-2019": {
      title: 'CS Courses for 2018-2019',
      courses: {
        "F101": {
          term: "Fall",
          number: "101",
          meets: "MWF 11:00-11:50",
          title: "Computer Science: Concepts, Philosophy, and Connections"
        },
        "F110": {
          term: "Fall",
          number: "110",
          meets: "MWF 10:00-10:50",
          title: "Intro Programming for non-majors"
        },
        "S313": {
          term: "Spring",
          number: "313",
          meets: "TuTh 15:30-16:50",
          title: "Tangible Interaction Design and Learning"
        },
        "S314": {
          term: "Spring",
          number: "314",
          meets: "TuTh 9:30-10:50",
          title: "Tech & Human Interaction"
        }
      }
    }
  };

const App = () => {
  // use the schedule to display courses
  const [json, isLoading, error] = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses-firestore.php")
  if (error) return <h2>Error in loading courses: {`${error}`}</h2>;
  if (isLoading) return <h2>Loading…</h2>;
  if (!json) return <h2>No courses found</h2>;

  console.log(json);
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