import { Button, Card, Stack, Title, Text } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export const DashboardPageIndex = () => {
  return (
    <Stack gap="md" className="max-w-3xl w-full mx-auto">
      <Title order={2}>Dashboard</Title>
      <Link from="/dashboard" to="/dashboard/cv/create">
        <Button variant="filled" color="blue" size="md" radius="md">
          + Create New CV
        </Button>
      </Link>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4}>My CVs</Title>
        <Text c="dimmed" mt="sm">
          List cv coming soon...
        </Text>
      </Card>
    </Stack>
  );
};
