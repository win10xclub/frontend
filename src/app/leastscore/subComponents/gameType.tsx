import CustomButton from "@/components/CustomButton";
import React from "react";

const GameType = ({ setStepper }: any) => {
  // Define the function to handle the click event
  const handleClick = (increment: number) => {
    setStepper((prev: number) => prev + increment); // Increment the stepper value
  };

  return (
    <>
      {/* <CustomButton
        label={"Online Play"}
        style="primary"
        onClick={() => handleClick(3)} // Add +2 for Online Play
      /> */}
      <div className="flex gap-4">
        <CustomButton
          label={"Create Room"}
          style="secondary"
          onClick={() => handleClick(1.1)} // Add +1.1 for Create Room
        />
        <CustomButton
          label={"Join Room"}
          style="secondary"
          onClick={() => handleClick(1.2)} // Add +1.2 for Join Room
        />
      </div>
    </>
  );
};

export default GameType;
