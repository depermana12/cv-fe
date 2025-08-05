import { Fragment } from "react";
import {
  Box,
  Title,
  Text,
  Stack,
  Group,
  Divider,
  Anchor,
  List,
  LoadingOverlay,
  Alert,
} from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useCvStyleStore } from "@features/dashboard/cv/store/cvStyleStore";
import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { useCVData } from "../hooks/useCVData";
import { CvA4Preview } from "./CvA4Preview";
import { CvPaper } from "./CvPaper";

interface CVLivePreviewA4Props {
  cvId?: number;
}

/**
 * REFACTORED: CVLivePreviewA4 using centralized useCVData hook
 *
 * Before: 11 individual hooks called separately
 * After: 4 hooks with centralized data management
 *
 * Benefits:
 * - Reduced from 11 hooks to 4 hooks (63% reduction)
 * - Consistent loading state across all sections
 * - Better error handling
 * - Simplified component logic
 * - Performance improvements through coordinated data fetching
 */
export const CVLivePreviewA4 = ({ cvId }: CVLivePreviewA4Props) => {
  // Store hooks (these remain the same)
  const { activeCvId } = useCvStore();
  const {
    headerColor,
    fontFamily,
    fontSize,
    lineHeight,
    contactAlignment,
    margin,
    sectionDivider,
  } = useCvStyleStore();
  const { getSectionTitle, selectedSections } = useCVSectionStore();

  // SINGLE centralized data hook replaces 8 individual data hooks
  const actualCvId = cvId || activeCvId;
  const safeActiveCvId = actualCvId || 0;

  const cvData = useCVData(safeActiveCvId);

  // Destructure data for better DX
  const {
    data: {
      contacts,
      educations,
      works,
      skills,
      projects,
      organizations,
      courses,
      languages,
    },
    isLoading,
    hasError,
  } = cvData;

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
  if (hasError) {
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
  if (isLoading) {
    return (
      <CvA4Preview>
        <CvPaper>
          <Box style={{ position: "relative", minHeight: "400px" }}>
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
          </Box>
        </CvPaper>
      </CvA4Preview>
    );
  }

  // Get contact data (single item)
  const contact = contacts.length > 0 ? contacts[0] : null;

  // Transform contact data for display
  const contactDisplay = contact
    ? {
        fullName:
          contact.firstName && contact.lastName
            ? `${contact.firstName} ${contact.lastName}`.trim()
            : contact.firstName || contact.lastName || "",
        email: contact.email,
        phone: contact.phone,
        address: [contact.city, contact.country].filter(Boolean).join(", "),
        linkedin: contact.linkedin,
        website: contact.website,
        summary: contact.summary,
      }
    : null;

  // Helper function to format dates
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "Present";
    const d = typeof date === "string" ? new Date(date) : date;
    if (!d || isNaN(d.getTime())) return "Present";
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  // Get section titles using the store, fallback to defaults if no active CV
  const getTitle = (sectionType: string) => {
    if (!actualCvId) return sectionType; // fallback
    return getSectionTitle(actualCvId, sectionType as any);
  };

  // Create section components mapping
  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case "contact":
        return contactDisplay ? (
          <Box key="contact" style={{ textAlign: contactAlignment }}>
            <Title order={1} size="h2" style={{ color: headerColor }}>
              {contactDisplay.fullName}
            </Title>
            <Group
              gap="xs"
              style={{
                justifyContent:
                  contactAlignment === "center" ? "center" : "flex-start",
              }}
            >
              {contactDisplay.address && (
                <Text c="dimmed" size="sm">
                  {contactDisplay.address} •
                </Text>
              )}
              {contactDisplay.email && (
                <Text c="dimmed" size="sm">
                  {contactDisplay.email} •
                </Text>
              )}
              {contact?.phone && (
                <Text c="dimmed" size="sm">
                  {contact.phone} •
                </Text>
              )}

              {contactDisplay.linkedin && (
                <Anchor c="blue">
                  {contactDisplay.linkedin.replace(
                    /^(https?:\/\/)?(www\.)?/i,
                    "",
                  )}
                </Anchor>
              )}
              {contactDisplay.website && (
                <Anchor c="blue" size="sm">
                  {contactDisplay.website.replace(
                    /^(https?:\/\/)?(www\.)?/i,
                    "",
                  )}
                </Anchor>
              )}
            </Group>
            <Text mt="xs" size="sm">
              {contactDisplay.summary}
            </Text>
          </Box>
        ) : null;

      case "work":
        return works && works.length > 0 ? (
          <Box key="work">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("work")}
            </Title>
            {sectionDivider && <Divider color={headerColor} mb="xs" />}
            <Stack gap="xs">
              {works.map((job: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between">
                    <Text fw={600} size="sm">
                      {job.location && ` ${job.company} • ${job.location}`}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(job.startDate)} -{" "}
                      {formatDate(job.endDate) ||
                        (job.isCurrent ? "Present" : "N/A")}
                    </Text>
                  </Group>

                  <Text fw={600} size="sm">
                    {job.position}
                  </Text>

                  {Array.isArray(job.descriptions) &&
                  job.descriptions.length > 0 ? (
                    <List withPadding spacing={1} size="sm">
                      {job.descriptions.map((desc: string, i: number) => (
                        <List.Item key={i}>{desc}</List.Item>
                      ))}
                    </List>
                  ) : (
                    job.description && <Text size="sm">{job.description}</Text>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null;

      case "education":
        return educations && educations.length > 0 ? (
          <Box key="education">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("education")}
            </Title>
            {sectionDivider && <Divider color={headerColor} mb="xs" />}
            <Stack gap="xs">
              {educations.map((edu: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between">
                    <Text fw={600} size="sm">
                      {`${edu.degree.charAt(0).toUpperCase() + edu.degree.slice(1)}'s in ${edu.fieldOfStudy}`}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </Group>
                  <Text size="sm">
                    {edu.institution}
                    {edu.location &&
                      edu.gpa &&
                      ` • ${edu.location} • GPA: ${edu.gpa}`}
                  </Text>

                  {edu.description && (
                    <Text size="sm" style={{ lineHeight: 1.4 }} mt="xs">
                      {edu.description}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null;

      case "skill":
        return skills && skills.length > 0 ? (
          <Box key="skill">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("skill")}
            </Title>
            {sectionDivider && <Divider color={headerColor} mb="xs" />}
            <Stack gap={0}>
              {skills.map((skillCategory, index) => (
                <Stack key={index} gap={0}>
                  <Group gap="xs">
                    <Text size="sm" fw={600}>
                      {skillCategory.category}:{" "}
                    </Text>
                    {skillCategory.skill.map((skillName, skillIndex) => (
                      <Text key={skillIndex} size="sm">
                        {skillName.trim()}
                        {skillIndex < skillCategory.skill.length - 1 && ","}
                      </Text>
                    ))}
                  </Group>
                </Stack>
              ))}
            </Stack>
          </Box>
        ) : null;

      case "project":
        return projects && projects.length > 0 ? (
          <Box key="project">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("project")}
            </Title>
            {sectionDivider && <Divider color={headerColor} mb="xs" />}
            <Stack gap="xs">
              {projects.map((project: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between">
                    <Text fw={600} size="sm">
                      {project.name}
                      {project.url && (
                        <Text component="span" c="blue" size="sm">
                          {" "}
                          •{" "}
                          {project.url.replace(/^(https?:\/\/)?(www\.)?/i, "")}
                        </Text>
                      )}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(project.startDate)} -{" "}
                      {formatDate(project.endDate) || "Present"}
                    </Text>
                  </Group>

                  {project.technologies && project.technologies.length > 0 && (
                    <Text fw={500} size="sm" c="dimmed">
                      Technologies: {project.technologies.join(", ")}
                    </Text>
                  )}

                  {Array.isArray(project.descriptions) &&
                  project.descriptions.length > 0 ? (
                    <List withPadding spacing={1} size="sm">
                      {project.descriptions.map((desc: string, i: number) => (
                        <List.Item key={i}>{desc}</List.Item>
                      ))}
                    </List>
                  ) : (
                    project.description && (
                      <Text size="sm">{project.description}</Text>
                    )
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null;

      case "language":
        return languages && languages.length > 0 ? (
          <Box key="language">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("language")}
            </Title>
            <Divider color={headerColor} mb="xs" />
            <Group gap="md">
              {languages.map((lang: any, index: number) => (
                <Text key={index} size="sm">
                  <Text component="span" fw={500}>
                    {lang.language}
                  </Text>
                  {lang.fluency && (
                    <Text component="span" c="dimmed">
                      {" "}
                      - {lang.fluency}
                    </Text>
                  )}
                </Text>
              ))}
            </Group>
          </Box>
        ) : null;

      case "organization":
        return organizations && organizations.length > 0 ? (
          <Box key="organization">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("organization")}
            </Title>
            {sectionDivider && <Divider color={headerColor} mb="xs" />}
            <Stack gap="xs">
              {organizations.map((org: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between">
                    <Text fw={600} size="sm">
                      {org.organization}
                      {org.location && (
                        <Text component="span" c="dimmed" size="sm">
                          {" "}
                          • {org.location}
                        </Text>
                      )}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(org.startDate)} -{" "}
                      {formatDate(org.endDate) || "Present"}
                    </Text>
                  </Group>

                  <Text fw={600} size="sm">
                    {org.role}
                  </Text>

                  {Array.isArray(org.descriptions) &&
                  org.descriptions.length > 0 ? (
                    <List withPadding spacing={1} size="sm">
                      {org.descriptions.map((desc: string, i: number) => (
                        <List.Item key={i}>{desc}</List.Item>
                      ))}
                    </List>
                  ) : (
                    org.description && <Text size="sm">{org.description}</Text>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null;

      case "course":
        return courses && courses.length > 0 ? (
          <Box key="course">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("course")}
            </Title>
            {sectionDivider && <Divider color={headerColor} mb="xs" />}
            <Stack gap="xs">
              {courses.map((course: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between">
                    <Text fw={600} size="sm">
                      {course.provider}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(course.startDate)} -{" "}
                      {formatDate(course.endDate)}
                    </Text>
                  </Group>

                  <Text fw={600} size="sm">
                    {course.courseName}
                  </Text>

                  {Array.isArray(course.descriptions) &&
                  course.descriptions.length > 0 ? (
                    <List withPadding spacing={1} size="sm">
                      {course.descriptions.map((desc: string, i: number) => (
                        <List.Item key={i}>{desc}</List.Item>
                      ))}
                    </List>
                  ) : (
                    course.description && (
                      <Text size="sm">{course.description}</Text>
                    )
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null;

      default:
        return null;
    }
  };

  return (
    <CvA4Preview>
      <CvPaper>
        <Box
          style={{
            position: "relative",
            fontFamily: fontFamily,
            fontSize: `${fontSize}px`,
            lineHeight: lineHeight,
            margin: `${margin}in`,
          }}
        >
          <Stack gap="xs">
            {selectedSections
              .map((sectionType) => renderSection(sectionType))
              .filter(Boolean)
              .map((section, index) => (
                <Fragment key={index}>{section}</Fragment>
              ))}
          </Stack>
        </Box>
      </CvPaper>
    </CvA4Preview>
  );
};
