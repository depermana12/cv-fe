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
  Modal,
  Skeleton,
  Card,
} from "@mantine/core";
import {
  IconFileCv,
  IconPlus,
  IconSearch,
  IconSortAscending,
  IconSortDescending,
} from "@tabler/icons-react";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { CvGridCard } from "../components/CvGridCard";
import { CvListItem } from "../components/CvListItem";
import { Cv, CvQueryOptions } from "@features/dashboard/cv/types/types";
import { useCvsPaginated } from "@features/dashboard/cv/hooks/useCvs";
import { CvQuickEditModal } from "@features/dashboard/cv/components/CvQuickEditModal";
import { useNavigate } from "@tanstack/react-router";
import { useDeleteCv } from "../hooks/useDeleteCv";
import { useUpdateCv } from "../hooks/useUpdateCv";

type SortField = "title" | "createdAt" | "updatedAt";
type SortOrder = "asc" | "desc";
type ViewMode = "grid" | "list";

export const CvLibraryPage = () => {
  // State for modals
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [
    quickEditModalOpened,
    { open: openQuickEditModal, close: closeQuickEditModal },
  ] = useDisclosure(false);

  // State for CV actions
  const [cvToDelete, setCvToDelete] = useState<Cv | null>(null);
  const [cvToEdit, setCvToEdit] = useState<Cv | null>(null);

  // State for pagination and view
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = viewMode === "grid" ? 12 : 8;

  // State for search and sorting
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchInput, 300);
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  /**
   * Handle for fetching paginated CVs
   * Uses debounced search input and current sort options
   * Handles pagination based on current page and items per page
   */

  const queryOptions: CvQueryOptions = {
    search: debouncedSearch || undefined,
    sortBy: sortField,
    sortOrder,
    limit: itemsPerPage,
    offset: (currentPage - 1) * itemsPerPage,
  };

  const { data: paginatedData, isLoading } = useCvsPaginated(queryOptions);
  const cvs = paginatedData?.data || [];
  const totalItems = paginatedData?.total || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const GridSkeleton = () => (
    <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing="lg">
      {Array.from([1, 2, 3]).map((_, index) => (
        <Card key={index} p="md" radius="md" withBorder>
          <Stack gap="sm">
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs" style={{ flex: 1 }}>
                <Skeleton height={30} width="80%" />
              </Stack>
              <Skeleton height={24} width={60} radius="xl" />
            </Group>
            <Skeleton height={50} />
            <Group gap="xs">
              <Skeleton height={20} width={100} />
              <Skeleton height={20} width={100} />
            </Group>
          </Stack>
        </Card>
      ))}
    </SimpleGrid>
  );

  const ListSkeleton = () => (
    <Stack gap="md">
      {Array.from([1, 2]).map((_, index) => (
        <Card key={index} p="md" radius="md" withBorder>
          <Group justify="space-between" align="center">
            <Stack gap="sm" style={{ flex: 1 }}>
              <Skeleton height={25} width="40%" />
              <Skeleton height={35} width="60%" />
              <Group gap="xs">
                <Skeleton height={20} width={100} />
                <Skeleton height={20} width={100} />
              </Group>
            </Stack>
            <Group gap="md">
              <Skeleton height={20} width={80} />
              <Skeleton height={20} width={60} radius="xl" />
            </Group>
          </Group>
        </Card>
      ))}
    </Stack>
  );

  // Handlers for modals
  const deleteCv = useDeleteCv();
  const updateCv = useUpdateCv();

  const handleOpenDeleteModal = (cv: Cv) => {
    setCvToDelete(cv);
    openDeleteModal();
  };

  const handleCloseDeleteModal = () => {
    closeDeleteModal();
    setCvToDelete(null);
  };

  const handleOpenQuickEditModal = (cv: Cv) => {
    setCvToEdit(cv);
    openQuickEditModal();
  };

  const handleCloseQuickEditModal = () => {
    closeQuickEditModal();
    setCvToEdit(null);
  };

  // Handlers for CV actions
  const navigate = useNavigate();

  const handleCvSelect = (cv: Cv) => {
    navigate({
      to: "/dashboard/cv/library/$cvId",
      params: { cvId: cv.id.toString() },
    });
  };

  const handleDelete = () => {
    if (cvToDelete) {
      deleteCv.mutate(cvToDelete.id, {
        onSuccess: () => {
          closeDeleteModal();
          setCvToDelete(null);
        },
      });
    }
  };

  const handleToggleVisibility = (cv: Cv) => {
    updateCv.mutate({ cvId: cv.id, data: { isPublic: !cv.isPublic } });
  };

  const handleCreateNewCv = () => {
    navigate({ to: "/dashboard/cv/library/new" });
  };

  // Handlers for sorting
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, sortField, sortOrder, viewMode]);

  return (
    <Stack gap="md">
      <Group justify="space-between">
        <Title order={2} size="h3">
          Your CVs
        </Title>
        <Button
          variant="filled"
          leftSection={<IconPlus size={16} />}
          onClick={handleCreateNewCv}
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
              <ActionIcon variant="outline" size="lg" onClick={toggleSortOrder}>
                {sortOrder === "asc" ? (
                  <IconSortAscending size={20} />
                ) : (
                  <IconSortDescending size={20} />
                )}
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>

        {/* View Mode Toggle */}
        <Group gap="md">
          <SegmentedControl
            radius="sm"
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
          />
        </Group>
      </Group>

      {!isLoading && cvs.length === 0 && (
        <Stack align="center" justify="center" gap="md" mih={300}>
          <Avatar size="xl" color="gray" variant="light">
            <IconFileCv size={40} />
          </Avatar>
          <Title order={3}>No CVs yet</Title>
          <Text c="dimmed" mb="xs">
            Click "Create New CV" to get started
          </Text>
        </Stack>
      )}

      {/* Loading skeletons */}
      {isLoading && viewMode === "grid" && <GridSkeleton />}
      {isLoading && viewMode === "list" && <ListSkeleton />}

      {/* Actual content when loaded */}
      {!isLoading && cvs.length > 0 && viewMode === "grid" && (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing="lg">
          {cvs.map((cv) => (
            <CvGridCard
              key={cv.id}
              cv={cv}
              onSelect={handleCvSelect}
              onDelete={() => handleOpenDeleteModal(cv)}
              onQuickEdit={() => handleOpenQuickEditModal(cv)}
              onToggleVisibility={() => handleToggleVisibility(cv)}
            />
          ))}
        </SimpleGrid>
      )}

      {!isLoading && cvs.length > 0 && viewMode === "list" && (
        <Stack gap="md">
          {cvs.map((cv) => (
            <CvListItem
              key={cv.id}
              cv={cv}
              onSelect={handleCvSelect}
              onEdit={() => handleOpenQuickEditModal(cv)}
              onDelete={() => handleOpenDeleteModal(cv)}
              onToggleVisibility={() => handleToggleVisibility(cv)}
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

      <Modal
        opened={deleteModalOpened}
        onClose={handleCloseDeleteModal}
        title="Delete CV?"
        centered
      >
        <Text mb="lg">
          This will delete your cv{" "}
          <span style={{ fontWeight: 700 }}>{cvToDelete?.title}</span>
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={handleDelete}
            loading={deleteCv.isPending}
          >
            Delete
          </Button>
        </Group>
      </Modal>

      {/* Quick Edit Modal lifted to parent */}
      {cvToEdit && (
        <CvQuickEditModal
          opened={quickEditModalOpened}
          onClose={handleCloseQuickEditModal}
          cvId={cvToEdit.id}
        />
      )}
    </Stack>
  );
};
