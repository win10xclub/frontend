import React from "react";

interface CustomButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: "primary" | "secondary";
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, style }) => {
  return (
    <button
      type="button"
      className={`text-white ${style == "secondary" ? "border-2 border-accColor": "bg-accColor"}  hover:bg-blue-800 focus:ring-1 focus:ring-blue-700 font-medium rounded-lg text-sm px-5 py-2.5`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default CustomButton;
