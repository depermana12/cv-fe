import {
  Button,
  Group,
  NumberInput,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useUpdateGoal } from "@/features/user/hooks/useUpdateGoal";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconFileCv } from "@tabler/icons-react";

export const UpdateMonthlyGoal = () => {
  const [goal, setGoal] = useState<number>(30);
  const { mutate: updateGoal, isPending } = useUpdateGoal();

  const handleSave = () => {
    updateGoal(
      { goal },
      {
        onSuccess: () => {
          notifications.show({
            position: "top-right",
            withCloseButton: true,
            icon: <IconCheck />,
            autoClose: 5000,
            withBorder: true,
            title: "All good!",
            message: `Your goal has been updated.`,
            color: "green",
          });
        },
      },
    );
  };

  return (
    <Paper withBorder radius="md" p="lg">
      <Stack gap="md">
        <Title order={4}>Monthly Application Goal</Title>
        <Group justify="space-between">
          <Text size="sm" fw={600}>
            Set monthly goal:
          </Text>
          <Group align="end" justify="space-between" wrap="nowrap">
            <NumberInput
              aria-label="Input monthly application goal"
              leftSection={<IconFileCv />}
              value={goal}
              onChange={(val) => setGoal(+val || 30)}
              min={1}
              max={1000}
              maw={100}
            />
            <Button
              onClick={handleSave}
              loading={isPending}
              disabled={isPending}
            >
              Set Goal
            </Button>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
};
