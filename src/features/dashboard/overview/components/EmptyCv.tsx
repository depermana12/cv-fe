import { Card, Stack, Avatar, Group, Button, Text } from "@mantine/core";
import { IconFileCv, IconPlus } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export const EmptyCv = () => {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Stack gap="md" align="center" py="xl">
        <IconFileCv size={16} />
        <Group align="center" gap={4}>
          <Text size="lg" fw={500}>
            No CVs yet
          </Text>
          <Text size="sm" c="dimmed" mt={4}>
            Create your first CV to get started
          </Text>
        </Group>
        <Button
          component={Link}
          to="/dashboard/cv/create"
          leftSection={<IconPlus size={16} />}
        >
          Create Your First CV
        </Button>
      </Stack>
    </Card>
  );
};
