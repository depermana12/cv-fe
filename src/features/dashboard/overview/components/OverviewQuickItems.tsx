import { Card, Title, SimpleGrid } from "@mantine/core";
import {
  IconPlus,
  IconFileCv,
  IconBriefcase,
  IconChartLine,
} from "@tabler/icons-react";
import { ActionCardItem } from "./ActionCardItem";

export const OverviewQuickItems = () => {
  const quickActionItems = [
    {
      title: "Create New CV",
      description: "Start building a new CV from scratch",
      icon: IconPlus,
      route: "/dashboard/cv/create",
    },
    {
      title: "Browse Templates",
      description: "Choose from professional CV templates",
      icon: IconFileCv,
      route: "/dashboard/templates",
    },
    {
      title: "Track Applications",
      description: "Manage your job applications",
      icon: IconBriefcase,
      route: "/dashboard/tracker",
    },
    {
      title: "View Analytics",
      description: "See your CV performance stats",
      icon: IconChartLine,
      route: "/dashboard/analytics",
    },
  ];

  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Quick Actions
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
        {quickActionItems.map((items) => (
          <ActionCardItem key={items.title} item={items} />
        ))}
      </SimpleGrid>
    </Card>
  );
};
