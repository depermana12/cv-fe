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
  Popover,
  Checkbox,
  Stack,
  Tooltip,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import {
  IconSearch,
  IconChevronUp,
  IconChevronDown,
  IconX,
  IconFilter,
  IconSelector,
  IconColumns3,
  IconCalendar,
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
  onPageSizeChange,
  dateRange,
  onDateRangeChange,
  searchQuery = "",
  onSearchChange,
}: JobApplicationsTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "appliedAt",
      desc: true,
    },
  ]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    cvId: false,
    note: false,
  });

  const columns = useMemo(
    () => createColumns({ onEdit, onDelete }),
    [onEdit, onDelete],
  );

  const columnVisibilityOptions = [
    { value: "company", label: "Job & Company" },
    { value: "type", label: "Type & Level" },
    { value: "location", label: "Location & Type" },
    { value: "status", label: "Status" },
    { value: "appliedAt", label: "Applied" },
    { value: "cvId", label: "CV Used" },
    { value: "note", label: "Note" },
    { value: "jobPortal", label: "Source" },
  ];

  const visibleColumns =
    Object.keys(columnVisibility).length === 0
      ? columnVisibilityOptions.map((opt) => opt.value)
      : columnVisibilityOptions
          .filter(({ value }) => columnVisibility[value] !== false)
          .map(({ value }) => value);

  const handleColumnVisibilityChange = (selectedColumns: string[]) => {
    const newVisibility: VisibilityState = {};
    columnVisibilityOptions.forEach(({ value }) => {
      newVisibility[value] = selectedColumns.includes(value);
    });
    setColumnVisibility(newVisibility);
  };

  const handleStatusChange = (statusValue: string) => {
    const newStatuses = selectedStatuses.includes(statusValue)
      ? selectedStatuses.filter((status) => status !== statusValue)
      : [...selectedStatuses, statusValue];

    setSelectedStatuses(newStatuses);

    const statusFilter = newStatuses.length === 0 ? undefined : newStatuses;
    table.getColumn("status")?.setFilterValue(statusFilter);
  };

  const table = useReactTable({
    data: applications,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    autoResetPageIndex: false,
  });

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
    <>
      <Group mt="md" justify="space-between">
        <TextInput
          placeholder="Search applications..."
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          rightSection={
            searchQuery ? (
              <ActionIcon
                variant="subtle"
                color="gray"
                onClick={() => onSearchChange?.("")}
                size="sm"
              >
                <IconX size={16} />
              </ActionIcon>
            ) : null
          }
          miw={300}
          disabled={loading}
        />
        <Group gap="xs">
          <DatePickerInput
            type="range"
            placeholder="Pick dates range"
            value={dateRange}
            onChange={(value) => {
              if (!value) {
                onDateRangeChange?.([null, null]);
                return;
              }

              if (Array.isArray(value) && value.length === 2) {
                const [startStrDate, endStrDate] = value;

                if (!startStrDate && !endStrDate) {
                  onDateRangeChange?.([null, null]);
                } else if (startStrDate && endStrDate) {
                  onDateRangeChange?.([
                    new Date(startStrDate),
                    new Date(endStrDate),
                  ]);
                }
              }
            }}
            leftSection={<IconCalendar size={16} />}
            clearable
            disabled={loading}
            size="sm"
            popoverProps={{
              withinPortal: true,
              position: "bottom-end",
            }}
          />
          <Popover width={220} position="bottom-end" withArrow shadow="md">
            <Popover.Target>
              <Tooltip label="Filter by status" withArrow>
                <ActionIcon variant="default" disabled={loading} size="lg">
                  <IconFilter size={15} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm" fw={600} mb="xs">
                Filter by status
              </Text>
              <Stack gap="xs">
                {STATUS_OPTIONS.filter((option) => option.value !== "").map(
                  (option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={selectedStatuses.includes(option.value)}
                      onChange={() => handleStatusChange(option.value)}
                      color="inherit"
                      radius="sm"
                      variant="outline"
                    />
                  ),
                )}
              </Stack>
            </Popover.Dropdown>
          </Popover>
          <Popover width={220} position="bottom-end" withArrow shadow="md">
            <Popover.Target>
              <Tooltip label="Show/hide columns" withArrow>
                <ActionIcon variant="default" disabled={loading} size="lg">
                  <IconColumns3 size={15} />
                </ActionIcon>
              </Tooltip>
            </Popover.Target>
            <Popover.Dropdown>
              <Text size="sm" fw={600} mb="xs">
                Show columns
              </Text>
              <Stack gap="xs">
                {columnVisibilityOptions.map((option) => (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    checked={visibleColumns.includes(option.value)}
                    onChange={(event) => {
                      const checked = event.currentTarget.checked;
                      const newColumns = checked
                        ? [...visibleColumns, option.value]
                        : visibleColumns.filter((col) => col !== option.value);
                      handleColumnVisibilityChange(newColumns);
                    }}
                    color="inherit"
                    radius="sm"
                    variant="outline"
                  />
                ))}
              </Stack>
            </Popover.Dropdown>
          </Popover>
        </Group>
      </Group>
      <Paper radius="md" withBorder w="100%" pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} />
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
              {table.getFilteredRowModel().rows.length !==
                applications.length && ` (${applications.length} total)`}
            </Text>

            <Group gap="md">
              <Group gap="xs">
                <Text size="sm" c="dimmed">
                  Rows per page:
                </Text>
                <Select
                  data={[
                    { value: "10", label: "10" },
                    { value: "20", label: "20" },
                    { value: "30", label: "30" },
                    { value: "40", label: "40" },
                    { value: "50", label: "50" },
                  ]}
                  value={pageSize.toString()}
                  onChange={onPageSizeChange}
                  checkIconPosition="right"
                  size="sm"
                  w={70}
                  disabled={loading}
                />
              </Group>

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
          </Group>
        )}
      </Paper>
    </>
  );
};
