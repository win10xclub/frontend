import CustomButton from "@/components/CustomButton";
import React, { useState, useEffect, useRef } from "react";

const GameBoardPage = () => {
  const [firstCard, setfirstCard] = useState(["1_5"]);
  const [userCard, setUserCard] = useState(["0_3", "0_7", "3_2"]);
  const [type, setType] = useState("join");
  const [selectedCard, setSelectedCard] = useState({
    pickedFrom: "",
    pickedCard: "",
    discardedCard: "",
  });
  //const cardContainerRef = useRef(null);

  const [socket, setSocket] = useState<WebSocket | null>(null);

  const username = "nikhil"; // Replace with actual username
  const gameId = "138FFP"; // Replace with actual game ID

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("Connection established");
      // Send a join message when connection is established
      newSocket.send(JSON.stringify({ type: "join", username, gameId }));
    };

    newSocket.onmessage = (event) => {
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

    setSocket(newSocket);

    return () => newSocket.close();
  }, [username, gameId]);

  useEffect(() => {
    if (socket) {
      if (socket.readyState === WebSocket.OPEN) {
        const message = { type, username, gameId, moveData: selectedCard };
        socket.send(JSON.stringify(message));
      } else {
        // Optionally handle case where WebSocket is not open
        console.log("WebSocket is not open. Cannot send message.");
      }
    }
  }, [type, selectedCard, socket]);

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
      className="w-full h-[25rem] rounded-[12px] flex justify-between items-start flex-wrap p-[1rem] gap-[1rem]"
      style={{
        background:
          "radial-gradient(circle, rgba(35,133,35,1) 30%, rgba(22,54,37,1) 100%)",
      }}
      //ref={cardContainerRef}
    >
      {/* recent swapped card */}
      <div className="w-[50%] relative flex">
        <div>
          {firstCard.map((card, index) => (
            <img
              key={card}
              className="h-[8rem] absolute cursor-pointer"
              style={{
                top: selectedCard.pickedCard === card ? "-1.5rem" : "0",
                left: `${index * 3}rem`,
                //zIndex: selectedCard === card ? "2" : "1",
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
      <div className="w-[20%] relative flex">
        <div className=" ml-auto">
          <img
            className="h-[8rem] absolute cursor-pointer right-0"
            style={{
              top: selectedCard.pickedFrom === "deck" ? "-1.5rem" : "0",
              left: `3rem`,
              zIndex: selectedCard.pickedFrom === "deck" ? "2" : "1",
              transition: "top 0.2s ease-in-out",
            }}
            src={`/cards/0_4.svg`}
            alt={`Card`}
            onClick={() => handleCardClick("deck", "deck")}
          />
        </div>
      </div>

      {/* user card */}
      <div className="w-[60%] relative flex mt-auto">
        <div className="h-[8rem]">
          {userCard.map((card, index) => (
            <img
              key={card}
              className="h-[8rem] absolute cursor-pointer"
              style={{
                top: selectedCard.discardedCard === card ? "-1.5rem" : "0rem",
                left: `${index * 3}rem`,
                //zIndex: selectedCard === card ? "2" : "1",
                transition: "top 0.2s ease-in-out",
              }}
              src={`/cards/${card}.svg`}
              alt={`Card ${card}`}
              onClick={() => handleCardClick("user", card)}
            />
          ))}
        </div>
      </div>

      {/* user card */}
      <div className="w-[30%] relative flex self-end">
        <div className="flex gap-[1rem] ml-auto">
          <CustomButton label={"Swap"} onClick={() => setType("move")} />
          <CustomButton label={"Declare"} onClick={() => setType("declare")} />
        </div>
      </div>
    </div>
  );
};

export default GameBoardPage;
