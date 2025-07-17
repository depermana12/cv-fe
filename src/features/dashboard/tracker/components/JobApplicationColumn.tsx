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
  Menu,
  Anchor,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import {
  IconTrash,
  IconExternalLink,
  IconPencil,
  IconCalendar,
  IconDots,
  IconClock,
} from "@tabler/icons-react";
import { JobTracker } from "../types/jobTracker.type";
import { useUpdateJobApplication } from "../hooks/useUpdateJobApplication";
import { StatusHistoryTimeline } from "./StatusHistoryTimeline";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";

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
                variant="light"
                radius="sm"
                size="md"
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
                  onChange={(value) => handleStatusSelect(value)}
                  disabled={isPending}
                  allowDeselect={false}
                  mb="xs"
                />
                <DateTimePicker
                  label="When?"
                  value={statusChangedAt}
                  leftSection={<IconCalendar size={16} />}
                  onChange={(value) => setStatusChangedAt(value as Date | null)}
                  placeholder="Pick date & time"
                  minDate={new Date(application.appliedAt)}
                  maxDate={new Date()}
                  disabled={isPending || localStatus === status}
                  size="xs"
                  timePickerProps={{
                    leftSection: <IconClock size={16} />,
                    withDropdown: true,
                    format: "24h",
                    withSeconds: true,
                  }}
                  valueFormat="DD MMM YYYY, HH:mm:ss"
                  popoverProps={{
                    position: "bottom-start",
                    withinPortal: true,
                  }}
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
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue || filterValue.length === 0) return true;
      return filterValue.includes(row.getValue(columnId));
    },
  },
  {
    accessorKey: "appliedAt",
    header: "Applied",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      const formatted = new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return <Text size="sm">{formatted}</Text>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "cvId",
    header: "CV Used",
    cell: ({ getValue }) => {
      const cvId = getValue() as number | null;
      return (
        <Text size="sm" c={cvId ? "inherit" : "dimmed"}>
          {cvId ? `CV #${cvId}` : "Not specified"}
        </Text>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "note",
    header: "Note",
    cell: ({ getValue }) => {
      const note = getValue() as string | null;
      return (
        <Text size="sm" c={note ? "inherit" : "dimmed"} truncate>
          {note || "No note"}
        </Text>
      );
    },
    enableSorting: false,
  },
  {
    id: "jobPortal",
    header: "Source",
    accessorFn: (row) => `${row.jobPortal}${row.jobUrl}`,
    cell: ({ row }) => {
      const data = row.original;
      return data.jobUrl ? (
        <Tooltip label="Open job posting" withArrow>
          <Anchor
            href={data.jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            underline="never"
            c="inherit"
          >
            <Group gap={4}>
              <Text size="sm" c="inherit">
                {data.jobPortal}
              </Text>
              <IconExternalLink size={12} />
            </Group>
          </Anchor>
        </Tooltip>
      ) : (
        <Text size="sm" c="inherit">
          {data.jobPortal}
        </Text>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => {
      const application = row.original;
      return (
        <Menu shadow="md" width={160} position="bottom-end">
          <Menu.Target>
            <Tooltip label="Actions" withArrow>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconDots size={16} />
              </ActionIcon>
            </Tooltip>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconPencil size={14} />}
              onClick={() => onEdit(application)}
            >
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<IconTrash size={14} />}
              color="red"
              onClick={() => onDelete(application)}
            >
              Delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      );
    },
    enableSorting: false,
  },
];
