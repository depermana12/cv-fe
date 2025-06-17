import { Alert, Button, Group } from "@mantine/core";
import { IconMail, IconMailCheck } from "@tabler/icons-react";
import { AuthApi } from "../../auth/services/authApi";
import { useEmailVerification } from "../hooks/useEmailverification";

const authApi = new AuthApi();

export const EmailVerificationAlert = () => {
  const { data: emailStatus } = useEmailVerification();

  const handleResendVerification = async () => {
    try {
      await authApi.sendEmailVerification();
      // TODO: email service
    } catch (error) {
      // TODO: email service
    }
  };

  if (emailStatus.verified) {
    return (
      <Alert icon={<IconMailCheck size={16} />} color="green" mb="md">
        Your email is verified!
      </Alert>
    );
  }

  return (
    <Alert icon={<IconMail size={16} />} color="yellow" mb="md">
      <Group justify="space-between">
        <div>Please verify your email address to access all features.</div>
        <Button size="xs" variant="outline" onClick={handleResendVerification}>
          Resend Email
        </Button>
      </Group>
    </Alert>
  );
};
