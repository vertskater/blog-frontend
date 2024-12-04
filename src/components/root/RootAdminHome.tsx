import { Outlet, Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../useAuth";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

export default function RootAdminHome() {
  const { jwt } = useAuth();
  return jwt ? (
    <>
      <NavBar />
      <div className="container-admin">
        <nav className="sidemenu">
          <div className="menu-header">
            <h1>Admin Menu</h1>
          </div>
          <ul className="menu-list">
            <li>
              <NavLink to="/admin">Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/admin/posts">Posts</NavLink>
            </li>
            <li>
              <NavLink to="/admin/comments">Comments</NavLink>
            </li>
            <li>
              <NavLink to="/admin/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/admin/keys">Api-Keys</NavLink>
            </li>
          </ul>
        </nav>
        <main className="content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
