import { axiosClient } from "@lib/axiosClient";
import { SignIn, SignUp } from "../types/auth.schema";
import { AuthApiResponse } from "../types/types";
import { AxiosResponse } from "axios";

export const signUpService = <T>(
  inputSignUp: SignUp,
): Promise<AxiosResponse<AuthApiResponse<T>>> => {
  return axiosClient.post<AuthApiResponse<T>>("/auth/signup", inputSignUp);
};

export const signInService = <T>(
  inputSignIn: SignIn,
): Promise<AxiosResponse<AuthApiResponse<T>>> => {
  return axiosClient.post<AuthApiResponse<T>>("/auth/signin", inputSignIn);
};
