import React from "react";

interface CustomInputProps {
  label: string;
  type: string; // Ensure type is a valid HTML input type
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-[0.25rem]">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-iconColor"
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        className="bg-terColor border border-gray-600 text-textColor text-sm rounded-lg focus:ring-accColor focus:border-accColor w-full p-2.5"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomInput;
