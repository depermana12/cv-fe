import { useForm } from "@tanstack/react-form";
import { useCreateLocation } from "../hooks/useCreateLocation";
import { usePersonalId } from "../hooks/usePersonalId";
import type { LocationForm } from "../types/types";
import { locationSchema } from "../schema/locationSchema";
import { LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { zFieldValidator } from "../utils/zFieldValidator";
import useFieldError from "../hooks/useFieldError";

const LocationForm = () => {
  const { mutate, isPending } = useCreateLocation();
  const personalId = usePersonalId();

  const locationDefaultValues: LocationForm = {
    personalId,
    address: "",
    postalCode: "",
    city: "",
    countryCode: "",
    state: "",
  };

  const { Field, handleSubmit, state } = useForm({
    defaultValues: locationDefaultValues,
    onSubmit: ({ value }) => mutate(value),
    validators: {
      onSubmit: locationSchema.omit({ id: true }),
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <LoadingOverlay visible={state.isSubmitting || isPending} />
      <Stack gap="md">
        <Field
          name="address"
          validators={{ onBlur: zFieldValidator(locationSchema.shape.address) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Address"
                placeholder="Address"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="postalCode"
          validators={{
            onBlur: zFieldValidator(locationSchema.shape.postalCode),
          }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Postal Code"
                placeholder="Postal Code"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="city"
          validators={{ onBlur: zFieldValidator(locationSchema.shape.city) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="City"
                placeholder="City"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="countryCode"
          validators={{
            onBlur: zFieldValidator(locationSchema.shape.countryCode),
          }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="Country Code"
                placeholder="Country Code"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
        <Field
          name="state"
          validators={{ onBlur: zFieldValidator(locationSchema.shape.state) }}
        >
          {({ state, handleChange, handleBlur }) => {
            const errorField = useFieldError(state.meta);
            return (
              <TextInput
                label="State"
                placeholder="State"
                value={state.value}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                error={errorField}
              />
            );
          }}
        </Field>
      </Stack>
    </form>
  );
};
export default LocationForm;
