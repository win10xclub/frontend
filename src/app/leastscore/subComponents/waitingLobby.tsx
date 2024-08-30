"use client";

import CustomButton from "@/components/CustomButton";
import React from "react";

interface WaitingLobbyProps {
  socket: WebSocket;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
}

const WaitingLobby: React.FC<WaitingLobbyProps> = ({ socket, setStepper }) => {
  const startGame = () => {
    if (socket) {
      socket.send(JSON.stringify({ type: "start_game", username: "YourUsername" }));
      console.log("Start game message sent to the server");
    }
  };

  return (
    <>
      
      <CustomButton label={"Start"} onClick={startGame} />
    </>
  );
};

export default WaitingLobby;
