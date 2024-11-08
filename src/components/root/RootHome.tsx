import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../useAuth.tsx";
import "../../styles/Root.css";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

export default function RootHome() {
  const { jwt } = useAuth();
  return jwt ? (
    <>
      <NavBar />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  ) : (
    <>
      <Navigate to="/login" />
    </>
  );
}
