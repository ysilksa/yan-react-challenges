import type { Dispatch, SetStateAction } from 'react';

interface TermButtonsProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const TermButtons = ({ selected, setSelected }: TermButtonsProps) => (
  <div className="inline-flex w-fit rounded-lg bg-slate-100 p-1" role="group" aria-label="Filter courses by term">
    {['Fall', 'Winter', 'Spring'].map((option) => {
      const isSelected = option === selected;

      return (
        <button
          key={option}
          type="button"
          aria-pressed={isSelected}
          onClick={() => setSelected(option)}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
            isSelected
              ? 'bg-white text-indigo-700 shadow-sm'
              : 'text-slate-600 hover:text-slate-950'
          }`}
        >
          {option}
        </button>
      );
    })}
  </div>
);

export default TermButtons;
