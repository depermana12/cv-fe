import {
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
  Container,
} from "@mantine/core";
import { useForm } from "@tanstack/react-form";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-router";
import { cvCreateSchema } from "../schema/cv.schema";
import { useCreateCv } from "../hooks/useCreateCv";
import { cvService } from "../services/cvService";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import type { CvCreate } from "../types/types";

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

export const CvCreatePage = () => {
  const navigate = useNavigate();
  const { mutate: createCv, isPending } = useCreateCv();

  const defaultValues: CvCreate = {
    title: "",
    description: "",
    theme: "modern",
    isPublic: false,
    slug: "",
    language: "id",
  };

  const cvform = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      createCv(value, {
        onSuccess: (createdCv) => {
          notifications.show({
            position: "top-right",
            withCloseButton: true,
            autoClose: 5000,
            title: "Success!",
            message: `CV "${value.title}" has been created successfully.`,
            color: "green",
          });

          navigate({
            to: "/dashboard/cv/library/$cvId",
            params: { cvId: createdCv.id.toString() },
          });
        },
      });
    },
    validators: {
      onSubmit: zFieldValidator(cvCreateSchema),
    },
  });

  return (
    <Container size="md">
      <Stack gap="lg">
        {/* Header */}
        <Stack gap={0}>
          <Title order={2}>Create New CV</Title>
          <Text c="dimmed">Fill in the details below about your cv</Text>
        </Stack>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            cvform.handleSubmit();
          }}
        >
          <Box pos="relative">
            <LoadingOverlay
              visible={cvform.state.isSubmitting || isPending}
              overlayProps={{ radius: "sm", blur: 2 }}
            />

            <Stack gap="lg">
              <Paper withBorder p="md">
                <Stack gap="md">
                  <Title order={4} size="md">
                    Basic Information
                  </Title>

                  <cvform.Field
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
                          }}
                          error={errorField}
                        />
                      );
                    }}
                  />

                  <cvform.Field
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
                </Stack>
              </Paper>

              <Paper withBorder p="md">
                <Stack gap="md">
                  <Title order={4} size="md">
                    Preferences
                  </Title>

                  <Group grow>
                    <cvform.Field
                      name="theme"
                      children={({ state, handleChange }) => (
                        <Select
                          label="Theme"
                          description="Visual style of your CV"
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

                    <cvform.Field
                      name="language"
                      children={({ state, handleChange }) => (
                        <Select
                          label="Language"
                          description="Language content of the CV"
                          data={LANGUAGES.map((lang) => ({
                            value: lang.value,
                            label: `${lang.label}`,
                          }))}
                          value={state.value}
                          onChange={(value) => handleChange(value || "id")}
                          allowDeselect={false}
                        />
                      )}
                    />
                  </Group>
                </Stack>
              </Paper>

              <Paper withBorder p="md">
                <Stack gap="md">
                  <Title order={4} size="md">
                    Privacy & Sharing
                  </Title>

                  <Grid>
                    <Grid.Col span={4}>
                      <cvform.Field
                        name="isPublic"
                        children={({ state, handleChange }) => (
                          <Select
                            label="Visibility"
                            description="Who can view your CV"
                            data={[
                              { value: "false", label: "Private" },
                              { value: "true", label: "Public" },
                            ]}
                            value={state.value ? "true" : "false"}
                            onChange={(value) => handleChange(value === "true")}
                            allowDeselect={false}
                          />
                        )}
                      />
                    </Grid.Col>

                    <Grid.Col span={8}>
                      <cvform.Field
                        name="slug"
                        asyncDebounceMs={500}
                        validators={{
                          onBlur: zFieldValidator(cvCreateSchema.shape.slug),
                          onChangeAsync: async ({ value }) => {
                            if (!value || value.length < 3) {
                              return undefined;
                            }
                            try {
                              const response =
                                await cvService.slugExists(value);

                              if (!response.data.available) {
                                return "This slug is already taken";
                              }

                              return undefined;
                            } catch (err) {
                              return "Unable to validate slug right now.";
                            }
                          },
                        }}
                        children={({ state, handleChange, handleBlur }) => {
                          const errorField = state.meta.errors.join(", ");
                          const isValidating = state.meta.isValidating;

                          return (
                            <TextInput
                              label="URL Slug"
                              placeholder="my-awesome-cv"
                              description="Custom URL for your CV (e.g., /cv/my-awesome-cv)"
                              value={state.value}
                              onChange={(e) => handleChange(e.target.value)}
                              onBlur={handleBlur}
                              error={errorField}
                              rightSection={
                                isValidating ? (
                                  <Text size="xs" c="blue.6">
                                    ⏳
                                  </Text>
                                ) : state.value && !errorField ? (
                                  <Text size="xs" c="green.6">
                                    ✓
                                  </Text>
                                ) : state.value && errorField ? (
                                  <Text size="xs" c="red.6">
                                    ✗
                                  </Text>
                                ) : null
                              }
                            />
                          );
                        }}
                      />
                    </Grid.Col>
                  </Grid>
                </Stack>
              </Paper>

              {/* Alert Section - Using cvform.Subscribe for reactivity */}
              <cvform.Subscribe
                selector={(state) => ({
                  isPublic: state.values.isPublic,
                  slug: state.values.slug,
                })}
                children={({ isPublic, slug }) => (
                  <>
                    {/* Red alert when public but no slug */}
                    {isPublic && !slug && (
                      <Alert color="red" variant="light">
                        <Text size="sm">
                          A slug is required for public CVs. Please enter a URL
                          slug below.
                        </Text>
                      </Alert>
                    )}

                    {/* Blue alert when public and has slug */}
                    {isPublic && slug && (
                      <Alert color="blue" variant="light">
                        <Text size="sm">
                          Your CV will be publicly accessible at:{" "}
                          <Text component="span" fw={500} c="blue.7">
                            domain.com/username/{slug}
                          </Text>
                        </Text>
                      </Alert>
                    )}
                  </>
                )}
              />

              {/* Actions */}
              <Group justify="flex start">
                <Button
                  size="md"
                  type="submit"
                  loading={cvform.state.isSubmitting || isPending}
                  disabled={
                    cvform.state.isSubmitting ||
                    isPending ||
                    (cvform.state.values.isPublic && !cvform.state.values.slug)
                  }
                >
                  Create CV
                </Button>
              </Group>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};
