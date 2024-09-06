"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import CustomCheckBox from "@/components/CustomCheckBox";
import NavbarLayout from "@/components/NavbarLayout";
import { useRouter } from "next/navigation";

function AuthPage() {
  const router = useRouter();
  const [formDetails, setFormDetails] = useState({
    username: "",
    email: "",
    password: "",
    otp: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [otpVisible, setOtpVisible] = useState(false);
  const [authType, setAuthType] = useState("signin");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  };

  const handleAuth = async () => {
    try {
      const url =
        authType === "signin"
          ? `http://${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/user/signin`
          : `http://${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/user/signup`;

      const response = await axios.post(
        url,
        authType == "signin"
          ? { username: formDetails.username, password: formDetails.password }
          : {
              username: formDetails.username,
              email: formDetails.email,
              password: formDetails.password,
            },
        {
          withCredentials: true,
        }
      );
      console.log(
        `${authType === "signin" ? "Signin" : "Signup"} successful:`,
        response.data
      );
      setOtpVisible(true);
    } catch (error) {
      console.error(
        `Error ${authType === "signin" ? "signing in" : "registering"}:`,
        error
      );
    }
  };

  const handleOtpValidation = async () => {
    try {
      const url = `http://${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/user/check`;

      const response = await axios.post(
        url,
        { 
          username: formDetails.username,
          otp: formDetails.otp 
        },
        {
          withCredentials: true,
        }
      );
      console.log(
        `${
          authType === "signin" ? "Signin" : "Signup"
        } OTP validation successful:`,
        response.data
      );
      router.push("/leastscore");
    } catch (error) {
      console.error(
        `Error validating ${authType === "signin" ? "signin" : "signup"} OTP:`,
        error
      );
    }
  };

  const renderInputs = () => (
    <>
      <CustomInput
        type="text"
        name="username"
        placeholder="Username"
        value={formDetails.username}
        onChange={handleChange}
        label="Username"
      />

      {authType === "signup" && (
        <CustomInput
          type="email"
          name="email"
          placeholder="Email"
          value={formDetails.email}
          onChange={handleChange}
          label="Email"
        />
      )}
      <CustomInput
        type="password"
        name="password"
        placeholder="Password"
        value={formDetails.password}
        onChange={handleChange}
        label="Password"
      />
    </>
  );

  const renderAuthButtons = () => (
    <>
      {otpVisible ? (
        <>
          <CustomInput
            type="text"
            name="otp"
            placeholder="OTP"
            value={formDetails.otp}
            onChange={handleChange}
            label="OTP"
          />
          <CustomButton label="Validate OTP" onClick={handleOtpValidation} />
        </>
      ) : (
        <CustomButton
          label={authType === "signin" ? "Signin" : "Signup"}
          onClick={handleAuth}
        />
      )}
    </>
  );

  const renderLinks = () => (
    <p className="text-sm text-center">
      {authType === "signin" ? (
        <>
          Not registered?{" "}
          <span
            className="underline text-accColor pl-2 cursor-pointer"
            onClick={() => setAuthType("signup")}
          >
            Create account
          </span>
        </>
      ) : (
        <>
          Already have an account?{" "}
          <span
            className="underline text-accColor pl-2 cursor-pointer"
            onClick={() => setAuthType("signin")}
          >
            Log in
          </span>
        </>
      )}
    </p>
  );

  return (
    <NavbarLayout>
      <div className="mt-16 w-full max-w-md flex flex-col gap-4 bg-secnColor px-6 py-8 rounded-lg text-textColor">
        <h1 className="text-xl font-bold">
          {authType === "signin" ? "Welcome Back!" : "Create an Account!"}
        </h1>
        {renderInputs()}
        {!otpVisible && (
          <div className="flex justify-between items-center text-sm">
            <CustomCheckBox
              label="Remember me"
              value={rememberMe}
              onChange={handleCheckBoxChange}
            />
            <Link
              className="underline text-sm text-accColor"
              href="/forgotpassword"
            >
              Forgot Password?
            </Link>
          </div>
        )}
        {renderAuthButtons()}
        {renderLinks()}
      </div>
    </NavbarLayout>
  );
}

export default AuthPage;
