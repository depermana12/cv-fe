import { useAuthStatus } from "./useAuthStatus";
import { redirect } from "@tanstack/react-router";

export const useProtectedRedirect = () => {
  const { isAuthenticated, isValid } = useAuthStatus();

  if (!isValid || !isAuthenticated) {
    throw redirect({ to: "/auth/signin" });
  }

  return { isAuthenticated: true };
};
