import ForgotPasswordForm from "@/components/core/auth/forgotPassForm";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default function ForgotPassword() {
  return (
    <div className="flex items-center justify-center h-full w-full ">
      <div className="flex flex-col gap-y-4 w-11/12 max-w-[400px] mx-auto gap-3">
        <h2 className="font-bold font-rubik text-3xl">Reset your password</h2>
        <p className="text-richblack-200 text-justify">
          Have no fear. We’ll email you instructions to reset your password. If
          you dont have access to your email we can try account recovery
        </p>

        <ForgotPasswordForm />
        <Link href={"/login"} className="text-blue-200 flex gap-2 items-center text-sm">
          <ArrowLeftIcon />
          Back to Login
        </Link>
      </div>
    </div>
  );
}
