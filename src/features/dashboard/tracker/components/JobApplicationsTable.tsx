import {
  Table,
  Group,
  Text,
  Paper,
  LoadingOverlay,
  TextInput,
  Select,
  ActionIcon,
  Box,
  Skeleton,
  Pagination,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronUp,
  IconChevronDown,
  IconX,
  IconFilter,
  IconSelector,
} from "@tabler/icons-react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import { createColumns } from "./JobApplicationColumn";
import { JobApplicationsTableProps } from "../types/jobTracker.type";
import { JobApplicationEmpty } from "./JobApplicationEmpty";
import { useDebouncedValue } from "@mantine/hooks";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses", color: "gray" },
  { value: "applied", label: "Applied", color: "blue" },
  { value: "interview", label: "Interview", color: "orange" },
  { value: "offer", label: "Offer", color: "green" },
  { value: "accepted", label: "Accepted", color: "teal" },
  { value: "rejected", label: "Rejected", color: "red" },
  { value: "ghosted", label: "Ghosted", color: "gray" },
] as const;

export const JobApplicationsTable = ({
  applications,
  loading = false,
  onEdit,
  onDelete,
  page,
  pageSize,
  total,
  onPageChange,
}: JobApplicationsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "appliedAt",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [debouncedGlobalFilter] = useDebouncedValue(globalFilter, 300);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const columns = useMemo(
    () => createColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
  );

  const table = useReactTable({
    data: applications,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedGlobalFilter,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    autoResetPageIndex: false,
  });

  const currentStatusFilter = table
    .getColumn("status")
    ?.getFilterValue() as string;

  const SkeletonRows = () => (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <Table.Tr key={index}>
          {columns.map((_, colIndex) => (
            <Table.Td key={colIndex}>
              <Skeleton height={24} radius="sm" />
            </Table.Td>
          ))}
        </Table.Tr>
      ))}
    </>
  );

  return (
    <Paper radius="md" withBorder w="100%" pos="relative">
      <LoadingOverlay visible={loading} zIndex={1000} />

      <Group p="md" justify="space-between">
        <TextInput
          placeholder="Search applications..."
          leftSection={<IconSearch size={16} />}
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          rightSection={
            globalFilter ? (
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => setGlobalFilter("")}
                size="sm"
              >
                <IconX size={16} />
              </ActionIcon>
            ) : null
          }
          style={{ minWidth: 300 }}
          disabled={loading}
        />
        <Group gap="xs">
          <Select
            placeholder="Filter by status"
            data={STATUS_OPTIONS}
            value={currentStatusFilter ?? ""}
            onChange={(value) =>
              table.getColumn("status")?.setFilterValue(value || undefined)
            }
            clearable
            leftSection={<IconFilter size={16} />}
            style={{ minWidth: 150 }}
            disabled={loading}
          />
        </Group>
      </Group>
      {/* Table */}
      <Table.ScrollContainer minWidth={800} type="native">
        <Table
          verticalSpacing="sm"
          horizontalSpacing="md"
          highlightOnHover
          withTableBorder={false}
        >
          <Table.Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Table.Th key={header.id}>
                    {header.isPlaceholder ? null : (
                      <Group
                        gap="xs"
                        justify="space-between"
                        style={{
                          cursor: header.column.getCanSort()
                            ? "pointer"
                            : "default",
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <Text size="sm" fw={600}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </Text>
                        {header.column.getCanSort() && (
                          <Box>
                            {header.column.getIsSorted() === "asc" ? (
                              <IconChevronUp size={14} />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <IconChevronDown size={14} />
                            ) : (
                              <IconSelector size={14} />
                            )}
                          </Box>
                        )}
                      </Group>
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            ))}
          </Table.Thead>
          <Table.Tbody>
            {loading && applications.length === 0 ? (
              <SkeletonRows />
            ) : applications.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={columns.length}>
                  <JobApplicationEmpty />
                </Table.Td>
              </Table.Tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <Table.Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      {applications.length > 0 && (
        <Group justify="space-between" p="md">
          <Text size="sm" c="dimmed">
            Showing {table.getRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} results
            {table.getFilteredRowModel().rows.length !== applications.length &&
              ` (${applications.length} total)`}
          </Text>

          <Text size="sm" c="dimmed">
            Page {page} of {Math.ceil(total / pageSize)}
          </Text>

          <Pagination
            value={page}
            onChange={onPageChange}
            total={Math.ceil(total / pageSize)}
            size="md"
            siblings={1}
            boundaries={1}
            disabled={loading}
          />
        </Group>
      )}
    </Paper>
  );
};
