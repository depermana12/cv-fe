import { useState } from "react";
import {
  Box,
  Stepper,
  Button,
  Group,
  Stack,
  Text,
  Paper,
  Center,
  Title,
} from "@mantine/core";
import {
  IconUser,
  IconSchool,
  IconBriefcase,
  IconBulb,
  IconCode,
  IconBuilding,
  IconCertificate,
  IconWorld,
  IconCheck,
  IconArrowLeft,
  IconArrowRight,
} from "@tabler/icons-react";

// Import all form components
import { WorkForm } from "../../work/components/WorkForm";
import { SkillForm } from "../../skill/components/SkillForm";
import { ProjectForm } from "../../project/components/ProjectForm";
import { OrganizationForm } from "../../organization/components/OrganizationForm";
import { CourseForm } from "../../course/components/CourseForm";
import { LanguageForm } from "../../language/components/LanguageForm";
import { ContactForm } from "../../contact/components/ContactForm";
import { EducationForm } from "../../education/components/EducationForm";
import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { SectionType } from "../../../types/types";

import { useEducations } from "../../education/hooks/useEducations";
import { useWorks } from "../../work/hooks/useWorks";
import { useSkills } from "../../skill/hooks/useSkills";
import { useProjects } from "../../project/hooks/useProjects";
import { useOrganizations } from "../../organization/hooks/useOrganizations";
import { useCourses } from "../../course/hooks/useCourses";
import { useLanguages } from "../../language/hooks/useLanguages";
import { useContacts } from "../../contact/hooks/useContact";

import { useDeleteEducation } from "../../education/hooks/useDeleteEducation";
import { useDeleteWork } from "../../work/hooks/useDeleteWork";
import { useDeleteSkill } from "../../skill/hooks/useDeleteSkill";
import { useDeleteProject } from "../../project/hooks/useDeleteProject";
import { useDeleteOrganization } from "../../organization/hooks/useDeleteOrganization";
import { useDeleteCourse } from "../../course/hooks/useDeleteCourse";
import { useDeleteLanguage } from "../../language/hooks/useDeleteLanguage";

// Import multi-item section component
import { CVMultiItemSection } from "./CVMultiItemSection";

interface CVContentEditorProps {
  cvId: number;
}

interface SectionConfig {
  id: SectionType;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<{
    cvId: number;
  }>;
}

// Enhanced wrapper components that handle submit + next flow
const ContactFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: contacts = [], isLoading } = useContacts(cvId);
  const { getSectionTitle } = useCVSectionStore();
  const existingContact = contacts.length > 0 ? contacts[0] : undefined;
  const sectionTitle = getSectionTitle(cvId, "contact");

  if (isLoading) {
    return <Text>Loading contact information...</Text>;
  }

  return (
    <Stack gap="md">
      <Title order={4}>{sectionTitle}</Title>
      <ContactForm
        mode={existingContact ? "edit" : "create"}
        cvId={cvId}
        initialData={existingContact}
        onSuccess={() => {
          console.log("Contact saved");
        }}
      />
    </Stack>
  );
};

const EducationFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: educations = [], isLoading } = useEducations(cvId);
  const deleteEducationHook = useDeleteEducation();

  return (
    <CVMultiItemSection
      sectionType="education"
      items={educations}
      isLoading={isLoading}
      useDeleteHook={deleteEducationHook}
      cvId={cvId}
      FormComponent={EducationForm}
    />
  );
};

const WorkFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: works = [], isLoading } = useWorks(cvId);
  const deleteWorkHook = useDeleteWork();

  return (
    <CVMultiItemSection
      sectionType="work"
      items={works}
      isLoading={isLoading}
      useDeleteHook={deleteWorkHook}
      cvId={cvId}
      FormComponent={WorkForm}
    />
  );
};

const SkillFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: skills = [], isLoading } = useSkills(cvId);
  const deleteSkillHook = useDeleteSkill();

  return (
    <CVMultiItemSection
      sectionType="skill"
      items={skills}
      isLoading={isLoading}
      useDeleteHook={deleteSkillHook}
      cvId={cvId}
      FormComponent={SkillForm}
    />
  );
};

const ProjectFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: projects = [], isLoading } = useProjects(cvId);
  const deleteProjectHook = useDeleteProject();

  return (
    <CVMultiItemSection
      sectionType="project"
      items={projects}
      isLoading={isLoading}
      useDeleteHook={deleteProjectHook}
      cvId={cvId}
      FormComponent={ProjectForm}
    />
  );
};

const OrganizationFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: organizations = [], isLoading } = useOrganizations(cvId);
  const deleteOrganizationHook = useDeleteOrganization();

  return (
    <CVMultiItemSection
      sectionType="organization"
      items={organizations}
      isLoading={isLoading}
      useDeleteHook={deleteOrganizationHook}
      cvId={cvId}
      FormComponent={OrganizationForm}
    />
  );
};

const CourseFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: courses = [], isLoading } = useCourses(cvId);
  const deleteCourseHook = useDeleteCourse();

  return (
    <CVMultiItemSection
      sectionType="course"
      items={courses}
      isLoading={isLoading}
      useDeleteHook={deleteCourseHook}
      cvId={cvId}
      FormComponent={CourseForm}
    />
  );
};

const LanguageFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: languages = [], isLoading } = useLanguages(cvId);
  const deleteLanguageHook = useDeleteLanguage();

  return (
    <CVMultiItemSection
      sectionType="language"
      items={languages}
      isLoading={isLoading}
      useDeleteHook={deleteLanguageHook}
      cvId={cvId}
      FormComponent={LanguageForm}
    />
  );
};

const SECTION_CONFIG: Record<SectionType, SectionConfig> = {
  contact: {
    id: "contact",
    title: "Contact",
    icon: <IconUser size={16} />,
    component: ContactFormWrapper,
  },
  education: {
    id: "education",
    title: "Education",
    icon: <IconSchool size={16} />,
    component: EducationFormWrapper,
  },
  work: {
    id: "work",
    title: "Work",
    icon: <IconBriefcase size={16} />,
    component: WorkFormWrapper,
  },
  skill: {
    id: "skill",
    title: "Skills",
    icon: <IconBulb size={16} />,
    component: SkillFormWrapper,
  },
  project: {
    id: "project",
    title: "Projects",
    icon: <IconCode size={16} />,
    component: ProjectFormWrapper,
  },
  organization: {
    id: "organization",
    title: "Organizations",
    icon: <IconBuilding size={16} />,
    component: OrganizationFormWrapper,
  },
  course: {
    id: "course",
    title: "Courses",
    icon: <IconCertificate size={16} />,
    component: CourseFormWrapper,
  },
  language: {
    id: "language",
    title: "Languages",
    icon: <IconWorld size={16} />,
    component: LanguageFormWrapper,
  },
};

export const CVContentEditor = ({ cvId }: CVContentEditorProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const { selectedSections } = useCVSectionStore();

  // Create steps from selected sections
  const steps = selectedSections
    .map((sectionId: SectionType) => SECTION_CONFIG[sectionId])
    .filter(Boolean);
  const currentSection = steps[activeStep];

  const prevStep = () => setActiveStep((current) => Math.max(current - 1, 0));

  const CurrentFormComponent = currentSection?.component;

  return (
    <Stack gap="md" p="md">
      {/* Stepper */}
      <Stepper
        active={activeStep}
        size="sm"
        color="teal"
        styles={{
          steps: {
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid var(--mantine-color-default-border)",
            paddingBottom: "1rem",
            marginBottom: "1rem",
          },
          step: {
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          },

          separator: {
            marginLeft: -15,
            marginRight: -15,
            marginTop: -15,
            height: 3,
          },
          stepBody: {
            marginLeft: 0,
            textAlign: "center",
          },
          stepLabel: {
            fontSize: "12px",
            fontWeight: 600,
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
          },
        }}
      >
        {steps.map((step: SectionConfig) => (
          <Stepper.Step
            key={step.id}
            label={step.title}
            icon={step.icon}
            completedIcon={<IconCheck size={16} />}
          />
        ))}
      </Stepper>

      {/* Current Form */}
      <Box style={{ flex: 1, overflow: "auto" }}>
        {CurrentFormComponent ? (
          <CurrentFormComponent cvId={cvId} />
        ) : (
          <Paper p="xl" withBorder>
            <Center>
              <Text c="dimmed">No sections selected</Text>
            </Center>
          </Paper>
        )}
      </Box>

      {/* Simplified Navigation - Remove separate navigation since forms handle it */}
      <Group justify="space-between" pt="md">
        <Button
          variant="default"
          leftSection={<IconArrowLeft size={16} />}
          onClick={prevStep}
          disabled={activeStep === 0}
        >
          Previous
        </Button>
        <Text size="sm" c="dimmed">
          Step {activeStep + 1} of {steps.length}
        </Text>
        <Button
          variant="default"
          rightSection={<IconArrowRight size={16} />}
          onClick={() =>
            setActiveStep((s) => Math.min(s + 1, steps.length - 1))
          }
          disabled={activeStep === steps.length - 1}
        >
          Next
        </Button>
      </Group>
    </Stack>
  );
};
