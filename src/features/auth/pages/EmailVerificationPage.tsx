import { Container, Paper, Stack, Title, Text, Alert } from "@mantine/core";
import { IconMail } from "@tabler/icons-react";
import { useAuthStore } from "@app/store/authStore";

export const EmailVerificationPage = () => {
  const { user } = useAuthStore();

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
