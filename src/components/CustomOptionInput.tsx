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
      <label htmlFor={id} className="font-medium text2">
        {label}
      </label>
      <select id={id} name={name} onChange={onChange} value={value}>
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
