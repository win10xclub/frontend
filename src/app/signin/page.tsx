"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import CustomCheckBox from "@/components/CustomCheckBox";

function SigninPage() {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const onSignup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/user/signin",
        details,
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem] bg-secnColor px-[1.5rem] py-[2rem] rounded-[1rem] text-textColor">
      <h1 className="text-[1.5rem] font-bold">Welcome Back !</h1>
      <CustomInput
        type="email"
        name="email"
        placeholder="email"
        value={details.email}
        onChange={handleChange}
        label="Email"
      ></CustomInput>
      <CustomInput
        type="password"
        name="password"
        placeholder="password"
        value={details.password}
        onChange={handleChange}
        label="Password"
      />
      <div className="flex justify-between items-center text-14px">
        <CustomCheckBox label={"Remember me"} value={false}></CustomCheckBox>
      <Link
          className="underline underline-offset-2 text-[14px] text-accColor"
          href={"/forgotpassword"}
        >
          Forgot Password ?
        </Link>
      </div>
      
      <CustomButton label="Signin" onClick={onSignup}></CustomButton>
      <p className="text-[14px] text-center">
        Not registered?
        <Link
          className="underline underline-offset-2 text-accColor pl-[0.5rem]"
          href={"/signup"}
        >
          Create account
        </Link>
      </p>
    </div>
  );
}

export default SigninPage;
