import React from "react";

interface CustomOptionInputProps {
  label: string;
  options: { value: string; label: string }[];
  name: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
}

function CustomOptionInput({
  label,
  options,
  name,
  id,
  onChange,
  value,
}: CustomOptionInputProps) {
  return (
    <>
      <label htmlFor={id} className="font-medium text2 w-[100%]">
        {label}
      </label>
      <select
        className="w-[100%] text-[#39210b] px-[0.75rem] py-[0.5rem] rounded-[8px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F5D00E] focus:shadow-[0_5px_10px_0px_rgba(252,0,0,0.3)]"
        id={id}
        name={name}
        onChange={onChange}
        value={value}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </>
  );
}

export default CustomOptionInput;
