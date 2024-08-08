"use client";
import CustomButton from "@/components/CustomButton";
import NavbarLayout from "@/components/NavbarLayout";
import React from "react";

const LeastScorePage = () => {
  return (
    <NavbarLayout>
      <div className="w-[100%] max-w-[48rem] mt-[2rem] flex flex-col gap-[1rem]">
        <div className="px-[1rem] py-[0.5rem] bg-secnColor rounded-[12px]">
          <h3>LeastScore</h3>
        </div>
        <div className="w-[100%] bg-secnColor h-[10rem] rounded-[12px] flex flex-col justify-center items-center gap-[1rem]">
          <CustomButton label={"Online Play"}></CustomButton>
          <div className="flex gap-[1rem]">
            <CustomButton label={"Create Room"} style="secondary"></CustomButton>
            <CustomButton label={"Join Room"} style="secondary"></CustomButton>
          </div>
        </div>
        {/* <div
          className="w-[100%] h-[10rem] rounded-[12px]"
          style={{
            background:
              "radial-gradient(circle, rgba(35,133,35,1) 30%, rgba(22,54,37,1) 100%)",
          }}
        ></div> */}
      </div>
    </NavbarLayout>
  );
};

export default LeastScorePage;
