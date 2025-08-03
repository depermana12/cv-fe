import { Container, Paper, Title, Text, Stack } from "@mantine/core";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

type ResetPasswordProps = {
  token: string;
};

export const ResetPasswordPage = ({ token }: ResetPasswordProps) => {
  return (
    <Container size="sm">
      <Stack gap={0}>
        <Title order={2} ta="center" fw="bold">
          Reset Password
        </Title>
        <Text c="dimmed" size="sm" ta="center">
          Enter your new password below
        </Text>
      </Stack>
      <Paper withBorder shadow="sm" p="xl" mt={30} radius="md" miw={400}>
        <ResetPasswordForm token={token} />
      </Paper>
    </Container>
  );
};
