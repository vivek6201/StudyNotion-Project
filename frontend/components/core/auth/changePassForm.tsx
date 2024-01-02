"use client";

import { changePassValidations } from "@/ValidationSchemas/Auth/AuthValidation";
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

export default function ChangePassForm() {
  const form = useForm<z.infer<typeof changePassValidations>>({
    resolver: zodResolver(changePassValidations),
  });

  function onSubmit(values: z.infer<typeof changePassValidations>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-5 w-full flex flex-col gap-y-2"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Password <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>
                Confirm Password <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  {...field}
                  className="rounded-md bg-pure-greys-50 dark:bg-richblack-800 py-6 px-4 border-b border-richblack-400 md:max-w-[400px]"
                />
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />

        <CustomButton className="bg-yellow-200 text-black rounded-md py-2 md:max-w-[400px] mt-10 text-sm disabled:bg-opacity-50 disabled:cursor-not-allowed">
          Change Password
        </CustomButton>
      </form>
    </Form>
  );
}
