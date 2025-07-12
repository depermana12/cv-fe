import { Modal } from "@mantine/core";
import { JobApplicationForm } from "./JobApplicationForm";
import { JobApplicationFormProps } from "../types/jobTracker.type";

export const JobApplicationModal = ({
  opened,
  onClose,
  initialData,
  mode,
}: JobApplicationFormProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={initialData ? "Edit Job Application" : "Add New Job Application"}
      size="xl"
    >
      <JobApplicationForm
        initialData={initialData}
        mode={mode}
        onClose={onClose}
        opened={opened}
      />
    </Modal>
  );
};
