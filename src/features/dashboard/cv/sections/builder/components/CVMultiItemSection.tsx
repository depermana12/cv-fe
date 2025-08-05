import { useState } from "react";
import {
  Stack,
  Group,
  Tooltip,
  Text,
  Accordion,
  Title,
  ActionIcon,
  Button,
} from "@mantine/core";
import { IconPlus, IconX } from "@tabler/icons-react";

interface CVMultiItemSectionProps<T = any> {
  sectionType: string;
  sectionTitle: string;
  items: T[];
  FormComponent: React.ComponentType<{
    mode: "create" | "edit";
    initialData?: T;
    onSuccess?: () => void;
  }>;
}

export const CVMultiItemSection = <T = any,>({
  sectionType,
  sectionTitle,
  items,
  FormComponent,
}: CVMultiItemSectionProps<T>) => {
  // Track which accordions are open (for existing items)
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  // Track form accordions (for new items being added)
  const [formAccordions, setFormAccordions] = useState<string[]>([]);

  const handleAddMore = () => {
    // Add a new form accordion with guaranteed unique ID
    const newFormId = `form-${crypto.randomUUID()}`;
    setFormAccordions((prev) => [...prev, newFormId]);
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

  return (
    <Stack gap={0}>
      {/* Header with section title */}
      {/* Simple header */}
      <Group justify="space-between" align="center" mb="md">
        <Title order={4}>
          {sectionTitle} {items.length > 0 && `(${items.length})`}
        </Title>
        <Tooltip label={`Add new ${sectionTitle.toLowerCase()}`}>
          <Button
            variant="outline"
            size="xs"
            onClick={handleAddMore}
            leftSection={<IconPlus size={16} />}
          >
            Add new {sectionTitle.toLowerCase()}
          </Button>
        </Tooltip>
      </Group>

      {/* Empty state message */}
      {items.length === 0 && formAccordions.length === 0 && (
        <Text c="dimmed" size="sm" mb="md">
          No {sectionTitle.toLowerCase()} added yet. Click "Add new{" "}
          {sectionTitle.toLowerCase()}" to create one.
        </Text>
      )}

      {/* Existing items list */}
      {items.map((item, index) => {
        const itemKey = `${sectionType}-${(item as any).id}`;
        const isOpen = openAccordions.has(itemKey);

        return (
          <Accordion
            key={itemKey}
            value={isOpen ? itemKey : null}
            onChange={() => toggleItemAccordion(itemKey)}
            variant="default"
            chevronPosition="left"
            styles={{
              content: {
                paddingLeft: "0px",
                paddingRight: "0px",
              },
              control: {
                "&:hover": {
                  backgroundColor: "transparent",
                },
              },
              label: {
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            }}
          >
            <Accordion.Item value={itemKey}>
              <Accordion.Control>
                <Text size="sm">
                  {sectionTitle} #{index + 1}
                </Text>
              </Accordion.Control>
              <Accordion.Panel>
                <FormComponent
                  mode="edit"
                  initialData={item}
                  key={`existing-${(item as any).id}`}
                />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        );
      })}

      {/* Form accordions for new items */}
      {formAccordions.map((formId, index) => (
        <Accordion
          key={formId}
          defaultValue={formId}
          variant="default"
          chevronPosition="left"
          styles={{
            content: {
              paddingLeft: "0px",
              paddingRight: "0px",
            },
            control: {
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
            label: {
              "&:hover": {
                textDecoration: "underline",
              },
            },
          }}
        >
          <Accordion.Item value={formId}>
            <Group gap={0}>
              <Accordion.Control style={{ flex: 1 }}>
                <Text size="sm">
                  {sectionTitle} #{items.length + index + 1}
                </Text>
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
                onSuccess={() => {
                  // Remove this form accordion after successful creation
                  setFormAccordions((prev) =>
                    prev.filter((id) => id !== formId),
                  );
                }}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      ))}
    </Stack>
  );
};
