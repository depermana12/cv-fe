import { Stack, Title, Text, Paper } from "@mantine/core";
import { useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SectionCard } from "./SectionCard";
import { useSectionManager } from "../hooks/useSectionManager";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export const CvSectionManager = () => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const { selectedSectionDetails, handleDragEnd } = useSectionManager();

  const sortableItems = useMemo(
    () => selectedSectionDetails.map((section) => section.id),
    [selectedSectionDetails],
  );

  return (
    <Stack gap="lg" p="md">
      <Stack gap={0}>
        <Title order={3} size="h4">
          Section Order
        </Title>
        <Text c="dimmed" size="sm">
          Drag sections to reorder how they appear in cv
        </Text>
      </Stack>

      <Paper p="sm" radius="md" withBorder bg="gray.0">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortableItems}
            strategy={verticalListSortingStrategy}
          >
            <Stack gap="sm">
              {selectedSectionDetails.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  variant="selected"
                />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>
      </Paper>
    </Stack>
  );
};
