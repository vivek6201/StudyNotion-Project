"use client";

import CustomLink from "@/components/common/CustomLink";
import React from "react";
import { TypeAnimation } from "react-type-animation";

interface CodeSectionProps {
  title: React.ReactNode;
  description: string;
  reverse?: boolean;
  codeblock: string;
  codeColor: string;
  backgroudGradient: string;
}

export const CodeSection: React.FC<CodeSectionProps> = ({
  title,
  description,
  reverse = false,
  codeblock,
  codeColor,
  backgroudGradient
}) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 justify-between items-center max-w-maxContent gap-5 md:gap-10 w-11/12 mx-auto my-10 md:my-20`}
    >
      <div className={`${reverse && "md:order-2"} flex flex-col gap-y-3 `}>
        {title}
        <p className="text-richblack-500 mt-2 font-medium">{description}</p>
        <div className="flex w-full gap-5 items-center my-5">
          <CustomLink link="/login" LinkType="primary" className="rounded-md px-5 py-2 shadow text-sm">Try Yourself</CustomLink>
          <CustomLink link="/login" className="rounded-md px-5 py-2 shadow text-sm">Learn More</CustomLink>
        </div>
      </div>
      <div className={`${reverse && "md:order-1"} h-fit  flex flex-row text-10[px] w-[100%] py-3 lg:w-[500px] glass  `}>
        {/*HW -> BG gradient*/}

        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>

        <div
          className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 relative`}
        >
          <div className={`${backgroudGradient}`}/>
          <TypeAnimation
            sequence={[codeblock, 2000]}
            repeat={Infinity}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
              overflowX: "hidden",
              fontSize: "16px",
              color: codeColor
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};
