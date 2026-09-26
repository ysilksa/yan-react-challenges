import './App.css';

// use interfaces for TypeScript to define the structure of the data
interface Schedule {
  title: string; 
  courses: Record<string, Course>;
}

interface Course {
  term: string;
  number: string;
  meets: string;
  title: string;
}

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


// const used for "Display courses" task
const CoursesList = ({ schedule } : {schedule: Schedule}) => {
  
  const coursesList = Object.entries(schedule.courses); 
  return (
    <table>
      {coursesList.map(([key, course]) => (
        <tr key={key}>
          <td>
            {course.term} CS {course.number}: {course.title}
          </td>
        </tr>
      ))}
    </table>
  );
}

const App = () => {
  // use the schedule to display courses
  const schedule = schedules["CS-2018-2019"];
  return (
    <main>
      <h1>{schedule.title}</h1>
      {/* call the const CoursesList to display the courses in the schedule */}
      <CoursesList schedule={schedule} />
    </main>
  );
}





export default App;