import { useForm } from "@tanstack/react-form";
import { signUpSchema, type SignUp } from "../types/auth.schema";
import { useSignUp } from "../hooks/useSignUp";
import {
  Box,
  Button,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
  Text,
  Anchor,
  Divider,
} from "@mantine/core";
import { zFieldValidator } from "../../cv/utils/zFieldValidator";
import useFieldError from "../../cv/hooks/useFieldError";
import { Link } from "@tanstack/react-router";
import { IconBrandGoogle } from "@tabler/icons-react";

const SignUpForm = () => {
  const { mutate, isPending } = useSignUp();

  const defaultSignUpForm: SignUp = { username: "", email: "", password: "" };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultSignUpForm,
    onSubmit: async ({ value }) => mutate(value),
    validators: {
      onSubmit: signUpSchema,
    },
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
          visible={isPending}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        <Stack gap="md">
          <Field
            name="username"
            validators={{
              onBlur: zFieldValidator(signUpSchema.shape.username),
            }}
            children={({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  label="Username"
                  placeholder="Your username"
                  autoComplete="username"
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
            name="email"
            validators={{
              onBlur: zFieldValidator(signUpSchema.shape.email),
            }}
            children={({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  label="Email"
                  placeholder="you@kodedroid.com"
                  inputMode="email"
                  autoComplete="email"
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
            validators={{
              onBlur: zFieldValidator(signUpSchema.shape.password),
            }}
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
          <Button
            fullWidth
            type="submit"
            mt="md"
            loading={isPending}
            loaderProps={{ type: "dots", color: "indigo" }}
            disabled={isPending || state.isSubmitting}
          >
            Sign Up
          </Button>
        </Stack>
        <Text ta="center" size="sm" mt="md" c="dimmed">
          Already have an account?{" "}
          <Anchor component={Link} to="/auth/signin" underline="hover" fw={500}>
            Sign In
          </Anchor>
        </Text>
        <Divider my="xs" label="or" labelPosition="center" />
        <Button
          variant="default"
          fullWidth
          leftSection={<IconBrandGoogle size={16} />}
          component="a"
          href="#"
        >
          Continue with Google
        </Button>
      </Box>
    </form>
  );
};
export default SignUpForm;
