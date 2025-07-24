import { useQuery } from "@tanstack/react-query";
import { workQuery, worksQuery } from "./query";

export const useWork = (cvId: number, workId: number) =>
  useQuery(workQuery(cvId, workId));

export const useWorks = (cvId: number) => useQuery(worksQuery(cvId));
