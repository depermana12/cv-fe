import { SimpleGrid, Card, Group, ActionIcon, Text } from "@mantine/core";
import {
  IconFileCv,
  IconEye,
  IconBriefcase,
  IconTarget,
} from "@tabler/icons-react";
import { useUserStats } from "../../user/hooks/useUserStats";

export const OverviewStatsCards = () => {
  const { data: stats } = useUserStats();

  const calculateProfileCompletion = () => {
    const user = stats.user;
    const keys = Object.keys(user) as Array<keyof typeof user>;
    const profileFieldLength = keys.length;
    const point = 100 / profileFieldLength;

    let completion = 0;
    for (const key of keys) {
      if (user[key] && user[key] !== 0) {
        completion += point;
      }
    }

    return Math.round(completion);
  };

  const normalizeAccountAge = () => {
    const day = stats.accountAge;
    if (day < 7) return day + " days";
    if (day < 30) return Math.floor(day / 7) + " weeks";
    if (day < 365) return Math.floor(day / 30) + " months";
    return Math.floor(day / 365) + " years";
  };

  const statItems = [
    {
      title: "Total CVs",
      value: stats?.cvCreated || 0,
      icon: IconFileCv,
      color: "blue",
    },
    {
      title: "Account Age",
      value: normalizeAccountAge(),
      icon: IconEye,
      color: "green",
    },
    {
      title: "Job Applications",
      value: stats?.totalJobApplications || 0,
      icon: IconBriefcase,
      color: "orange",
    },
    {
      title: "Profile Completion",
      value: `${calculateProfileCompletion()}%`,
      icon: IconTarget,
      color: "purple",
    },
  ];

  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
      {statItems.map((stat) => (
        <Card key={stat.title} padding="lg" radius="md" withBorder>
          <Group justify="space-between">
            <div>
              <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                {stat.title}
              </Text>
              <Text size="xl" fw={700}>
                {stat.value}
              </Text>
            </div>
            <ActionIcon
              variant="light"
              color={stat.color}
              size="lg"
              radius="md"
            >
              <stat.icon size={22} />
            </ActionIcon>
          </Group>
        </Card>
      ))}
    </SimpleGrid>
  );
};
