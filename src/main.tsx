import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

import { MantineProvider } from "@mantine/core";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { Notifications } from "@mantine/notifications";

import { useAuthStore } from "./features/auth/store/authStore";

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  context: { auth: undefined! },
});

const InnerApp = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <RouterProvider
      router={router}
      context={{
        auth: {
          user,
          isAuthenticated,
        },
      }}
    />
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider stylesTransform={emotionTransform}>
      <MantineEmotionProvider>
        <Notifications />
        <QueryClientProvider client={queryClient}>
          <InnerApp />
        </QueryClientProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  </StrictMode>,
);
