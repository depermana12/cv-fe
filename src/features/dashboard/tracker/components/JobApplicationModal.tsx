import { Modal } from "@mantine/core";
import { JobApplicationForm } from "./JobApplicationForm";
import { JobApplicationFormProps } from "../types/jobTracker.type";

export function JobApplicationModal(props: JobApplicationFormProps) {
  const { opened, onClose } = props;
  const isEdit = props.mode === "edit";
  const title = isEdit ? "Edit Job Application" : "Add New Job Application";

  return (
    <Modal opened={opened} onClose={onClose} title={title} size="xl">
      {isEdit ? (
        <JobApplicationForm
          mode="edit"
          initialData={props.initialData}
          onClose={onClose}
          opened={opened}
        />
      ) : (
        <JobApplicationForm mode="create" onClose={onClose} opened={opened} />
      )}
    </Modal>
  );
}
