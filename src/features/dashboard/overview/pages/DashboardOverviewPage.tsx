import {
  Stack,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Skeleton,
  Box,
  Grid,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { OverviewStatsCards } from "../overview/components/OverviewStatsCards";
import { OverviewRecentCvs } from "../overview/components/OverviewRecentCvs";
import { OverviewQuickItems } from "../overview/components/OverviewQuickItems";
import { OverviewRecentActivity } from "../overview/components/OverviewRecentActivity";

export const DashboardOverviewPage = () => {
  return (
    <Stack gap="lg">
      <Box>
        <Title order={2}>Dashboard Overview</Title>
        <Text c="dimmed" size="sm">
          Welcome back! Here's what's happening with your CVs.
        </Text>
      </Box>

      <Suspense
        fallback={
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} height={100} radius="md" />
            ))}
          </SimpleGrid>
        }
      >
        <OverviewStatsCards />
      </Suspense>
      <Grid>
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Stack gap="lg">
            <Suspense fallback={<Skeleton height={300} radius="md" />}>
              <OverviewRecentCvs />
            </Suspense>
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
