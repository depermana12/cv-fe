// Multi-page CV preview components
export { CVLivePreviewA4MultiPage } from "./CVLivePreviewA4MultiPage";
export { CVStackedPagesPreview } from "./CVStackedPagesPreview";

// Multi-page hooks
export { useSectionHeightMeasurement } from "./hooks/useSectionHeightMeasurement";
export type {
  SectionDimensions,
  PageBreakResult,
  SectionHeightMeasurement,
} from "./hooks/useSectionHeightMeasurement";

// Original components (for backward compatibility)
export { CvA4Preview } from "./CvA4Preview";
export { CvPaper } from "./CvPaper";
