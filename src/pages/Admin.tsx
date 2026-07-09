import React, { useState, useEffect, useCallback } from "react";
import CatalogTable from "../components/admin/CatalogTable";
import PriceCalculator from "../components/admin/PriceCalculator";
import ValorTrocaTable from "../components/admin/ValorTrocaTable";
import QuestionarioTable from "../components/admin/QuestionarioTable";
import {
  LayoutDashboard,
  Package,
  Calculator,
  ArrowLeftRight,
  ClipboardList,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// ============================================
// Types
// ============================================
interface CatalogStats {
  totalGroups: number;
  activeGroups: number;
  totalVariants: number;
  activeVariants: number;
  byCategory: { category: string; count: number }[];
}

const categoryLabels: Record<string, string> = {
  "iphones-novos": "iPhones Novos",
  "iphones-seminovos": "iPhones Seminovos",
  macbooks: "MacBooks",
  ipads: "iPads",
  "apple-watch": "Apple Watch",
  acessorios: "Acessórios",
};

// ============================================
// Tabs config
// ============================================
const tabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "catalogo", label: "Catálogo", icon: Package },
  { id: "calculator", label: "Calculadora", icon: Calculator },
  { id: "valores-troca", label: "Valores Troca", icon: ArrowLeftRight },
  { id: "questionarios", label: "Questionários", icon: ClipboardList },
] as const;

type TabId = (typeof tabs)[number]["id"];

// ============================================
// Component
// ============================================
const Admin: React.FC = () => {
  // Preservar aba ativa na URL hash
  const getInitialTab = (): TabId => {
    const hash = window.location.hash.replace("#", "");
    const validTabs = tabs.map((t) => t.id) as string[];
    if (hash && validTabs.includes(hash)) return hash as TabId;
    return "dashboard";
  };

  const [activeTab, setActiveTab] = useState<TabId>(getInitialTab);

  const handleSetActiveTab = useCallback((tab: TabId) => {
    setActiveTab(tab);
    window.location.hash = tab;
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const validTabs = tabs.map((t) => t.id) as string[];
      if (hash && validTabs.includes(hash)) setActiveTab(hash as TabId);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  const [dashboardStats, setDashboardStats] = useState<CatalogStats | null>(
    null,
  );
  const [dashboardLoading, setDashboardLoading] = useState(true);

  // Carregar stats do catálogo v2 para o dashboard
  React.useEffect(() => {
    const loadStats = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${API_URL}/catalog/admin/stats`, {
          headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });
        if (res.ok) {
          setDashboardStats(await res.json());
        }
      } catch {
        // silencioso — dashboard mostra "carregando"
      } finally {
        setDashboardLoading(false);
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin CompreFi</h1>
              <p className="text-gray-400 mt-1">Gerenciamento do catálogo</p>
            </div>
            {dashboardStats && (
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Produtos</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {dashboardStats.totalGroups}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Variantes</p>
                  <p className="text-2xl font-bold text-purple-400">
                    {dashboardStats.totalVariants}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSetActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-400"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {dashboardLoading ? (
              <div className="text-center py-12 text-gray-400">
                Carregando estatísticas...
              </div>
            ) : dashboardStats ? (
              <>
                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-6">
                    <p className="text-sm text-blue-300">Total de Produtos</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {dashboardStats.totalGroups}
                    </p>
                    <p className="text-xs text-blue-400 mt-1">
                      {dashboardStats.activeGroups} ativos
                    </p>
                  </div>
                  <div className="bg-purple-900/30 border border-purple-800 rounded-lg p-6">
                    <p className="text-sm text-purple-300">
                      Total de Variantes
                    </p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {dashboardStats.totalVariants}
                    </p>
                    <p className="text-xs text-purple-400 mt-1">
                      {dashboardStats.activeVariants} ativas
                    </p>
                  </div>
                  <div className="bg-green-900/30 border border-green-800 rounded-lg p-6">
                    <p className="text-sm text-green-300">Produtos Ativos</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {dashboardStats.activeGroups}
                    </p>
                    <p className="text-xs text-green-400 mt-1">
                      de {dashboardStats.totalGroups} total
                    </p>
                  </div>
                  <div className="bg-orange-900/30 border border-orange-800 rounded-lg p-6">
                    <p className="text-sm text-orange-300">Categorias</p>
                    <p className="text-3xl font-bold text-white mt-2">
                      {dashboardStats.byCategory.length}
                    </p>
                    <p className="text-xs text-orange-400 mt-1">com produtos</p>
                  </div>
                </div>

                {/* Por Categoria */}
                <div className="bg-gray-900 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                    <Package className="w-5 h-5 text-blue-400" />
                    <span>Produtos por Categoria</span>
                  </h3>
                  <div className="space-y-3">
                    {dashboardStats.byCategory.map((cat) => (
                      <div
                        key={cat.category}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded"
                      >
                        <span className="font-medium">
                          {categoryLabels[cat.category] || cat.category}
                        </span>
                        <span className="text-blue-400 font-medium">
                          {cat.count} produtos
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                Erro ao carregar estatísticas. Verifique se o backend está
                rodando.
              </div>
            )}
          </div>
        )}

        {/* Catálogo de Produtos */}
        {activeTab === "catalogo" && <CatalogTable />}

        {/* Calculadora de Preços */}
        {activeTab === "calculator" && (
          <div className="max-w-2xl mx-auto">
            <PriceCalculator />
          </div>
        )}

        {/* Valores de Troca */}
        {activeTab === "valores-troca" && <ValorTrocaTable />}

        {/* Questionários */}
        {activeTab === "questionarios" && <QuestionarioTable />}
      </div>
    </div>
  );
};

export default Admin;
