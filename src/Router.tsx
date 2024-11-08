import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootHome from "./components/root/RootHome";
import RootAdminHome from "./components/root/RootAdminHome.tsx";
import Blog from "./components/Blog.tsx";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import Logout from "./components/Logout.tsx";
import Dashboard from "./components/Dashboard.tsx";
import ApiKeys from "./components/ApiKeys.tsx";
import ErrorComponent from "./components/ErrorComponent.tsx";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/logout",
      element: <Logout />,
    },
    {
      path: "/",
      element: <RootHome />,
      children: [
        {
          path: "/blog",
          element: <Blog />,
        },
        {
          path: "/api-keys",
          element: <ApiKeys />,
          errorElement: <ErrorComponent />,
        },
      ],
    },
    {
      path: "/admin",
      element: <RootAdminHome />,
      children: [{ path: "", element: <Dashboard /> }],
    },
  ]);
  return <RouterProvider router={router} />;
}
