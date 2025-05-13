import { useForm } from "@tanstack/react-form";
import { useCreateSocialMedia } from "../hooks/useCreateSocialMedia";
import { usePersonalId } from "../hooks/usePersonalId";
import type { SocialMediaForm } from "../types/types";
import { socialMediaSchema } from "../schema/socialMediaSchema";
import { LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { zFieldValidator } from "../utils/zFieldValidator";
import useFieldError from "../hooks/useFieldError";

const SocialMediaForm = () => {
  const { mutate, isPending } = useCreateSocialMedia();
  const personalId = usePersonalId();

  const socialMediaDefaultValues: SocialMediaForm = {
    personalId,
    social: "",
    username: "",
    url: "",
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: socialMediaDefaultValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: socialMediaSchema.omit({ id: true }),
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
          name="social"
          validators={{
            onBlur: zFieldValidator(socialMediaSchema.shape.social),
          }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Social Media"
                placeholder="Social Media Name"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="username"
          validators={{
            onBlur: zFieldValidator(socialMediaSchema.shape.username),
          }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Username"
                placeholder="Username"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="url"
          validators={{ onBlur: zFieldValidator(socialMediaSchema.shape.url) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="URL"
                placeholder="URL"
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
export default SocialMediaForm;
