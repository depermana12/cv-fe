import { ColumnDef } from "@tanstack/react-table";
import {
  Badge,
  Group,
  ActionIcon,
  Text,
  Stack,
  Tooltip,
  Modal,
  Popover,
  Select,
  Button,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconTrash,
  IconExternalLink,
  IconPencil,
  IconCalendar,
} from "@tabler/icons-react";
import { JobTracker } from "../types/jobTracker.type";
import { useUpdateJobApplication } from "../hooks/useUpdateJobApplication";
import { StatusHistoryTimeline } from "./StatusHistoryTimeline";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Link } from "@tanstack/react-router";

const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "gray.6";
    case "interview":
      return "indigo.6";
    case "offer":
      return "teal.5";
    case "accepted":
      return "green.6";
    case "rejected":
      return "red.6";
    case "ghosted":
      return "dark.4";
    default:
      return "gray.6";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "applied":
      return "Applied";
    case "interview":
      return "Interview";
    case "offer":
      return "Offer";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
    case "ghosted":
      return "Ghosted";
    default:
      return status;
  }
};

type ActionsColumnProps = {
  onEdit: (application: JobTracker) => void;
  onDelete: (application: JobTracker) => void;
};

export const createColumns = ({
  onEdit,
  onDelete,
}: ActionsColumnProps): ColumnDef<JobTracker>[] => [
  {
    id: "company",
    header: "Job & Company",
    accessorFn: (row) => `${row.jobTitle} ${row.companyName}`,
    cell: ({ row }) => {
      const application = row.original;
      return (
        <Stack gap={0}>
          <Text size="sm">{application.jobTitle}</Text>
          <Text size="xs" c="dimmed">
            {application.companyName}
          </Text>
        </Stack>
      );
    },
    enableSorting: true,
    enableGlobalFilter: true,
  },
  {
    id: "type",
    header: "Type & Level",
    accessorFn: (row) => `${row.jobType} ${row.position}`,
    cell: ({ row }) => {
      const application = row.original;
      return (
        <Stack gap={0}>
          <Text size="sm">{application.jobType}</Text>
          <Text size="xs" c="dimmed">
            {application.position}
          </Text>
        </Stack>
      );
    },
    enableSorting: false,
  },
  {
    id: "location",
    header: "Location & type",
    accessorFn: (row) => `${row.location} ${row.locationType}`,
    cell: ({ row }) => {
      const location = row.original;
      return (
        <Stack gap={0}>
          <Text size="sm">{location.location}</Text>
          <Text size="xs" c="dimmed">
            {location.locationType}
          </Text>
        </Stack>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, getValue }) => {
      const status = getValue();
      const application = row.original;

      const [popoverOpened, setPopoverOpened] = useState(false);
      const [modalOpened, { open: openModal, close: closeModal }] =
        useDisclosure(false);

      const [localStatus, setLocalStatus] = useState<
        "applied" | "interview" | "offer" | "accepted" | "rejected" | "ghosted"
      >(status as any);

      const [statusChangedAt, setStatusChangedAt] = useState<Date | null>(null);
      const { mutate, isPending } = useUpdateJobApplication();

      const statusOptions = [
        { value: "applied", label: "Applied" },
        { value: "interview", label: "Interview" },
        { value: "offer", label: "Offer" },
        { value: "accepted", label: "Accepted" },
        { value: "rejected", label: "Rejected" },
        { value: "ghosted", label: "Ghosted" },
      ];

      const handleStatusSelect = (newStatus: string | null) => {
        if (!newStatus) return;
        setLocalStatus(newStatus as typeof localStatus);
      };

      const handleUpdateStatus = () => {
        if (!statusChangedAt) return;
        mutate(
          {
            applicationId: application.id,
            data: {
              status: localStatus,
              statusChangedAt,
            },
          },
          {
            onSuccess: () => {
              setPopoverOpened(false);
              setStatusChangedAt(null);
            },
          },
        );
      };

      return (
        <>
          <Group gap={4}>
            <Tooltip label="View your application history">
              <Badge
                color={getStatusColor(localStatus)}
                variant="filled"
                size="sm"
                style={{ cursor: "pointer" }}
                onClick={openModal}
              >
                {getStatusLabel(localStatus)}
              </Badge>
            </Tooltip>
            <Popover
              width={260}
              position="bottom"
              withArrow
              shadow="md"
              opened={popoverOpened}
              onChange={setPopoverOpened}
              closeOnClickOutside={false}
              closeOnEscape={true}
            >
              <Popover.Target>
                <Tooltip label="Edit status" withArrow>
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    color="gray.6"
                    onClick={() => setPopoverOpened(true)}
                    aria-label="Update status"
                  >
                    <IconPencil size={16} />
                  </ActionIcon>
                </Tooltip>
              </Popover.Target>
              <Popover.Dropdown>
                <Select
                  label="What's the Update?"
                  size="xs"
                  data={statusOptions}
                  value={localStatus}
                  onChange={handleStatusSelect}
                  disabled={isPending}
                  allowDeselect={false}
                  mb="xs"
                />
                <DatePickerInput
                  label="When?"
                  value={statusChangedAt}
                  leftSection={<IconCalendar size={16} />}
                  onChange={(date) => {
                    setStatusChangedAt(date);
                  }}
                  placeholder="Pick date"
                  minDate={new Date(application.appliedAt)}
                  maxDate={new Date()}
                  disabled={isPending || localStatus === status}
                  size="xs"
                />
                <Group gap="md" mt="md" align="center">
                  <Button
                    variant="default"
                    size="xs"
                    onClick={() => {
                      setPopoverOpened(false);
                      setStatusChangedAt(null);
                      setLocalStatus(status as typeof localStatus);
                    }}
                    disabled={isPending}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={handleUpdateStatus}
                    disabled={!statusChangedAt || isPending}
                  >
                    Update
                  </Button>
                </Group>
              </Popover.Dropdown>
            </Popover>
          </Group>
          <Modal
            opened={modalOpened}
            onClose={closeModal}
            withCloseButton={false}
            size="sm"
            styles={{ content: { background: "#f8f9fa" } }}
          >
            <StatusHistoryTimeline
              applicationId={application.id}
              jobTitle={application.jobTitle}
              companyName={application.companyName}
            />
          </Modal>
        </>
      );
    },
    enableSorting: false,
    filterFn: "equals",
  },
  {
    accessorKey: "appliedAt",
    header: "Applied Date",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      const formatted = new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return <Text size="sm">{formatted}</Text>;
    },
    enableSorting: true,
  },
  {
    id: "jobPortal",
    header: "Job portal",
    accessorFn: (row) => `${row.jobPortal}${row.jobUrl}`,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Group gap={0}>
          <Text size="sm">{data.jobPortal}</Text>
          {data.jobUrl ? (
            <Tooltip label="View job website" withArrow>
              <ActionIcon
                variant="transparent"
                color="blue"
                size="sm"
                component={Link}
                to={data.jobUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconExternalLink size={14} />
              </ActionIcon>
            </Tooltip>
          ) : null}
        </Group>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <Group gap={0}>
          <Tooltip label="Edit application" withArrow>
            <ActionIcon
              variant="subtle"
              color="gray"
              onClick={() => onEdit(application)}
            >
              <IconPencil size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete application" withArrow>
            <ActionIcon
              variant="subtle"
              color="red"
              onClick={() => onDelete(application)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
        </Group>
      );
    },
    enableSorting: false,
  },
];
