import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import {
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Paper,
  Textarea,
  ActionIcon,
  Box,
  Text,
  Tooltip,
  Modal,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconTrash, IconCheck } from "@tabler/icons-react";

import {
  projectCreateSchema,
  projectUpdateSchema,
  projectSchema,
} from "../schema/projectSchema";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import type { ProjectFormProps, ProjectInsert } from "../types/project.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";

export const ProjectForm = ({
  mode,
  initialData,
  onSuccess,
}: ProjectFormProps) => {
  const { activeCvId } = useCvStore();

  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { mutate: updateProject, isPending: isUpdating } = useUpdateProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();

  // Dynamic descriptions state
  const [descriptions, setDescriptions] = useState<string[]>(
    initialData?.descriptions || [""],
  );

  if (!activeCvId) {
    return <Text>No CV selected</Text>;
  }

  const handleDelete = () => {
    if (!initialData?.id) return;

    deleteProject(
      { projectId: initialData.id, cvId: activeCvId },
      {
        onSuccess: () => {
          closeDeleteModal();
        },
      },
    );
  };

  const defaultProjectValues: ProjectInsert = {
    name: "",
    startDate: undefined,
    endDate: undefined,
    url: "",
    descriptions: [""],
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          name: initialData.name,
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

  const projectForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      const submitData = {
        ...value,
        url: value.url || undefined,
        descriptions: descriptions.filter((desc) => desc.trim() !== ""),
      };

      if (mode === "create") {
        createProject(
          { cvId: activeCvId, data: submitData },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Project "${value.name}" has been added.`,
                color: "green",
                withBorder: true,
              });
              onSuccess?.();
            },
          },
        );
      } else if (mode === "edit" && initialData) {
        updateProject(
          { cvId: activeCvId, projectId: initialData.id, data: submitData },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Project has been updated.`,
                color: "green",
                withBorder: true,
              });
            },
          },
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

  const { Field, handleSubmit, state } = projectForm;

  const isPending = isCreating || isUpdating || isDeleting;

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
    <Box pos="relative">
      <LoadingOverlay visible={state.isSubmitting || isPending} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Paper withBorder p="md">
          <Stack gap="xs">
            {/* Project Information Section */}
            <Text fw="bold">Project Information</Text>

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

            {/* Project Timeline Section */}
            <Text fw="bold">Project Timeline</Text>

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

            {/* Project Details Section */}
            <Group justify="space-between" align="center">
              <Text fw="bold">Project Details</Text>
              <Button
                variant="light"
                size="sm"
                leftSection={<IconPlus size={16} />}
                onClick={addDescription}
              >
                Add bullet
              </Button>
            </Group>

            <Stack gap="sm">
              {descriptions.map((description, index) => (
                <Box key={index}>
                  <Group align="center" gap="xs">
                    <Textarea
                      placeholder={`Description ${index + 1}`}
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
          {mode === "edit" && initialData && (
            <Tooltip label="Delete project">
              <ActionIcon
                color="red"
                variant="outline"
                onClick={openDeleteModal}
                size="lg"
                disabled={isPending}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Tooltip>
          )}
          <Button
            type="submit"
            variant="filled"
            loading={state.isSubmitting || isPending}
          >
            {mode === "create" ? "Create Project" : "Update Project"}
          </Button>
        </Group>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={closeDeleteModal}
        title="Delete Project?"
        centered
      >
        <Stack gap="md">
          <Text>Are you sure you want to delete this project?</Text>

          <Group justify="flex-end">
            <Button variant="default" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete} loading={isDeleting}>
              Delete Project
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
};
