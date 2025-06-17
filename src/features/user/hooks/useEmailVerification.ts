import { useSuspenseQuery } from "@tanstack/react-query";
import { emailVerificationQuery } from "./query";

export const useEmailVerification = () =>
  useSuspenseQuery(emailVerificationQuery());
