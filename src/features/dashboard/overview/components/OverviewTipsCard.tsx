import { Alert, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export const OverviewTipsCard = () => {
  return (
    <Alert
      icon={<IconInfoCircle size={16} />}
      title="Pro Tip"
      color="blue"
      variant="light"
    >
      <Text size="sm">
        Keep your CV updated regularly. Employers prefer candidates with current
        and detailed information.
      </Text>
    </Alert>
  );
};
