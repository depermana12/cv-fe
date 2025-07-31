import { createFileRoute } from "@tanstack/react-router";
import { ForgetPasswordPage } from "@features/auth/pages/ForgetPasswordPage";

export const Route = createFileRoute("/auth/forget-password")({
  component: () => <ForgetPasswordPage />,
});
