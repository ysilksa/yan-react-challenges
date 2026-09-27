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


// const used for "Display courses" task
const CoursesList = ({ schedule } : {schedule: Schedule}) => {
  
  const coursesList = Object.entries(schedule.courses); 
  return (
    <table>
      {coursesList.map(([key, course]) => (
        <tr key={key}>
          <td>
            {course.term} CS {course.number}: {course.title} ({course.meets})
          </td>
        </tr>
      ))}
    </table>
  );
}

export default CoursesList;