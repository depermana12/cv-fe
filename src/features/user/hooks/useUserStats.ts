import { useQuery } from "@tanstack/react-query";
import { userStatsQuery } from "./query";

export const useUserStats = () => useQuery(userStatsQuery());
