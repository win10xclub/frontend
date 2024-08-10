import CustomButton from "@/components/CustomButton";
import React from "react";

const GameType = ({ setStepper }: any) => {
  // Define the function to handle the click event
  const handleClick = () => {
    setStepper((prev: number) => prev + 1); // Increment the stepper value
  };

  return (
    <div className="w-[100%] bg-secnColor h-[10rem] rounded-[12px] flex flex-col justify-center items-center gap-[1rem]">
      <CustomButton label={"Online Play"}></CustomButton>
      <div className="flex gap-[1rem]">
        <CustomButton
          label={"Create Room"}
          style="secondary"
          onClick={handleClick} // Use the function here
        ></CustomButton>
        <CustomButton
          label={"Join Room"}
          style="secondary"
        ></CustomButton>
      </div>
    </div>
  );
};

export default GameType;
