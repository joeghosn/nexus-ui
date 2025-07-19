import { z } from "zod";

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const strongPasswordErrorMessage =
  "Password must be at least 8 characters long and contain one uppercase letter, one lowercase letter, one number, and one special character.";

const otpRegex = /^[A-Za-z0-9]{6}$/;

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z.email({ message: "Invalid email address" }),
    password: z.string().regex(strongPasswordRegex, {
      message: strongPasswordErrorMessage,
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: z.email({ message: "A valid email is required" }),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().regex(strongPasswordRegex, {
      message: strongPasswordErrorMessage,
    }),
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const verifyEmailSchema = z.object({
  email: z.email({ message: "A valid email is required" }),
  token: z.string().regex(otpRegex, { message: "Invalid OTP format" }),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof resetPasswordSchema>;
export type VerifyEmailData = z.infer<typeof verifyEmailSchema>;
