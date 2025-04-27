import { Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  return (
    <div className="h-dvh w-dvw flex flex-col bg-gray-50">
      <nav className="p-4 shadow bg-white flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link to="/">Kodedroid CV</Link>
        </div>
        <div className="space-x-4">
          <Link to="/auth/signin" className="text-blue-600 hover:underline">
            Sign In
          </Link>
          <Link to="/auth/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </div>

      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </div>
  );
}

export default App;
