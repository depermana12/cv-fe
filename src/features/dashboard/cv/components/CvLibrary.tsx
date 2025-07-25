import {
  Avatar,
  Button,
  Center,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Pagination,
  ActionIcon,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
import {
  IconFileCv,
  IconPlus,
  IconSearch,
  IconGridDots,
  IconList,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { CvGridCard } from "./CvGridCard";
import { CvListItem } from "./CvListItem";
import { Cv, CvQueryOptions } from "@features/dashboard/cv/types/types";
import { useCvsPaginated } from "@features/dashboard/cv/hooks/useCvs";
import { CvForm } from "@features/dashboard/cv/components/CvForm";

type SortField = "title" | "createdAt" | "updatedAt";
type SortOrder = "asc" | "desc";
type ViewMode = "grid" | "list";

export const CvLibrary = ({ onCvSelect }: { onCvSelect: (cv: Cv) => void }) => {
  const [cvFormOpened, { open: openCvForm, close: closeCvForm }] =
    useDisclosure(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchInput, 300);
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === "grid" ? 12 : 8; // Less items per page in list view for better UX

  const queryOptions: CvQueryOptions = {
    search: debouncedSearch || undefined,
    sortBy: sortField,
    sortOrder,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  };

  const { data: paginatedData } = useCvsPaginated(queryOptions);
  const cvs = paginatedData?.data || [];
  const totalItems = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sortField, sortOrder, viewMode]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <Stack gap="lg">
      <Group justify="space-between">
        <Stack gap={2}>
          <Title order={2}>Your CVs</Title>
          <Text c="dimmed">Manage and edit your CVs</Text>
        </Stack>
        <Button
          variant="outline"
          leftSection={<IconPlus size={16} />}
          onClick={openCvForm}
        >
          Create New CV
        </Button>
      </Group>

      <Group justify="space-between">
        <Group gap="md">
          <TextInput
            placeholder="Search CVs..."
            leftSection={<IconSearch size={16} />}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={{ minWidth: 200 }}
          />

          {/* Sorting Controls */}
          <Group gap="xs">
            <Select
              value={sortField}
              onChange={(value) => value && setSortField(value as SortField)}
              data={[
                { value: "updatedAt", label: "Last Updated" },
                { value: "createdAt", label: "Date Created" },
                { value: "title", label: "Title" },
              ]}
              style={{ minWidth: 130 }}
              placeholder="Sort by"
            />

            <Tooltip
              label={`Sort ${sortOrder === "asc" ? "Ascending" : "Descending"}`}
            >
              <ActionIcon variant="light" size="lg" onClick={toggleSortOrder}>
                {sortOrder === "asc" ? (
                  <IconSortAscending size={18} />
                ) : (
                  <IconSortDescending size={18} />
                )}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* View Mode Toggle */}
        <Group gap="md">
          <SegmentedControl
            value={viewMode}
            onChange={(value) => setViewMode(value as ViewMode)}
            data={[
              {
                value: "grid",
                label: "Grid",
              },
              {
                value: "list",
                label: "List",
              },
            ]}
            size="sm"
          />
        </Group>
      </Group>

      {cvs.length === 0 ? (
        <Stack align="center" justify="center" gap="md" mih={300}>
          <Avatar size="xl" color="gray" variant="light">
            <IconFileCv size={40} />
          </Avatar>
          <Title order={3}>No CVs yet</Title>
          <Text c="dimmed" mb="xs">
            Click "Create New CV" to get started
          </Text>
        </Stack>
      ) : viewMode === "grid" ? (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing="lg">
          {cvs.map((cv) => (
            <CvGridCard key={cv.id} cv={cv} onSelect={onCvSelect} />
          ))}
        </SimpleGrid>
      ) : (
        <Stack gap="md">
          {cvs.map((cv) => (
            <CvListItem
              key={cv.id}
              cv={cv}
              onSelect={onCvSelect}
              onEdit={(cv) => {
                // TODO: Implement edit functionality
                console.log("Edit CV:", cv.id);
              }}
              onDelete={(cv) => {
                // TODO: Implement delete functionality
                console.log("Delete CV:", cv.id);
              }}
            />
          ))}
        </Stack>
      )}

      {totalPages > 1 && (
        <Center>
          <Pagination
            total={totalPages}
            value={currentPage}
            onChange={setCurrentPage}
            size="sm"
          />
        </Center>
      )}

      <CvForm opened={cvFormOpened} onClose={closeCvForm} mode="create" />
    </Stack>
  );
};
