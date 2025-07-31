import { TextInput, Button, Group, Box, Anchor } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";

import { forgetPasswordSchema, ForgetPassword } from "../schema/auth.schema";
import { useForgetPassword } from "../hooks/useForgetPassword";
import useFieldError from "@shared/hooks/useFieldError";

export const ForgetPasswordForm = () => {
  const forgetPasswordMutation = useForgetPassword();

  const defaultValues: ForgetPassword = {
    email: "",
  };
  const { Field, handleSubmit } = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      forgetPasswordMutation.mutate(value);
    },
    validators: {
      onSubmit: forgetPasswordSchema,
    },
  });

  return (
    <Box>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleSubmit();
        }}
      >
        <Field
          name="email"
          validators={{
            onChange: forgetPasswordSchema.shape.email,
          }}
        >
          {(field) => (
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={useFieldError(field.state.meta)}
              mb="md"
            />
          )}
        </Field>

        <Group justify="space-between" mt="lg">
          <Anchor component={Link} to="/auth/signin" size="sm">
            Back to sign in
          </Anchor>
        </Group>

        <Button
          type="submit"
          fullWidth
          mt="xl"
          loading={forgetPasswordMutation.isPending}
        >
          Send Reset Email
        </Button>
      </form>
    </Box>
  );
};
