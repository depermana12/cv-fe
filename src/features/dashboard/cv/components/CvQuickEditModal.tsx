import {
  Modal,
  Stack,
  TextInput,
  Textarea,
  Group,
  Button,
  Switch,
  LoadingOverlay,
  Card,
} from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { useUpdateCv } from "@features/dashboard/cv/hooks/useUpdateCv";
import { useQuery } from "@tanstack/react-query";
import { cvQuery } from "@features/dashboard/cv/hooks/query";
import useFieldError from "@/shared/hooks/useFieldError";

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
  const { data: cv, isLoading } = useQuery(cvQuery(cvId || 0));
  const updateCv = useUpdateCv();

  const defaultValues = {
    title: cv?.title || "",
    description: cv?.description || "",
    isPublic: cv?.isPublic || false,
  };

  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      if (!cvId) return;

      await updateCv.mutateAsync({
        cvId,
        data: value,
      });
      closeModal();
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
      <LoadingOverlay visible={isLoading} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <Card padding="md" radius="md" withBorder>
          <Stack gap="md">
            <form.Field
              name="title"
              validators={{
                onChange: ({ value }) =>
                  !value?.trim() ? "Title is required" : undefined,
              }}
              children={(field) => (
                <TextInput
                  label="CV Title"
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  error={useFieldError(field.state.meta)}
                />
              )}
            />

            <form.Field
              name="description"
              children={(field) => (
                <Textarea
                  label="Description"
                  rows={3}
                  value={field.state.value}
                  description={`${field.state.value?.length || 0}/1000 characters`}
                  maxLength={1000}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />

            <form.Field
              name="isPublic"
              children={(field) => (
                <Switch
                  label="Make this CV public"
                  checked={field.state.value}
                  onChange={(event) =>
                    field.handleChange(event.currentTarget.checked)
                  }
                />
              )}
            />
          </Stack>
        </Card>

        <Group justify="flex-end" mt="md">
          <Button variant="default" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="outline" loading={updateCv.isPending}>
            Save Changes
          </Button>
        </Group>
      </form>
    </Modal>
  );
};
