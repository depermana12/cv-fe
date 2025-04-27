import { axiosInstance } from "@lib/axios";
import { SignIn, SignUp } from "../types/auth.schema";

export const signUp = (inputSignUp: SignUp) => {
  return axiosInstance.post("/auth/signup", inputSignUp);
};

export const signIn = (inputSignIn: SignIn) => {
  return axiosInstance.post("/auth/signin", inputSignIn);
};
