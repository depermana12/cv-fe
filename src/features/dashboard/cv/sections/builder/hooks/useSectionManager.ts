import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { useCallback, useMemo } from "react";
import { SECTION_MAP, ALL_SECTIONS } from "../data/CvSections";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { SectionType } from "../../../types/types";
import { useDebouncedCallback } from "@mantine/hooks";

export function useSectionManager() {
  const { activeCvId } = useCvStore();
  const {
    selectedSections,
    addSection,
    removeSection,
    reorderSections,
    saveSectionsForCv,
  } = useCVSectionStore();

  const debouncedSave = useDebouncedCallback(saveSectionsForCv, 500);

  const handleAddSection = useCallback(
    (sectionId: SectionType) => {
      const newSections = [...selectedSections, sectionId];
      addSection(sectionId);
      if (activeCvId) {
        debouncedSave(activeCvId, newSections);
      }
    },
    [selectedSections, activeCvId, addSection, debouncedSave],
  );

  const handleRemoveSection = useCallback(
    (sectionId: SectionType) => {
      const newSections = selectedSections.filter((id) => id !== sectionId);
      removeSection(sectionId);
      if (activeCvId) {
        debouncedSave(activeCvId, newSections);
      }
    },
    [selectedSections, activeCvId, removeSection, debouncedSave],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) {
        return;
      }

      const oldIndex = selectedSections.indexOf(active.id as SectionType);
      const newIndex = selectedSections.indexOf(over.id as SectionType);

      if (oldIndex === -1 || newIndex === -1) {
        return;
      }

      const newSections = arrayMove(selectedSections, oldIndex, newIndex);
      reorderSections(newSections);

      if (activeCvId) {
        debouncedSave(activeCvId, newSections);
      }
    },
    [selectedSections, activeCvId, reorderSections, debouncedSave],
  );

  const availableSections = useMemo(
    () =>
      ALL_SECTIONS.filter((section) => !selectedSections.includes(section.id)),
    [selectedSections],
  );

  const selectedSectionDetails = useMemo(
    () =>
      selectedSections
        .map((id) => SECTION_MAP.get(id))
        .filter((section): section is NonNullable<typeof section> =>
          Boolean(section),
        ),
    [selectedSections],
  );

  return {
    availableSections,
    selectedSectionDetails,
    handleAddSection,
    handleRemoveSection,
    handleDragEnd,
  };
}
