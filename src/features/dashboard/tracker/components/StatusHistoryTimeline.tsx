import { Timeline, Text, Stack, Card, Skeleton } from "@mantine/core";
import {
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
      <>
        <Stack justify="center" align="center" mb="sm">
          <IconMapRoute size={40} color="#228be6" />
        </Stack>
        <Stack gap={0} align="center" mb="sm">
          <Skeleton height={20} width="60%" mb={4} />
          <Skeleton height={14} width="40%" />
        </Stack>
        <Card shadow="md" p="lg" radius="md" withBorder>
          <Timeline active={0} bulletSize={24} lineWidth={2} color="#228be6">
            {[1, 2].map((index) => (
              <Timeline.Item
                key={index}
                bullet={<Skeleton circle height={14} width={14} />}
                title={<Skeleton height={16} width="30%" />}
              >
                <Skeleton height={12} width="80%" mb={4} />
                <Skeleton height={10} width="40%" />
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      </>
    );
  }

  if (error) {
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
          <Stack align="center" py="xl" gap="md">
            <Stack gap={4} align="center">
              <Text c="red">Unable to Load History</Text>
              <Text size="sm" c="dimmed" ta="center">
                Please try again later.
              </Text>
            </Stack>
          </Stack>
        </Card>
      </>
    );
  }

  const timelineData = data ? data : [];

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
