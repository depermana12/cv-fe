import {
  Card,
  Stack,
  Group,
  Title,
  Badge,
  Menu,
  ActionIcon,
  Text,
  Divider,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconPencil,
  IconLock,
  IconWorld,
  IconTrash,
} from "@tabler/icons-react";
import { Cv } from "@features/dashboard/cv/types/types";

export const CvGridCard = ({
  cv,
  onSelect,
  onDelete,
  onQuickEdit,
  onToggleVisibility,
}: {
  cv: Cv;
  onSelect: (cv: Cv) => void;
  onDelete?: () => void;
  onQuickEdit?: () => void;
  onToggleVisibility?: () => void;
}) => {
  return (
    <>
      <Card radius="md" withBorder shadow="sm">
        <Stack>
          <Group justify="space-between" wrap="nowrap">
            <Group gap="sm">
              <Title
                order={3}
                size="h4"
                lineClamp={2}
                onClick={() => onSelect(cv)}
                style={{ cursor: "pointer" }}
              >
                {cv.title}
              </Title>
              <Badge variant="default" size="xs">
                {cv.isPublic ? "Public" : "Private"}
              </Badge>
            </Group>
            <Menu position="bottom-end" withinPortal>
              <Menu.Target>
                <ActionIcon
                  variant="transparent"
                  aria-label="cv options setting"
                >
                  <IconDots size={16} color="gray" />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  leftSection={<IconEdit size={14} />}
                  onClick={() => onSelect(cv)}
                >
                  Full Edit
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconPencil size={14} />}
                  onClick={onQuickEdit}
                >
                  Quick Edit
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
                  onClick={onToggleVisibility}
                >
                  Make {cv.isPublic ? "Private" : "Public"}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  color="red"
                  leftSection={<IconTrash size={14} />}
                  onClick={onDelete}
                >
                  Delete
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <Text size="sm" lineClamp={2}>
            {cv.description || "No description"}
          </Text>
          <Group>
            <Text size="xs" c="dimmed">
              Created: {new Date(cv.createdAt).toLocaleDateString()}
            </Text>
            <Divider orientation="vertical" size="sm" />
            <Text size="xs" c="dimmed">
              Updated:{" "}
              {cv.updatedAt
                ? new Date(cv.updatedAt).toLocaleDateString()
                : "N/A"}
            </Text>
          </Group>
        </Stack>
      </Card>
    </>
  );
};
