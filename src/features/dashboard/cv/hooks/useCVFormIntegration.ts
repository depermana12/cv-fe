import { useEffect } from "react";
import { useStore } from "@tanstack/react-form";
import { useCVFormStore } from "../store/cvFormStore";

type SectionType =
  | "contact"
  | "education"
  | "work"
  | "skill"
  | "project"
  | "organization"
  | "course"
  | "language";

// Define specific form data types for better type safety
export interface ContactFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  state?: string;
  country?: string;
  linkedin?: string;
  website?: string;
  github?: string;
  portfolio?: string;
  socialLinks?: string[];
  bio?: string;
  summary?: string;
  profileImage?: string;
}

export interface EducationFormData {
  institution?: string;
  degree?: string;
  fieldOfStudy?: string; // Changed from 'field' to match form
  startDate?: string | Date; // Allow both string and Date
  endDate?: string | Date; // Allow both string and Date
  gpa?: string;
  description?: string[] | string; // Allow both array and string
  location?: string; // Added location field
  url?: string; // Added url field
}

export interface WorkFormData {
  company?: string;
  position?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  current?: boolean;
  location?: string;
  description?: string;
  descriptions?: string[]; // For multiple descriptions
  url?: string;
  isCurrent?: boolean; // Alternative naming
}

export interface SkillFormData {
  name?: string;
  level?: string;
  category?: string;
  type?: string;
  proficiency?: string;
  keywords?: string[];
  description?: string;
}

export interface ProjectFormData {
  name?: string;
  description?: string;
  descriptions?: string[]; // For multiple descriptions
  technologies?: string[];
  url?: string;
  github?: string;
  startDate?: string | Date;
  endDate?: string | Date;
}

export interface CourseFormData {
  provider?: string;
  courseName?: string;
  name?: string; // Alternative naming
  startDate?: string | Date;
  endDate?: string | Date;
  date?: string;
  descriptions?: string[];
  description?: string;
  url?: string;
}

export interface OrganizationFormData {
  organization?: string; // Organization name field
  role?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  descriptions?: string[]; // For multiple descriptions
  description?: string;
  location?: string;
}

export interface LanguageFormData {
  language?: string; // Language name field
  fluency?: string; // Fluency level field
  proficiency?: string; // Alternative naming
  level?: string; // Alternative naming
}

/**
 * Hook to sync TanStack Form with Zustand store using useStore
 *
 * Features:
 * - Automatic form data transformation (e.g., firstName + lastName → fullName)
 * - Type-safe for common form structures
 * - Efficient updates (only when cvId actually changes)
 * - Live preview integration
 *
 * @param formStore - TanStack Form store instance
 * @param sectionType - Type of CV section being synced
 * @param cvId - Current CV ID
 */
