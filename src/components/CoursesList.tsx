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
    <div className = "grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4">
      {coursesList.map(([key, course]) => (
        <div key={key} className = "border-2 border-gray-400 rounded-lg">
          <h2>{course.term} CS {course.number}</h2>
          <p>{course.title}</p>
          <hr/>
          <p>({course.meets})</p>
        </div>
      ))}
    </div>
  );
}

export default CoursesList;
