import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { PublicCvDetailPage } from "@features/dashboard/cv/pages/PublicCvDetailPage";

// Schema for URL parameters
const publicCvParamsSchema = z.object({
  username: z.string().min(1),
  slug: z.string().min(1),
});

export const Route = createFileRoute("/$username/$slug")({
  component: PublicCvDetailPage,
  params: {
    parse: (params) => publicCvParamsSchema.parse(params),
    stringify: ({ username, slug }) => ({ username, slug }),
  },
});
