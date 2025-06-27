import {
  ActionIcon,
  Card,
  Group,
  Stack,
  Title,
  Text,
  List,
} from "@mantine/core";

export const OverviewRecentActivity = () => {
  const dummyActivities = [
    {
      type: "cv_created",
      message: "Created new CV 'Software Developer Resume'",
      time: "2 hours ago",
    },
    {
      type: "cv_updated",
      message: "Updated work experience section",
      time: "1 day ago",
    },
    {
      type: "application_tracked",
      message: "Added application for Frontend Developer at TechCorp",
      time: "3 days ago",
    },
  ];

  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Recent Activity
      </Title>
      <List spacing="xs">
        {dummyActivities.map((activity, index) => (
          <List.Item key={index}>
            <Stack gap={0}>
              <Text size="sm">{activity.message}</Text>
              <Text size="xs" c="dimmed">
                {activity.time}
              </Text>
            </Stack>
          </List.Item>
        ))}
      </List>
    </Card>
  );
};
