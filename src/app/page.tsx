"use client";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import { useState } from "react";
import JoinRoom from "./(form)/joinRoom";
import CreateRoom from "./(form)/CreateRoom";

export default function Home() {
  const [mode, setMode] = useState("");

  return (
    <div className="max-w-[24rem] mx-auto mt-[4rem] flex flex-col gap-[1rem]">
      {mode == "joinId" ? (
        <JoinRoom></JoinRoom>
      ) : mode == "create" ? (
        <CreateRoom></CreateRoom>
      ) : (
        <>
          <CustomButton
            label="Join Game"
            onClick={(e) => setMode("join")}
          ></CustomButton>
          <div className="w-[100%] h-[0.1rem] bg-yellow-400"></div>
          <CustomButton
            label="Create a Room"
            onClick={(e) => setMode("create")}
          ></CustomButton>
          <CustomButton
            label="Join Room"
            onClick={(e) => setMode("joinId")}
          ></CustomButton>
        </>
      )}
    </div>
  );
}
