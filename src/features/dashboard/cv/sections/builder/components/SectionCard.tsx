import { Card, Group, Stack, Text, ActionIcon } from "@mantine/core";
import { IconGripVertical, IconX } from "@tabler/icons-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SectionCardProps } from "../../../types/types";

export const SectionCard = ({
  section,
  variant,
  onRemove,
  onClick,
}: SectionCardProps) => {
  const sortable =
    variant === "selected" ? useSortable({ id: section.id }) : null;

  const cardProps =
    variant === "selected"
      ? {
          ref: sortable?.setNodeRef,
          style: {
            transform: CSS.Transform.toString(sortable?.transform ?? null),
            transition: sortable?.transition,
            opacity: sortable?.isDragging ? 0.5 : 1,
          },
          ...sortable?.attributes,
        }
      : {
          style: { cursor: "pointer" },
          onClick,
        };

  return (
    <Card
      padding="md"
      radius="md"
      withBorder
      shadow="sm"
      bg="white"
      {...cardProps}
    >
      <Group justify="space-between">
        <Group gap="sm">
          {variant === "selected" && sortable && (
            <ActionIcon
              variant="transparent"
              {...sortable.listeners}
              style={{ cursor: "grab" }}
            >
              <IconGripVertical size={18} />
            </ActionIcon>
          )}
          {section.icon}
          <Stack gap={0}>
            <Text fw={600} size="sm">
              {section.name}
            </Text>
            <Text size="xs" c="dimmed">
              {section.description}
            </Text>
          </Stack>
        </Group>

        {variant === "selected" && (
          <ActionIcon size="sm" variant="subtle" color="red" onClick={onRemove}>
            <IconX size={14} />
          </ActionIcon>
        )}
      </Group>
    </Card>
  );
};
