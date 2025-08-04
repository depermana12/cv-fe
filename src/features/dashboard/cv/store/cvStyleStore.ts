import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface CvStyleState {
  // Typography properties
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  headerColor: string;

  // Layout properties
  contactAlignment: "left" | "center";
  margin: number;
  sectionDivider: boolean;

  // Theme
  theme: string;

  // Typography actions
  setFontFamily: (family: string) => void;
  setFontSize: (size: number) => void;
  setLineHeight: (height: number) => void;
  setHeaderColor: (color: string) => void;

  // Layout actions
  setContactAlignment: (alignment: "left" | "center") => void;
  setMargin: (margin: number) => void;
  setSectionDivider: (enabled: boolean) => void;

  // Theme actions
  setTheme: (themeName: string) => void;
}

// Theme presets
const THEME_PRESETS = {
  modern: {
    // Typography
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    lineHeight: 1.5,
    headerColor: "#1e40af",
    // Layout
    contactAlignment: "left" as const,
    margin: 0.55, // inches
    sectionDivider: true,
  },
  minimal: {
    // Typography
    fontFamily: "Helvetica, Arial, sans-serif",
    fontSize: 12,
    lineHeight: 1.4,
    headerColor: "#000000",
    // Layout
    contactAlignment: "left" as const,
    margin: 0.4,
    sectionDivider: false,
  },
} as const;

export const useCvStyleStore = create<CvStyleState>()(
  subscribeWithSelector((set) => ({
    // Default values (modern theme)
    // Typography
    fontFamily: "Poppins, sans-serif",
    fontSize: 13,
    lineHeight: 1.5,
    headerColor: "#1e40af",

    // Layout
    contactAlignment: "left",
    margin: 0.55,
    sectionDivider: true,

    // Theme
    theme: "modern",

    // Typography actions
    setFontFamily: (family: string) => set({ fontFamily: family }),
    setFontSize: (size: number) => set({ fontSize: size }),
    setLineHeight: (height: number) => set({ lineHeight: height }),
    setHeaderColor: (color: string) => set({ headerColor: color }),

    // Layout actions
    setContactAlignment: (alignment: "left" | "center") =>
      set({ contactAlignment: alignment }),
    setMargin: (margin: number) => set({ margin }),
    setSectionDivider: (enabled: boolean) => set({ sectionDivider: enabled }),

    // Theme actions
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
