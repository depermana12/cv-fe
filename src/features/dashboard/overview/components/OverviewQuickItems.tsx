import {
  Card,
  Title,
  SimpleGrid,
  Skeleton,
  Text,
  Alert,
  Stack,
} from "@mantine/core";
import {
  IconPlus,
  IconTarget,
  IconBriefcase,
  IconInfoCircle,
  IconUser,
} from "@tabler/icons-react";
import { useAuthStore } from "@app/store/authStore";
import { useUserStats } from "../../../user/hooks/useUserStats";
import { useProfileProgress } from "../../../user/hooks/useProfileProgress";
import { useApplicationMonthlyRate } from "../../analytics/hooks/useApplicationMonthlyRate";
import { useApplicationGoal } from "../../analytics/hooks/useApplicationGoal";
import { ContextualActionCardItem } from "./ContextualActionCardItem";

export const OverviewQuickItems = () => {
  const { user } = useAuthStore();
  const { data: userStats, isLoading, error } = useUserStats();
  const {
    data: profileProgress,
    isLoading: isProfileLoading,
    error: profileError,
  } = useProfileProgress();
  const {
    data: monthlyRateData,
    isLoading: isMonthlyLoading,
    error: monthlyError,
  } = useApplicationMonthlyRate(user?.id!);
  const {
    data: goalData,
    isLoading: isGoalLoading,
    error: goalError,
  } = useApplicationGoal(user?.id!);

  const anyLoading =
    isLoading || isProfileLoading || isMonthlyLoading || isGoalLoading;
  const anyError = error || profileError || monthlyError || goalError;

  const getContextualActions = () => {
    if (!userStats) return [];

    const stats = userStats;
    const weeklyApplications = monthlyRateData?.data?.thisMonth || 0;
    const monthlyGoal = goalData?.data?.goal || 0;

    // Fixed 4 actions
    const actions = [
      // 1. Create CV Action
      {
        title: stats.cvCreated === 0 ? "Create Your First CV" : "Create New CV",
        description:
          stats.cvCreated === 0
            ? "Get started with our guided CV builder"
            : "Let's create another tailored CV for your next job",
        icon: IconPlus,
        route: "/dashboard/cv/library/new",
        badge: stats.cvCreated > 0 ? `${stats.cvCreated} CVs` : undefined,
      },

      // 2. Job Tracker Action
      {
        title: "Job Tracker",
        description:
          (stats.totalJobApplications || 0) < 5
            ? "Start applying to jobs with your CV"
            : "Manage your job applications",
        icon: IconBriefcase,
        route: "/dashboard/tracker",
        badge: stats.totalJobApplications
          ? `${stats.totalJobApplications} apps`
          : undefined,
      },

      // 3. Complete Profile Action
      {
        title: "Complete Profile",
        description: profileProgress
          ? `${profileProgress.emptyFieldNames.length} fields remaining to complete`
          : "Update your personal information",
        icon: IconUser,
        route: "/dashboard/profile",
        badge: profileProgress
          ? ` ${profileProgress.progressPercentage}%`
          : undefined,
      },

      // 4. Monthly Goal
      {
        title: "Reach Monthly Goal",
        description: `${monthlyGoal - weeklyApplications} more applications to reach your goal`,
        icon: IconTarget,
        route: "/dashboard/tracker",
        badge: `${weeklyApplications}/${monthlyGoal}`,
      },
    ];

    return actions;
  };

  if (anyLoading) {
    return (
      <Card padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Quick Actions
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} height={80} radius="sm" />
          ))}
        </SimpleGrid>
      </Card>
    );
  }

  if (anyError) {
    return (
      <Card padding="lg" radius="md" withBorder>
        <Title order={4} mb="md">
          Quick Actions
        </Title>
        <Alert icon={<IconInfoCircle size={16} />} color="red" variant="light">
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Unable to load personalized actions
            </Text>
            <Text size="xs" c="dimmed">
              Using default quick actions. Try refreshing the page.
            </Text>
          </Stack>
        </Alert>
      </Card>
    );
  }

  const contextualActions = getContextualActions();

  return (
    <Card padding="lg" radius="md" withBorder>
      <Title order={4} mb="md">
        Quick Actions
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
        {contextualActions.map((action) => (
          <ContextualActionCardItem key={action.title} item={action} />
        ))}
      </SimpleGrid>
    </Card>
  );
};
