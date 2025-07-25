import { Stack, Group, Text, Paper, Badge, Button } from "@mantine/core";
import { useUser } from "../hooks/useUser";
import { IconCrown, IconCalendar } from "@tabler/icons-react";

export const UserSubscriptionInfo = () => {
  const { data: user } = useUser();

  if (!user) return null;

  const getSubscriptionColor = (type?: string) => {
    switch (type) {
      case "pro":
        return "yellow";
      case "trial":
        return "blue";
      case "free":
      default:
        return "gray";
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "active":
        return "green";
      case "expired":
        return "red";
      case "cancelled":
        return "orange";
      case "pending":
        return "blue";
      default:
        return "gray";
    }
  };

  const formatDate = (date?: string | Date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
  };

  return (
    <Paper withBorder p="md">
      <Stack gap="md">
        <Group align="center" gap="xs">
          <IconCrown size={20} />
          <Text size="lg" fw={500}>
            Subscription Information
          </Text>
        </Group>

        <Group justify="space-between">
          <Text size="sm" fw={500}>
            Subscription Type
          </Text>
          <Badge
            color={getSubscriptionColor(user.subscriptionType)}
            variant="light"
            leftSection={
              user.subscriptionType === "pro" ? (
                <IconCrown size={12} />
              ) : undefined
            }
          >
            {user.subscriptionType?.toUpperCase() || "FREE"}
          </Badge>
        </Group>

        {user.subscriptionStatus && (
          <Group justify="space-between">
            <Text size="sm" fw={500}>
              Status
            </Text>
            <Badge
              color={getStatusColor(user.subscriptionStatus)}
              variant="light"
            >
              {user.subscriptionStatus.toUpperCase()}
            </Badge>
          </Group>
        )}

        {user.subscriptionExpiresAt && (
          <Group justify="space-between">
            <Text size="sm" fw={500}>
              Expires At
            </Text>
            <Group gap="xs">
              <IconCalendar size={16} />
              <Text size="sm">{formatDate(user.subscriptionExpiresAt)}</Text>
            </Group>
          </Group>
        )}

        {user.subscriptionType === "free" && (
          <Button
            variant="gradient"
            gradient={{ from: "yellow", to: "orange" }}
            leftSection={<IconCrown size={16} />}
            fullWidth
            mt="sm"
          >
            Upgrade to Pro
          </Button>
        )}
      </Stack>
    </Paper>
  );
};
