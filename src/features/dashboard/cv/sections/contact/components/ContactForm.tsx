import { useForm } from "@tanstack/react-form";
import {
  Button,
  LoadingOverlay,
  Stack,
  TextInput,
  Group,
  Title,
  Paper,
  Textarea,
  ActionIcon,
} from "@mantine/core";
import { IconPlus, IconTrash, IconUpload } from "@tabler/icons-react";

import {
  contactCreateSchema,
  contactUpdateSchema,
  contactSchema,
} from "../schema/contactSchema";
import { useCreateContact } from "../hooks/useCreateContact";
import { useUpdateContact } from "../hooks/useUpdateContact";
import type { ContactFormProps, ContactInsert } from "../types/contact.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useCvStore } from "../../../store/cvStore";

export const ContactForm = ({
  mode,
  initialData,
  onSuccess,
}: ContactFormProps) => {
  const { mutate: createContact, isPending: isCreating } = useCreateContact();
  const { mutate: updateContact, isPending: isUpdating } = useUpdateContact();

  const { activeCvId } = useCvStore();

  if (!activeCvId) {
    throw new Error("No active CV selected");
  }

  const cvId = activeCvId;

  const defaultContactValues: ContactInsert = {
    firstName: "",
    lastName: "",
    bio: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    website: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    profileImage: "",
    socialLinks: [],
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          firstName: initialData.firstName || "",
          lastName: initialData.lastName || "",
          bio: initialData.bio || "",
          email: initialData.email || "",
          phone: initialData.phone || "",
          city: initialData.city || "",
          state: initialData.state || "",
          country: initialData.country || "",
          website: initialData.website || "",
          linkedin: initialData.linkedin || "",
          github: initialData.github || "",
          portfolio: initialData.portfolio || "",
          summary: initialData.summary || "",
          profileImage: initialData.profileImage || "",
          socialLinks: initialData.socialLinks || [],
        }
      : defaultContactValues;

  const { Field, handleSubmit, state } = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      if (mode === "create") {
        createContact(
          { cvId, data: value },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateContact(
          { cvId, contactId: initialData.id, data: value },
          { onSuccess: () => onSuccess?.() },
        );
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const schema =
          mode === "create" ? contactCreateSchema : contactUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  const isPending = isCreating || isUpdating;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <LoadingOverlay visible={state.isSubmitting || isPending} />

      <Stack gap="xl">
        {/* Personal Information Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Personal Information
            </Title>

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
                    />
                  );
                }}
              </Field>
            </Group>

            <Field
              name="bio"
              validators={{
                onBlur: zFieldValidator(contactSchema.shape.bio),
              }}
            >
              {({ state, name, handleChange, handleBlur }) => {
                const errorField = useFieldError(state.meta);
                return (
                  <TextInput
                    name={name}
                    label="Bio"
                    placeholder="e.g. Software Engineer | Full-Stack Developer"
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={errorField}
                    autoComplete="off"
                  />
                );
              }}
            </Field>

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
          </Stack>
        </Paper>

        {/* Contact Information Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Contact Information
            </Title>

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
                    />
                  );
                }}
              </Field>

              <Field
                name="phone"
                validators={{
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
          </Stack>
        </Paper>

        {/* Location Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Location
            </Title>

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
                name="state"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.state),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="State/Province"
                      placeholder="e.g. NY"
                      value={state.value}
                      onChange={(e) => handleChange(e.target.value)}
                      onBlur={handleBlur}
                      error={errorField}
                      autoComplete="address-level1"
                    />
                  );
                }}
              </Field>
            </Group>

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
          </Stack>
        </Paper>

        {/* Professional Links Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Professional Links
            </Title>

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
                name="portfolio"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.portfolio),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="Portfolio"
                      placeholder="https://portfolio.johndoe.com"
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

            <Group grow>
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

              <Field
                name="github"
                validators={{
                  onBlur: zFieldValidator(contactSchema.shape.github),
                }}
              >
                {({ state, name, handleChange, handleBlur }) => {
                  const errorField = useFieldError(state.meta);
                  return (
                    <TextInput
                      name={name}
                      label="GitHub"
                      placeholder="https://github.com/johndoe"
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
          </Stack>
        </Paper>

        {/* Social Links Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Additional Social Links
            </Title>

            <Field name="socialLinks">
              {({ state, handleChange }) => {
                const socialLinks = state.value || [];

                const addSocialLink = () => {
                  handleChange([...socialLinks, ""]);
                };

                const updateSocialLink = (index: number, value: string) => {
                  const updated = [...socialLinks];
                  updated[index] = value;
                  handleChange(updated);
                };

                const removeSocialLink = (index: number) => {
                  const updated = socialLinks.filter((_, i) => i !== index);
                  handleChange(updated);
                };

                return (
                  <Stack gap="sm">
                    {socialLinks.map((link, index) => (
                      <Group key={index} align="flex-end">
                        <TextInput
                          placeholder={`Social link ${index + 1} (e.g. https://twitter.com/johndoe)`}
                          value={link}
                          onChange={(e) =>
                            updateSocialLink(index, e.target.value)
                          }
                          style={{ flex: 1 }}
                          autoComplete="url"
                        />
                        <ActionIcon
                          color="red"
                          variant="subtle"
                          onClick={() => removeSocialLink(index)}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      </Group>
                    ))}

                    <Button
                      variant="light"
                      leftSection={<IconPlus size={16} />}
                      onClick={addSocialLink}
                      size="sm"
                    >
                      Add Social Link
                    </Button>
                  </Stack>
                );
              }}
            </Field>
          </Stack>
        </Paper>

        {/* Summary Section */}
        <Paper withBorder p="md">
          <Stack gap="md">
            <Title order={4} size="md">
              Summary
            </Title>

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
                    label="Professional Summary"
                    placeholder="Write a brief summary about yourself, your experience, and your career goals..."
                    value={state.value}
                    onChange={(e) => handleChange(e.target.value)}
                    onBlur={handleBlur}
                    error={errorField}
                    autosize
                    minRows={4}
                    maxRows={8}
                  />
                );
              }}
            </Field>
          </Stack>
        </Paper>

        <Group justify="flex-end" mt="lg">
          <Button type="submit" loading={state.isSubmitting || isPending}>
            {mode === "create" ? "Create Contact" : "Update Contact"}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
