import {
  Container,
  Stack,
  Title,
  Group,
  Button,
  Text,
  Flex,
} from "@mantine/core";

export const NotFoundRoute = () => {
  return (
    <Flex justify="center" align="center" h="100vh" bg="gray.0">
      <Container size="sm">
        <Stack align="center">
          <Title order={1} c="gray.5">
            404
          </Title>

          <Title order={2} size="h1">
            Something is not right...
          </Title>

          <Text c="dimmed" size="lg" ta="center" mt="xl" mb="xl">
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL.
          </Text>

          <Group justify="center">
            <Button variant="outline" size="md">
              Take me home, to the place I Belong
            </Button>
          </Group>
        </Stack>
      </Container>
    </Flex>
  );
};
