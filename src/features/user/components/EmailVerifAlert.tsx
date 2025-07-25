import { Alert, Button, Group } from "@mantine/core";
import { IconMail, IconMailCheck } from "@tabler/icons-react";
import { useEmailVerification } from "../hooks/useEmailVerification";
import { useSendEmailVerification } from "../hooks/useSendEmailVerification";

export const EmailVerificationAlert = () => {
  const { data: emailStatus } = useEmailVerification();
  const { mutate: sendVerificationEmail, isPending: isSending } =
    useSendEmailVerification();

  const handleResendVerification = () => {
    sendVerificationEmail();
  };

  if (emailStatus?.verified) {
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
        <Button
          size="xs"
          variant="outline"
          onClick={handleResendVerification}
          loading={isSending}
        >
          {isSending ? "Sending..." : "Resend Email"}
        </Button>
      </Group>
    </Alert>
  );
};
