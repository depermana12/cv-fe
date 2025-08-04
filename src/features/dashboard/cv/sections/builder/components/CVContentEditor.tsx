import React, { useState, useEffect } from "react";
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

import { CVMultiItemSection } from "./CVMultiItemSection";

interface SectionConfig {
  id: SectionType;
  title: string;
  icon: React.ReactNode;
  component: React.ComponentType<{
    cvId: number;
  }>;
}

interface CVContentEditorProps {
  cvId: number;
}

// Enhanced wrapper components that handle submit + next flow
const ContactFormWrapper = ({ cvId }: { cvId: number }) => {
  return (
    <Stack gap="md">
      <Title order={4}>Contact Information</Title>
      <ContactForm cvId={cvId} />
    </Stack>
  );
};

const EducationFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: educations = [] } = useEducations(cvId);

  return (
    <CVMultiItemSection
      sectionType="education"
      sectionTitle="Education"
      items={educations}
      FormComponent={EducationForm}
    />
  );
};

const WorkFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: works = [] } = useWorks(cvId);

  return (
    <CVMultiItemSection
      sectionType="work"
      sectionTitle="Work Experience"
      items={works}
      FormComponent={WorkForm}
    />
  );
};

const SkillFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: skills = [] } = useSkills(cvId);

  return (
    <CVMultiItemSection
      sectionType="skill"
      sectionTitle="Skills"
      items={skills}
      FormComponent={SkillForm}
    />
  );
};

const ProjectFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: projects = [] } = useProjects(cvId);

  return (
    <CVMultiItemSection
      sectionType="project"
      sectionTitle="Projects"
      items={projects}
      FormComponent={ProjectForm}
    />
  );
};

const OrganizationFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: organizations = [] } = useOrganizations(cvId);

  return (
    <CVMultiItemSection
      sectionType="organization"
      sectionTitle="Organizations"
      items={organizations}
      FormComponent={OrganizationForm}
    />
  );
};

const CourseFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: courses = [] } = useCourses(cvId);

  return (
    <CVMultiItemSection
      sectionType="course"
      sectionTitle="Courses"
      items={courses}
      FormComponent={CourseForm}
    />
  );
};

const LanguageFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: languages = [] } = useLanguages(cvId);

  return (
    <CVMultiItemSection
      sectionType="language"
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

export const CVContentEditor = ({ cvId }: CVContentEditorProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const { selectedSections } = useCVSectionStore();

  // Create steps from selected sections
  const steps = selectedSections
    .map((sectionId: SectionType) => SECTION_CONFIG[sectionId])
    .filter(Boolean);

  // Reset activeStep when sections change to prevent out-of-bounds access
  useEffect(() => {
    if (activeStep >= steps.length && steps.length > 0) {
      setActiveStep(0);
    }
  }, [steps.length, activeStep]);

  const prevStep = () => setActiveStep((current) => Math.max(current - 1, 0));

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
        {steps.length === 0 ? (
          <Paper p="xl" withBorder>
            <Center>
              <Text c="dimmed">No sections selected</Text>
            </Center>
          </Paper>
        ) : (
          <div key={`step-${activeStep}`}>
            {/* FIXED: Always render all wrapper components to maintain hook order */}
            {/* Only show the active one, but call all hooks consistently */}
            {steps.map((step, index) => (
              <div
                key={step.id}
                style={{ display: index === activeStep ? "block" : "none" }}
              >
                {React.createElement(step.component, { cvId })}
              </div>
            ))}
          </div>
        )}
      </Box>

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
