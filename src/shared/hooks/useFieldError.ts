import type { AnyFieldMeta } from "@tanstack/react-form";

const formatFieldError = (errors: Array<{ message?: string } | null>) => {
  return errors.length
    ? errors
        .map((err) => err?.message)
        .filter(Boolean)
        .join(", ")
    : null;
};

const useFieldError = (meta: AnyFieldMeta) => {
  const fieldState = meta.isTouched && meta.isDirty && !meta.isValid;
  return fieldState ? formatFieldError(meta.errors) : null;
};

export default useFieldError;
