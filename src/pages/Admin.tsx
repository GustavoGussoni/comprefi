import {
  ArrowLeftRight,
  Calculator,
  ChevronDown,
  CreditCard,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  UserRoundSearch,
  X,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminDashboard from "@/components/admin/AdminDashboard";
import CatalogTable from "@/components/admin/CatalogTable";
import PriceCalculator from "@/components/admin/PriceCalculator";
import SimulationsCrm from "@/components/admin/SimulationsCrm";
import SimuladorTaxas from "@/components/admin/SimuladorTaxas";
import ValorTrocaTable from "@/components/admin/ValorTrocaTable";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import type { UserRole } from "@/services/api";

interface NavigationItem {
  path: string;
  label: string;
  icon: typeof LayoutDashboard;
  roles: UserRole[];
  section?: string;
}

const navigation: NavigationItem[] = [
  { path: "/admin", label: "Visão geral", icon: LayoutDashboard, roles: ["ADMIN", "SALES"] },
  { path: "/admin/simulacoes", label: "Simulações e CRM", icon: UserRoundSearch, roles: ["ADMIN", "SALES"] },
  { path: "/admin/catalogo", label: "Catálogo", icon: Package, roles: ["ADMIN", "SALES"] },
  { path: "/admin/valores-troca", label: "Valores de troca", icon: ArrowLeftRight, roles: ["ADMIN"] },
  { path: "/admin/calculadora", label: "Calculadora de preços", icon: Calculator, roles: ["ADMIN", "SALES"], section: "Ferramentas" },
  { path: "/admin/simulador-taxas", label: "Simulador de taxas", icon: CreditCard, roles: ["ADMIN", "SALES"] },
];

function AccessDenied() {
  return (
    <div className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff7a1a]">Acesso restrito</p>
      <h1 className="mt-2 text-2xl font-semibold text-white">Esta área é exclusiva do administrador.</h1>
      <p className="mt-3 text-sm text-zinc-400">Sua conta permanece ativa para consultas e ferramentas comerciais.</p>
    </div>
  );
}

const Admin: React.FC = () => {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activePath = location.pathname.replace(/\/$/, "") || "/admin";
  const activeItem = navigation.find((item) => item.path === activePath) || navigation[0];
  const canAccess = activeItem.roles.includes(user.role);
  const visibleNavigation = navigation.filter((item) => item.roles.includes(user.role));

  const navigateTo = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    if (!canAccess) return <AccessDenied />;

    switch (activePath) {
      case "/admin/simulacoes":
        return <SimulationsCrm />;
      case "/admin/catalogo":
        return <CatalogTable readOnly={user.role === "SALES"} />;
      case "/admin/valores-troca":
        return <ValorTrocaTable />;
      case "/admin/calculadora":
        return <div className="mx-auto max-w-3xl"><PriceCalculator /></div>;
      case "/admin/simulador-taxas":
        return <SimuladorTaxas />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white">
      {mobileMenuOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-30 bg-black/70 lg:hidden"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-white/10 bg-[#0d0d0d] transition-transform duration-200 lg:translate-x-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-[70px] items-center justify-between border-b border-white/10 px-6">
          <button type="button" onClick={() => navigateTo("/admin")} className="flex items-center gap-3">
            <span className="h-6 w-6 border-4 border-[#ff6700]" aria-hidden="true" />
            <span className="text-lg font-semibold tracking-tight">CompreFi</span>
          </button>
          <button type="button" onClick={() => setMobileMenuOpen(false)} className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white lg:hidden"><X size={18} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-5">
          {visibleNavigation.map((item, index) => {
            const Icon = item.icon;
            const active = activePath === item.path;
            const previousSection = visibleNavigation[index - 1]?.section;
            return (
              <div key={item.path}>
                {item.section && item.section !== previousSection && (
                  <p className="mb-2 mt-6 px-3 text-xs font-medium text-zinc-600">{item.section}</p>
                )}
                <button
                  type="button"
                  onClick={() => navigateTo(item.path)}
                  className={`relative mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${active ? "bg-[#ff6700]/12 text-[#ff7a1a]" : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"}`}
                >
                  {active && <span className="absolute -left-3 h-7 w-1 rounded-r bg-[#ff6700]" />}
                  <Icon size={19} />
                  <span>{item.label}</span>
                </button>
              </div>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold">
              {user.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user.name}</p>
              <p className="text-xs text-zinc-600">{user.role === "ADMIN" ? "Administrador" : "Vendedor"}</p>
            </div>
            <button type="button" onClick={logout} title="Sair" className="rounded-lg p-2 text-zinc-600 hover:bg-white/5 hover:text-white"><LogOut size={16} /></button>
          </div>
        </div>
      </aside>

      <div className="lg:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[70px] items-center justify-between border-b border-white/10 bg-[#090909]/95 px-4 backdrop-blur sm:px-7">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setMobileMenuOpen(true)} className="rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white lg:hidden"><Menu size={20} /></button>
            <div className="hidden items-center gap-2 text-sm sm:flex">
              <span className="text-zinc-600">Admin</span>
              <span className="text-zinc-700">/</span>
              <span className="text-zinc-300">{activeItem.label}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-lg border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white sm:inline-flex">Ver site <ExternalLink size={14} /></a>
            <div className="flex items-center gap-2 rounded-lg border border-white/10 px-2 py-1.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-[10px] font-semibold">{user.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</div>
              <ChevronDown size={14} className="text-zinc-600" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 sm:py-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Admin;
