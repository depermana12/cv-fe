import {
  Stack,
  Group,
  Button,
  NumberInput,
  Select,
  ColorInput,
  Card,
  Title,
  Divider,
} from "@mantine/core";
import {
  useCvStyleStore,
  THEME_PRESETS,
} from "@features/dashboard/cv/store/cvStyleStore";

export const CvThemeSelector = () => {
  const {
    fontSize,
    lineHeight,
    padding,
    fontFamily,
    headerColor,
    theme,
    setFontSize,
    setLineHeight,
    setPadding,
    setFontFamily,
    setHeaderColor,
    setTheme,
  } = useCvStyleStore();

  const fontOptions = [
    {
      value: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      label: "Inter",
    },
    { value: "Georgia, Times, serif", label: "Georgia" },
    { value: "Helvetica, Arial, sans-serif", label: "Helvetica" },
    { value: "Montserrat, sans-serif", label: "Montserrat" },
    { value: "Roboto, sans-serif", label: "Roboto" },
    { value: "Open Sans, sans-serif", label: "Open Sans" },
  ];

  return (
    <Stack gap="lg">
      {/* Theme Presets */}
      <Card p="md" withBorder>
        <Title order={4} mb="md">
          Theme Presets
        </Title>
        <Group gap="xs">
          {Object.keys(THEME_PRESETS).map((themeName) => (
            <Button
              key={themeName}
              variant={theme === themeName ? "filled" : "outline"}
              size="sm"
              onClick={() => setTheme(themeName)}
              style={{ textTransform: "capitalize" }}
            >
              {themeName}
            </Button>
          ))}
        </Group>
      </Card>

      <Divider />

      {/* Custom Style Controls */}
      <Card p="md" withBorder>
        <Title order={4} mb="md">
          Custom Styling
        </Title>
        <Stack gap="md">
          {/* Typography */}
          <Group grow>
            <NumberInput
              label="Font Size"
              description="Text size in pixels"
              value={fontSize}
              onChange={(value) => setFontSize(Number(value))}
              min={10}
              max={20}
              suffix="px"
            />
            <NumberInput
              label="Line Height"
              description="Text line spacing"
              value={lineHeight}
              onChange={(value) => setLineHeight(Number(value))}
              min={1}
              max={2.5}
              step={0.1}
              decimalScale={1}
            />
          </Group>

          {/* Layout */}
          <Group grow>
            <NumberInput
              label="Padding"
              description="Page margins in pixels"
              value={padding}
              onChange={(value) => setPadding(Number(value))}
              min={16}
              max={60}
              suffix="px"
            />
            <Select
              label="Font Family"
              description="Text font"
              value={fontFamily}
              onChange={(value) => setFontFamily(value || fontOptions[0].value)}
              data={fontOptions}
            />
          </Group>

          {/* Colors */}
          <ColorInput
            label="Header Color"
            description="Color for headings and titles"
            value={headerColor}
            onChange={setHeaderColor}
            format="hex"
            swatches={[
              "#2b2b2b",
              "#1a1a1a",
              "#333333",
              "#2563eb",
              "#dc2626",
              "#059669",
              "#7c3aed",
            ]}
          />
        </Stack>
      </Card>
    </Stack>
  );
};
