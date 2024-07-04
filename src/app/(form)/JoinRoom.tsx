import CustomInput from "@/components/CustomInput";
import React, { useState } from "react";

function JoinRoom() {
  const [roomId, setRoomId] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

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
    </div>
  );
}

export default JoinRoom;
