import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";

import { useAuthStore } from "../store/authStore";
import { SignIn } from "../types/auth.schema";

export const useSignIn = () => {
  const { signIn } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (inputSignIn: SignIn) => signIn(inputSignIn),
    onSuccess: (user) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Login successful",
        message: `Welcome back, ${user.username}!`,
        color: "green",
      });
      navigate({ to: "/dashboard" });
    },
    onError: (error) => {
      notifications.show({
        position: "top-center",
        withCloseButton: true,
        autoClose: 3000,
        title: "Login failed",
        message:
          error instanceof Error ? error.message : "Invalid email or password",
        color: "red",
      });
      console.error("Login error:", error);
    },
  });
};
