import { useForm } from "@tanstack/react-form";
import { personalCreateSchema } from "../schema/personalSchema";
import type { PersonalForm } from "../types/types";
import { useCreatePersonal } from "../hooks/useCreatePersonal";
import { useAuthStore } from "../../auth/store/authStore";
import {
  Button,
  FileInput,
  LoadingOverlay,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { IconCameraUp } from "@tabler/icons-react";
import { z } from "zod";
import useFieldError from "../hooks/useFieldError";

const personalFieldSchema = personalCreateSchema.shape;

const zFieldValidator =
  <T,>(schema: z.ZodType<T>) =>
  ({ value }: { value: T }) => {
    const result = schema.safeParse(value);
    return result.success ? undefined : result.error.issues;
  };

const PersonalForm = () => {
  const { mutate, isPending, isError } = useCreatePersonal();
  const { user } = useAuthStore();

  if (!user) throw new Error("User must be logged in to use PersonalForm");

  const defaultPersonalInputValues: PersonalForm = {
    userId: user.id,
    fullName: "",
    bio: "",
    image: "",
    summary: "",
    phone: "",
    email: "",
    url: "",
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultPersonalInputValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: personalCreateSchema,
    },
  });
  // to utilize mantine's built-in prop error: red-border input, text positioning
  // and field validation onBlur, the error only show if the input isDirty and notValid
  // the logic is extracted into useFieldError hook with formatFieldError util
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
          name="image"
          children={({ state, name }) => {
            const errorField = useFieldError(state.meta);
            return (
              <FileInput
                name={name}
                label="Profile Image"
                placeholder="Upload your image"
                description="Max 1MB, PNG/JPG formats only"
                leftSection={<IconCameraUp size={18} />}
                rightSectionPointerEvents="none"
                clearable
                accept="image/*"
                error={errorField}
              />
            );
          }}
        ></Field>
        <Field
          name="fullName"
          validators={{
            onBlur: zFieldValidator(personalFieldSchema.fullName),
          }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Full Name"
                defaultValue={state.value}
                placeholder="John Doe"
                description="Enter your full name"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
              />
            );
          }}
        </Field>

        <Field
          name="bio"
          validators={{ onBlur: zFieldValidator(personalFieldSchema.bio) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Bio"
                defaultValue={state.value}
                placeholder="Frontend Developer"
                description="Optional short title or tagline"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="summary"
          validators={{
            onBlur: zFieldValidator(personalFieldSchema.summary),
          }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <Textarea
                name={name}
                label="Professional Summary"
                defaultValue={state.value}
                placeholder="Summarize your career goals and background"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="phone"
          validators={{ onBlur: zFieldValidator(personalFieldSchema.phone) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Phone"
                defaultValue={state.value}
                placeholder="+6281234567890"
                description="Include your country code"
                type="tel"
                inputMode="tel"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="email"
          validators={{ onBlur: zFieldValidator(personalFieldSchema.email) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Email"
                defaultValue={state.value}
                placeholder="you@example.com"
                description="Email address"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
                type="email"
                inputMode="email"
              />
            );
          }}
        </Field>
        <Field
          name="url"
          validators={{ onBlur: zFieldValidator(personalFieldSchema.url) }}
        >
          {({ state, name, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                name={name}
                label="Portfolio or Website"
                defaultValue={state.value}
                placeholder="https://yourportfolio.com"
                description="Optional but recommended if you have work online"
                onBlur={handleBlur}
                onChange={(e) => handleChange(e.target.value)}
                error={errorField}
                type="url"
                inputMode="url"
              />
            );
          }}
        </Field>

        <Button
          fullWidth
          type="submit"
          size="md"
          mt="md"
          loading={isPending || state.isSubmitting}
          disabled={isPending || state.isSubmitting}
        >
          {isPending || state.isSubmitting
            ? "Submitting..."
            : "Save Personal Information"}
        </Button>
        {isError && (
          <div className="mt-2 text-red-500">
            Something went wrong. Please try again.
          </div>
        )}
      </Stack>
    </form>
  );
};
export default PersonalForm;
