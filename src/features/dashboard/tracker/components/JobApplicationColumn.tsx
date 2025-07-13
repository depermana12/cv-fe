import { ColumnDef } from "@tanstack/react-table";
import {
  Badge,
  Group,
  ActionIcon,
  Text,
  Avatar,
  Stack,
  Tooltip,
} from "@mantine/core";
import {
  IconEdit,
  IconTrash,
  IconExternalLink,
  IconPencil,
} from "@tabler/icons-react";
import { JobTracker } from "../types/jobTracker.type";
import { Link } from "@tanstack/react-router";

const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "blue";
    case "interview":
      return "yellow";
    case "offer":
      return "green";
    case "accepted":
      return "teal";
    case "rejected":
      return "red";
    case "ghosted":
      return "gray";
    default:
      return "blue";
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

const formatAvatar = (companyName: string) => {
  const name = companyName.toLowerCase().trim();
  const words = name.split(/\s+/);

  if (name.startsWith("pt")) {
    return words[1].charAt(0).toUpperCase();
  }
  return words[0].charAt(0).toUpperCase();
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
        <Group gap="sm">
          <Avatar size={32} radius="sm" color="blue">
            {formatAvatar(application.companyName)}
          </Avatar>
          <Stack gap={0}>
            <Text size="sm">{application.jobTitle}</Text>
            <Text size="xs" c="dimmed">
              {application.companyName}
            </Text>
          </Stack>
        </Group>
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
    enableSorting: true,
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
    enableSorting: true,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge color={getStatusColor(status)} variant="filled" size="sm">
          {getStatusLabel(status)}
        </Badge>
      );
    },
    enableSorting: true,
    filterFn: "equals",
  },
  {
    accessorKey: "appliedAt",
    header: "Applied Date",
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return <Text size="sm">{new Date(date).toLocaleDateString()}</Text>;
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
    enableSorting: true,
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
