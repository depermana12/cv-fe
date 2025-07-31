import { useState } from "react";
import {
  Stack,
  Group,
  Title,
  Text,
  Card,
  Button,
  TextInput,
  PasswordInput,
  Alert,
  Badge,
  Divider,
  Modal,
  Skeleton,
  Grid,
} from "@mantine/core";
import { IconInfoCircle, IconAlertTriangle } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { useUser } from "@features/user/hooks/useUser";
import { useSendEmailVerification } from "@features/user/hooks/useSendEmailVerification";

export const AccountSettings = () => {
  const { data: user, isLoading, error } = useUser();
  const [emailModalOpened, { open: openEmailModal, close: closeEmailModal }] =
    useDisclosure(false);
  const [
    passwordModalOpened,
    { open: openPasswordModal, close: closePasswordModal },
  ] = useDisclosure(false);
  const [
    usernameModalOpened,
    { open: openUsernameModal, close: closeUsernameModal },
  ] = useDisclosure(false);

  // Form states
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const { mutate: sendVerificationEmail } = useSendEmailVerification();

  if (isLoading) {
    return (
      <Stack gap="lg">
        <Stack gap="xs">
          <Skeleton height={32} width={200} />
          <Skeleton height={16} width={350} />
        </Stack>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            {/* Security Overview Skeleton */}
            <Card padding="lg" radius="md" mb="md" withBorder>
              <Skeleton height={24} width={180} mb="md" />
              <Stack gap="md">
                <Group justify="space-between">
                  <Stack gap="xs">
                    <Skeleton height={16} width={120} />
                    <Skeleton height={12} width={200} />
                  </Stack>
                  <Skeleton height={32} width={100} />
                </Group>
                <Skeleton height={80} radius="sm" />
                <Skeleton height={1} />
                <Group justify="space-between">
                  <Stack gap="xs">
                    <Skeleton height={16} width={160} />
                    <Skeleton height={12} width={220} />
                  </Stack>
                  <Skeleton height={32} width={80} />
                </Group>
                <Skeleton height={60} radius="sm" />
              </Stack>
            </Card>

            {/* Login Credentials Skeleton */}
            <Card padding="lg" radius="md" mb="md" withBorder>
              <Skeleton height={24} width={180} mb="md" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <Group justify="space-between">
                    <Stack gap="xs">
                      <Skeleton height={16} width={140} />
                      <Skeleton height={12} width={200} />
                    </Stack>
                    <Skeleton height={32} width={120} />
                  </Group>
                  {i < 2 && <Skeleton height={1} my="md" />}
                </div>
              ))}
            </Card>

            {/* Delete Account Skeleton */}
            <Card padding="lg" radius="md" mb="md" withBorder>
              <Group gap="sm" mb="md">
                <Skeleton height={20} width={20} />
                <Skeleton height={24} width={140} />
              </Group>
              <Stack gap="md">
                <Skeleton height={16} width={300} />
                <Skeleton height={32} width={120} />
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </Stack>
    );
  }

  if (error || !user) {
    return (
      <Stack gap="lg">
        <Title order={2}>Error loading account settings</Title>
        <Text c="red">
          Unable to load your account settings. Please try again.
        </Text>
      </Stack>
    );
  }

  return (
    <Stack gap="lg">
      <Stack gap={0}>
        <Title order={2}>Account Settings</Title>
        <Text c="dimmed">
          Manage your account security and login credentials
        </Text>
      </Stack>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card padding="lg" radius="md" mb="md" withBorder>
            <Title order={4} mb="md">
              Security Overview
            </Title>

            <Stack gap="md">
              <Stack gap={1}>
                <Group justify="space-between">
                  <Group justify="flex-start">
                    <Text size="sm" fw={500}>
                      Email Verification
                    </Text>
                    <Badge variant="default" size="sm">
                      {user.isEmailVerified ? "Verified" : "Unverified"}
                    </Badge>
                  </Group>
                  {!user.isEmailVerified && (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => sendVerificationEmail()}
                    >
                      Send verification
                    </Button>
                  )}
                </Group>
                <Text size="xs" c="dimmed">
                  {user.isEmailVerified
                    ? "Your email is verified and secure"
                    : "Verify your email to improve account security"}
                </Text>
              </Stack>

              {!user.isEmailVerified && (
                <Alert
                  icon={<IconAlertTriangle size={16} />}
                  color="orange"
                  variant="light"
                  title="Verify email"
                >
                  Verify your email address to ensure account security. Click
                  "send verification" button to verify your email.
                </Alert>
              )}
              <Divider />

              <Stack gap={1}>
                <Group justify="space-between">
                  <Group justify="flex-start">
                    <Text size="sm" fw={500}>
                      Two-Factor Authentication
                    </Text>
                    <Badge variant="default" size="sm">
                      Disabled
                    </Badge>
                  </Group>
                  <Button variant="outline" size="xs">
                    Enable
                  </Button>
                </Group>
                <Text size="xs" c="dimmed">
                  Add an extra layer of security
                </Text>
              </Stack>
              <Alert
                icon={<IconAlertTriangle size={16} />}
                color="orange"
                variant="light"
                title="2fa"
              >
                Enable two-factor authentication (2FA) to protect your account
                from unauthorized access.
              </Alert>
            </Stack>
          </Card>
          {/*  */}
          <Card padding="lg" radius="md" mb="md" withBorder>
            <Title order={4} mb="md">
              Login Credentials
            </Title>

            <Stack gap="md">
              <Group justify="space-between">
                <Stack gap={1}>
                  <Text size="sm">Username</Text>
                  <Text size="sm" c="dimmed">
                    @{user.username}
                  </Text>
                </Stack>
                <Button variant="outline" size="xs" onClick={openUsernameModal}>
                  Change Username
                </Button>
              </Group>

              <Divider />

              <Group justify="space-between">
                <Stack gap={1}>
                  <Text size="sm">Email Address</Text>
                  <Text size="sm" c="dimmed">
                    {user.email}
                  </Text>
                </Stack>
                <Button variant="outline" size="xs" onClick={openEmailModal}>
                  Change Email
                </Button>
              </Group>

              <Divider />

              <Group justify="space-between">
                <Stack gap={1}>
                  <Text size="sm">Password</Text>
                  <Text size="sm" c="dimmed">
                    Last updated: Never
                  </Text>
                </Stack>
                <Button variant="outline" size="xs" onClick={openPasswordModal}>
                  Change Password
                </Button>
              </Group>
            </Stack>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Username Change Modal */}
      <Modal
        opened={usernameModalOpened}
        onClose={closeUsernameModal}
        title="Change Username"
        centered
      >
        <Stack gap="md">
          <TextInput
            label="New Username"
            placeholder="Enter new username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
          <Alert icon={<IconInfoCircle size={16} />} variant="light">
            Your username is used for your public profile URL and cannot be
            changed again for 30 days.
          </Alert>
          <Group justify="flex-end">
            <Button variant="light" onClick={closeUsernameModal}>
              Cancel
            </Button>
            <Button>Update Username</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Email Change Modal */}
      <Modal
        opened={emailModalOpened}
        onClose={closeEmailModal}
        title="Change Email Address"
        centered
      >
        <Stack gap="md">
          <TextInput
            label="New Email Address"
            placeholder="Enter new email"
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Alert icon={<IconInfoCircle size={16} />} variant="light">
            You'll need to verify your new email address before the change takes
            effect.
          </Alert>
          <Group justify="flex-end">
            <Button variant="light" onClick={closeEmailModal}>
              Cancel
            </Button>
            <Button>Update Email</Button>
          </Group>
        </Stack>
      </Modal>

      {/* Password Change Modal */}
      <Modal
        opened={passwordModalOpened}
        onClose={closePasswordModal}
        title="Change Password"
        centered
      >
        <Stack gap="md">
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Alert icon={<IconInfoCircle size={16} />} variant="light">
            Use at least 8 characters with a mix of letters, numbers, and
            symbols.
          </Alert>
          <Group justify="flex-end">
            <Button variant="light" onClick={closePasswordModal}>
              Cancel
            </Button>
            <Button>Update Password</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};
