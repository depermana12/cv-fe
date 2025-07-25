import { useQuery } from "@tanstack/react-query";
import { cvByUsernameSlugQuery } from "./query";

export const useCvByUsernameSlug = (username: string, slug: string) =>
  useQuery(cvByUsernameSlugQuery(username, slug));
