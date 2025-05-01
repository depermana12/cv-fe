import { Text } from "@mantine/core";
import { Outlet } from "@tanstack/react-router";

export const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-100 p-4">{/* profile section */}</aside>
      <main className="flex-1 p-4">
        <Text>THIS IS DASHBOARD LAYOUT</Text>
        <Outlet />
      </main>
    </div>
  );
};
