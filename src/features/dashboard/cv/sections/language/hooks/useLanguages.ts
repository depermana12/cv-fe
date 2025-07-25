import { useQuery } from "@tanstack/react-query";
import { languageService } from "../services/languageService";

export const useLanguages = (cvId: number) => {
  return useQuery({
    queryKey: ["languages", cvId],
    queryFn: () => languageService.getAll(cvId),
    enabled: !!cvId,
  });
};
