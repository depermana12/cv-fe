import { useMemo } from "react";
import { BarChart } from "@mantine/charts";
import {
  Box,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAuthStore } from "@/app/store/authStore";
import { usePortalPerformance } from "../hooks/usePortalPerformance";

export const PortalPerformanceChart = () => {
  const { user } = useAuthStore();
  const userId = user?.id!;
  const { data, isLoading, error } = usePortalPerformance(userId);

  const chartData = useMemo(() => {
    const portals = data?.data ?? [];
    // Take top 5 portals by total applications for a stable visual
    const top = [...portals]
      .sort((a, b) => b.totalApplications - a.totalApplications)
      .slice(0, 5)
      .map((p) => ({
        portal: p.portal,
        totalApplications: p.totalApplications,
        interviews: p.interviews,
        offers: p.offers,
        offerRate: p.offerRate,
        interviewRate: p.interviewRate,
      }));
    return top;
  }, [data]);

  if (isLoading) {
    return (
      <Paper withBorder p="sm" style={{ height: "100%" }}>
        <Stack gap="md">
          <Group justify="space-between" align="center" mb="md">
            <Stack gap={0}>
              <Title order={4}>Portal Performance</Title>
              <Skeleton height={16} width={240} mt={2} />
            </Stack>
          </Group>
          <Box
            h={250}
            display="flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Loader size="lg" color="indigo" />
          </Box>
        </Stack>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper withBorder p="sm" style={{ height: "100%" }}>
        <Stack gap="md">
          <Title order={4} mb="md">
            Portal Performance
          </Title>
          <Box
            h={250}
            display="flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text c="red" size="sm" style={{ textAlign: "center" }}>
              Failed to load portal performance
            </Text>
          </Box>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="sm" style={{ height: "100%" }}>
      <Stack gap="md">
        <Group justify="space-between" align="center" mb="md">
          <Stack gap={0}>
            <Title order={4}>Portal Performance</Title>
            <Text c="dimmed" size="sm">
              Total applications with interviews and offers by portal
            </Text>
          </Stack>
        </Group>

        <Box pos="relative">
          <LoadingOverlay visible={isLoading} />
          {chartData.length > 0 ? (
            <BarChart
              h={280}
              data={chartData}
              dataKey="portal"
              withLegend
              legendProps={{
                verticalAlign: "bottom",
                height: 50,
              }}
              series={[
                { name: "totalApplications", label: "Total", color: "gray.6" },
                { name: "interviews", label: "Interviews", color: "yellow.6" },
                { name: "offers", label: "Offers", color: "teal.6" },
              ]}
              withYAxis
            />
          ) : (
            <Box
              h={250}
              display="flex"
              style={{ alignItems: "center", justifyContent: "center" }}
            >
              <Text c="dimmed" size="sm">
                No portal performance data available
              </Text>
            </Box>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
