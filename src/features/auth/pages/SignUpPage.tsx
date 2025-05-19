import { Container, Paper, Title, Text } from "@mantine/core";
import SignUpForm from "../components/SignUpForm";

export const SignUpPage = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" fw="bold">
        Sign up for myResume!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt="md">
        Fill out the form and let's get started
      </Text>
      <Paper withBorder shadow="sm" p="xl" mt={30} radius="md">
        <SignUpForm />
      </Paper>
    </Container>
  );
};
