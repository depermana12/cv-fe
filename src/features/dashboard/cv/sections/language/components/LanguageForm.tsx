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
} from "@mantine/core";

import {
  languageInsertSchema,
  languageUpdateSchema,
  languageSchema,
} from "../schema/languageSchema";
import { useCreateLanguage } from "../hooks/useCreateLanguage";
import { useUpdateLanguage } from "../hooks/useUpdateLanguage";
import type {
  LanguageInsert,
  LanguageFormProps,
} from "../types/language.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useCvStore } from "../../../store/cvStore";

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
  const { mutate: createLanguage, isPending: isCreating } = useCreateLanguage();
  const { mutate: updateLanguage, isPending: isUpdating } = useUpdateLanguage();

  const { activeCvId } = useCvStore();

  if (!activeCvId) {
    throw new Error("No active CV selected");
  }

  const cvId = activeCvId;

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

  const { Field, handleSubmit, state } = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      if (mode === "create") {
        createLanguage(
          { cvId, data: value },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateLanguage(
          { cvId, languageId: initialData.id, data: value },
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

  const isPending = isCreating || isUpdating;

  return (
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
  );
};
