import {
  AlertTriangle,
  ArrowRight,
  ClipboardCheck,
  FileText,
  Package,
  RefreshCw,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiError, apiService, type SimulationStats } from "@/services/api";

interface CatalogStats {
  totalGroups: number;
  activeGroups: number;
  totalVariants: number;
  activeVariants: number;
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  alert = false,
}: {
  label: string;
  value: number;
  detail: string;
  icon: typeof FileText;
  alert?: boolean;
}) {
  return (
    <article className="rounded-xl border border-white/10 bg-[#121212] p-5">
      <div className="mb-5 flex items-start justify-between gap-4">
        <p className="text-sm text-zinc-400">{label}</p>
        <span
          className={`rounded-lg p-2 ${alert ? "bg-red-500/10 text-red-400" : "bg-white/5 text-zinc-300"}`}
        >
          <Icon size={17} />
        </span>
      </div>
      <p className="text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className={`mt-2 text-xs ${alert ? "text-red-300" : "text-zinc-500"}`}>
        {detail}
      </p>
    </article>
  );
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState<SimulationStats | null>(null);
  const [catalog, setCatalog] = useState<CatalogStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const [simulationStats, catalogStats] = await Promise.all([
        apiService.getSimulationStats(),
        apiService.request<CatalogStats>("/catalog/admin/stats"),
      ]);
      setStats(simulationStats);
      setCatalog(catalogStats);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "Não foi possível carregar os indicadores.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const maxVolume = useMemo(
    () =>
      Math.max(
        1,
        ...(stats?.simulacoesECapturas.map((item) => item.simulacoes) || [1]),
      ),
    [stats],
  );

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center text-sm text-zinc-500">
        <RefreshCw className="mr-2 animate-spin text-[#ff6700]" size={18} />
        Carregando indicadores...
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
        <p className="font-medium text-red-200">{error || "Indicadores indisponíveis."}</p>
        <button
          type="button"
          onClick={() => void load()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-white hover:bg-white/5"
        >
          <RefreshCw size={16} /> Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff7a1a]">
            Operação
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white">Visão geral</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Acompanhe simulações, formulários e a entrega segura ao DataCrazy.
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/admin/simulacoes")}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white"
        >
          Ver simulações <ArrowRight size={16} />
        </button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Simulações"
          value={stats.total}
          detail={`${stats.ultimaSemana} nos últimos 7 dias`}
          icon={FileText}
        />
        <MetricCard
          label="Formulários capturados"
          value={stats.concluidos}
          detail={`${stats.pendentes} ainda incompletos`}
          icon={ClipboardCheck}
        />
        <MetricCard
          label="Cotações manuais"
          value={stats.precisamCotacao}
          detail="Aguardando análise da equipe"
          icon={AlertTriangle}
        />
        <MetricCard
          label="Falhas no DataCrazy"
          value={stats.falhasCrm}
          detail={`${stats.enviadosCrm} enviados com sucesso`}
          icon={RefreshCw}
          alert={stats.falhasCrm > 0}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.75fr)]">
        <article className="rounded-xl border border-white/10 bg-[#121212] p-5 sm:p-6">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-semibold text-white">Simulações e capturas</h2>
              <p className="mt-1 text-xs text-zinc-500">Últimos 7 dias</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-400">
              <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-[#ff6700]" /> Simulações</span>
              <span className="flex items-center gap-2"><i className="h-2 w-2 rounded-full bg-zinc-500" /> Capturas</span>
            </div>
          </div>

          <div className="flex h-56 items-end gap-3 border-b border-white/10 pb-2">
            {stats.simulacoesECapturas.map((item) => (
              <div key={item.date} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                <div className="flex h-44 w-full items-end justify-center gap-1.5">
                  <div
                    title={`${item.simulacoes} simulações`}
                    className="w-3 max-w-[14px] rounded-t bg-[#ff6700]"
                    style={{ height: `${Math.max(6, (item.simulacoes / maxVolume) * 100)}%` }}
                  />
                  <div
                    title={`${item.formularios} formulários`}
                    className="w-3 max-w-[14px] rounded-t bg-zinc-600"
                    style={{ height: `${Math.max(4, (item.formularios / maxVolume) * 100)}%` }}
                  />
                </div>
                <span className="truncate text-[10px] text-zinc-600">
                  {new Date(`${item.date}T12:00:00`).toLocaleDateString("pt-BR", {
                    weekday: "short",
                  })}
                </span>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-xl border border-white/10 bg-[#121212] p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-lg bg-white/5 p-2 text-zinc-300"><Package size={18} /></span>
            <div>
              <h2 className="font-semibold text-white">Catálogo</h2>
              <p className="text-xs text-zinc-500">Resumo operacional</p>
            </div>
          </div>
          <dl className="divide-y divide-white/10">
            <div className="flex items-center justify-between py-4">
              <dt className="text-sm text-zinc-400">Produtos ativos</dt>
              <dd className="font-semibold text-white">{catalog?.activeGroups ?? 0}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-sm text-zinc-400">Total de produtos</dt>
              <dd className="font-semibold text-white">{catalog?.totalGroups ?? 0}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-sm text-zinc-400">Variantes ativas</dt>
              <dd className="font-semibold text-white">{catalog?.activeVariants ?? 0}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-sm text-zinc-400">Total de variantes</dt>
              <dd className="font-semibold text-white">{catalog?.totalVariants ?? 0}</dd>
            </div>
          </dl>
          <button
            type="button"
            onClick={() => navigate("/admin/catalogo")}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5"
          >
            Abrir catálogo <ArrowRight size={15} />
          </button>
        </article>
      </section>
    </div>
  );
}
