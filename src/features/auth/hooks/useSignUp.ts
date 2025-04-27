import { useMutation } from "@tanstack/react-query";
import { signUp } from "../api/authApi";
import { SignUp } from "../types/auth.schema";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (inputSignUp: SignUp) => signUp(inputSignUp),
  });
};
