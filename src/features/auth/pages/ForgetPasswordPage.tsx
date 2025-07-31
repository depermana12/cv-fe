import { Container, Paper, Title, Text } from "@mantine/core";
import { ForgetPasswordForm } from "../components/ForgetPasswordForm";

export const ForgetPasswordPage = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" fw="bold">
        Forget Password
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt="md">
        Enter your email address and we'll send you a password reset link
      </Text>
      <Paper withBorder shadow="sm" p="xl" mt={30} radius="md">
        <ForgetPasswordForm />
      </Paper>
    </Container>
  );
};
