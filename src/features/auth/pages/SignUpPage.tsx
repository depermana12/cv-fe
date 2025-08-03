import { Container, Paper, Title, Text, Stack } from "@mantine/core";
import SignUpForm from "../components/SignUpForm";

export const SignUpPage = () => {
  return (
    <Container size="sm">
      <Stack gap={0}>
        <Title order={2} ta="center" fw="bold">
          Sign up for myResume!
        </Title>
        <Text c="dimmed" size="sm" ta="center">
          Fill out the form and let's get started
        </Text>
      </Stack>
      <Paper withBorder shadow="sm" p="xl" mt={30} radius="md" miw={400}>
        <SignUpForm />
      </Paper>
    </Container>
  );
};
