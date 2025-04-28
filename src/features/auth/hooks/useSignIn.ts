import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../types/auth.schema";
import { useAuthStore } from "../store/authStore";

export const useSignIn = () => {
  const { signIn } = useAuthStore();
  return useMutation({
    mutationFn: async (inputSignIn: SignIn) => signIn(inputSignIn),
  });
};
