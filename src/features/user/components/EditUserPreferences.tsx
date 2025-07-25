import {
  LoadingOverlay,
  Stack,
  Group,
  Button,
  Switch,
  Text,
  Paper,
} from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useUpdatePreferences } from "../hooks/useUpdatePreferences";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { userPreferencesUpdateSchema } from "../schema/user";
import { useUser } from "../hooks/useUser";

interface EditUserPreferencesProps {
  onEditComplete?: () => void;
}

export const EditUserPreferences = ({
  onEditComplete,
}: EditUserPreferencesProps) => {
  const { data: user } = useUser();
  const { mutate, isPending } = useUpdatePreferences();
  const { Field, handleSubmit, state } = useForm({
    defaultValues: {
      emailNotifications: user?.emailNotifications ?? true,
      monthlyReports: user?.monthlyReports ?? true,
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
        <Paper withBorder p="md">
          <Stack gap="md">
            <Text size="lg" fw={500}>
              Notification Preferences
            </Text>

            <Field
              name="emailNotifications"
              validators={{
                onBlur: zFieldValidator(
                  userPreferencesUpdateSchema.shape.emailNotifications,
                ),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <Group justify="space-between">
                    <div>
                      <Text size="sm" fw={500}>
                        Email Notifications
                      </Text>
                      <Text size="xs" c="dimmed">
                        Receive email notifications for important updates
                      </Text>
                    </div>
                    <Switch
                      name={name}
                      checked={state.value ?? true}
                      onChange={(event) =>
                        handleChange(event.currentTarget.checked)
                      }
                      onBlur={handleBlur}
                      error={errorField}
                    />
                  </Group>
                );
              }}
            </Field>

            <Field
              name="monthlyReports"
              validators={{
                onBlur: zFieldValidator(
                  userPreferencesUpdateSchema.shape.monthlyReports,
                ),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <Group justify="space-between">
                    <div>
                      <Text size="sm" fw={500}>
                        Monthly Reports
                      </Text>
                      <Text size="xs" c="dimmed">
                        Receive monthly summary reports of your activity
                      </Text>
                    </div>
                    <Switch
                      name={name}
                      checked={state.value ?? true}
                      onChange={(event) =>
                        handleChange(event.currentTarget.checked)
                      }
                      onBlur={handleBlur}
                      error={errorField}
                    />
                  </Group>
                );
              }}
            </Field>
          </Stack>
        </Paper>

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={state.isSubmitting || isPending}>
            Update Preferences
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
