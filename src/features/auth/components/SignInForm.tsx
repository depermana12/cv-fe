import { useForm } from "@tanstack/react-form";
import { signInSchema, type SignIn } from "../types/auth.schema";
import { useSignIn } from "../hooks/useSignIn";
import { Button, Fieldset, Stack, TextInput } from "@mantine/core";

const SignInForm = () => {
  const { mutate } = useSignIn();

  const defaultSignInForm: SignIn = { email: "", password: "" };
  const form = useForm({
    defaultValues: defaultSignInForm,
    onSubmit: async ({ value }) => {
      console.log("user login", value);
      mutate(value);
    },
    validators: {
      onChange: signInSchema,
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <Fieldset legend="Sign In">
        <Stack gap="md">
          <div>
            <form.Field
              name="email"
              children={(field) => (
                <>
                  <TextInput
                    label={field.name}
                    placeholder="Email"
                    type="email"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={
                      field.state.meta.errors.length
                        ? field.state.meta.errors
                            .map((err) => err?.message)
                            .join(", ")
                        : null
                    }
                  />
                </>
              )}
            />
          </div>

          <div>
            <form.Field
              name="password"
              children={(field) => (
                <>
                  <TextInput
                    label={field.name}
                    placeholder="Password"
                    type="password"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    error={
                      field.state.meta.errors.length
                        ? field.state.meta.errors
                            .map((err) => err?.message)
                            .join(", ")
                        : null
                    }
                  />
                </>
              )}
            />
          </div>
          <Button
            fullWidth
            type="submit"
            size="md"
            mt="md"
            disabled={form.state.isSubmitting}
          >
            {form.state.isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
        </Stack>
      </Fieldset>
    </form>
  );
};
export default SignInForm;
