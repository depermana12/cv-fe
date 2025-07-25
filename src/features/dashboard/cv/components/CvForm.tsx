import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Textarea,
  Select,
  Group,
  Stack,
  Text,
  Alert,
  Card,
  Tooltip,
  LoadingOverlay,
  Box,
  Grid,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useForm } from "@tanstack/react-form";
import { notifications } from "@mantine/notifications";
import { cvCreateSchema } from "../schema/cv.schema";
import { useCreateCv } from "../hooks/useCreateCv";
import { useSlugAvailability } from "../hooks/useSlugExist";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import type { CvCreate, CvFormProps } from "../types/types";

export const CV_THEMES = [
  {
    value: "modern",
    label: "Modern",
    description: "Clean and contemporary design",
  },
  { value: "minimal", label: "Minimal", description: "Simple and elegant" },
];

export const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "id", label: "Indonesian" },
];

export const CvForm = ({
  opened,
  onClose,
  initialData,
  mode = "create",
}: CvFormProps) => {
  const createCv = useCreateCv();
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const defaultValues: CvCreate = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    theme: initialData?.theme || "modern",
    isPublic: initialData?.isPublic || false,
    slug: initialData?.slug || "",
    language: initialData?.language || "id",
  };

  const { Field, handleSubmit, state, setFieldValue } = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      // Validate slug availability before submission if CV is public
      if (value.isPublic && value.slug) {
        // Make sure we have the latest slug availability check
        if (debouncedSlug !== value.slug) {
          notifications.show({
            title: "Please wait",
            message: "Checking slug availability...",
            color: "blue",
          });
          return;
        }

        if (slugAvailability?.data && !slugAvailability.data.available) {
          notifications.show({
            title: "Error",
            message:
              "The chosen slug is not available. Please choose a different one.",
            color: "red",
          });
          return;
        }
      }

      await createCv.mutateAsync(value);
      onClose();
      notifications.show({
        title: "Success!",
        message: `CV "${value.title}" has been ${mode === "create" ? "created" : "updated"} successfully.`,
        color: "green",
      });
    },
  });

  // Only check slug availability when CV is public and slug exists
  const [debouncedSlug] = useDebouncedValue(state.values.slug || "", 500); // 500ms debounce
  const shouldCheckSlug =
    state.values.isPublic && !!debouncedSlug && debouncedSlug.length > 0;
  const excludeCvId =
    mode === "edit" && initialData?.id ? initialData.id : undefined;

  const slugAvailability = useSlugAvailability(
    debouncedSlug,
    excludeCvId,
    shouldCheckSlug,
  );

  const handleClose = () => {
    onClose();
  };

  const generateSlug = (title: string) => {
    if (title) {
      return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
    }
    return "";
  };

  const updateSlugFromTitle = (title: string) => {
    if (!isSlugEdited) {
      const newSlug = generateSlug(title);
      setFieldValue("slug", newSlug);
    }
  };

  useEffect(() => {
    if (!state.values.slug && isSlugEdited) {
      setIsSlugEdited(false);
    }
  }, [state.values.slug, isSlugEdited]);

  const isFormValid =
    state.values.title &&
    state.values.title.length >= 3 &&
    (!shouldCheckSlug ||
      (debouncedSlug === state.values.slug &&
        slugAvailability.data &&
        slugAvailability.data.available));

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={
        <Text fw={600} size="lg">
          {mode === "create" ? "Create New CV" : "Edit CV"}
        </Text>
      }
      size="lg"
      centered
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Box pos="relative">
          <LoadingOverlay
            visible={state.isSubmitting || createCv.isPending}
            overlayProps={{ radius: "sm", blur: 2 }}
          />

          <Stack gap="lg">
            <Card padding="md" radius="md" withBorder>
              <Text fw={500} mb="md">
                Basic Information
              </Text>

              <Stack gap="md">
                <Field
                  name="title"
                  validators={{
                    onBlur: zFieldValidator(cvCreateSchema.shape.title),
                  }}
                  children={({ state, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <TextInput
                        label="CV Title"
                        placeholder="e.g., Software Developer Resume"
                        withAsterisk
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={() => {
                          handleBlur();
                          updateSlugFromTitle(state.value);
                        }}
                        error={errorField}
                        description="Choose a descriptive name for your CV"
                      />
                    );
                  }}
                />

                <Field
                  name="description"
                  validators={{
                    onBlur: zFieldValidator(cvCreateSchema.shape.description),
                  }}
                  children={({ state, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <Textarea
                        label="Description"
                        placeholder="Brief description of this CV (optional)"
                        rows={3}
                        description={`${state.value?.length || 0}/1000 characters`}
                        maxLength={1000}
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        error={errorField}
                      />
                    );
                  }}
                />
                <Group grow>
                  <Field
                    name="theme"
                    children={({ state, handleChange }) => (
                      <Select
                        label="Theme"
                        description="Visual style of your cv"
                        data={CV_THEMES.map((theme) => ({
                          value: theme.value,
                          label: theme.label,
                        }))}
                        value={state.value}
                        onChange={(value) => handleChange(value || "modern")}
                        renderOption={({ option }) => {
                          const theme = CV_THEMES.find(
                            (t) => t.value === option.value,
                          );
                          return (
                            <Stack gap={1}>
                              <Text size="sm">{option.label}</Text>
                              <Text size="xs" c="dimmed">
                                {theme?.description}
                              </Text>
                            </Stack>
                          );
                        }}
                      />
                    )}
                  />
                  <Field
                    name="language"
                    children={({ state, handleChange }) => (
                      <Select
                        label="Language"
                        description="Language content of the cv"
                        data={LANGUAGES.map((lang) => ({
                          value: lang.value,
                          label: `${lang.label}`,
                        }))}
                        value={state.value}
                        onChange={(value) => handleChange(value || "en")}
                        allowDeselect={false}
                      />
                    )}
                  />
                </Group>
              </Stack>
            </Card>

            <Card padding="md" radius="md" withBorder>
              <Text fw={500} mb="md">
                Privacy & Sharing
              </Text>
              <Stack>
                <Grid>
                  <Grid.Col span={3}>
                    <Field name="isPublic">
                      {({ state, handleChange }) => (
                        <Tooltip label="Control who can view your CV">
                          <Select
                            label="Sharing"
                            description="Privacy of your cv"
                            data={["Private", "Public"]}
                            value={state.value ? "Public" : "Private"}
                            onChange={(value) =>
                              handleChange(value === "Public")
                            }
                            allowDeselect={false}
                          />
                        </Tooltip>
                      )}
                    </Field>
                  </Grid.Col>

                  <Grid.Col span={9}>
                    <Field
                      name="slug"
                      validators={{
                        onBlur: zFieldValidator(cvCreateSchema.shape.slug),
                      }}
                    >
                      {({ state, handleChange, handleBlur }) => {
                        const fieldError = useFieldError(state.meta);
                        const isCheckingSlug =
                          shouldCheckSlug &&
                          slugAvailability.isLoading &&
                          debouncedSlug === state.value;
                        const slugNotAvailable =
                          shouldCheckSlug &&
                          slugAvailability.data &&
                          !slugAvailability.data.available &&
                          debouncedSlug === state.value;
                        const slugAvailable =
                          shouldCheckSlug &&
                          slugAvailability.data &&
                          slugAvailability.data.available &&
                          debouncedSlug === state.value;

                        let slugError = fieldError;
                        if (slugNotAvailable) {
                          slugError = "This slug is already taken";
                        }

                        return (
                          <Tooltip label="Use a custom URL or leave as default">
                            <TextInput
                              label="URL Slug"
                              placeholder="my-awesome-cv"
                              value={state.value}
                              onChange={(e) => {
                                const newValue = e.target.value;
                                handleChange(newValue);
                                // Mark as manually edited if user types something
                                if (newValue) {
                                  setIsSlugEdited(true);
                                }
                              }}
                              onBlur={handleBlur}
                              error={slugError}
                              rightSection={
                                isCheckingSlug ? (
                                  <Text size="xs" c="dimmed">
                                    Checking...
                                  </Text>
                                ) : slugAvailable ? (
                                  <Text size="xs" c="green.6">
                                    ✓
                                  </Text>
                                ) : slugNotAvailable ? (
                                  <Text size="xs" c="red.6">
                                    ✗
                                  </Text>
                                ) : null
                              }
                              description={
                                isSlugEdited
                                  ? "Custom URL (unlinked from title)"
                                  : "Auto-generated from title"
                              }
                            />
                          </Tooltip>
                        );
                      }}
                    </Field>
                  </Grid.Col>
                </Grid>

                {state.values.isPublic &&
                  shouldCheckSlug &&
                  slugAvailability.data &&
                  slugAvailability.data.available &&
                  debouncedSlug === state.values.slug && (
                    <Alert color="blue" variant="light">
                      <Text size="sm">
                        {state.values.slug ? (
                          <>
                            Your CV will be publicly accessible at:{" "}
                            <Text component="span" fw={500} c="blue.7">
                              /cv/{state.values.slug}
                            </Text>
                          </>
                        ) : (
                          "Your CV will be public. Add a URL slug to make it accessible."
                        )}
                      </Text>
                    </Alert>
                  )}
              </Stack>
            </Card>

            <Group justify="space-between">
              <Button variant="subtle" onClick={handleClose}>
                Cancel
              </Button>

              <Group gap="sm">
                {mode === "create" && (
                  <Text size="xs" c="dimmed">
                    You can always edit these settings later
                  </Text>
                )}
                <Button
                  type="submit"
                  loading={state.isSubmitting || createCv.isPending}
                  disabled={!isFormValid}
                >
                  {mode === "create" ? "Create CV" : "Save Changes"}
                </Button>
              </Group>
            </Group>
          </Stack>
        </Box>
      </form>
    </Modal>
  );
};
