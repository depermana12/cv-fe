import {
  ActionIcon,
  MantineColorScheme,
  Menu,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoonStars, IconSun, IconSunHigh } from "@tabler/icons-react";

const ToggleTheme = () => {
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const handleThemeChange = (theme: MantineColorScheme) => {
    setColorScheme(theme);
  };

  const currentThemeIcon = {
    light: <IconSun size={18} />,
    dark: <IconMoonStars size={18} />,
  }[computedColorScheme];

  return (
    <Menu position="bottom-end" withArrow>
      <Menu.Target>
        <ActionIcon variant="outline" size="lg" title="Toggle theme color">
          {currentThemeIcon}
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label tt="uppercase" ta="center" fw={500}>
          Theme preference
        </Menu.Label>
        <Menu.Item
          leftSection={<IconSunHigh size={18} />}
          onClick={() => {
            handleThemeChange("light");
          }}
        >
          Light
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoonStars size={16} />}
          onClick={() => {
            handleThemeChange("dark");
          }}
        >
          Dark
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
export default ToggleTheme;
