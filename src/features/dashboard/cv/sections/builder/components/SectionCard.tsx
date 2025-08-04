import { Paper, Group, Stack, Text, ActionIcon } from "@mantine/core";
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
    <Paper p="xs" radius="sm" withBorder bg="white" {...cardProps}>
      <Group justify="space-between">
        <Group gap="xs">
          {variant === "selected" && sortable && (
            <ActionIcon
              variant="transparent"
              {...sortable.listeners}
              color="gray"
              style={{ cursor: "grab" }}
            >
              <IconGripVertical size={18} />
            </ActionIcon>
          )}
          <Stack gap={0}>
            <Text size="sm">{section.name}</Text>
          </Stack>
        </Group>

        {variant === "selected" && (
          <ActionIcon size="sm" variant="subtle" color="red" onClick={onRemove}>
            <IconX size={14} />
          </ActionIcon>
        )}
      </Group>
    </Paper>
  );
};
