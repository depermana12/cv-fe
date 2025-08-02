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
  Textarea,
  TagsInput,
} from "@mantine/core";

import {
  skillCreateSchema,
  skillUpdateSchema,
  skillSchema,
} from "../schema/skillSchema";
import { useCreateSkill } from "../hooks/useCreateSkill";
import { useUpdateSkill } from "../hooks/useUpdateSkill";
import type { SkillFormProps, SkillInsert } from "../types/skill.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";

const skillTypes = [
  { value: "technical", label: "Technical" },
  { value: "soft", label: "Soft Skills" },
  { value: "language", label: "Language" },
  { value: "tool", label: "Tool" },
];

const skillCategories = [
  { value: "Programming Languages", label: "Programming Languages" },
  { value: "Frameworks", label: "Frameworks" },
  { value: "Libraries", label: "Libraries" },
  { value: "Databases", label: "Databases" },
  { value: "Cloud Services", label: "Cloud Services" },
  { value: "DevOps", label: "DevOps" },
  { value: "Tools", label: "Tools" },
  { value: "Design", label: "Design" },
  { value: "Communication", label: "Communication" },
  { value: "Leadership", label: "Leadership" },
  { value: "Other", label: "Other" },
];

const proficiencyLevels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

export const SkillForm = ({
  mode,
  cvId,
  initialData,
  onSuccess,
}: SkillFormProps) => {
  const { mutate: createSkill, isPending: isCreating } = useCreateSkill();
  const { mutate: updateSkill, isPending: isUpdating } = useUpdateSkill();

  const defaultSkillValues: SkillInsert = {
    type: "technical",
    category: "",
    name: "",
    proficiency: undefined,
    keywords: [],
    description: "",
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          type: initialData.type,
          category: initialData.category,
          name: initialData.name,
          proficiency: initialData.proficiency,
          keywords: initialData.keywords || [],
          description: initialData.description || "",
        }
      : defaultSkillValues;

  const skillForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      const submitData = {
        ...value,
        keywords: value.keywords?.length ? value.keywords : undefined,
        description: value.description || undefined,
        proficiency: value.proficiency || undefined,
      };

      if (mode === "create") {
        createSkill(
          { cvId, data: submitData },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateSkill(
          { cvId, skillId: initialData.id, data: submitData },
          { onSuccess: () => onSuccess?.() },
        );
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const schema =
          mode === "create" ? skillCreateSchema : skillUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  // Auto-sync to form store for live preview using useFormStoreSync

  const { Field, handleSubmit, state } = skillForm;

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
        {/* Skill Type and Category Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Skill Classification
            </Title>

            <Group grow>
              <Field
                name="type"
                validators={{
                  onBlur: zFieldValidator(skillSchema.shape.type),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <Select
                      name={name}
                      label="Skill Type"
                      placeholder="Select skill type"
                      data={skillTypes}
                      value={state.value}
                      onChange={(value) => handleChange(value as any)}
                      onBlur={handleBlur}
                      error={errorField}
                      required
                    />
                  );
                }}
              </Field>

              <Field
                name="category"
                validators={{
                  onBlur: zFieldValidator(skillSchema.shape.category),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <Select
                      name={name}
                      label="Category"
                      placeholder="Select or type category"
                      data={skillCategories}
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
          </Stack>
        </Paper>

        {/* Skill Details Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Skill Details
            </Title>

            <Group grow>
              <Field
                name="name"
                validators={{
                  onBlur: zFieldValidator(skillSchema.shape.name),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Skill Name"
                      placeholder="e.g. React, JavaScript, Project Management"
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
                name="proficiency"
                validators={{
                  onBlur: zFieldValidator(skillSchema.shape.proficiency),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <Select
                      name={name}
                      label="Proficiency Level"
                      placeholder="Select proficiency level"
                      data={proficiencyLevels}
                      value={state.value || ""}
                      onChange={(value) => handleChange(value as any)}
                      onBlur={handleBlur}
                      error={errorField}
                      clearable
                    />
                  );
                }}
              </Field>
            </Group>

            <Field
              name="keywords"
              validators={{
                onBlur: zFieldValidator(skillSchema.shape.keywords),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TagsInput
                    name={name}
                    label="Keywords"
                    description="Add relevant keywords or technologies related to this skill"
                    placeholder="Type and press Enter to add keywords"
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
              name="description"
              validators={{
                onBlur: zFieldValidator(skillSchema.shape.description),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <Textarea
                    name={name}
                    label="Description"
                    description="Optional description of your experience with this skill"
                    placeholder="Describe your experience, projects, or achievements related to this skill"
                    value={state.value}
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
          </Stack>
        </Paper>

        <Group justify="flex-end" mt="lg">
          <Button type="submit" loading={state.isSubmitting || isPending}>
            {mode === "create" ? "Create Skill" : "Update Skill"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
