"use client";
import NavbarLayout from "@/components/NavbarLayout";
import React, { useEffect, useState } from "react";
import GameType from "./subComponents/gameType";
import GameForm from "./subComponents/gameForm";
import WaitingLobby from "./subComponents/waitingLobby";
import GameBoardPage from "./subComponents/gameBoard";

const LeastScorePage = () => {
  const [stepper, setStepper] = useState(0);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [tempFirst, setTempFirst] = useState();
  const [fetchCards, setFetched] = useState();

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080`);

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Response received:", data);

      if (data.success === true) {
        if (data.isStart) {
          setFetched(data.startGameResponse.users[0].cards);
          setTempFirst(data.startGameResponse.firstCard);
          setStepper(3);
          console.log(data.startGameResponse.users[0].cards);
        } else {
          localStorage.setItem("gameId", data.gameid);
          setStepper((prev: number) => prev + 1);
        }
      } else if (data.type === "error") {
        console.error(data.message);
      }
    };

    newSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    newSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(newSocket);

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <NavbarLayout>
      <div className="w-[100%] max-w-[48rem] mt-[2rem] flex flex-col gap-[1rem]">
        <div className="px-[1rem] py-[0.5rem] bg-secnColor rounded-[12px]">
          <h3>LeastScore</h3>
        </div>

        <div className="relative w-full bg-secnColor min-h-[10rem] rounded-[1rem] flex flex-col justify-center items-center gap-4 p-[0.25rem] mobile:p-[1rem]">
          {stepper === 0 && <GameType setStepper={setStepper}></GameType>}
          {(stepper === 1.1 || stepper === 1.2) && (
            <GameForm
              stepper={stepper}
              setStepper={setStepper}
              socket={socket} // Pass the socket prop here
            />
          )}
          {stepper >= 2 && stepper < 3 && (
            <WaitingLobby setStepper={setStepper} socket={socket} />
          )}
          {stepper === 3 && (
            <GameBoardPage
              socket={socket}
              fetchCard={fetchCards}
              tempFirst={tempFirst}
            />
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default LeastScorePage;
