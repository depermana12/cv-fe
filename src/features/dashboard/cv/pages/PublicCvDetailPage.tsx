import { useParams } from "@tanstack/react-router";
import {
  Container,
  Stack,
  Title,
  Text,
  Paper,
  Group,
  Badge,
  Alert,
  Loader,
  Center,
  Divider,
  Grid,
} from "@mantine/core";
import {
  IconEye,
  IconDownload,
  IconUser,
  IconCalendar,
  IconAlertCircle,
  IconLanguage,
} from "@tabler/icons-react";
import { useCvByUsernameSlug } from "../hooks/useCvByUsernameSlug";
import { PublicCvPreview } from "../components/PublicCvPreview";

export const PublicCvDetailPage = () => {
  const { username, slug } = useParams({ from: "/$username/$slug" });

  const { data: cv, isLoading, error } = useCvByUsernameSlug(username, slug);

  if (isLoading) {
    return (
      <Container size="xl" py="xl">
        <Center>
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text c="dimmed">Loading CV...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container size="md" py="xl">
        <Alert
          color="red"
          title="CV not found"
          icon={<IconAlertCircle size={16} />}
        >
          Unable to find the CV for user "@{username}" with slug "{slug}".
          Please check the URL and try again.
        </Alert>
      </Container>
    );
  }

  if (!cv) {
    return (
      <Container size="md" py="xl">
        <Alert
          color="yellow"
          title="No CV found"
          icon={<IconAlertCircle size={16} />}
        >
          No CV found for the provided username and slug.
        </Alert>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Title order={2} mb="lg">
        {cv.title}
      </Title>

      <Grid>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <PublicCvPreview cv={cv} />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Paper withBorder p="lg" radius="md">
            <Stack gap="xs">
              <Group gap={4}>
                <IconUser size={16} />
                <Text size="sm">
                  Author: {(username || "Unknown").toUpperCase()}
                </Text>
              </Group>
              <Group gap={4}>
                <IconLanguage size={16} />
                <Text size="sm">
                  Language: {(cv.language || "en").toUpperCase()}
                </Text>
              </Group>
              <Group gap={4}>
                <IconCalendar size={16} />
                <Text size="sm">
                  Created:{" "}
                  {new Date(cv.createdAt).toLocaleDateString("en-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </Group>
              <Group gap={4}>
                <IconCalendar size={16} />
                <Text size="sm">
                  Updated:{" "}
                  {new Date(cv.updatedAt).toLocaleDateString("en-ID", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </Text>
              </Group>
              <Divider />
              <Text size="sm">
                {/* This should be for meta description, but okay for */}
                {cv.description && <Text>{cv.description}</Text>}
              </Text>

              <Group gap="md">
                <Badge
                  color="green"
                  variant="light"
                  leftSection={<IconEye size={14} />}
                >
                  {(cv.views || 0).toLocaleString()} views
                </Badge>
                <Badge
                  color="blue"
                  variant="light"
                  leftSection={<IconDownload size={14} />}
                >
                  {(cv.downloads || 0).toLocaleString()} downloads
                </Badge>
              </Group>
            </Stack>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
