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
    date: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  }));

  if (error) {
    return (
      <Paper withBorder p="md">
        <Title order={4} mb="md">
          Application Trends
        </Title>
        <Text c="red" size="sm">
          Failed to load application trends data
        </Text>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="md" style={{ height: "100%" }}>
      <Stack gap="md">
        <Group justify="space-between" align="center">
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

        <Box pos="relative" h={300}>
          <LoadingOverlay visible={isLoading} />

          {chartData.length > 0 ? (
            <LineChart
              h={350}
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
              withYAxis={false}
              withDots={true}
              dotProps={{ r: 4, strokeWidth: 2 }}
              activeDotProps={{ r: 6, strokeWidth: 2 }}
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
