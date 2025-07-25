import {
  Card,
  Group,
  Text,
  Badge,
  ActionIcon,
  Menu,
  Box,
  Flex,
} from "@mantine/core";
import {
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
  IconDownload,
  IconCalendar,
  IconWorld,
  IconLock,
} from "@tabler/icons-react";
import { Cv } from "@features/dashboard/cv/types/types";

interface CvListItemProps {
  cv: Cv;
  onSelect: (cv: Cv) => void;
  onEdit?: (cv: Cv) => void;
  onDelete?: (cv: Cv) => void;
}

export const CvListItem = ({
  cv,
  onSelect,
  onEdit,
  onDelete,
}: CvListItemProps) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <Card
      padding="md"
      radius="md"
      withBorder
      style={{
        cursor: "pointer",
        transition: "all 0.2s ease",
        "&:hover": {
          borderColor: "var(--mantine-color-blue-4)",
          transform: "translateY(-1px)",
          boxShadow: "var(--mantine-shadow-sm)",
        },
      }}
      onClick={() => onSelect(cv)}
    >
      <Flex justify="space-between" align="center" gap="md">
        {/* Left section - Main info */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Group gap="sm" mb="xs">
            <Text fw={600} size="md" truncate style={{ flex: 1, minWidth: 0 }}>
              {cv.title}
            </Text>
            <Badge
              variant="light"
              color={cv.isPublic ? "green" : "gray"}
              size="sm"
            >
              {cv.isPublic ? (
                <Group gap={4}>
                  <IconWorld size={12} />
                  Public
                </Group>
              ) : (
                <Group gap={4}>
                  <IconLock size={12} />
                  Private
                </Group>
              )}
            </Badge>
          </Group>

          {cv.description && (
            <Text size="sm" c="dimmed" lineClamp={2} mb="xs">
              {cv.description}
            </Text>
          )}

          <Group gap="md" c="dimmed">
            <Group gap={4}>
              <IconCalendar size={14} />
              <Text size="xs">Updated {formatDate(cv.updatedAt)}</Text>
            </Group>

            <Group gap={4}>
              <IconEye size={14} />
              <Text size="xs">{cv.views.toLocaleString()} views</Text>
            </Group>

            <Group gap={4}>
              <IconDownload size={14} />
              <Text size="xs">{cv.downloads.toLocaleString()} downloads</Text>
            </Group>
          </Group>
        </Box>

        {/* Right section - Actions */}
        <Group gap="xs">
          <Badge variant="outline" size="sm">
            {cv.theme}
          </Badge>

          <Badge variant="outline" size="sm">
            {cv.language.toUpperCase()}
          </Badge>

          <Menu shadow="md" width={160}>
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                size="sm"
                onClick={(e) => e.stopPropagation()}
              >
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEdit size={14} />}
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(cv);
                }}
              >
                Edit
              </Menu.Item>
              <Menu.Item
                leftSection={<IconTrash size={14} />}
                color="red"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(cv);
                }}
              >
                Delete
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Flex>
    </Card>
  );
};
