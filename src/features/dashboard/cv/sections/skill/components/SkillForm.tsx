import { useForm } from "@tanstack/react-form";
import {
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Paper,
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

export const SkillForm = ({ mode, initialData, onSuccess }: SkillFormProps) => {
  const { activeCvId } = useCvStore();

  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createSkill, isPending: isCreating } = useCreateSkill();
  const { mutate: updateSkill, isPending: isUpdating } = useUpdateSkill();
  const { mutate: deleteSkill, isPending: isDeleting } = useDeleteSkill();

  const defaultSkillValues: SkillInsert = {
    category: "",
    skill: [],
  };

  const initialValues = mode === "edit" ? initialData : defaultSkillValues;

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

  const skillForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      if (mode === "create") {
        createSkill(
          { cvId: activeCvId, data: value },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Skill has been added.`,
                color: "green",
                withBorder: true,
              });
              onSuccess?.();
            },
          },
        );
      } else if (mode === "edit" && initialData) {
        updateSkill(
          { cvId: activeCvId, skillId: initialData.id, data: value },
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
          <Stack gap="md">
            <Text fw="bold" size="lg">
              {mode === "create" ? "Add Skill Category" : "Edit Skill Category"}
            </Text>

            <Field
              name="category"
              validators={{
                onBlur: zFieldValidator(skillSchema.shape.category),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TextInput
                    name={name}
                    label="Category"
                    placeholder="e.g. Programming Languages, Design Tools, Communication"
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
              name="skill"
              validators={{
                onBlur: zFieldValidator(skillSchema.shape.skill),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TagsInput
                    name={name}
                    label="Skills"
                    placeholder="Water bending, Fire bending, Earth bending"
                    value={state.value}
                    onChange={(value) => {
                      handleChange(value);
                    }}
                    onBlur={handleBlur}
                    error={errorField}
                    required
                  />
                );
              }}
            </Field>

            <Group justify="flex-end" mt="lg">
              {mode === "edit" && initialData && (
                <Tooltip label="Delete this skill category">
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
                {mode === "create"
                  ? "Create Skill Category"
                  : "Update Skill Category"}
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Delete Confirmation Modal */}
        <Modal
          opened={opened}
          onClose={closeDeleteModal}
          title="Delete Skill Category?"
          centered
        >
          <Stack gap="md">
            <Text>
              Are you sure you want to delete this skill category and all its
              skills?
            </Text>

            <Group justify="flex-end">
              <Button variant="default" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button color="red" onClick={handleDelete} loading={isDeleting}>
                Delete Skill Category
              </Button>
            </Group>
          </Stack>
        </Modal>
      </form>
    </Box>
  );
};
