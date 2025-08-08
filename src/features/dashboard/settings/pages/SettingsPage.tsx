import { Stack, Title, Text, Card, Group, Switch, Grid } from "@mantine/core";
import { useState } from "react";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";
import { useUser } from "@/features/user/hooks";
import { useUpdatePreferences } from "@/features/user/hooks/useUpdatePreferences";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

export const SettingsPage = () => {
  const { data: user } = useUser();
  const { mutate: updatePreferences, isPending } = useUpdatePreferences();
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    user?.emailNotifications ?? false,
  );
  const [monthlyReports, setMonthlyReports] = useState<boolean>(
    user?.monthlyReports ?? false,
  );

  // Theme management
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const isDarkMode = computedColorScheme === "dark";

  const handleThemeToggle = (checked: boolean) => {
    setColorScheme(checked ? "dark" : "light");
  };

  const showNotification = () => {
    notifications.show({
      position: "top-right",
      withCloseButton: true,
      icon: <IconCheck />,
      autoClose: 5000,
      withBorder: true,
      title: "All good!",
      message: `Your preferences have been updated.`,
      color: "green",
    });
  };

  const handleEmailToggle = (checked: boolean) => {
    setEmailNotifications(checked);
    updatePreferences(
      { emailNotifications: checked },
      {
        onSuccess: () => showNotification(),
      },
    );
  };

  const handleMonthlyReportsToggle = (checked: boolean) => {
    setMonthlyReports(checked);
    updatePreferences(
      { monthlyReports: checked },
      {
        onSuccess: () => showNotification(),
      },
    );
  };

  return (
    <Stack gap="md">
      <Title order={2} size="h3">
        App Settings
      </Title>
      <Grid>
        <Grid.Col span={{ base: 12, sm: 10, md: 8, lg: 6, xl: 5 }}>
          {/* Appearance Settings */}
          <Card padding="lg" radius="md" withBorder>
            <Title order={4} mb="md">
              Appearance
            </Title>
            <Stack gap="md">
              <Group justify="space-between">
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    Dark Mode
                  </Text>
                  <Text size="xs" c="dimmed">
                    Toggle between light and dark themes
                  </Text>
                </Stack>
                <Switch
                  checked={isDarkMode}
                  onChange={(event) =>
                    handleThemeToggle(event.currentTarget.checked)
                  }
                  aria-label="Toggle dark mode"
                />
              </Group>
            </Stack>
          </Card>

          {/* Notifications */}
          <Card padding="lg" radius="md" withBorder mt="md">
            <Title order={4} mb="md">
              Notifications
            </Title>
            <Stack gap="md">
              <Group justify="space-between">
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    Email Notifications
                  </Text>
                  <Text size="xs" c="dimmed">
                    Receive updates via email
                  </Text>
                </Stack>
                <Switch
                  checked={emailNotifications}
                  onChange={(e) => handleEmailToggle(e.currentTarget.checked)}
                  disabled={isPending}
                />
              </Group>

              <Group justify="space-between">
                <Stack gap={0}>
                  <Text size="sm" fw={500}>
                    Monthly Report
                  </Text>
                  <Text size="xs" c="dimmed">
                    Get monthly summaries of your activity
                  </Text>
                </Stack>
                <Switch
                  checked={monthlyReports}
                  onChange={(e) =>
                    handleMonthlyReportsToggle(e.currentTarget.checked)
                  }
                  disabled={isPending}
                />
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>
    </Stack>
  );
};
