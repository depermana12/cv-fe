import {
  ActionIcon,
  Avatar,
  Badge,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconFileCv, IconEye, IconEdit } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { Cv } from "../../../cv/types/types";

export const CvCardItem = ({ cv }: { cv: Cv }) => {
  const formattedCreatedAt = new Date(cv.createdAt).toLocaleDateString();
  const formattedUpdatedAt = cv.updatedAt
    ? new Date(cv.updatedAt).toLocaleDateString()
    : "n/a";

  return (
    <Card padding="md" radius="sm" withBorder>
      <Group justify="space-between">
        <Group gap="sm">
          <Stack justify="center" align="center">
            <IconFileCv size={32} stroke={1.2} />
          </Stack>

          <Stack gap={2}>
            <Group>
              <Title order={4} fw={500} size="md" lineClamp={1}>
                {cv.title || `CV #${cv.id}`}
              </Title>

              <Badge variant="default" size="xs">
                {cv.isPublic ? "Public" : "Private"}
              </Badge>
            </Group>

            <Group>
              <Text size="xs" c="dimmed">
                Created: {formattedCreatedAt}
              </Text>
              <Divider size="sm" orientation="vertical" />
              <Text size="xs" c="dimmed">
                Updated: {formattedUpdatedAt}
              </Text>
            </Group>
          </Stack>
        </Group>
        <Stack justify="center" align="center">
          <Group gap="xs">
            <ActionIcon
              variant="subtle"
              size="md"
              aria-label="View CV"
              component={Link}
              to={`/dashboard/cv/${cv.id}`}
            >
              <IconEye size={22} stroke={1.5} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              size="md"
              aria-label="Edit CV"
              component={Link}
              to={`/dashboard/cv/${cv.id}/edit`}
            >
              <IconEdit size={22} stroke={1.5} />
            </ActionIcon>
          </Group>
        </Stack>
      </Group>
    </Card>
  );
};
