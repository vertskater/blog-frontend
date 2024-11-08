import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../useAuth";
import NavBar from "./NavBar.tsx";
import Footer from "./Footer.tsx";

export default function RootAdminHome() {
  const { jwt } = useAuth();
  return jwt ? (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/login" />
  );
}
