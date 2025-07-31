import { createFileRoute } from "@tanstack/react-router";
import { ResetPasswordPage } from "@features/auth/pages/ResetPasswordPage";

export const Route = createFileRoute("/auth/reset-password/$token")({
  component: () => {
    const { token } = Route.useParams();
    return <ResetPasswordPage token={token} />;
  },
});
