import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { SectionType } from "../types/types";

interface CVSectionState {
  // Selected sections for the current CV
  selectedSections: SectionType[];
  // CV-specific section configurations (cvId -> sections)
  cvSectionConfigs: Record<number, SectionType[]>;
  // Custom section titles (cvId -> sectionType -> customTitle)
  customSectionTitles: Record<number, Record<SectionType, string>>;

  // Actions
  setSelectedSections: (sections: SectionType[]) => void;
  addSection: (section: SectionType) => void;
  removeSection: (section: SectionType) => void;
  reorderSections: (sections: SectionType[]) => void;

  // Custom title actions
  setSectionTitle: (cvId: number, section: SectionType, title: string) => void;
  getSectionTitle: (cvId: number, section: SectionType) => string;

  // CV-specific persistence
  loadSectionsForCv: (cvId: number) => void;
  saveSectionsForCv: (cvId: number, sections: SectionType[]) => void;

  // Default sections
  resetToDefaults: () => void;

  // Utils
  getSectionIndex: (section: SectionType) => number;
  hasSection: (section: SectionType) => boolean;
}

// Default sections for new CVs
const DEFAULT_SECTIONS: SectionType[] = [
  "contact",
  "education",
  "work",
  "skill",
];

// Default section titles
const DEFAULT_SECTION_TITLES: Record<SectionType, string> = {
  contact: "Contact Information",
  education: "Education",
  work: "Work Experience",
  skill: "Skills",
  project: "Projects",
  organization: "Organizations",
  course: "Courses & Certifications",
  language: "Languages",
};

export const useCVSectionStore = create<CVSectionState>()(
  subscribeWithSelector((set, get) => ({
    selectedSections: DEFAULT_SECTIONS,
    cvSectionConfigs: {},
    customSectionTitles: {},

    setSelectedSections: (sections) => set({ selectedSections: sections }),

    addSection: (section) =>
      set((state) => {
        if (state.selectedSections.includes(section)) return state;
        return { selectedSections: [...state.selectedSections, section] };
      }),

    removeSection: (section) =>
      set((state) => ({
        selectedSections: state.selectedSections.filter((s) => s !== section),
      })),

    reorderSections: (sections) => set({ selectedSections: sections }),

    setSectionTitle: (cvId, section, title) =>
      set((state) => ({
        customSectionTitles: {
          ...state.customSectionTitles,
          [cvId]: {
            ...state.customSectionTitles[cvId],
            [section]: title,
          },
        },
      })),

    getSectionTitle: (cvId, section) => {
      const state = get();
      return (
        state.customSectionTitles[cvId]?.[section] ||
        DEFAULT_SECTION_TITLES[section]
      );
    },

    loadSectionsForCv: (cvId) => {
      const state = get();
      const savedSections = state.cvSectionConfigs[cvId];
      if (savedSections) {
        set({ selectedSections: savedSections });
      } else {
        // Use defaults for new CV
        set({ selectedSections: DEFAULT_SECTIONS });
      }
    },

    saveSectionsForCv: (cvId, sections) =>
      set((state) => ({
        selectedSections: sections,
        cvSectionConfigs: {
          ...state.cvSectionConfigs,
          [cvId]: sections,
        },
      })),

    resetToDefaults: () => set({ selectedSections: DEFAULT_SECTIONS }),

    getSectionIndex: (section) => {
      const state = get();
      return state.selectedSections.indexOf(section);
    },

    hasSection: (section) => {
      const state = get();
      return state.selectedSections.includes(section);
    },
  })),
);
