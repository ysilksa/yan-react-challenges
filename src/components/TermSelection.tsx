import type { Dispatch, SetStateAction } from "react";

interface TermButtonsProps {
  selected: string; 
  setSelected: Dispatch<SetStateAction<string>>;
}

const TermButtons = ({ selected, setSelected }: TermButtonsProps) => (
  <div className="flex px-4 gap-2">
    {["Fall", "Winter", "Spring"].map(option => (
      <div className="flex gap-1" key={option}>
        <label>{option}</label>
        <input 
          type = "radio"
          id={option} 
          value={option}
          checked={option === selected}
          onChange={() => setSelected(option)}
        />
      </div>
    ))}
  </div>
);

export default TermButtons;
