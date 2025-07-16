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
  Button,
  Stack,
} from "@mantine/core";
import {
  IconSearch,
  IconChevronUp,
  IconChevronDown,
  IconX,
  IconFilter,
  IconSelector,
  IconColumns,
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
  onPageSizeChange,
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
    <>
      <Group mt="md" justify="space-between">
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
          miw={300}
          disabled={loading}
        />
        <Group gap="xs">
          <Select
            data={STATUS_OPTIONS}
            value={currentStatusFilter ?? ""}
            onChange={(value) =>
              table.getColumn("status")?.setFilterValue(value || undefined)
            }
            clearable
            leftSection={<IconFilter size={16} />}
            checkIconPosition="right"
            disabled={loading}
          />
          <Popover width={220} position="bottom-end" withArrow shadow="md">
            <Popover.Target>
              <Button
                variant="default"
                leftSection={<IconColumns size={16} />}
                disabled={loading}
                size="sm"
              >
                Columns
              </Button>
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
                    size="sm"
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
