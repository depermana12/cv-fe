import { Stack, Group, Title, Text, Grid, Tabs } from "@mantine/core";
import { useUser } from "../../../user/hooks/useUser";
import { ProfilePicture } from "./ProfilePicture";
import { ProfileForm } from "./ProfileForm";
import { AccountInformation } from "./AccountInformation";
import { AccountSettings } from "./AccountSettings";

export const ProfileContent = () => {
  const { data: user } = useUser();

  return (
    <Tabs defaultValue="profile">
      <Tabs.List mb="lg">
        <Tabs.Tab value="profile">Profile</Tabs.Tab>
        <Tabs.Tab value="settings">Settings</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="profile">
        <Stack gap="lg">
          <Group justify="space-between">
            <Stack gap={0}>
              <Title order={2}>Profile</Title>
              <Text c="dimmed">
                Manage your personal information and account settings
              </Text>
            </Stack>
          </Group>

          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <ProfilePicture user={user} />
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 8 }}>
              <ProfileForm user={user} />
              <AccountInformation user={user} />
            </Grid.Col>
          </Grid>
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value="settings">
        <AccountSettings />
      </Tabs.Panel>
    </Tabs>
  );
};
