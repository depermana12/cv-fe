import { useForm } from "@tanstack/react-form";
import { signInSchema } from "../schema/auth.schema";
import { useSignIn } from "../hooks/useSignIn";
import {
  Anchor,
  Box,
  Button,
  Checkbox,
  Group,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import useFieldError from "@shared/hooks/useFieldError";

const SignInForm = () => {
  const { mutate, isPending } = useSignIn();

  const defaultSignInForm = { email: "", password: "", rememberMe: false };
  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultSignInForm,
    onSubmit: async ({ value }) => mutate(value),
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Box pos="relative">
        <LoadingOverlay
          zIndex={1000}
          visible={state.isSubmitting || isPending}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack gap="xs">
          <Field
            name="email"
            validators={{
              onBlur: zFieldValidator(signInSchema.shape.email),
            }}
            children={({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  label="Email"
                  placeholder="you@kodedroid.com"
                  autoComplete="email"
                  inputMode="email"
                  required
                  id={name}
                  name={name}
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  error={errorField}
                />
              );
            }}
          />
          <Field
            name="password"
            children={({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  required
                  id={name}
                  name={name}
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  error={errorField}
                />
              );
            }}
          />
          <Group justify="space-between" mt="md">
            <Field
              name="rememberMe"
              children={({ state, handleChange }) => (
                <Checkbox
                  radius="xs"
                  label="Remember me"
                  checked={state.value}
                  onChange={(event) =>
                    handleChange(event.currentTarget.checked)
                  }
                />
              )}
            />
            <Anchor
              component={Link}
              to="/auth/forget-password"
              underline="hover"
              size="sm"
            >
              Forgot password?
            </Anchor>
          </Group>
          <Button
            fullWidth
            variant="filled"
            type="submit"
            mt="md"
            loading={isPending}
            loaderProps={{ type: "dots", color: "indigo" }}
            disabled={state.isSubmitting || isPending}
          >
            Sign In
          </Button>
        </Stack>
      </Box>
    </form>
  );
};
export default SignInForm;
