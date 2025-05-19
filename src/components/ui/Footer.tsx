import {
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import { ActionIcon, Box, Container, Group } from "@mantine/core";

export const Footer = () => {
  return (
    <Box
      mt="auto"
      style={{
        borderTop:
          "1px solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-5))",
      }}
    >
      <Container
        size="lg"
        display="flex"
        pt="xl"
        pb="xl"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          "@media (min-width: 36em)": {
            flexDirection: "row",
          },
        }}
      >
        myResume
        <Group gap={0} justify="flex-end" wrap="nowrap">
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://x.com/gundamtricks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="twitter"
          >
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://youtube.com/gundamtricks"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="youtube"
          >
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon
            size="lg"
            color="gray"
            variant="subtle"
            component="a"
            href="https://linkedin.com/in/deddiapermana"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="linkedin"
          >
            <IconBrandLinkedin size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </Box>
  );
};
