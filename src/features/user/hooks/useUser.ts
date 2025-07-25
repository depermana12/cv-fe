import { useQuery } from "@tanstack/react-query";
import { userMeQuery } from "./query";

export const useUser = () => useQuery(userMeQuery());
