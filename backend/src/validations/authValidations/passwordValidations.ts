import * as z from "zod";

export const forgotPasswordInputValidations = z.object({
  email: z.string().email(),
});

export const resetPasswordInputValidations = z
  .object({
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const changePasswordInputValidations = z
  .object({
    oldPassword: z.string().min(6).max(20),
    newPassword: z.string().min(6).max(20),
    confirmNewPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match",
    path: ["confirmNewPassword"],
  });
