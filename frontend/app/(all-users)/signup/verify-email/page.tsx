"use client";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import OtpInput from "react-otp-input";
import Link from "next/link";
import React from "react";
import CustomButton from "@/components/common/CustomButton";

export default function page() {
  const [otp, setOtp] = React.useState<string>("");

  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="flex flex-col w-11/12 max-w-[400px] mx-auto gap-2">
        <h2 className="font-bold font-rubik text-3xl">Verify email</h2>
        <p className="dark:text-richblack-200 text-justify text-black ">
          A verification code has been sent to you. Enter the code below
        </p>

        <div className="flex flex-col justify-center items-center w-full my-5">
          <OtpInput
            inputStyle={{
              width: "3.5rem",
              height: "3.5rem",
              borderRadius: "0.5rem",
              border: "1px solid #000000",              
            }}
            containerStyle={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span></span>}
            renderInput={(props) => <input {...props} placeholder="-" className="bg-pure-greys-50 dark:bg-richblack-800"/>}
          />
          <CustomButton className="mt-5 bg-yellow-200 text-black py-2 w-full text-sm rounded-md shadow hover:bg-yellow-400 transition-colors duration-200">
            Verify
          </CustomButton>
        </div>
        <Link
          href={"/login"}
          className="text-blue-200 flex gap-2 items-center text-sm w-fit"
        >
          <ArrowLeftIcon />
          Back to Login
        </Link>
      </div>
    </div>
  );
}
