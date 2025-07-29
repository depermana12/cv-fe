import { Paper, Title, Stack, Box, Text, LoadingOverlay } from "@mantine/core";
import { PieChart } from "@mantine/charts";
import { useApplicationStatusDist } from "../hooks/useApplicationStatusDist";
import { useAuthStore } from "@app/store/authStore";

const STATUS_COLORS = [
  "indigo.6",
  "blue.6",
  "cyan.6",
  "violet.6",
  "indigo.4",
  "blue.4",
  "slate.6",
  "indigo.8",
];

export const ApplicationStatusDistributionChart = () => {
  const { user } = useAuthStore();

  const { data, isLoading, error } = useApplicationStatusDist(user?.id!);

  const chartData = (data?.data || []).map((item, index) => ({
    name: item.status,
    value: item.count,
    color: STATUS_COLORS[index % STATUS_COLORS.length],
  }));

  if (error) {
    return (
      <Paper withBorder p="md">
        <Title order={4} size="md" mb="md">
          Application Status Distribution
        </Title>
        <Text c="red" size="sm">
          Failed to load status distribution data
        </Text>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="md" style={{ height: "100%" }}>
      <Stack gap="md">
        <Box>
          <Title order={4}>Application Status Distribution</Title>
          <Text c="dimmed" size="sm">
            Breakdown of your applications by status
          </Text>
        </Box>

        <Box pos="relative" h={300}>
          <LoadingOverlay visible={isLoading} />
          <Stack align="center">
            {chartData.length > 0 ? (
              <PieChart
                withLabelsLine
                labelsPosition="outside"
                labelsType="value"
                withLabels
                data={chartData}
                size={240}
                withTooltip
                tooltipDataSource="segment"
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
                    No application status data available
                  </Text>
                </Box>
              )
            )}
          </Stack>
        </Box>

        {/* Legends */}
        {chartData.length > 0 && (
          <Box
            mt="sm"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {chartData.map((item) => (
              <Box
                key={item.name}
                display="flex"
                style={{ alignItems: "center", gap: 4 }}
              >
                <Box
                  style={{
                    width: 12,
                    height: 12,
                    background: `var(--mantine-color-${item.color.replace(".", "-")})`,
                    marginRight: 3,
                  }}
                />
                <Text size="sm">{item.name}</Text>
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    </Paper>
  );
};
