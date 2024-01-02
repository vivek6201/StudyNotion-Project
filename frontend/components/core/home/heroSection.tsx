import CustomLink from "@/components/common/CustomLink";
import HighlightedText from "@/components/common/HighlightedText";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

export default function HeroSection() {
  return (
    <div className="flex w-full items-center flex-col max-w-maxContent mx-auto py-10">
      <CustomLink
        link="/signup"
        className="rounded-full p-1 hover:scale-95 transition-all duration-200 group border-b border-richblack-400"
      >
        <span className="group-hover:dark:bg-richblack-900 flex gap-2 items-center py-1 px-5 rounded-full font-medium ">
          Become an Instructor / Start Learning{" "}
          <ArrowRightIcon className="text-richblack-200" />
        </span>
      </CustomLink>

      <p className="mt-10 text-3xl font-bold">
        Empower Your Future with <HighlightedText text="Coding Skills" />
      </p>
      <p className="text-richblack-200 text-center w-10/12 mt-4 font-medium">
        With our online coding courses, you can learn at your own pace, from
        anywhere in the world, and get access to a wealth of resources,
        including hands-on projects, quizzes, and personalized feedback from
        instructors.{" "}
      </p>

      <div className="flex gap-5 items-center mt-10">
        <CustomLink
          LinkType="primary"
          link="/"
          className="rounded-md px-5 py-2 text-sm font-medium shadow-sm"
        >
          Learn More
        </CustomLink>
        <CustomLink
          link="/login"
          className="rounded-md px-5 py-2 text-sm font-medium shadow-sm "
        >
          Dashboard
        </CustomLink>
      </div>

      <div className="w-11/12 mt-20 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
        <video
          src="/assets/Images/banner.mp4"
          className="shadow-[20px_20px_rgba(255,255,255)]"
          autoPlay
          muted
          loop
        />
      </div>
    </div>
  );
}
