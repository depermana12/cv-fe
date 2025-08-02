import { useState } from "react";
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

  // Dynamic descriptions state
  const [descriptions, setDescriptions] = useState<string[]>(
    initialData?.descriptions || [""],
  );

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
            onSuccess: () => {
              notifications.show({
                title: "Success",
                message: "Course created successfully",
                color: "green",
                icon: <IconCheck size={16} />,
              });
              onSuccess?.();
            },
          },
        );
      } else if (mode === "edit" && initialData) {
        updateCourse(
          { cvId: activeCvId, courseId: initialData.id, data: submitData },
          {
            onSuccess: () => {
              notifications.show({
                title: "Success",
                message: "Course updated successfully",
                color: "green",
                icon: <IconCheck size={16} />,
              });
              onSuccess?.();
            },
          },
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

  const isPending = isCreating || isUpdating || isDeleting;

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
    <Box pos="relative">
      <LoadingOverlay visible={state.isSubmitting || isPending} />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Paper withBorder p="md">
          <Stack gap="xs">
            {/* Course Information Section */}
            <Text fw="bold">Course Information</Text>

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

            {/* Course Period Section */}
            <Text fw="bold">Course Period</Text>

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

            {/* Course Details Section */}
            <Group justify="space-between" align="center">
              <Text fw="bold">Course Details</Text>
              <Button
                variant="light"
                size="sm"
                leftSection={<IconPlus size={16} />}
                onClick={addDescription}
              >
                Add bullet
              </Button>
            </Group>

            <Stack gap="sm">
              {descriptions.map((description, index) => (
                <Box key={index}>
                  <Group align="center" gap="xs">
                    <Textarea
                      placeholder={`Course detail ${index + 1}`}
                      value={description}
                      onChange={(e) => updateDescription(index, e.target.value)}
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
          {mode === "edit" && initialData && (
            <Tooltip label="Delete course">
              <ActionIcon
                color="red"
                variant="outline"
                onClick={openDeleteModal}
                size="lg"
                disabled={isPending}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </Tooltip>
          )}
          <Button
            type="submit"
            variant="filled"
            loading={state.isSubmitting || isPending}
          >
            {mode === "create" ? "Create Course" : "Update Course"}
          </Button>
        </Group>
      </form>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={closeDeleteModal}
        title="Delete Course?"
        centered
      >
        <Stack gap="md">
          <Text>Are you sure you want to delete this course?</Text>

          <Group justify="flex-end">
            <Button variant="default" onClick={closeDeleteModal}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete} loading={isDeleting}>
              Delete Course
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
};
