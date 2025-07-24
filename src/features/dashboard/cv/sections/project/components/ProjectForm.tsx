import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Title,
  Paper,
  Textarea,
  ActionIcon,
  Box,
  Text,
  TagsInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";

import {
  projectCreateSchema,
  projectUpdateSchema,
  projectSchema,
} from "../schema/projectSchema";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import type { ProjectFormProps, ProjectInsert } from "../types/project.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";

export const ProjectForm = ({
  mode,
  initialData,
  onSuccess,
}: ProjectFormProps) => {
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const params = useParams({ from: "/dashboard/cv/$cvId" });
  const cvId = Number(params.cvId);

  // Dynamic descriptions state
  const [descriptions, setDescriptions] = useState<string[]>(
    initialData?.descriptions || [""],
  );

  const defaultProjectValues: ProjectInsert = {
    name: "",
    technologies: [],
    startDate: undefined,
    endDate: undefined,
    url: "",
    descriptions: [""],
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          name: initialData.name,
          technologies: initialData.technologies || [],
          startDate: initialData.startDate
            ? new Date(initialData.startDate)
            : undefined,
          endDate: initialData.endDate
            ? new Date(initialData.endDate)
            : undefined,
          url: initialData.url || "",
          descriptions: initialData.descriptions || [""],
        }
      : defaultProjectValues;

  const { Field, handleSubmit, state } = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      const submitData = {
        ...value,
        url: value.url || undefined,
        descriptions: descriptions.filter((desc) => desc.trim() !== ""),
        technologies: value.technologies?.length ? value.technologies : [],
      };

      if (mode === "create") {
        createProject(
          { cvId, data: submitData },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateProject(
          { cvId, projectId: initialData.id, data: submitData },
          { onSuccess: () => onSuccess?.() },
        );
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const schema =
          mode === "create" ? projectCreateSchema : projectUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  const isPending = isCreating || isUpdating;

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const removeDescription = (index: number) => {
    if (descriptions.length > 1) {
      setDescriptions(descriptions.filter((_, i) => i !== index));
    }
  };

  const updateDescription = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <LoadingOverlay visible={state.isSubmitting || isPending} />

      <Stack gap="xl">
        {/* Project Information Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Project Information
            </Title>

            <Field
              name="name"
              validators={{
                onBlur: zFieldValidator(projectSchema.shape.name),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TextInput
                    name={name}
                    label="Project Name"
                    placeholder="Enter project name"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={errorField}
                    required
                    autoComplete="off"
                  />
                );
              }}
            </Field>

            <Field
              name="technologies"
              validators={{
                onBlur: zFieldValidator(projectSchema.shape.technologies),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TagsInput
                    name={name}
                    label="Technologies Used"
                    description="Add technologies, frameworks, and tools used in this project"
                    placeholder="Type and press Enter to add technologies"
                    value={state.value}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errorField}
                    clearable
                  />
                );
              }}
            </Field>

            <Field
              name="url"
              validators={{
                onBlur: zFieldValidator(projectSchema.shape.url),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TextInput
                    name={name}
                    label="Project URL"
                    placeholder="https://project-demo.com"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={errorField}
                    autoComplete="url"
                  />
                );
              }}
            </Field>
          </Stack>
        </Paper>

        {/* Project Timeline Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Project Timeline
            </Title>

            <Group grow>
              <Field
                name="startDate"
                validators={{
                  onBlur: zFieldValidator(projectSchema.shape.startDate),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <DateInput
                      name={name}
                      label="Start Date"
                      placeholder="Project start date"
                      value={state.value || null}
                      onChange={(value) => handleChange(value as any)}
                      onBlur={handleBlur}
                      error={errorField}
                      clearable
                      maxDate={new Date()}
                    />
                  );
                }}
              </Field>

              <Field
                name="endDate"
                validators={{
                  onBlur: zFieldValidator(projectSchema.shape.endDate),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <DateInput
                      name={name}
                      label="End Date"
                      placeholder="Project completion date"
                      value={state.value || null}
                      onChange={(value) => handleChange(value as any)}
                      onBlur={handleBlur}
                      error={errorField}
                      clearable
                      maxDate={new Date()}
                    />
                  );
                }}
              </Field>
            </Group>
          </Stack>
        </Paper>

        {/* Project Details Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Group justify="space-between" align="center">
              <Title order={4} size="md">
                Project Details
              </Title>
              <Button
                variant="light"
                size="sm"
                leftSection={<IconPlus size={16} />}
                onClick={addDescription}
              >
                Add Detail
              </Button>
            </Group>

            <Text size="sm" c="dimmed">
              Describe key features, challenges solved, achievements, or
              technical highlights
            </Text>

            <Stack gap="sm">
              {descriptions.map((description, index) => (
                <Box key={index}>
                  <Group align="flex-start" gap="sm">
                    <Textarea
                      placeholder={`Detail ${index + 1}`}
                      value={description}
                      onChange={(e) => updateDescription(index, e.target.value)}
                      autosize
                      minRows={2}
                      maxRows={4}
                      style={{ flex: 1 }}
                    />
                    {descriptions.length > 1 && (
                      <ActionIcon
                        color="red"
                        variant="light"
                        onClick={() => removeDescription(index)}
                        style={{ marginTop: 6 }}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Paper>

        <Group justify="flex-end" mt="lg">
          <Button type="submit" loading={state.isSubmitting || isPending}>
            {mode === "create" ? "Create Project" : "Update Project"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
