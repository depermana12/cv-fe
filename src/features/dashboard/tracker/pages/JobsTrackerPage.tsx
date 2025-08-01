import { useState } from "react";
import { Group, Title, Button, Stack } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";

import { JobTracker } from "../types/jobTracker.type";
import { useJobApplications } from "../hooks/useJobApplications";
import { JobApplicationsTable } from "../components/JobApplicationsTable";
import { DeleteJobApplicationModal } from "../components/DeleteJobApplicationModal";
import { JobApplicationModal } from "../components/JobApplicationModal";
import { JobTrackerSkeleton } from "../components/JobTrackerSkeleton";
import { JobsTrackerError } from "../components/JobTrackerError";

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
  const [pageSize, setPageSize] = useState(10);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 300);

  const {
    data: res,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useJobApplications({
    limit: pageSize,
    offset: (page - 1) * pageSize,
    appliedAtFrom: dateRange[0] || undefined,
    appliedAtTo: dateRange[1] || undefined,
    search: debouncedSearchQuery || undefined,
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

  // Possibly i implemented bug where the initial select of date triger render before select the range second date
  const handlePageSizeChange = (newSize: string | null) => {
    if (newSize) {
      setPageSize(Number(newSize));
      setPage(1);
    }
  };

  const handleDateRangeChange = (newDateRange: [Date | null, Date | null]) => {
    setDateRange(newDateRange);
    setPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearchQuery(newSearch);
    setPage(1);
  };

  if (isLoading) {
    return <JobTrackerSkeleton />;
  }

  if (error) {
    return <JobsTrackerError error={error} onRetry={refetch} />;
  }

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2} size="h3">
          Jobs Tracker
        </Title>
        <Button
          variant="filled"
          leftSection={<IconPlus size={16} />}
          onClick={openCreate}
        >
          Add Application
        </Button>
      </Group>
      <Stack gap="md">
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
          onPageSizeChange={handlePageSizeChange}
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
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
    </Stack>
  );
};
