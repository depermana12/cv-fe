import { IconCheck } from "@tabler/icons-react";
import {
  Button,
  Container,
  Group,
  Image,
  List,
  Text,
  ThemeIcon,
  Title,
  rem,
} from "@mantine/core";
import image from "./image.svg";

export const HeroBullets = () => {
  return (
    <Container size="md" py={{ base: rem(40), md: rem(80) }}>
      <Group justify="space-between" wrap="nowrap" gap={50}>
        <div style={{ maxWidth: rem(480) }}>
          <Title
            c="dark.4"
            fz={{ base: 28, xs: 44 }}
            lh={1.2}
            fw={500}
            ff="Outfit, var(--mantine-font-family)"
          >
            Build Your <br />
            <Text span bg="blue.1" px={12} py={4} inherit>
              Professional
            </Text>{" "}
            CV Effortlessly
          </Title>

          <Text c="dimmed" mt="md">
            Create, customize, and manage multiple CV versions tailored for
            different job applications. Track your submissions and get hired
            faster with our powerful tools.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <IconCheck size={12} stroke={1.5} />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>AI-Powered Suggestions</b> – Get tailored content
              recommendations based on your target roles
            </List.Item>
            <List.Item>
              <b>Multi-Version Management</b> – Maintain different CV versions
              for various job applications
            </List.Item>
            <List.Item>
              <b>Application Tracker</b> – Monitor where you've applied and
              follow up effectively
            </List.Item>
          </List>

          <Group mt={30}>
            <Button radius="xl" size="md">
              Create Your CV
            </Button>
            <Button variant="default" radius="xl" size="md">
              Track Applications
            </Button>
          </Group>
        </div>

        <Image
          src={image}
          w={376}
          h={356}
          visibleFrom="md"
          alt="Professional CV illustration"
        />
      </Group>
    </Container>
  );
};
