import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "../services/api";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await apiService.login(email, password);

      // Salvar token no localStorage
      localStorage.setItem("admin_token", result.access_token);
      localStorage.setItem("admin_user", JSON.stringify(result.user));

      // Configurar token no serviço
      apiService.setAuthToken(result.access_token);

      // Callback de sucesso
      onLoginSuccess();
    } catch (err: any) {
      console.error("Erro no login:", err);
      setError(
        err.message || "Erro ao fazer login. Verifique suas credenciais."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSite = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">CompreFi</div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin</h1>
          <p className="text-gray-400">
            Faça login para acessar o painel administrativo
          </p>
        </div>

        {/* Formulário de Login */}
        <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded">
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@comprefi.com"
                required
                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Entrando...
                </>
              ) : (
                <>🔑 Entrar no Admin</>
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={handleBackToSite}
              className="w-full text-gray-400 hover:text-white text-sm transition-colors"
            >
              ← Voltar para o site
            </button>
          </div>
        </div>

        {/* Informações de Teste */}
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-sm font-medium text-gray-300 mb-2">
            💡 Para Testes:
          </h3>
          <div className="text-xs text-gray-400 space-y-1">
            <p>• Use as credenciais cadastradas na API</p>
            <p>• Ou crie um usuário via endpoint /auth/register</p>
            <p>• Token JWT é salvo automaticamente</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
