import { createFileRoute, redirect } from "@tanstack/react-router";
import { EmailVerificationPage } from "@features/auth/pages/EmailVerificationPage";
import { getAuthStatus } from "@features/auth/guards/getAuthStatus";

export const Route = createFileRoute("/auth/verify-email")({
  beforeLoad: () => {
    const { isAuthenticated, isValid, user } = getAuthStatus();

    // If not authenticated, redirect to signin
    if (!isValid || !isAuthenticated) {
      throw redirect({ to: "/auth/signin" });
    }

    // If already verified, redirect to dashboard
    if (user?.isEmailVerified) {
      throw redirect({ to: "/dashboard/overview" });
    }
  },
  component: EmailVerificationPage,
});
