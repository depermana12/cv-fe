import {
  Stack,
  Button,
  Group,
  Title,
  Skeleton,
  Text,
  Paper,
  Badge,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useJobApplications } from "@/features/dashboard/tracker/hooks/useJobApplications";
import { JobApplicationEmpty } from "@/features/dashboard/tracker/components/JobApplicationEmpty";

const statusColor: Record<string, string> = {
  applied: "blue",
  interview: "yellow",
  offer: "teal",
  accepted: "green",
  rejected: "red",
  ghosted: "gray",
};

export const OverviewRecentApplications = () => {
  const navigate = useNavigate();
  const {
    data: paged,
    isLoading,
    error,
  } = useJobApplications({
    sortBy: "appliedAt",
    sortOrder: "desc",
    limit: 3,
    offset: 0,
  });

  const applications = paged?.data ?? [];

  if (isLoading) {
    return (
      <Paper p="sm" radius="md" withBorder>
        <Group justify="space-between" mb="xl">
          <Title order={4}>Recent Applications</Title>
          <Skeleton height={24} width={80} />
        </Group>
        <Stack gap="sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height={60} radius="md" />
          ))}
        </Stack>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper p="sm" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Recent Applications</Title>
        </Group>
        <Text c="red" size="sm">
          Unable to load your recent applications. Please try again.
        </Text>
      </Paper>
    );
  }

  if (!applications || applications.length === 0) {
    return <JobApplicationEmpty />;
  }

  return (
    <Paper p="sm" radius="md" withBorder>
      <Group justify="space-between" mb="sm">
        <Title order={4}>Recent Applications</Title>
        <Button
          onClick={() => navigate({ to: "/dashboard/tracker" })}
          variant="subtle"
          size="sm"
        >
          View All
        </Button>
      </Group>

      <Stack gap="sm">
        {applications.map((app) => (
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
                  {new Date(app.appliedAt).toLocaleDateString("en-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </Stack>
              <Badge size="sm" color={statusColor[app.status] ?? "gray"}>
                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </Badge>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};
