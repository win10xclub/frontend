import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomOptionInput from "@/components/CustomOptionInput";
import axios from "axios";
import React, { useState } from "react";

function CreateRoom() {
  const [details, setDetails] = useState({
    game_type: 'max_score',
    score: '50',
    timer: '30',
    game_mode: 'public',
    max_players: '4'
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const gameOptions = [
    { value: "max_score", label: "Max Score" },
    { value: "knockout", label: "Knockout" },
  ];

  const timeOptions = [
    { value: "30", label: "30 sec" },
    { value: "60", label: "60 sec" },
    { value: "na", label: "No timeout" },
  ];

  const scoreOptions = [
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const gameMode = [
    { value: "public", label: "Public" },
    { value: "private", label: "Private" },
  ];

  const maxPlayers = [
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
  ]

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/play/hostgame",
        details,
        {
          withCredentials: true,
        }
      );
      console.log("Room created successful:", response.data);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }

  return (
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem]">
      <CustomOptionInput
        label="Select Game Type"
        options={gameOptions}
        name="gameType"
        id="gameType"
        onChange={handleChange}
        value={details.game_type}
      />
      <CustomOptionInput
        label="Max-Score"
        options={scoreOptions}
        name="maxScore"
        id="maxScore"
        onChange={handleChange}
        value={details.score}
      />
      <CustomOptionInput
        label="Auto-Play Timeout"
        options={timeOptions}
        name="time"
        id="time"
        onChange={handleChange}
        value={details.timer}
      />
      <CustomOptionInput
        label="Game Mode"
        options={gameMode}
        name="gameMode"
        id="gameMode"
        onChange={handleChange}
        value={details.game_mode}
      />
      <CustomOptionInput
        label="Max players"
        options={maxPlayers}
        name="maxPlayers"
        id="maxPlayers"
        onChange={handleChange}
        value={details.max_players}
      />
       <CustomButton label="Create a Room" onClick={onSubmit}></CustomButton>
    </div>
  );
}

export default CreateRoom;
