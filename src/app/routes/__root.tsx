import { createRootRouteWithContext } from "@tanstack/react-router";
import { AuthState } from "../../features/auth/types/types";
import RootLayout from "@layouts/RootLayout";
import { NotFoundRoute } from "@features/error/pages/NotFoundRoutePage";

type MinimumAuthContext = Pick<AuthState, "user" | "isAuthenticated">;
interface MyRouterContext {
  auth: MinimumAuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootLayout,
  notFoundComponent: NotFoundRoute,
});
