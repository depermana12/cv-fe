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
  LoadingOverlay,
  Box,
  Grid,
  Paper,
  Title,
  ActionIcon,
} from "@mantine/core";
import { IconRefresh } from "@tabler/icons-react";
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

      try {
        await createCv.mutateAsync(value);
        onClose();
        notifications.show({
          title: "Success!",
          message: `CV "${value.title}" has been ${mode === "create" ? "created" : "updated"} successfully.`,
          color: "green",
        });
      } catch (error) {
        notifications.show({
          title: "Error",
          message: `Failed to ${mode === "create" ? "create" : "update"} CV. Please try again.`,
          color: "red",
        });
      }
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

  const handleCheckSlugAvailability = () => {
    // Force a re-fetch of the slug availability
    slugAvailability.refetch();
  };

  useEffect(() => {
    if (!state.values.slug && isSlugEdited) {
      setIsSlugEdited(false);
    }
  }, [state.values.slug, isSlugEdited]);

  const isFormValid =
    state.values.title &&
    state.values.title.length >= 3 &&
    (!state.values.isPublic ||
      !state.values.slug ||
      (shouldCheckSlug && slugAvailability.data?.available) ||
      !shouldCheckSlug);

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
            <Paper withBorder p="md">
              <Stack gap="xs">
                <Title order={4} size="md">
                  Basic Information
                </Title>

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
                <Title order={4} size="md">
                  Preferences
                </Title>
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
                <Title order={4} size="md">
                  Privacy & Sharing
                </Title>
                <Grid>
                  <Grid.Col span={3}>
                    <Field name="isPublic">
                      {({ state, handleChange }) => (
                        <Select
                          label="Visibility"
                          description="Who can view your CV"
                          data={[
                            { value: "private", label: "Private" },
                            { value: "public", label: "Public" },
                          ]}
                          value={state.value ? "public" : "private"}
                          onChange={(value) => handleChange(value === "public")}
                          allowDeselect={false}
                        />
                      )}
                    </Field>
                  </Grid.Col>

                  <Grid.Col span={9}>
                    {state.values.isPublic && (
                      <Field
                        name="slug"
                        validators={{
                          onBlur: zFieldValidator(cvCreateSchema.shape.slug),
                        }}
                      >
                        {({ state: slugState, handleChange, handleBlur }) => {
                          const fieldError = useFieldError(slugState.meta);
                          const isCheckingSlug =
                            shouldCheckSlug &&
                            slugAvailability.isLoading &&
                            debouncedSlug === slugState.value;
                          const slugNotAvailable =
                            shouldCheckSlug &&
                            slugAvailability.data &&
                            !slugAvailability.data.available &&
                            debouncedSlug === slugState.value;
                          const slugAvailable =
                            shouldCheckSlug &&
                            slugAvailability.data &&
                            slugAvailability.data.available &&
                            debouncedSlug === slugState.value;

                          let slugError = fieldError;
                          if (slugNotAvailable) {
                            slugError = "This slug is already taken";
                          }

                          return (
                            <TextInput
                              label="URL Slug"
                              placeholder="my-awesome-cv"
                              value={slugState.value}
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
                                slugState.value && (
                                  <ActionIcon
                                    variant="subtle"
                                    size="sm"
                                    loading={isCheckingSlug}
                                    onClick={handleCheckSlugAvailability}
                                    title="Check availability"
                                  >
                                    {!isCheckingSlug && slugAvailable && (
                                      <Text size="xs" c="green.6">
                                        ✓
                                      </Text>
                                    )}
                                    {!isCheckingSlug && slugNotAvailable && (
                                      <Text size="xs" c="red.6">
                                        ✗
                                      </Text>
                                    )}
                                    {!isCheckingSlug &&
                                      !slugAvailable &&
                                      !slugNotAvailable && (
                                        <IconRefresh size={14} />
                                      )}
                                  </ActionIcon>
                                )
                              }
                              description={
                                isSlugEdited
                                  ? "Custom URL (unlinked from title)"
                                  : "Auto-generated from title"
                              }
                            />
                          );
                        }}
                      </Field>
                    )}
                    {!state.values.isPublic && (
                      <TextInput
                        label="URL Slug"
                        placeholder="Enable public visibility to set a custom URL"
                        disabled
                        description="Enable public visibility to set a custom URL"
                      />
                    )}
                  </Grid.Col>
                </Grid>
              </Stack>
            </Paper>

            <Stack>
              {state.values.isPublic && (
                <Alert color="blue" variant="light">
                  <Text size="sm">
                    {state.values.slug &&
                    shouldCheckSlug &&
                    slugAvailability.data?.available ? (
                      <>
                        Your CV will be publicly accessible at:{" "}
                        <Text component="span" fw={500} c="blue.7">
                          /cv/{state.values.slug}
                        </Text>
                      </>
                    ) : state.values.slug &&
                      shouldCheckSlug &&
                      slugAvailability.data &&
                      !slugAvailability.data.available ? (
                      "Your CV will be public, but the current slug is not available. Please choose a different one."
                    ) : state.values.slug ? (
                      "Your CV will be public. Checking slug availability..."
                    ) : (
                      "Your CV will be public. Add a URL slug to make it accessible at a custom URL."
                    )}
                  </Text>
                </Alert>
              )}
            </Stack>

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
