import React from "react";

interface CustomButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: "primary" | "secondary";
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  style,
  disabled,
}) => {

  console.log("bhaiiii -- ", disabled)

  return (
    <button
      disabled={disabled}
      type="button"
      className={`text-white ${
        style == "secondary" ? "border-2 border-accColor" : "bg-accColor"
      }  hover:bg-blue-800 focus:ring-1 focus:ring-blue-700 font-medium rounded-md mobile:rounded-lg text-sm px-3 mobile:px-5 py-2 mobile:py-2.5 disabled:opacity-20`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
