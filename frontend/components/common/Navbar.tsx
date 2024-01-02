"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React from "react";
import CustomLink from "./CustomLink";
import useSWR from "swr";
import { LuSunMedium, LuMoon } from "react-icons/lu";
import CustomButton from "./CustomButton";
import Link from "next/link";

export default function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <div className="w-full h-full py-5 border-b dark:border-richblack-700 shadow-sm">
      <div className="max-w-maxContent mx-auto w-11/12 h-full flex justify-between items-center">
        <Link href={"/"}>
          {resolvedTheme === "dark" ? (
            <Image
              src="/assets/Logo/Logo-Full-Light.png"
              width={200}
              height={100}
              alt=""
              className="w-36 lg:w-44"
            />
          ) : (
            <Image
              src="/assets/Logo/Logo-Full-Dark.png"
              width={200}
              height={100}
              alt=""
              className="w-36 lg:w-44"
            />
          )}
        </Link>
        <div className="flex gap-3">
          <ul></ul>
        </div>
        <div className="flex gap-4 items-center">
          {resolvedTheme === "dark" ? (
            <CustomButton onClick={() => setTheme("light")}>
              <LuSunMedium className="text-xl" />
            </CustomButton>
          ) : (
            <CustomButton onClick={() => setTheme("dark")}>
              <LuMoon className="text-xl" />
            </CustomButton>
          )}
          <CustomLink
            link="/login"
            className="rounded-md border border-richblack-700 px-4 py-2"
          >
            Login
          </CustomLink>
          <CustomLink
            link="/signup"
            className="rounded-md border border-richblack-700 px-4 py-2"
          >
            Signup
          </CustomLink>
        </div>
      </div>
    </div>
  );
}
