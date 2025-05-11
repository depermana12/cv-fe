import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button, LoadingOverlay, Stack, TextInput, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";

import { educationSchema } from "../schema/educationSchema";
import type { EducationForm } from "../types/types";
import useFieldError from "../hooks/useFieldError";
import { useCreateEducation } from "../hooks/useCreateEducation";
import { useState } from "react";
import { usePersonalId } from "../hooks/usePersonalId";

const educationFieldSchema = educationSchema.shape;

const zFieldValidator =
  <T,>(schema: z.ZodType<T>) =>
  ({ value }: { value: T }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues;
  };

const EducationForm = () => {
  const { mutate, isPending } = useCreateEducation();
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const personalId = usePersonalId();

  const defaultEducationValues: EducationForm = {
    personalId: personalId,
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: new Date(),
    endDate: new Date(),
    gpa: null,
    url: "",
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultEducationValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: educationSchema.omit({ id: true }),
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
          name="institution"
          validators={{
            onBlur: zFieldValidator(educationFieldSchema.institution),
          }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Institution"
                placeholder="University Name"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>

        <Field
          name="degree"
          validators={{ onBlur: zFieldValidator(educationFieldSchema.degree) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Degree"
                placeholder="Bachelor of Science"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>

        <Field
          name="fieldOfStudy"
          validators={{
            onBlur: zFieldValidator(educationFieldSchema.fieldOfStudy),
          }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Field of Study"
                placeholder="Computer Science"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>

        <Field name="startDate">
          {({ state, name }) => {
            const errorField = useFieldError(state.meta);
            return (
              <DateInput
                name={name}
                placeholder="Start Date"
                label="Start Date"
                value={startDate ? new Date(startDate) : null}
                onChange={(value) =>
                  setStartDate(value ? value.toISOString() : null)
                }
                error={errorField}
              />
            );
          }}
        </Field>

        <Field name="endDate">
          {({ state, name }) => {
            const errorField = useFieldError(state.meta);
            return (
              <DateInput
                name={name}
                placeholder="End Date"
                label="End Date"
                value={endDate ? new Date(endDate) : null}
                onChange={(value) =>
                  setEndDate(value ? value.toISOString() : null)
                }
                error={errorField}
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
                value={state.value ?? ""}
                onChange={(e) => handleChange(e.target.value || null)}
                error={errorField}
              />
            );
          }}
        </Field>

        <Field
          name="url"
          validators={{ onBlur: zFieldValidator(educationFieldSchema.url) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Verification URL"
                placeholder="https://example.ac.id"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>

        <Group justify="flex-end">
          <Button type="submit" disabled={state.isSubmitting || isPending}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default EducationForm;
