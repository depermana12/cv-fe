import { createRoot } from "react-dom/client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/charts/styles.css";

import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";

import { routeTree } from "./app/routeTree.gen";
import { emotionTransform, MantineEmotionProvider } from "@mantine/emotion";
import { Notifications } from "@mantine/notifications";

import { useAuthStore } from "@app/store/authStore";
import { queryClient } from "@shared/lib/queryClient";
import { myTheme } from "@styles/themes/blao";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const router = createRouter({
  routeTree,
  context: { auth: undefined! },
});

const AppProviders = () => {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <MantineProvider theme={myTheme} stylesTransform={emotionTransform}>
      <MantineEmotionProvider>
        <Notifications autoClose={5000} position="top-right" />
        <QueryClientProvider client={queryClient}>
          <RouterProvider
            router={router}
            context={{
              auth: {
                user,
                isAuthenticated,
              },
            }}
          />
        </QueryClientProvider>
      </MantineEmotionProvider>
    </MantineProvider>
  );
};

createRoot(document.getElementById("root")!).render(<AppProviders />);
