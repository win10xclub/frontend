"use client";

import CustomButton from "@/components/CustomButton";
import React, { useState, useEffect } from "react";

interface GameBoardPageProps {
  socket: WebSocket | null;
  fetchCard: [];
  tempFirst: string;
}

const GameBoardPage: React.FC<GameBoardPageProps> = ({ socket, fetchCard, tempFirst }) => {
  const [firstCard, setfirstCard] = useState([tempFirst]);
  const [userCard, setUserCard] = useState(fetchCard);
  const [type, setType] = useState("join");
  const [selectedCard, setSelectedCard] = useState({
    pickedFrom: "",
    pickedCard: "",
    discardedCard: "",
  });

  const username = "kmr"; // Replace with actual username
  const gameId = "138FFP"; // Replace with actual game ID

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log("Message received:", data);

        if (data.cards) {
          setUserCard(data.cards);
        }
        if (data.play_deck) {
          //setfirstCard(data.play_deck);
        }
        if (data.firstCard) {
          setfirstCard([data.firstCard]);
          // Handle firstCard if needed
        }
        if (data.error) {
          console.error(data.error);
        }
      };

      if (socket.readyState === WebSocket.OPEN) {
        const joinMessage = { type: "join", username, gameId: localStorage.getItem("gameId") };
        socket.send(JSON.stringify(joinMessage));
      }
    }
  }, [socket, username, gameId]);

  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = { type, username, gameId, moveData: selectedCard };
      socket.send(JSON.stringify(message));
    }
  }, [type, socket, selectedCard]);

  const handleCardClick = (type, card) => {
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
      className="w-full h-[18rem] mobile:h-[25rem] rounded-[12px] flex flex-col justify-between items-start flex-wrap p-[1rem] gap-[1rem]"
      style={{
        background:
          "radial-gradient(circle, rgba(35,133,35,1) 30%, rgba(22,54,37,1) 100%)",
      }}
    >
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
                  left: window.innerWidth < 620 ? `${index * 1.5}rem` : `${index * 3}rem`,
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
          <div className="">
            <img
              className="h-[6rem] mobile:h-[8rem] ml-auto absolute cursor-pointer right-0 rounded-[6px]"
              style={{
                top: selectedCard.pickedFrom === "deck" ? "-1.5rem" : "0",
                left: `3rem`,
                zIndex: selectedCard.pickedFrom === "deck" ? "2" : "1",
                transition: "top 0.2s ease-in-out",
              }}
              src={`/cards/back.png`}
              alt={`Card`}
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
                className="h-[6rem] mobile:h-[8rem] absolute cursor-pointer"
                style={{
                  top: selectedCard.discardedCard === card ? "-1.5rem" : "0rem",
                  left: window.innerWidth < 620 ? `${index * 1.5}rem` : `${index * 3}rem`,
                  transition: "top 0.2s ease-in-out",
                }}
                src={`/cards/${card}.svg`}
                alt={`Card ${card}`}
                onClick={() => handleCardClick("user", card)}
              />
            ))}
          </div>
        </div>

        {/* action button */}
        <div className="w-[40%] mobile:w-[30%] flex items-end">
          <CustomButton
            type="primary"
            label="Declare"
            customClass="w-[100%] text-[14px] py-[0.25rem] px-[0.5rem] mobile:py-[0.5rem] mobile:px-[1rem] bg-primaryColor rounded-[6px] cursor-pointer"
            onClick={() => setType("declare")}
          />
        </div>
      </div>
    </div>
  );
};

export default GameBoardPage;
