import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clipboard,
  Download,
  ExternalLink,
  Loader2,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  ApiError,
  apiService,
  type CrmDeliveryStatus,
  type PaginatedResponse,
  type TradeSimulation,
} from "@/services/api";

const crmLabels: Record<CrmDeliveryStatus, string> = {
  NOT_SENT: "Não enviado",
  PENDING: "Enviando",
  SENT: "Enviado",
  FAILED: "Falha no envio",
};

function formatCurrency(value: number | null | undefined) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value || 0);
}

function formatRelativeDate(value: string) {
  const elapsed = Date.now() - new Date(value).getTime();
  const minutes = Math.max(0, Math.floor(elapsed / 60000));
  if (minutes < 1) return "Agora";
  if (minutes < 60) return `Há ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Há ${hours} h`;
  const days = Math.floor(hours / 24);
  return days === 1 ? "Ontem" : `Há ${days} dias`;
}

function getOfferLabel(simulation: TradeSimulation) {
  if (simulation.precisaCotacao) return "Cotação manual";
  if (!simulation.concluido) return "Formulário incompleto";
  if (
    simulation.offerExpiresAt &&
    new Date(simulation.offerExpiresAt).getTime() <= Date.now()
  ) {
    return "Oferta expirada";
  }
  return "Oferta ativa";
}

function StatusBadge({ children, tone }: { children: string; tone: "green" | "red" | "orange" | "neutral" }) {
  const tones = {
    green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    red: "border-red-500/40 bg-red-500/10 text-red-300",
    orange: "border-orange-500/40 bg-orange-500/10 text-orange-300",
    neutral: "border-white/15 bg-white/5 text-zinc-300",
  };
  return <span className={`inline-flex rounded-md border px-2.5 py-1 text-xs ${tones[tone]}`}>{children}</span>;
}

