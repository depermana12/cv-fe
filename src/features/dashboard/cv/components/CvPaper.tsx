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
 */
export const CvPaper = ({ children }: CvPaperProps) => {
  const { fontSize, lineHeight, padding, fontFamily } = useCvStyleStore();

  return (
    <Box
      style={{
        width: "100%", // Use 100% instead of fixed 794px
        height: "100%", // Use 100% instead of fixed 1123px
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid var(--mantine-color-gray-3)",
        borderRadius: "5px",
        padding: `${padding}px`,
        fontSize: `${fontSize}px`,
        lineHeight: lineHeight,
        fontFamily: fontFamily,
        color: "#000",
        overflow: "auto", // Changed from hidden to auto for scrolling within paper
        position: "relative",
      }}
    >
      {children}
    </Box>
  );
};
