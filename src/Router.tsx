import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./components/useAuth.tsx";
import { useEffect } from "react";
import useApiKeys from "./components/useApiKeys.tsx";
import RootHome from "./components/root/RootHome";
import RootAdminHome from "./components/root/RootAdminHome.tsx";
import Blog from "./components/Blog.tsx";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx";
import Logout from "./components/Logout.tsx";
import Dashboard from "./components/Admin/Dashboard.tsx";
import ApiKeys from "./components/ApiKeys.tsx";
import ErrorComponent from "./components/ErrorComponent.tsx";
import ErrorComponentAuthorized from "./components/Error/ErrorComponentAuthorized.tsx";
import Posts from "./components/Admin/Posts.tsx";
import CreatePost from "./components/CreatePost.tsx";
import Users from "./components/Admin/Users.tsx";
import Comments from "./components/Admin/Comments.tsx";
import ApiKeysAdmin from "./components/Admin/ApiKeysAdmin.tsx";

import {
  usersLoader,
  commentsLoader,
  postsLoader,
  apiKeysLoader,
  postsWithCommentsLoader,
} from "./loaders/loaders.tsx";

function RoleProtectedRoute({
  allowedRole,
  userRole,
  children,
}: {
  allowedRole: string;
  userRole: string | null;
  children: object;
}) {
  if (userRole !== allowedRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <>{children}</>;
}

export default function Router() {
  const { jwt, role } = useAuth();
  const { apiKeys, getApiKeys } = useApiKeys();

  useEffect(() => {
    (async () => {
      await getApiKeys();
    })();
  }, [getApiKeys, apiKeys]);

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
          index: true,
          element: <Blog />,
          loader: () => postsWithCommentsLoader(jwt, apiKeys),
        },
        {
          path: "/blog",
          element: <Blog />,
          loader: () => postsWithCommentsLoader(jwt, apiKeys),
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
      element: (
        <RoleProtectedRoute allowedRole="ADMIN" userRole={role}>
          <RootAdminHome />
        </RoleProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        {
          path: "/admin/posts",
          element: <Posts />,
          loader: () => postsLoader(jwt, apiKeys),
        },
        {
          path: "/admin/posts/new",
          element: <CreatePost jwt={jwt} apiKeys={apiKeys} />,
        },
        {
          path: "/admin/comments",
          element: <Comments />,
          loader: () => commentsLoader(jwt, apiKeys),
        },
        {
          path: "/admin/users",
          element: <Users />,
          loader: () => usersLoader(jwt),
        },
        {
          path: "/admin/keys",
          element: <ApiKeysAdmin />,
          loader: () => apiKeysLoader(jwt),
        },
      ],
    },
    {
      path: "/unauthorized",
      element: <ErrorComponentAuthorized message="Unauthorized access" />,
    },
  ]);
  return <RouterProvider router={router} />;
}
