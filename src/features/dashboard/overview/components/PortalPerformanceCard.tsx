import {
  Badge,
  Group,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useUser } from "@/features/user/hooks";
import { usePortalPerformance } from "@/features/dashboard/analytics/hooks/usePortalPerformance";

export const PortalPerformanceCard = () => {
  const { data: user } = useUser();
  const { data, isLoading, error } = usePortalPerformance(user?.id || 0);

  if (isLoading) {
    return (
      <Paper p="sm" radius="md" withBorder>
        <Group justify="space-between" mb="xl">
          <Title order={4}>Portal Performance</Title>
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
          <Title order={4}>Portal Performance</Title>
        </Group>
        <Text c="red" size="sm">
          Unable to load portal performance.
        </Text>
      </Paper>
    );
  }

  const portals = data?.data ?? [];

  if (portals.length === 0) {
    return (
      <Paper p="sm" radius="md" withBorder>
        <Title order={4} mb="md">
          Portal Performance
        </Title>
        <Stack align="center" py="xl">
          <Text size="sm" c="dimmed">
            No activity yet
          </Text>
        </Stack>
      </Paper>
    );
  }

  const top = [...portals]
    .sort((a, b) => b.offerRate - a.offerRate)
    .slice(0, 3);

  return (
    <Paper p="sm" radius="md" withBorder>
      <Title order={4} mb="sm">
        Portal Performance
      </Title>
      <Stack gap="sm">
        {top.map((p) => (
          <Paper key={p.portal} p="xs" radius="sm" withBorder>
            <Group justify="space-between" align="center">
              <Stack gap={0}>
                <Text fw={500}>{p.portal}</Text>
                <Group gap={6}>
                  <Badge color="gray" variant="light" size="xs">
                    Total {p.totalApplications}
                  </Badge>
                  <Badge color="yellow" variant="light" size="xs">
                    Interviews {p.interviews}
                  </Badge>
                  <Badge color="teal" variant="light" size="xs">
                    Offers {p.offers}
                  </Badge>
                </Group>
              </Stack>
              <Stack gap={0} align="end">
                <Text fw={700}>{p.offerRate}%</Text>
                <Text size="xs" c="dimmed">
                  offer rate
                </Text>
              </Stack>
            </Group>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};
