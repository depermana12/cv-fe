import { useMutation } from "@tanstack/react-query";
import { signIn } from "../api/authApi";
import { SignIn } from "../types/auth.schema";

export const useSignIn = () => {
  return useMutation({
    mutationFn: (inputSignIn: SignIn) => signIn(inputSignIn),
  });
};
