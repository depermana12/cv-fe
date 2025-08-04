import React from "react";
import { Stack, Paper, Text, Group, Divider } from "@mantine/core";
import { PublicCv } from "../types/types";

interface PublicCvPreviewProps {
  cv: PublicCv;
}

export const PublicCvPreview: React.FC<PublicCvPreviewProps> = ({ cv }) => {
  return (
    <Paper
      p="xl"
      radius="md"
      withBorder
      style={{
        minHeight: "842px", // A4 height ratio
        maxWidth: "595px", // A4 width ratio
        margin: "0 auto",
        backgroundColor: "white",
      }}
    >
      <Stack gap="lg">
        {/* Contact Section */}
        {cv.contacts && cv.contacts.length > 0 && (
          <Stack gap="sm">
            <div style={{ textAlign: "center" }}>
              <Text size="xl" fw={700}>
                {cv.contacts[0].firstName} {cv.contacts[0].lastName}
              </Text>
              <Group justify="center" gap="md" mt="xs">
                <Text size="sm">{cv.contacts[0].email}</Text>
                {cv.contacts[0].phone && (
                  <Text size="sm">{cv.contacts[0].phone}</Text>
                )}
              </Group>
              {(cv.contacts[0].city || cv.contacts[0].country) && (
                <Text size="sm" c="dimmed">
                  {[cv.contacts[0].city, cv.contacts[0].country]
                    .filter(Boolean)
                    .join(", ")}
                </Text>
              )}
              {cv.contacts[0].summary && (
                <Text size="sm" mt="sm">
                  {cv.contacts[0].summary}
                </Text>
              )}
            </div>
            <Divider />
          </Stack>
        )}

        {/* Work Experience Section */}
        {cv.works && cv.works.length > 0 && (
          <Stack gap="sm">
            <Text size="lg" fw={600}>
              Work Experience
            </Text>
            {cv.works.map((work) => (
              <div key={work.id}>
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text fw={500}>{work.position}</Text>
                    <Text size="sm" c="blue">
                      {work.company}
                    </Text>
                  </div>
                  <Text size="sm" c="dimmed">
                    {work.startDate
                      ? new Date(work.startDate).getFullYear()
                      : ""}{" "}
                    -{" "}
                    {work.endDate
                      ? new Date(work.endDate).getFullYear()
                      : "Present"}
                  </Text>
                </Group>
                {work.descriptions && work.descriptions.length > 0 && (
                  <Text size="sm" mt="xs">
                    {work.descriptions[0]}
                  </Text>
                )}
              </div>
            ))}
            <Divider />
          </Stack>
        )}

        {/* Education Section */}
        {cv.educations && cv.educations.length > 0 && (
          <Stack gap="sm">
            <Text size="lg" fw={600}>
              Education
            </Text>
            {cv.educations.map((education) => (
              <div key={education.id}>
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text fw={500}>{education.degree}</Text>
                    <Text size="sm" c="blue">
                      {education.institution}
                    </Text>
                    {education.fieldOfStudy && (
                      <Text size="sm" c="dimmed">
                        {education.fieldOfStudy}
                      </Text>
                    )}
                  </div>
                  <Text size="sm" c="dimmed">
                    {education.startDate
                      ? new Date(education.startDate).getFullYear()
                      : ""}{" "}
                    -{" "}
                    {education.endDate
                      ? new Date(education.endDate).getFullYear()
                      : "Present"}
                  </Text>
                </Group>
                {education.description && (
                  <Text size="sm" mt="xs">
                    {education.description}
                  </Text>
                )}
              </div>
            ))}
            <Divider />
          </Stack>
        )}

        {/* Skills Section */}
        {cv.skills && cv.skills.length > 0 && (
          <Stack gap="md">
            <Text size="lg" fw={600}>
              Skills
            </Text>
            {cv.skills.map((skillCategory) => (
              <Stack key={skillCategory.id} gap="xs">
                <Text size="md" fw={500}>
                  {skillCategory.category}
                </Text>
                <Group gap="xs">
                  {skillCategory.skill.map((skillName, index) => (
                    <Text
                      key={index}
                      size="sm"
                      px="xs"
                      py={4}
                      style={{
                        backgroundColor: "#f1f3f4",
                        borderRadius: "4px",
                      }}
                    >
                      {skillName}
                    </Text>
                  ))}
                </Group>
              </Stack>
            ))}
            <Divider />
          </Stack>
        )}

        {/* Projects Section */}
        {cv.projects && cv.projects.length > 0 && (
          <Stack gap="sm">
            <Text size="lg" fw={600}>
              Projects
            </Text>
            {cv.projects.map((project) => (
              <div key={project.id}>
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text fw={500}>{project.name}</Text>
                  </div>
                  <Text size="sm" c="dimmed">
                    {project.startDate
                      ? new Date(project.startDate).getFullYear()
                      : ""}{" "}
                    -{" "}
                    {project.endDate
                      ? new Date(project.endDate).getFullYear()
                      : "Present"}
                  </Text>
                </Group>
                {project.descriptions && project.descriptions.length > 0 && (
                  <Text size="sm" mt="xs">
                    {project.descriptions[0]}
                  </Text>
                )}
                {project.url && (
                  <Text
                    size="sm"
                    c="blue"
                    component="a"
                    href={project.url}
                    target="_blank"
                  >
                    View Project
                  </Text>
                )}
              </div>
            ))}
            <Divider />
          </Stack>
        )}

        {/* Languages Section */}
        {cv.languages && cv.languages.length > 0 && (
          <Stack gap="sm">
            <Text size="lg" fw={600}>
              Languages
            </Text>
            <Group gap="md">
              {cv.languages.map((language) => (
                <Group key={language.id} gap="xs">
                  <Text size="sm">{language.language}</Text>
                  <Text size="sm" c="dimmed">
                    ({language.fluency || "Fluent"})
                  </Text>
                </Group>
              ))}
            </Group>
            <Divider />
          </Stack>
        )}

        {/* Organizations Section */}
        {cv.organizations && cv.organizations.length > 0 && (
          <Stack gap="sm">
            <Text size="lg" fw={600}>
              Organizations
            </Text>
            {cv.organizations.map((org) => (
              <div key={org.id}>
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text fw={500}>{org.role}</Text>
                    <Text size="sm" c="blue">
                      {org.organization}
                    </Text>
                  </div>
                  <Text size="sm" c="dimmed">
                    {org.startDate ? new Date(org.startDate).getFullYear() : ""}{" "}
                    -{" "}
                    {org.endDate
                      ? new Date(org.endDate).getFullYear()
                      : "Present"}
                  </Text>
                </Group>
                {org.descriptions && org.descriptions.length > 0 && (
                  <Text size="sm" mt="xs">
                    {org.descriptions[0]}
                  </Text>
                )}
              </div>
            ))}
            <Divider />
          </Stack>
        )}

        {/* Courses Section */}
        {cv.courses && cv.courses.length > 0 && (
          <Stack gap="sm">
            <Text size="lg" fw={600}>
              Courses & Certifications
            </Text>
            {cv.courses.map((course) => (
              <div key={course.id}>
                <Group justify="space-between" align="flex-start">
                  <div>
                    <Text fw={500}>{course.courseName || "Course"}</Text>
                    <Text size="sm" c="blue">
                      {course.provider}
                    </Text>
                  </div>
                  <Text size="sm" c="dimmed">
                    {course.endDate
                      ? new Date(course.endDate).getFullYear()
                      : ""}
                  </Text>
                </Group>
                {course.descriptions && course.descriptions.length > 0 && (
                  <Text size="sm" mt="xs">
                    {course.descriptions[0]}
                  </Text>
                )}
              </div>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
