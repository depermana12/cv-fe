import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";

import { authService } from "../services/autsService";
import { ForgetPassword } from "../schema/auth.schema";

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: async (data: ForgetPassword) =>
      authService.forgetPassword(data),
    onSuccess: () => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 5000,
        title: "Password Reset Email Sent",
        message:
          "Please check your email for instructions to reset your password.",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 5000,
        title: "Request failed",
        message: error.message ? error.message : "Failed to send reset email",
        color: "red",
      });
      console.error("Forget password error:", error);
    },
  });
};
