import { Modal, Text, Button, Group } from "@mantine/core";
import { useDeleteJobApplication } from "../hooks/useDeleteJobApplication";
import { notifications } from "@mantine/notifications";
import { DeleteJobApplicationProps } from "../types/jobTracker.type";

export const DeleteJobApplicationModal = ({
  opened,
  onClose,
  application,
}: DeleteJobApplicationProps) => {
  const { mutate: deleteApplication, isPending } = useDeleteJobApplication();

  const handleDelete = () => {
    if (!application) return;

    deleteApplication(application.id, {
      onSuccess: () => {
        onClose();
        notifications.show({
          title: "Deleted!",
          message: `Job application ${application.jobTitle} has been deleted`,
          color: "green",
          position: "top-right",
          autoClose: 4000,
          withCloseButton: true,
        });
      },
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete Job Application?"
      centered
    >
      {application && (
        <Text mb="lg">
          This will delete your application{" "}
          <span style={{ fontWeight: 700 }}>
            {application.jobTitle} at {application.companyName}
          </span>
        </Text>
      )}

      <Group justify="flex-end">
        <Button variant="default" onClick={onClose} disabled={isPending}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDelete} loading={isPending}>
          Delete
        </Button>
      </Group>
    </Modal>
  );
};
