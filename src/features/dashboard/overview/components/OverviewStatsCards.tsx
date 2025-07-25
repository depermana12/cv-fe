import { SimpleGrid, Card, Text, Stack, Skeleton } from "@mantine/core";
import { useUserStats } from "../../../user/hooks/useUserStats";

export const OverviewStatsCards = () => {
  const { data: stats, isLoading, error } = useUserStats();

  if (isLoading) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={100} radius="md" />
        ))}
      </SimpleGrid>
    );
  }

  if (error || !stats) {
    return (
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} withBorder p="md" radius="md">
            <Stack gap="xs">
              <Text size="sm" c="dimmed">
                Error loading stats
              </Text>
              <Text fw={700} size="xl">
                -
              </Text>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    );
  }

  const calculateProfileCompletion = () => {
    const user = stats.user;
    const keys = Object.keys(user) as Array<keyof typeof user>;
    const profileFieldLength = keys.length;
    const point = 100 / profileFieldLength;

    let completion = 0;
    for (const key of keys) {
      if (user[key] && user[key] !== 0) {
        completion += point;
      }
    }

    return Math.round(completion);
  };

  const normalizeAccountAge = () => {
    if (!stats) return "-";
    const day = stats.accountAge;
    if (day < 7) return day + " days";
    if (day < 30) return Math.floor(day / 7) + " weeks";
    if (day < 365) return Math.floor(day / 30) + " months";
    return Math.floor(day / 365) + " years";
  };

  const statItems = [
    {
      title: "Total CVs",
      value: stats?.cvCreated || 0,
    },
    {
      title: "Account Age",
      value: normalizeAccountAge(),
    },
    {
      title: "Job Applications",
      value: stats?.totalJobApplications || 0,
    },
    {
      title: "Profile Completion",
      value: `${calculateProfileCompletion()}%`,
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {statItems.map((stat) => (
        <Card key={stat.title} padding="lg" radius="md" withBorder>
          <Stack justify="center">
            <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
              {stat.title}
            </Text>
            <Text size="xl" fw={700}>
              {stat.value}
            </Text>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );
};
