import { useState } from "react";
import {
  Stack,
  Group,
  Button,
  Text,
  Paper,
  Accordion,
  Title,
  Badge,
  Modal,
  TextInput,
  ActionIcon,
} from "@mantine/core";
import {
  IconPlus,
  IconTrash,
  IconPencil,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { useCVSectionStore } from "@features/dashboard/cv/store/cvSectionStore";
import { SectionType } from "@features/dashboard/cv/types/types";

// Helper function to generate meaningful titles for existing items
const getItemDisplayTitle = (item: any, sectionType: SectionType): string => {
  switch (sectionType) {
    case "education":
      if (item.degree && item.institution) {
        const degreeMap: Record<string, string> = {
          high_school: "High School",
          diploma: "Diploma",
          bachelor: "Bachelor's",
          master: "Master's",
          doctorate: "Doctorate",
        };
        return `${degreeMap[item.degree] || item.degree} at ${item.institution}`;
      }
      return item.institution || "Education";

    case "work":
      if (item.position && item.company) {
        return `${item.position} at ${item.company}`;
      }
      return item.company || item.position || "Work Experience";

    case "project":
      return item.name || "Project";

    case "organization":
      if (item.role && item.organization) {
        return `${item.role} at ${item.organization}`;
      }
      return item.organization || item.role || "Organization";

    case "course":
      if (item.courseName && item.provider) {
        return `${item.courseName} by ${item.provider}`;
      }
      return item.courseName || item.provider || "Course";

    case "skill":
      return item.name || "Skill";

    case "language":
      return item.language || "Language";

    case "contact":
      if (item.firstName && item.lastName) {
        return `${item.firstName} ${item.lastName}`;
      }
      return item.firstName || item.lastName || item.email || "Contact";

    default:
      return "Item";
  }
};

interface CVMultiItemSectionProps<T = any> {
  cvId: number;
  sectionType: SectionType;
  items: T[];
  isLoading: boolean;
  FormComponent: React.ComponentType<any>;
  useDeleteHook: {
    mutate: (params: any, options?: any) => void;
    isPending: boolean;
  };
}

export const CVMultiItemSection = <T = any,>({
  cvId,
  sectionType,
  items,
  isLoading,
  FormComponent,
  useDeleteHook,
}: CVMultiItemSectionProps<T>) => {
  // Store integration for custom titles
  const { getSectionTitle, setSectionTitle } = useCVSectionStore();
  const currentTitle = getSectionTitle(cvId, sectionType);

  // Track which accordions are open (for existing items)
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  // Track form accordions (for new items being added)
  const [formAccordions, setFormAccordions] = useState<string[]>(
    items.length === 0 ? ["form-0"] : [],
  );
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<T | null>(null);
  // Title editing state
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingTitleValue, setEditingTitleValue] = useState(currentTitle);

  // Use the delete hook
  const { mutate: deleteItem, isPending: isDeleting } = useDeleteHook;

  const handleFormSubmitted = (formId: string) => {
    // Remove the form accordion after successful submission
    setFormAccordions((prev) => prev.filter((id) => id !== formId));
  };

  const handleAddMore = () => {
    // Add a new form accordion
    const newFormId = `form-${Date.now()}`;
    setFormAccordions((prev) => [...prev, newFormId]);
  };

  const handleSaveTitle = () => {
    setSectionTitle(cvId, sectionType, editingTitleValue);
    setIsEditingTitle(false);
  };

  const handleCancelTitleEdit = () => {
    setEditingTitleValue(currentTitle);
    setIsEditingTitle(false);
  };

  const handleEditItem = (item: T) => {
    // For editing, we'll replace the item display with a form
    // This is a simplified approach - you might want to handle this differently
    console.log("Edit item:", item);
  };

  const toggleItemAccordion = (itemKey: string) => {
    setOpenAccordions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey);
      } else {
        newSet.add(itemKey);
      }
      return newSet;
    });
  };

  const handleDeleteItem = (item: any) => {
    setItemToDelete(item);
    setDeleteModalOpened(true);
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;

    // Simplified delete parameters - just cvId and the item's id
    const deleteParams = {
      cvId,
      id: (itemToDelete as any).id,
    };

    deleteItem(deleteParams, {
      onSuccess: () => {
        setDeleteModalOpened(false);
        setItemToDelete(null);
      },
      onError: (error: any) => {
        console.error(`Failed to delete item:`, error);
        // Error notification is handled by the hook
      },
    });
  };

  if (isLoading) {
    return (
      <Stack gap="md">
        <Text>Loading {currentTitle.toLowerCase()}...</Text>
      </Stack>
    );
  }

  return (
    <Stack gap="md">
      {/* Header with editable title */}
      <Group justify="space-between" align="center">
        {isEditingTitle ? (
          <Group>
            <TextInput
              variant="unstyled"
              value={editingTitleValue}
              onChange={(e) => setEditingTitleValue(e.target.value)}
              size="sm"
            />
            <ActionIcon
              color="green"
              variant="subtle"
              onClick={handleSaveTitle}
            >
              <IconCheck size={16} />
            </ActionIcon>
            <ActionIcon
              color="red"
              variant="subtle"
              onClick={handleCancelTitleEdit}
            >
              <IconX size={16} />
            </ActionIcon>
          </Group>
        ) : (
          <Group>
            <Title order={4}>
              {currentTitle} {items.length > 0 && `(${items.length})`}
            </Title>
            <ActionIcon
              variant="subtle"
              onClick={() => setIsEditingTitle(true)}
              title="Edit section title"
            >
              <IconPencil size={16} />
            </ActionIcon>
          </Group>
        )}
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          onClick={handleAddMore}
        >
          {items.length === 0 && formAccordions.length === 0
            ? `Add ${currentTitle.slice(0, -1)}`
            : `Add More ${currentTitle.slice(0, -1)}`}
        </Button>
      </Group>

      {/* Form accordions for new items */}
      {formAccordions.map((formId, index) => (
        <Accordion key={formId} defaultValue={formId} variant="separated">
          <Accordion.Item value={formId}>
            <Group gap={0}>
              <Accordion.Control style={{ flex: 1 }}>
                <Text>{`${currentTitle} #${items.length + index + 1}`}</Text>
              </Accordion.Control>
              <ActionIcon
                size="lg"
                variant="subtle"
                color="red"
                onClick={() => {
                  setFormAccordions((prev) =>
                    prev.filter((id) => id !== formId),
                  );
                }}
                title="Remove"
              >
                <IconX size={16} />
              </ActionIcon>
            </Group>
            <Accordion.Panel>
              <FormComponent
                mode="create"
                cvId={cvId}
                onSuccess={() => handleFormSubmitted(formId)}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ))}

      {/* Existing items accordions */}
      {items.map((item, index) => {
        const itemKey = `${sectionType}-${(item as any).id}`; // Use section type + item ID for stable keys
        const isOpen = openAccordions.has(itemKey);
        // Use meaningful title for existing items, generic title for new forms
        const itemTitle = getItemDisplayTitle(item, sectionType);

        return (
          <Accordion
            key={itemKey}
            value={isOpen ? itemKey : null}
            onChange={() => toggleItemAccordion(itemKey)}
            variant="separated"
          >
            <Accordion.Item value={itemKey}>
              <Accordion.Control>
                <Group justify="space-between" w="100%">
                  <Text fw={500} size="sm">
                    {itemTitle}
                  </Text>
                  <Badge variant="light" size="sm">
                    #{index + 1}
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Stack gap="md">
                  <Group justify="flex-end">
                    <Button
                      variant="outline"
                      size="sm"
                      leftSection={<IconPencil size={16} />}
                      onClick={() => handleEditItem(item)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      color="red"
                      size="sm"
                      leftSection={<IconTrash size={16} />}
                      onClick={() => handleDeleteItem(item)}
                    >
                      Delete
                    </Button>
                  </Group>
                  {/* Show item details */}
                  <Paper p="sm" bg="gray.0">
                    <Text size="sm">
                      Click "Edit" to modify this{" "}
                      {currentTitle.slice(0, -1).toLowerCase()}.
                    </Text>
                  </Paper>
                </Stack>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        );
      })}

      {/* Delete confirmation modal */}
      <Modal
        opened={deleteModalOpened}
        onClose={() => setDeleteModalOpened(false)}
        title={`Delete ${currentTitle.slice(0, -1)}`}
        size="sm"
      >
        <Stack gap="md">
          <Text>
            Are you sure you want to delete this{" "}
            {currentTitle.slice(0, -1).toLowerCase()}?
          </Text>
          {itemToDelete && (
            <Text fw={500} size="sm">
              {getItemDisplayTitle(itemToDelete, sectionType)}
            </Text>
          )}
          <Group justify="flex-end">
            <Button
              variant="outline"
              onClick={() => setDeleteModalOpened(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button color="red" onClick={confirmDelete} loading={isDeleting}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};
