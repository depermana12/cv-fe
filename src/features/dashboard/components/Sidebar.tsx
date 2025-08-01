import { Divider, NavLink, Stack, Text } from "@mantine/core";
import {
  IconFileCv,
  IconTools,
  IconLayoutDashboard,
  IconSettings,
  IconMapRoute,
} from "@tabler/icons-react";
import type { Icon } from "@tabler/icons-react";
import { Link, useMatchRoute } from "@tanstack/react-router";

type NavItem = {
  label: string;
  route: string;
  icon: Icon;
};

const mainNavItems: NavItem[] = [
  {
    label: "Overview",
    route: "/dashboard/overview",
    icon: IconLayoutDashboard,
  },
  { label: "Cv Builder", route: "/dashboard/cv/library", icon: IconFileCv },
  { label: "Templates", route: "/dashboard/templates", icon: IconTools },
  { label: "Jobs Tracker", route: "/dashboard/tracker", icon: IconMapRoute },
];

export const Sidebar = () => {
  const matchRoute = useMatchRoute();

  return (
    <Stack gap={0} h="100%">
      <Stack gap={4} p={2} pb={0}>
        <Text fw={600} px="sm" size="sm" c="dimmed">
          Workspace
        </Text>
        {mainNavItems.map(({ icon: Icon, label, route }) => {
          const isDashboardRoot = route === "/dashboard";
          const isActive = !!matchRoute({
            to: route,
            fuzzy: !isDashboardRoot,
          });

          return (
            <NavLink
              key={label}
              component={Link}
              to={route}
              label={label}
              leftSection={<Icon size={22} stroke={1.5} />}
              active={isActive}
              variant="light"
              color="gray.9"
            />
          );
        })}
      </Stack>
      <Stack gap={4} p={2} mt="auto">
        <Divider />
        <Text fw={500} px="sm" size="sm" c="dimmed">
          Settings
        </Text>
        <NavLink
          component={Link}
          to="/dashboard/settings"
          label="App Settings"
          leftSection={<IconSettings size={22} stroke={1.5} />}
          active={!!matchRoute({ to: "/dashboard/settings", fuzzy: true })}
          variant="light"
          color="gray.9"
        />
      </Stack>
    </Stack>
  );
};
