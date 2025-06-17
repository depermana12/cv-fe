import { useSuspenseQuery } from "@tanstack/react-query";
import { userStatsQuery } from "./query";

export const useUserStats = () => useSuspenseQuery(userStatsQuery());
