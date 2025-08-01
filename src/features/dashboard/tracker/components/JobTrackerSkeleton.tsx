import { Stack, Skeleton, Group, Paper } from "@mantine/core";

export const JobTrackerSkeleton = () => (
  <Stack gap="lg">
    <Group justify="space-between">
      <Skeleton height={28} width={180} radius="md" />
      <Skeleton height={34} width={140} radius="md" />
    </Group>

    {/* Search and Filters skeleton */}
    <Group justify="space-between">
      <Skeleton height={36} width={300} radius="md" />
      <Group>
        <Skeleton height={36} width={150} radius="md" />
        <Skeleton height={36} width={36} radius="md" />
        <Skeleton height={36} width={36} radius="md" />
      </Group>
    </Group>

    {/* Table skeleton */}
    <Paper radius="md" withBorder w="100%">
      <Stack gap="xs" p="md">
        {/* Table rows */}
        {Array.from({ length: 5 }).map((_, index) => (
          <Group key={index} justify="space-between" grow>
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
            <Skeleton height={40} />
          </Group>
        ))}
      </Stack>

      {/* Pagination skeleton */}
      <Group justify="space-between" p="md">
        <Skeleton height={20} width={150} />
        <Group>
          <Skeleton height={20} width={100} />
          <Skeleton height={32} width={250} />
        </Group>
      </Group>
    </Paper>
  </Stack>
);
