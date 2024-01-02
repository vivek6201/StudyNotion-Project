"use client";

import { forgotPassValidations } from "@/ValidationSchemas/Auth/AuthValidation";
import CustomButton from "@/components/common/CustomButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [emailEntered, setEmailEntered] = useState<boolean>(false);
  const [emailTimer, setEmailTimer] = useState<number>(60);

  const form = useForm<z.infer<typeof forgotPassValidations>>({
    resolver: zodResolver(forgotPassValidations),
  });

  function onSubmit(values: z.infer<typeof forgotPassValidations>) {
    setEmailSent(true);
    setEmailEntered(true); 
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
                  disabled={emailEntered}
                />
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        <CustomButton
          className="bg-yellow-200 text-black rounded-md py-2 md:max-w-[400px] mt-10 text-sm disabled:bg-opacity-50 disabled:cursor-not-allowed"
          disabled={emailSent}
          type={emailSent ? "button" : "submit"}
        >
          {emailSent ? "Email sent" : "Send email"}
        </CustomButton>

        
      </form>
    </Form>
  );
}
