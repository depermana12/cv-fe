import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";

import { useAuthStore } from "@app/store/authStore";
import { SignUp } from "../schema/auth.schema";

export const useSignUp = () => {
  const { signUp } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (inputSignUp: SignUp) => signUp(inputSignUp),
    onSuccess: () => {
      navigate({ to: "/auth/verify-email" });
    },
    onError: (error) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Sign Up failed",
        message: "Sorry, there was a problem creating your account.",
        color: "red",
      });
      console.error("Login error:", error);
    },
  });
};
