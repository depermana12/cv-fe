import { Container, Title, Text, Anchor, Paper } from "@mantine/core";
import SignInForm from "../components/SignInForm";
import { Link } from "@tanstack/react-router";

export const SignInPage = () => {
  return (
    <Container size={420} my={40}>
      <Title ta="center" fw="bold">
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt="md">
        Do not have an account yet?{" "}
        <Anchor variant="gradient" component={Link} to="/auth/signup">
          Create account
        </Anchor>
      </Text>
      <Paper withBorder shadow="sm" p="xl" mt={30} radius="md">
        <SignInForm />
      </Paper>
    </Container>
  );
};
