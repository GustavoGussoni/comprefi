import { useCallback, useEffect, useRef, useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { saleSheetApi, safeError, type HealthState } from "./api";
import type { CatalogItem, SheetSnapshot } from "./model";
import { itemTitle, money, total } from "./model";
import {
  bucketLabels,
  canEditSheet,
  ownsSheet,
  sheetBucket,
  sheetStateLabel,
  type SheetBucket,
} from "./lifecycle";
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
  const [editSheet, setEditSheet] = useState<SheetSnapshot | null>(null);
  const [selected, setSelected] = useState<SheetSnapshot | null>(null);
  const [rawToken, setRawToken] = useState("");
  const [opening, setOpening] = useState(false);
  const [query, setQuery] = useState("");
  const [bucket, setBucket] = useState<SheetBucket>("active");
  const [notice, setNotice] = useState("");
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
  const authorized = sheets.filter((sheet) => ownsSheet(user, sheet));
  const visible = authorized.filter(
    (sheet) =>
      sheetBucket(sheet) === bucket &&
      `${sheet.reference} ${itemTitle(sheet)}`
        .toLocaleLowerCase("pt-BR")
        .includes(query.trim().toLocaleLowerCase("pt-BR")),
  );
  const update = (sheet: SheetSnapshot, token?: string) => {
    if (
      selected?.id === sheet.id &&
      sheetBucket(selected) !== sheetBucket(sheet)
    ) {
      setBucket(sheetBucket(sheet));
    }
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
      setSelected(await saleSheetApi.sheet(id));
      setRawToken("");
    } catch (caught) {
      setError(safeError(caught));
    } finally {
      openLock.current = false;
      setOpening(false);
    }
  };
  const beginEdit = (sheet: SheetSnapshot) => {
    if (!ownsSheet(user, sheet) || !canEditSheet(sheet)) return;
    setEditSheet(sheet);
    setSelected(null);
    setRawToken("");
    setNotice("");
    setEditing(true);
  };
  return (
    <div className="sale-sheet sale-sheet-admin">
      {health.state !== "ready" ? (
        <section className="cf-health-blocker">
          <span className="cf-eyebrow">PEDIDOS</span>
          <h1>
            {loading
              ? "Carregando pedidos…"
              : "Não foi possível abrir os pedidos"}
          </h1>
          <p>Tente novamente. Se o problema continuar, avise a equipe.</p>
          {error && (
            <p className="cf-error" role="alert">
              {error}
            </p>
          )}
          <Button secondary disabled={loading} onClick={() => void load()}>
            Tentar novamente
          </Button>
        </section>
      ) : (
        <>
          {notice && (
            <p className="cf-note" role="status">
              {notice}
            </p>
          )}
          {health.crmMode === "disabled" && (
            <p className="cf-note">
              Envio ao CRM desligado. O cadastro e o contrato continuam
              separados do pagamento e da assinatura.
            </p>
          )}
          {editing ? (
            <SaleEditor
              key={editSheet?.id || "new"}
              actor={user}
              catalog={catalog}
              catalogLoading={loading}
              catalogError={catalogError}
              initialSale={editSheet || undefined}
              mode={editSheet ? "edit" : "create"}
              onCancel={() => {
                setEditing(false);
                setEditSheet(null);
              }}
              onSave={async (sale, key) => {
                const result = editSheet
                  ? await saleSheetApi.edit(
                      editSheet.id,
                      editSheet.revision,
                      sale,
                      key,
                    )
                  : await saleSheetApi.create(sale, key);
                const wasEdit = Boolean(editSheet);
                setEditing(false);
                setEditSheet(null);
                setBucket("active");
                update(result.sheet, result.token || "");
                setNotice(
                  result.token
                    ? wasEdit
                      ? "Pedido corrigido. O link anterior não funciona mais. Copie e envie o novo link."
                      : "Pedido criado. Copie o link e envie ao cliente."
                    : "O pedido foi salvo. Gere um novo link nos detalhes para compartilhar com o cliente.",
                );
              }}
            />
          ) : (
            <>
              <div className="cf-page-heading">
                <div>
                  <span className="cf-eyebrow">DO COMBINADO AO CADASTRO</span>
                  <h1>Pedidos</h1>
                  <p>
                    {user.role === "ADMIN"
                      ? "Acompanhe os pedidos da equipe."
                      : "Acompanhe seus pedidos."}{" "}
                    Crie o link depois de fechar a negociação.
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
                    onClick={() => {
                      setEditSheet(null);
                      setNotice("");
                      setEditing(true);
                    }}
                  >
                    <Plus size={16} /> Novo pedido
                  </Button>
                </div>
              </div>
              {error && (
                <p className="cf-error" role="alert">
                  {error}
                </p>
              )}
              <div
                className="cf-record-tabs"
                role="group"
                aria-label="Mostrar pedidos"
              >
                {(Object.keys(bucketLabels) as SheetBucket[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={bucket === key}
                    className={bucket === key ? "is-active" : ""}
                    onClick={() => {
                      setBucket(key);
                      setSelected(null);
                      setRawToken("");
                    }}
                  >
                    {bucketLabels[key]}{" "}
                    <span>
                      {
                        authorized.filter((sheet) => sheetBucket(sheet) === key)
                          .length
                      }
                    </span>
                  </button>
                ))}
              </div>
              {bucket !== "active" && (
                <p className="cf-help cf-bucket-help">
                  {bucket === "cancelled"
                    ? "Links cancelados não recebem novos cadastros. O histórico fica preservado."
                    : bucket === "finalized"
                      ? "Conclusão marcada manualmente pela equipe. Não comprova pagamento, entrega ou assinatura. Reabrir devolve o pedido a Em andamento, sem liberar a edição do cadastro recebido."
                      : "Arquivar só organiza esta lista. Use Desarquivar nos detalhes para trazer o pedido de volta à sua situação anterior, inclusive Finalizados. Isso não cancela contratos nem negócios no CRM."}
                </p>
              )}
              <section className="cf-list-panel">
                <div className="cf-list-toolbar">
                  <label className="cf-search">
                    <input
                      aria-label="Buscar pedidos por referência ou produto"
                      placeholder="Buscar pedido ou produto"
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </label>
                  <span className="cf-muted">{visible.length} pedido(s)</span>
                </div>
                <div className="cf-table-wrap">
                  <table className="cf-table">
                    <caption className="cf-sr-only">
                      Pedidos disponíveis para sua conta
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">PEDIDO / PRODUTOS</th>
                        <th scope="col">TOTAL NEGOCIADO</th>
                        <th scope="col">SITUAÇÃO</th>
                        <th scope="col">CONTRATO / CRM</th>
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
                                sheet.archivedAt
                                  ? "neutral"
                                  : sheet.revoked
                                    ? "red"
                                    : sheet.submittedAt
                                      ? "green"
                                      : "orange"
                              }
                            >
                              {sheetStateLabel(sheet)}
                            </Badge>
                          </td>
                          <td>
                            {sheet.submittedAt ? (
                              <>
                                Contrato: {taskLabel(sheet.pdf)}
                                <small>CRM: {taskLabel(sheet.crm)}</small>
                              </>
                            ) : (
                              <span className="cf-muted">Após o cadastro</span>
                            )}
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
                        ? "Carregando pedidos…"
                        : "Nenhum pedido encontrado"}
                    </h3>
                    <p>
                      {bucket === "active"
                        ? "Crie um pedido para registrar o combinado e enviar o link ao cliente."
                        : "Os pedidos desta situação aparecerão aqui."}
                    </p>
                  </div>
                )}
              </section>
            </>
          )}
          {selected && ownsSheet(user, selected) && (
            <SheetDrawer
              key={selected.id}
              sheet={selected}
              rawToken={rawToken}
              isAdmin={user.role === "ADMIN"}
              crmMode={health.crmMode}
              onUpdate={update}
              onEdit={() => beginEdit(selected)}
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
