import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Group,
  Button,
  LoadingOverlay,
  Card,
  Text,
  Box,
} from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useUpdateCv } from "@features/dashboard/cv/hooks/useUpdateCv";
import { useQuery } from "@tanstack/react-query";
import { cvQuery } from "@features/dashboard/cv/hooks/query";
import useFieldError from "@/shared/hooks/useFieldError";
import { cvService } from "../services/cvService";
import { cvUpdateSchema } from "../schema/cv.schema";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

interface CvQuickEditModalProps {
  opened: boolean;
  onClose: () => void;
  cvId: number | null;
}

export const CvQuickEditModal = ({
  opened,
  onClose: closeModal,
  cvId,
}: CvQuickEditModalProps) => {
  const { data: cv, isLoading } = useQuery(cvQuery(cvId!));
  const { mutate: updateCv, isPending } = useUpdateCv();

  const defaultValues = {
    title: cv?.title || "",
    description: cv?.description || "",
    slug: cv?.slug || "",
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (!cvId) return;

      updateCv(
        { cvId, data: value },
        {
          onSuccess: () => {
            closeModal();
            notifications.show({
              title: "Updated!",
              icon: <IconCheck size={16} />,
              message: "Your CV has been successfully updated.",
              color: "green",
            });
          },
        },
      );
    },
    validators: {
      onSubmit: zFieldValidator(cvUpdateSchema),
    },
  });

  const handleClose = () => {
    form.reset();
    closeModal();
  };

  if (!opened || !cvId) return null;

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Quick Edit CV"
      centered
      size="lg"
    >
      <Box pos="relative">
        <LoadingOverlay visible={isLoading || isPending} />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <Card padding="md" radius="md" withBorder>
            <Stack gap="xs">
              <form.Field
                name="title"
                validators={{
                  onBlur: zFieldValidator(cvUpdateSchema.shape.title),
                }}
                children={(field) => (
                  <TextInput
                    label="CV Title"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={() => field.handleBlur()}
                    error={useFieldError(field.state.meta)}
                  />
                )}
              />

              <form.Field
                name="description"
                validators={{
                  onBlur: zFieldValidator(cvUpdateSchema.shape.description),
                }}
                children={(field) => (
                  <Textarea
                    label="Description"
                    rows={3}
                    value={field.state.value}
                    description={`${field.state.value?.length || 0}/1000 characters`}
                    maxLength={1000}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={() => field.handleBlur()}
                    error={useFieldError(field.state.meta)}
                  />
                )}
              />

              <form.Field
                name="slug"
                asyncDebounceMs={500}
                validators={{
                  onBlur: zFieldValidator(cvUpdateSchema.shape.slug),
                  onChangeAsync: async ({ value }) => {
                    if (!value || value.length < 3) {
                      return undefined;
                    }
                    try {
                      const response = await cvService.slugExists(
                        value,
                        cvId || 0,
                      );

                      if (!response.data.available) {
                        return "This slug is already taken";
                      }

                      return undefined;
                    } catch (err) {
                      return "Unable to validate slug right now.";
                    }
                  },
                }}
                children={({ state, handleChange, handleBlur }) => {
                  const errorField = state.meta.errors.join(", ");
                  const isValidating = state.meta.isValidating;

                  return (
                    <TextInput
                      label="URL Slug"
                      placeholder="my-awesome-cv"
                      description="Custom URL for your CV (e.g., my-awesome-cv)"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      rightSection={
                        isValidating ? (
                          <Text size="xs" c="blue.6">
                            ⏳
                          </Text>
                        ) : state.value && !errorField ? (
                          <Text size="xs" c="green.6">
                            ✓
                          </Text>
                        ) : state.value && errorField ? (
                          <Text size="xs" c="red.6">
                            ✗
                          </Text>
                        ) : null
                      }
                    />
                  );
                }}
              />
            </Stack>
          </Card>

          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outline"
              loading={isPending || form.state.isSubmitting}
              disabled={form.state.isSubmitting || isPending}
            >
              Save Changes
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};
