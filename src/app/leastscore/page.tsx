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
  const [tempFirst, setTempFirst] = useState<string | undefined>();
  const [fetchCards, setFetched] = useState<string[] | null>();
  const [players, setPlayers] = useState<any[]>([]);

  // Helper function to safely access localStorage
  const getFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://${process.env.NEXT_PUBLIC_GAMEROOM_API_URL}`
    );

    newSocket.onopen = () => {
      console.log("WebSocket connection established");
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Response received:", data);

      // if (data.type === "playerTurn") {
      //   if (typeof window !== "undefined") {
      //     localStorage.setItem("turn", data.username);
      //   }
      //   console.log("hii ", data.userCards);
      //   setFetched(data.userCards);
      // }

      if (data.status == "success") {
        if (data.type == "hostgame") {
          localStorage.setItem("gameId", data.data.gameId);
          setStepper((prev: number) => prev + 1);
        }

        if (data.type == "joingame") {
          localStorage.setItem("gameId", data.data.gameId);
          setStepper((prev: number) => prev + 1);
        }

        if (data.type === "lobbyUpdate") {
          setPlayers(data.data.players);
        }

        if (data.type == "gameStart") {
          console.log(data);
          //setFetched(data.startGameResponse.users[0].cards);
          localStorage.setItem("turn", data.data.currentTurn)
          setTempFirst(data.data.firstCard);
          setFetched(data.data.userCards);
          setStepper(3);
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
          {stepper === 0 && <GameType setStepper={setStepper} />}

          {(stepper === 1.1 || stepper === 1.2) && (
            <GameForm
              stepper={stepper}
              setStepper={setStepper}
              socket={socket}
            />
          )}

          {stepper >= 2 && stepper < 3 && (
            <WaitingLobby
              setStepper={setStepper}
              socket={socket}
              players={players}
            />
          )}

          {stepper === 3 && (fetchCards?.length ?? 0) > 0 && (
            <GameBoardPage
              socket={socket}
              fetchCard={fetchCards || []}
              tempFirst={tempFirst || ""}
              //players={players}
            />
          )}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default LeastScorePage;
