import { ReactNode } from "@tanstack/react-router";
import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";

import { Header } from "@shared/components/layout/Header";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      bg={colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0]}
      mih="100vh"
      miw="100vw"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Header />
      <Box component="main">{children}</Box>
    </Box>
  );
};
export default LandingLayout;
