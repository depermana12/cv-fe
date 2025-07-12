import { Container, Alert, Button, Text } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";

export const JobsTrackerError = ({
  error,
  onRetry,
}: {
  error: unknown;
  onRetry: () => void;
}) => {
  return (
    <Container size="xl" py="xl">
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Error loading job applications"
        color="red"
        variant="light"
      >
        <Text size="sm">
          Failed to load your job applications. Please try again.
        </Text>
        <Text size="xs" c="dimmed" mt="xs">
          {error instanceof Error ? error.message : String(error)}
        </Text>
        <Button size="xs" variant="light" color="red" mt="sm" onClick={onRetry}>
          Retry
        </Button>
      </Alert>
    </Container>
  );
};
