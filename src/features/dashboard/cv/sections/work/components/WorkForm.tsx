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
  Checkbox,
  Textarea,
  ActionIcon,
  Box,
  Text,
  Tooltip,
  Modal,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash, IconCheck } from "@tabler/icons-react";

import {
  workCreateSchema,
  workUpdateSchema,
  workSchema,
} from "../schema/workSchema";
import { useCreateWork } from "../hooks/useCreateWork";
import { useUpdateWork } from "../hooks/useUpdateWork";
import { useDeleteWork } from "../hooks/useDeleteWork";
import type { WorkFormProps, WorkInsert } from "../types/work.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";

export const WorkForm = ({ mode, initialData, onSuccess }: WorkFormProps) => {
  const { activeCvId } = useCvStore();

  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createWork, isPending: isCreating } = useCreateWork();
  const { mutate: updateWork, isPending: isUpdating } = useUpdateWork();
  const { mutate: deleteWork, isPending: isDeleting } = useDeleteWork();

  if (!activeCvId) {
    return <Text>No CV selected</Text>;
  }

  const handleDelete = () => {
    if (!initialData?.id) return;

    deleteWork(
      { workId: initialData.id, cvId: activeCvId },
      {
        onSuccess: () => {
          notifications.show({
            title: "Success",
            message: "Work experience deleted successfully",
            color: "green",
            icon: <IconCheck size={16} />,
          });
          closeDeleteModal();
          onSuccess?.();
        },
      },
    );
  };

  // Dynamic descriptions state
  const [descriptions, setDescriptions] = useState<string[]>(
    initialData?.descriptions || [""],
  );

  const [isCurrentWork, setIsCurrentWork] = useState(
    initialData?.isCurrent || false,
  );

  const defaultWorkValues: WorkInsert = {
    company: "",
    position: "",
    startDate: undefined,
    endDate: undefined,
    url: "",
    isCurrent: false,
    descriptions: [""],
    location: "",
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          company: initialData.company,
          position: initialData.position,
          startDate: initialData.startDate
            ? new Date(initialData.startDate)
            : undefined,
          endDate: initialData.endDate
            ? new Date(initialData.endDate)
            : undefined,
          url: initialData.url || "",
          isCurrent: initialData.isCurrent || false,
          descriptions: initialData.descriptions || [""],
          location: initialData.location || "",
        }
      : defaultWorkValues;

  const workForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      const submitData = {
        ...value,
        url: value.url || undefined,
        location: value.location || undefined,
        endDate: isCurrentWork ? undefined : value.endDate,
        descriptions: descriptions.filter((desc) => desc.trim() !== ""),
      };

      if (mode === "create") {
        createWork(
          { cvId: activeCvId, data: submitData },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateWork(
          { cvId: activeCvId, workId: initialData.id, data: submitData },
          { onSuccess: () => onSuccess?.() },
        );
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const schema = mode === "create" ? workCreateSchema : workUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  const { Field, handleSubmit, state } = workForm;

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
    <>
      {/* Header with delete action for edit mode */}
      {mode === "edit" && initialData && (
        <Group justify="space-between" align="center" mb="md">
          <Title order={3} size="lg">
            Edit Work Experience
          </Title>
          <Tooltip label="Delete work experience">
            <ActionIcon
              color="red"
              variant="light"
              onClick={openDeleteModal}
              size="lg"
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <LoadingOverlay visible={state.isSubmitting || isPending} />

        {/* Basic Information Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Basic Information
            </Title>

            <Group grow>
              <Field
                name="company"
                validators={{
                  onBlur: zFieldValidator(workSchema.shape.company),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Company"
                      placeholder="Company name"
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
                name="position"
                validators={{
                  onBlur: zFieldValidator(workSchema.shape.position),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Position"
                      placeholder="Job title or position"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      required
                      autoComplete="organization-title"
                    />
                  );
                }}
              </Field>
            </Group>

            <Group grow>
              <Field
                name="location"
                validators={{
                  onBlur: zFieldValidator(workSchema.shape.location),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Location"
                      placeholder="City, Country"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="address-level2"
                    />
                  );
                }}
              </Field>

              <Field
                name="url"
                validators={{
                  onBlur: zFieldValidator(workSchema.shape.url),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Company Website"
                      placeholder="https://company.com"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="url"
                    />
                  );
                }}
              </Field>
            </Group>
            {/* Employment Period Section */}
            <Title order={4} size="md">
              Employment Period
            </Title>

            <Field
              name="isCurrent"
              validators={{
                onBlur: zFieldValidator(workSchema.shape.isCurrent),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <Checkbox
                    name={name}
                    label="I currently work here"
                    checked={state.value}
                    onChange={(e) => {
                      const isChecked = e.currentTarget.checked;
                      handleChange(isChecked);
                      setIsCurrentWork(isChecked);
                    }}
                    onBlur={handleBlur}
                    error={errorField}
                  />
                );
              }}
            </Field>

            <Group grow>
              <Field
                name="startDate"
                validators={{
                  onBlur: zFieldValidator(workSchema.shape.startDate),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <DateInput
                      name={name}
                      label="Start Date"
                      placeholder="Select start date"
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
                  onBlur: zFieldValidator(workSchema.shape.endDate),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <DateInput
                      name={name}
                      label="End Date"
                      placeholder="Select end date"
                      value={state.value || null}
                      onChange={(value) => handleChange(value as any)}
                      onBlur={handleBlur}
                      error={errorField}
                      clearable
                      maxDate={new Date()}
                      disabled={isCurrentWork}
                    />
                  );
                }}
              </Field>
            </Group>

            {/* Job Descriptions Section */}
            <Group justify="space-between" align="center">
              <Title order={4} size="md">
                Job Descriptions
              </Title>
              <Button
                variant="light"
                size="sm"
                leftSection={<IconPlus size={16} />}
                onClick={addDescription}
              >
                Add Description
              </Button>
            </Group>

            <Stack gap="sm">
              {descriptions.map((description, index) => (
                <Box key={index}>
                  <Group align="flex-start" gap="sm">
                    <Textarea
                      placeholder={`Description ${index + 1}`}
                      value={description}
                      onChange={(e) => updateDescription(index, e.target.value)}
                      autosize
                      minRows={2}
                      maxRows={4}
                      style={{ flex: 1 }}
                      description="Describe your key responsibilities, achievements, and
              contributions in this role"
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
            {mode === "create"
              ? "Create Work Experience"
              : "Update Work Experience"}
          </Button>
        </Group>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={closeDeleteModal}
        title="Delete Work Experience"
        centered
      >
        <Text mb="md">
          Are you sure you want to delete this work experience? This action
          cannot be undone.
        </Text>
        <Group justify="flex-end">
          <Button variant="light" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete} loading={isDeleting}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
};
