import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(3, "username must be at least 3 characters"),
  email: z
    .string()
    .email({ message: "invalid email: please check your email" }),
  password: z.string().min(8, "password must have minimum 8 characters"),
});

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "invalid email: please check your email" }),
  password: z.string().min(8),
});

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;
