import { ReactNode, useState } from "react";
import { AuthContext } from "./AuthContext.tsx";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [jwt, setJwt] = useState<string | null>(localStorage.getItem("jwt"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (token: string, userRole: string) => {
    localStorage.setItem("jwt", token);
    localStorage.setItem("role", userRole);
    setJwt(token);
    setRole(userRole);
  };
  const logout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("role");
    setJwt(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ jwt, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
