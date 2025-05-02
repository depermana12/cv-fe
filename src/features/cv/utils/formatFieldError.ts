export const formatFieldError = (
  errors: Array<{ message?: string } | null>,
) => {
  return errors.length
    ? errors
        .map((err) => err?.message)
        .filter(Boolean)
        .join(", ")
    : null;
};
