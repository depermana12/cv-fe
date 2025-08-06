import {
  Badge,
  Group,
  Paper,
  Progress,
  Text,
  Stack,
  Skeleton,
  Alert,
  Title,
} from "@mantine/core";
import { useApplicationGoal } from "../../analytics/hooks/useApplicationGoal";
import { useAuthStore } from "@app/store/authStore";

export const MonthlyGoalCard = () => {
  const { user } = useAuthStore();

  const { data: goalData, isLoading, error } = useApplicationGoal(user?.id!);

  if (isLoading) {
    return (
      <Paper radius="md" withBorder p="md">
        <Stack gap={0} mb="xs">
          <Group justify="space-between" mb="xl">
            <Title order={4} mb="sm">
              Monthly Goal
            </Title>
            <Skeleton height={22} width={100} radius="xl" />
          </Group>
        </Stack>
        <Skeleton height={16} width={70} my="md" />
        <Skeleton height={20} width="100%" radius="md" mb={16} />
        <Skeleton height={16} width={50} />
      </Paper>
    );
  }

  if (error || !goalData?.data) {
    return (
      <Paper radius="md" withBorder p="md">
        <Alert color="red" variant="light">
          <Text size="sm">Unable to load monthly goal data</Text>
        </Alert>
      </Paper>
    );
  }

  const { goal, current, percentage, remainingDays } = goalData.data;

  const isGoalAchieved = percentage >= 100;

  return (
    <Paper
      radius="md"
      withBorder
      p="md"
      bg={isGoalAchieved ? "green.0" : "var(--mantine-color-body)"}
    >
      <Stack gap={0} mb="xs">
        <Group justify="space-between">
          <Title order={4} mb="sm">
            Monthly Goal
          </Title>
          {isGoalAchieved ? (
            <Badge size="md" color="green" variant="filled">
              Goal achieved!
            </Badge>
          ) : (
            <Badge size="md" color="blue" variant="filled">
              {remainingDays} days left
            </Badge>
          )}
        </Group>
        <Text size="sm" fw={500}>
          Target
        </Text>
        <Text c="dimmed" size="sm">
          {goal} applications / month
        </Text>
      </Stack>

      <Group justify="space-between" mb="xs">
        <Text size="sm" c="dimmed">
          Progress
        </Text>
        <Text size="sm" c="dimmed">
          {Math.round(percentage)}%
        </Text>
      </Group>

      <Progress
        value={Math.min(percentage, 100)}
        color={isGoalAchieved ? "green" : "blue"}
        size="lg"
        radius="md"
        mb="md"
      />

      <Group justify="space-between">
        <Text size="sm" fw={500}>
          {current} / {goal}
        </Text>
        {isGoalAchieved ? (
          <Text size="sm">Congrats! You've achieved your goal</Text>
        ) : null}
      </Group>
    </Paper>
  );
};
