import { useState } from "react";
import { useCreateProject } from "../hooks/useCreateProject";
import { usePersonalId } from "../hooks/usePersonalId";
import type { ProjectForm } from "../types/types";
import { useForm } from "@tanstack/react-form";
import { projectSchema } from "../schema/projectSchema";
import { LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { zFieldValidator } from "../utils/zFieldValidator";
import useFieldError from "../hooks/useFieldError";
import { DateInput } from "@mantine/dates";

const ProjectForm = () => {
  const { mutate, isPending } = useCreateProject();
  const personalId = usePersonalId();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const projectDefaultValues: ProjectForm = {
    personalId: personalId,
    name: "",
    startDate: new Date(),
    endDate: new Date(),
    url: "",
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: projectDefaultValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: projectSchema.omit({ id: true }),
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
      <Stack gap="md">
        <Field
          name="name"
          validators={{ onBlur: zFieldValidator(projectSchema.shape.name) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Project Name"
                placeholder="Project Name"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="startDate"
          validators={{
            onBlur: zFieldValidator(projectSchema.shape.startDate),
          }}
        >
          {({ state, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <DateInput
                label="Start Date"
                placeholder="Start Date"
                value={startDate ? new Date(startDate) : null}
                onChange={(value) =>
                  setStartDate(value ? value.toString() : null)
                }
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="endDate"
          validators={{ onBlur: zFieldValidator(projectSchema.shape.endDate) }}
        >
          {({ state, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <DateInput
                label="End Date"
                placeholder="End Date"
                value={endDate ? new Date(endDate) : null}
                onChange={(value) =>
                  setEndDate(value ? value.toString() : null)
                }
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="url"
          validators={{ onBlur: zFieldValidator(projectSchema.shape.url) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Project URL"
                placeholder="Project URL"
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
export default ProjectForm;
