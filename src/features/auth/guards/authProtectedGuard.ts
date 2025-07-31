import { redirect } from "@tanstack/react-router";
import { getAuthStatus } from "./getAuthStatus";

export const authProtectedGuard = () => {
  const { isAuthenticated, isValid, user } = getAuthStatus();

  if (!isValid || !isAuthenticated) {
    throw redirect({ to: "/auth/signin" });
  }

  if (!user?.isEmailVerified) {
    throw redirect({ to: "/auth/verify-email" });
  }
};
