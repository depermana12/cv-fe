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

interface CVContentEditorProps {
  // No props needed since we use cvStore internally
}

import { useEducations } from "../../education/hooks/useEducations";
import { useWorks } from "../../work/hooks/useWorks";
import { useSkills } from "../../skill/hooks/useSkills";
import { useProjects } from "../../project/hooks/useProjects";
import { useOrganizations } from "../../organization/hooks/useOrganizations";
import { useCourses } from "../../course/hooks/useCourses";
import { useLanguages } from "../../language/hooks/useLanguages";
import { useContacts } from "../../contact/hooks/useContact";

// Import multi-item section component
import { CVMultiItemSection } from "./CVMultiItemSection";
import { useCvStore } from "../../../store/cvStore";

interface SectionConfig {
  id: SectionType;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<{
    cvId: number;
  }>;
}

// Enhanced wrapper components that handle submit + next flow
const ContactFormWrapper = () => {
  const { activeCvId } = useCvStore();
  const cvId = activeCvId!;
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
      />
    </Stack>
  );
};

const EducationFormWrapper = () => {
  const { activeCvId: cvId } = useCvStore();
  const { data: educations = [] } = useEducations(cvId!);

  return (
    <CVMultiItemSection
      sectionTitle="Education"
      items={educations}
      FormComponent={EducationForm}
    />
  );
};

const WorkFormWrapper = () => {
  const { activeCvId: cvId } = useCvStore();
  const { data: works = [] } = useWorks(cvId!);

  return (
    <CVMultiItemSection
      sectionTitle="Work Experience"
      items={works}
      FormComponent={WorkForm}
    />
  );
};

const SkillFormWrapper = () => {
  const { activeCvId: cvId } = useCvStore();
  const { data: skills = [] } = useSkills(cvId!);

  return (
    <CVMultiItemSection
      sectionTitle="Skills"
      items={skills}
      FormComponent={SkillForm}
    />
  );
};

const ProjectFormWrapper = () => {
  const { activeCvId: cvId } = useCvStore();
  const { data: projects = [] } = useProjects(cvId!);

  return (
    <CVMultiItemSection
      sectionTitle="Projects"
      items={projects}
      FormComponent={ProjectForm}
    />
  );
};

const OrganizationFormWrapper = () => {
  const { activeCvId: cvId } = useCvStore();
  const { data: organizations = [] } = useOrganizations(cvId!);

  return (
    <CVMultiItemSection
      sectionTitle="Organizations"
      items={organizations}
      FormComponent={OrganizationForm}
    />
  );
};

const CourseFormWrapper = () => {
  const { activeCvId: cvId } = useCvStore();
  const { data: courses = [] } = useCourses(cvId!);

  return (
    <CVMultiItemSection
      sectionTitle="Courses"
      items={courses}
      FormComponent={CourseForm}
    />
  );
};

const LanguageFormWrapper = () => {
  const { activeCvId: cvId } = useCvStore();
  const { data: languages = [] } = useLanguages(cvId!);

  return (
    <CVMultiItemSection
      sectionTitle="Languages"
      items={languages}
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

export const CVContentEditor = ({}: CVContentEditorProps) => {
  const { activeCvId } = useCvStore();
  const cvId = activeCvId!;
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
