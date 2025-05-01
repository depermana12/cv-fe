import { useForm } from "@tanstack/react-form";
import { signUpSchema, type SignUp } from "../types/auth.schema";
import { useSignUp } from "../hooks/useSignUp";
import {
  Button,
  Fieldset,
  LoadingOverlay,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";

const SignUpForm = () => {
  const { mutate, isPending } = useSignUp();

  const defaultSignUpForm: SignUp = { username: "", email: "", password: "" };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultSignUpForm,
    onSubmit: async ({ value }) => {
      console.log("submitting", value);
      mutate(value);
    },
    validators: {
      onChange: signUpSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-4"
    >
      <LoadingOverlay visible={isPending || state.isSubmitting} />
      <Fieldset legend="Sign In">
        <Stack gap="md">
          <Field
            name="username"
            children={({ state, name, handleChange, handleBlur }) => (
              <>
                <TextInput
                  label={name}
                  placeholder="username"
                  type="text"
                  id={name}
                  name={name}
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  error={
                    state.meta.errors.length
                      ? state.meta.errors.map((err) => err?.message).join(", ")
                      : null
                  }
                />
              </>
            )}
          />

          <Field
            name="email"
            children={({ state, name, handleChange, handleBlur }) => (
              <>
                <TextInput
                  label={name}
                  placeholder="Email"
                  type="email"
                  id={name}
                  name={name}
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  error={
                    state.meta.errors.length
                      ? state.meta.errors.map((err) => err?.message).join(", ")
                      : null
                  }
                />
              </>
            )}
          />

          <Field
            name="password"
            children={({ state, name, handleChange, handleBlur }) => (
              <>
                <PasswordInput
                  label={name}
                  placeholder="Password"
                  type="password"
                  id={name}
                  name={name}
                  value={state.value}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e.target.value)}
                  error={
                    state.meta.errors.length
                      ? state.meta.errors.map((err) => err?.message).join(", ")
                      : null
                  }
                />
              </>
            )}
          />

          <Button
            fullWidth
            type="submit"
            size="md"
            mt="md"
            loading={isPending || state.isSubmitting}
            disabled={isPending || state.isSubmitting}
          >
            {state.isSubmitting ? "Signing Up..." : "Sign Up"}
          </Button>
        </Stack>
      </Fieldset>
    </form>
  );
};
export default SignUpForm;
