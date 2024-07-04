import React from "react";

interface CustomButton {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

function CustomButton({ label, onClick }: CustomButton) {
  return (
    <div className="rounded-[16px] button-shad">
      <button
        className="w-[100%] font-medium text1 p-[0.5rem] rounded-[8px] bg-gradient-to-r from-[#653101] to-[#CB6303] bg-clip-text text-transparent opacity-85 hover:opacity-100"
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
}

export default CustomButton;
