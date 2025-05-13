import { useForm } from "@tanstack/react-form";
import { useCreateSkill } from "../hooks/useCreateSkill";
import { usePersonalId } from "../hooks/usePersonalId";
import type { SkillForm } from "../types/types";
import { skillSchema } from "../schema/skillSchema";
import { LoadingOverlay, TextInput } from "@mantine/core";
import useFieldError from "../hooks/useFieldError";
import { zFieldValidator } from "../utils/zFieldValidator";

const SkillForm = () => {
  const { mutate, isPending } = useCreateSkill();
  const personalId = usePersonalId();

  const skillDefaultValues: SkillForm = {
    personalId: personalId,
    category: "",
    name: "",
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: skillDefaultValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: skillSchema.omit({ id: true }),
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <LoadingOverlay visible={state.isSubmitting || isPending} />
      <Field
        name="category"
        validators={{ onBlur: zFieldValidator(skillSchema.shape.category) }}
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
        name="name"
        validators={{ onBlur: zFieldValidator(skillSchema.shape.name) }}
      >
        {({ state, handleChange, handleBlur }) => {
          const errorField = useFieldError(state.meta);
          return (
            <TextInput
              label="Skill Name"
              placeholder="Skill Name"
              value={state.value}
              onChange={(e) => handleChange(e.target.value)}
              onBlur={handleBlur}
              error={errorField}
            />
          );
        }}
      </Field>
    </form>
  );
};
export default SkillForm;
