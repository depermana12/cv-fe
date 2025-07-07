import { useMutation } from "@tanstack/react-query";
import { AuthApi } from "../../auth/services/authApi";
import { queryClient } from "../../../lib/queryClient";

export const useVerifyEmail = () => {
  const authApi = new AuthApi();
  return useMutation({
    mutationFn: (token: string) => authApi.verifyEmail(token),
    onSuccess: () => {
      // Invalidate relevant queries to refresh user data
      queryClient.invalidateQueries({
        queryKey: ["user", "me"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", "email-verification"],
      });
    },
  });
};
