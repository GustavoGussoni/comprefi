import React, { useState, useEffect } from "react";
import { apiService } from "../services/api";
import AdminLogin from "../pages/AdminLogin";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkAuthentication();
  }, []);

  // Listener para token expirado durante o uso
  useEffect(() => {
    const handleAuthExpired = () => {
      setIsAuthenticated(false);
      setUser(null);
    };
    window.addEventListener("auth:expired", handleAuthExpired);
    return () => window.removeEventListener("auth:expired", handleAuthExpired);
  }, []);

  const checkAuthentication = async () => {
    try {
      // Verificar se há token salvo
      const savedToken = localStorage.getItem("admin_token");
      const savedUser = localStorage.getItem("admin_user");

      if (!savedToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Configurar token no serviço
      apiService.setAuthToken(savedToken);

      // Tentar fazer uma requisição para validar o token
      // Usando endpoint de produtos como teste
      await apiService.getAllProducts();

      // Se chegou até aqui, o token é válido
      setIsAuthenticated(true);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Token inválido ou expirado:", error);

      // Limpar dados inválidos
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      apiService.clearAuthToken();

      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    checkAuthentication(); // Recarregar dados do usuário
  };

  const handleLogout = () => {
    // Limpar dados de autenticação
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    apiService.clearAuthToken();

    setIsAuthenticated(false);
    setUser(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner message="Verificando autenticação..." />
        </div>
      </div>
    );
  }

  // Se não autenticado, mostrar tela de login
  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Se autenticado, renderizar o conteúdo protegido com contexto de logout
  return (
    <div>
      {/* Header de Admin com Logout */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <span className="text-green-400 text-sm">🟢 Conectado</span>
              {user && (
                <span className="text-gray-400 text-sm">
                  Olá, {user.name || user.email}
                </span>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1 rounded transition-colors"
            >
              🚪 Sair
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo protegido */}
      {children}
    </div>
  );
};

export default ProtectedRoute;
