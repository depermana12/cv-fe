import { useQuery } from "@tanstack/react-query";
import { emailVerificationQuery } from "./query";

export const useEmailVerification = () => useQuery(emailVerificationQuery());
