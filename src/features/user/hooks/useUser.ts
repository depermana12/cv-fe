import { useSuspenseQuery } from "@tanstack/react-query";
import { userMeQuery } from "./query";

export const useUser = () => useSuspenseQuery(userMeQuery());