export default function SimulationsCrm() {
  const { user } = useAdminAuth();
  const [result, setResult] = useState<PaginatedResponse<TradeSimulation> | null>(null);
  const [selected, setSelected] = useState<TradeSimulation | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [crmStatus, setCrmStatus] = useState<CrmDeliveryStatus | "">("");
  const [onlyErrors, setOnlyErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setMessage(null);
    try {
      const data = await apiService.getSimulations({
        page,
        limit: 25,
        search: search.trim() || undefined,
        crmStatus: onlyErrors ? "FAILED" : crmStatus || undefined,
      });
      setResult(data);
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : "Não foi possível carregar as simulações.");
    } finally {
      setLoading(false);
    }
  }, [crmStatus, onlyErrors, page, search]);

  useEffect(() => {
    const timeout = window.setTimeout(() => void load(), 250);
    return () => window.clearTimeout(timeout);
  }, [load]);

  const openDetails = async (id: string) => {
    setDrawerLoading(true);
    setMessage(null);
    try {
      setSelected(await apiService.getSimulation(id));
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : "Não foi possível abrir a simulação.");
    } finally {
      setDrawerLoading(false);
    }
  };

  const resend = async (id: string) => {
    setActionLoading(true);
    setMessage(null);
    try {
      const delivery = await apiService.resendSimulation(id);
      setMessage(delivery.crmSent ? "Dados reenviados ao DataCrazy." : "A simulação foi preservada, mas o DataCrazy ainda não confirmou o envio.");
      await load();
      if (selected?.id === id) setSelected(await apiService.getSimulation(id));
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : "Não foi possível reenviar agora.");
    } finally {
      setActionLoading(false);
    }
  };

  const resendFailures = async () => {
    setActionLoading(true);
    setMessage(null);
    try {
      const failures = await apiService.getSimulations({ page: 1, limit: 100, crmStatus: "FAILED" });
      if (failures.data.length === 0) {
        setMessage("Não há falhas pendentes para reenviar.");
        return;
      }
      const deliveries = await Promise.allSettled(failures.data.map((item) => apiService.resendSimulation(item.id)));
      const successful = deliveries.filter((item) => item.status === "fulfilled" && item.value.crmSent).length;
      setMessage(`${successful} de ${deliveries.length} envio(s) confirmado(s) pelo DataCrazy.`);
      await load();
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : "Não foi possível reenviar as falhas.");
    } finally {
      setActionLoading(false);
    }
  };

  const copyPayload = async (id: string) => {
    setActionLoading(true);
    try {
      const payload = await apiService.getSimulationPayload(id);
      await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
      setMessage("Payload copiado.");
    } catch (err) {
      setMessage(err instanceof ApiError ? err.message : "Não foi possível copiar o payload.");
    } finally {
      setActionLoading(false);
    }
  };

  const exportCurrentPage = () => {
    if (!result?.data.length) return;
    const rows = result.data.map((item) => ({
      simulacao: item.id,
      nome: item.nome || "",
      whatsapp: item.whatsapp || "",
      troca: `${item.modeloAtual} ${item.capacidadeAtual} -> ${item.produtoDesejadoNome || item.modeloDesejado}`,
      proposta: item.precisaCotacao ? "Cotação manual" : item.valorFinal,
      crm: crmLabels[item.crmStatus],
      criadoEm: item.createdAt,
    }));
    const headers = Object.keys(rows[0]);
    const csv = [headers.join(","), ...rows.map((row) => headers.map((key) => JSON.stringify(row[key as keyof typeof row])).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `simulacoes-comprefi-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ff7a1a]">Integração</p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white">Simulações e CRM</h1>
            <span className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-zinc-500">Dados reais</span>
          </div>
          <p className="mt-2 text-sm text-zinc-400">Acompanhe cálculos, formulários e o envio seguro ao DataCrazy.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={exportCurrentPage} className="inline-flex items-center gap-2 rounded-lg border border-white/15 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/5">
            <Download size={16} /> Exportar
          </button>
          <button type="button" disabled={actionLoading} onClick={() => void resendFailures()} className="inline-flex items-center gap-2 rounded-lg bg-[#ff6700] px-4 py-2.5 text-sm font-semibold text-black hover:bg-[#ff7a1a] disabled:opacity-50">
            {actionLoading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />} Reenviar falhas
          </button>
        </div>
      </header>

      {message && <div role="status" className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">{message}</div>}

      <section className="overflow-hidden rounded-xl border border-white/10 bg-[#111111]">
        <div className="grid gap-3 border-b border-white/10 p-4 lg:grid-cols-[minmax(240px,1fr)_180px_190px_auto]">
          <label className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#181818] px-3">
            <Search size={16} className="text-zinc-500" />
            <input value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Buscar por nome, telefone ou simulação" className="w-full bg-transparent py-2.5 text-sm text-white outline-none placeholder:text-zinc-600" />
          </label>
          <select value={crmStatus} onChange={(event) => { setCrmStatus(event.target.value as CrmDeliveryStatus | ""); setOnlyErrors(false); setPage(1); }} className="rounded-lg border border-white/10 bg-[#181818] px-3 py-2.5 text-sm text-zinc-300 outline-none">
            <option value="">Todos os envios</option>
            <option value="SENT">Enviados</option>
            <option value="FAILED">Falhas</option>
            <option value="NOT_SENT">Não enviados</option>
            <option value="PENDING">Enviando</option>
          </select>
          <select className="rounded-lg border border-white/10 bg-[#181818] px-3 py-2.5 text-sm text-zinc-300 outline-none" defaultValue="30">
            <option value="30">Últimos 30 dias</option>
          </select>
          <button type="button" onClick={() => { setOnlyErrors((value) => !value); setPage(1); }} className={`inline-flex items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-sm ${onlyErrors ? "border-red-500/40 bg-red-500/10 text-red-200" : "border-white/10 text-zinc-300 hover:bg-white/5"}`}>
            <AlertCircle size={16} /> Somente com erro
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="border-b border-white/10 text-xs font-medium text-zinc-500">
              <tr><th className="px-5 py-4">Simulação</th><th className="px-3 py-4">Cliente</th><th className="px-3 py-4">Troca</th><th className="px-3 py-4">Proposta</th><th className="px-3 py-4">Situação</th><th className="px-3 py-4">DataCrazy</th><th className="px-3 py-4">Atualizado</th><th className="px-5 py-4" /></tr>
            </thead>
            <tbody className="divide-y divide-white/[0.07]">
              {loading ? (
                <tr><td colSpan={8} className="px-5 py-16 text-center text-zinc-500"><Loader2 className="mx-auto mb-2 animate-spin text-[#ff6700]" /> Carregando simulações...</td></tr>
              ) : result?.data.length ? result.data.map((item) => {
                const offer = getOfferLabel(item);
                return (
                  <tr key={item.id} onClick={() => void openDetails(item.id)} className="cursor-pointer transition hover:bg-white/[0.035]">
                    <td className="px-5 py-4 font-medium text-white">#{item.id.slice(0, 8).toUpperCase()}</td>
                    <td className="px-3 py-4"><p className="text-white">{item.nome || "Formulário pendente"}</p><p className="mt-1 text-xs text-zinc-600">{item.whatsapp || "Sem contato"}</p></td>
                    <td className="px-3 py-4 text-zinc-300">{item.modeloAtual} → {item.produtoDesejadoNome || "Produto selecionado"}</td>
                    <td className="px-3 py-4 text-white">{item.precisaCotacao ? "Cotação manual" : formatCurrency(item.valorFinal)}</td>
                    <td className="px-3 py-4"><StatusBadge tone={offer === "Oferta ativa" ? "orange" : "neutral"}>{offer}</StatusBadge></td>
                    <td className="px-3 py-4"><StatusBadge tone={item.crmStatus === "SENT" ? "green" : item.crmStatus === "FAILED" ? "red" : "neutral"}>{crmLabels[item.crmStatus]}</StatusBadge></td>
                    <td className="px-3 py-4 text-zinc-500">{formatRelativeDate(item.updatedAt)}</td>
                    <td className="px-5 py-4 text-zinc-500"><MoreVertical size={17} /></td>
                  </tr>
                );
              }) : <tr><td colSpan={8} className="px-5 py-16 text-center text-zinc-500">Nenhuma simulação encontrada.</td></tr>}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-col gap-3 border-t border-white/10 px-5 py-4 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{result ? `${result.data.length} de ${result.pagination.total} simulações` : "0 simulações"}</span>
          <div className="flex items-center gap-2">
            <button type="button" disabled={page <= 1} onClick={() => setPage((value) => value - 1)} className="rounded-lg border border-white/10 p-2 hover:bg-white/5 disabled:opacity-30"><ChevronLeft size={16} /></button>
            <span className="min-w-8 rounded-lg border border-[#ff6700]/60 px-3 py-2 text-center text-white">{page}</span>
            <button type="button" disabled={!result || page >= result.pagination.totalPages} onClick={() => setPage((value) => value + 1)} className="rounded-lg border border-white/10 p-2 hover:bg-white/5 disabled:opacity-30"><ChevronRight size={16} /></button>
          </div>
        </footer>
      </section>

      {(selected || drawerLoading) && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={() => setSelected(null)}>
          <aside className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#101010] p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            {drawerLoading && !selected ? <div className="flex h-full items-center justify-center text-zinc-500"><Loader2 className="animate-spin" /></div> : selected && (
              <>
                <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
                  <div><p className="text-xs text-zinc-500">#{selected.id.slice(0, 8).toUpperCase()}</p><h2 className="mt-1 text-xl font-semibold text-white">{selected.nome || "Formulário pendente"}</h2></div>
                  <button type="button" onClick={() => setSelected(null)} className="rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white"><X size={18} /></button>
                </div>

                <section className="border-b border-white/10 py-5"><h3 className="mb-4 text-sm font-semibold text-white">Contato</h3><div className="space-y-3 text-sm text-zinc-400">{selected.whatsapp && <p className="flex items-center gap-3"><Phone size={16} />{selected.whatsapp}</p>}{selected.email && <p className="flex items-center gap-3"><Mail size={16} />{selected.email}</p>}{selected.cep && <p className="flex items-center gap-3"><MapPin size={16} />CEP {selected.cep}</p>}</div></section>
                <section className="border-b border-white/10 py-5"><h3 className="mb-4 text-sm font-semibold text-white">Oferta</h3><dl className="space-y-3 text-sm"><div className="flex justify-between gap-4"><dt className="text-zinc-500">Valor do aparelho</dt><dd className="text-white">{formatCurrency(selected.valorAparelho)}</dd></div><div className="flex justify-between gap-4"><dt className="text-zinc-500">Valor com desconto</dt><dd className="text-white">{formatCurrency(selected.valorComDesconto)}</dd></div><div className="flex justify-between gap-4"><dt className="text-zinc-500">Expira em</dt><dd className="text-white">{selected.offerExpiresAt ? new Date(selected.offerExpiresAt).toLocaleString("pt-BR") : "—"}</dd></div></dl></section>
                <section className="py-5"><h3 className="mb-4 text-sm font-semibold text-white">DataCrazy</h3><div className="mb-4 flex items-center gap-2"><StatusBadge tone={selected.crmStatus === "SENT" ? "green" : selected.crmStatus === "FAILED" ? "red" : "neutral"}>{crmLabels[selected.crmStatus]}</StatusBadge><span className="text-xs text-zinc-600">{selected.crmAttempts} tentativa(s)</span></div>{selected.crmLastError && <code className="mb-4 block rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-300">{selected.crmLastError}</code>}<button type="button" disabled={actionLoading || !selected.nome} onClick={() => void resend(selected.id)} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#ff6700] px-4 py-3 text-sm font-semibold text-black hover:bg-[#ff7a1a] disabled:opacity-40"><RefreshCw size={16} /> Reenviar ao DataCrazy</button>{user.role === "ADMIN" && <button type="button" disabled={actionLoading} onClick={() => void copyPayload(selected.id)} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/15 px-4 py-3 text-sm font-medium text-white hover:bg-white/5 disabled:opacity-40"><Clipboard size={16} /> Copiar payload</button>}{selected.crmExternalUrl && <a href={selected.crmExternalUrl} target="_blank" rel="noreferrer" className="mt-4 flex items-center justify-center gap-2 text-sm text-zinc-400 hover:text-white">Abrir no DataCrazy <ExternalLink size={14} /></a>}</section>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}
