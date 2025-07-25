import { useQuery } from "@tanstack/react-query";
import { slugAvailabilityQuery } from "./query";

export const useSlugAvailability = (
  slug: string,
  excludeCvId?: number,
  enabled: boolean = true,
) => {
  return useQuery({
    ...slugAvailabilityQuery(slug, excludeCvId),
    enabled: enabled && !!slug && slug.length > 0,
  });
};
