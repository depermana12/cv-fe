import { Stack, Text, Avatar, Title } from "@mantine/core";
import { IconMapRoute } from "@tabler/icons-react";

export const JobApplicationEmpty = () => {
  return (
    <Stack align="center" justify="center" gap="md" mih={300}>
      <Avatar size="xl" color="gray" variant="light">
        <IconMapRoute size={40} />
      </Avatar>
      <Title order={3}>No job applications yet</Title>
      <Text size="sm" c="dimmed" mb="xs">
        Click "Add Application" to get started tracking your job applications.
      </Text>
    </Stack>
  );
};
