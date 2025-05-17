import { createTheme } from "@mantine/core";

export const myTheme = createTheme({
  colors: {
    blue: [
      "#e6f4ff",
      "#d0e2ff",
      "#a6c8ff",
      "#78a9ff",
      "#4589ff",
      "#0f62fe",
      "#0043ce",
      "#002d9c",
      "#001d6c",
      "#001141",
    ],
  },
  primaryColor: "blue",
  primaryShade: { light: 5, dark: 7 },
  defaultRadius: "md",
  focusRing: "auto",
  fontFamily: "Open Sans, sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: { fontFamily: "Open Sans, sans-serif" },

  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
});
