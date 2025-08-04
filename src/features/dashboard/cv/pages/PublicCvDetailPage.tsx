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
  Box,
} from "@mantine/core";
import {
  IconEye,
  IconDownload,
  IconUser,
  IconCalendar,
  IconAlertCircle,
  IconGlobe,
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
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* CV Header Information */}
        <Paper p="xl" withBorder radius="md">
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Group gap="xs" align="center">
                  <IconGlobe size={20} />
                  <Title order={1}>{cv.title}</Title>
                </Group>
                <Text c="dimmed" size="lg">
                  by @{username}
                </Text>
                {cv.description && <Text>{cv.description}</Text>}
              </Stack>

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
            </Group>

            <Divider />

            <Group gap="lg">
              <Group gap={4}>
                <IconUser size={16} />
                <Text size="sm">
                  Language: {(cv.language || "en").toUpperCase()}
                </Text>
              </Group>
              <Group gap={4}>
                <IconCalendar size={16} />
                <Text size="sm">
                  Updated: {new Date(cv.updatedAt).toLocaleDateString()}
                </Text>
              </Group>
              {cv.theme && (
                <Text size="sm" c="dimmed">
                  Theme: {cv.theme}
                </Text>
              )}
            </Group>
          </Stack>
        </Paper>

        {/* CV Preview */}
        <Box>
          <Title order={2} mb="md">
            CV Preview
          </Title>
          <PublicCvPreview cv={cv} />
        </Box>
      </Stack>
    </Container>
  );
};
