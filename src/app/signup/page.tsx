"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import CustomCheckBox from "@/components/CustomCheckBox";
import NavbarLayout from "@/components/NavbarLayout";
import { useRouter } from "next/navigation";

function SignupPage() {
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();
  const [otpVisble, setOtpVisible] = useState(true);
  const [otpField, setOtpField] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const onSignup = async () => {
    try {
      const response = await axios.post(
        `http://${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/user/signup`,
        details,
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
      router.push("/leastscore");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <NavbarLayout>
      <div className="mt-16 w-full max-w-md flex flex-col gap-4 bg-secnColor px-6 py-8 rounded-lg text-textColor">
        <h1 className="text-xl font-bold">Create an Account!</h1>
        <CustomInput
          type="text"
          name="username"
          placeholder="Username"
          value={details.username}
          onChange={handleChange}
          label="Username"
        />
        <CustomInput
          type="email"
          name="email"
          placeholder="Email"
          value={details.email}
          onChange={handleChange}
          label="Email"
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Password"
          value={details.password}
          onChange={handleChange}
          label="Password"
        />
        {otpVisble ?<div className="flex justify-between items-center text-sm">
          <CustomCheckBox
            label="Remember me"
            value={rememberMe}
            onChange={handleCheckBoxChange}
          />
          {/* Uncomment if needed */}
          {/* <Link className="underline text-sm text-accColor" href="/forgotpassword">
            Forgot Password?
          </Link> */}
        </div> : (
          <CustomInput
            type="text"
            name="otp"
            placeholder="otp"
            value={otpField}
            onChange={(e) => setOtpField(e.target.value)}
            label="OTP"
          />
        )}
        <CustomButton label="Signup" onClick={onSignup} />
        <p className="text-sm text-center">
          Already have an account?
          <Link className="underline text-accColor pl-2" href="/signin">
            Log in
          </Link>
        </p>
      </div>
    </NavbarLayout>
  );
}

export default SignupPage;
