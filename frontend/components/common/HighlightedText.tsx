import React from "react";

interface PropType extends React.HTMLAttributes<HTMLSpanElement> {
  text: string;
}
export default function HighlightedText({ text, ...props }: PropType) {
  return (
    <span
      className={`font-bold bg-gradient-to-b from-richblue-200 via-richblue-50 to-richblue-5 bg-clip-text text-transparent ${props.className}`}
    >
      {text}
    </span>
  );
}
