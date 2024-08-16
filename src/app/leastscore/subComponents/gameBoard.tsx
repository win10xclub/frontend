import CustomButton from "@/components/CustomButton";
import React, { useState, useEffect, useRef } from "react";

const GameBoardPage = () => {
  const [recentCard] = useState(["0_3", "0_7", "3_2"]);
  const [selectedCard, setSelectedCard] = useState(null);
  //const cardContainerRef = useRef(null);

  const handleCardClick = (card: any) => {
    setSelectedCard((prevSelectedCard) =>
      prevSelectedCard === card ? null : card
    );
  };

  useEffect(() => {
    console.log(selectedCard);
  }, [selectedCard]);

  //   useEffect(() => {
  //     const handleClickOutside = (event: any) => {
  //       if (
  //         cardContainerRef.current
  //         //!cardContainerRef.current.contains(event.target)
  //       ) {
  //         console.log("click outside", cardContainerRef.current )
  //         setSelectedCard(null);
  //       }
  //     };

  //     document.addEventListener("click", handleClickOutside);
  //     return () => {
  //       document.removeEventListener("click", handleClickOutside);
  //     };
  //   },);

  return (
    <div
      className="w-full h-[20rem] rounded-[12px] flex justify-between items-start flex-wrap p-[1rem] gap-[1rem]"
      style={{
        background:
          "radial-gradient(circle, rgba(35,133,35,1) 30%, rgba(22,54,37,1) 100%)",
      }}
      //ref={cardContainerRef}
    >
      {/* recent swapped card */}
      <div className="w-[50%] relative flex">
        <div>
          {recentCard.map((card, index) => (
            <img
              key={card}
              className="h-[8rem] absolute cursor-pointer"
              style={{
                top: selectedCard === card ? "-1.5rem" : "0",
                left: `${index * 3}rem`,
                //zIndex: selectedCard === card ? "2" : "1",
                transition: "top 0.2s ease-in-out",
              }}
              src={`/cards/${card}.svg`}
              alt={`Card ${card}`}
              onClick={() => handleCardClick(card)}
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
              //top: selectedCard === card ? "-1.5rem" : "0",
              //left: `${index * 3}rem`,
              //zIndex: selectedCard === card ? "2" : "1",
              transition: "top 0.2s ease-in-out",
            }}
            src={`/cards/0_4.svg`}
            alt={`Card`}
            onClick={() => handleCardClick("1")}
          />
        </div>
      </div>

      {/* user card */}
      <div className="w-[60%] relative flex">
        <div className="self-end place-items-end">
          {recentCard.map((card, index) => (
            <img
              key={card}
              className="h-[8rem] absolute cursor-pointer"
              style={{
                top: selectedCard === card ? "-1.5rem" : "0",
                left: `${index * 3}rem`,
                //zIndex: selectedCard === card ? "2" : "1",
                transition: "top 0.2s ease-in-out",
              }}
              src={`/cards/${card}.svg`}
              alt={`Card ${card}`}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
      </div>

      {/* user card */}
      <div className="w-[30%] relative flex self-end">
        <div className="flex gap-[1rem] ml-auto">
          <CustomButton label={"Swap"} />
          <CustomButton label={"Declare"} />
        </div>
      </div>
    </div>
  );
};

export default GameBoardPage;
