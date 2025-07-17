import { Modal } from "@mantine/core";
import { JobApplicationForm } from "./JobApplicationForm";
import { JobApplicationFormProps } from "../types/jobTracker.type";
import { useCreateJobApplication } from "../hooks/useCreateJobApplication";
import { useUpdateJobApplication } from "../hooks/useUpdateJobApplication";

export function JobApplicationModal(props: JobApplicationFormProps) {
  const { opened, onClose } = props;
  const isEdit = props.mode === "edit";
  const title = isEdit ? "Edit Job Application" : "Add New Job Application";

  const { isPending: isCreating } = useCreateJobApplication();
  const { isPending: isUpdating } = useUpdateJobApplication();
  const isLoading = isCreating || isUpdating;

  // For edit mode, only show modal if we have initial data
  const shouldOpen = isEdit ? opened && !!props.initialData : opened;

  return (
    <Modal
      opened={shouldOpen}
      onClose={onClose}
      title={title}
      size="lg"
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      {isEdit && props.initialData ? (
        <JobApplicationForm
          mode="edit"
          initialData={props.initialData}
          onClose={onClose}
          opened={opened}
        />
      ) : (
        <JobApplicationForm
          mode="create"
          initialData={props.initialData}
          onClose={onClose}
          opened={opened}
        />
      )}
    </Modal>
  );
}
