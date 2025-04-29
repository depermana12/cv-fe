import { createRootRouteWithContext } from "@tanstack/react-router";
import App from "../App";
import { AuthState } from "../features/auth/types/types";

type MinimumAuthContext = Pick<AuthState, "user" | "isAuthenticated">;
interface MyRouterContext {
  auth: MinimumAuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: App,
});
