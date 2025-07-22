import {
  Stack,
  Paper,
  Text,
  Title,
  Group,
  Badge,
  Divider,
  List,
  Anchor,
  Grid,
  Skeleton,
} from "@mantine/core";
import {
  IconWorld,
  IconBriefcase,
  IconSchool,
  IconCode,
  IconFolderCode,
} from "@tabler/icons-react";
import { useEducations } from "../sections/education/hooks/useEducations";
import { useWorks } from "../sections/work/hooks/useWorks";
import { useProjects } from "../sections/project/hooks/useProjects";
import { useSkills } from "../sections/skill/hooks/useSkills";
import { Education } from "../sections/education/types/education.types";
import { Work } from "../sections/work/types/work.types";
import { Project } from "../sections/project/types/project.types";
import { Skill } from "../sections/skill/types/skill.types";

interface CVPreviewContentProps {
  cvId: number;
}

const CVPreviewContent = ({ cvId }: CVPreviewContentProps) => {
  const { data: educations = [], isLoading: educationsLoading } =
    useEducations(cvId);
  const { data: works = [], isLoading: worksLoading } = useWorks(cvId);
  const { data: projects = [], isLoading: projectsLoading } = useProjects(cvId);
  const { data: skills = [], isLoading: skillsLoading } = useSkills(cvId);
  const isLoading =
    educationsLoading || worksLoading || projectsLoading || skillsLoading;

  if (isLoading) {
    return <CVPreviewSkeleton />;
  }

  return (
    <Paper
      p="xl"
      radius="md"
      withBorder
      style={{
        maxWidth: "210mm", // A4 width
        margin: "0 auto",
        minHeight: "297mm", // A4 height
        backgroundColor: "white",
        color: "black",
        fontFamily: "Georgia, serif",
      }}
      styles={{
        root: {
          "@media print": {
            border: "none",
            boxShadow: "none",
            margin: 0,
            padding: "0.5in",
            maxWidth: "none",
            width: "100%",
            height: "auto",
            minHeight: "auto",
          },
        },
      }}
    >
      <Stack gap="lg">
        {/* Header Section */}

        {/* Work Experience */}
        {works.length > 0 && (
          <>
            <Divider mt="lg" />
            <Stack gap="md">
              <Group gap="xs">
                <IconBriefcase size={20} />
                <Title order={3} c="dark.8">
                  Work Experience
                </Title>
              </Group>
              <Stack gap="lg">
                {" "}
                {works.map((work: Work) => (
                  <Stack key={work.id} gap="xs">
                    <Group justify="space-between">
                      <Stack gap={2}>
                        <Text fw={600} size="md">
                          {work.position}
                        </Text>
                        <Text fw={500} size="sm" c="dark.6">
                          {work.company}
                        </Text>
                      </Stack>
                      <Stack gap={2} align="flex-end">
                        <Text size="sm" c="dark.7">
                          {new Date(work.startDate).toLocaleDateString()} -{" "}
                          {work.endDate
                            ? new Date(work.endDate).toLocaleDateString()
                            : "Present"}
                        </Text>
                      </Stack>
                    </Group>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </>
        )}

        {/* Education */}
        {educations.length > 0 && (
          <>
            <Divider mt="lg" />
            <Stack gap="md">
              <Group gap="xs">
                <IconSchool size={20} />
                <Title order={3} c="dark.8">
                  Education
                </Title>
              </Group>
              <Stack gap="lg">
                {educations.map((education: Education) => (
                  <Group key={education.id} justify="space-between">
                    <Stack gap={2}>
                      <Text fw={600} size="md">
                        {education.degree}
                      </Text>
                      <Text fw={500} size="sm" c="dark.6">
                        {education.institution}
                      </Text>
                      {education.fieldOfStudy && (
                        <Text size="sm" c="dark.7">
                          {education.fieldOfStudy}
                        </Text>
                      )}
                      {education.gpa && (
                        <Text size="sm" c="dark.7">
                          GPA: {education.gpa}
                        </Text>
                      )}
                    </Stack>
                    <Stack gap={2} align="flex-end">
                      <Text size="sm" c="dark.7">
                        {new Date(education.startDate).toLocaleDateString()} -{" "}
                        {new Date(education.endDate).toLocaleDateString()}
                      </Text>
                    </Stack>
                  </Group>
                ))}
              </Stack>
            </Stack>
          </>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <>
            <Divider mt="lg" />
            <Stack gap="md">
              <Group gap="xs">
                <IconFolderCode size={20} />
                <Title order={3} c="dark.8">
                  Projects
                </Title>
              </Group>
              <Stack gap="lg">
                {" "}
                {projects.map((project: Project) => (
                  <Stack key={project.id} gap="xs">
                    <Group justify="space-between">
                      <Text fw={600} size="md">
                        {project.name}
                      </Text>
                      {project.url && (
                        <Anchor href={project.url} target="_blank" size="sm">
                          <IconWorld size={14} />
                        </Anchor>
                      )}
                    </Group>
                    {project.description && (
                      <Text size="sm" lh={1.5} style={{ textAlign: "justify" }}>
                        {project.description}
                      </Text>
                    )}
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <Group gap="xs">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant="light" size="sm">
                              {tech.technology}
                            </Badge>
                          ))}
                        </Group>
                      )}
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </>
        )}

        {/* Skills Section */}
        <Grid>
          {/* Technical Skills */}
          {skills.length > 0 && (
            <Grid.Col span={6}>
              <Stack gap="md">
                <Group gap="xs">
                  <IconCode size={20} />
                  <Title order={3} c="dark.8">
                    Technical Skills
                  </Title>
                </Group>
                <List spacing="xs" size="sm">
                  {" "}
                  {skills.map((skill: Skill) => (
                    <List.Item key={skill.id}>
                      <Group gap="xs">
                        <Text fw={500}>{skill.name}</Text>
                        <Badge variant="light" size="xs">
                          {skill.category}
                        </Badge>
                      </Group>
                    </List.Item>
                  ))}
                </List>
              </Stack>
            </Grid.Col>
          )}

          {/* Soft Skills */}
        </Grid>
      </Stack>
    </Paper>
  );
};

const CVPreviewSkeleton = () => (
  <Paper
    p="xl"
    radius="md"
    withBorder
    style={{
      maxWidth: "210mm",
      margin: "0 auto",
      minHeight: "297mm",
    }}
  >
    <Stack gap="lg">
      <Stack gap="md" align="center">
        <Skeleton height={120} circle />
        <Skeleton height={32} width={300} />
        <Skeleton height={20} width={200} />
        <Group gap="lg">
          <Skeleton height={16} width={150} />
          <Skeleton height={16} width={120} />
          <Skeleton height={16} width={100} />
        </Group>
      </Stack>

      <Divider />
      <Stack gap="sm">
        <Skeleton height={24} width={200} />
        <Skeleton height={80} />
      </Stack>

      <Divider />
      <Stack gap="md">
        <Skeleton height={24} width={150} />
        {Array.from({ length: 3 }).map((_, i) => (
          <Stack key={i} gap="xs">
            <Skeleton height={20} width={250} />
            <Skeleton height={16} width={200} />
            <Skeleton height={60} />
          </Stack>
        ))}
      </Stack>
    </Stack>
  </Paper>
);

export const CVPreview = ({ cvId }: CVPreviewContentProps) => {
  return <CVPreviewContent cvId={cvId} />;
};
