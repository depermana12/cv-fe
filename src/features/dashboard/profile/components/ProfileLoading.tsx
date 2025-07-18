import { Stack, Group, Card, Grid, Skeleton } from "@mantine/core";

export const ProfileLoading = () => (
  <Stack gap="lg">
    <Group justify="space-between">
      <Stack gap="xs">
        <Skeleton height={32} width={120} />
        <Skeleton height={16} width={300} />
      </Stack>
      <Skeleton height={36} width={120} />
    </Group>
    <Grid>
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Card padding="lg" radius="md" withBorder>
          <Skeleton height={24} width={200} mb="md" />
          <Stack gap="md">
            <Group grow>
              <Skeleton height={60} />
              <Skeleton height={60} />
            </Group>
            <Skeleton height={60} />
            <Skeleton height={60} />
          </Stack>
        </Card>
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card padding="lg" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Skeleton height={80} width={80} radius="xl" />
            <Stack gap="xs" align="center">
              <Skeleton height={16} width={120} />
              <Skeleton height={14} width={80} />
            </Stack>
            <Skeleton height={32} width={100} />
          </Stack>
        </Card>
      </Grid.Col>
    </Grid>
  </Stack>
);
