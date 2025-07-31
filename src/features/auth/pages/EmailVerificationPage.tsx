import {
  Container,
  Paper,
  Stack,
  Title,
  Text,
  Alert,
  Button,
} from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { useAuthStore } from "@app/store/authStore";
import { useSendEmailVerification } from "@/features/user/hooks";
import { useInterval, useTimeout } from "@mantine/hooks";
import { useEffect, useState } from "react";

export const EmailVerificationPage = () => {
  const { user } = useAuthStore();
  const { mutate: sendEmail, isPending: isSendingEmail } =
    useSendEmailVerification();
  const [emailSent, setEmailSent] = useState(false);
  const [retrySeconds, setRetrySeconds] = useState(0);
  const interval = useInterval(() => setRetrySeconds((s) => s - 1), 1000);
  const timeout = useTimeout(() => setEmailSent(false), 60000);

  const handleSendingEmail = () => {
    if (isSendingEmail || retrySeconds > 0) return;
    sendEmail(undefined, {
      onSuccess: () => {
        setEmailSent(true);
        setRetrySeconds(60);
        interval.start();
        timeout.start();
      },
    });
  };

  useEffect(() => {
    if (retrySeconds === 0) interval.stop();
  }, [retrySeconds, interval]);

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" withBorder>
        <Stack gap="lg" align="center">
          <IconMail size={64} />

          <Stack gap="sm" align="center">
            <Title order={2}>Verify Your Email</Title>
            <Text c="dimmed">
              We've sent a verification link to your email address
            </Text>
          </Stack>

          <Alert variant="light" color="blue" style={{ width: "100%" }}>
            <Stack gap="xs">
              <Text fw={500}>Email sent to:</Text>
              <Text size="sm" c="blue.7" fw={500}>
                {user?.email}
              </Text>
            </Stack>
          </Alert>

          <Stack gap="md">
            <Text size="sm" ta="center" c="dimmed">
              If you didn't receive the email or it expired, click the button
              below to resend it.
            </Text>
            <Button
              fullWidth
              variant="outline"
              color="blue"
              loading={isSendingEmail}
              onClick={handleSendingEmail}
              disabled={emailSent && retrySeconds > 0}
            >
              {emailSent
                ? `Resend Email (${retrySeconds}s)`
                : "Resend Verification Email"}
            </Button>
          </Stack>

          <Stack gap="md" style={{ width: "100%" }}>
            <Text size="sm" ta="center" c="dimmed">
              Please check your email and click the verification link to
              continue. You can close this page.
            </Text>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};
