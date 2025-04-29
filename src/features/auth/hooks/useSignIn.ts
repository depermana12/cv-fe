import { useMutation } from "@tanstack/react-query";
import { SignIn } from "../types/auth.schema";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "@tanstack/react-router";

export const useSignIn = () => {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (inputSignIn: SignIn) => signIn(inputSignIn),
    onSuccess: () => navigate({ to: "/dashboard" }),
  });
};
