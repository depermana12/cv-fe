import { Divider, NavLink, Stack, Text } from "@mantine/core";
import {
  IconFileCv,
  IconDeviceDesktopAnalytics,
  IconLibrary,
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
  { label: "Overview", route: "/dashboard", icon: IconLayoutDashboard },
  { label: "CV Builder", route: "/dashboard/cv/create", icon: IconFileCv },
  { label: "CV Library", route: "/dashboard/cv/library", icon: IconLibrary },
  { label: "Templates", route: "/dashboard/cv/templates", icon: IconTools },
  { label: "Jobs Tracker", route: "/dashboard/cv/tracker", icon: IconMapRoute },
  {
    label: "Analytics",
    route: "/dashboard/cv/analytics",
    icon: IconDeviceDesktopAnalytics,
  },
];

export const Sidebar = () => {
  const matchRoute = useMatchRoute();

  return (
    <Stack gap={0} h="100%">
      <Stack gap={4} p={2} pb={0}>
        <Text fw={500} px="sm" size="sm" c="dimmed">
          Dashboard
        </Text>
        {mainNavItems.map(({ icon: Icon, label, route }) => (
          <NavLink
            key={label}
            component={Link}
            to={route}
            label={label}
            leftSection={<Icon size={18} stroke={1.5} />}
            active={!!matchRoute({ to: route, fuzzy: true })}
            variant="light"
            color="blue"
          />
        ))}
      </Stack>
      <Stack gap={4} p={2} mt="auto">
        <Divider />
        <Text fw={500} px="sm" size="sm" c="dimmed">
          Account
        </Text>
        <NavLink
          component={Link}
          to="/settings"
          label="Settings"
          leftSection={<IconSettings size={18} stroke={1.5} />}
          active={!!matchRoute({ to: "/dashboard", fuzzy: true })}
          variant="light"
          color="blue"
        />
      </Stack>
    </Stack>
  );
};
