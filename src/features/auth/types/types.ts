import { z } from "zod";
import { signInSchema, signUpSchema } from "../schema/auth.schema";

export type SignIn = z.infer<typeof signInSchema>;
export type SignUp = z.infer<typeof signUpSchema>;

export type UserMinimal = {
  id: number;
  username: string;
  email: string;
  token: string;
  isEmailVerified: boolean;
};

export type AuthState = {
  user: UserMinimal | null;
  isAuthenticated: boolean;
  rememberMe: boolean;
  signUp: (inputSignUp: SignUp) => Promise<void>;
  signIn: (inputSignIn: SignIn & { rememberMe?: boolean }) => Promise<void>;
  signOut: () => void;
  checkAuthValidity: () => boolean;
  refreshUser: () => Promise<void>;
};
