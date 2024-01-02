"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signupSchema } from "@/ValidationSchemas/Auth/AuthValidation";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CustomButton from "@/components/common/CustomButton";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      role: "Student",
    },
  });

  function onSubmit(values: z.infer<typeof signupSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 w-full flex flex-col gap-y-2 items-center md:items-start"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex justify-center items-center bg-richblack-800 rounded-full max-w-fit p-1 border-b border-richblack-400"
                >
                  <FormItem
                    className={`mt-0 font-normal px-7 py-2 rounded-full transition-colors duration-300 ${
                      field.value === "Student" && "bg-richblack-900"
                    }`}
                  >
                    <FormControl>
                      <RadioGroupItem value="Student" className="hidden" />
                    </FormControl>
                    <FormLabel className="text-richblack-200">Student</FormLabel>
                  </FormItem>
                  <FormItem
                    className={`font-normal px-7 py-2 rounded-full transition-colors duration-300 ${
                      field.value === "Instructor" && "bg-richblack-900"
                    }`}
                  >
                    <FormControl>
                      <RadioGroupItem value="Instructor" className="hidden" />
                    </FormControl>
                    <FormLabel className="text-richblack-200">Instructor</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-2 md:max-w-[400px] mt-5 w-full">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  First Name <span className="text-red-400">*</span>
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
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Last Name <span className="text-red-400">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="rounded-md bg-pure-greys-50 dark:bg-richblack-800 py-6 px-4 border-b border-richblack-400 sm:max-w-[600px] lg:max-w-[400px]"
                  />
                </FormControl>
                <FormMessage className="text-red-300" />
              </FormItem>
            )}
          />
        </div>
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
            <FormItem  className="w-full">
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Confirm Password <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <div className="rounded-md bg-pure-greys-50 dark:bg-richblack-800 py-1 border-b border-richblack-400 px-4 md:max-w-[400px] flex justify-between items-center">
                  <Input
                    placeholder="Confirm your Password"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    className=""
                  />
                  {showConfirmPassword ? (
                    <FaRegEyeSlash
                      className="text-black dark:text-white text-xl cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <FaRegEye
                      className="text-black dark:text-white text-xl cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage className="text-red-400" />
            </FormItem>
          )}
        />

        <CustomButton className="bg-yellow-200 text-black rounded-md py-2 w-full md:max-w-[400px] mt-10 text-base">
          Register
        </CustomButton>
      </form>
    </Form>
  );
}
