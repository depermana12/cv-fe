import { Stack, Tabs, Container, Title } from "@mantine/core";
import {
  IconUser,
  IconKey,
  IconSettings,
  IconCrown,
} from "@tabler/icons-react";
import {
  EditUserProfile,
  EditUserCredentials,
  EditUserPreferences,
  UserSubscriptionInfo,
} from "../components";

export const UserManagementTabs = () => {
  return (
    <Container size="md">
      <Stack gap="xl">
        <Title order={2}>Account Management</Title>

        <Tabs defaultValue="profile" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="credentials" leftSection={<IconKey size={16} />}>
              Credentials
            </Tabs.Tab>
            <Tabs.Tab
              value="preferences"
              leftSection={<IconSettings size={16} />}
            >
              Preferences
            </Tabs.Tab>
            <Tabs.Tab
              value="subscription"
              leftSection={<IconCrown size={16} />}
            >
              Subscription
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="xl">
            <EditUserProfile />
          </Tabs.Panel>

          <Tabs.Panel value="credentials" pt="xl">
            <EditUserCredentials />
          </Tabs.Panel>

          <Tabs.Panel value="preferences" pt="xl">
            <EditUserPreferences />
          </Tabs.Panel>

          <Tabs.Panel value="subscription" pt="xl">
            <UserSubscriptionInfo />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
};
