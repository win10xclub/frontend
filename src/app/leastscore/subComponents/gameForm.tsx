import CustomButton from '@/components/CustomButton';
import CustomOptionInput from '@/components/CustomOptionInput';
import React, { useState } from 'react'

const GameForm = ({ setStepper }: any) => {

    const [selectedValue, setSelectedValue] = useState({
        gameType: "",
        visibility: "", // Fixed typo here
      });
    
      const options = {
        gameType: [
          {
            value: "knockout",
            label: "KnockOut",
          },
          {
            value: "maxscore",
            label: "Max Score",
          },
        ],
        visibility: [
          // Fixed typo here
          {
            value: "public",
            label: "Public",
          },
          {
            value: "private",
            label: "Private",
          },
        ],
      };
    
      const handleChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
        field: keyof typeof selectedValue
      ) => {
        const newValue = e.target.value;
        setSelectedValue((prev) => ({
          ...prev,
          [field]: newValue,
        }));
        console.log(`Selected ${field}:`, newValue);
      };

      const handleClick = () => {
        setStepper((prev: number) => prev + 1); // Increment the stepper value
      };

  return (
    <div className="w-[100%] bg-secnColor h-[20rem] rounded-[12px] flex flex-col justify-center items-center gap-[1rem]">
          <CustomOptionInput
            label={"Game Type"}
            options={options.gameType}
            name={"game_type"}
            id={"game_type"}
            value={selectedValue.gameType}
            onChange={(e) => handleChange(e, "gameType")}
          />
          <CustomOptionInput
            label={"Visibility"} // Fixed typo here
            options={options.visibility} // Fixed typo here
            name={"visibility"}
            id={"visibility"}
            value={selectedValue.visibility} // Fixed typo here
            onChange={(e) => handleChange(e, "visibility")}
          />
           <CustomButton label={'Create'} onClick={handleClick}></CustomButton>
        </div>

       
  )
}

export default GameForm