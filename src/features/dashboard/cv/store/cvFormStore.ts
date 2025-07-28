import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Define the structure for CV form data
export interface CVFormData {
  // Contact Information
  contact?: {
    fullName?: string;
    email?: string;
    phone?: string;
    address?: string;
    linkedin?: string;
    website?: string;
    github?: string;
    portfolio?: string;
    bio?: string;
    summary?: string;
    profileImage?: string;
    socialLinks?: string[];
  };

  // Education
  education?: Array<{
    id?: string;
    institution?: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    gpa?: string;
    description?: string;
    location?: string;
    url?: string;
  }>;

  // Work Experience
  work?: Array<{
    id?: string;
    company?: string;
    position?: string;
    startDate?: string;
    endDate?: string;
    current?: boolean;
    location?: string;
    description?: string;
  }>;

  // Skills
  skills?: Array<{
    id?: string;
    name?: string;
    level?: string;
    category?: string;
  }>;

  // Projects
  projects?: Array<{
    id?: string;
    name?: string;
    description?: string;
    technologies?: string[];
    url?: string;
    github?: string;
    startDate?: string;
    endDate?: string;
  }>;

  // Organizations
  organizations?: Array<{
    id?: string;
    name?: string;
    role?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }>;

  // Courses & Certifications
  courses?: Array<{
    id?: string;
    name?: string;
    provider?: string;
    date?: string;
    url?: string;
    description?: string;
  }>;

  // Languages
  languages?: Array<{
    id?: string;
    name?: string;
    proficiency?: string;
  }>;
}

interface CVFormStore {
  cvId: number | null;
  formData: CVFormData;

  // Actions
  setCvId: (id: number) => void;
  updateContactData: (data: Partial<CVFormData["contact"]>) => void;
  updateEducationData: (education: CVFormData["education"]) => void;
  updateWorkData: (work: CVFormData["work"]) => void;
  updateSkillsData: (skills: CVFormData["skills"]) => void;
  updateProjectsData: (projects: CVFormData["projects"]) => void;
  updateOrganizationsData: (organizations: CVFormData["organizations"]) => void;
  updateCoursesData: (courses: CVFormData["courses"]) => void;
  updateLanguagesData: (languages: CVFormData["languages"]) => void;

  // Clear data
  clearFormData: () => void;

  // Get specific section data
  getContactData: () => CVFormData["contact"];
  getEducationData: () => CVFormData["education"];
  getWorkData: () => CVFormData["work"];
  getSkillsData: () => CVFormData["skills"];
  getProjectsData: () => CVFormData["projects"];
  getOrganizationsData: () => CVFormData["organizations"];
  getCoursesData: () => CVFormData["courses"];
  getLanguagesData: () => CVFormData["languages"];
}

export const useCVFormStore = create<CVFormStore>()(
  subscribeWithSelector((set, get) => ({
    cvId: null,
    formData: {},

    setCvId: (id) => set({ cvId: id }),

    updateContactData: (data) =>
      set((state) => ({
        formData: {
          ...state.formData,
          contact: { ...state.formData.contact, ...data },
        },
      })),

    updateEducationData: (education) =>
      set((state) => ({
        formData: { ...state.formData, education },
      })),

    updateWorkData: (work) =>
      set((state) => ({
        formData: { ...state.formData, work },
      })),

    updateSkillsData: (skills) =>
      set((state) => ({
        formData: { ...state.formData, skills },
      })),

    updateProjectsData: (projects) =>
      set((state) => ({
        formData: { ...state.formData, projects },
      })),

    updateOrganizationsData: (organizations) =>
      set((state) => ({
        formData: { ...state.formData, organizations },
      })),

    updateCoursesData: (courses) =>
      set((state) => ({
        formData: { ...state.formData, courses },
      })),

    updateLanguagesData: (languages) =>
      set((state) => ({
        formData: { ...state.formData, languages },
      })),

    clearFormData: () => set({ formData: {} }),

    // Getters
    getContactData: () => get().formData.contact,
    getEducationData: () => get().formData.education,
    getWorkData: () => get().formData.work,
    getSkillsData: () => get().formData.skills,
    getProjectsData: () => get().formData.projects,
    getOrganizationsData: () => get().formData.organizations,
    getCoursesData: () => get().formData.courses,
    getLanguagesData: () => get().formData.languages,
  })),
);
