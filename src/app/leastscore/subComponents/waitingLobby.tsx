"use client";

import CustomButton from "@/components/CustomButton";
import React, { useEffect, useState } from "react";

interface WaitingLobbyProps {
  socket: WebSocket | null;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
  players?: string[];  // Array of player names as strings
}

const WaitingLobby: React.FC<WaitingLobbyProps> = ({ socket, setStepper, players }) => {
  const [gameId, setGameId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGameId(localStorage.getItem("gameId"));
      setUsername(localStorage.getItem("username"));
    }
  }, []);

  const startGame = () => {
    if (socket && gameId) {
      socket.send(JSON.stringify({ type: "start", gameId }));
      console.log("Start game message sent to the server");
    }
  };

  return (
    <>
      {players && players[0] === username && (
        <CustomButton label={"Start"} onClick={startGame} />
      )}
      {players?.map((player, index) => (
        <p key={index}>{player}</p>
      ))}
    </>
  );
};

export default WaitingLobby;
