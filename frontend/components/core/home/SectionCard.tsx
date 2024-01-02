import React from "react";

interface SectionType {
  title: string;
  description: string;
  level: string;
  noOfLessons: string;
}

const SectionCard: React.FC<SectionType> = ({
  title,
  description,
  level,
  noOfLessons,
  ...props
}) => {
  return (
    <div className="transition-all duration-200 bg-richblack-800 group w-[20rem] h-full  hover:shadow shadow-yellow-200 grid grid-rows-[80%_1fr]">
      <div className="border-b border-dashed border-richblack-200 py-10 px-5 h-full">
        <p className="font-bold text-lg ">{title}</p>
        <p className="text-sm text-richblack-200">{description}</p>
      </div>
      <div className="flex gap-2 items-center justify-between px-5 py-2 text-richblack-200 h-full">
        <p className="text-richblack-200 text-sm capitalize">{level}</p>
        <p className="text-richblack-200 text-sm">{noOfLessons} Lessons</p>
      </div>
    </div>
  );
};

export default SectionCard;
