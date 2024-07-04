import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import axios from "axios";
import React, { useState } from "react";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  const onSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/play/joinbyid",
        {code: roomId},
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
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem]">
      <CustomInput
        type="text"
        name="roomId"
        placeholder="Enter Room ID"
        value={roomId}
        onChange={handleChange}
        label="Room ID"
      />
      <CustomButton
        label="Join Room"
        onClick={onSubmit}
      ></CustomButton>
    </div>
  );
}

export default JoinRoom;
