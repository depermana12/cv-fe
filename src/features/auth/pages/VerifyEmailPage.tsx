import { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import {
  Container,
  Card,
  Stack,
  Title,
  Text,
  Alert,
  Loader,
  Center,
  ThemeIcon,
  Flex,
} from "@mantine/core";
import { IconCheck, IconX, IconMail } from "@tabler/icons-react";
import { useVerifyEmail } from "@features/user/hooks/useVerifyEmail";

type VerificationStatus = "loading" | "success" | "error" | "expired";
// TODO 1: reflect theme color
// TODO 2: handle error token invalid
const IconCircle = ({
  icon,
  color,
}: {
  icon: React.ReactNode;
  color: string;
}) => (
  <ThemeIcon
    variant="light"
    size={80}
    radius="xl"
    color={color}
    style={{ marginBottom: "1rem" }}
  >
    {icon}
  </ThemeIcon>
);

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
              <Loader size="xl" color="blue" />
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
          <Stack align="center">
            <IconCircle icon={<IconCheck size={40} />} color="green" />
            <Title order={2} c="green">
              Email Verified Successfully!
            </Title>
            <Text c="dimmed">
              Your email has been verified. You now have full access to all
              features.
            </Text>
          </Stack>
        );

      case "expired":
        return (
          <Stack align="center">
            <IconCircle icon={<IconMail size={40} />} color="orange" />

            <Title order={2} c="orange">
              Verification Link Expired
            </Title>
            <Text c="dimmed">
              The verification link has expired. Please request a new
              verification email.
            </Text>
            <Alert icon={<IconMail size={16} />} color="orange" mt="md">
              You can request a new verification email from your profile
              settings after signing in.
            </Alert>
          </Stack>
        );

      case "error":
      default:
        return (
          <Stack align="center">
            <IconCircle icon={<IconX size={40} />} color="red" />

            <Title order={2} c="red">
              Verification Failed
            </Title>
            <Text c="dimmed">
              {errorMessage ||
                "Unable to verify your email. The link may be invalid or expired."}
            </Text>
            <Alert icon={<IconMail size={16} />} color="red" mt="md">
              If you continue to have issues, please contact support or request
              a new verification email.
            </Alert>
          </Stack>
        );
    }
  };

  return (
    <Flex justify="center" align="center" h="100vh" bg="gray.0">
      <Container size="sm">
        <Card shadow="sm" padding="xl" radius="md" withBorder>
          <Stack gap="lg">{verificationStatus()}</Stack>
        </Card>
      </Container>
    </Flex>
  );
};
