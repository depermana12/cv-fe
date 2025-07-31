import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import {
  Container,
  Paper,
  Stack,
  Title,
  Text,
  Alert,
  Loader,
  Center,
} from "@mantine/core";
import { IconCheck, IconX, IconMail } from "@tabler/icons-react";
import { useVerifyEmail } from "@features/user/hooks/useVerifyEmail";

type VerificationStatus = "loading" | "success" | "error" | "expired";

export const VerifyEmailPage = () => {
  const params = useParams({ strict: false });
  const [status, setStatus] = useState<VerificationStatus>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate: verifyEmail } = useVerifyEmail();
  const token = params.token;

  useEffect(() => {
    const handleVerification = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("Invalid verification link");
        return;
      }

      verifyEmail(token, {
        onSuccess: () => setStatus("success"),
        onError: (error: any) => {
          const msg =
            error?.response?.data?.message ||
            "Verification failed. The link may be invalid or expired.";
          setErrorMessage(msg);
          setStatus(
            msg.toLowerCase().includes("expired") ? "expired" : "error",
          );
        },
      });
    };

    handleVerification();
  }, [token, verifyEmail]);

  const verificationStatus = () => {
    switch (status) {
      case "loading":
        return (
          <>
            <Center mb="xl">
              <Loader size={64} color="blue" />
            </Center>
            <Title order={2} ta="center" mb="sm">
              Verifying Your Email
            </Title>
            <Text ta="center" c="dimmed">
              Please wait while we verify your email address...
            </Text>
          </>
        );

      case "success":
        return (
          <Stack gap="md" align="center">
            <IconCheck size={64} color="green" />
            <Title order={2} c="green">
              Email Verified Successfully!
            </Title>
            <Text c="dimmed" ta="center">
              Your email has been verified. You now have full access to all
              features.
            </Text>
          </Stack>
        );

      case "expired":
        return (
          <Stack gap="md" align="center">
            <IconMail size={64} color="orange" />
            <Title order={2} c="orange">
              Verification Link Expired
            </Title>
            <Text c="dimmed" ta="center">
              The verification link has expired. Please request a new
              verification email.
            </Text>
            <Alert
              icon={<IconMail size={16} />}
              color="orange"
              mt="md"
              style={{ width: "100%" }}
            >
              You can request a new verification email from your profile
              settings after signing in.
            </Alert>
          </Stack>
        );

      case "error":
      default:
        return (
          <Stack gap="md" align="center">
            <IconX size={64} color="red" />
            <Title order={2} c="red">
              Verification Failed
            </Title>
            <Text c="dimmed" ta="center">
              {errorMessage ||
                "Unable to verify your email. The link may be invalid or expired."}
            </Text>
            <Alert
              icon={<IconMail size={16} />}
              color="red"
              mt="md"
              style={{ width: "100%" }}
            >
              If you continue to have issues, please contact support or request
              a new verification email.
            </Alert>
          </Stack>
        );
    }
  };

  return (
    <Container size="sm" mt="xl">
      <Paper p="xl" withBorder>
        <Stack gap="lg" align="center">
          <IconMail size={64} />
          <Stack gap="sm" align="center">
            <Title order={2}>Verify Your Email</Title>
            <Text c="dimmed">
              Please check your email and click the verification link to
              continue.
            </Text>
          </Stack>
          <Stack gap="md" style={{ width: "100%" }}>
            {verificationStatus()}
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};
