import { Container, Title, Text, Button } from "@mantine/core";
import { Link } from "@tanstack/react-router";

const HomeBanner = () => {
  return (
    <Container size="lg" ta="center" maw={800} py="xl">
      <Title order={1} mb="md" fw={600}>
        Welcome to Your CV Builder
      </Title>
      <Text size="lg" mb="xl" c="dimmed">
        Create, customize, and share your professional resume with ease.
      </Text>
      <Button
        component={Link}
        to="/auth/signup"
        size="md"
        radius="xl"
        variant="filled"
      >
        Get Started
      </Button>
    </Container>
  );
};
export default HomeBanner;
