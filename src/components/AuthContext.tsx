import { createContext } from "react";

export type AuthContextType = {
  jwt: string | null;
  role: string | null;
  login: (token: string, userRole: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
