import React from "react";

interface CustomInput {
  label: string;
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomInput({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}: CustomInput) {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <label className="font-medium text2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="text-[#39210b] px-[0.75rem] py-[0.5rem] rounded-[8px] ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#F5D00E] focus:shadow-[0_5px_10px_0px_rgba(252,0,0,0.3)]"
      />
    </div>
  );
}

export default CustomInput;
