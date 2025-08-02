import {
  Box,
  Title,
  Text,
  Stack,
  Group,
  Divider,
  Badge,
  Anchor,
  List,
} from "@mantine/core";
import { useCvStyleStore } from "@features/dashboard/cv/store/cvStyleStore";
import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { CvA4Preview } from "./CvA4Preview";
import { CvPaper } from "./CvPaper";

// Import all data hooks for direct query consumption
import { useContacts } from "../sections/contact/hooks/useContact";
import { useEducations } from "../sections/education/hooks/useEducations";
import { useWorks } from "../sections/work/hooks/useWorks";
import { useSkills } from "../sections/skill/hooks/useSkills";
import { useProjects } from "../sections/project/hooks/useProjects";
import { useOrganizations } from "../sections/organization/hooks/useOrganizations";
import { useCourses } from "../sections/course/hooks/useCourses";
import { useLanguages } from "../sections/language/hooks/useLanguages";

/**
 * CVLivePreviewA4 - A4-sized CV preview with direct query data consumption
 * - Uses direct query hooks for real-time data (no intermediate store)
 * - Integrates with cvStyleStore for theme support
 * - Automatically updates when queries refetch after mutations
 * - Simple and performant: single source of truth from server
 */
export const CVLivePreviewA4 = () => {
  const { activeCvId } = useCvStore();

  // Direct query consumption - single source of truth
  const { data: contacts = [] } = useContacts(activeCvId || 0);
  const { data: educations = [] } = useEducations(activeCvId || 0);
  const { data: works = [] } = useWorks(activeCvId || 0);
  const { data: skills = [] } = useSkills(activeCvId || 0);
  const { data: projects = [] } = useProjects(activeCvId || 0);
  const { data: organizations = [] } = useOrganizations(activeCvId || 0);
  const { data: courses = [] } = useCourses(activeCvId || 0);
  const { data: languages = [] } = useLanguages(activeCvId || 0);

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

  const { headerColor } = useCvStyleStore();
  const { getSectionTitle, selectedSections } = useCVSectionStore();

  // Helper function to format dates
  const formatDate = (date: string | Date | undefined): string => {
    if (!date) return "Present";
    const d = typeof date === "string" ? new Date(date) : date;
    if (!d || isNaN(d.getTime())) return "Present";
    return d.toLocaleString("en-US", { month: "short", year: "numeric" });
  };

  // Get section titles using the store, fallback to defaults if no active CV
  const getTitle = (sectionType: string) => {
    if (!activeCvId) return sectionType; // fallback
    return getSectionTitle(activeCvId, sectionType as any);
  };

  // Create section components mapping
  const renderSection = (sectionType: string) => {
    switch (sectionType) {
      case "contact":
        return contactDisplay ? (
          <Box key="contact">
            <Title order={1} size="h2" style={{ color: headerColor }}>
              {contactDisplay.fullName}
            </Title>
            <Group gap="xs" style={{ fontSize: "13px" }}>
              {contactDisplay.address && (
                <Text c="dimmed">{contactDisplay.address} •</Text>
              )}
              {contactDisplay.email && (
                <Text c="dimmed">{contactDisplay.email} •</Text>
              )}
              {contact?.phone && <Text c="dimmed">{contact.phone} •</Text>}

              {contactDisplay.linkedin && (
                <Anchor c="blue">
                  {contactDisplay.linkedin.replace(
                    /^(https?:\/\/)?(www\.)?/i,
                    "",
                  )}
                </Anchor>
              )}
              {contactDisplay.website && (
                <Anchor c="blue">
                  {contactDisplay.website.replace(
                    /^(https?:\/\/)?(www\.)?/i,
                    "",
                  )}
                </Anchor>
              )}
            </Group>
            <Text mt="xs">{contactDisplay.summary}</Text>
          </Box>
        ) : null;

      case "work":
        return works && works.length > 0 ? (
          <Box key="work">
            <Title order={3} size="h4" style={{ color: headerColor }}>
              {getTitle("work")}
            </Title>
            <Divider color="dark" mb="xs" />
            <Stack gap="md">
              {works.map((job: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
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
                    <List withPadding spacing="xs" size="sm" mt={2}>
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
            <Divider color="dark" mb="xs" />
            <Stack gap="md">
              {educations.map((edu: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {`${edu.degree.charAt(0).toUpperCase() + edu.degree.slice(1)}'s in ${edu.fieldOfStudy}`}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </Group>
                  <Text size="sm" c="dimmed">
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
              {projects.map((project: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {project.name}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(project.startDate)} -{" "}
                      {formatDate(project.endDate) || "Present"}
                    </Text>
                  </Group>
                  {(project.descriptions?.length > 0
                    ? project.descriptions.join(" • ")
                    : project.description) && (
                    <Text size="sm" style={{ lineHeight: 1.4 }}>
                      {project.descriptions?.length > 0
                        ? project.descriptions.join(" • ")
                        : project.description}
                    </Text>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <Group gap="xs" mt="xs">
                      {project.technologies.map(
                        (tech: string, techIndex: number) => (
                          <Badge key={techIndex} variant="outline" size="xs">
                            {tech}
                          </Badge>
                        ),
                      )}
                    </Group>
                  )}
                  {project.url && (
                    <Text size="xs" c="blue" mt="xs">
                      {project.url}
                    </Text>
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
            <Divider color="dark" mb="xs" />
            <Stack gap="md">
              {organizations.map((org: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {org.role} at {org.organization}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(org.startDate)} -{" "}
                      {formatDate(org.endDate) || "Present"}
                    </Text>
                  </Group>
                  {org.location && (
                    <Text size="xs" c="dimmed" mb="xs">
                      {org.location}
                    </Text>
                  )}
                  {org.descriptions && org.descriptions.length > 0 && (
                    <Text size="sm" style={{ lineHeight: 1.4 }}>
                      {org.descriptions.join(" • ")}
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
              {courses.map((course: any, index: number) => (
                <Box key={index}>
                  <Group justify="space-between" mb="xs">
                    <Text fw={600} size="sm">
                      {course.courseName || course.provider}
                    </Text>
                    <Text size="xs" c="dimmed">
                      {formatDate(course.startDate)} -{" "}
                      {formatDate(course.endDate)}
                    </Text>
                  </Group>
                  {course.provider && course.courseName && (
                    <Text size="sm" c="dimmed">
                      {course.provider}
                    </Text>
                  )}
                  {course.descriptions && course.descriptions.length > 0 && (
                    <Text size="sm" style={{ lineHeight: 1.4 }} mt="xs">
                      {course.descriptions.join(" • ")}
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
