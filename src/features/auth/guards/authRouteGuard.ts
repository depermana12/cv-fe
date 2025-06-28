import { redirect } from "@tanstack/react-router";
import { getAuthStatus } from "./getAuthStatus";

export const authGuard = (redirectTo: string = "/dashboard/overview") => {
  const { isAuthenticated, isValid } = getAuthStatus();

  if (isValid && isAuthenticated) {
    throw redirect({ to: redirectTo });
  }
};
