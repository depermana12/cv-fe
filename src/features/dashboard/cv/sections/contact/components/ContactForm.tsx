import { useForm } from "@tanstack/react-form";
import {
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Paper,
  Textarea,
  ActionIcon,
  Tooltip,
  Modal,
  Text,
  Box,
} from "@mantine/core";
import { IconUpload, IconTrash, IconCheck } from "@tabler/icons-react";

import { contactSchema } from "../schema/contactSchema";
import { useCreateContact } from "../hooks/useCreateContact";
import { useUpdateContact } from "../hooks/useUpdateContact";
import { useDeleteContact } from "../hooks/useDeleteContact";
import { useContacts } from "../hooks/useContact";
import type { ContactInsert } from "../types/contact.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";

interface ContactFormProps {
  cvId?: number;
}

export const ContactForm = ({ cvId: propCvId }: ContactFormProps = {}) => {
  const { activeCvId } = useCvStore();

  // Use prop cvId if provided, otherwise fall back to store
  const actualCvId = propCvId || activeCvId;
  // FIXED: Ensure consistent hook parameters - use 0 as fallback to prevent hook violations
  const safeActiveCvId = actualCvId || 0;

  // Query contacts and determine mode and initial data
  const { data: contacts = [], isLoading } = useContacts(safeActiveCvId);
  const existingContact = contacts.length > 0 ? contacts[0] : undefined;
  const mode = existingContact ? "edit" : "create";

  // FIXED: Always call all hooks in the same order - no early returns before this point
  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createContact, isPending: isCreating } = useCreateContact();
  const { mutate: updateContact, isPending: isUpdating } = useUpdateContact();
  const { mutate: deleteContact, isPending: isDeleting } = useDeleteContact();

  const defaultContactValues: ContactInsert = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    website: "",
    linkedin: "",
    summary: "",
    profileImage: "",
  };

  const initialValues =
    mode === "edit" ? existingContact : defaultContactValues;

  const contactForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      if (mode === "create") {
        createContact(
          { cvId: actualCvId!, data: value },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Contact ${value.firstName} ${value.lastName} has been added.`,
                color: "green",
                withBorder: true,
              });
            },
          },
        );
      } else if (mode === "edit" && existingContact) {
        updateContact(
          { cvId: actualCvId!, contactId: existingContact.id, data: value },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                icon: <IconCheck size={16} />,
                message: `Contact has been updated.`,
                color: "green",
                withBorder: true,
              });
            },
          },
        );
      }
    },
  });

  const { Field, handleSubmit, state, reset } = contactForm;

  const isPending = isCreating || isUpdating || isDeleting;

  const handleDelete = () => {
    if (!existingContact?.id) return;

    deleteContact(
      { cvId: actualCvId!, contactId: existingContact.id },
      {
        onSuccess: () => {
          reset();
          closeDeleteModal();
        },
      },
    );
  };

  // FIXED: Conditional rendering moved to the end after all hooks are called
  if (!actualCvId) {
    return <Text>No CV selected</Text>;
  }

  if (isLoading) {
    return <Text>Loading contact information...</Text>;
  }

  return (
    <Box pos="relative">
      <LoadingOverlay visible={state.isSubmitting || isPending} />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Paper p="md" withBorder>
          <Stack gap="xs">
            {/* Personal Information Section */}
            <Text fw="bold">Personal Information</Text>
            <Group grow>
              <Field
                name="firstName"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.firstName),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="First Name"
                      placeholder="e.g. John"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="given-name"
                      required
                    />
                  );
                }}
              </Field>

              <Field
                name="lastName"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.lastName),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Last Name"
                      placeholder="e.g. Doe"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="family-name"
                      required
                    />
                  );
                }}
              </Field>
            </Group>

            <Field
              name="profileImage"
              validators={{
                onBlur: zFieldValidator(contactSchema.shape.profileImage),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TextInput
                    name={name}
                    label="Profile Image URL"
                    placeholder="https://example.com/profile.jpg"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={errorField}
                    leftSection={<IconUpload size={16} />}
                    autoComplete="url"
                  />
                );
              }}
            </Field>
            <Text fw="bold">Professional Summary</Text>

            <Field
              name="summary"
              validators={{
                onBlur: zFieldValidator(contactSchema.shape.summary),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <Textarea
                    name={name}
                    label="Summary"
                    placeholder="Write a brief summary about yourself, your experience, and your career goals..."
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={errorField}
                    autosize
                    minRows={4}
                    maxRows={8}
                    required
                  />
                );
              }}
            </Field>

            {/* Contact Information Section */}
            <Text fw="bold">Contact Information</Text>

            <Group grow>
              <Field
                name="email"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.email),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Email"
                      placeholder="john.doe@example.com"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="email"
                      type="email"
                      required
                    />
                  );
                }}
              </Field>

              <Field
                name="phone"
                validators={{
                  onChange: zFieldValidator(contactSchema.shape.phone),
                  onBlur: zFieldValidator(contactSchema.shape.phone),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Phone"
                      placeholder="+1 (555) 123-4567"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="tel"
                      type="tel"
                    />
                  );
                }}
              </Field>
            </Group>
            <Group grow>
              <Field
                name="city"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.city),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="City"
                      placeholder="e.g. New York"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="address-level2"
                    />
                  );
                }}
              </Field>

              <Field
                name="country"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.country),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Country"
                      placeholder="e.g. United States"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="country-name"
                    />
                  );
                }}
              </Field>
            </Group>

            {/* Professional Links Section */}
            <Text fw="bold">Professional Links</Text>

            <Group grow>
              <Field
                name="website"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.website),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Website"
                      placeholder="https://johndoe.com"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="url"
                    />
                  );
                }}
              </Field>

              <Field
                name="linkedin"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.linkedin),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="LinkedIn"
                      placeholder="https://linkedin.com/in/johndoe"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="url"
                    />
                  );
                }}
              </Field>
            </Group>

            <Group justify="flex-end" mt="lg">
              {mode === "edit" && existingContact && (
                <Tooltip label="Delete this contact">
                  <ActionIcon
                    color="red"
                    size="lg"
                    variant="outline"
                    onClick={openDeleteModal}
                    disabled={isPending}
                  >
                    <IconTrash size={18} />
                  </ActionIcon>
                </Tooltip>
              )}

              <Button
                variant="filled"
                type="submit"
                loading={state.isSubmitting || isPending}
              >
                {mode === "create" ? "Create Contact" : "Update Contact"}
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* Delete Confirmation Modal */}
        <Modal
          opened={opened}
          onClose={closeDeleteModal}
          title="Delete Contact Information?"
          centered
        >
          <Stack gap="md">
            <Text>
              Are you sure you want to delete this contact information?
            </Text>

            <Group justify="flex-end">
              <Button variant="default" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button color="red" onClick={handleDelete} loading={isDeleting}>
                Delete Contact
              </Button>
            </Group>
          </Stack>
        </Modal>
      </form>
    </Box>
  );
};
