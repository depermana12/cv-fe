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
  Select,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { useParams } from "@tanstack/react-router";

import {
  educationCreateSchema,
  educationUpdateSchema,
  educationSchema,
} from "../schema/educationSchema";
import { useCreateEducation } from "../hooks/useCreateEducation";
import { useUpdateEducation } from "../hooks/useUpdateEducation";
import type {
  EducationFormProps,
  EducationInsert,
} from "../types/education.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";

const degreeOptions = [
  { value: "high_school", label: "High School" },
  { value: "diploma", label: "Diploma" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "doctorate", label: "Doctorate" },
];

export const EducationForm = ({
  mode,
  initialData,
  onSuccess,
}: EducationFormProps) => {
  const { mutate: createEducation, isPending: isCreating } =
    useCreateEducation();
  const { mutate: updateEducation, isPending: isUpdating } =
    useUpdateEducation();

  const params = useParams({ from: "/dashboard/cv/$cvId" });
  const cvId = Number(params.cvId);

  const defaultEducationValues: EducationInsert = {
    institution: "",
    degree: "bachelor",
    fieldOfStudy: "",
    startDate: undefined,
    endDate: undefined,
    gpa: undefined,
    url: "",
    location: "",
    description: [],
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          institution: initialData.institution,
          degree: initialData.degree,
          fieldOfStudy: initialData.fieldOfStudy || "",
          startDate: initialData.startDate,
          endDate: initialData.endDate,
          gpa: initialData.gpa,
          url: initialData.url || "",
          location: initialData.location || "",
          description: initialData.description || [],
        }
      : defaultEducationValues;

  const { Field, handleSubmit, state } = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      if (mode === "create") {
        createEducation(
          { cvId, data: value },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateEducation(
          { cvId, educationId: initialData.id, data: value },
          { onSuccess: () => onSuccess?.() },
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
        {/* Education Details Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Education Details
            </Title>

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
                    placeholder="e.g. New York, NY"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={errorField}
                    autoComplete="off"
                  />
                );
              }}
            </Field>
          </Stack>
        </Paper>

        {/* Dates Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Dates
            </Title>
            <Group grow>
              <Field name="startDate">
                {({ state, name, handleChange }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <DateInput
                      name={name}
                      placeholder="Start Date"
                      label="Start Date"
                      value={state.value || null}
                      onChange={(value) => handleChange(value as any)}
                      error={errorField}
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
          </Stack>
        </Paper>

        {/* Description Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Description
            </Title>

            <Field name="description">
              {({ state, handleChange }) => {
                const descriptions = state.value || [];

                const addDescription = () => {
                  handleChange([...descriptions, ""]);
                };

                const updateDescription = (index: number, value: string) => {
                  const updated = [...descriptions];
                  updated[index] = value;
                  handleChange(updated);
                };

                const removeDescription = (index: number) => {
                  const updated = descriptions.filter((_, i) => i !== index);
                  handleChange(updated);
                };

                return (
                  <Stack gap="sm">
                    {descriptions.map((desc, index) => (
                      <Group key={index} align="flex-start">
                        <Textarea
                          placeholder={`Description ${index + 1}`}
                          value={desc}
                          onChange={(e) =>
                            updateDescription(index, e.target.value)
                          }
                          style={{ flex: 1 }}
                          autosize
                          minRows={2}
                        />
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={() => removeDescription(index)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    ))}

                    <Button
                      variant="light"
                      leftSection={<IconPlus size={16} />}
                      onClick={addDescription}
                      size="sm"
                    >
                      Add Description
                    </Button>
                  </Stack>
                );
              }}
            </Field>
          </Stack>
        </Paper>

        {/* Verification Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Verification
            </Title>
            <Field
              name="url"
              validators={{
                onBlur: zFieldValidator(educationSchema.shape.url),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TextInput
                    name={name}
                    label="Verification URL"
                    placeholder="https://example.ac.id/verify"
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

        <Group justify="flex-end" mt="lg">
          <Button type="submit" loading={state.isSubmitting || isPending}>
            {mode === "create" ? "Create Education" : "Update Education"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
