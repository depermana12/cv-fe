import { Container, Paper, Title, Text, Stack } from "@mantine/core";
import { ForgetPasswordForm } from "../components/ForgetPasswordForm";

export const ForgetPasswordPage = () => {
  return (
    <Container size="sm">
      <Stack gap={0}>
        <Title order={2} ta="center" fw="bold">
          Forget your password?
        </Title>
        <Text c="dimmed" size="sm" ta="center">
          Enter your email to get a reset link
        </Text>
      </Stack>
      <Paper withBorder shadow="md" p="xl" mt={30} radius="md" miw={400}>
        <ForgetPasswordForm />
      </Paper>
    </Container>
  );
};
