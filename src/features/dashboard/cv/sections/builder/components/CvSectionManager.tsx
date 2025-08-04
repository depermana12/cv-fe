import { Stack, Title, Text, Paper, Center } from "@mantine/core";
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

  const {
    availableSections,
    selectedSectionDetails,
    handleAddSection,
    handleRemoveSection,
    handleDragEnd,
  } = useSectionManager();

  const sortableItems = useMemo(
    () => selectedSectionDetails.map((section) => section.id),
    [selectedSectionDetails],
  );

  return (
    <Stack gap="xl" p="md">
      <Stack gap={0}>
        <Title order={3}>Manage CV Sections</Title>
        <Text c="dimmed" size="sm">
          Select and arrange sections. Drag to reorder.
        </Text>
      </Stack>

      <Paper
        p="sm"
        radius="md"
        withBorder
        bg="gray.0"
        style={{ minHeight: "400px" }}
      >
        <Stack gap="sm" mb="md">
          <Title order={4}>
            Selected CV Sections ({selectedSectionDetails.length})
          </Title>
          <Text size="sm" c="dimmed">
            Drag to reorder
          </Text>
        </Stack>

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
                  onRemove={() => handleRemoveSection(section.id)}
                />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>

        {selectedSectionDetails.length === 0 && (
          <Paper p="xs" radius="md" withBorder bg="white">
            <Stack gap={0} align="center">
              <Text c="dimmed">No sections selected</Text>
              <Text size="sm" c="dimmed">
                Add sections from below to build your CV
              </Text>
            </Stack>
          </Paper>
        )}
      </Paper>

      <Stack gap="sm">
        <Title order={4}>Available Sections</Title>
        <Text size="sm" c="dimmed">
          Click to add
        </Text>

        {availableSections.length > 0 ? (
          <Stack gap="sm">
            {availableSections.map((section) => (
              <SectionCard
                key={section.id}
                section={section}
                variant="available"
                onClick={() => handleAddSection(section.id)}
              />
            ))}
          </Stack>
        ) : (
          <Paper p="xl" radius="md" withBorder>
            <Stack gap="sm" align="center">
              <Text c="dimmed">All sections added</Text>
              <Text size="sm" c="dimmed">
                You've added all available sections
              </Text>
            </Stack>
          </Paper>
        )}
      </Stack>
    </Stack>
  );
};
