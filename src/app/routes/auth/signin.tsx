import { createFileRoute } from "@tanstack/react-router";
import { SignInPage } from "@features/auth/pages/SignInPage";
import { authGuard } from "@features/auth/guards/authRouteGuard";

export const Route = createFileRoute("/auth/signin")({
  beforeLoad: () => {
    // Redirect to dashboard if already authenticated
    authGuard();
  },
  component: SignInPage,
});
