import { ReactNode } from "@tanstack/react-router";
import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";

import { Header } from "../components/layout/Header";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  return (
    <Box
      bg={colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0]}
      className="min-h-screen min-w-dvw flex flex-col"
    >
      <Header />
      <Box component="main">{children}</Box>
    </Box>
  );
};
export default LandingLayout;
