import {
  Icon,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import {
  ActionIcon,
  Box,
  Container,
  Flex,
  Group,
  Text,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

type SocialLink = {
  icon: Icon;
  label: string;
  link: string;
};

const socialLinks: SocialLink[] = [
  {
    icon: IconBrandGithub,
    label: "GitHub",
    link: "https://github.com/depermana12",
  },
  {
    icon: IconBrandTwitter,
    label: "Twitter",
    link: "https://x.com/gundamtricks",
  },
  {
    icon: IconBrandYoutube,
    label: "YouTube",
    link: "https://youtube.com/gundamtricks",
  },
  {
    icon: IconBrandLinkedin,
    label: "LinkedIn",
    link: "https://linkedin.com/in/deddiapermana",
  },
];

export const Footer = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const isDark = colorScheme === "dark";

  return (
    <Box
      mt="auto"
      style={{
        borderTop: `1px solid ${
          isDark ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
      }}
    >
      <Container size="lg" py="md">
        <Flex
          justify="space-between"
          align="center"
          wrap="nowrap"
          direction={isMobile ? "column" : "row"}
          gap={isMobile ? "lg" : "sm"}
        >
          <Text
            size="sm"
            component="a"
            href="https://github.com/depermana12"
            target="_blank"
            c="dimmed"
          >
            &copy;&nbsp;{new Date().getFullYear()}&nbsp;myResume
          </Text>
          <Group gap="xs" justify={isMobile ? "center" : "flex-end"}>
            {socialLinks.map(({ icon: Icon, label, link }) => (
              <Tooltip label={label} key={label}>
                <ActionIcon
                  key={label}
                  size="lg"
                  variant="subtle"
                  component="a"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                >
                  <Icon size={20} stroke={1.5} />
                </ActionIcon>
              </Tooltip>
            ))}
          </Group>
        </Flex>
      </Container>
    </Box>
  );
};
