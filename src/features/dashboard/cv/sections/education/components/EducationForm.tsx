import { useForm } from "@tanstack/react-form";
import {
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Paper,
  Textarea,
  Select,
  ActionIcon,
  Tooltip,
  Modal,
  Text,
  Box,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconTrash, IconCheck } from "@tabler/icons-react";

import {
  educationCreateSchema,
  educationUpdateSchema,
  educationSchema,
} from "../schema/educationSchema";
import { useCreateEducation } from "../hooks/useCreateEducation";
import { useUpdateEducation } from "../hooks/useUpdateEducation";
import { useDeleteEducation } from "../hooks/useDeleteEducation";
import type {
  EducationFormProps,
  EducationInsert,
} from "../types/education.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

const degreeOptions = [
  { value: "high_school", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate" },
];

export const EducationForm = ({
  mode,
  cvId,
  initialData,
  onSuccess,
}: EducationFormProps) => {
  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createEducation, isPending: isCreating } =
    useCreateEducation();
  const { mutate: updateEducation, isPending: isUpdating } =
    useUpdateEducation();
  const { mutate: deleteEducation, isPending: isDeleting } =
    useDeleteEducation();

  const defaultEducationValues: EducationInsert = {
    institution: "",
    degree: "bachelor",
    fieldOfStudy: "",
    startDate: new Date(),
    endDate: undefined,
    gpa: undefined,
    location: "",
    description: "",
  };

  const initialValues = mode === "edit" ? initialData : defaultEducationValues;

  const educationForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      if (mode === "create") {
        createEducation(
          { cvId, data: value },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Education at ${value.institution} has been added.`,
                color: "green",
                withBorder: true,
              });
              // Call the parent's onSuccess callback to close the form accordion
              onSuccess?.();
            },
          },
        );
      } else if (mode === "edit" && initialData) {
        updateEducation(
          { cvId, educationId: initialData.id, data: value },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Education has been updated.`,
                color: "green",
                withBorder: true,
              });
              // No need to call onSuccess for edit mode since the accordion stays open
            },
          },
        );
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const schema =
          mode === "create" ? educationCreateSchema : educationUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  const { Field, handleSubmit, state, reset } = educationForm;

  const isPending = isCreating || isUpdating || isDeleting;

  const handleDelete = () => {
    if (!initialData?.id) return;

    deleteEducation(
      { cvId, educationId: initialData.id },
      {
        onSuccess: () => {
          reset();
          closeDeleteModal();
        },
      },
    );
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
        <Paper p="md" withBorder>
          <Stack gap="xs">
            {/* Education Details Section */}
            <Text fw="bold">Education Details</Text>

            <Group grow>
              <Field
                name="institution"
                validators={{
                  onBlur: zFieldValidator(educationSchema.shape.institution),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Institution"
                      placeholder="e.g. University of Example"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      required
                      autoComplete="organization"
                    />
                  );
                }}
              </Field>

              <Field
                name="degree"
                validators={{
                  onBlur: zFieldValidator(educationSchema.shape.degree),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <Select
                      name={name}
                      label="Degree"
                      placeholder="Select degree type"
                      data={degreeOptions}
                      value={state.value}
                      onChange={(value) => handleChange(value as any)}
                      onBlur={handleBlur}
                      error={errorField}
                      required
                      searchable
                    />
                  );
                }}
              </Field>
            </Group>

            <Group grow>
              <Field
                name="fieldOfStudy"
                validators={{
                  onBlur: zFieldValidator(educationSchema.shape.fieldOfStudy),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Field of Study"
                      placeholder="e.g. Computer Science"
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

              <Field name="gpa">
                {({ state, name, handleChange }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="GPA"
                      placeholder="e.g. 3.5"
                      value={state.value || ""}
                      onChange={(e) =>
                        handleChange(e.target.value || undefined)
                      }
                      error={errorField}
                      autoComplete="off"
                    />
                  );
                }}
              </Field>
            </Group>

            <Field
              name="location"
              validators={{
                onBlur: zFieldValidator(educationSchema.shape.location),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TextInput
                    name={name}
                    label="Location"
                    placeholder="e.g. East Jakarta"
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
            {/* Dates Section */}
            <Text fw="bold">Dates</Text>
            <Group grow>
              <Field
                name="startDate"
                validators={{
                  onBlur: zFieldValidator(educationSchema.shape.startDate),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <DateInput
                      name={name}
                      placeholder="Start Date"
                      label="Start Date"
                      value={state.value || null}
                      onChange={(value) => handleChange(value as any)}
                      onBlur={handleBlur}
                      error={errorField}
                      required
                    />
                  );
                }}
              </Field>
              <Field name="endDate">
                {({ state, name, handleChange }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <DateInput
                      name={name}
                      placeholder="End Date"
                      label="End Date"
                      value={state.value || null}
                      onChange={(value) => handleChange(value as any)}
                      error={errorField}
                    />
                  );
                }}
              </Field>
            </Group>
            {/* Description Section */}

            <Field
              name="description"
              validators={{
                onBlur: zFieldValidator(educationSchema.shape.description),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <Textarea
                    name={name}
                    label="Description"
                    placeholder="Relevant coursework, academic awards, honors, research projects, or other notable achievements during your education..."
                    value={state.value || ""}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={errorField}
                    autosize
                    minRows={3}
                    maxRows={6}
                  />
                );
              }}
            </Field>

            <Group justify="flex-end" mt="lg">
              {mode === "edit" && initialData && (
                <Tooltip label="Delete this education">
                  <ActionIcon
                    color="red"
                    size="lg"
                    variant="outline"
                    onClick={openDeleteModal}
                    disabled={isPending}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Tooltip>
              )}

              <Button
                variant="filled"
                type="submit"
                loading={state.isSubmitting || isPending}
              >
                {mode === "create" ? "Create Education" : "Update Education"}
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Delete Confirmation Modal */}
        <Modal
          opened={opened}
          onClose={closeDeleteModal}
          title="Delete Education?"
          centered
        >
          <Stack gap="md">
            <Text>Are you sure you want to delete this education entry?</Text>

            <Group justify="flex-end">
              <Button variant="default" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button color="red" onClick={handleDelete} loading={isDeleting}>
                Delete Education
              </Button>
            </Group>
          </Stack>
        </Modal>
      </form>
    </Box>
  );
};
