import { Box, Title, Text, Stack, Group, Divider, Badge } from "@mantine/core";
import { useCVPreviewData } from "@features/dashboard/cv/hooks/useCVFormIntegration";
import { useCvStyleStore } from "@features/dashboard/cv/store/cvStyleStore";
import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { CvA4Preview } from "./CvA4Preview";
import { CvPaper } from "./CvPaper";

/**
 * CVLivePreviewA4 - A4-sized CV preview with real scaling
 * - Uses CvA4Preview for scaling container
 * - Uses CvPaper for A4 paper layout
 * - Integrates with cvStyleStore for theme support
 * - Automatically updates when form data changes
 */
export const CVLivePreviewA4 = () => {
  const {
    contact,
    education,
    work,
    skills,
    projects,
    organizations,
    courses,
    languages,
  } = useCVPreviewData();

  const { headerColor } = useCvStyleStore();
  const { activeCvId } = useCvStore();
  const { getSectionTitle, selectedSections } = useCVSectionStore();

  // Get section titles using the store, fallback to defaults if no active CV
  const getTitle = (sectionType: string) => {
    if (!activeCvId) return sectionType; // fallback
    return getSectionTitle(activeCvId, sectionType as any);
  };

  // Create section components mapping
  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case "contact":
        return (
          <Box key="contact">
            <Title order={1} size="h2" style={{ color: headerColor }}>
              {contact?.fullName}
            </Title>
            <Group gap="lg" style={{ fontSize: "13px" }}>
              {contact?.email && <Text c="dimmed">{contact.email}</Text>}
              {contact?.phone && <Text c="dimmed">{contact.phone}</Text>}
              {contact?.address && <Text c="dimmed">{contact.address}</Text>}
            </Group>
            <Group gap="md" style={{ fontSize: "12px" }}>
              {contact?.linkedin && <Text c="blue">{contact.linkedin}</Text>}
              {contact?.website && <Text c="blue">{contact.website}</Text>}
              {contact?.github && <Text c="blue">{contact.github}</Text>}
            </Group>
            <Text mt="xs">{contact?.summary}</Text>
          </Box>
        );

      case "work":
        return work && work.length > 0 ? (
          <Box key="work">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("work")}
            </Title>
            <Divider color="dark" mb="xs" />
            <Stack gap="md">
              {work.map((job, index) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {job.position} at {job.company}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {job.startDate} -{" "}
                      {job.endDate || (job.current ? "Present" : "N/A")}
                    </Text>
                  </Group>
                  {job.location && (
                    <Text size="xs" c="dimmed" mb="xs">
                      {job.location}
                    </Text>
                  )}
                  {job.description && (
                    <Text size="sm" style={{ lineHeight: 1.4 }}>
                      {job.description}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null;

      case "education":
        return education && education.length > 0 ? (
          <Box key="education">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("education")}
            </Title>
            <Divider color="dark" mb="xs" />
            <Stack gap="md">
              {education.map((edu, index) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {edu.startDate} - {edu.endDate || "Present"}
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {edu.institution}
                    {edu.location && ` • ${edu.location}`}
                  </Text>
                  {edu.gpa && (
                    <Text size="xs" c="dimmed">
                      GPA: {edu.gpa}
                    </Text>
                  )}
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
            <Divider color="dark" mb="xs" />
            <Group gap="xs">
              {skills.map((skill, index) => (
                <Badge key={index} variant="light" size="sm">
                  {skill.name}
                </Badge>
              ))}
            </Group>
          </Box>
        ) : null;

      case "project":
        return projects && projects.length > 0 ? (
          <Box key="project">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("project")}
            </Title>
            <Divider color="dark" mb="xs" />
            <Stack gap="md">
              {projects.map((project, index) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {project.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {project.startDate} - {project.endDate || "Present"}
                    </Text>
                  </Group>
                  {project.description && (
                    <Text size="sm" style={{ lineHeight: 1.4 }}>
                      {project.description}
                    </Text>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <Group gap="xs" mt="xs">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" size="xs">
                          {tech}
                        </Badge>
                      ))}
                    </Group>
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
            <Divider color="dark" mb="xs" />
            <Group gap="md">
              {languages.map((lang, index) => (
                <Text key={index} size="sm">
                  <Text component="span" fw={500}>
                    {lang.name}
                  </Text>
                  {lang.proficiency && (
                    <Text component="span" c="dimmed">
                      {" "}
                      - {lang.proficiency}
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
            <Divider color="dark" mb="xs" />
            <Stack gap="md">
              {organizations.map((org, index) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {org.role} at {org.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {org.startDate} - {org.endDate || "Present"}
                    </Text>
                  </Group>
                  {org.description && (
                    <Text size="sm" style={{ lineHeight: 1.4 }}>
                      {org.description}
                    </Text>
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
            <Divider color="dark" mb="xs" />
            <Stack gap="md">
              {courses.map((course, index) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {course.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {course.date}
                    </Text>
                  </Group>
                  {course.provider && (
                    <Text size="sm" c="dimmed">
                      {course.provider}
                    </Text>
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
        <Stack gap="lg">
          {selectedSections
            .map((sectionType) => renderSection(sectionType))
            .filter(Boolean)}
        </Stack>
      </CvPaper>
    </CvA4Preview>
  );
};
