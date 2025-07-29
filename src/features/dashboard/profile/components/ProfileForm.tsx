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
  Textarea,
} from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { DatePickerInput } from "@mantine/dates";
import { useUpdateProfile } from "@features/user/hooks/useUpdateProfile";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { userUpdateSchema } from "@features/user/schema/user";
import { ProfileFormProps } from "../types/profile.type";

export const ProfileForm = ({ user }: ProfileFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      birthDate: user?.birthDate ? new Date(user.birthDate) : undefined,
      gender: user?.gender || undefined,
      about: user?.about || "",
      bio: user?.bio || "",
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
                    handleChange(date ? new Date(date) : undefined)
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
                    handleChange(value as "male" | "female" | undefined)
                  }
                  onBlur={handleBlur}
                  error={isEditing ? useFieldError(state.meta) : undefined}
                  clearable
                  disabled={!isEditing}
                />
              )}
            </Field>
          </Group>
          <Field
            name="about"
            validators={{
              onBlur: zFieldValidator(userUpdateSchema.shape.about),
            }}
          >
            {({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <Textarea
                  name={name}
                  label="About"
                  placeholder="Tell us about yourself (max 1000 characters)"
                  value={state.value || ""}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={errorField}
                  autosize
                  minRows={3}
                  maxRows={6}
                />
              );
            }}
          </Field>

          <Field
            name="bio"
            validators={{
              onBlur: zFieldValidator(userUpdateSchema.shape.bio),
            }}
          >
            {({ state, name, handleChange, handleBlur }) => {
              const errorField = useFieldError(state.meta);
              return (
                <Textarea
                  name={name}
                  label="Bio"
                  placeholder="Brief bio (max 255 characters)"
                  value={state.value || ""}
                  onChange={(e) => handleChange(e.target.value)}
                  onBlur={handleBlur}
                  error={errorField}
                  autosize
                  minRows={2}
                  maxRows={4}
                />
              );
            }}
          </Field>

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
