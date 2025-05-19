import { z } from "zod";
import { signInSchema, signUpSchema } from "./auth.schema";

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;

export type User = {
  id: number;
  username: string;
  email: string;
  createdAt: string;
  token: string;
};

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  signUp: (inputSignUp: SignUp) => Promise<User>;
  signIn: (inputSignIn: SignIn) => Promise<User>;
  signOut: () => void;
};

export type AuthApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
