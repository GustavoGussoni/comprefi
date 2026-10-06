import { createContext, useContext } from "react";
import type { AuthUser } from "@/services/api";

interface AdminAuthContextValue {
  user: AuthUser;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export const AdminAuthProvider = AdminAuthContext.Provider;

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth deve ser usado dentro de uma rota protegida.");
  }
  return context;
}
