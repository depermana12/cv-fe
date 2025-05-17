import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Header } from "./components/ui/Header";
import { Box } from "@mantine/core";

function App() {
  return (
    <Box bg="gray.0" className="min-h-dvh min-w-dvw flex flex-col">
      <Header />
      <Box
        component="main"
        className="flex-1 flex items-center justify-center p-4"
      >
        <Outlet />
      </Box>

      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </Box>
  );
}

export default App;
