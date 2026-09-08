import { ArrowLeft, LockKeyhole, Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, apiService, type AuthUser } from "@/services/api";

interface AdminLoginProps {
  onLoginSuccess: (user: AuthUser) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("Preencha e-mail e senha para continuar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      apiService.logout();
      const session = await apiService.login(email.trim(), password);
      onLoginSuccess(session.user);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Não foi possível entrar. Verifique seus dados e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      <header className="border-b border-white/10 px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Voltar ao site
        </button>
      </header>

      <main className="flex min-h-[calc(100vh-65px)] items-center justify-center px-5 py-12">
        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-7 w-7 border-4 border-[#ff6700]" aria-hidden="true" />
              <span className="text-xl font-semibold tracking-tight">CompreFi</span>
            </div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#ff7a1a]">
              Acesso interno
            </p>
            <h1 className="text-3xl font-semibold tracking-tight">Painel administrativo</h1>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Entre com sua conta para gerenciar simulações, catálogo e ferramentas.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#111111] p-6 shadow-2xl shadow-black/30 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                >
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="admin-email" className="mb-2 block text-sm font-medium text-zinc-200">
                  E-mail
                </label>
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#191919] px-4 py-3 text-white outline-none transition focus:border-[#ff6700] focus:ring-2 focus:ring-[#ff6700]/20"
                />
              </div>

              <div>
                <label htmlFor="admin-password" className="mb-2 block text-sm font-medium text-zinc-200">
                  Senha
                </label>
                <input
                  id="admin-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Sua senha"
                  required
                  className="w-full rounded-lg border border-white/10 bg-[#191919] px-4 py-3 text-white outline-none transition focus:border-[#ff6700] focus:ring-2 focus:ring-[#ff6700]/20"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6700] px-4 py-3 font-semibold text-black transition hover:bg-[#ff7a1a] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verificando acesso...
                  </>
                ) : (
                  <>
                    <LockKeyhole size={18} />
                    Entrar
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-zinc-600">
            Acesso restrito à equipe CompreFi.
          </p>
        </div>
      </main>
    </div>
  );
};

export default AdminLogin;
