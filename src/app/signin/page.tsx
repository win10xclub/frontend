"use client";
import React, { useState } from "react";
import axios from "axios";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
import CustomCheckBox from "@/components/CustomCheckBox";
import NavbarLayout from "@/components/NavbarLayout";
import { useRouter } from "next/navigation";

function SigninPage() {
  const router = useRouter();
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);
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
        `http://${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/user/signin`,
        details,
        {
          withCredentials: true,
        }
      );
      console.log("Registration successful:", response.data);
      setOtpVisible(true)
      //router.push("/leastscore");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <NavbarLayout>
      <div className="mt-[4rem] w-[100%] max-w-[24rem] flex flex-col gap-[1rem] bg-secnColor px-[1.5rem] py-[2rem] rounded-[1rem] text-textColor">
        <h1 className="text-[1.5rem] font-bold">Welcome Back !</h1>
        <CustomInput
          type="text"
          name="username"
          placeholder="username"
          value={details.username}
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
        {otpVisble ? (
          <div className="flex justify-between items-center text-14px">
            <CustomCheckBox
              label="Remember me"
              value={rememberMe}
              onChange={handleCheckBoxChange}
            />
            <Link
              className="underline underline-offset-2 text-[14px] text-accColor"
              href={"/forgotpassword"}
            >
              Forgot Password ?
            </Link>
          </div>
        ) : (
          <CustomInput
            type="text"
            name="otp"
            placeholder="otp"
            value={otpField}
            onChange={(e) => setOtpField(e.target.value)}
            label="OTP"
          />
        )}

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
    </NavbarLayout>
  );
}

export default SigninPage;
