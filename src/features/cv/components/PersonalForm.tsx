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
import { ChangeEvent } from "react";

const PersonalForm = () => {
  const { mutate, isPending } = useCreatePersonal();
  const { user } = useAuthStore();
  if (!user) {
    throw new Error("User must be logged in to use PersonalForm");
  }
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

  const getFieldError = (
    errors: Array<{ message?: string } | null | undefined>,
  ) => {
    return errors.length
      ? errors
          .map((err) => err?.message)
          .filter(Boolean)
          .join(", ")
      : null;
  };

  const fieldComponents: { name: keyof PersonalForm; component: any }[] = [
    { name: "fullName", component: TextInput },
    { name: "bio", component: TextInput },
    { name: "summary", component: Textarea },
    { name: "phone", component: FileInput },
    { name: "email", component: FileInput },
    { name: "url", component: FileInput },
  ];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <LoadingOverlay visible={isPending || state.isSubmitting} />
      <Stack gap="md">
        <Field
          name="image"
          children={({ state, name }) => (
            <>
              <FileInput
                leftSection={<IconCameraUp size={18} />}
                clearable
                label={name}
                description="max 1Mb file size"
                placeholder="Your image"
                rightSectionPointerEvents="none"
                accept="image/*"
                error={
                  state.meta.errors.length
                    ? state.meta.errors.map((err) => err?.message).join(", ")
                    : null
                }
              />
            </>
          )}
        ></Field>
        {fieldComponents.map((field) => (
          <Field key={field.name} name={field.name}>
            {({ state, handleChange, handleBlur }) => (
              <field.component
                label={field.name}
                value={state.value}
                onChange={(
                  e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
                ) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={getFieldError(state.meta.errors)}
              />
            )}
          </Field>
        ))}

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
      </Stack>
    </form>
  );
};
export default PersonalForm;
