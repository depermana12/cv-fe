import { Stack, Title, Text, Box, Grid } from "@mantine/core";
import { OverviewStatsCards } from "../components/OverviewStatsCards";
import { OverviewRecentCvs } from "../components/OverviewRecentCvs";
import { OverviewQuickItems } from "../components/OverviewQuickItems";
import { OverviewRecentActivity } from "../components/OverviewRecentActivity";
import { ApplicationTrendsChart } from "../../analytics/components/ApplicationTrendsChart";

export const DashboardOverviewPage = () => {
  return (
    <Stack gap="lg">
      <Box>
        <Title order={2}>Dashboard Overview</Title>
        <Text c="dimmed" size="sm">
          Welcome back! Here's what's happening with your CVs.
        </Text>
      </Box>

      <OverviewStatsCards />
      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <ApplicationTrendsChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="lg">
            <OverviewRecentCvs />
            <OverviewQuickItems />
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <OverviewRecentActivity />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
