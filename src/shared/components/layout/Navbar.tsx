import { Title, ActionIcon, Box } from "@mantine/core";
import { useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";

export const Navbar = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Box
      component="header"
      h={64}
      w="100%"
      px="md"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid var(--mantine-color-default-border)",
      }}
      bg="var(--mantine-color-body)"
    >
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
    </Box>
  );
};
