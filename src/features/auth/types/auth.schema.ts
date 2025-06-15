import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "invalid email: please check your email" }),
  password: z.string().min(8, "password must have minimum 8 characters"),
});

export const signUpSchema = signInSchema.extend({
  username: z.string().min(3, "username must be at least 3 characters"),
});

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: "invalid email: please check your email" }),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password required minimal 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm password is not the same as password",
        path: ["confirmPassword"],
      });
    }
  });

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
export type ForgetPassword = z.infer<typeof forgetPasswordSchema>;
export type ResetPassword = z.infer<typeof ResetPasswordSchema>;
