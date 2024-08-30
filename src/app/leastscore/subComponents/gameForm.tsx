"use client";

import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import CustomOptionInput from "@/components/CustomOptionInput";
import { ArrowLeft } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";

const GameForm = ({ stepper, setStepper, socket }: any) => {
  const [selectedValue, setSelectedValue] = useState({
    game_type: "",
    timer: "30",
    game_mode: "public",
    score: "50",
    max_players: "3",
  });

  const [code, setCode] = useState("");

  const options = {
    game_type: [
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

  const createRoom = () => {
    if (socket) {
      const data = {
        type: "hostgame",
        hostData: selectedValue,
        username: "YourUsername",
      };
      socket.send(JSON.stringify(data));
      console.log("Create room data sent to server:", data);
    }
  };

  const joinRoom = () => {
    if (socket) {
      const data = {
        type: "joingame",
        joinData: code,
        username: "YourUsername",
      };
      socket.send(JSON.stringify(data));
      console.log("Join room data sent to server:", data);
    }
  };

  const renderOptionInputs = () =>
    Object.keys(options).map((key) => (
      <CustomOptionInput
        key={key}
        label={key.replace(/_/g, " ")}
        options={options[key as keyof typeof options]}
        name={key}
        id={key}
        value={selectedValue[key as keyof typeof selectedValue]}
        onChange={(e) => handleChange(e, key as keyof typeof selectedValue)}
      />
    ));

  return (
    <>
      <button
        className="absolute left-[1rem] top-[1rem] bg-terColor rounded-[8px] px-[1rem] py-[0.5rem]"
        onClick={() => setStepper(0)}
      >
        <ArrowLeft size={20} />
      </button>
      {stepper === 1.1 ? (
        <>
          {renderOptionInputs()}
          <CustomButton label={"Create"} onClick={createRoom} />
        </>
      ) : (
        <>
          <CustomInput
            label={"Enter Room ID"}
            onChange={(e) => setCode(e.target.value)}
            type={"text"}
          />
          <CustomButton label={"Join"} onClick={joinRoom} />
        </>
      )}
    </>
  );
};

export default GameForm;
