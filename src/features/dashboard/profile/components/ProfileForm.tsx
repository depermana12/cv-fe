import { useState } from "react";
import {
  Stack,
  Group,
  Title,
  Card,
  Button,
  TextInput,
  Select,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { DatePickerInput } from "@mantine/dates";
import { useUpdateProfile } from "../../../user/hooks/useUpdateProfile";
import useFieldError from "../../../cv/hooks/useFieldError";
import { zFieldValidator } from "../../../cv/utils/zFieldValidator";
import { userUpdateSchema } from "../../../user/schema/user";
import { ProfileFormProps } from "../types/profile.type";

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      birthDate: user?.birthDate
        ? typeof user.birthDate === "string"
          ? new Date(user.birthDate)
          : user.birthDate
        : null,
      gender: user?.gender || null,
    },
    onSubmit: async ({ value }) => {
      updateProfile(value, {
        onSuccess: () => {
          setIsEditing(false);
        },
      });
    },
  });

  return (
    <Card padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Title order={4}>Basic Information</Title>
      </Group>
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
              {({ state, name, handleChange, handleBlur }) => (
                <TextInput
                  name={name}
                  label="First Name"
                  placeholder="Enter your first name"
                  value={state.value || ""}
                  error={isEditing ? useFieldError(state.meta) : undefined}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  disabled={!isEditing}
                />
              )}
            </Field>
            <Field
              name="lastName"
              validators={{
                onBlur: zFieldValidator(userUpdateSchema.shape.lastName),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => (
                <TextInput
                  name={name}
                  label="Last Name"
                  placeholder="Enter your last name"
                  value={state.value || ""}
                  error={isEditing ? useFieldError(state.meta) : undefined}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  disabled={!isEditing}
                />
              )}
            </Field>
          </Group>

          <Group justify="center" gap="md" grow>
            <Field
              name="birthDate"
              validators={{
                onBlur: zFieldValidator(userUpdateSchema.shape.birthDate),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => (
                <DatePickerInput
                  name={name}
                  label="Birth Date"
                  placeholder="Select your birth date"
                  value={state.value}
                  onChange={(date) =>
                    handleChange(date ? new Date(date) : null)
                  }
                  onBlur={handleBlur}
                  error={isEditing ? useFieldError(state.meta) : undefined}
                  maxDate={new Date()}
                  disabled={!isEditing}
                />
              )}
            </Field>
            <Field
              name="gender"
              validators={{
                onBlur: zFieldValidator(userUpdateSchema.shape.gender),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => (
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
                  error={isEditing ? useFieldError(state.meta) : undefined}
                  clearable
                  disabled={!isEditing}
                />
              )}
            </Field>
          </Group>

          <Group justify="space-between" mt="md">
            {!isEditing ? (
              <Button variant="outline" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <Group>
                <Button variant="default" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button
                  variant="outline"
                  type="submit"
                  loading={state.isSubmitting || isPending}
                  disabled={state.isSubmitting || isPending}
                >
                  Save Changes
                </Button>
              </Group>
            )}
          </Group>
        </Stack>
      </form>
    </Card>
  );
};
