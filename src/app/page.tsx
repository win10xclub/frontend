"use client";
import CustomButton from "@/components/CustomButton";
import Image from "next/image";
import { MouseEvent, useState } from "react";
import CreateRoom from "./(form)/CreateRoom";
import JoinRoom from "./(form)/JoinRoom";
import axios from "axios";

export default function Home() {
  const [mode, setMode] = useState("");

  const onJoinRandom = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/play/joinrandom",
        
        {
          withCredentials: true,
        }
      );
      console.log("Room joined successful:", response.data);
    } catch (error) {
      console.error("Error joining room:", error);
    }
  }

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
            onClick={onJoinRandom}
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
      {mode && <CustomButton label="Back" onClick={() => setMode("")} />}
    </div>
  );
}
