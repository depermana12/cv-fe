import {
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Select,
  Button,
} from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { userUpdateSchema } from "../schema/user";
import { DatePickerInput } from "@mantine/dates";
import { useUser } from "../hooks/useUser";

interface EditUserProfileProps {
  onEditComplete?: () => void;
}

export const EditUserProfile = ({ onEditComplete }: EditUserProfileProps) => {
  const { data: user } = useUser();
  const { mutate, isPending } = useUpdateProfile();
  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      birthDate: user?.birthDate ? new Date(user.birthDate) : null,
      gender: user?.gender || null,
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
            name="firstName"
            validators={{
              onBlur: zFieldValidator(userUpdateSchema.shape.firstName),
            }}
          >
            {({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  name={name}
                  label="First Name"
                  placeholder="Enter your first name"
                  value={state.value || ""}
                  error={errorField}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                />
              );
            }}
          </Field>
          <Field
            name="lastName"
            validators={{
              onBlur: zFieldValidator(userUpdateSchema.shape.lastName),
            }}
          >
            {({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <TextInput
                  name={name}
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={state.value || ""}
                  error={errorField}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                />
              );
            }}
          </Field>
        </Group>

        <Group justify="center" gap="md" grow>
          <Field
            name="birthDate"
            validators={{
              onBlur: zFieldValidator(userUpdateSchema.shape.birthDate),
            }}
          >
            {({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <DatePickerInput
                  name={name}
                  label="Birth Date"
                  placeholder="Select your birth date"
                  value={state.value}
                  onChange={(date) =>
                    handleChange(date ? new Date(date) : null)
                  }
                  onBlur={handleBlur}
                  error={errorField}
                  maxDate={new Date()}
                />
              );
            }}
          </Field>
          <Field
            name="gender"
            validators={{
              onBlur: zFieldValidator(userUpdateSchema.shape.gender),
            }}
          >
            {({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <Select
                  name={name}
                  label="Gender"
                  placeholder="Select your gender"
                  value={state.value}
                  data={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                  ]}
                  onChange={(value) =>
                    handleChange(value as "male" | "female" | null)
                  }
                  onBlur={handleBlur}
                  error={errorField}
                  clearable
                />
              );
            }}
          </Field>
        </Group>

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={state.isSubmitting || isPending}>
            Save Changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
