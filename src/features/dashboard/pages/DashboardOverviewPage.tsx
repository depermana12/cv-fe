import {
  Stack,
  Title,
  Text,
  Button,
  Group,
  SimpleGrid,
  Skeleton,
  Box,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";
import { OverviewStatsCards } from "../components/OverviewStatsCards";

export const DashboardOverviewPage = () => {
  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Box>
          <Title order={2}>Dashboard Overview</Title>
          <Text c="dimmed" size="sm">
            Welcome back! Here's what's happening with your CVs.
          </Text>
        </Box>
        <Link to="/dashboard/cv/create">
          <Button leftSection={<IconPlus size={16} />} size="md">
            Create New CV
          </Button>
        </Link>
      </Group>

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
    </Stack>
  );
};
