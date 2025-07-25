import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@shared/lib/queryClient";
import { authService } from "@/features/auth/services/autsService";

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: (token: string) => authService.verifyEmail(token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", "me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", "email-verification"],
      });
    },
  });
};
