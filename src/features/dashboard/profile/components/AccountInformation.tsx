import { useState, useEffect } from "react";
import {
  Stack,
  Group,
  Title,
  Text,
  Card,
  Badge,
  Divider,
  Anchor,
} from "@mantine/core";
import { useInterval, useTimeout } from "@mantine/hooks";
import { useSendEmailVerification } from "@features/user/hooks/useSendEmailVerification";
import { AccountInformationProps } from "../types/profile.type";

export const AccountInformation = ({ user }: AccountInformationProps) => {
  const { mutate: sendVerificationEmail, isPending: isSendingEmail } =
    useSendEmailVerification();

  const [emailSent, setEmailSent] = useState(false);
  const [retrySeconds, setRetrySeconds] = useState(0);
  const interval = useInterval(() => setRetrySeconds((s) => s - 1), 1000);
  const timeout = useTimeout(() => setEmailSent(false), 30000);

  const handleSendVerification = async () => {
    if (isSendingEmail || retrySeconds > 0) return;
    sendVerificationEmail(undefined, {
      onSuccess: () => {
        setEmailSent(true);
        setRetrySeconds(30);
        interval.start();
        timeout.start();
      },
    });
  };

  useEffect(() => {
    if (retrySeconds === 0) {
      interval.stop();
    }
  }, [retrySeconds, interval]);

  return (
    <Card padding="lg" radius="md" withBorder mt="lg">
      <Group gap="sm" mb="md">
        <Title order={4}>Account Information</Title>
      </Group>

      <Stack gap="md">
        <Group justify="space-between">
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              Username
            </Text>
            <Text size="sm" c="dimmed">
              @{user.username}
            </Text>
          </Stack>
        </Group>
        <Divider />
        <Group justify="space-between">
          <Stack gap={4}>
            <Group gap="xs">
              <Text size="sm" fw={500}>
                Email
              </Text>
              <Badge
                size="xs"
                variant="light"
                color={user.isEmailVerified ? "green" : "orange"}
              >
                {user.isEmailVerified ? "Verified" : "Unverified"}
              </Badge>
            </Group>
            <Text size="sm" c="dimmed">
              {user.email}
            </Text>
            {!user.isEmailVerified && (
              <Anchor
                size="xs"
                c={emailSent ? "blue" : "orange"}
                onClick={handleSendVerification}
                style={{
                  cursor:
                    isSendingEmail || retrySeconds > 0
                      ? "not-allowed"
                      : "pointer",
                  opacity: isSendingEmail || retrySeconds > 0 ? 0.6 : 1,
                }}
                fw={500}
              >
                {isSendingEmail
                  ? "Sending..."
                  : emailSent && retrySeconds > 0
                    ? `Sent! retry in ${retrySeconds}s`
                    : "Send verification email"}
              </Anchor>
            )}
          </Stack>
        </Group>
        <Divider />
        <Group justify="space-between">
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              Member since
            </Text>
            <Text size="sm" c="dimmed">
              {new Date(user.createdAt).toLocaleDateString("en-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};
