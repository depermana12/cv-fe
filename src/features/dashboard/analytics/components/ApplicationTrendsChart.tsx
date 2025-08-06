import { useState } from "react";
import {
  Paper,
  Title,
  SegmentedControl,
  Stack,
  Box,
  Text,
  LoadingOverlay,
  Group,
  Loader,
  Skeleton,
} from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { useApplicationTrends } from "../hooks/useApplicationTrends";
import { useAuthStore } from "@app/store/authStore";

const TIME_PERIODS = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "90", label: "Last 3 months" },
];

export const ApplicationTrendsChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const { user } = useAuthStore();

  const { data, isLoading, error } = useApplicationTrends(
    user?.id!,
    +selectedPeriod,
  );

  const chartData = (data?.data || []).map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString("en-ID", {
      month: "short",
      day: "2-digit",
      year: "2-digit",
    }),
  }));

  if (isLoading) {
    return (
      <Paper withBorder p="sm" style={{ height: "100%" }}>
        <Stack gap="md">
          <Group justify="space-between" align="center" mb="md">
            <Stack gap={0}>
              <Title order={4}>Application Trends</Title>
              <Skeleton height={16} width={180} mt={2} />
            </Stack>
            <Skeleton height={35} width={310} radius="sm" />
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
            Application Trends
          </Title>
          <Box
            h={250}
            display="flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text c="red" size="sm" style={{ textAlign: "center" }}>
              Failed to load application trends data
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
            <Title order={4}>Application Trends</Title>
            <Text c="dimmed" size="sm">
              Total for the last {selectedPeriod} days
            </Text>
          </Stack>

          <SegmentedControl
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            data={TIME_PERIODS}
            size="sm"
            radius="sm"
          />
        </Group>

        <Box pos="relative">
          <LoadingOverlay visible={isLoading} />

          {chartData.length > 0 ? (
            <LineChart
              h={250}
              data={chartData}
              dataKey="date"
              series={[
                {
                  name: "count",
                  label: "Applications",
                  color: "indigo",
                },
              ]}
              curveType="natural"
              tickLine="x"
              withYAxis={true}
              withDots={true}
              activeDotProps={{ r: 4 }}
              tooltipAnimationDuration={200}
            />
          ) : (
            !isLoading && (
              <Box
                h={300}
                display="flex"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text c="dimmed" size="sm">
                  No application data available for this period
                </Text>
              </Box>
            )
          )}
        </Box>
      </Stack>
    </Paper>
  );
};
