import { useState } from "react";
import {
  Stack,
  Group,
  Button,
  Text,
  Accordion,
  Title,
  Badge,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useCvStore } from "../../../store/cvStore";

interface CVMultiItemSectionProps<T = any> {
  sectionTitle: string;
  items: T[];
  FormComponent: React.ComponentType<{
    mode: "create" | "edit";
    cvId: number;
    initialData?: T;
    onSuccess?: () => void;
  }>;
}

export const CVMultiItemSection = <T = any,>({
  sectionTitle,
  items,
  FormComponent,
}: CVMultiItemSectionProps<T>) => {
  const { activeCvId } = useCvStore();
  const cvId = activeCvId!;

  // Track which accordions are open (for existing items)
  const [openAccordions, setOpenAccordions] = useState<Set<string>>(new Set());
  // Track form accordions (for new items being added)
  const [formAccordions, setFormAccordions] = useState<string[]>(
    items.length === 0 ? ["form-0"] : [],
  );

  const handleFormSubmitted = (formId: string) => {
    // Remove the form accordion after successful submission
    setFormAccordions((prev) => prev.filter((id) => id !== formId));
  };

  const handleAddMore = () => {
    // Add a new form accordion
    const newFormId = `form-${Date.now()}`;
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
    <Stack gap="md">
      {/* Header with section title */}
      <Group justify="space-between" align="center">
        <Title order={4}>
          {sectionTitle} {items.length > 0 && `(${items.length})`}
        </Title>
        <Button
          leftSection={<IconPlus size={16} />}
          variant="light"
          onClick={handleAddMore}
        >
          Add More
        </Button>
      </Group>

      {/* Existing items accordions */}
      {items.map((item, index) => {
        const itemKey = `item-${(item as any).id}`; // Use item ID for stable keys
        const isOpen = openAccordions.has(itemKey);

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
                    {sectionTitle} #{index + 1}
                  </Text>
                  <Badge variant="light" size="sm">
                    #{index + 1}
                  </Badge>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <FormComponent mode="edit" cvId={cvId} initialData={item} />
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        );
      })}
      {/* Form accordions for new items */}
      {formAccordions.map((formId, index) => (
        <Accordion key={formId} defaultValue={formId} variant="separated">
          <Accordion.Item value={formId}>
            <Accordion.Control>
              <Text>
                {sectionTitle} #{items.length + index + 1}
              </Text>
            </Accordion.Control>
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
    </Stack>
  );
};
