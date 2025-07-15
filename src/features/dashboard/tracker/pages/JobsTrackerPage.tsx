import { useState } from "react";
import { Container, Group, Title, Button, Stack, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

import { JobTracker } from "../types/jobTracker.type";
import { useJobApplications } from "../hooks/useJobApplications";
import { JobApplicationsTable } from "../components/JobApplicationsTable";
import { DeleteJobApplicationModal } from "../components/DeleteJobApplicationModal";
import { JobApplicationModal } from "../components/JobApplicationModal";
import { JobTrackerSkeleton } from "../components/JobTrackerSkeleton";

export const JobsTrackerPage = () => {
  const [createModalOpened, { open: openCreate, close: closeCreate }] =
    useDisclosure(false);
  const [editModalOpened, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);
  const [deleteModalOpened, { open: openDelete, close: closeDelete }] =
    useDisclosure(false);

  // Selected application for edit/delete
  const [selectedApplication, setSelectedApplication] =
    useState<JobTracker | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const {
    data: res,
    isLoading,
    isFetching,
  } = useJobApplications({
    limit: pageSize,
    offset: (page - 1) * pageSize,
  });

  const applications = res?.data || [];
  const total = res?.total || 0;

  const handleEdit = (application: JobTracker) => {
    setSelectedApplication(application);
    openEdit();
  };

  const handleDelete = (application: JobTracker) => {
    setSelectedApplication(application);
    openDelete();
  };

  if (isLoading) {
    return <JobTrackerSkeleton />;
  }

  return (
    <Container size="xl" py="md">
      <Stack gap="lg">
        <Group justify="space-between">
          <Stack gap={1}>
            <Title order={1} size="h2">
              Jobs Tracker
            </Title>
            <Text c="dimmed" size="sm">
              Track your job applications and manage your job search
            </Text>
          </Stack>
          <Button
            variant="outline"
            leftSection={<IconPlus size={16} />}
            onClick={openCreate}
          >
            Add Application
          </Button>
        </Group>
        <JobApplicationsTable
          applications={applications}
          loading={isFetching}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreateNew={openCreate}
          page={page}
          pageSize={pageSize}
          total={total}
          onPageChange={setPage}
        />
      </Stack>
      <JobApplicationModal
        mode="create"
        opened={createModalOpened}
        onClose={closeCreate}
      />
      <JobApplicationModal
        mode="edit"
        initialData={selectedApplication || undefined}
        opened={editModalOpened}
        onClose={() => {
          closeEdit();
          setSelectedApplication(null);
        }}
      />
      <DeleteJobApplicationModal
        opened={deleteModalOpened}
        onClose={closeDelete}
        application={selectedApplication}
      />
    </Container>
  );
};
