import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "./components/useAuth.tsx";
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
import Posts, { loader as postsLoader } from "./components/Admin/Posts.tsx";
import CreatePost from "./components/CreatePost.tsx";
import Comments, {
  loader as commentsLoader,
} from "./components/Admin/Comments.tsx";
import { useEffect } from "react";

export default function Router() {
  const { jwt } = useAuth();
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
          element: <Comments jwt={jwt} apiKeys={apiKeys} />,
          loader: () => commentsLoader(jwt, apiKeys),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
