import React, { useState, useEffect } from "react";
import {
  Box,
  Stepper,
  Group,
  Stack,
  Text,
  Paper,
  Center,
  Title,
  Button,
  Accordion,
} from "@mantine/core";

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

import { CVMultiItemSection } from "./CVMultiItemSection";

interface SectionConfig {
  id: SectionType;
  title: string;
  component: React.ComponentType<{
    cvId: number;
  }>;
}

interface CVContentEditorProps {
  cvId: number;
}

const ContactFormWrapper = ({ cvId }: { cvId: number }) => {
  const { data: contacts = [] } = useContacts(cvId);
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);

  return (
    <Stack gap={0}>
      <Title order={4}>Contact Information</Title>

      {/* Contact form in accordion */}
      <Accordion
        value={isAccordionOpen ? "contact-form" : null}
        onChange={() => setIsAccordionOpen(!isAccordionOpen)}
        variant="default"
        chevronPosition="left"
        styles={{
          content: {
            paddingLeft: "0px",
            paddingRight: "0px",
          },
          control: {
            "&:hover": {
              backgroundColor: "transparent",
            },
          },
          label: {
            "&:hover": {
              textDecoration: "underline",
            },
          },
        }}
      >
        <Accordion.Item value="contact-form">
          <Accordion.Control>
            <Text size="sm">
              {contacts.length > 0
                ? "Edit Contact Information"
                : "Add Contact Information"}
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <ContactForm cvId={cvId} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
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
    component: ContactFormWrapper,
  },
  education: {
    id: "education",
    title: "Education",
    component: EducationFormWrapper,
  },
  work: {
    id: "work",
    title: "Work",
    component: WorkFormWrapper,
  },
  skill: {
    id: "skill",
    title: "Skills",
    component: SkillFormWrapper,
  },
  project: {
    id: "project",
    title: "Projects",
    component: ProjectFormWrapper,
  },
  organization: {
    id: "organization",
    title: "Organizations",
    component: OrganizationFormWrapper,
  },
  course: {
    id: "course",
    title: "Courses",
    component: CourseFormWrapper,
  },
  language: {
    id: "language",
    title: "Languages",
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

  return (
    <Stack gap="lg" p="md">
      {/* Stepper with integrated navigation */}
      <Box>
        <Group align="flex-start" gap="md">
          <Box style={{ flex: 1 }}>
            <Stepper
              active={activeStep}
              onStepClick={setActiveStep}
              size="xs"
              color="blue"
              styles={{
                steps: {
                  display: "flex",
                  justifyContent: "space-between",
                },
                step: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                },
                stepIcon: {
                  width: "24px",
                  height: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                },
                separator: {
                  marginLeft: -25,
                  marginRight: -25,
                  marginTop: -12,
                  height: 2,
                },
                stepBody: {
                  marginLeft: 0,
                  textAlign: "center",
                },
                stepLabel: {
                  fontSize: "12px",
                  fontWeight: 500,
                  textAlign: "center",
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                  maxWidth: "80px",
                },
              }}
            >
              {steps.map((step: SectionConfig) => (
                <Stepper.Step key={step.id} label={step.title} />
              ))}
            </Stepper>
          </Box>

          {/* Navigation hint beside stepper */}
          <Stack gap={1} align="center">
            {activeStep > 0 && (
              <Button
                size="xs"
                variant="light"
                style={{ cursor: "pointer" }}
                onClick={() => setActiveStep(activeStep - 1)}
              >
                Prev
              </Button>
            )}
            {activeStep < steps.length - 1 && (
              <Button
                size="xs"
                variant="light"
                style={{ cursor: "pointer" }}
                onClick={() => setActiveStep(activeStep + 1)}
              >
                Next
              </Button>
            )}
          </Stack>
        </Group>
      </Box>

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
    </Stack>
  );
};
