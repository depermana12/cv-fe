import { Stack, Title, Grid } from "@mantine/core";
import { OverviewStatsCards } from "../components/OverviewStatsCards";
import { OverviewRecentCvs } from "../components/OverviewRecentCvs";
import { OverviewQuickItems } from "../components/OverviewQuickItems";
import { MonthlyGoalCard } from "../components/MonthlyGoalCard";
import { ApplicationTrendsChart } from "../../analytics/components/ApplicationTrendsChart";
import { ApplicationStatusDistributionChart } from "../../analytics/components/ApplicationStatusDistributionChart";

export const DashboardOverviewPage = () => {
  return (
    <Stack gap="md">
      <Title order={2} size="h3">
        Dashboard Overview
      </Title>

      <OverviewStatsCards />
      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <ApplicationTrendsChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <ApplicationStatusDistributionChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="lg">
            <OverviewRecentCvs />
            <OverviewQuickItems />
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <MonthlyGoalCard />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
