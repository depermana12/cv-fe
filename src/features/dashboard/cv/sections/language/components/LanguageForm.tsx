import { useForm } from "@tanstack/react-form";
import {
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Title,
  Paper,
  Select,
  Text,
  Tooltip,
  Modal,
  ActionIcon,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconCheck } from "@tabler/icons-react";

import {
  languageInsertSchema,
  languageUpdateSchema,
  languageSchema,
} from "../schema/languageSchema";
import { useCreateLanguage } from "../hooks/useCreateLanguage";
import { useUpdateLanguage } from "../hooks/useUpdateLanguage";
import { useDeleteLanguage } from "../hooks/useDeleteLanguage";
import type {
  LanguageInsert,
  LanguageFormProps,
} from "../types/language.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";

const fluencyOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const LanguageForm = ({
  mode,
  initialData,
  onSuccess,
}: LanguageFormProps) => {
  const { activeCvId } = useCvStore();

  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createLanguage, isPending: isCreating } = useCreateLanguage();
  const { mutate: updateLanguage, isPending: isUpdating } = useUpdateLanguage();
  const { mutate: deleteLanguage, isPending: isDeleting } = useDeleteLanguage();

  if (!activeCvId) {
    return <Text>No CV selected</Text>;
  }

  const handleDelete = () => {
    if (!initialData?.id) return;

    deleteLanguage(
      { languageId: initialData.id, cvId: activeCvId },
      {
        onSuccess: () => {
          notifications.show({
            title: "Success",
            message: "Language deleted successfully",
            color: "green",
            icon: <IconCheck size={16} />,
          });
          closeDeleteModal();
          onSuccess?.();
        },
      },
    );
  };

  const defaultLanguageValues: LanguageInsert = {
    language: "",
    fluency: undefined,
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          language: initialData.language,
          fluency: initialData.fluency,
        }
      : defaultLanguageValues;

  const languageForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      if (mode === "create") {
        createLanguage(
          { cvId: activeCvId, data: value },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateLanguage(
          { cvId: activeCvId, languageId: initialData.id, data: value },
          { onSuccess: () => onSuccess?.() },
        );
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const schema =
          mode === "create" ? languageInsertSchema : languageUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  const { Field, handleSubmit, state } = languageForm;

  const isPending = isCreating || isUpdating;

  return (
    <>
      {/* Header with delete action for edit mode */}
      {mode === "edit" && initialData && (
        <Group justify="space-between" align="center" mb="md">
          <Title order={3} size="lg">
            Edit Language
          </Title>
          <Tooltip label="Delete language">
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
          {/* Language Information Section */}
          <Paper withBorder p="md">
            <Stack gap="md">
              <Title order={4} size="md">
                Language Information
              </Title>

              <Group grow>
                <Field
                  name="language"
                  validators={{
                    onBlur: zFieldValidator(languageSchema.shape.language),
                  }}
                >
                  {({ state, name, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <TextInput
                        name={name}
                        label="Language"
                        placeholder="Enter language name (e.g., English, Spanish, French)"
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        error={errorField}
                        required
                        autoComplete="language"
                      />
                    );
                  }}
                </Field>

                <Field
                  name="fluency"
                  validators={{
                    onBlur: zFieldValidator(languageSchema.shape.fluency),
                  }}
                >
                  {({ state, name, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <Select
                        name={name}
                        label="Fluency Level"
                        placeholder="Select your fluency level"
                        data={fluencyOptions}
                        value={state.value || null}
                        onChange={(value) => handleChange(value as any)}
                        onBlur={handleBlur}
                        error={errorField}
                        clearable
                      />
                    );
                  }}
                </Field>
              </Group>
            </Stack>
          </Paper>

          <Group justify="flex-end" mt="lg">
            <Button type="submit" loading={state.isSubmitting || isPending}>
              {mode === "create" ? "Create Language" : "Update Language"}
            </Button>
          </Group>
        </Stack>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={closeDeleteModal}
        title="Delete Language"
        centered
      >
        <Text mb="md">
          Are you sure you want to delete this language? This action cannot be
          undone.
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
