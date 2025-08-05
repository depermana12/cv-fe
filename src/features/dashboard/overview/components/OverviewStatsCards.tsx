import { SimpleGrid, Text, Skeleton, Group, Paper } from "@mantine/core";
import { IconArrowDownRight, IconArrowUpRight } from "@tabler/icons-react";
import { useUserStats } from "../../../user/hooks/useUserStats";
import { useApplicationMonthlyRate } from "../../analytics/hooks/useApplicationMonthlyRate";
import { useApplicationMonthlyIntv } from "../../analytics/hooks/useApplicationMonthlyIntv";
import { useAuthStore } from "@app/store/authStore";

export const OverviewStatsCards = () => {
  const { data: stats, isLoading, error } = useUserStats();
  const { user } = useAuthStore();
  const {
    data: monthlyRateData,
    isLoading: isMonthlyRateLoading,
    error: monthlyRateError,
  } = useApplicationMonthlyRate(user?.id!);
  const {
    data: monthlyIntvData,
    isLoading: isMonthlyIntvLoading,
    error: monthlyIntvError,
  } = useApplicationMonthlyIntv(user?.id!);

  if (isLoading || isMonthlyRateLoading || isMonthlyIntvLoading) {
    return (
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={120} radius="md" />
        ))}
      </SimpleGrid>
    );
  }

  if (error || !stats || monthlyRateError || monthlyIntvError) {
    return (
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
        {Array.from({ length: 4 }).map((_, i) => (
          <Paper key={i} withBorder p="md" radius="md">
            <Text size="xs" c="dimmed">
              Error loading stats
            </Text>
            <Text fw={700} size="xl" mt="md">
              -
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    );
  }

  const statItems = [
    {
      title: "Total CVs",
      value: stats?.cvCreated || 0,
      diff: null, // No growth data for CVs
    },
    {
      title: "Total Applications",
      value: stats?.totalJobApplications || 0,
      diff: null, // No growth data for total
    },
    {
      title: "Monthly Applications",
      value: monthlyRateData?.data?.thisMonth || 0,
      diff: monthlyRateData?.data?.growthRate || 0,
    },
    {
      title: "Monthly Interviews",
      value: monthlyIntvData?.data?.thisMonth || 0,
      diff: monthlyIntvData?.data?.growthRate || 0,
    },
  ];

  const renderStats = statItems.map((stat) => {
    const DiffIcon =
      stat.diff && stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;
    const hasDiff = stat.diff !== null && stat.diff !== undefined;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
            {stat.title}
          </Text>
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text size="xl" fw={700}>
            {stat.value}
          </Text>
          {hasDiff && (
            <Text
              c={stat.diff! > 0 ? "teal" : stat.diff! < 0 ? "red" : "dimmed"}
              size="sm"
              fw={500}
              style={{ display: "flex", alignItems: "center", gap: "2px" }}
            >
              <span>{stat.diff}%</span>
              {stat.diff !== 0 && <DiffIcon size={16} stroke={1.5} />}
            </Text>
          )}
        </Group>

        <Text size="xs" c="dimmed" mt={7}>
          {hasDiff ? "Compared to last month" : "Total count"}
        </Text>
      </Paper>
    );
  });

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }} spacing="md">
      {renderStats}
    </SimpleGrid>
  );
};
