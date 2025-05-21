import {
  Anchor,
  Box,
  Breadcrumbs,
  Stack,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BreadcrumbItem } from "../../hooks/useBreadcrumbItems";

type HeaderSectionProps = {
  title: string;
  breadcrumbItems?: BreadcrumbItem[];
};

export const HeaderSection = ({
  title,
  breadcrumbItems,
}: HeaderSectionProps) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  const items = breadcrumbItems?.map((item, index) => (
    <Anchor
      href={item.href}
      key={index}
      size="sm"
      underline={colorScheme === "light" ? "hover" : "always"}
    >
      {item.label}
    </Anchor>
  ));

  return (
    <Box
      pb="md"
      style={{
        borderBottom: `1px solid ${
          colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
      }}
    >
      <Stack gap="md">
        {breadcrumbItems && breadcrumbItems.length > 0 && (
          <Breadcrumbs separatorMargin="sm">{items}</Breadcrumbs>
        )}
        <Title order={2} size="h3">
          {title}
        </Title>
      </Stack>
    </Box>
  );
};
