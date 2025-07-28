import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface CvStyleState {
  // Style properties
  fontSize: number;
  lineHeight: number;
  padding: number;
  fontFamily: string;
  headerColor: string;
  theme: string;

  // Actions
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setPadding: (padding: number) => void;
  setFontFamily: (family: string) => void;
  setHeaderColor: (color: string) => void;
  setTheme: (themeName: string) => void;
}

// Theme presets
const THEME_PRESETS = {
  modern: {
    fontSize: 13,
    lineHeight: 1.5,
    padding: 32,
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    headerColor: "#2b2b2b",
  },
  classic: {
    fontSize: 14,
    lineHeight: 1.6,
    padding: 40,
    fontFamily: "Georgia, Times, serif",
    headerColor: "#1a1a1a",
  },
  minimal: {
    fontSize: 12,
    lineHeight: 1.4,
    padding: 24,
    fontFamily: "Helvetica, Arial, sans-serif",
    headerColor: "#333333",
  },
  creative: {
    fontSize: 13,
    lineHeight: 1.5,
    padding: 28,
    fontFamily: "Montserrat, sans-serif",
    headerColor: "#2563eb",
  },
} as const;

export const useCvStyleStore = create<CvStyleState>()(
  subscribeWithSelector((set) => ({
    // Default values (modern theme)
    fontSize: 13,
    lineHeight: 1.5,
    padding: 32,
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
    headerColor: "#2b2b2b",
    theme: "modern",

    // Actions
    setFontSize: (size: number) => set({ fontSize: size }),
    setLineHeight: (height: number) => set({ lineHeight: height }),
    setPadding: (padding: number) => set({ padding }),
    setFontFamily: (family: string) => set({ fontFamily: family }),
    setHeaderColor: (color: string) => set({ headerColor: color }),

    setTheme: (themeName: string) => {
      const preset = THEME_PRESETS[themeName as keyof typeof THEME_PRESETS];
      if (preset) {
        set({
          ...preset,
          theme: themeName,
        });
      }
    },
  })),
);

export type CvTheme = keyof typeof THEME_PRESETS;
export { THEME_PRESETS };
