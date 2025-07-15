import { Timeline, Text, Stack, Loader, Alert, Card } from "@mantine/core";
import {
  IconClock,
  IconAlertCircle,
  IconFileCv,
  IconCalendarUser,
  IconHeartHandshake,
  IconGhost2,
  IconFileSad,
  IconFileSmile,
  IconMapRoute,
} from "@tabler/icons-react";
import { useJobApplicationStatus } from "../hooks/useJobApplicationStatus";

const getStatusLabel = (status: string) => {
  switch (status) {
    case "applied":
      return "Applied";
    case "interview":
      return "Interview";
    case "offer":
      return "Offer";
    case "accepted":
      return "Accepted";
    case "rejected":
      return "Rejected";
    case "ghosted":
      return "Ghosted";
    default:
      return status;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "applied":
      return <IconFileCv size={14} />;
    case "interview":
      return <IconCalendarUser size={14} />;
    case "offer":
      return <IconHeartHandshake size={14} />;
    case "accepted":
      return <IconFileSmile size={14} />;
    case "rejected":
      return <IconFileSad size={14} />;
    case "ghosted":
      return <IconGhost2 size={14} />;
    default:
      return <IconFileCv size={14} />;
  }
};

type StatusHistoryTimelineProps = {
  applicationId: number;
  jobTitle?: string;
  companyName?: string;
};

export const StatusHistoryTimeline = (props: StatusHistoryTimelineProps) => {
  const { applicationId, jobTitle, companyName } = props;
  const { data, isLoading, error } = useJobApplicationStatus(applicationId);

  if (isLoading) {
    return (
      <Stack align="center" py="xl">
        <Loader size="sm" />
        <Text size="sm" c="dimmed">
          Loading status history...
        </Text>
      </Stack>
    );
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        Failed to load status history. Please try again.
      </Alert>
    );
  }

  const timelineData = data ? data : [];

  if (timelineData.length === 0) {
    return (
      <Stack align="center" py="xl">
        <IconClock size={32} color="gray" />
        <Text size="sm" c="dimmed">
          {jobTitle
            ? `No history for "${jobTitle}" yet`
            : "No status history available"}
        </Text>
        <Text size="xs" ta="center">
          When you update the status of this application, your journey will be
          tracked here!
        </Text>
      </Stack>
    );
  }

  return (
    <>
      <Stack justify="center" align="center" mb="sm">
        <IconMapRoute size={40} color="#228be6" />
      </Stack>
      {(jobTitle || companyName) && (
        <Stack gap={0} align="center" mb="sm">
          {jobTitle && (
            <Text fw={700} size="md">
              {jobTitle}
            </Text>
          )}
          {companyName && (
            <Text size="sm" c="dimmed">
              {companyName}
            </Text>
          )}
        </Stack>
      )}
      <Card shadow="md" p="lg" radius="md" withBorder>
        <Timeline
          active={timelineData.length - 1}
          bulletSize={24}
          lineWidth={2}
          color="#228be6"
        >
          {timelineData.map((item) => (
            <Timeline.Item
              key={item.id}
              bullet={getStatusIcon(item.status)}
              title={getStatusLabel(item.status)}
            >
              <Text size="sm" c="dimmed">
                {item.status === "applied" &&
                  "Cv submitted! First step on your journey."}
                {item.status === "interview" &&
                  "You got noticed! Time to shine in the interview."}
                {item.status === "offer" &&
                  "Amazing! They want you on their team."}
                {item.status === "accepted" &&
                  "Congratulations on your new role!"}
                {item.status === "rejected" &&
                  "It's their loss! Better opportunities await."}
                {item.status === "ghosted" &&
                  "No response is still feedback. Time to move on!"}
              </Text>
              <Text size="xs">
                {new Date(item.changedAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>
    </>
  );
};
