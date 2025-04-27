import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth")({
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow rounded">
        <h1 className="text-2xl font-bold text-center">
          Welcome to Kodedroid CV
        </h1>
        <Outlet />
      </div>
    </div>
  );
}
