import { useQuery } from "@tanstack/react-query";
import { cvStatsQuery } from "./query";

export const useCvStats = () => useQuery(cvStatsQuery());
