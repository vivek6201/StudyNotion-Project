import Link from "next/link";
import React from "react";

interface PropType extends React.HTMLAttributes<HTMLAnchorElement> {
  LinkType?: string;
  link: string;
  children: React.ReactNode;
}

export default function CustomLink({
  LinkType = "secondary",
  link,
  children,
  ...props
}: PropType) {
  return (
    <Link
      href={link}
      {...props}
      className={`${
        LinkType === "primary"
          ? "dark:bg-yellow-200 text-black "
          : "dark:bg-richblack-800 dark:text-richblack-100"
      } ${props.className}`}
    >
      {children}
    </Link>
  );
}
