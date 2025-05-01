import { Tabs, Group, Button } from "@mantine/core";
import { IconUser, IconSchool, IconBriefcase } from "@tabler/icons-react";
import { useState } from "react";
import PersonalForm from "../../cv/components/PersonalForm";

export const CVBuilderPage = () => {
  console.log("CVBuilder rendered");
  const [activeTab, setActiveTab] = useState<string | null>("personal");

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Tab value="personal" leftSection={<IconUser size={14} />}>
            Personal
          </Tabs.Tab>
          <Tabs.Tab value="education" leftSection={<IconSchool size={14} />}>
            Education
          </Tabs.Tab>
          <Tabs.Tab
            value="Experience"
            leftSection={<IconBriefcase size={14} />}
          >
            Experience
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel pt="xs" value="personal">
          <PersonalForm />
        </Tabs.Panel>

        <Tabs.Panel pt="xs" value="education">
          coming soon...
        </Tabs.Panel>

        <Tabs.Panel pt="xs" value="experience">
          coming soon...
        </Tabs.Panel>
      </Tabs>

      <Group justify="flex-end" gap="sm">
        <Button variant="default">Save Draft</Button>
        <Button>Publish CV</Button>
      </Group>
    </div>
  );
};
