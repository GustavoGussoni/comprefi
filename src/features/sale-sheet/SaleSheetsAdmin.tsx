import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { saleSheetApi, safeError, type HealthState } from "./api";
import type { CatalogItem, SheetSnapshot } from "./model";
import { itemTitle, money, total } from "./model";
import { Badge, Button } from "./ui";
import SaleEditor from "./SaleEditor";
import SheetDrawer from "./SheetDrawer";
import { taskLabel } from "./taskLabel";
import "./sale-sheet.css";

export default function SaleSheetsAdmin() {
  const { user } = useAdminAuth();
  const [sheets, setSheets] = useState<SheetSnapshot[]>([]);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [health, setHealth] = useState<HealthState>({ state: "unknown" });
  const [loading, setLoading] = useState(true);
  const [catalogError, setCatalogError] = useState("");
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<SheetSnapshot | null>(null);
  const [rawToken, setRawToken] = useState("");
  const [opening, setOpening] = useState(false);
  const [query, setQuery] = useState("");
  const openLock = useRef(false);
  const reloadLock = useRef(false);
  const load = useCallback(async (signal?: AbortSignal) => {
    if (reloadLock.current) return;
    reloadLock.current = true;
    setLoading(true);
    setError("");
    try {
      const status = await saleSheetApi.health(signal);
      if (signal?.aborted) return;
      setHealth(status);
      if (status.state !== "ready") return;
      const rows = await saleSheetApi.sheets(signal);
      if (signal?.aborted) return;
      setSheets(rows);
      try {
        const variants = await saleSheetApi.catalog(signal);
        if (!signal?.aborted) {
          setCatalog(variants);
          setCatalogError("");
        }
      } catch (caught) {
        if (!signal?.aborted) {
          setCatalog([]);
          setCatalogError(safeError(caught));
        }
      }
    } catch (caught) {
      if (!signal?.aborted) {
        setHealth({ state: "unknown" });
        setError(safeError(caught));
      }
    } finally {
      reloadLock.current = false;
      if (!signal?.aborted) setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);
  const visible = sheets.filter(
    (sheet) =>
      (user.role === "ADMIN" || sheet.createdBy.id === user.id) &&
      `${sheet.reference} ${itemTitle(sheet)}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.trim().toLocaleLowerCase("pt-BR")),
  );
  const update = (sheet: SheetSnapshot, token?: string) => {
    setSelected(sheet);
    setSheets((current) =>
      current.some((row) => row.id === sheet.id)
        ? current.map((row) => (row.id === sheet.id ? sheet : row))
        : [sheet, ...current],
    );
    if (token !== undefined) setRawToken(token);
  };
  const open = async (id: string) => {
    if (openLock.current) return;
    openLock.current = true;
    setOpening(true);
    setError("");
    try {
      const sheet = await saleSheetApi.sheet(id);
      setRawToken("");
      setSelected(sheet);
    } catch (caught) {
      setError(safeError(caught));
    } finally {
      openLock.current = false;
      setOpening(false);
    }
  };
  return (
    <div className="sale-sheet sale-sheet-admin">
      {health.state !== "ready" ? (
        <section className="cf-health-blocker">
          <span className="cf-eyebrow">FICHA DE VENDA</span>
          <h1>
            {loading ? "Verificando disponibilidade…" : "Área em preparação"}
          </h1>
          <p>
            Fichas só ficam disponíveis quando a funcionalidade está habilitada
            no backend. A navegação existente continua funcionando.
          </p>
          {error && (
            <p className="cf-error" role="alert">
              {error}
            </p>
          )}
          <Button secondary disabled={loading} onClick={() => void load()}>
            Verificar novamente
          </Button>
        </section>
      ) : (
        <>
          <div className="cf-note" role="note">
            {health.crmMode === "disabled"
              ? "Preparação isolada · CRM desativado. Nenhum cadastro nesta área confirma assinatura ou pagamento."
              : "CRM habilitado pelo backend. O recebimento HTTP não garante negócio criado; a equipe deve conferir o destino."}
          </div>
          {editing ? (
            <SaleEditor
              actor={user}
              catalog={catalog}
              catalogLoading={loading}
              catalogError={catalogError}
              onCancel={() => setEditing(false)}
              onSave={async (sale, key) => {
                const result = await saleSheetApi.create(sale, key);
                setEditing(false);
                update(result.sheet, result.token);
              }}
            />
          ) : (
            <>
              <div className="cf-page-heading">
                <div>
                  <span className="cf-eyebrow">NEGOCIAÇÃO E CADASTRO</span>
                  <h1>Fichas de venda</h1>
                  <p>
                    {user.role === "ADMIN"
                      ? "Todas as fichas da equipe."
                      : "Somente suas fichas de venda."}{" "}
                    Catálogo central, valores finais negociados manualmente.
                  </p>
                </div>
                <div className="cf-button-row">
                  <Button
                    secondary
                    disabled={loading || opening}
                    onClick={() => void load()}
                  >
                    <RefreshCw size={16} /> Atualizar
                  </Button>
                  <Button
                    disabled={loading || opening}
                    onClick={() => setEditing(true)}
                  >
                    <Plus size={16} /> Nova ficha
                  </Button>
                </div>
              </div>
              {error && (
                <p className="cf-error" role="alert">
                  {error}
                </p>
              )}
              <section className="cf-list-panel">
                <div className="cf-list-toolbar">
                  <label className="cf-search">
                    <input
                      aria-label="Buscar fichas por referência ou produto"
                      placeholder="Buscar referência ou produto"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <span className="cf-muted">{visible.length} ficha(s)</span>
                </div>
                <div className="cf-table-wrap">
                  <table className="cf-table">
                    <caption className="cf-sr-only">
                      Fichas de venda autorizadas para sua conta
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">FICHA / PRODUTOS</th>
                        <th scope="col">VALOR FINAL</th>
                        <th scope="col">CADASTRO</th>
                        <th scope="col">PDF / CRM</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visible.map((sheet) => (
                        <tr key={sheet.id}>
                          <td>
                            <button
                              className="cf-row-title"
                              disabled={opening}
                              onClick={() => void open(sheet.id)}
                            >
                              {sheet.reference}
                            </button>
                            <small>{itemTitle(sheet)}</small>
                            <small>
                              {new Date(sheet.createdAt).toLocaleDateString(
                                "pt-BR",
                              )}
                            </small>
                          </td>
                          <td>{money(total(sheet))}</td>
                          <td>
                            <Badge
                              tone={
                                sheet.submittedAt
                                  ? "green"
                                  : sheet.revoked
                                    ? "red"
                                    : "orange"
                              }
                            >
                              {sheet.submittedAt
                                ? "Recebido"
                                : sheet.revoked
                                  ? "Encerrada"
                                  : "Aguardando"}
                            </Badge>
                          </td>
                          <td>
                            PDF: {taskLabel(sheet.pdf)}
                            <small>CRM: {taskLabel(sheet.crm)}</small>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {!visible.length && (
                  <div className="cf-empty">
                    <h3>
                      {loading
                        ? "Carregando fichas…"
                        : "Nenhuma ficha encontrada"}
                    </h3>
                    <p>
                      Crie uma ficha com a negociação já definida. Não há
                      preenchimento por exemplos.
                    </p>
                  </div>
                )}
              </section>
            </>
          )}
          {selected && (
            <SheetDrawer
              key={selected.id}
              sheet={selected}
              rawToken={rawToken}
              isAdmin={user.role === "ADMIN"}
              crmMode={health.crmMode}
              onUpdate={update}
              onClose={() => {
                setSelected(null);
                setRawToken("");
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
