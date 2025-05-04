import { createFileRoute } from "@tanstack/react-router";
import { EditForm } from "../../features/cv/components/EditForm";
import { queryClient } from "../../lib/queryClient";
import { profileQuery } from "../../features/cv/queries/profileQuery";
import { useGetProfile } from "../../features/cv/hooks/useGetProfile";

export const Route = createFileRoute("/(dashboard)/dashboard/cv/$id/edit")({
  loader: ({ params: { id } }) =>
    queryClient.ensureQueryData(profileQuery(Number(id))),
  component: Edit,
});

function Edit() {
  const { id } = Route.useParams();
  const { data } = useGetProfile(Number(id));

  return <EditForm initialValues={data} />;
}
