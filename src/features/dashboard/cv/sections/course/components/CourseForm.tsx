import { useState } from "react";
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
  Box,
  Text,
  Tooltip,
  Modal,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { IconPlus, IconTrash, IconCheck } from "@tabler/icons-react";

import {
  courseInsertSchema,
  courseUpdateSchema,
  courseSchema,
} from "../schema/courseSchema";
import { useCreateCourse } from "../hooks/useCreateCourse";
import { useUpdateCourse } from "../hooks/useUpdateCourse";
import { useDeleteCourse } from "../hooks/useDeleteCourse";
import type { CourseInsert, CourseFormProps } from "../types/course.types";
import useFieldError from "@shared/hooks/useFieldError";
import { zFieldValidator } from "@shared/utils/zFieldValidator";
import { useCvStore } from "@features/dashboard/cv/store/cvStore";

export const CourseForm = ({
  mode,
  initialData,
  onSuccess,
}: CourseFormProps) => {
  const { activeCvId } = useCvStore();

  const [opened, { open: openDeleteModal, close: closeDeleteModal }] =
    useDisclosure(false);

  const { mutate: createCourse, isPending: isCreating } = useCreateCourse();
  const { mutate: updateCourse, isPending: isUpdating } = useUpdateCourse();
  const { mutate: deleteCourse, isPending: isDeleting } = useDeleteCourse();

  if (!activeCvId) {
    return <Text>No CV selected</Text>;
  }

  const handleDelete = () => {
    if (!initialData?.id) return;

    deleteCourse(
      { courseId: initialData.id, cvId: activeCvId },
      {
        onSuccess: () => {
          notifications.show({
            title: "Success",
            message: "Course deleted successfully",
            color: "green",
            icon: <IconCheck size={16} />,
          });
          closeDeleteModal();
          onSuccess?.();
        },
      },
    );
  };

  // Dynamic descriptions state
  const [descriptions, setDescriptions] = useState<string[]>(
    initialData?.descriptions || [""],
  );

  const defaultCourseValues: CourseInsert = {
    provider: "",
    courseName: "",
    startDate: undefined,
    endDate: undefined,
    descriptions: [""],
  };

  const initialValues =
    mode === "edit" && initialData
      ? {
          provider: initialData.provider,
          courseName: initialData.courseName || "",
          startDate: initialData.startDate
            ? new Date(initialData.startDate)
            : undefined,
          endDate: initialData.endDate
            ? new Date(initialData.endDate)
            : undefined,
          descriptions: initialData.descriptions || [""],
        }
      : defaultCourseValues;

  const courseForm = useForm({
    defaultValues: initialValues,
    onSubmit: ({ value }) => {
      const submitData = {
        ...value,
        courseName: value.courseName || undefined,
        descriptions: descriptions.filter((desc) => desc.trim() !== ""),
      };

      if (mode === "create") {
        createCourse(
          { cvId: activeCvId, data: submitData },
          {
            onSuccess: () => onSuccess?.(),
          },
        );
      } else if (mode === "edit" && initialData) {
        updateCourse(
          { cvId: activeCvId, courseId: initialData.id, data: submitData },
          { onSuccess: () => onSuccess?.() },
        );
      }
    },
    validators: {
      onSubmit: ({ value }) => {
        const schema =
          mode === "create" ? courseInsertSchema : courseUpdateSchema;
        const result = schema.safeParse(value);
        if (!result.success) {
          return result.error.formErrors.fieldErrors;
        }
        return undefined;
      },
    },
  });

  const { Field, handleSubmit, state } = courseForm;

  const isPending = isCreating || isUpdating;

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
  };

  const removeDescription = (index: number) => {
    if (descriptions.length > 1) {
      setDescriptions(descriptions.filter((_, i) => i !== index));
    }
  };

  const updateDescription = (index: number, value: string) => {
    const newDescriptions = [...descriptions];
    newDescriptions[index] = value;
    setDescriptions(newDescriptions);
  };

  return (
    <>
      {/* Header with delete action for edit mode */}
      {mode === "edit" && initialData && (
        <Group justify="space-between" align="center" mb="md">
          <Title order={3} size="lg">
            Edit Course
          </Title>
          <Tooltip label="Delete course">
            <ActionIcon
              color="red"
              variant="light"
              onClick={openDeleteModal}
              size="lg"
            >
              <IconTrash size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <LoadingOverlay visible={state.isSubmitting || isPending} />

        <Stack gap="xl">
          {/* Course Information Section */}
          <Paper withBorder p="md">
            <Stack gap="md">
              <Title order={4} size="md">
                Course Information
              </Title>

              <Group grow>
                <Field
                  name="provider"
                  validators={{
                    onBlur: zFieldValidator(courseSchema.shape.provider),
                  }}
                >
                  {({ state, name, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <TextInput
                        name={name}
                        label="Provider"
                        placeholder="Course provider (e.g., Coursera, Udemy, University)"
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        error={errorField}
                        required
                        autoComplete="organization"
                      />
                    );
                  }}
                </Field>

                <Field
                  name="courseName"
                  validators={{
                    onBlur: zFieldValidator(courseSchema.shape.courseName),
                  }}
                >
                  {({ state, name, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <TextInput
                        name={name}
                        label="Course Name"
                        placeholder="Full course title"
                        value={state.value}
                        onChange={(e) => handleChange(e.target.value)}
                        onBlur={handleBlur}
                        error={errorField}
                        autoComplete="off"
                      />
                    );
                  }}
                </Field>
              </Group>
            </Stack>
          </Paper>

          {/* Course Period Section */}
          <Paper withBorder p="md">
            <Stack gap="md">
              <Title order={4} size="md">
                Course Period
              </Title>

              <Group grow>
                <Field
                  name="startDate"
                  validators={{
                    onBlur: zFieldValidator(courseSchema.shape.startDate),
                  }}
                >
                  {({ state, name, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <DateInput
                        name={name}
                        label="Start Date"
                        placeholder="Course start date"
                        value={state.value || null}
                        onChange={(value) => handleChange(value as any)}
                        onBlur={handleBlur}
                        error={errorField}
                        clearable
                        maxDate={new Date()}
                      />
                    );
                  }}
                </Field>

                <Field
                  name="endDate"
                  validators={{
                    onBlur: zFieldValidator(courseSchema.shape.endDate),
                  }}
                >
                  {({ state, name, handleChange, handleBlur }) => {
                    const errorField = useFieldError(state.meta);
                    return (
                      <DateInput
                        name={name}
                        label="End Date"
                        placeholder="Course completion date"
                        value={state.value || null}
                        onChange={(value) => handleChange(value as any)}
                        onBlur={handleBlur}
                        error={errorField}
                        clearable
                        maxDate={new Date()}
                      />
                    );
                  }}
                </Field>
              </Group>
            </Stack>
          </Paper>

          {/* Course Descriptions Section */}
          <Paper withBorder p="md">
            <Stack gap="md">
              <Group justify="space-between" align="center">
                <Title order={4} size="md">
                  Course Details
                </Title>
                <Button
                  variant="light"
                  size="sm"
                  leftSection={<IconPlus size={16} />}
                  onClick={addDescription}
                >
                  Add Detail
                </Button>
              </Group>

              <Text size="sm" c="dimmed">
                Describe what you learned, key skills acquired, or notable
                achievements from this course
              </Text>

              <Stack gap="sm">
                {descriptions.map((description, index) => (
                  <Box key={index}>
                    <Group align="flex-start" gap="sm">
                      <Textarea
                        placeholder={`Course detail ${index + 1}`}
                        value={description}
                        onChange={(e) =>
                          updateDescription(index, e.target.value)
                        }
                        autosize
                        minRows={2}
                        maxRows={4}
                        style={{ flex: 1 }}
                      />
                      {descriptions.length > 1 && (
                        <ActionIcon
                          color="red"
                          variant="light"
                          onClick={() => removeDescription(index)}
                          style={{ marginTop: 6 }}
                        >
                          <IconTrash size={16} />
                        </ActionIcon>
                      )}
                    </Group>
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Paper>

          <Group justify="flex-end" mt="lg">
            <Button type="submit" loading={state.isSubmitting || isPending}>
              {mode === "create" ? "Create Course" : "Update Course"}
            </Button>
          </Group>
        </Stack>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={closeDeleteModal}
        title="Delete Course"
        centered
      >
        <Text mb="md">
          Are you sure you want to delete this course? This action cannot be
          undone.
        </Text>
        <Group justify="flex-end">
          <Button variant="light" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete} loading={isDeleting}>
            Delete
          </Button>
        </Group>
      </Modal>
    </>
  );
};
