import { Stack, Group, Title, Text, Grid, Tabs, Skeleton } from "@mantine/core";
import { useUser } from "@features/user/hooks/useUser";
import { ProfilePicture } from "../components/ProfilePicture";
import { ProfileForm } from "../components/ProfileForm";
import { AccountInformation } from "../components/AccountInformation";
import { AccountSettings } from "../components/AccountSettings";

export const ProfilePage = () => {
  const { data: user, isLoading, error } = useUser();

  if (isLoading) {
    return (
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={0}>
            <Skeleton height={32} width={100} />
            <Skeleton height={16} width={300} mt={4} />
          </Stack>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Skeleton height={200} radius="md" />
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Skeleton height={300} radius="md" />
              <Skeleton height={150} radius="md" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack gap="lg">
        <Title order={2}>Error loading profile</Title>
        <Text c="red">
          Unable to load your profile information. Please try again.
        </Text>
      </Stack>
    );
  }

  if (!user) {
    return (
      <Stack gap="lg">
        <Title order={2}>Profile not found</Title>
        <Text c="dimmed">Unable to load your profile information.</Text>
      </Stack>
    );
  }

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
