import { Card, Group, ActionIcon, Box, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import type { Icon } from "@tabler/icons-react";

type QuickActionItem = {
  title: string;
  description: string;
  icon: Icon;
  route: string;
};

export const ActionCardItem = ({ item }: { item: QuickActionItem }) => {
  return (
    <Card padding="md" radius="sm" withBorder>
      <Group>
        <ActionIcon
          variant="default"
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
    </Card>
  );
};
