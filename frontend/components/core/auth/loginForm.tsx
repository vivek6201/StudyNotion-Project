"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/ValidationSchemas/Auth/AuthValidation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/common/CustomButton";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Link from "next/link";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 w-full flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Email Address <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  className="rounded-md bg-pure-greys-50 dark:bg-richblack-800 py-6 px-4 border-b border-richblack-400 md:max-w-[400px]"
                />
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Password <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <div className="rounded-md bg-pure-greys-50 dark:bg-richblack-800 py-1 border-b border-richblack-400 px-4 md:max-w-[400px] flex justify-between items-center">
                  <Input
                    placeholder="Enter your Password"
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className=""
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="text-black dark:text-white text-xl cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaRegEye
                      className="text-black dark:text-white text-xl cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />
        <div className="md:max-w-[400px] w-full flex justify-end">
          <Link href="/forgot-password" className="text-blue-200 text-sm">
            Forgot password?
          </Link>
        </div>
        <CustomButton className="bg-yellow-200 text-black rounded-md py-2 md:max-w-[400px] mt-10 text-base">
          Sign in
        </CustomButton>
      </form>
    </Form>
  );
}
