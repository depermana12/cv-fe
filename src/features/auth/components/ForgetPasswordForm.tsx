import { TextInput, Button, Group, Box, Anchor, Center } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { Link } from "@tanstack/react-router";

import { forgetPasswordSchema, ForgetPassword } from "../schema/auth.schema";
import { useForgetPassword } from "../hooks/useForgetPassword";
import useFieldError from "@shared/hooks/useFieldError";
import { IconArrowLeft } from "@tabler/icons-react";

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
              label="Your email"
              required
              type="email"
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
          <Anchor c="dimmed" size="sm" component={Link} to="/auth/signin">
            <Center inline>
              <IconArrowLeft size={12} stroke={1.5} />
              <Box ml={5}>Sign in page</Box>
            </Center>
          </Anchor>
          <Button
            radius="sm"
            size="sm"
            type="submit"
            loading={forgetPasswordMutation.isPending}
          >
            Reset password
          </Button>
        </Group>
      </form>
    </Box>
  );
};
