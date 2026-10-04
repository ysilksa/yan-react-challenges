// use interfaces for TypeScript to define the structure of the data
import type { Schedule } from "../utilities/fetch";

// const used for "Display courses" task
const CoursesList = ({ schedule, selectedTerm } : {schedule: Schedule, selectedTerm: string}) => {
  
  const coursesList = Object.entries(schedule.courses).filter(([, course]) => course.term === selectedTerm); 
  return (
    <article className = " grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 px-4 h-full min-h-56">
      {coursesList.map(([key, course]) => (
        <div key={key} className = "flex flex-col justify-between h-full border-2 border-gray-400 rounded-lg p-4">
          <section>
            <h2>{course.term} CS {course.number}</h2>
            <p>{course.title}</p>
          </section>
          <section>
            <hr className = "border-gray-400"/>
            <p className="text-sm pt-2">({course.meets})</p>
          </section>
          
        </div>
      ))}
    </article>
  );
}

export default CoursesList;
