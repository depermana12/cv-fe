import {
  Avatar,
  Button,
  Card,
  Center,
  Group,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
  Pagination,
} from "@mantine/core";
import { IconFileCv, IconPlus, IconSearch } from "@tabler/icons-react";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import { useState, useEffect } from "react";
import { CvGridCard } from "./CvGridCard";
import { Cv, CvQueryOptions } from "../../../cv/types/types";
import { useCvsPaginated } from "../../../cv/hooks/useCvs";
import { CvForm } from "../../../cv/components/CvForm";

type SortField = "title" | "createdAt" | "updatedAt";
type SortOrder = "asc" | "desc";

export const CvLibrary = ({ onCvSelect }: { onCvSelect: (cv: Cv) => void }) => {
  const [cvFormOpened, { open: openCvForm, close: closeCvForm }] =
    useDisclosure(false);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch] = useDebouncedValue(searchInput, 300);
  const [sortField, setSortField] = useState<SortField>("updatedAt");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
  }, [debouncedSearch, sortField, sortOrder]);

  const handleSortChange = (value: string | null) => {
    if (value) {
      const [field, order] = value.split("-");
      setSortField(field as SortField);
      setSortOrder(order as SortOrder);
    }
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

      <Card padding="md" radius="md" withBorder>
        <Group justify="space-between">
          <Group gap="md">
            <TextInput
              placeholder="Search CVs..."
              leftSection={<IconSearch size={16} />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ minWidth: 200 }}
            />
            <Select
              value={`${sortField}-${sortOrder}`}
              onChange={handleSortChange}
              data={[
                { value: "updatedAt-desc", label: "Last Updated" },
                { value: "createdAt-desc", label: "Recently Created" },
                { value: "createdAt-asc", label: "Oldest First" },
                { value: "title-asc", label: "Title A-Z" },
                { value: "title-desc", label: "Title Z-A" },
              ]}
              style={{ minWidth: 150 }}
            />
          </Group>
        </Group>
      </Card>

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
      ) : (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 2, lg: 3 }} spacing="lg">
          {cvs.map((cv) => (
            <CvGridCard key={cv.id} cv={cv} onSelect={onCvSelect} />
          ))}
        </SimpleGrid>
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
