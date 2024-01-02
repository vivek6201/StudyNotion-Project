import Image from "next/image";
import React from "react";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";

type PropType = {
  title: string;
  description1: string;
  description2: string;
  formType?: string;
  image: string;
};

export default function Template({
  title,
  description1,
  description2,
  image,
  formType,
}: PropType) {
  return (
    <div className="px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 h-full max-w-maxContent mx-auto place-items-center">
      <div className="w-full h-full flex flex-col justify-center items-center md:items-start">
        <h2 className="text-3xl font-medium text-left capitalize font-rubik">{title}</h2>
        <p className="max-w-[400px] text-richblue-100 leading-5 mt-5 text-center md:text-start">
          {description1} <span className="text-blue-100 font-rubik italic">{description2}</span>
        </p>

        {formType === "signup" ? <SignupForm /> : <LoginForm />}
      </div>
      <div className="relative md:flex justify-center items-center w-full h-full hidden">
        <Image
          src={image}
          alt="image"
          className="w-[25rem] aspect-square absolute z-10"
          width={400}
          height={400}
        />
        <Image
          src={"/assets/Images/frame.png"}
          alt="bg-image"
          className="w-[25rem] aspect-square absolute translate-x-4 translate-y-4"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
