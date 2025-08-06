import {
  Card,
  Group,
  ActionIcon,
  Box,
  Text,
  Badge,
  Stack,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { Icon } from "@tabler/icons-react";

type ContextualQuickActionItem = {
  title: string;
  description: string;
  icon: Icon;
  route: string;
  badge?: string;
};

export const ContextualActionCardItem = ({
  item,
}: {
  item: ContextualQuickActionItem;
}) => {
  return (
    <Card padding="xs" radius="sm" withBorder>
      <Group justify="space-between">
        <Group justify="flex-start" align="center">
          <item.icon size={24} />
          <Stack gap={0}>
            <Text size="sm" component={Link} to={item.route}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed" lineClamp={2}>
              {item.description}
            </Text>
          </Stack>
        </Group>
        {item.badge && (
          <Badge size="md" variant="default">
            {item.badge}
          </Badge>
        )}
      </Group>
    </Card>
  );
};
