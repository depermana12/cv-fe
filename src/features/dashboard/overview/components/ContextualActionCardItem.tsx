import { Card, Group, ActionIcon, Box, Text, Badge } from "@mantine/core";
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
    <Card padding="md" radius="sm" withBorder>
      <Group justify="space-between" mb="xs">
        <Group>
          <ActionIcon
            variant="light"
            size="lg"
            radius="md"
            aria-label={item.title}
          >
            <item.icon size={20} />
          </ActionIcon>
          <Box>
            <Text size="sm" fw={500} component={Link} to={item.route}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed" lineClamp={2}>
              {item.description}
            </Text>
          </Box>
        </Group>
        {item.badge && (
          <Badge size="sm" variant="light">
            {item.badge}
          </Badge>
        )}
      </Group>
    </Card>
  );
};
