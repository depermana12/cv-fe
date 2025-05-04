import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="space-x-4">
      <Link to="/dashboard" className="text-blue-600 hover:underline">
        Dashboard
      </Link>
      <Link to="/dashboard/cv/view" className="text-blue-600 hover:underline">
        View test
      </Link>
    </div>
  );
}
