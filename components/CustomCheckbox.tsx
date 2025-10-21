
import React from 'react';
import CheckIcon from './icons/CheckIcon';

interface CustomCheckboxProps {
  id: string;
  checked: boolean;
  onChange: () => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ id, checked, onChange }) => {
  return (
    <div className="inline-flex items-center">
      <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor={id}>
        <input
          type="checkbox"
          className="before:content[''] peer relative h-6 w-6 cursor-pointer appearance-none rounded-md border-2 border-slate-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-sky-500 checked:bg-sky-500 checked:before:bg-sky-500 hover:before:opacity-10"
          id={id}
          checked={checked}
          onChange={onChange}
        />
        <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
          <CheckIcon />
        </span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
