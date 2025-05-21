import { useEffect, useState } from "react";
import {
  Anchor,
  AppShell,
  Burger,
  Container,
  Group,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure, useLocalStorage, useMediaQuery } from "@mantine/hooks";
import { Outlet, Link } from "@tanstack/react-router";
import { IconFile } from "@tabler/icons-react";

import { Sidebar } from "../features/dashboard/components/Sidebar";
import DashboardHeaderNav from "../features/dashboard/components/DashboardHeaderNav";

export type SidebarState = "collapsed" | "expanded";

export const DashboardLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");

  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const isDark = colorScheme === "dark";

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, setDesktopOpened] = useState(true);

  const [sidebarState, setSidebarState] = useLocalStorage<SidebarState>({
    key: "mantine-sidebar-state",
    defaultValue: "expanded",
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    if (!isMobile) {
      setDesktopOpened(sidebarState === "expanded");
    }
  }, [sidebarState, isMobile]);

  const handleSidebarToggle = () => {
    if (isMobile) {
      toggleMobile();
    } else {
      const next = sidebarState === "expanded" ? "collapsed" : "expanded";
      setSidebarState(next);
      setDesktopOpened(next === "expanded");
    }
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
      layout="alt"
      transitionDuration={300}
    >
      <AppShell.Header
        px="md"
        style={{
          boxShadow: isTablet ? theme.shadows.md : theme.shadows.sm,
        }}
      >
        <Group h="100%" justify="space-between" wrap="nowrap">
          <Group gap="sm">
            <Tooltip
              label={
                sidebarState === "expanded"
                  ? "Collapse sidebar"
                  : "Show sidebar"
              }
              position="right"
            >
              <Burger
                opened={false}
                onClick={handleSidebarToggle}
                size="sm"
                aria-label="Toggle sidebar"
              />
            </Tooltip>
          </Group>
          <DashboardHeaderNav />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="md">
        <Group justify="space-between" mb="xl">
          <Group gap="sm" justify="flex-start" align="center">
            <IconFile size={24} />
            <Anchor component={Link} to="/" underline="never">
              <Title order={1} size="h4" c={isDark ? theme.white : theme.black}>
                myResume
              </Title>
            </Anchor>
          </Group>
          {isMobile && mobileOpened && (
            <Group justify="flex-end">
              <Tooltip label="Close sidebar" position="left">
                <Burger
                  opened={true}
                  onClick={toggleMobile}
                  size="sm"
                  aria-label="Toggle sidebar"
                />
              </Tooltip>
            </Group>
          )}
        </Group>
        <Sidebar />
      </AppShell.Navbar>
      <AppShell.Main>
        <Container
          size={isTablet ? "100%" : "xl"}
          px={isTablet ? "sm" : "md"}
          py="sm"
        >
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  );
};
