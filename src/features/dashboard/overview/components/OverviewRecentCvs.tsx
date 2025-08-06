import {
  Stack,
  Button,
  Group,
  Title,
  Skeleton,
  Text,
  Paper,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";
import { useCvs } from "@features/dashboard/cv/hooks/useCvs";
import { EmptyCv } from "./EmptyCv";
import { CvCardItem } from "./CvCardItem";

export const OverviewRecentCvs = () => {
  const { data: cvs, isLoading, error } = useCvs();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Paper p="sm" radius="md" withBorder>
        <Group justify="space-between" mb="xl">
          <Title order={4}>Recent CVs</Title>
          <Skeleton height={24} width={80} />
        </Group>
        <Stack gap="sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height={60} radius="md" />
          ))}
        </Stack>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper p="sm" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Recent CVs</Title>
        </Group>
        <Text c="red" size="sm">
          Unable to load your recent CVs. Please try again.
        </Text>
      </Paper>
    );
  }

  if (!cvs || cvs.length === 0) {
    return <EmptyCv />;
  }

  return (
    <Paper p="sm" radius="md" withBorder>
      <Group justify="space-between" mb="sm">
        <Title order={4}>Recent CVs</Title>
        <Button
          onClick={() => navigate({ to: "/dashboard/cv/library" })}
          variant="subtle"
          size="sm"
        >
          View All
        </Button>
      </Group>

      <Stack gap="sm">
        {cvs.slice(0, 3).map((cv) => (
          <CvCardItem key={cv.id} cv={cv} />
        ))}
      </Stack>
    </Paper>
  );
};
