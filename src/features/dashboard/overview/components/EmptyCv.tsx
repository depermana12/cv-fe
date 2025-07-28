import { Card, Stack, Button, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

export const EmptyCv = () => {
  return (
    <Card padding="lg" radius="md" withBorder>
      <Stack gap="md" align="center" py="xl">
        <Stack align="center" gap={2}>
          <Text size="lg" fw={500}>
            No CVs yet
          </Text>
          <Text size="sm" c="dimmed" mt={4}>
            Create your first CV to get started
          </Text>
        </Stack>
        <Button
          variant="outline"
          size="md"
          component={Link}
          to="/dashboard/cv/library"
          leftSection={<IconPlus size={16} />}
        >
          Create Your First CV
        </Button>
      </Stack>
    </Card>
  );
};