export const useFormStoreSync = (
  formStore: any, // Keep as any for flexibility, but add runtime type safety
  sectionType: SectionType,
  cvId: number,
) => {
  // Subscribe to form values using TanStack Form's useStore
  const formValues = useStore(formStore, (state: any) => state.values);

  // Update store whenever form values change
  useEffect(() => {
    // Early return if formValues is undefined/null
    if (!formValues) return;

    // Get store methods directly to avoid dependency issues
    const store = useCVFormStore.getState();

    // Helper function to format dates
    const formatDate = (
      date: string | Date | undefined,
    ): string | undefined => {
      if (!date) return undefined;
      if (typeof date === "string") return date;
      return date.toLocaleDateString();
    };

    try {
      switch (sectionType) {
        case "contact":
          // Type-safe contact form data transformation
          const contactData = formValues as ContactFormData;
          const transformedContact = {
            fullName:
              contactData.firstName && contactData.lastName
                ? `${contactData.firstName} ${contactData.lastName}`.trim()
                : contactData.firstName || contactData.lastName || "",
            email: contactData.email,
            phone: contactData.phone,
            address: [contactData.city, contactData.state, contactData.country]
              .filter(Boolean)
              .join(", "),
            linkedin: contactData.linkedin,
            website: contactData.website,
            github: contactData.github,
            portfolio: contactData.portfolio,
            socialLinks: contactData.socialLinks,
            bio: contactData.bio,
            summary: contactData.summary,
            profileImage: contactData.profileImage,
          };
          store.updateContactData(transformedContact);
          break;
        case "education":
          // Handle single education form - transform to array format
          const educationData = formValues as EducationFormData;

          const transformedEducation = {
            institution: educationData.institution,
            degree: educationData.degree,
            field: educationData.fieldOfStudy, // Map fieldOfStudy to field
            startDate: formatDate(educationData.startDate),
            endDate: formatDate(educationData.endDate),
            gpa: educationData.gpa,
            description: Array.isArray(educationData.description)
              ? educationData.description.filter(Boolean).join("\n") // Join array to string
              : educationData.description,
            location: educationData.location,
            url: educationData.url,
          };
          // Wrap in array since store expects array format
          store.updateEducationData([transformedEducation]);
          break;
        case "work":
          // Handle single work form - transform to array format
          const workData = formValues as WorkFormData;

          const transformedWork = {
            company: workData.company,
            position: workData.position,
            startDate: formatDate(workData.startDate),
            endDate: formatDate(workData.endDate),
            current: workData.current || workData.isCurrent || false,
            location: workData.location,
            description: Array.isArray(workData.descriptions)
              ? workData.descriptions.filter(Boolean).join("\n")
              : workData.description,
          };
          // Wrap in array since store expects array format
          store.updateWorkData([transformedWork]);
          break;
        case "skill":
          // Handle single skill form - transform to array format
          const skillData = formValues as SkillFormData;

          const transformedSkill = {
            name: skillData.name,
            level: skillData.level || skillData.proficiency,
            category: skillData.category,
          };
          // Wrap in array since store expects array format
          store.updateSkillsData([transformedSkill]);
          break;
        case "project":
          // Handle single project form - transform to array format
          const projectData = formValues as ProjectFormData;

          const transformedProject = {
            name: projectData.name,
            description: Array.isArray(projectData.descriptions)
              ? projectData.descriptions.filter(Boolean).join("\n")
              : projectData.description,
            technologies: projectData.technologies || [],
            url: projectData.url,
            github: projectData.github,
            startDate: formatDate(projectData.startDate),
            endDate: formatDate(projectData.endDate),
          };
          // Wrap in array since store expects array format
          store.updateProjectsData([transformedProject]);
          break;
        case "course":
          // Handle single course form - transform to array format
          const courseData = formValues as CourseFormData;

          const transformedCourse = {
            name: courseData.courseName || courseData.name,
            provider: courseData.provider,
            date: formatDate(courseData.startDate) || courseData.date,
            url: courseData.url,
            description: Array.isArray(courseData.descriptions)
              ? courseData.descriptions.filter(Boolean).join("\n")
              : courseData.description,
          };
          // Wrap in array since store expects array format
          store.updateCoursesData([transformedCourse]);
          break;
        case "organization":
          // Handle single organization form - transform to array format
          const organizationData = formValues as OrganizationFormData;

          const transformedOrganization = {
            name: organizationData.organization, // Map 'organization' field to 'name'
            role: organizationData.role,
            startDate: formatDate(organizationData.startDate),
            endDate: formatDate(organizationData.endDate),
            description: Array.isArray(organizationData.descriptions)
              ? organizationData.descriptions.filter(Boolean).join("\n")
              : organizationData.description,
          };
          // Wrap in array since store expects array format
          store.updateOrganizationsData([transformedOrganization]);
          break;
        case "language":
          // Handle single language form - transform to array format
          const languageData = formValues as LanguageFormData;

          const transformedLanguage = {
            name: languageData.language, // Map 'language' field to 'name'
            proficiency:
              languageData.fluency ||
              languageData.proficiency ||
              languageData.level,
          };
          // Wrap in array since store expects array format
          store.updateLanguagesData([transformedLanguage]);
          break;
      }
    } catch (error) {
      console.error(
        `[useFormStoreSync] Error updating ${sectionType} data:`,
        error,
      );
    }
  }, [formValues, sectionType]);

  // Set CV ID only when it changes
  useEffect(() => {
    const store = useCVFormStore.getState();
    if (store.cvId !== cvId) {
      store.setCvId(cvId);
    }
  }, [cvId]);
};

/**
 * Hook to get reactive CV form data for preview
 * Uses the store selector to subscribe to specific data changes
 */
export const useCVPreviewData = () => {
  const formData = useCVFormStore((state) => state.formData);
  const cvId = useCVFormStore((state) => state.cvId);

  return {
    cvId,
    contact: formData.contact,
    education: formData.education || [],
    work: formData.work || [],
    skills: formData.skills || [],
    projects: formData.projects || [],
    organizations: formData.organizations || [],
    courses: formData.courses || [],
    languages: formData.languages || [],
  };
};
