import { NavLink } from "react-router-dom";
import { useAuth } from "../useAuth";
import "../../styles/NavBar.css";

export default function NavBar() {
  const { jwt, role } = useAuth();
  return (
    <nav className="main-nav">
      <div className="logo">
        <img src="/favicon.png" alt="Blog-Logo" />
      </div>
      <ul>
        <li>
          {jwt ? (
            <NavLink to={"/logout"}>Logout</NavLink>
          ) : (
            <NavLink to={"/login"}>Login</NavLink>
          )}
        </li>
        <li>
          <NavLink to={"/blog"}>Blog</NavLink>
        </li>
        <li>
          <NavLink to={"/api-keys"}>API-Keys</NavLink>
        </li>
        {role === "ADMIN" ? (
          <li>
            <NavLink to={"/admin"}>Admin-Dashboard</NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
