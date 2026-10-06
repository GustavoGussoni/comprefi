import { Loader2 } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { apiService, type AuthUser } from "@/services/api";
import AdminLogin from "@/pages/AdminLogin";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    apiService.logout();
    setUser(null);
  }, []);

  const checkAuthentication = useCallback(async () => {
    const token = window.localStorage.getItem("admin_token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      apiService.setAuthToken(token);
      const currentUser = await apiService.me();
      window.localStorage.setItem("admin_user", JSON.stringify(currentUser));
      setUser(currentUser);
    } catch {
      clearSession();
    } finally {
      setIsLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    void checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    const handleAuthExpired = () => clearSession();
    window.addEventListener("auth:expired", handleAuthExpired);
    return () => window.removeEventListener("auth:expired", handleAuthExpired);
  }, [clearSession]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#090909] text-white">
        <div className="flex items-center gap-3 text-sm text-zinc-400">
          <Loader2 size={20} className="animate-spin text-[#ff6700]" />
          Verificando acesso...
        </div>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onLoginSuccess={setUser} />;
  }

  return (
    <AdminAuthProvider value={{ user, logout: clearSession }}>
      {children}
    </AdminAuthProvider>
  );
};

export default ProtectedRoute;
