import { useCallback, useState } from "react";

export interface SectionDimensions {
  sectionType: string;
  height: number;
  isOverflowing: boolean;
}

export interface PageBreakResult {
  pages: SectionDimensions[][];
  totalPages: number;
  hasOverflow: boolean;
}

/**
 * Hook for measuring section heights and calculating page breaks
 * Uses direct DOM measurement for accurate overflow detection
 */
export const useSectionHeightMeasurement = (
  A4_HEIGHT: number,
  margin: number = 0.5, // margin in inches
) => {
  const [sectionRefs] = useState(new Map<string, HTMLElement>());
  const [pageBreakResult, setPageBreakResult] = useState<PageBreakResult>({
    pages: [],
    totalPages: 1,
    hasOverflow: false,
  });

  // Convert margin from inches to pixels (96 DPI)
  const marginPx = margin * 96;
  const effectivePageHeight = A4_HEIGHT - marginPx * 2; // Top and bottom margins

  /**
   * Register a section element for measurement
   */
  const registerSection = useCallback(
    (sectionType: string, element: HTMLElement | null) => {
      if (element) {
        sectionRefs.set(sectionType, element);
      } else {
        sectionRefs.delete(sectionType);
      }
    },
    [sectionRefs],
  );

  /**
   * Measure height of a specific section
   */
  const measureSectionHeight = useCallback(
    (sectionType: string): number => {
      const element = sectionRefs.get(sectionType);
      if (!element) return 0;

      // Use getBoundingClientRect for more accurate measurement
      const rect = element.getBoundingClientRect();
      return rect.height;
    },
    [sectionRefs],
  );

  /**
   * Calculate page breaks based on section heights
   */
  const calculatePageBreaks = useCallback(
    (selectedSections: string[]): PageBreakResult => {
      const sectionDimensions: SectionDimensions[] = [];

      // Measure all sections
      for (const sectionType of selectedSections) {
        const height = measureSectionHeight(sectionType);
        sectionDimensions.push({
          sectionType,
          height,
          isOverflowing: height > effectivePageHeight,
        });
      }

      // Calculate page distribution
      const pages: SectionDimensions[][] = [];
      let currentPage: SectionDimensions[] = [];
      let currentPageHeight = 0;

      for (const section of sectionDimensions) {
        const sectionHeight = section.height;

        // If section is too large for any page, it's an overflow section
        if (section.isOverflowing) {
          // If current page has content, finish it
          if (currentPage.length > 0) {
            pages.push([...currentPage]);
            currentPage = [];
            currentPageHeight = 0;
          }

          // Put overflow section on its own page
          pages.push([section]);
          continue;
        }

        // If adding this section would exceed page height, start new page
        if (
          currentPageHeight + sectionHeight > effectivePageHeight &&
          currentPage.length > 0
        ) {
          pages.push([...currentPage]);
          currentPage = [section];
          currentPageHeight = sectionHeight;
        } else {
          currentPage.push(section);
          currentPageHeight += sectionHeight;
        }
      }

      // Add final page if it has content
      if (currentPage.length > 0) {
        pages.push(currentPage);
      }

      // If no pages, create at least one empty page
      if (pages.length === 0) {
        pages.push([]);
      }

      const hasOverflow = sectionDimensions.some(
        (section) => section.isOverflowing,
      );

      return {
        pages,
        totalPages: pages.length,
        hasOverflow,
      };
    },
    [effectivePageHeight, measureSectionHeight],
  );

  /**
   * Recalculate page breaks when sections change
   */
  const recalculatePageBreaks = useCallback(
    (selectedSections: string[]) => {
      // Longer delay to ensure DOM is fully rendered and styled
      const timer = setTimeout(() => {
        if (process.env.NODE_ENV === "development") {
          console.log(
            "Recalculating page breaks for sections:",
            selectedSections,
          );
          console.log("Registered sections:", Array.from(sectionRefs.keys()));

          // Debug: Show actual heights
          selectedSections.forEach((section) => {
            const height = measureSectionHeight(section);
            console.log(`📐 Section "${section}" height: ${height}px`);
          });

          console.log("Effective page height:", effectivePageHeight);
        }

        const result = calculatePageBreaks(selectedSections);

        if (process.env.NODE_ENV === "development") {
          console.log("Page break result:", result);
          console.log("Total pages calculated:", result.totalPages);
        }

        setPageBreakResult(result);
      }, 200); // Increased delay for proper measurement

      return () => clearTimeout(timer);
    },
    [
      calculatePageBreaks,
      sectionRefs,
      measureSectionHeight,
      effectivePageHeight,
    ],
  );

  /**
   * Get sections for a specific page
   */
  const getSectionsForPage = useCallback(
    (pageIndex: number): SectionDimensions[] => {
      if (pageIndex < 0 || pageIndex >= pageBreakResult.pages.length) {
        return [];
      }
      return pageBreakResult.pages[pageIndex];
    },
    [pageBreakResult.pages],
  );

  /**
   * Check if a specific section is on a specific page
   */
  const isSectionOnPage = useCallback(
    (sectionType: string, pageIndex: number): boolean => {
      const sectionsOnPage = getSectionsForPage(pageIndex);
      return sectionsOnPage.some(
        (section) => section.sectionType === sectionType,
      );
    },
    [getSectionsForPage],
  );

  return {
    registerSection,
    measureSectionHeight,
    calculatePageBreaks,
    recalculatePageBreaks,
    getSectionsForPage,
    isSectionOnPage,
    pageBreakResult,
    effectivePageHeight,
    totalPages: pageBreakResult.totalPages,
    hasOverflow: pageBreakResult.hasOverflow,
  };
};

export type SectionHeightMeasurement = ReturnType<
  typeof useSectionHeightMeasurement
>;
