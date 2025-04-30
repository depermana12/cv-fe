import { Stack, Title, Text, Button, Card } from "@mantine/core";
import { Link } from "@tanstack/react-router";

export const DashboardPage = () => {
  return (
    <Stack gap="md" className="max-w-3xl w-full mx-auto">
      <Title order={2}>Dashboard</Title>
      <Link to="/dashboard/create">
        <Button variant="filled" color="blue" size="md" radius="md">
          + Create New CV
        </Button>
      </Link>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={4}>My CVs</Title>
        <Text c="dimmed" mt="sm">
          (Coming soon...) Your created CVs will appear here.
        </Text>
      </Card>
    </Stack>
  );
};
