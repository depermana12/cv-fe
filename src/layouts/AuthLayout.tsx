import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";

import { Header } from "@shared/components/layout/Header";
import { Footer } from "@shared/components/layout/Footer";

export const AuthLayout = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      bg={colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0]}
      mih="100vh"
      miw="100vw"
      display="flex"
      style={{ flexDirection: "column" }}
    >
      <Header />
      <Box
        component="main"
        display="flex"
        my="xl"
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};
