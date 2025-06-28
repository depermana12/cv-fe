import { redirect } from "@tanstack/react-router";
import { getAuthStatus } from "./getAuthStatus";

export const authProtectedGuard = () => {
  const { isAuthenticated, isValid } = getAuthStatus();

  if (!isValid || !isAuthenticated) {
    throw redirect({ to: "/auth/signin" });
  }
};
