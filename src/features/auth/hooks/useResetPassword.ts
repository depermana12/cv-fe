import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";
import { authService } from "../services/autsService";
import { ResetPassword } from "../schema/auth.schema";

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({
      token,
      data,
    }: {
      token: string;
      data: ResetPassword;
    }) => authService.resetPassword(token, data),
    onSuccess: () => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 5000,
        title: "Password Reset Successful",
        message: "Your password has been reset successfully. Please sign in.",
        color: "green",
      });
      navigate({ to: "/auth/signin" });
    },
    onError: (error) => {
      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 3000,
        title: "Reset failed",
        message:
          error instanceof Error ? error.message : "Failed to reset password",
        color: "red",
      });
      console.error("Reset password error:", error);
    },
  });
};
