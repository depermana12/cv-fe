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
import { CVStackedPagesPreview } from "./CVStackedPagesPreview";

interface CVLivePreviewA4MultiPageProps {
  cvId?: number;
}

/**
 * CVLivePreviewA4MultiPage - Enhanced CV preview with stacked multi-page support
 *
 * Features:
 * - Stacked A4 papers with flowing content
 * - Content automatically flows from page to page
 * - Scroll to view additional pages (no pagination controls)
 * - Direct DOM measurement for overflow detection
 * - Maintains all existing functionality from CVLivePreviewA4
 * - Uses centralized useCVData hook for consistent data management
 */
export const CVLivePreviewA4MultiPage = ({
  cvId,
}: CVLivePreviewA4MultiPageProps) => {
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

  const actualCvId = cvId || activeCvId;
  const safeActiveCvId = actualCvId || 0;
  const cvData = useCVData(safeActiveCvId);

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

  // Early return after all hooks are called
  if (!actualCvId) {
    return (
      <CVStackedPagesPreview
        selectedSections={[]}
        renderSectionCallback={() => (
          <Stack
            gap="lg"
            align="center"
            justify="center"
            style={{ minHeight: "200px" }}
          >
            <Text c="dimmed">No CV selected</Text>
          </Stack>
        )}
      >
        <div />
      </CVStackedPagesPreview>
    );
  }

  if (hasError) {
    return (
      <CVStackedPagesPreview
        selectedSections={[]}
        renderSectionCallback={() => (
          <Alert
            icon={<IconExclamationCircle size="1rem" />}
            title="Error loading CV data"
            color="red"
          >
            There was an error loading your CV data. Please try refreshing the
            page.
          </Alert>
        )}
      >
        <div />
      </CVStackedPagesPreview>
    );
  }

  if (isLoading) {
    return (
      <CVStackedPagesPreview
        selectedSections={[]}
        renderSectionCallback={() => (
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
        )}
      >
        <div />
      </CVStackedPagesPreview>
    );
  }

  const contact = contacts.length > 0 ? contacts[0] : null;

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

  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "Present";
    const d = typeof date === "string" ? new Date(date) : date;
    if (!d || isNaN(d.getTime())) return "Present";
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  // Get section titles using the store
  const getTitle = (sectionType: string) => {
    if (!actualCvId) return sectionType;
    return getSectionTitle(actualCvId, sectionType as any);
  };

  // Enhanced section renderer with page awareness
  const renderSectionForPage = (sectionType: string, pageNumber: number) => {
    const sectionKey = `${sectionType}-page-${pageNumber}`;

    switch (sectionType) {
      case "contact":
        return contactDisplay ? (
          <Box key={sectionKey} style={{ textAlign: contactAlignment }}>
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
          <Box key={sectionKey}>
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("work")}
            </Title>
            {sectionDivider && <Divider color={headerColor} mb="xs" />}
            <Stack gap="xs">
              {works.map((job: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between">
                    <Text fw={600} size="sm">
                      {job.location && `${job.company} • ${job.location}`}
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
          <Box key={sectionKey}>
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
          <Box key={sectionKey}>
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
          <Box key={sectionKey}>
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
          <Box key={sectionKey}>
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
          <Box key={sectionKey}>
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
          <Box key={sectionKey}>
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

  // Fallback single-page content for initial measurement and when renderSectionCallback is not used
  const fallbackContent = (
    <Box
      style={{
        position: "relative",
        fontFamily: fontFamily,
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
        margin: `${margin}in`,
        // Ensure this container allows overflow for measurement
        overflow: "visible",
      }}
    >
      <Stack gap="xs">
        {selectedSections
          .map((sectionType) => renderSectionForPage(sectionType, 1))
          .filter(Boolean)
          .map((section, index) => (
            <Fragment key={index}>{section}</Fragment>
          ))}
      </Stack>
    </Box>
  );

  return (
    <CVStackedPagesPreview
      selectedSections={selectedSections}
      renderSectionCallback={renderSectionForPage}
    >
      {fallbackContent}
    </CVStackedPagesPreview>
  );
};
