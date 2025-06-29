import { redirect } from "@tanstack/react-router";
import { useAuthStatus } from "./useAuthStatus";

export const useAuthRedirect = (redirectTo: string = "/dashboard/overview") => {
  const { isAuthenticated, isValid } = useAuthStatus();

  if (isValid && isAuthenticated) {
    throw redirect({ to: redirectTo });
  }

  return { isAuthenticated };
};
