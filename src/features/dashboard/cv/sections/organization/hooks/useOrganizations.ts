import { useQuery } from "@tanstack/react-query";
import { organizationService } from "../services/organizationService";

export const useOrganizations = (cvId: number) => {
  return useQuery({
    queryKey: ["cvs", cvId, "organizations"],
    queryFn: async () => {
      const res = await organizationService.getAll(cvId);
      return res.data;
    },
    enabled: !!cvId,
  });
};

export const useOrganization = (cvId: number, organizationId: number) => {
  return useQuery({
    queryKey: ["cvs", cvId, "organizations", organizationId],
    queryFn: async () => {
      const res = await organizationService.get(cvId, organizationId);
      return res.data;
    },
    enabled: !!cvId && !!organizationId,
  });
};
