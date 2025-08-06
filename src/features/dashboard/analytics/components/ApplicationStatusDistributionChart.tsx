import { Paper, Title, Stack, Box, Text, LoadingOverlay } from "@mantine/core";
import { Loader, Skeleton } from "@mantine/core";
import { PieChart } from "@mantine/charts";
import { useApplicationStatusDist } from "../hooks/useApplicationStatusDist";
import { useAuthStore } from "@app/store/authStore";
// TODO: Extract to constant for job status colors
const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "gray.6";
    case "interview":
      return "indigo.6";
    case "offer":
      return "teal.5";
    case "accepted":
      return "green.6";
    case "rejected":
      return "red.6";
    case "ghosted":
      return "dark.4";
    default:
      return "gray.6";
  }
};

export const ApplicationStatusDistributionChart = () => {
  const { user } = useAuthStore();

  const { data, isLoading, error } = useApplicationStatusDist(user?.id!);

  const chartData = (data?.data || []).map((item) => ({
    name: item.status,
    value: item.count,
    color: getStatusColor(item.status),
  }));

  if (isLoading) {
    return (
      <Paper withBorder p="sm" style={{ height: "100%" }}>
        <Stack gap={0} mb="sm">
          <Box>
            <Title order={4}>Application Status Distribution</Title>
            <Skeleton height={16} width={280} mt={2} />
          </Box>
          <Box
            h={190}
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
        <Stack gap={0} mb="sm">
          <Box>
            <Title order={4}>Application Status Distribution</Title>
          </Box>
          <Box
            h={190}
            display="flex"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Text c="red" size="sm" style={{ textAlign: "center" }}>
              Failed to load status distribution data
            </Text>
          </Box>
        </Stack>
      </Paper>
    );
  }

  return (
    <Paper withBorder p="sm" style={{ height: "100%" }}>
      <Stack gap={0} mb="sm">
        <Box>
          <Title order={4}>Application Status Distribution</Title>
          <Text c="dimmed" size="sm">
            Breakdown of your applications by status
          </Text>
        </Box>

        <Box pos="relative">
          <LoadingOverlay visible={isLoading} />
          <Stack align="center">
            {chartData.length > 0 ? (
              <PieChart
                withLabelsLine
                labelsPosition="outside"
                labelsType="value"
                withLabels
                data={chartData}
                size={190}
                withTooltip
                tooltipDataSource="segment"
              />
            ) : (
              !isLoading && (
                <Box
                  h={190}
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
              marginInline: 20,
            }}
          >
            {chartData.map((item) => (
              <Box
                key={item.name}
                display="flex"
                style={{
                  alignItems: "center",
                  gap: 4,
                  minWidth: 50,
                }}
              >
                <Box
                  style={{
                    width: 15,
                    height: 15,
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
