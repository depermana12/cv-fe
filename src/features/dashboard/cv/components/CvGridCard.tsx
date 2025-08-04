import {
  Stack,
  Group,
  Title,
  Badge,
  Menu,
  ActionIcon,
  Text,
  Paper,
} from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import { CvLibraryItemProps } from "@features/dashboard/cv/types/types";
import { formatDate } from "../utils/formatDate";

export const CvGridCard = ({
  cv,
  onSelect,
  onEdit,
  onDelete,
  onToggleVisibility,
}: CvLibraryItemProps) => {
  return (
    <>
      <Paper p="md" radius="md" withBorder shadow="sm">
        <Stack style={{ height: "100%" }}>
          <Group justify="space-between" wrap="nowrap">
            <Group gap="sm">
              <Title
                order={3}
                size="h4"
                lineClamp={2}
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
                  aria-label="cv options setting"
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

          {/* Description Section */}
          <Text size="sm" c="dimmed" lineClamp={3} style={{ flex: 1 }}>
            {cv.description || "No description available"}
          </Text>

          {/* Date Section - Always at bottom */}
          <Stack gap="xs" mt="auto">
            <Group justify="space-between" align="center">
              <Text size="xs" c="dimmed">
                Created: {formatDate(cv.createdAt)}
              </Text>
              <Text size="xs" c="dimmed">
                Updated: {cv.updatedAt ? formatDate(cv.updatedAt) : "N/A"}
              </Text>
            </Group>
          </Stack>
        </Stack>
      </Paper>
    </>
  );
};
