import { Card, Stack, Button, Group, Title } from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { useCvs } from "@features/dashboard/cv/hooks/useCvs";
import { EmptyCv } from "./EmptyCv";
import { CvCardItem } from "./CvCardItem";

export const OverviewRecentCvs = () => {
  const { data: cvs } = useCvs();

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
