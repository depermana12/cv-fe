import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import { AuthApi } from "../../auth/services/authApi";
import { queryClient } from "../../../lib/queryClient";

export const useSendEmailVerification = () => {
  const authApi = new AuthApi();

  return useMutation({
    mutationFn: () => authApi.sendEmailVerification(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "email-verification"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", "me"],
      });

      notifications.show({
        position: "top-right",
        withCloseButton: true,
        autoClose: 5000,
        title: "Verification Email Sent",
        message:
          "Please check your inbox and follow the instructions to verify your email.",
        color: "green",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "There was an error sending the verification email. Please try again.";

      notifications.show({
        position: "top-right",
        withCloseButton: true,
        title: "Failed to Send Email",
        message: errorMessage,
        color: "red",
      });
    },
  });
};
