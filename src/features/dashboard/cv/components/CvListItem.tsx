import {
  Group,
  Text,
  Badge,
  ActionIcon,
  Menu,
  Title,
  Paper,
  Stack,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { CvLibraryItemProps } from "@features/dashboard/cv/types/types";
import { formatDate } from "../utils/formatDate";

export const CvListItem = ({
  cv,
  onSelect,
  onEdit,
  onDelete,
  onToggleVisibility,
}: CvLibraryItemProps) => {
  return (
    <Paper p="md" radius="md" withBorder shadow="sm">
      <Group justify="space-between" align="center">
        {/* Left section - Main info */}
        <Stack gap="xs">
          <Group gap="sm">
            <Title
              order={3}
              size="h4"
              lineClamp={1}
              onClick={() => onSelect(cv)}
              style={{
                cursor: "pointer",
                wordBreak: "break-word",
              }}
            >
              {cv.title}
            </Title>
            <Badge variant="default" size="xs">
              {cv.isPublic ? "Public" : "Private"}
            </Badge>
          </Group>

          <Text size="sm" c="dimmed" lineClamp={1}>
            {cv.description || "No description available"}
          </Text>

          <Group gap="md" c="dimmed">
            <Text size="xs" c="dimmed">
              Created: {formatDate(cv.createdAt)}
            </Text>
            <Text size="xs" c="dimmed">
              Updated: {formatDate(cv.updatedAt)}
            </Text>
          </Group>
        </Stack>

        {/* Right section - Actions */}
        <Group gap="xs">
          <Badge variant="outline" size="sm">
            {cv.theme}
          </Badge>

          <Menu
            position="bottom-end"
            transitionProps={{ transition: "pop" }}
            shadow="md"
            withinPortal
          >
            <Menu.Target>
              <ActionIcon
                variant="subtle"
                color="gray"
                size="md"
                aria-label="More options"
                onClick={(e) => e.stopPropagation()}
              >
                <IconDots size={16} />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(cv);
                }}
              >
                Quick Edit
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleVisibility?.();
                }}
              >
                Make {cv.isPublic ? "Private" : "Public"}
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
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
      </Group>
    </Paper>
  );
};
