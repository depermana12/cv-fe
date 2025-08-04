import { useContacts } from "../sections/contact/hooks/useContact";
import { useEducations } from "../sections/education/hooks/useEducations";
import { useWorks } from "../sections/work/hooks/useWorks";
import { useSkills } from "../sections/skill/hooks/useSkills";
import { useProjects } from "../sections/project/hooks/useProjects";
import { useOrganizations } from "../sections/organization/hooks/useOrganizations";
import { useCourses } from "../sections/course/hooks/useCourses";
import { useLanguages } from "../sections/language/hooks/useLanguages";

/**
 * Centralized CV data hook that aggregates all section data for a given CV
 *
 * this hook provides a single interface to access all CV section data,
 * eliminating the need for components to manage multiple individual hooks.
 * matching the backend aggregation for cv data.
 *
 *
 * @param cvId - The CV ID to fetch data for
 * @returns Aggregated CV data with loading states and utilities
 */

export const useCVData = (cvId: number) => {
  const contactsQuery = useContacts(cvId);
  const educationsQuery = useEducations(cvId);
  const worksQuery = useWorks(cvId);
  const skillsQuery = useSkills(cvId);
  const projectsQuery = useProjects(cvId);
  const organizationsQuery = useOrganizations(cvId);
  const coursesQuery = useCourses(cvId);
  const languagesQuery = useLanguages(cvId);

  const data = {
    contacts: contactsQuery.data ?? [],
    educations: educationsQuery.data ?? [],
    works: worksQuery.data ?? [],
    skills: skillsQuery.data ?? [],
    projects: projectsQuery.data ?? [],
    organizations: organizationsQuery.data ?? [],
    courses: coursesQuery.data ?? [],
    languages: languagesQuery.data ?? [],
  };

  const isLoading =
    contactsQuery.isLoading ||
    educationsQuery.isLoading ||
    worksQuery.isLoading ||
    skillsQuery.isLoading ||
    projectsQuery.isLoading ||
    organizationsQuery.isLoading ||
    coursesQuery.isLoading ||
    languagesQuery.isLoading;

  const hasError =
    contactsQuery.isError ||
    educationsQuery.isError ||
    worksQuery.isError ||
    skillsQuery.isError ||
    projectsQuery.isError ||
    organizationsQuery.isError ||
    coursesQuery.isError ||
    languagesQuery.isError;

  const queries = {
    contacts: contactsQuery,
    educations: educationsQuery,
    works: worksQuery,
    skills: skillsQuery,
    projects: projectsQuery,
    organizations: organizationsQuery,
    courses: coursesQuery,
    languages: languagesQuery,
  };

  const refetchAll = () => {
    return Promise.all([
      contactsQuery.refetch(),
      educationsQuery.refetch(),
      worksQuery.refetch(),
      skillsQuery.refetch(),
      projectsQuery.refetch(),
      organizationsQuery.refetch(),
      coursesQuery.refetch(),
      languagesQuery.refetch(),
    ]);
  };

  const invalidateAll = () => {
    // Use queryClient.invalidateQueries
    // Refactor later
    return refetchAll();
  };

  const getSectionData = (sectionType: string) => {
    switch (sectionType) {
      case "contact":
        return data.contacts;
      case "education":
        return data.educations;
      case "work":
        return data.works;
      case "skill":
        return data.skills;
      case "project":
        return data.projects;
      case "organization":
        return data.organizations;
      case "course":
        return data.courses;
      case "language":
        return data.languages;
      default:
        return [];
    }
  };

  const getSectionQuery = (sectionType: string) => {
    switch (sectionType) {
      case "contact":
        return queries.contacts;
      case "education":
        return queries.educations;
      case "work":
        return queries.works;
      case "skill":
        return queries.skills;
      case "project":
        return queries.projects;
      case "organization":
        return queries.organizations;
      case "course":
        return queries.courses;
      case "language":
        return queries.languages;
      default:
        return null;
    }
  };

  // Data availability flags
  const hasData = {
    contacts: data.contacts.length > 0,
    educations: data.educations.length > 0,
    works: data.works.length > 0,
    skills: data.skills.length > 0,
    projects: data.projects.length > 0,
    organizations: data.organizations.length > 0,
    courses: data.courses.length > 0,
    languages: data.languages.length > 0,
  };

  const totalItems = Object.values(data).reduce(
    (acc, items) => acc + items.length,
    0,
  );
  const completedSections = Object.values(hasData).filter(Boolean).length;
  const totalSections = Object.keys(hasData).length;
  const completionPercentage = Math.round(
    (completedSections / totalSections) * 100,
  );

  return {
    // Core data
    data,

    // Loading states
    isLoading,
    hasError,

    // Individual queries
    queries,

    // Utilities
    refetchAll,
    invalidateAll,
    getSectionData,
    getSectionQuery,

    // Data insights
    hasData,
    totalItems,
    completedSections,
    totalSections,
    completionPercentage,

    // Convenience flags
    isEmpty: totalItems === 0,
    isComplete: completedSections === totalSections,
    hasPartialData: completedSections > 0 && completedSections < totalSections,
  };
};

export type CVData = ReturnType<typeof useCVData>;
