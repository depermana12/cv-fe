import {
  Anchor,
  Box,
  Breadcrumbs,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BreadcrumbItem } from "../../../hooks/useBreadcrumbItems";

const DASHBOARD_LABEL = "Dashboard";
const DASHBOARD_PATH = "/dashboard";

type HeaderSectionProps = {
  breadcrumbItems?: BreadcrumbItem[];
};

export const HeaderSection = ({ breadcrumbItems }: HeaderSectionProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  // Only show breadcrumbs if there is more than one item after dashboard
  const filteredItems = (breadcrumbItems || []).filter(
    (item) => item.label !== DASHBOARD_LABEL && item.href !== DASHBOARD_PATH,
  );
  const items = [
    <span
      key="dashboard"
      style={{ fontWeight: 500, color: theme.colors.gray[7] }}
    >
      {DASHBOARD_LABEL}
    </span>,
    ...filteredItems.map((item, index) => (
      <Anchor
        href={item.href}
        key={index}
        size="sm"
        underline={colorScheme === "light" ? "hover" : "always"}
      >
        {item.label}
      </Anchor>
    )),
  ];

  return (
    <Box pb="md">
      <Stack gap="md">
        {items.length > 1 && (
          <Breadcrumbs separatorMargin="sm">{items}</Breadcrumbs>
        )}
      </Stack>
    </Box>
  );
};
