import { Stack, Title, Grid } from "@mantine/core";
import { OverviewStatsCards } from "../components/OverviewStatsCards";
import { OverviewRecentCvs } from "../components/OverviewRecentCvs";
import { OverviewRecentApplications } from "../components/OverviewRecentApplications";
import { OverviewQuickItems } from "../components/OverviewQuickItems";
import { MonthlyGoalCard } from "../components/MonthlyGoalCard";
import { ApplicationTrendsChart } from "../../analytics/components/ApplicationTrendsChart";
import { ApplicationStatusDistributionChart } from "../../analytics/components/ApplicationStatusDistributionChart";
import { PortalPerformanceChart } from "../../analytics/components/PortalPerformanceChart";
import { useUser } from "@/features/user/hooks";

export const DashboardOverviewPage = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  };

  const { data } = useUser();
  const user = data?.firstName || data?.username;

  return (
    <Stack gap="md">
      <Title order={2} size="h3">
        Good {getGreeting()}, {user}
      </Title>

      <OverviewStatsCards />
      <Grid>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <ApplicationTrendsChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <ApplicationStatusDistributionChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <PortalPerformanceChart />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <OverviewQuickItems />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <MonthlyGoalCard />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <OverviewRecentCvs />
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <OverviewRecentApplications />
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
