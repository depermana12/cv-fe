import { useForm } from "@tanstack/react-form";
import {
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Paper,
  Select,
  Textarea,
  TagsInput,
  Text,
  Tooltip,
  Modal,
  ActionIcon,
  Box,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconTrash, IconCheck } from "@tabler/icons-react";

import {
  skillCreateSchema,
  skillUpdateSchema,
  skillSchema,
} from "../schema/skillSchema";
import { useCreateSkill } from "../hooks/useCreateSkill";
import { useUpdateSkill } from "../hooks/useUpdateSkill";
import { useDeleteSkill } from "../hooks/useDeleteSkill";
import type { SkillFormProps, SkillInsert } from "../types/skill.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";

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

export const SkillForm = ({ mode, initialData, onSuccess }: SkillFormProps) => {
  const { activeCvId } = useCvStore();

  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createSkill, isPending: isCreating } = useCreateSkill();
  const { mutate: updateSkill, isPending: isUpdating } = useUpdateSkill();
  const { mutate: deleteSkill, isPending: isDeleting } = useDeleteSkill();

  if (!activeCvId) {
    return <Text>No CV selected</Text>;
  }

  const handleDelete = () => {
    if (!initialData?.id) return;

    deleteSkill(
      { skillId: initialData.id, cvId: activeCvId },
      {
        onSuccess: () => {
          closeDeleteModal();
        },
      },
    );
  };

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
          { cvId: activeCvId, data: submitData },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Skill "${value.name}" has been added.`,
                color: "green",
                withBorder: true,
              });
              onSuccess?.();
            },
          },
        );
      } else if (mode === "edit" && initialData) {
        updateSkill(
          { cvId: activeCvId, skillId: initialData.id, data: submitData },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Skill has been updated.`,
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
          mode === "create" ? skillCreateSchema : skillUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  const { Field, handleSubmit, state } = skillForm;

  const isPending = isCreating || isUpdating || isDeleting;

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
            {/* Skill Classification Section */}
            <Text fw="bold">Skill Classification</Text>

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

            {/* Skill Details Section */}
            <Text fw="bold">Skill Details</Text>

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
                    placeholder="Describe your experience, projects, or achievements related to this skill..."
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

            <Group justify="flex-end" mt="lg">
              {mode === "edit" && initialData && (
                <Tooltip label="Delete this skill">
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
                {mode === "create" ? "Create Skill" : "Update Skill"}
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Delete Confirmation Modal */}
        <Modal
          opened={opened}
          onClose={closeDeleteModal}
          title="Delete Skill?"
          centered
        >
          <Stack gap="md">
            <Text>Are you sure you want to delete this skill?</Text>

            <Group justify="flex-end">
              <Button variant="default" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button color="red" onClick={handleDelete} loading={isDeleting}>
                Delete Skill
              </Button>
            </Group>
          </Stack>
        </Modal>
      </form>
    </Box>
  );
};
