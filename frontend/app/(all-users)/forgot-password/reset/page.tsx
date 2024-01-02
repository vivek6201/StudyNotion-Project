import ChangePassForm from "@/components/core/auth/changePassForm";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="flex flex-col w-11/12 max-w-[400px] mx-auto gap-2">
        <h2 className="font-bold font-rubik text-3xl">Choose new password</h2>
        <p className="text-richblack-200 text-justify">
          Almost done. Enter your new password and youre all set.
        </p>

        <ChangePassForm />
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
