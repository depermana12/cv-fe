import { queryOptions } from "@tanstack/react-query";
import { organizationService } from "../services/organizationService";

export const organizationQuery = (cvId: number, organizationId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "organizations", organizationId],
    queryFn: async () => {
      const res = await organizationService.get(cvId, organizationId);
      return res.data;
    },
    enabled: !!cvId && !!organizationId,
  });

export const organizationsQuery = (cvId: number) =>
  queryOptions({
    queryKey: ["cvs", cvId, "organizations"],
    queryFn: async () => {
      const res = await organizationService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
