import { z } from "zod";

export const zFieldValidator =
  <T>(schema: z.ZodType<T>) =>
  ({ value }: { value: T }) => {
    const result = schema.safeParse(value);
    return result.success ? null : result.error.issues;
  };
