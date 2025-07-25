import { LoadingOverlay, Stack, TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useUpdateCredentials } from "../hooks/useUpdateCredentials";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { userCredentialsUpdateSchema } from "../schema/user";
import { useUser } from "../hooks/useUser";

interface EditUserCredentialsProps {
  onEditComplete?: () => void;
}

export const EditUserCredentials = ({
  onEditComplete,
}: EditUserCredentialsProps) => {
  const { data: user } = useUser();
  const { mutate, isPending } = useUpdateCredentials();
  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      username: user?.username || "",
      email: user?.email || "",
    },
    onSubmit: async ({ value }) => {
      mutate(value, {
        onSuccess: () => {
          onEditComplete?.();
        },
      });
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
        <Group justify="center" gap="md" grow>
          <Field
            name="username"
            validators={{
              onBlur: zFieldValidator(
                userCredentialsUpdateSchema.shape.username,
              ),
            }}
          >
            {({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  name={name}
                  label="Username"
                  placeholder="Enter your username"
                  value={state.value || ""}
                  error={errorField}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                />
              );
            }}
          </Field>
          <Field
            name="email"
            validators={{
              onBlur: zFieldValidator(userCredentialsUpdateSchema.shape.email),
            }}
          >
            {({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  name={name}
                  label="Email"
                  placeholder="Enter your email"
                  value={state.value || ""}
                  error={errorField}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  type="email"
                />
              );
            }}
          </Field>
        </Group>

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={state.isSubmitting || isPending}>
            Update Credentials
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
