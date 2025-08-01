import {
  Stack,
  Title,
  Text,
  Card,
  Group,
  Switch,
  Select,
  Button,
  Divider,
} from "@mantine/core";
import {
  IconPalette,
  IconDownload,
  IconBell,
  IconFileText,
  IconEye,
} from "@tabler/icons-react";
import { useState } from "react";
import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core";

export const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [defaultTemplate, setDefaultTemplate] = useState("modern");
  const [defaultPrivacy, setDefaultPrivacy] = useState("private");
  const [exportFormat, setExportFormat] = useState("pdf");
  const [compactMode, setCompactMode] = useState(false);

  // Theme management
  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  });
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const isDarkMode = computedColorScheme === "dark";

  const handleThemeToggle = (checked: boolean) => {
    setColorScheme(checked ? "dark" : "light");
  };

  return (
    <Stack gap="md">
      {/* Header */}
      <Title order={2} size="h3">
        App Settings
      </Title>

      {/* Appearance Settings */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="sm" mb="md">
          <IconPalette size={20} />
          <Title order={4}>Appearance</Title>
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Dark Mode
              </Text>
              <Text size="xs" c="dimmed">
                Toggle between light and dark themes
              </Text>
            </div>
            <Switch
              checked={isDarkMode}
              onChange={(event) =>
                handleThemeToggle(event.currentTarget.checked)
              }
              aria-label="Toggle dark mode"
            />
          </Group>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Compact Mode
              </Text>
              <Text size="xs" c="dimmed">
                Reduce spacing for more information density
              </Text>
            </div>
            <Switch
              checked={compactMode}
              onChange={(event) => setCompactMode(event.currentTarget.checked)}
              aria-label="Toggle compact mode"
            />
          </Group>
        </Stack>
      </Card>

      {/* CV Defaults */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="sm" mb="md">
          <IconFileText size={20} />
          <Title order={4}>CV Defaults</Title>
        </Group>

        <Stack gap="md">
          <div>
            <Text size="sm" fw={500} mb="xs">
              Default Template
            </Text>
            <Select
              placeholder="Choose default CV template"
              value={defaultTemplate}
              onChange={(value) => setDefaultTemplate(value || "modern")}
              data={[
                { value: "modern", label: "Modern" },
                { value: "classic", label: "Classic" },
                { value: "minimal", label: "Minimal" },
                { value: "creative", label: "Creative" },
              ]}
            />
          </div>

          <div>
            <Text size="sm" fw={500} mb="xs">
              Default Privacy
            </Text>
            <Select
              placeholder="Choose default privacy setting for new CVs"
              value={defaultPrivacy}
              onChange={(value) => setDefaultPrivacy(value || "private")}
              data={[
                { value: "private", label: "Private" },
                { value: "public", label: "Public" },
              ]}
            />
          </div>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Auto-save Changes
              </Text>
              <Text size="xs" c="dimmed">
                Automatically save CV changes as you type
              </Text>
            </div>
            <Switch
              checked={autoSave}
              onChange={(event) => setAutoSave(event.currentTarget.checked)}
            />
          </Group>
        </Stack>
      </Card>

      {/* Export Settings */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="sm" mb="md">
          <IconDownload size={20} />
          <Title order={4}>Export Preferences</Title>
        </Group>

        <Stack gap="md">
          <div>
            <Text size="sm" fw={500} mb="xs">
              Default Export Format
            </Text>
            <Select
              placeholder="Choose default export format"
              value={exportFormat}
              onChange={(value) => setExportFormat(value || "pdf")}
              data={[
                { value: "pdf", label: "PDF" },
                { value: "docx", label: "Word Document" },
                { value: "html", label: "HTML" },
              ]}
            />
          </div>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Include Watermark
              </Text>
              <Text size="xs" c="dimmed">
                Add app branding to exported CVs
              </Text>
            </div>
            <Switch defaultChecked />
          </Group>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Optimize for ATS
              </Text>
              <Text size="xs" c="dimmed">
                Export with ATS-friendly formatting
              </Text>
            </div>
            <Switch defaultChecked />
          </Group>
        </Stack>
      </Card>

      {/* Notifications */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="sm" mb="md">
          <IconBell size={20} />
          <Title order={4}>Notifications</Title>
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Email Notifications
              </Text>
              <Text size="xs" c="dimmed">
                Receive updates via email
              </Text>
            </div>
            <Switch
              checked={emailNotifications}
              onChange={(event) =>
                setEmailNotifications(event.currentTarget.checked)
              }
            />
          </Group>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Browser Notifications
              </Text>
              <Text size="xs" c="dimmed">
                Show notifications in your browser
              </Text>
            </div>
            <Switch
              checked={browserNotifications}
              onChange={(event) =>
                setBrowserNotifications(event.currentTarget.checked)
              }
            />
          </Group>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Weekly Progress Report
              </Text>
              <Text size="xs" c="dimmed">
                Get weekly summaries of your CV activity
              </Text>
            </div>
            <Switch />
          </Group>
        </Stack>
      </Card>

      {/* Privacy & Data */}
      <Card padding="lg" radius="md" withBorder>
        <Group gap="sm" mb="md">
          <IconEye size={20} />
          <Title order={4}>Privacy & Data</Title>
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Analytics Tracking
              </Text>
              <Text size="xs" c="dimmed">
                Help improve the app with anonymous usage data
              </Text>
            </div>
            <Switch defaultChecked />
          </Group>

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500}>
                Data Export
              </Text>
              <Text size="xs" c="dimmed">
                Download all your data
              </Text>
            </div>
            <Button variant="light" size="xs">
              Export Data
            </Button>
          </Group>

          <Divider />

          <Group justify="space-between">
            <div>
              <Text size="sm" fw={500} c="red">
                Delete Account
              </Text>
              <Text size="xs" c="dimmed">
                Permanently delete your account and all data
              </Text>
            </div>
            <Button variant="light" color="red" size="xs">
              Delete Account
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Save Button */}
      <Group justify="flex-end">
        <Button variant="light">Reset to Defaults</Button>
        <Button>Save Preferences</Button>
      </Group>
    </Stack>
  );
};
