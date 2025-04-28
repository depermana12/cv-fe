import { axiosInstance } from "@lib/axiosClient";
import { SignIn, SignUp } from "../types/auth.schema";

export const signUpService = <T>(inputSignUp: SignUp) => {
  return axiosInstance.post<T>("/auth/signup", inputSignUp);
};

export const signInService = <T>(inputSignIn: SignIn) => {
  return axiosInstance.post<T>("/auth/signin", inputSignIn);
};
