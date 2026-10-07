import CoursesList from './CoursesList.tsx';
import TermButtons from './TermSelection.tsx';
import { useState } from 'react';
import type { Schedule } from "../utilities/fetch";

const CoursesPage = ({ schedule }: { schedule: Schedule }) => {
  // useStates
  const [selected, setSelected] = useState("Fall");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]); 

  // helper function for updating the list, seems like a good practice from the genAI output to be specific to this component 
  const handleSelect = (key: string) => {
    setSelectedCourses((current) =>
      current.includes(key)
        ? current.filter((id) => id !== key)
        : [...current, key]
    );
  };

  return (
    <div className = "flex flex-col gap-4">
     <TermButtons
       selected = {selected}
       setSelected = {setSelected}
     />
    <CoursesList 
      schedule = {schedule}
      selectedTerm = {selected}
      selectedCourses = {selectedCourses} // pass list of selected courses for conditional rendering 
      clickHandler = {handleSelect} // pass click handler

    />
    </div>
  );
}

export default CoursesPage;

