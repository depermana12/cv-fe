import { axiosClient } from "@lib/axiosClient";
import { SignIn, SignUp } from "../types/auth.schema";

export const signUpService = <T>(inputSignUp: SignUp) => {
  return axiosClient.post<T>("/auth/signup", inputSignUp);
};

export const signInService = <T>(inputSignIn: SignIn) => {
  return axiosClient.post<T>("/auth/signin", inputSignIn);
};
