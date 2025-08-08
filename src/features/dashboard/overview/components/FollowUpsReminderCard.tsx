import {
  Badge,
  Button,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useJobApplications } from "@/features/dashboard/tracker/hooks/useJobApplications";

const DAYS_THRESHOLD = 7;

function daysSince(date: Date | string): number {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export const FollowUpsReminderCard = () => {
  const navigate = useNavigate();
  // Fetch oldest first to surface items needing attention
  const {
    data: paged,
    isLoading,
    error,
  } = useJobApplications({
    sortBy: "appliedAt",
    sortOrder: "asc",
    limit: 20,
    offset: 0,
  });

  const allApps = paged?.data ?? [];
  const due = allApps
    .filter((a) => a.status === "applied")
    .map((a) => ({ ...a, days: daysSince(a.appliedAt as any) }))
    .filter((a) => a.days >= DAYS_THRESHOLD)
    .slice(0, 3);

  if (isLoading) {
    return (
      <Paper p="sm" radius="md" withBorder>
        <Group justify="space-between" mb="xl">
          <Title order={4}>Follow Up</Title>
          <Skeleton height={24} width={80} />
        </Group>
        <Stack gap="sm">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} height={60} radius="md" />
          ))}
        </Stack>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper p="sm" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Follow Up</Title>
        </Group>
        <Text c="red" size="sm">
          Unable to load follow-ups.
        </Text>
      </Paper>
    );
  }

  return (
    <Paper p="sm" radius="md" withBorder style={{ height: "100%" }}>
      <Group justify="space-between" mb="sm">
        <Title order={4}>Follow Up</Title>
        <Button
          onClick={() => navigate({ to: "/dashboard/tracker" })}
          variant="subtle"
          size="sm"
        >
          Open Tracker
        </Button>
      </Group>

      {due.length === 0 ? (
        <Stack align="center" py="xl">
          <Text size="sm" c="dimmed">
            You're all caught up!
          </Text>
        </Stack>
      ) : (
        <Stack gap="sm">
          {due.map((app) => (
            <Paper
              key={app.id}
              p="xs"
              radius="sm"
              withBorder
              onClick={() => navigate({ to: "/dashboard/tracker" })}
              style={{ cursor: "pointer" }}
            >
              <Group justify="space-between" align="center">
                <Stack gap={2}>
                  <Group gap={8} wrap="nowrap">
                    <Text lineClamp={1}>{app.jobTitle}</Text>
                    <Text component="span" size="xs" c="dimmed" lineClamp={1}>
                      {" "}
                      at {app.companyName}
                    </Text>
                  </Group>
                  <Text size="xs" c="dimmed">
                    {app.days} days since applied
                  </Text>
                </Stack>
                <Group gap={6}>
                  <Badge color="blue" variant="light" size="xs">
                    Applied
                  </Badge>
                </Group>
              </Group>
            </Paper>
          ))}
        </Stack>
      )}
    </Paper>
  );
};
