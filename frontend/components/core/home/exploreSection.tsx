"use client";
import HighlightedText from "@/components/common/HighlightedText";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { useEffect, useState } from "react";
import SectionCard from "./SectionCard";

interface CurrentSectionType {
  sectionName: string;
  sectionData: {
    title: string;
    description: string;
    level: string;
    noOfLessons: string;
  }[];
}

const ExploreSection = () => {
  const exploreSection = [
    {
      sectionName: "FREE",
      sectionData: [
        {
          title: "HTML",
          description: "Structure of web pages",
          level: "Beginner",
          noOfLessons: "6",
        },
        {
          title: "CSS",
          description: "Style the web pages",
          level: "Beginner",
          noOfLessons: "10",
        },
        {
          title: "JAVASCRIPT",
          description: "Functionality of web pages",
          level: "Beginner",
          noOfLessons: "20",
        },
      ],
    },
    {
      sectionName: "New to Coding",
      sectionData: [
        {
          title: "REACT.JS",
          description: "Most trending library of javascript",
          level: "Intermediate",
          noOfLessons: "20",
        },
        {
          title: "PYTHON",
          description: "Trending language of 2021",
          level: "Beginner",
          noOfLessons: "50",
        },
        {
          title: "RUBY",
          description: "Famnous for backend development",
          level: "Intermediate",
          noOfLessons: "20",
        },
      ],
    },
    {
      sectionName: "Most Popular",
      sectionData: [
        {
          title: "C++",
          description: "Basics of coding",
          level: "Beginner",
          noOfLessons: "20",
        },
        {
          title: "JAVA",
          description: "Basics of coding",
          level: "Beginner",
          noOfLessons: "25",
        },
        {
          title: "RUST",
          description: "Mordern language of 2023",
          level: "intermediate",
          noOfLessons: "20+",
        },
      ],
    },
    {
      sectionName: "Skills for Career",
      sectionData: [
        {
          title: "NEXT.JS",
          description: "Mordern framework built on React.js",
          level: "Intermediate",
          noOfLessons: "20+",
        },
        {
          title: "NUST.JS",
          description: "Mordern framework built on Vue.js",
          level: "Intermediate",
          noOfLessons: "20+",
        },
        {
          title: "VUE.JS",
          description: "Mordern framework built on javascript",
          level: "Intermediate",
          noOfLessons: "20+",
        },
      ],
    },
    {
      sectionName: "Career Paths",
      sectionData: [
        {
          title: "MOBILE DEVELOPMENT",
          description: "Most popular career path",
          level: "beginner",
          noOfLessons: "100+",
        },
        {
          title: "IOS DEVELOPMENT",
          description: "Not so popular career path but high paying",
          level: "Intermediate",
          noOfLessons: "100+",
        },
        {
          title: "WEB DEVELOPMENT",
          description: "Most popular career path and high paying",
          level: "Beginner",
          noOfLessons: "100+",
        },
      ],
    },
  ];

  const [currentSection, setCurrentSection] = useState<CurrentSectionType>(
    exploreSection[0]
  );

  return (
    <div className="flex flex-col gap-y-4 w-11/12 mx-auto max-w-maxContent items-center pt-20">
      <p className="font-bold text-3xl">
        Unlock the <HighlightedText text="Power of Code" />{" "}
      </p>
      <p className="text-richblack-200 font-medium">
        Learn to build anything you can imagine
      </p>

      <div className="flex items-center justify-center w-full flex-col">
        <RadioGroup
          defaultValue={currentSection}
          onValueChange={(value: CurrentSectionType) =>
            setCurrentSection(value)
          }
          className="flex justify-center items-center bg-richblack-800 rounded-full max-w-fit p-1 border-b border-richblack-400"
        >
          {exploreSection.map((section) => (
            <div
              key={section.sectionName}
              className={`mt-0 font-normal px-7 py-2 rounded-full transition-colors duration-300 hover:bg-richblack-700 ${
                currentSection.sectionName === section.sectionName &&
                "bg-richblack-900 hover:bg-richblack-900"
              }`}
            >
              <RadioGroupItem
                value={section}
                id={section.sectionName}
                className="hidden"
              />
              <Label htmlFor={section.sectionName}>{section.sectionName}</Label>
            </div>
          ))}
        </RadioGroup>

        <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 min-h-[400px] py-10 z-20">
          {currentSection.sectionData.map(
            (section: {
              title: string;
              description: string;
              level: string;
              noOfLessons: string;
            }) => (
              <SectionCard {...section} key={section.title}/>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;
