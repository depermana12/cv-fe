import { useMutation } from "@tanstack/react-query";
import { SignUp } from "../types/auth.schema";
import { useAuthStore } from "../store/authStore";

export const useSignUp = () => {
  const { signUp } = useAuthStore();
  return useMutation({
    mutationFn: async (inputSignUp: SignUp) => signUp(inputSignUp),
  });
};
