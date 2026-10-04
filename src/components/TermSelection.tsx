import type { Dispatch, SetStateAction } from "react";

interface TermButtonsProps {
  selected: string; 
  setSelected: Dispatch<SetStateAction<string>>;
}

const TermButtons = ({ selected, setSelected }: TermButtonsProps) => (
  <div className="flex justify-center gap-1">
    {["Fall", "Winter", "Spring"].map(option => (
      <div key={option}>
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
