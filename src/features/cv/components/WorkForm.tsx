import { useState } from "react";
import { useCreateWork } from "../hooks/useCreateWork";
import { usePersonalId } from "../hooks/usePersonalId";
import type { WorkForm } from "../types/types";
import { useForm } from "@tanstack/react-form";
import { workSchema } from "../schema/workSchema";
import { Checkbox, LoadingOverlay, Stack, TextInput } from "@mantine/core";
import useFieldError from "../hooks/useFieldError";
import { DateInput } from "@mantine/dates";
import { zFieldValidator } from "../utils/zFieldValidator";

const WorkForm = () => {
  const { mutate, isPending } = useCreateWork();
  const personalId = usePersonalId();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [currentWork, setCurrentWork] = useState<boolean>(false);

  const defaultWorkValues: WorkForm = {
    personalId: personalId,
    company: "",
    position: "",
    startDate: new Date(),
    endDate: new Date(),
    url: "",
    isCurrent: false,
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultWorkValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: workSchema.omit({ id: true }),
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
          name="company"
          validators={{ onBlur: zFieldValidator(workSchema.shape.company) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Company"
                placeholder="Company Name"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="position"
          validators={{ onBlur: zFieldValidator(workSchema.shape.position) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Position"
                placeholder="Position Title"
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
          validators={{ onBlur: zFieldValidator(workSchema.shape.startDate) }}
        >
          {({ state, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <DateInput
                label="Start Date"
                placeholder="YYYY-MM-DD"
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
          validators={{ onBlur: zFieldValidator(workSchema.shape.endDate) }}
        >
          {({ state, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <DateInput
                label="End Date"
                placeholder="YYYY-MM-DD"
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
          validators={{ onBlur: zFieldValidator(workSchema.shape.url) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Company URL"
                placeholder="https://example.com"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="isCurrent"
          validators={{ onBlur: zFieldValidator(workSchema.shape.isCurrent) }}
        >
          {({ state, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <Checkbox
                checked={currentWork}
                label="Currently Working Here?"
                onChange={(e) => {
                  setCurrentWork(e.currentTarget.checked);
                }}
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
export default WorkForm;
