import { useEffect, useId, useRef, useState } from "react";
import { ApiError, apiService, type CatalogVariantCrmSku } from "@/services/api";

interface CrmSkuEditorProps {
  variant: CatalogVariantCrmSku;
  identity: string;
  readOnly: boolean;
  onUpdated: (updated: CatalogVariantCrmSku) => void;
  onReload: (id: string) => Promise<CatalogVariantCrmSku>;
  onEditingChange: (id: string, editing: boolean) => void;
}

/** Editor independente dos preços, custos, disponibilidade e identidade da variante. */
export default function CrmSkuEditor({
  variant,
  identity,
  readOnly,
  onUpdated,
  onReload,
  onEditingChange,
}: CrmSkuEditorProps) {
  const inputId = useId();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [expectedRevision, setExpectedRevision] = useState(0);
  const [clearing, setClearing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conflict, setConflict] = useState(false);
  const [reloaded, setReloaded] = useState(false);
  const [notice, setNotice] = useState("");
  const inFlight = useRef(false);
  const editButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    onEditingChange(variant.id, editing);
    return () => onEditingChange(variant.id, false);
  }, [editing, onEditingChange, variant.id]);

  const startEditing = () => {
    if (readOnly || inFlight.current) return;
    setDraft(variant.crmSku ?? "");
    setExpectedRevision(variant.crmSkuRevision);
    setClearing(false);
    setError(null);
    setConflict(false);
    setReloaded(false);
    setNotice("");
    setEditing(true);
  };

  const finishEditing = () => {
    setEditing(false);
    requestAnimationFrame(() => editButton.current?.focus());
  };

  const reloadCurrentSku = async () => {
    const current = await onReload(variant.id);
    setExpectedRevision(current.crmSkuRevision);
    setReloaded(true);
  };

  const retryReload = async () => {
    if (readOnly || inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    try {
      await reloadCurrentSku();
      setError("Conflito de SKU. Dados atuais recarregados; revise antes de tentar novamente.");
    } catch {
      setError("Não foi possível recarregar o SKU atual. Tente recarregar antes de salvar.");
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  };

  const save = async () => {
    if (readOnly || inFlight.current || conflict) return;
    const crmSku = clearing ? null : draft.trim();
    if (crmSku !== null && !/^[A-Za-z0-9][A-Za-z0-9._-]{0,159}$/.test(crmSku)) {
      setError("Use de 1 a 160 caracteres ASCII, começando com letra ou número; os demais podem incluir ponto, hífen ou sublinhado. Para remover, selecione Limpar SKU.");
      return;
    }
    inFlight.current = true;
    setBusy(true);
    setError(null);
    try {
      const updated = await apiService.updateCatalogVariantCrmSku(variant.id, {
        crmSku,
        expectedRevision,
      });
      onUpdated(updated);
      setNotice(updated.crmSku === null ? "SKU removido. Variante pendente." : "SKU cadastrado salvo.");
      finishEditing();
    } catch (err: unknown) {
      if (err instanceof ApiError && err.status === 409) {
        setConflict(true);
        setReloaded(false);
        const detail = err.message;
        try {
          await reloadCurrentSku();
          setError(`Conflito de SKU: ${detail} Dados atuais recarregados. Sua edição foi mantida; revise antes de tentar novamente.`);
        } catch {
          setError(`Conflito de SKU: ${detail} Não foi possível recarregar os dados atuais. Recarregue antes de salvar; sua edição foi mantida.`);
        }
      } else {
        setError(err instanceof Error ? err.message : "Não foi possível salvar o SKU. Tente novamente.");
      }
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  };

  return (
    <div
      className="w-full min-w-0 space-y-2 text-xs"
      role="group"
      aria-label={`SKU do CRM — ${identity}`}
      aria-busy={busy}
      data-crm-sku-variant={variant.id}
    >
      <div className="space-y-1">
        <p className="break-all font-mono text-gray-200">{variant.crmSku ?? "Sem SKU"}</p>
        <p className={variant.crmSku === null ? "text-amber-300" : "text-green-400"}>
          {variant.crmSku === null ? "Pendente" : "SKU cadastrado"}
        </p>
      </div>
      {editing && !readOnly ? (
        <div className="space-y-2">
          <label htmlFor={inputId} className="block text-gray-300">SKU do CRM — {identity}</label>
          <input
            id={inputId}
            type="text"
            autoFocus
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={draft}
            disabled={busy || clearing}
            aria-invalid={Boolean(error)}
            aria-describedby={`${inputId}-help${error ? ` ${inputId}-error` : ""}`}
            onChange={(event) => {
              setDraft(event.target.value);
              if (!conflict) setError(null);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void save();
              } else if (event.key === "Escape" && !inFlight.current) {
                finishEditing();
              }
            }}
            className="w-full min-w-0 rounded border border-gray-600 bg-gray-800 px-2 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <p id={`${inputId}-help`} className="text-gray-400">
            1–160 caracteres (A–Z, a–z, 0–9, . _ -), começando com letra ou número. Apenas referência cadastrada; sem verificação online no DataCrazy.
          </p>
          <button
            type="button"
            disabled={busy}
            aria-pressed={clearing}
            onClick={() => {
              setClearing(!clearing);
              if (!conflict) setError(null);
            }}
            className="rounded border border-gray-600 px-2 py-2 text-gray-200 hover:bg-gray-800 disabled:opacity-50"
          >
            {clearing ? "Manter SKU" : "Limpar SKU"}
          </button>
          {clearing && <p className="text-amber-300">Ao salvar, o SKU será removido e a variante ficará pendente. Cancelar mantém o cadastro atual.</p>}
          {error && <p id={`${inputId}-error`} role="alert" className="break-words text-red-300">{error}</p>}
          {conflict && (
            <div className="space-y-2">
              <p className="break-all text-amber-200">SKU atual: {variant.crmSku ?? "Sem SKU (pendente)"} · revisão {variant.crmSkuRevision}</p>
              {reloaded ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => { setConflict(false); setError(null); }}
                  className="rounded border border-amber-600 px-2 py-2 text-amber-200 disabled:opacity-50"
                >Revisado, tentar novamente</button>
              ) : (
                <button type="button" disabled={busy} onClick={() => void retryReload()} className="rounded border border-amber-600 px-2 py-2 text-amber-200 disabled:opacity-50">Recarregar SKU atual</button>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              disabled={busy || conflict}
              onClick={() => void save()}
              className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >{busy ? "Salvando SKU..." : "Salvar SKU"}</button>
            <button
              type="button"
              disabled={busy}
              onClick={finishEditing}
              className="rounded bg-gray-700 px-3 py-2 text-white hover:bg-gray-600 disabled:opacity-50"
            >Cancelar SKU</button>
          </div>
        </div>
      ) : !readOnly && (
        <button ref={editButton} type="button" onClick={startEditing} className="rounded px-2 py-2 text-blue-400 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
          Editar SKU
        </button>
      )}
      <p role="status" className="text-green-300">{notice}</p>
    </div>
  );
}
