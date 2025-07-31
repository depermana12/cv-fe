import { PasswordInput, Button, Group, Box, Anchor } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";

import { ResetPasswordSchema, ResetPassword } from "../schema/auth.schema";
import { useResetPassword } from "../hooks/useResetPassword";
import useFieldError from "@shared/hooks/useFieldError";

type ResetPasswordFormProps = {
  token: string;
};

export const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const resetPasswordMutation = useResetPassword();

  const defaultValues: ResetPassword = {
    password: "",
    confirmPassword: "",
  };

  const { Field, handleSubmit } = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      resetPasswordMutation.mutate({ token, data: value });
    },
    validators: {
      onSubmit: ResetPasswordSchema,
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
          name="password"
          validators={{
            onChange: ResetPasswordSchema.innerType().shape.password,
          }}
        >
          {(field) => (
            <PasswordInput
              withAsterisk
              label="New Password"
              placeholder="Enter your new password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              error={useFieldError(field.state.meta)}
              mb="md"
            />
          )}
        </Field>

        <Field
          name="confirmPassword"
          validators={{
            onChange: ResetPasswordSchema.innerType().shape.confirmPassword,
          }}
        >
          {(field) => (
            <PasswordInput
              withAsterisk
              label="Confirm New Password"
              placeholder="Confirm your new password"
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
          loading={resetPasswordMutation.isPending}
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
};
