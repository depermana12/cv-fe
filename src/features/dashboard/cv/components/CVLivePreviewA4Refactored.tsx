import { useCvStore } from "../store/cvStore";
import { useCvStyleStore } from "../store/cvStyleStore";
import { useCVSectionStore } from "../store/useCVSectionStore";
import { useCVData } from "../hooks/useCVData";
import { CvA4Preview, CvPaper } from "./CVA4Preview";
import { Stack, Text, LoadingOverlay, Alert } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";

// CV Section Components
import { CVContactSection } from "../sections/contact/components/CVContactSection";
import { CVEducationSection } from "../sections/education/components/CVEducationSection";
import { CVWorkSection } from "../sections/work/components/CVWorkSection";
import { CVSkillSection } from "../sections/skill/components/CVSkillSection";
import { CVProjectSection } from "../sections/project/components/CVProjectSection";
import { CVOrganizationSection } from "../sections/organization/components/CVOrganizationSection";
import { CVCourseSection } from "../sections/course/components/CVCourseSection";
import { CVLanguageSection } from "../sections/language/components/CVLanguageSection";

interface CVLivePreviewA4Props {
  cvId?: number;
}

/**
 * REFACTORED: CVLivePreviewA4 using centralized useCVData hook
 *
 * Before: 11 individual hooks called separately
 * After: 1 centralized hook that manages all data consistently
 *
 * Benefits:
 * - Reduced from 11 hooks to 1 hook call
 * - Consistent loading state across all sections
 * - Better error handling
 * - Simplified component logic
 * - Performance improvements through coordinated data fetching
 */
export const CVLivePreviewA4Refactored = ({ cvId }: CVLivePreviewA4Props) => {
  // Store hooks (these remain the same)
  const { activeCvId } = useCvStore();
  const { headerColor } = useCvStyleStore();
  const { getSectionTitle, selectedSections } = useCVSectionStore();

  // SINGLE centralized data hook replaces 8 individual data hooks
  const actualCvId = cvId || activeCvId;
  const safeActiveCvId = actualCvId || 0;

  const cvData = useCVData(safeActiveCvId);

  // Early return after all hooks are called (same pattern as before)
  if (!actualCvId) {
    return (
      <CvA4Preview>
        <CvPaper>
          <Stack
            gap="lg"
            align="center"
            justify="center"
            style={{ minHeight: "200px" }}
          >
            <Text c="dimmed">No CV selected</Text>
          </Stack>
        </CvPaper>
      </CvA4Preview>
    );
  }

  // Enhanced error handling
  if (cvData.hasError) {
    return (
      <CvA4Preview>
        <CvPaper>
          <Alert
            icon={<IconExclamationCircle size="1rem" />}
            title="Error loading CV data"
            color="red"
          >
            There was an error loading your CV data. Please try refreshing the
            page.
          </Alert>
        </CvPaper>
      </CvA4Preview>
    );
  }

  // Enhanced loading state
  if (cvData.isLoading) {
    return (
      <CvA4Preview>
        <CvPaper style={{ position: "relative", minHeight: "400px" }}>
          <LoadingOverlay visible={true} />
          <Stack
            gap="lg"
            align="center"
            justify="center"
            style={{ minHeight: "200px" }}
          >
            <Text c="dimmed">Loading CV data...</Text>
            <Text size="sm" c="dimmed">
              {cvData.completedSections} of {cvData.totalSections} sections
              loaded
            </Text>
          </Stack>
        </CvPaper>
      </CvA4Preview>
    );
  }

  // Section rendering using centralized data
  const renderSection = (sectionId: string) => {
    const sectionData = cvData.getSectionData(sectionId);
    const sectionTitle = getSectionTitle(sectionId);

    switch (sectionId) {
      case "contact":
        return (
          <CVContactSection
            key={sectionId}
            contacts={sectionData}
            title={sectionTitle}
            headerColor={headerColor}
          />
        );
      case "education":
        return (
          <CVEducationSection
            key={sectionId}
            educations={sectionData}
            title={sectionTitle}
            headerColor={headerColor}
          />
        );
      case "work":
        return (
          <CVWorkSection
            key={sectionId}
            works={sectionData}
            title={sectionTitle}
            headerColor={headerColor}
          />
        );
      case "skill":
        return (
          <CVSkillSection
            key={sectionId}
            skills={sectionData}
            title={sectionTitle}
            headerColor={headerColor}
          />
        );
      case "project":
        return (
          <CVProjectSection
            key={sectionId}
            projects={sectionData}
            title={sectionTitle}
            headerColor={headerColor}
          />
        );
      case "organization":
        return (
          <CVOrganizationSection
            key={sectionId}
            organizations={sectionData}
            title={sectionTitle}
            headerColor={headerColor}
          />
        );
      case "course":
        return (
          <CVCourseSection
            key={sectionId}
            courses={sectionData}
            title={sectionTitle}
            headerColor={headerColor}
          />
        );
      case "language":
        return (
          <CVLanguageSection
            key={sectionId}
            languages={sectionData}
            title={sectionTitle}
            headerColor={headerColor}
          />
        );
      default:
        return null;
    }
  };

  return (
    <CvA4Preview>
      <CvPaper style={{ position: "relative" }}>
        {/* Show fetching indicator for background updates */}
        {cvData.isFetching && !cvData.isLoading && (
          <LoadingOverlay visible={true} opacity={0.3} />
        )}

        <Stack gap="lg">
          {selectedSections.map(renderSection)}

          {/* Debug info in development */}
          {process.env.NODE_ENV === "development" && (
            <Stack
              gap="xs"
              p="sm"
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "4px",
                fontSize: "12px",
                color: "#666",
              }}
            >
              <Text size="xs">Debug Info:</Text>
              <Text size="xs">Total items: {cvData.totalItems}</Text>
              <Text size="xs">Completion: {cvData.completionPercentage}%</Text>
              <Text size="xs">
                Sections with data: {cvData.completedSections}/
                {cvData.totalSections}
              </Text>
            </Stack>
          )}
        </Stack>
      </CvPaper>
    </CvA4Preview>
  );
};

/**
 * COMPARISON: Hook count reduction
 *
 * Before (CVLivePreviewA4):
 * 1. useCvStore
 * 2. useContacts
 * 3. useEducations
 * 4. useWorks
 * 5. useSkills
 * 6. useProjects
 * 7. useOrganizations
 * 8. useCourses
 * 9. useLanguages
 * 10. useCvStyleStore
 * 11. useCVSectionStore
 * Total: 11 hooks
 *
 * After (CVLivePreviewA4Refactored):
 * 1. useCvStore
 * 2. useCvStyleStore
 * 3. useCVSectionStore
 * 4. useCVData (contains all section data)
 * Total: 4 hooks
 *
 * Reduction: 11 → 4 hooks (63% reduction)
 */
