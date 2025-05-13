import { useForm } from "@tanstack/react-form";
import { useCreateSoftSkill } from "../hooks/useCreateSoftSkill";
import { usePersonalId } from "../hooks/usePersonalId";
import type { SoftSkillForm } from "../types/types";
import { softSkillSchema } from "../schema/softSkillSchema";
import { LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { zFieldValidator } from "../utils/zFieldValidator";
import useFieldError from "../hooks/useFieldError";

const SoftSkillForm = () => {
  const { mutate, isPending } = useCreateSoftSkill();
  const personalId = usePersonalId();

  const softSkillDefaultValues: SoftSkillForm = {
    personalId,
    category: "",
    description: "",
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: softSkillDefaultValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: softSkillSchema.omit({ id: true }),
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      // TODO: category component should be a select with options
      <LoadingOverlay visible={state.isSubmitting || isPending} />
      <Stack gap="md">
        <Field
          name="category"
          validators={{
            onBlur: zFieldValidator(softSkillSchema.shape.category),
          }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Category"
                placeholder="Category Name"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="description"
          validators={{
            onBlur: zFieldValidator(softSkillSchema.shape.description),
          }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Description"
                placeholder="Description"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
      </Stack>
    </form>
  );
};
export default SoftSkillForm;
