import { Stack, Title, Text } from "@mantine/core";
import { CvStatsCards } from "../components/CvStatsCards";

export const CvAnalyticsPage = () => {
  return (
    <Stack gap="xl">
      <div>
        <Title order={2}>CV Analytics</Title>
        <Text c="dimmed">
          View detailed statistics about your CV performance
        </Text>
      </div>

      <CvStatsCards />
    </Stack>
  );
};
