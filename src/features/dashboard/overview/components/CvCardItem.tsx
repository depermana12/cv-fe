import {
  ActionIcon,
  Badge,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  Menu,
} from "@mantine/core";
import {
  IconFileCv,
  IconEye,
  IconEdit,
  IconDots,
  IconWorld,
  IconLock,
  IconPencil,
  IconList,
} from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Cv } from "@features/dashboard/cv/types/types";
import { useUpdateCv } from "@features/dashboard/cv/hooks/useUpdateCv";
import { CvQuickEditModal } from "@features/dashboard/cv/components/CvQuickEditModal";

export const CvCardItem = ({ cv }: { cv: Cv }) => {
  const formattedCreatedAt = new Date(cv.createdAt).toLocaleDateString();
  const formattedUpdatedAt = cv.updatedAt
    ? new Date(cv.updatedAt).toLocaleDateString()
    : "n/a";
  const updateCv = useUpdateCv();
  const [quickEditModalOpened, setQuickEditModalOpened] = useState(false);

  const handleToggleVisibility = () => {
    updateCv.mutate({
      id: cv.id,
      data: { isPublic: !cv.isPublic },
    });
  };

  return (
    <>
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

                <Badge
                  variant="light"
                  size="xs"
                  color={cv.isPublic ? "green" : "gray"}
                  leftSection={
                    cv.isPublic ? (
                      <IconWorld size={10} />
                    ) : (
                      <IconLock size={10} />
                    )
                  }
                >
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
              </ActionIcon>{" "}
              <ActionIcon
                variant="subtle"
                size="md"
                aria-label="Quick Edit"
                onClick={() => setQuickEditModalOpened(true)}
              >
                <IconPencil size={22} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                size="md"
                aria-label="Full Details"
                onClick={() => setFullEditModalOpened(true)}
              >
                <IconList size={22} stroke={1.5} />
              </ActionIcon>
              <Menu position="bottom-end" withinPortal>
                <Menu.Target>
                  <ActionIcon
                    variant="subtle"
                    size="md"
                    aria-label="More options"
                  >
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  {" "}
                  <Menu.Item
                    leftSection={<IconEdit size={14} />}
                    component={Link}
                    to={`/dashboard/cv/${cv.id}/edit`}
                  >
                    Full Edit (Builder)
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconList size={14} />}
                    onClick={() => setFullEditModalOpened(true)}
                  >
                    View All Details
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconPencil size={14} />}
                    onClick={() => setQuickEditModalOpened(true)}
                  >
                    Quick Edit
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconEye size={14} />}
                    component={Link}
                    to={`/dashboard/cv/${cv.id}`}
                  >
                    View CV
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={
                      cv.isPublic ? (
                        <IconLock size={14} />
                      ) : (
                        <IconWorld size={14} />
                      )
                    }
                    onClick={handleToggleVisibility}
                  >
                    Make {cv.isPublic ? "Private" : "Public"}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Stack>
        </Group>
      </Card>{" "}
      <CvQuickEditModal
        opened={quickEditModalOpened}
        onClose={() => setQuickEditModalOpened(false)}
        cvId={cv.id}
      />
    </>
  );
};
