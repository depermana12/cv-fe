import { Title, ActionIcon } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export const Navbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <header className="h-16 w-full px-6 flex items-center justify-between border-b bg-white dark:bg-dark-700 dark:border-dark-400">
      <Title order={3}>Kodedroid CV</Title>
      <ActionIcon
        variant="default"
        size="lg"
        onClick={() => toggleColorScheme()}
      >
        {colorScheme === "dark" ? (
          <IconSun size="1.1rem" />
        ) : (
          <IconMoonStars size="1.1rem" />
        )}
      </ActionIcon>
    </header>
  );
};
