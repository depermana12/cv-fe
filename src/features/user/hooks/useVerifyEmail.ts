import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import { authService } from "@/features/auth/services/autsService";
import { useAuthStore } from "@app/store/authStore";
import { useNavigate } from "@tanstack/react-router";
import { notifications } from "@mantine/notifications";

export const useVerifyEmail = () => {
  const { refreshUser } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: async () => {
      // Refresh user data to get updated verification status
      await refreshUser();

      queryClient.invalidateQueries({
        queryKey: ["user", "me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", "email-verification"],
      });

      notifications.show({
        title: "Email Verified!",
        message: "Your email has been successfully verified.",
        color: "green",
      });

      // Redirect to sign-in page after a short delay
      setTimeout(() => {
        navigate({ to: "/auth/signin" });
      }, 2000);
    },
  });
};
