import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: "minimum length should be 8 or above",
    })
    .max(16, {
      message: "Maximum length shuold be 16 or below",
    }),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string().email(),
    role: z.enum(["Student", "Instructor"]),
    password: z
      .string()
      .min(8, {
        message: "minimum length should be 8 or above",
      })
      .max(16, {
        message: "Maximum length shuold be 16 or below",
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "minimum length should be 8 or above",
      })
      .max(16, {
        message: "Maximum length shuold be 16 or below",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password Do not match",
  });

export const forgotPassValidations = z.object({
  email: z.string().email(),
});

export const changePassValidations = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "minimum 8 characters are required",
      })
      .max(16, {
        message: "Maximum 16 characters are allowed",
      }),

    confirmPassword: z
      .string()
      .min(8, {
        message: "minimum 8 characters are required",
      })
      .max(16, {
        message: "Maximum 16 characters are allowed",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password Do not match",
  });
