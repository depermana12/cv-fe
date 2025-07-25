import {
  Card,
  Stack,
  Button,
  Group,
  Title,
  Skeleton,
  Text,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useCvs } from "@features/dashboard/cv/hooks/useCvs";
import { EmptyCv } from "./EmptyCv";
import { CvCardItem } from "./CvCardItem";

export const OverviewRecentCvs = () => {
  const { data: cvs, isLoading, error } = useCvs();

  if (isLoading) {
    return (
      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Skeleton height={24} width={120} />
          <Skeleton height={32} width={80} />
        </Group>
        <Stack gap="sm">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} height={80} radius="md" />
          ))}
        </Stack>
      </Card>
    );
  }

  if (error) {
    return (
      <Card padding="lg" radius="md" withBorder>
        <Group justify="space-between" mb="md">
          <Title order={4}>Recent CVs</Title>
        </Group>
        <Text c="red" size="sm">
          Unable to load your recent CVs. Please try again.
        </Text>
      </Card>
    );
  }

  if (!cvs || cvs.length === 0) {
    return <EmptyCv />;
  }

  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={4}>Recent CVs</Title>
        <Button
          component={Link}
          to="/dashboard/library"
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
    </Card>
  );
};
