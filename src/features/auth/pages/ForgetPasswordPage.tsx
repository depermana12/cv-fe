import { Container, Paper, Title, Text } from "@mantine/core";
import { ForgetPasswordForm } from "../components/ForgetPasswordForm";

export const ForgetPasswordPage = () => {
  return (
    <Container size={420} my={40}>
      <Title order={2} ta="center" fw="bold">
        Forget your password?
      </Title>
      <Text c="dimmed" size="sm" ta="center">
        Enter your email to get a reset link
      </Text>
      <Paper withBorder shadow="md" p="xl" mt="xl" radius="md" w="100%">
        <ForgetPasswordForm />
      </Paper>
    </Container>
  );
};
