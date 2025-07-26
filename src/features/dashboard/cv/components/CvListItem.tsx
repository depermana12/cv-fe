import {
  Card,
  Group,
  Text,
  Badge,
  ActionIcon,
  Menu,
  Box,
  Flex,
  Title,
} from "@mantine/core";
import { IconDots, IconEdit, IconTrash } from "@tabler/icons-react";
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
    <Card radius="md" withBorder shadow="sm">
      <Flex justify="space-between" align="center" gap="md">
        {/* Left section - Main info */}
        <Box style={{ flex: 1, minWidth: 0 }}>
          <Group gap="sm" mb="xs">
            <Title
              order={3}
              size="h4"
              lineClamp={1}
              onClick={() => onSelect(cv)}
              style={{ cursor: "pointer" }}
            >
              {cv.title}
            </Title>
            <Badge variant="default" size="xs">
              {cv.isPublic ? "Public" : "Private"}
            </Badge>
          </Group>

          {cv.description && (
            <Text size="sm" lineClamp={2}>
              {cv.description}
            </Text>
          )}

          <Group gap="md" c="dimmed" mt="xs">
            <Text size="xs" c="dimmed">
              Created: {new Date(cv.createdAt).toLocaleDateString()}
            </Text>
            <Text size="xs">Updated {formatDate(cv.updatedAt)}</Text>
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
