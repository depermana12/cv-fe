import { Box } from "@mantine/core";
import { useCvStyleStore } from "@features/dashboard/cv/store/cvStyleStore";

interface CvPaperProps {
  children: React.ReactNode;
}

/**
 * CvPaper - A4 paper layout container
 * Uses percentages for responsive scaling within CvA4Preview
 * Customizable styling through cvStyleStore
 * White background with light box-shadow
 *
 * Note: overflow is handled by parent containers (CvA4Preview/CVMultiPagePreview)
 * to allow proper height measurement for multi-page functionality
 */
export const CvPaper = ({ children }: CvPaperProps) => {
  const { fontSize, lineHeight, fontFamily } = useCvStyleStore();

  return (
    <Box
      style={{
        width: "100%", // Use 100% instead of fixed 794px
        height: "100%", // Use 100% instead of fixed 1123px
        backgroundColor: "white",
        border: "1px solid var(--mantine-color-gray-3)",
        borderRadius: "5px",
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
        fontFamily: fontFamily,
        color: "#000",
        overflow: "visible", // Changed to visible to allow proper height measurement
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
};
