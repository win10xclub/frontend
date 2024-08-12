import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomOptionInput from "@/components/CustomOptionInput";
import { ArrowLeft } from "@phosphor-icons/react";
import axios from "axios";
import React, { useState } from "react";

const GameForm = ({ stepper, setStepper }: any) => {
  const [selectedValue, setSelectedValue] = useState({
    game_type: "",
    timer: "30",
    game_mode: "public",
    score: "50",
    max_players: "3",
  });

  const [code, setCode] = useState("");

  const options = {
    gameType: [
      { value: "knockout", label: "KnockOut" },
      { value: "max_score", label: "Max Score" },
    ],
    game_mode: [
      { value: "public", label: "Public" },
      { value: "private", label: "Private" },
    ],
    timer: [
      { value: "30", label: "30" },
      { value: "60", label: "60" },
      { value: "NA", label: "No Time Limit" },
    ],
    score: [
      { value: "50", label: "50" },
      { value: "100", label: "100" },
    ],
    max_players: [
      { value: "2", label: "2" },
      { value: "3", label: "3" },
      { value: "4", label: "4" },
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

  const createRoom = async () => {
    try {
      const res = await axios.post(
        `http://${process.env.NEXT_PUBLIC_GAMEROOM_API_URL}/api/play/hostgame`,
        selectedValue,
        {
          withCredentials: true,
        }
      );
      setStepper((prev: number) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const joinRoom = async () => {
    try {
      const res = await axios.post(
        `http://${process.env.NEXT_PUBLIC_GAMEROOM_API_URL}/api/play/joinbyid`,
        { code: code },
        {
          withCredentials: true,
        }
      );
      setStepper((prev: number) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        className="absolute left-[1rem] top-[1rem] bg-terColor rounded-[8px] px-[1rem] py-[0.5rem]"
        onClick={() => setStepper(0)}
      >
        <ArrowLeft size={20} />
      </button>
      {stepper == 1.1 ? (
        <>
          <CustomOptionInput
            label={"Game Type"}
            options={options.gameType}
            name={"game_type"}
            id={"game_type"}
            value={selectedValue.game_type}
            onChange={(e) => handleChange(e, "game_type")}
          />
          <CustomOptionInput
            label={"Game Mode"}
            options={options.game_mode}
            name={"game_mode"}
            id={"game_mode"}
            value={selectedValue.game_mode}
            onChange={(e) => handleChange(e, "game_mode")}
          />
          <CustomOptionInput
            label={"Timer"}
            options={options.timer}
            name={"timer"}
            id={"timer"}
            value={selectedValue.timer}
            onChange={(e) => handleChange(e, "timer")}
          />
          <CustomOptionInput
            label={"Score"}
            options={options.score}
            name={"score"}
            id={"score"}
            value={selectedValue.score}
            onChange={(e) => handleChange(e, "score")}
          />
          <CustomOptionInput
            label={"Max Players"}
            options={options.max_players}
            name={"max_players"}
            id={"max_players"}
            value={selectedValue.max_players}
            onChange={(e) => handleChange(e, "max_players")}
          />
          <CustomButton label={"Create"} onClick={createRoom} />
        </>
      ) : (
        <>
          <CustomInput
            label={"Enter Room ID"}
            onChange={(e) => setCode(e.target.value)}
            type={"text"}
          ></CustomInput>
          <CustomButton label={"Create"} onClick={joinRoom} />
        </>
      )}
    </>
  );
};

export default GameForm;
