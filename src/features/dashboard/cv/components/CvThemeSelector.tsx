import {
  Stack,
  Group,
  NumberInput,
  Select,
  Title,
  Divider,
  Switch,
  ActionIcon,
  Slider,
  ColorSwatch,
  SegmentedControl,
} from "@mantine/core";
import { IconAlignJustified, IconAlignCenter } from "@tabler/icons-react";
import {
  useCvStyleStore,
  THEME_PRESETS,
} from "@features/dashboard/cv/store/cvStyleStore";

export const CvThemeSelector = () => {
  const {
    // Typography
    fontFamily,
    fontSize,
    lineHeight,
    headerColor,

    // Layout
    contactAlignment,
    margin,
    sectionDivider,

    // Theme
    theme,

    // Typography actions
    setFontFamily,
    setFontSize,
    setLineHeight,
    setHeaderColor,

    // Layout actions
    setContactAlignment,
    setMargin,
    setSectionDivider,

    // Theme actions
    setTheme,
  } = useCvStyleStore();

  const fontOptions = [
    { value: "Poppins, sans-serif", label: "Poppins" },
    { value: "Helvetica, Arial, sans-serif", label: "Helvetica" },
    {
      value: "Inter, -apple-system, BlinkMacSystemFont, sans-serif",
      label: "Inter",
    },
    { value: "Roboto, sans-serif", label: "Roboto" },
  ];

  const accentColors = [
    { name: "Black", color: "#000000" },
    { name: "Brown", color: "#8B4513" },
    { name: "Navy", color: "#1e40af" },
    { name: "Green", color: "#059669" },
  ];

  return (
    <Stack gap="sm">
      {/* Theme Presets */}
      <Title order={3} size="h4">
        Theme Presets
      </Title>
      <Group>
        <SegmentedControl
          value={theme}
          onChange={setTheme}
          color="blue"
          data={Object.keys(THEME_PRESETS).map((themeName) => ({
            label: themeName,
            value: themeName,
          }))}
        />
      </Group>
      <Divider my="sm" />
      {/* Typography Section */}
      <Title order={3} size="h4">
        Typography
      </Title>

      <Select
        label="Font Family"
        value={fontFamily}
        onChange={(value) => setFontFamily(value || fontOptions[0].value)}
        data={fontOptions}
        maw={300}
      />
      <NumberInput
        label="Font Size"
        value={fontSize}
        onChange={(value) => setFontSize(Number(value))}
        min={10}
        max={20}
        suffix="px"
        step={1}
        maw={300}
      />

      {/* Line Height and Accent Color */}
      <NumberInput
        label="Line Height"
        value={lineHeight}
        onChange={(value) => setLineHeight(Number(value))}
        min={1}
        max={2.5}
        step={0.1}
        decimalScale={1}
        maw={300}
        mb="lg"
      />

      <Title order={4} size="h5">
        Accent Color
      </Title>
      <Group gap="xs">
        {accentColors.map((color) => (
          <ColorSwatch
            key={color.color}
            color={color.color}
            size={30}
            style={{
              cursor: "pointer",
              border:
                headerColor === color.color
                  ? "3px solid #228be6"
                  : "2px solid transparent",
            }}
            onClick={() => setHeaderColor(color.color)}
          />
        ))}
      </Group>
      <Divider my="sm" />
      {/* Layout Section */}
      <Title order={3} size="h4">
        Layout
      </Title>
      {/* Contact Alignment */}
      <Title order={4} size="h5">
        Alignment
      </Title>
      <Group gap="xs" mb="lg">
        <ActionIcon
          variant={contactAlignment === "left" ? "filled" : "outline"}
          size="lg"
          onClick={() => setContactAlignment("left")}
        >
          <IconAlignJustified size={16} />
        </ActionIcon>
        <ActionIcon
          variant={contactAlignment === "center" ? "filled" : "outline"}
          size="lg"
          onClick={() => setContactAlignment("center")}
        >
          <IconAlignCenter size={16} />
        </ActionIcon>
      </Group>

      {/* Margin and Section Divider */}
      <Title order={4} size="h5">
        Page Margin
      </Title>
      <Slider
        value={margin}
        onChange={setMargin}
        mb="lg"
        min={0.25}
        max={1}
        step={0.05}
        marks={[
          { value: 0.25, label: '0.25"' },
          { value: 0.5, label: '0.5"' },
          { value: 0.75, label: '0.75"' },
          { value: 1, label: '1"' },
        ]}
        label={(value) => `${value}"`}
      />
      <Title order={4} size="h5">
        Section Dividers
      </Title>
      <Switch
        label="Title Dividers"
        checked={sectionDivider}
        onChange={(event) => setSectionDivider(event.currentTarget.checked)}
      />
    </Stack>
  );
};
