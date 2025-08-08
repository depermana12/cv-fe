import React, { useCallback, useEffect, useState, useRef } from "react";
import { Box, Text } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";
import { CvPaper } from "./CvPaper";
import { useCvStyleStore } from "@features/dashboard/cv/store/cvStyleStore";

interface CVStackedPagesPreviewProps {
  children: React.ReactNode;
  selectedSections: string[];
  renderSectionCallback?: (
    sectionType: string,
    pageNumber: number,
  ) => React.ReactNode;
}

interface SectionDimensions {
  sectionType: string;
  height: number;
  element: React.ReactNode;
}

interface PageContent {
  sections: SectionDimensions[];
  totalHeight: number;
}

/**
 * CVStackedPagesPreview - Multiple stacked A4 papers with proper content distribution
 * Features:
 * - Measures each section's height individually
 * - Distributes content across pages based on A4 height limits
 * - Each paper has proper margins and shadows
 * - Content flows intelligently from one paper to the next
 * - Scroll to view additional papers
 */
export const CVStackedPagesPreview = ({
  children,
  selectedSections,
  renderSectionCallback,
}: CVStackedPagesPreviewProps) => {
  const [ref] = useResizeObserver();
  const [scale, setScale] = useState(1);
  const [pages, setPages] = useState<PageContent[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const measurementRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Get dynamic margin from store
  const { margin } = useCvStyleStore();

  // A4 dimensions in pixels at 96 DPI
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;
  const PAGE_MARGIN = margin * 96 * 2; // Convert inches to pixels and account for top/bottom
  const EFFECTIVE_PAGE_HEIGHT = A4_HEIGHT - PAGE_MARGIN;

  // Calculate scale based on container width
  useEffect(() => {
    const updateScale = () => {
      if (!ref.current) return;

      const containerWidth = ref.current.offsetWidth;
      if (containerWidth === 0) return;

      const PADDING = 40;
      const availableWidth = containerWidth - PADDING;
      const scaleX = availableWidth / A4_WIDTH;
      const newScale = Math.min(scaleX, 1);
      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [ref]);

  // Register section for measurement
  const registerSection = useCallback(
    (sectionType: string, element: HTMLDivElement | null) => {
      if (element) {
        measurementRefs.current.set(sectionType, element);
      } else {
        measurementRefs.current.delete(sectionType);
      }
    },
    [],
  );

  // Measure section height
  const measureSectionHeight = useCallback((sectionType: string): number => {
    const element = measurementRefs.current.get(sectionType);
    if (!element) return 0;

    const rect = element.getBoundingClientRect();
    return rect.height;
  }, []);

  // Render all content for measurement (hidden)
  const renderAllContent = useCallback(() => {
    if (!renderSectionCallback) {
      return children;
    }

    return (
      <>
        {selectedSections.map((sectionType, index) => {
          const sectionElement = renderSectionCallback(sectionType, 1);

          return (
            <Box
              key={sectionType}
              ref={(el) => registerSection(sectionType, el)}
              style={{
                marginBottom: index < selectedSections.length - 1 ? "16px" : 0,
              }}
            >
              {sectionElement}
            </Box>
          );
        })}
      </>
    );
  }, [selectedSections, renderSectionCallback, children, registerSection]);

  // Calculate content distribution across pages
  const calculatePageDistribution = useCallback(() => {
    if (!renderSectionCallback || selectedSections.length === 0) {
      setPages([{ sections: [], totalHeight: 0 }]);
      return;
    }

    const sectionDimensions: SectionDimensions[] = [];

    // Measure all sections
    for (const sectionType of selectedSections) {
      const height = measureSectionHeight(sectionType);
      const element = renderSectionCallback(sectionType, 1);

      sectionDimensions.push({
        sectionType,
        height,
        element,
      });
    }

    // Distribute sections across pages
    const calculatedPages: PageContent[] = [];
    let currentPage: PageContent = { sections: [], totalHeight: 0 };

    for (const section of sectionDimensions) {
      const sectionHeight = section.height + 16; // Add margin between sections

      // If adding this section would exceed page height, start new page
      if (
        currentPage.totalHeight + sectionHeight > EFFECTIVE_PAGE_HEIGHT &&
        currentPage.sections.length > 0
      ) {
        calculatedPages.push(currentPage);
        currentPage = { sections: [section], totalHeight: sectionHeight };
      } else {
        currentPage.sections.push(section);
        currentPage.totalHeight += sectionHeight;
      }
    }

    // Add final page if it has content
    if (currentPage.sections.length > 0) {
      calculatedPages.push(currentPage);
    }

    // If no pages, create at least one empty page
    if (calculatedPages.length === 0) {
      calculatedPages.push({ sections: [], totalHeight: 0 });
    }

    setPages(calculatedPages);
  }, [
    selectedSections,
    renderSectionCallback,
    measureSectionHeight,
    EFFECTIVE_PAGE_HEIGHT,
  ]);

  // Recalculate when sections change
  useEffect(() => {
    if (selectedSections.length > 0) {
      setIsCalculating(true);

      // Longer delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        calculatePageDistribution();
        setIsCalculating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [selectedSections, calculatePageDistribution]);

  // Render content for a specific page
  const renderPageContent = useCallback(
    (pageIndex: number) => {
      const pageContent = pages[pageIndex];
      if (!pageContent || pageContent.sections.length === 0) {
        return null;
      }

      return (
        <>
          {pageContent.sections.map((section, index) => (
            <Box
              key={`${section.sectionType}-page-${pageIndex}`}
              style={{
                marginBottom:
                  index < pageContent.sections.length - 1 ? "16px" : 0,
              }}
            >
              {section.element}
            </Box>
          ))}
        </>
      );
    },
    [pages],
  );

  return (
    <Box
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
        overflow: "auto",
      }}
    >
      {/* Hidden content for measurement */}
      <Box
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "794px",
          visibility: "hidden",
          padding: `${margin}in`,
        }}
      >
        {renderAllContent()}
      </Box>

      {/* Calculation indicator */}
      {isCalculating && (
        <Text size="sm" c="dimmed">
          Calculating page layout...
        </Text>
      )}

      {/* Render multiple A4 papers with distributed content */}
      {!isCalculating &&
        pages.map((_, pageIndex) => (
          <Box
            key={pageIndex}
            style={{
              width: A4_WIDTH * scale,
              height: A4_HEIGHT * scale,
              position: "relative",
              backgroundColor: "transparent",
              flexShrink: 0,
            }}
          >
            <Box
              style={{
                width: A4_WIDTH,
                height: A4_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <CvPaper>
                <Box
                  style={{
                    position: "relative",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    margin: `${margin}in`,
                    minHeight: A4_HEIGHT - margin * 96 * 2,
                    overflow: "hidden", // Prevent overflow within each page
                  }}
                >
                  {renderPageContent(pageIndex)}
                </Box>
              </CvPaper>
            </Box>
          </Box>
        ))}

      {/* Page count info */}
      {!isCalculating && pages.length > 1 && (
        <Text size="xs" c="dimmed" ta="center">
          {pages.length} pages
        </Text>
      )}
    </Box>
  );
};
