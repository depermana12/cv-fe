import { formatFieldError } from "../utils/formatFieldError";
import type { AnyFieldMeta } from "@tanstack/react-form";

const useFieldError = (meta: AnyFieldMeta) => {
  const fieldState = meta.isTouched && meta.isDirty && !meta.isValid;
  return fieldState ? formatFieldError(meta.errors) : null;
};

export default useFieldError;
