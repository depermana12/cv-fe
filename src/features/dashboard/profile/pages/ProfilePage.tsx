import {
  Stack,
  Group,
  Title,
  Text,
  Grid,
  Tabs,
  Skeleton,
  Card,
  Badge,
  Button,
  Progress,
  Box,
  Anchor,
  Modal,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "@features/user/hooks/useUser";
import { useUserStats } from "@features/user/hooks/useUserStats";
import { useProfileProgress } from "@features/user/hooks/useProfileProgress";
import { useCvsPaginated } from "@features/dashboard/cv/hooks/useCvs";
import { ProfileCard } from "../components/ProfileCard";
import { ProfileForm } from "../components/ProfileForm";
import { AccountDelete } from "../components/AccountDelete";
import { AccountInformation } from "../components/AccountInformation";

export const ProfilePage = () => {
  const { data: user, isLoading: userLoading, error: userError } = useUser();
  const { data: userStats, isLoading: statsLoading } = useUserStats();
  const { data: profileProgress, isLoading: progressLoading } =
    useProfileProgress();
  const { data: publicCvs, isLoading: publicCvsLoading } = useCvsPaginated({
    isPublic: true,
    limit: 10,
    offset: 0,
  });

  // Modal states
  const [
    profileModalOpened,
    { open: openProfileModal, close: closeProfileModal },
  ] = useDisclosure(false);

  const isLoading = userLoading || statsLoading || progressLoading;

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
            <Stack gap="md">
              <Skeleton height={400} radius="md" />
              <Skeleton height={160} radius="md" />
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="md">
              <Skeleton height={200} radius="md" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }

  if (userError) {
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
    <>
      <Tabs defaultValue="profile" variant="outline">
        <Tabs.List mb="lg">
          <Tabs.Tab value="profile">Profile</Tabs.Tab>
          <Tabs.Tab value="account">Account</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <Grid>
            {/* Profile Header Card */}
            <Grid.Col span={4}>
              <ProfileCard
                user={user}
                userStats={
                  userStats
                    ? {
                        cvCreated: userStats.cvCreated || 0,
                        totalJobApplications:
                          userStats.totalJobApplications || 0,
                        accountAge: userStats.accountAge || 0,
                      }
                    : undefined
                }
                onEditProfile={openProfileModal}
              />
            </Grid.Col>{" "}
            {/* Public CVs/Activity */}
            <Grid.Col span={8}>
              <Card withBorder radius="md" p="lg">
                <Group justify="space-between" mb="md">
                  <Title order={4}>Public CVs</Title>
                  <Text size="sm" c="dimmed">
                    Visible to everyone
                  </Text>
                </Group>

                {publicCvsLoading ? (
                  <Stack gap="md">
                    <Skeleton height={80} radius="md" />
                    <Skeleton height={80} radius="md" />
                  </Stack>
                ) : publicCvs?.data && publicCvs.data.length > 0 ? (
                  <Stack gap="md">
                    {publicCvs.data.map((cv) => (
                      <Card key={cv.id} withBorder radius="sm" p="md">
                        <Box>
                          <Anchor
                            href={`/${user.username}/${cv.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            fw={500}
                            mb={4}
                            c="dark"
                            underline="hover"
                          >
                            {cv.title || "Untitled CV"}
                          </Anchor>
                          <Text size="sm" c="dimmed" mb="xs">
                            {cv.description || "No description available"}
                          </Text>
                          <Group gap="xs">
                            <Badge size="xs" variant="outline">
                              Public
                            </Badge>
                            <Badge size="xs" variant="outline" color="gray">
                              {cv.views} views
                            </Badge>
                          </Group>
                        </Box>
                      </Card>
                    ))}

                    {publicCvs.total > publicCvs.data.length && (
                      <Button variant="light" fullWidth mt="md">
                        View All Public CVs ({publicCvs.total})
                      </Button>
                    )}
                  </Stack>
                ) : (
                  <Stack gap="md" align="center" py="xl">
                    <Text size="sm" c="dimmed" ta="center">
                      No public CVs found
                    </Text>
                    <Text size="sm" c="dimmed" ta="center">
                      Make your CVs public to share your professional journey
                      with others
                    </Text>
                  </Stack>
                )}
              </Card>
            </Grid.Col>
            {/* Second Row */}
            {/* Left Column - Progress & About */}
            <Grid.Col span={4}>
              <Stack gap="md">
                <Card withBorder radius="md" p="lg">
                  <Title order={4} mb="md">
                    About Me
                  </Title>
                  <Text size="sm" style={{ whiteSpace: "pre-wrap" }}>
                    {user.about ||
                      "No information provided. Update your profile to share more about yourself."}
                  </Text>
                </Card>

                {/* Profile Progress Card */}
                <Card withBorder radius="md" p="lg">
                  <Group justify="space-between" mb="md">
                    <Title order={4}>Profile Completion</Title>
                    <Badge
                      variant="light"
                      color={
                        profileProgress?.progressPercentage === 100
                          ? "green"
                          : "blue"
                      }
                      size="sm"
                    >
                      {Math.round(profileProgress?.progressPercentage || 0)}%
                    </Badge>
                  </Group>

                  <Progress
                    value={profileProgress?.progressPercentage || 0}
                    size="lg"
                    radius="xl"
                    mb="md"
                  />

                  <Text size="sm" c="dimmed">
                    {profileProgress?.filledFields || 0} of{" "}
                    {profileProgress?.totalFields || 0} fields completed
                  </Text>
                </Card>

                {/* About Me Card */}
              </Stack>
            </Grid.Col>
            {/* Empty columns for spacing */}
            <Grid.Col span={8}></Grid.Col>
          </Grid>
        </Tabs.Panel>

        <Tabs.Panel value="account">
          <Grid>
            <Grid.Col span={{ base: 12, sm: 10, md: 8, lg: 6, xl: 5 }}>
              <Title order={4}>Account</Title>
              <Stack gap="lg">
                <AccountInformation user={user} />
                <AccountDelete user={user} />
              </Stack>
            </Grid.Col>
          </Grid>
        </Tabs.Panel>
      </Tabs>

      {/* Profile Edit Modal */}
      <Modal
        opened={profileModalOpened}
        onClose={closeProfileModal}
        title="Edit Profile"
        centered
        size="lg"
      >
        {user && <ProfileForm user={user} onClose={closeProfileModal} />}
      </Modal>
    </>
  );
};
