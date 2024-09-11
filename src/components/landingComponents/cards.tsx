"use client";
import { motion } from "framer-motion";
import React from "react";

interface ICustomCardProps {
  rotation: string;
  top?: string;
  left?: string;
  right?: string;
  card1?: string;
  card2?: string;
  card3?: string;
}

const Cards: React.FC<ICustomCardProps> = ({
  rotation,
  top,
  right,
  left,
  card1,
  card2,
  card3,
}) => {
  return (
    <div
      className={`absolute z-20 top-[1.5rem] left-[3.5rem] mobile:left-[2.5rem]`}
      style={{
        // top: top,
        // left: left,
        // right: right,
        rotate: rotation,
      }}
    >
      <div className="relative ">
        {card1 && (
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, rotate: -25 }}
            className=" w-[4rem] mobile:w-[5rem] shadow-[1px_2px_15px_0px] shadow-[#5b5958]"
            src={`/cards/${card1}.svg`}
            alt=""
          />
        )}

        {card3 && (
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, rotate: 8 }}
            transition={{delay: 0.2}}
            className="absolute w-[4rem] mobile:w-[5rem] shadow-[1px_2px_15px_0px] shadow-[#5b5958] top-[-1rem] left-[1.5rem] rotate-[8deg]"
            src={`/cards/${card3}.svg`}
            alt=""
          />
        )}

        {card2 && (
          <motion.img
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0, rotate: 30 }}
            transition={{delay: 0.4}}
            className="absolute w-[4rem] mobile:w-[5rem] shadow-[1px_2px_15px_0px] shadow-[#5b5958] top-[0rem] left-[3rem] rotate-[30deg]"
            src={`/cards/${card2}.svg`}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

export default Cards;
