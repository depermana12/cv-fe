import { Container, Title, Text, Anchor, Paper, Stack } from "@mantine/core";
import SignInForm from "../components/SignInForm";
import { Link } from "@tanstack/react-router";

export const SignInPage = () => {
  return (
    <Container size="sm">
      <Stack gap={0}>
        <Title order={2} ta="center" fw="bold">
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center">
          Do not have an account yet?{" "}
          <Anchor variant="gradient" component={Link} to="/auth/signup">
            Create account
          </Anchor>
        </Text>
      </Stack>
      <Paper withBorder shadow="sm" p="xl" mt={30} radius="md" miw={400}>
        <SignInForm />
      </Paper>
    </Container>
  );
};
