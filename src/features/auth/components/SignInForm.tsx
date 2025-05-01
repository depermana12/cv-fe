import { useForm } from "@tanstack/react-form";
import { signInSchema, type SignIn } from "../types/auth.schema";
import { useSignIn } from "../hooks/useSignIn";
import {
  Button,
  Fieldset,
  PasswordInput,
  Stack,
  TextInput,
} from "@mantine/core";

const SignInForm = () => {
  const { mutate } = useSignIn();

  const defaultSignInForm: SignIn = { email: "", password: "" };
  const { Field, handleSubmit, state } = useForm({
    defaultValues: defaultSignInForm,
    onSubmit: async ({ value }) => {
      console.log("user login", value);
      mutate(value);
    },
    //TODO: invalid error per field
    validators: {
      onChange: signInSchema,
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
      <Fieldset legend="Sign In">
        <Stack gap="md">
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
            disabled={state.isSubmitting}
          >
            {state.isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </Stack>
      </Fieldset>
    </form>
  );
};
export default SignInForm;
