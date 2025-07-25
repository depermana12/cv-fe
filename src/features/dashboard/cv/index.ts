// Export all CV types
export type {
  Cv,
  CvCreate,
  CvUpdate,
  CvQueryOptions,
  CvStats,
  CvSlugParams,
  CvStore,
  CvFormProps,
  CvListResponse,
} from "./types/types";

// Export CV schemas
export {
  cvSchema,
  cvCreateSchema,
  cvUpdateSchema,
  cvQueryOptionsSchema,
  cvStatsSchema,
  cvSlugParamsSchema,
} from "./schema/cv.schema";

// Export CV API
export { cvService } from "./services/cvService";

// Export CV queries
export {
  cvsQuery,
  cvsPaginatedQuery,
  cvQuery,
  cvStatsQuery,
  cvByUsernameSlugQuery,
  slugAvailabilityQuery,
} from "./hooks/query";

// Export CV hooks
export { useCvStats } from "./hooks/useCvStats";
export { useCvByUsernameSlug } from "./hooks/useCvByUsernameSlug";
export { useSlugAvailability } from "./hooks/useSlugExist";
