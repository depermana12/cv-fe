import { Container, Stack, Skeleton, Group, Paper } from "@mantine/core";

export const JobTrackerSkeleton = () => (
  <Container size="xl" py="md">
    <Stack gap="lg">
      <Group justify="space-between">
        <Stack gap={6}>
          <Skeleton height={28} width={180} radius="md" />
          <Skeleton height={16} width={260} radius="md" />
        </Stack>
        <Skeleton height={34} width={140} radius="md" />
      </Group>

      <Paper radius="md" withBorder w="100%">
        {/* Search and Filters skeleton */}
        <Group p="md" justify="space-between">
          <Skeleton height={36} width={300} radius="md" />
          <Skeleton height={36} width={150} radius="md" />
        </Group>

        {/* Table skeleton */}
        <Stack gap="xs" p="md">
          {/* Table header */}
          <Group justify="space-between">
            <Skeleton height={20} width={120} />
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={120} />
            <Skeleton height={20} width={80} />
            <Skeleton height={20} width={120} />
            <Skeleton height={20} width={100} />
            <Skeleton height={20} width={80} />
          </Group>

          {/* Table rows */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Group key={index} justify="space-between">
              <Skeleton height={40} width={120} />
              <Skeleton height={40} width={100} />
              <Skeleton height={40} width={120} />
              <Skeleton height={40} width={80} />
              <Skeleton height={40} width={120} />
              <Skeleton height={40} width={100} />
              <Skeleton height={40} width={80} />
            </Group>
          ))}
        </Stack>

        {/* Pagination skeleton */}
        <Group justify="space-between" p="md">
          <Skeleton height={20} width={150} />
          <Skeleton height={20} width={100} />
          <Skeleton height={32} width={200} />
        </Group>
      </Paper>
    </Stack>
  </Container>
);
