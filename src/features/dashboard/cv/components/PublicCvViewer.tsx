import { useState } from "react";
import {
  Card,
  Stack,
  Title,
  Text,
  Button,
  TextInput,
  Group,
  Alert,
  Skeleton,
} from "@mantine/core";
import {
  IconEye,
  IconDownload,
  IconUser,
  IconCalendar,
} from "@tabler/icons-react";
import { useCvByUsernameSlug } from "../hooks/useCvByUsernameSlug";

interface PublicCvViewerProps {
  username?: string;
  slug?: string;
}

export const PublicCvViewer = ({
  username: initialUsername,
  slug: initialSlug,
}: PublicCvViewerProps) => {
  const [username, setUsername] = useState(initialUsername || "");
  const [slug, setSlug] = useState(initialSlug || "");
  const [searchParams, setSearchParams] = useState({
    username: initialUsername || "",
    slug: initialSlug || "",
  });

  const {
    data: cv,
    isLoading,
    error,
  } = useCvByUsernameSlug(searchParams.username, searchParams.slug);

  const handleSearch = () => {
    if (username.trim() && slug.trim()) {
      setSearchParams({ username: username.trim(), slug: slug.trim() });
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Stack gap="lg">
      {/* Search Form */}
      <Card padding="lg" radius="md" withBorder>
        <Title order={3} mb="md">
          View Public CV
        </Title>
        <Group grow>
          <TextInput
            label="Username"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <TextInput
            label="CV Slug"
            placeholder="Enter CV slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </Group>
        <Button
          mt="md"
          onClick={handleSearch}
          disabled={!username.trim() || !slug.trim()}
        >
          View CV
        </Button>
      </Card>

      {/* Loading State */}
      {isLoading && searchParams.username && searchParams.slug && (
        <Card padding="lg" radius="md" withBorder>
          <Skeleton height={24} width={200} mb="md" />
          <Skeleton height={16} width={300} mb="lg" />
          <Group gap="lg" mb="md">
            <Skeleton height={16} width={120} />
            <Skeleton height={16} width={120} />
            <Skeleton height={16} width={120} />
          </Group>
          <Skeleton height={100} />
        </Card>
      )}

      {/* Error State */}
      {error && searchParams.username && searchParams.slug && (
        <Alert color="red" title="CV not found">
          Unable to find the CV for user "{searchParams.username}" with slug "
          {searchParams.slug}". Please check the username and slug and try
          again.
        </Alert>
      )}

      {/* CV Display */}
      {cv && !isLoading && !error && (
        <Card padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Group justify="space-between" align="flex-start">
              <div>
                <Title order={2}>{cv.title}</Title>
                <Text c="dimmed" size="sm">
                  by @{searchParams.username}
                </Text>
              </div>
              <Group gap="xs">
                <Group gap={4}>
                  <IconEye size={16} />
                  <Text size="sm">{cv.views.toLocaleString()}</Text>
                </Group>
                <Group gap={4}>
                  <IconDownload size={16} />
                  <Text size="sm">{cv.downloads.toLocaleString()}</Text>
                </Group>
              </Group>
            </Group>

            <Text>{cv.description}</Text>

            <Group gap="md">
              <Group gap={4}>
                <IconUser size={16} />
                <Text size="sm">Language: {cv.language.toUpperCase()}</Text>
              </Group>
              <Group gap={4}>
                <IconCalendar size={16} />
                <Text size="sm">
                  Updated: {new Date(cv.updatedAt).toLocaleDateString()}
                </Text>
              </Group>
            </Group>

            {cv.theme && (
              <Text size="sm" c="dimmed">
                Theme: {cv.theme}
              </Text>
            )}
          </Stack>
        </Card>
      )}
    </Stack>
  );
};
