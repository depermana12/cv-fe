import { Container, Stack, Skeleton, Group } from "@mantine/core";

export const JobTrackerSkeleton = () => (
  <Container size="xl" py="md">
    <Stack gap="lg">
      <Group justify="space-between">
        <Stack gap={6}>
          <Skeleton height={28} width={180} radius="md" />
          <Skeleton height={16} width={260} radius="md" />
        </Stack>
        <Group>
          <Skeleton height={34} width={140} radius="md" />
          <Skeleton height={34} width={36} circle />
        </Group>
      </Group>
      <Skeleton height={400} radius="md" />
    </Stack>
  </Container>
);
