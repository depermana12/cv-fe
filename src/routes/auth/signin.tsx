import { createFileRoute } from "@tanstack/react-router";
import { SignInPage } from "../../features/auth/pages/SignInPage";

export const Route = createFileRoute("/auth/signin")({
  component: SignInPage,
});
