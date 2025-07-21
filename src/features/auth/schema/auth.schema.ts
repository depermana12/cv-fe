import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email({ message: "invalid email: please check your email" }),
  password: z.string().min(8, "password must have minimum 8 characters"),
});

export const signInWithRememberMeSchema = signInSchema.extend({
  rememberMe: z.boolean().default(false),
});

export const signUpSchema = z
  .object({
    username: z.string().min(3, "username must be at least 3 characters"),
    email: z
      .string()
      .email({ message: "invalid email: please check your email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .max(128, { message: "Password must be 128 characters or fewer" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)",
        },
      ),
    confirmPassword: z
      .string()
      .min(8, { message: "Please confirm your password" }),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
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
      .min(8, { message: "Password must be at least 8 characters" })
      .max(128, { message: "Password must be 128 characters or fewer" })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        {
          message:
            "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (@$!%*?&)",
        },
      ),
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
