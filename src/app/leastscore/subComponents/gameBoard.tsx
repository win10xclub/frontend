"use client";

import CustomButton from "@/components/CustomButton";
import React, { useState, useEffect } from "react";

interface GameBoardPageProps {
  socket: WebSocket | null;
  fetchCard: string[];
  tempFirst: string;
}

interface SelectedCard {
  pickedFrom: string;
  pickedCard: string;
  discardedCard: string;
}

interface ShowResult {
  winnerUsername: string;
  sum: number;
}

const GameBoardPage: React.FC<GameBoardPageProps> = ({
  socket,
  fetchCard,
  tempFirst,
}) => {
  const [firstCard, setFirstCard] = useState([tempFirst]);
  const [userCard, setUserCard] = useState(fetchCard);
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedCard, setSelectedCard] = useState<SelectedCard>({
    pickedFrom: "",
    pickedCard: "",
    discardedCard: "",
  });
  const [showResult, setShowResult] = useState<ShowResult | null>(null);

  useEffect(() => {
    // Update userCard when fetchCard changes
    setUserCard(fetchCard);
  }, [fetchCard]);

  console.log("hame - ", userCard);

  // Helper to safely access localStorage
  const getFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }
    return null;
  };

  const username = getFromLocalStorage("username");
  const gameId = getFromLocalStorage("gameId");

  useEffect(() => {
    setIsDisabled(
      !(getFromLocalStorage("turn") === getFromLocalStorage("username"))
    );
  }, []);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);

        // if (data.status == "success") {
        //   if (data.type == "declareResult") {
        //     setShowResult({
        //       winnerUsername: data.data.minUser.username,
        //       sum: data.data.minUser.sum,
        //     });
        //     // setTimeout(() => {
        //     //   window.location.reload();
        //     // }, 10000);
        //   }
        // }
        if (data.status == "success") {
          if (data.type == "declareResult") {
            setShowResult({
              winnerUsername: data.data.minUser.username,
              sum: data.data.minUser.sum,
            });
            // setTimeout(() => {
            //   window.location.reload();
            // }, 10000);
          } else if (data.type == "gameStart") {

            setShowResult(null);
            setFirstCard([data.data.firstCard]);
            console.log(data.data.firstCard[0], " -- ", data.data.firstCard);
            setUserCard(data.data.userCards);

            if (data.data.currentTurn == username) {
              setIsDisabled(false);
            }

          } else {
            setFirstCard(data.data.firstCard);

            console.log(
              data.data.firstCard[0],
              " -- ",
              data.data.exchangeCard[0]
            );

            if (data.data.nextPlayer == username) {
              setIsDisabled(false);
            }

            // Update userCard state
            if (data.data.username == username) {
              setUserCard((prevUserCard) => {
                const newArray = prevUserCard.filter(
                  (card) => !data.data.firstCard.includes(card)
                );
                newArray.push(data.data.exchangeCard[0]);
                return newArray;
              });
            }
          }
        } else {
          console.error(data.error);
        }
      };

      if (socket.readyState === WebSocket.OPEN) {
        const joinMessage = {
          type: "join",
          username,
          gameId,
        };
        socket.send(JSON.stringify(joinMessage));
      }
    }
  }, [socket, username, gameId]);

  const actions = (typePara: string) => {
    setIsDisabled(true);
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = {
        type: typePara,
        username,
        gameId,
        moveData: selectedCard,
      };
      socket.send(JSON.stringify(message));
      console.log("Message sent - " + typePara);
    }
  };

  const handleCardClick = (type: string, card: string) => {
    setSelectedCard((prevSelectedCard) => {
      if (type === "deck") {
        return prevSelectedCard.pickedFrom === "deck"
          ? { ...prevSelectedCard, pickedFrom: "", pickedCard: "" }
          : { ...prevSelectedCard, pickedFrom: "deck", pickedCard: "" };
      }
      if (type === "discard") {
        return prevSelectedCard.pickedCard === card
          ? { ...prevSelectedCard, pickedFrom: "", pickedCard: "" }
          : { ...prevSelectedCard, pickedFrom: "firstcard", pickedCard: card };
      }
      if (type === "user") {
        return prevSelectedCard.discardedCard === card
          ? { ...prevSelectedCard, discardedCard: "" }
          : { ...prevSelectedCard, discardedCard: card };
      }
      return prevSelectedCard;
    });
  };

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  return (
    <div
      className="relative w-full h-[18rem] mobile:h-[25rem] rounded-[12px] flex flex-col justify-between items-start flex-wrap p-[1rem] gap-[1rem]"
      style={{
        background:
          "radial-gradient(circle, rgba(35,133,35,1) 30%, rgba(22,54,37,1) 100%)",
      }}
    >
      {showResult && (
        <div className="absolute z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-secnColor rounded-md p-[1rem] ">
          Table Winner : {showResult.winnerUsername} <br />
          with sum of {showResult.sum}
        </div>
      )}

      {/* exchange card div */}
      <div className="w-[100%] relative flex justify-between">
        {/* recent swapped card */}
        <div className="w-[50%] relative flex">
          <div>
            {firstCard.map((card, index) => (
              <img
                key={card}
                className="h-[6rem] mobile:h-[8rem] absolute cursor-pointer"
                style={{
                  top: selectedCard.pickedCard === card ? "-1.5rem" : "0",
                  left:
                    window.innerWidth < 620
                      ? `${index * 1.5}rem`
                      : `${index * 3}rem`,
                  transition: "top 0.2s ease-in-out",
                }}
                src={`/cards/${card}.svg`}
                alt={`Card ${card}`}
                onClick={() => handleCardClick("discard", card)}
              />
            ))}
          </div>
        </div>

        {/* deck card */}
        <div className="w-[30%] relative flex">
          <div>
            <img
              className="h-[6rem] mobile:h-[8rem] ml-auto absolute cursor-pointer right-0 rounded-[6px]"
              style={{
                top: selectedCard.pickedFrom === "deck" ? "-1.5rem" : "0",
                left: `3rem`,
                zIndex: selectedCard.pickedFrom === "deck" ? "2" : "1",
                transition: "top 0.2s ease-in-out",
              }}
              src={`/cards/back.png`}
              alt="Card"
              onClick={() => handleCardClick("deck", "deck")}
            />
          </div>
        </div>
      </div>

      {/* user card and action button div */}
      <div className="w-[100%] flex justify-between">
        {/* user card */}
        <div className="w-[50%] mobile:w-[60%] relative flex">
          <div className="h-[6rem] mobile:h-[8rem]">
            {userCard.map((card, index) => (
              <img
                key={card}
                className="h-[6rem] mobile:h-[8rem] absolute rounded-[8px] cursor-pointer shadow-[1px_2px_15px_0px] shadow-[#5b5958]"
                style={{
                  top: selectedCard.discardedCard === card ? "-1.5rem" : "0rem",
                  left:
                    window.innerWidth < 620
                      ? `${index * 1.5}rem`
                      : `${index * 3}rem`,
                  transition: "top 0.2s ease-in-out",
                }}
                src={`/cards/${card}.svg`}
                alt={`Card ${card}`}
                onClick={() => handleCardClick("user", card)}
              />
            ))}
          </div>
        </div>

        {/* action buttons */}
        <div className="w-[40%] mobile:w-[30%] flex justify-end items-end gap-[1rem]">
          <CustomButton
            disabled={isDisabled}
            label="Declare"
            onClick={() => actions("declare")}
          />
          <CustomButton
            disabled={isDisabled}
            label="Swap"
            onClick={() => actions("move")}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoardPage;
