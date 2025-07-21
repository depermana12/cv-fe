import { useMatches } from "@tanstack/react-router";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export const useBreadcrumbItems = (): BreadcrumbItem[] => {
  const matches = useMatches();

  return matches
    .map((match) => {
      const label = match.staticData.breadcrumb;
      if (typeof label !== "string") return null;
      return { label, href: match.pathname };
    })
    .filter((item): item is BreadcrumbItem => item !== null);
};
