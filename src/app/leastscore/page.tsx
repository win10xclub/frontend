"use client";
import CustomOptionInput from "@/components/CustomOptionInput";
import NavbarLayout from "@/components/NavbarLayout";
import React, { useEffect, useState } from "react";
import GameType from "./subComponents/gameType";
import GameForm from "./subComponents/gameForm";
import WaitingLobby from "./subComponents/waitingLobby";

const LeastScorePage = () => {

  const [stepper, setStepper] = useState(0);

  useEffect(() => {
    console.log(stepper)
  },[stepper])

  return (
    <NavbarLayout>
      <div className="w-[100%] max-w-[48rem] mt-[2rem] flex flex-col gap-[1rem]">
        <div className="px-[1rem] py-[0.5rem] bg-secnColor rounded-[12px]">
          <h3>LeastScore</h3>
        </div>

        {/* <div
          className="w-[100%] h-[10rem] rounded-[12px]"
          style={{
            background:
              "radial-gradient(circle, rgba(35,133,35,1) 30%, rgba(22,54,37,1) 100%)",
          }}
        ></div> */}

        { stepper == 0 && <GameType setStepper={setStepper}></GameType>}

        { stepper == 1 && <GameForm setStepper={setStepper}></GameForm>}

        { stepper == 2 && <WaitingLobby></WaitingLobby>}

        
      </div>
    </NavbarLayout>
  );
};

export default LeastScorePage;
