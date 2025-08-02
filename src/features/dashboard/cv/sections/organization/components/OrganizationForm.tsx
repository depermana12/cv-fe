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
  Tooltip,
  Modal,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconTrash, IconCheck } from "@tabler/icons-react";

import {
  organizationCreateSchema,
  organizationUpdateSchema,
  organizationSchema,
} from "../schema/organizationSchema";
import { useCreateOrganization } from "../hooks/useCreateOrganization";
import { useUpdateOrganization } from "../hooks/useUpdateOrganization";
import { useDeleteOrganization } from "../hooks/useDeleteOrganization";
import type {
  OrganizationFormProps,
  OrganizationInsert,
} from "../types/organization.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";

export const OrganizationForm = ({
  mode,
  initialData,
  onSuccess,
}: OrganizationFormProps) => {
  const { activeCvId } = useCvStore();

  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createOrganization, isPending: isCreating } =
    useCreateOrganization();
  const { mutate: updateOrganization, isPending: isUpdating } =
    useUpdateOrganization();
  const { mutate: deleteOrganization, isPending: isDeleting } =
    useDeleteOrganization();

  if (!activeCvId) {
    return <Text>No CV selected</Text>;
  }

  const handleDelete = () => {
    if (!initialData?.id) return;

    deleteOrganization(
      { organizationId: initialData.id, cvId: activeCvId },
      {
        onSuccess: () => {
          notifications.show({
            title: "Success",
            message: "Organization deleted successfully",
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

  const defaultOrganizationValues: OrganizationInsert = {
    organization: "",
    role: "",
    startDate: undefined,
    endDate: undefined,
    descriptions: [""],
    location: "",
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          organization: initialData.organization,
          role: initialData.role,
          startDate: initialData.startDate
            ? new Date(initialData.startDate)
            : undefined,
          endDate: initialData.endDate
            ? new Date(initialData.endDate)
            : undefined,
          descriptions: initialData.descriptions || [""],
          location: initialData.location || "",
        }
      : defaultOrganizationValues;

  const organizationForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      const submitData = {
        ...value,
        location: value.location || undefined,
        descriptions: descriptions.filter((desc) => desc.trim() !== ""),
      };

      if (mode === "create") {
        createOrganization(
          { cvId: activeCvId, data: submitData },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateOrganization(
          {
            cvId: activeCvId,
            organizationId: initialData.id,
            data: submitData,
          },
          { onSuccess: () => onSuccess?.() },
        );
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const schema =
          mode === "create"
            ? organizationCreateSchema
            : organizationUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  const { Field, handleSubmit, state } = organizationForm;

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
            Edit Organization
          </Title>
          <Tooltip label="Delete organization">
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

        <Stack gap="xl">
          {/* Organization Information Section */}
          <Paper withBorder p="md">
            <Stack gap="md">
              <Title order={4} size="md">
                Organization Information
              </Title>

              <Group grow>
                <Field
                  name="organization"
                  validators={{
                    onBlur: zFieldValidator(
                      organizationSchema.shape.organization,
                    ),
                  }}
                >
                  {({ state, name, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <TextInput
                        name={name}
                        label="Organization"
                        placeholder="Organization name"
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
                  name="role"
                  validators={{
                    onBlur: zFieldValidator(organizationSchema.shape.role),
                  }}
                >
                  {({ state, name, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <TextInput
                        name={name}
                        label="Role"
                        placeholder="Your role or position"
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

              <Field
                name="location"
                validators={{
                  onBlur: zFieldValidator(organizationSchema.shape.location),
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
            </Stack>
          </Paper>

          {/* Participation Period Section */}
          <Paper withBorder p="md">
            <Stack gap="md">
              <Title order={4} size="md">
                Participation Period
              </Title>

              <Group grow>
                <Field
                  name="startDate"
                  validators={{
                    onBlur: zFieldValidator(organizationSchema.shape.startDate),
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
                    onBlur: zFieldValidator(organizationSchema.shape.endDate),
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
                      />
                    );
                  }}
                </Field>
              </Group>
            </Stack>
          </Paper>

          {/* Role Descriptions Section */}
          <Paper withBorder p="md">
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <Title order={4} size="md">
                  Role Descriptions
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

              <Text size="sm" c="dimmed">
                Describe your responsibilities, contributions, and achievements
                in this organization
              </Text>

              <Stack gap="sm">
                {descriptions.map((description, index) => (
                  <Box key={index}>
                    <Group align="flex-start" gap="sm">
                      <Textarea
                        placeholder={`Description ${index + 1}`}
                        value={description}
                        onChange={(e) =>
                          updateDescription(index, e.target.value)
                        }
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
              {mode === "create"
                ? "Create Organization"
                : "Update Organization"}
            </Button>
          </Group>
        </Stack>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={closeDeleteModal}
        title="Delete Organization"
        centered
      >
        <Text mb="md">
          Are you sure you want to delete this organization? This action cannot
          be undone.
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
