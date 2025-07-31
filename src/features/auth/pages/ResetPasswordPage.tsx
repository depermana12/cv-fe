import { Container, Paper, Title, Text } from "@mantine/core";
import { ResetPasswordForm } from "../components/ResetPasswordForm";

type ResetPasswordProps = {
  token: string;
};

export const ResetPasswordPage = ({ token }: ResetPasswordProps) => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" fw="bold">
        Reset Password
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt="md">
        Enter your new password below
      </Text>
      <Paper withBorder shadow="sm" p="xl" mt={30} radius="md">
        <ResetPasswordForm token={token} />
      </Paper>
    </Container>
  );
};
