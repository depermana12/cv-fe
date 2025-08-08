import { useEffect, useState } from "react";
import { Box } from "@mantine/core";
import { useResizeObserver } from "@mantine/hooks";

interface CvA4PreviewProps {
  children: React.ReactNode;
}

/**
 * CvA4Preview - Scales A4 content to fit container
 * Maintains A4 aspect ratio (794x1123px at 96 DPI)
 * Uses Mantine's useResizeObserver hook for responsive scaling
 * Uses transform-origin: top left for proper alignment
 *
 * Note: Overflow and scrolling is handled by parent containers.
 * This component allows content to expand beyond its bounds for proper measurement.
 */
export const CvA4Preview = ({ children }: CvA4PreviewProps) => {
  const [ref, rect] = useResizeObserver();
  const [scale, setScale] = useState(1);

  // A4 dimensions in pixels at 96 DPI
  const A4_WIDTH = 794;
  const A4_HEIGHT = 1123;

  useEffect(() => {
    const updateScale = () => {
      // Use rect from useResizeObserver
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      // Skip calculation if dimensions are not available yet
      if (containerWidth === 0 || containerHeight === 0) return;

      // Account for padding when calculating available space
      const PADDING = 20; // 10px on each side
      const availableWidth = containerWidth - PADDING;
      const availableHeight = containerHeight - PADDING;

      // Calculate scale based on available space (not full container)
      const scaleX = availableWidth / A4_WIDTH;
      const scaleY = availableHeight / A4_HEIGHT;

      // Use the smaller scale to ensure content fits within container
      const newScale = Math.min(scaleX, scaleY, 1); // Don't scale up beyond 1
      setScale(newScale);
    };

    updateScale();
  }, [rect.width, rect.height, A4_WIDTH, A4_HEIGHT]);

  return (
    <Box
      ref={ref}
      style={{
        width: "100%",
        height: "100%",
        padding: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "visible", // Let parent handle overflow and scrolling
      }}
    >
      <Box
        style={{
          width: A4_WIDTH * scale, // Use scaled dimensions for proper centering
          minHeight: A4_HEIGHT * scale, // Use minHeight instead of height to allow expansion
          position: "relative",
          backgroundColor: "transparent",
        }}
      >
        <Box
          style={{
            width: A4_WIDTH,
            minHeight: A4_HEIGHT, // Use minHeight to allow content expansion
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: 0,
            left: 0,
            overflow: "visible", // Allow content to be visible for measurement
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
