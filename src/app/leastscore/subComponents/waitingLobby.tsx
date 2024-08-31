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
      console.log(localStorage.getItem("gameId"))
      socket.send(JSON.stringify({ type: "start", gameId: localStorage.getItem("gameId") }));
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
