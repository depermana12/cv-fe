import { Badge, Group, Select, Text } from "@mantine/core";
import { useCvs } from "../hooks/useCvs";
import { useCvStore } from "../store/cvStore";
import { IconFileText } from "@tabler/icons-react";

export const CvSelector = () => {
  const { data: cvs } = useCvs();
  const { activeCvId, setActiveCvId } = useCvStore();

  if (!cvs || cvs.length <= 1) return null;

  const cvOptions = cvs.map((cv) => ({
    value: cv.id.toString(),
    label: cv.title,
  }));

  const activeCv = cvs.find((cv) => cv.id === activeCvId);

  return (
    <Group gap="xs">
      <IconFileText size={16} />
      <Text size="sm" fw={500}>
        Active CV:
      </Text>
      <Select
        data={cvOptions}
        value={activeCvId?.toString() || null}
        onChange={(value) => {
          if (value) setActiveCvId(Number(value));
        }}
        placeholder="Select CV"
        searchable
        clearable={false}
        size="sm"
        w={200}
      />
      {activeCv && (
        <Badge variant="light" size="xs">
          {activeCv.title}
        </Badge>
      )}
    </Group>
  );
};
