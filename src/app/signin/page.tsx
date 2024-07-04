"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

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
    <div className="mt-[4rem] mx-auto max-w-[24rem] flex flex-col gap-[1rem]">
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
      <CustomButton label="Signin" onClick={onSignup}></CustomButton>
      <p className="text-[14px] text-center">
        New to here ?{" "}
        <Link className="underline underline-offset-2" href={"/signup"}>
          Signup
        </Link>
      </p>
    </div>
  );
}

export default SigninPage;
