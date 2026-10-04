import CoursesList from './CoursesList.tsx';
import TermButtons from './TermSelection.tsx';
import { useState } from 'react';
import type { Schedule } from "../utilities/fetch";

const CoursesPage = ({ schedule }: { schedule: Schedule }) => {
  const [selected, setSelected] = useState("Fall");
  return (
    <div className = "flex flex-col gap-4">
     <TermButtons
       selected = {selected}
       setSelected = {setSelected}
     />
    <CoursesList 
      schedule = {schedule}
      selectedTerm = {selected}
    />
    </div>
  );
}

export default CoursesPage;

