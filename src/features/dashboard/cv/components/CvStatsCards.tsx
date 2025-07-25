import { Card, Grid, Group, Text, Title, Skeleton, Alert } from "@mantine/core";
import {
  IconEye,
  IconDownload,
  IconFile,
  IconLock,
  IconWorld,
} from "@tabler/icons-react";
import { useCvStats } from "../hooks/useCvStats";

export const CvStatsCards = () => {
  const { data: stats, isLoading, error } = useCvStats();

  if (isLoading) {
    return (
      <Grid>
        {Array.from({ length: 5 }).map((_, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Card padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Skeleton height={16} width={100} mb={8} />
                  <Skeleton height={24} width={60} />
                </div>
                <Skeleton height={32} width={32} radius="md" />
              </Group>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    );
  }

  if (error) {
    return (
      <Alert color="red" title="Error loading CV statistics">
        Unable to load your CV statistics. Please try again.
      </Alert>
    );
  }

  if (!stats) return null;

  const statCards = [
    {
      title: "Total CVs",
      value: stats.totalCvs,
      icon: IconFile,
      color: "blue",
    },
    {
      title: "Public CVs",
      value: stats.publicCvs,
      icon: IconWorld,
      color: "green",
    },
    {
      title: "Private CVs",
      value: stats.privateCvs,
      icon: IconLock,
      color: "orange",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      icon: IconEye,
      color: "violet",
    },
    {
      title: "Total Downloads",
      value: stats.totalDownloads,
      icon: IconDownload,
      color: "teal",
    },
  ];

  return (
    <Grid>
      {statCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <Grid.Col key={stat.title} span={{ base: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Card padding="lg" radius="md" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" c="dimmed" fw={500}>
                    {stat.title}
                  </Text>
                  <Text size="xl" fw={700}>
                    {stat.value.toLocaleString()}
                  </Text>
                </div>
                <Icon
                  size={32}
                  color={`var(--mantine-color-${stat.color}-6)`}
                />
              </Group>
            </Card>
          </Grid.Col>
        );
      })}

      {/* Most viewed CV card */}
      {stats.mostViewedCv && (
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={4} mb="sm">
              Most Viewed CV
            </Title>
            <Group justify="space-between">
              <div>
                <Text fw={500}>{stats.mostViewedCv.title}</Text>
                <Text size="sm" c="dimmed">
                  {stats.mostViewedCv.views.toLocaleString()} views
                </Text>
              </div>
              <IconEye size={24} color="var(--mantine-color-violet-6)" />
            </Group>
          </Card>
        </Grid.Col>
      )}

      {/* Most downloaded CV card */}
      {stats.mostDownloadedCv && (
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="lg" radius="md" withBorder>
            <Title order={4} mb="sm">
              Most Downloaded CV
            </Title>
            <Group justify="space-between">
              <div>
                <Text fw={500}>{stats.mostDownloadedCv.title}</Text>
                <Text size="sm" c="dimmed">
                  {stats.mostDownloadedCv.downloads.toLocaleString()} downloads
                </Text>
              </div>
              <IconDownload size={24} color="var(--mantine-color-teal-6)" />
            </Group>
          </Card>
        </Grid.Col>
      )}
    </Grid>
  );
};
