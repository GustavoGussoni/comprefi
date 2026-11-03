import {
  CheckCircle2,
  ClipboardCheck,
  Edit3,
  Eye,
  Link2Off,
  PackagePlus,
  Power,
  RefreshCw,
  Search,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import UsedStockEditor, {
  type UsedStockEditorValues,
} from "@/components/admin/UsedStockEditor";
import {
  formatUsedStockInstallment,
  formatUsedStockMoney,
  isAllowedUsedStockImage,
} from "@/lib/usedStock";
import {
  ApiError,
  apiService,
  type CreateUsedStockInput,
  type UsedStockAdminUnit,
  type UsedStockCatalogVariant,
  type UsedStockEditableInput,
  type UsedStockStatus,
} from "@/services/api";

const EMPTY_VALUES: UsedStockEditorValues = {
  catalogVariantId: "",
  battery: "",
  details: "",
  realImages: "",
  pixPrice: "",
  installments: "12",
  installmentPrice: "",
  imei: "",
  internalNotes: "",
};

const statusLabels: Record<UsedStockStatus, string> = {
  draft: "Rascunho",
  available: "Disponível",
  sold: "Vendido",
};

const statusClasses: Record<UsedStockStatus, string> = {
  draft: "bg-amber-500/10 text-amber-300 border-amber-400/20",
  available: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20",
  sold: "bg-zinc-700/60 text-zinc-300 border-zinc-500/30",
};

function unitToValues(unit: UsedStockAdminUnit): UsedStockEditorValues {
  return {
    catalogVariantId: unit.catalogVariantId || "",
    battery: unit.battery === null ? "" : String(unit.battery),
    details: unit.details,
    realImages: unit.realImages.join("\n"),
    pixPrice: unit.pixPrice === 0 ? "" : String(unit.pixPrice),
    installments: String(unit.installments || 12),
    installmentPrice:
      unit.installmentPrice === 0 ? "" : String(unit.installmentPrice),
    imei: unit.imei || "",
    internalNotes: unit.internalNotes,
  };
}

function toOptionalNumber(value: string): number | undefined {
  if (value.trim() === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function imageList(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function valuesToEditableInput(
  values: UsedStockEditorValues,
): UsedStockEditableInput {
  const battery = toOptionalNumber(values.battery);
  const pixPrice = toOptionalNumber(values.pixPrice);
  const installments = toOptionalNumber(values.installments);
  const installmentPrice = toOptionalNumber(values.installmentPrice);
  const realImages = imageList(values.realImages);

  return {
    ...(values.catalogVariantId
      ? { catalogVariantId: values.catalogVariantId }
      : {}),
    battery: battery === undefined ? null : battery,
    details: values.details.trim(),
    image: realImages[0] || "",
    imageIsIllustrative: false,
    realImages,
    pixPrice: pixPrice ?? 0,
    installments: installments ?? 12,
    installmentPrice: installmentPrice ?? 0,
    imei: values.imei.trim() || null,
    internalNotes: values.internalNotes.trim(),
  };
}

function validateDraft(
  values: UsedStockEditorValues,
  requiresCatalogVariant: boolean,
): string | null {
  if (requiresCatalogVariant && !values.catalogVariantId) {
    return "Selecione uma variante existente do Catálogo para cadastrar a nova unidade.";
  }
  if (
    values.battery &&
    (!Number.isInteger(Number(values.battery)) ||
      Number(values.battery) < 1 ||
      Number(values.battery) > 100)
  ) {
    return "A bateria deve ser um número inteiro entre 1 e 100.";
  }
  if (values.imei && !/^\d{15}$/.test(values.imei)) {
    return "O IMEI deve conter exatamente 15 dígitos quando informado.";
  }
  if (
    imageList(values.realImages).some(
      (image) => !isAllowedUsedStockImage(image),
    )
  ) {
    return "Cada foto real deve usar um caminho permitido e não pode ser um render antigo.";
  }
  return null;
}

function validateActivation(
  values: UsedStockEditorValues,
  catalogVariants: UsedStockCatalogVariant[],
): string | null {
  const draftError = validateDraft(values, true);
  if (draftError) return draftError;
  const editable = valuesToEditableInput(values);
  const selectedVariant = catalogVariants.find(
    (variant) => variant.id === values.catalogVariantId,
  );

  if (!selectedVariant || !selectedVariant.isActive || !selectedVariant.groupIsActive) {
    return "A variante selecionada está inativa ou não está disponível no Catálogo.";
  }
  if (!editable.battery || !editable.details) {
    return "Complete bateria e detalhes do estado antes de disponibilizar.";
  }
  if (!editable.realImages?.length) {
    return "Inclua ao menos uma foto real da unidade antes de disponibilizar.";
  }
  if (
    !editable.pixPrice ||
    editable.pixPrice <= 0 ||
    !editable.installmentPrice ||
    editable.installmentPrice <= 0
  ) {
    return "Informe preços positivos de PIX e de cada parcela antes de disponibilizar.";
  }
  if (
    !editable.installments ||
    editable.installments < 1 ||
    editable.installments > 24 ||
    !Number.isInteger(editable.installments)
  ) {
    return "Informe uma quantidade de parcelas inteira entre 1 e 24.";
  }
  return null;
}

function isActivationReady(
  unit: UsedStockAdminUnit,
  catalogVariants: UsedStockCatalogVariant[],
): boolean {
  if (!unit.catalogLinked || !unit.catalogActive) return false;
  return validateActivation(unitToValues(unit), catalogVariants) === null;
}

interface ConfirmAction {
  kind: "activate" | "deactivate" | "sold";
  unit: UsedStockAdminUnit;
}

const UsedStockAdmin: React.FC = () => {
  const [units, setUnits] = useState<UsedStockAdminUnit[]>([]);
  const [catalogVariants, setCatalogVariants] = useState<
    UsedStockCatalogVariant[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [operationError, setOperationError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | UsedStockStatus>(
    "all",
  );
  const [editingUnit, setEditingUnit] = useState<UsedStockAdminUnit | null>(
    null,
  );
  const [editorOpen, setEditorOpen] = useState(false);
  const [values, setValues] = useState<UsedStockEditorValues>(EMPTY_VALUES);
  const [editorError, setEditorError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<ConfirmAction | null>(null);
  const [receivedConfirmed, setReceivedConfirmed] = useState(false);
  const [checkedConfirmed, setCheckedConfirmed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const confirmationTriggerRef = useRef<HTMLButtonElement | null>(null);
  const creationKeyRef = useRef<string | null>(null);
  const saveInFlightRef = useRef(false);
  const transitionInFlightRef = useRef(false);

  const loadData = useCallback(async (cancelled: { current: boolean }) => {
    try {
      setLoading(true);
      setLoadError(null);
      const [stockResult, variantsResult] = await Promise.all([
        apiService.getAdminUsedStock(),
        apiService.getAdminUsedStockCatalogVariants(),
      ]);
      if (!cancelled.current) {
        setUnits(stockResult);
        setCatalogVariants(variantsResult);
      }
    } catch (error) {
      if (!cancelled.current) {
        setLoadError(
          error instanceof ApiError
            ? error.message
            : "Não foi possível carregar o estoque de seminovos.",
        );
      }
    } finally {
      if (!cancelled.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cancelled = { current: false };
    void loadData(cancelled);
    return () => {
      cancelled.current = true;
    };
  }, [loadData, reloadKey]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (confirmAction && !dialog.open) dialog.showModal();
    if (!confirmAction && dialog.open) dialog.close();
  }, [confirmAction]);

  const filteredUnits = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return units.filter((unit) => {
      const matchesStatus = statusFilter === "all" || unit.status === statusFilter;
      const matchesSearch =
        !needle ||
        [unit.model, unit.storage, unit.color, unit.id].some((value) =>
          value.toLowerCase().includes(needle),
        );
      return matchesStatus && matchesSearch;
    });
  }, [search, statusFilter, units]);

  const replaceUnit = (updated: UsedStockAdminUnit) => {
    setUnits((current) =>
      current.map((unit) => (unit.id === updated.id ? updated : unit)),
    );
  };

  const startCreate = () => {
    setOperationError(null);
    setEditorError(null);
    setEditingUnit(null);
    setValues(EMPTY_VALUES);
    creationKeyRef.current = crypto.randomUUID();
    setEditorOpen(true);
  };

  const startEdit = (unit: UsedStockAdminUnit) => {
    setOperationError(null);
    setEditorError(null);
    setEditingUnit(unit);
    setValues(unitToValues(unit));
    creationKeyRef.current = null;
    setEditorOpen(true);
  };

  const closeEditor = () => {
    if (saving) return;
    setEditorError(null);
    setEditingUnit(null);
    setValues(EMPTY_VALUES);
    creationKeyRef.current = null;
    setEditorOpen(false);
  };

  const formatOperationError = (error: unknown): string => {
    if (error instanceof ApiError && error.status === 409) {
      return "Esta unidade foi alterada por outra pessoa ou mudou de status. Atualize a lista e revise antes de tentar novamente.";
    }
    return error instanceof Error
      ? error.message
      : "Não foi possível concluir a operação.";
  };

  const saveDraft = async (): Promise<UsedStockAdminUnit | null> => {
    if (saveInFlightRef.current) return null;
    saveInFlightRef.current = true;

    const validationError = validateDraft(values, !editingUnit);
    if (validationError) {
      setEditorError(validationError);
      saveInFlightRef.current = false;
      return null;
    }

    setSaving(true);
    setEditorError(null);
    try {
      const input = valuesToEditableInput(values);
      let saved: UsedStockAdminUnit;
      if (editingUnit) {
        saved = await apiService.updateUsedStock(editingUnit.id, {
          ...input,
          expectedRevision: editingUnit.revision,
        });
        replaceUnit(saved);
      } else {
        const creationKey = creationKeyRef.current || crypto.randomUUID();
        creationKeyRef.current = creationKey;
        const createInput: CreateUsedStockInput = {
          ...input,
          creationKey,
          catalogVariantId: values.catalogVariantId,
        };
        saved = await apiService.createUsedStock(createInput);
        setUnits((current) => [saved, ...current]);
      }
      setEditingUnit(saved);
      setValues(unitToValues(saved));
      return saved;
    } catch (error) {
      setEditorError(formatOperationError(error));
      return null;
    } finally {
      setSaving(false);
      saveInFlightRef.current = false;
    }
  };

  const saveOnly = async () => {
    const saved = await saveDraft();
    if (saved) closeEditor();
  };

  const requestActivationFromEditor = async () => {
    const validationError = validateActivation(values, catalogVariants);
    if (validationError) {
      setEditorError(validationError);
      return;
    }
    const saved = await saveDraft();
    if (saved) {
      setReceivedConfirmed(false);
      setCheckedConfirmed(false);
      setConfirmAction({ kind: "activate", unit: saved });
      closeEditor();
    }
  };

  const openActivation = (unit: UsedStockAdminUnit, trigger: HTMLButtonElement) => {
    confirmationTriggerRef.current = trigger;
    setOperationError(null);
    const validationError = validateActivation(unitToValues(unit), catalogVariants);
    if (validationError || !unit.catalogLinked || !unit.catalogActive) {
      setOperationError(
        validationError ||
          "Vincule esta unidade a uma variante ativa do Catálogo antes de disponibilizá-la.",
      );
      startEdit(unit);
      return;
    }
    setReceivedConfirmed(false);
    setCheckedConfirmed(false);
    setConfirmAction({ kind: "activate", unit });
  };

  const closeDialog = () => {
    const trigger = confirmationTriggerRef.current;
    setReceivedConfirmed(false);
    setCheckedConfirmed(false);
    setConfirmAction(null);
    confirmationTriggerRef.current = null;
    window.setTimeout(() => trigger?.focus(), 0);
  };

  const confirmTransition = async () => {
    if (!confirmAction || pendingId || transitionInFlightRef.current) return;
    if (
      confirmAction.kind === "activate" &&
      (!receivedConfirmed || !checkedConfirmed)
    ) {
      return;
    }
    const { unit, kind } = confirmAction;
    transitionInFlightRef.current = true;
    setPendingId(unit.id);
    setOperationError(null);
    try {
      const updated =
        kind === "activate"
          ? await apiService.activateUsedStock(unit.id, unit.revision)
          : kind === "deactivate"
            ? await apiService.deactivateUsedStock(unit.id, unit.revision)
            : await apiService.sellUsedStock(unit.id, unit.revision);
      replaceUnit(updated);
      closeDialog();
    } catch (error) {
      setOperationError(formatOperationError(error));
      closeDialog();
    } finally {
      setPendingId(null);
      transitionInFlightRef.current = false;
    }
  };

  const actionCopy = confirmAction
    ? confirmAction.kind === "activate"
      ? {
          title: "Confirmar recebimento e disponibilização",
          body: "Ao confirmar, você declara que a unidade foi recebida e conferida. Ela ficará disponível imediatamente na vitrine pública.",
          button: "Confirmar e disponibilizar",
          icon: <ClipboardCheck className="text-[#ff7a1a]" size={22} />,
        }
      : confirmAction.kind === "deactivate"
        ? {
            title: "Retirar unidade da vitrine",
            body: "A unidade voltará para rascunho e deixará de aparecer para clientes.",
            button: "Retirar da vitrine",
            icon: <Power className="text-amber-300" size={22} />,
          }
        : {
            title: "Confirmar venda da unidade",
            body: "Esta ação marca a unidade como vendida e é terminal. Ela não poderá voltar para a vitrine.",
            button: "Marcar como vendida",
            icon: <ShoppingBag className="text-red-300" size={22} />,
          }
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#ff7a1a]">
            Estoque por unidade
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-white">
            iPhones Seminovos
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Selecione uma variante já cadastrada no Catálogo e administre cada aparelho separadamente. Preço, bateria, IMEI e histórico permanecem por unidade.
          </p>
        </div>
        <button type="button" onClick={startCreate} disabled={saving || pendingId !== null || loading} className="inline-flex items-center justify-center rounded-lg bg-[#ff6700] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e85f00] disabled:cursor-not-allowed disabled:opacity-60">
          <PackagePlus size={18} className="mr-2" />
          Nova unidade
        </button>
      </div>

      {editorOpen && (
        <UsedStockEditor
          title={editingUnit ? `Editar rascunho · ${editingUnit.model}` : "Nova unidade de seminovo"}
          values={values}
          saving={saving}
          error={editorError}
          catalogVariants={catalogVariants}
          legacyIdentity={
            editingUnit && !editingUnit.catalogLinked
              ? {
                  model: editingUnit.model,
                  storage: editingUnit.storage,
                  color: editingUnit.color,
                }
              : undefined
          }
          isNew={!editingUnit}
          onChange={setValues}
          onSave={() => void saveOnly()}
          onCancel={closeEditor}
          onRequestActivation={() => void requestActivationFromEditor()}
        />
      )}

      {operationError && (
        <div role="alert" className="flex flex-col justify-between gap-3 rounded-lg border border-red-700/70 bg-red-950/40 p-4 text-sm text-red-100 sm:flex-row sm:items-center">
          <span>{operationError}</span>
          <button type="button" onClick={() => setReloadKey((value) => value + 1)} className="self-start rounded-md border border-red-400/50 px-3 py-1.5 text-xs transition-colors hover:bg-red-900/60">Atualizar lista</button>
        </div>
      )}

      <section className="rounded-xl border border-white/10 bg-[#111]" aria-labelledby="used-stock-list-title">
        <div className="flex flex-col gap-3 border-b border-white/10 p-4 md:flex-row md:items-center md:justify-between">
          <h2 id="used-stock-list-title" className="text-base font-semibold text-white">Unidades cadastradas</h2>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="relative">
              <span className="sr-only">Buscar unidade</span>
              <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-md border border-zinc-700 bg-zinc-900 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zinc-600 focus:border-[#ff6700] focus:outline-none sm:w-64" placeholder="Buscar modelo ou código" />
            </label>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as "all" | UsedStockStatus)} className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-[#ff6700] focus:outline-none">
              <option value="all">Todos os status</option>
              <option value="draft">Rascunhos</option>
              <option value="available">Disponíveis</option>
              <option value="sold">Vendidos</option>
            </select>
            <button type="button" onClick={() => setReloadKey((value) => value + 1)} disabled={loading} className="inline-flex items-center justify-center rounded-md border border-zinc-700 px-3 py-2 text-zinc-300 transition-colors hover:bg-white/5 disabled:opacity-50" aria-label="Atualizar estoque">
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="py-12 text-center" role="status">
            <RefreshCw className="mx-auto mb-3 h-7 w-7 animate-spin text-[#ff6700]" />
            <p className="text-sm text-zinc-400">Carregando unidades e variantes...</p>
          </div>
        ) : loadError ? (
          <div className="p-6 text-center">
            <p className="text-sm text-red-200">{loadError}</p>
            <button type="button" onClick={() => setReloadKey((value) => value + 1)} className="mt-4 rounded-md border border-red-400/50 px-4 py-2 text-sm text-red-100 hover:bg-red-900/50">Tentar novamente</button>
          </div>
        ) : filteredUnits.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-white">Nenhuma unidade encontrada.</p>
            <p className="mt-1 text-sm text-zinc-500">Cadastre uma unidade por uma variante existente do Catálogo.</p>
          </div>
        ) : (
          <ul className="divide-y divide-white/10">
            {filteredUnits.map((unit) => {
              const canActivate = unit.status === "draft" && isActivationReady(unit, catalogVariants);
              const isPendingLink = !unit.catalogLinked;
              return (
                <li key={unit.id} className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-medium text-white">{unit.model}</h3>
                        <span className={`rounded-full border px-2 py-0.5 text-xs ${statusClasses[unit.status]}`}>{statusLabels[unit.status]}</span>
                        {isPendingLink ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-200"><Link2Off size={12} />Vínculo pendente</span>
                        ) : !unit.catalogActive ? (
                          <span className="rounded-full border border-red-400/30 bg-red-500/10 px-2 py-0.5 text-xs text-red-200">Variante inativa</span>
                        ) : null}
                        <span className="text-xs text-zinc-600">Rev. {unit.revision}</span>
                      </div>
                      <p className="mt-1 text-sm text-zinc-400">{unit.storage} · {unit.color} · Bateria {unit.battery === null ? "não informada" : `${unit.battery}%`}</p>
                      {isPendingLink && <p className="mt-2 text-xs text-amber-200">Cadastro histórico: vincule à variante já existente para preservar esta unidade, seu código e seu histórico.</p>}
                      <p className="mt-2 text-xs text-zinc-500">Código público: {unit.id}</p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                        <span className="text-[#ff8a42]">PIX {formatUsedStockMoney(unit.pixPrice)}</span>
                        <span className="text-zinc-300">{formatUsedStockInstallment(unit.installments, unit.installmentPrice)}</span>
                        {unit.imei && <span className="text-zinc-600">IMEI privado: {unit.imei}</span>}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 xl:justify-end">
                      {unit.status === "draft" && (
                        <>
                          <button type="button" onClick={() => startEdit(unit)} disabled={pendingId !== null || saving} className="inline-flex items-center rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/5 disabled:opacity-50"><Edit3 size={16} className="mr-1.5" />{isPendingLink ? "Vincular variante" : "Editar"}</button>
                          <button type="button" onClick={(event) => openActivation(unit, event.currentTarget)} disabled={pendingId !== null || saving} className={`inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors disabled:opacity-50 ${canActivate ? "bg-[#ff6700] text-white hover:bg-[#e85f00]" : "border border-amber-500/40 text-amber-200 hover:bg-amber-500/10"}`}>
                            {canActivate ? <CheckCircle2 size={16} className="mr-1.5" /> : <Edit3 size={16} className="mr-1.5" />}
                            {canActivate ? "Ativar unidade" : "Completar editor"}
                          </button>
                        </>
                      )}
                      {unit.status === "available" && unit.catalogLinked && unit.catalogActive && (
                        <>
                          <a href={`/seminovos/${encodeURIComponent(unit.id)}`} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition-colors hover:bg-white/5"><Eye size={16} className="mr-1.5" />Ver vitrine</a>
                          <button type="button" onClick={(event) => { confirmationTriggerRef.current = event.currentTarget; setConfirmAction({ kind: "deactivate", unit }); }} disabled={pendingId !== null || saving} className="inline-flex items-center rounded-md border border-amber-500/40 px-3 py-2 text-sm text-amber-200 transition-colors hover:bg-amber-500/10 disabled:opacity-50"><Power size={16} className="mr-1.5" />Desativar</button>
                          <button type="button" onClick={(event) => { confirmationTriggerRef.current = event.currentTarget; setConfirmAction({ kind: "sold", unit }); }} disabled={pendingId !== null || saving} className="inline-flex items-center rounded-md bg-red-700/80 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"><ShoppingBag size={16} className="mr-1.5" />Marcar vendida</button>
                        </>
                      )}
                      {unit.status === "sold" && <span className="inline-flex items-center px-3 py-2 text-sm text-zinc-500"><XCircle size={16} className="mr-1.5" />Baixa concluída</span>}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <dialog ref={dialogRef} aria-labelledby="used-stock-confirm-title" onCancel={(event) => { event.preventDefault(); if (pendingId !== null || transitionInFlightRef.current) return; closeDialog(); }} onClose={() => { if (pendingId === null && !transitionInFlightRef.current) setConfirmAction(null); }} className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-xl border border-white/10 bg-[#151515] p-0 text-white shadow-2xl backdrop:bg-black/75">
        {confirmAction && actionCopy && (
          <div className="p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{actionCopy.icon}</div>
              <div>
                <h2 id="used-stock-confirm-title" className="text-lg font-semibold text-white">{actionCopy.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{actionCopy.body}</p>
              </div>
            </div>

            <div className="mt-5 rounded-lg border border-white/10 bg-black/20 p-4 text-sm">
              <p className="font-medium text-white">{confirmAction.unit.model} · {confirmAction.unit.storage} · {confirmAction.unit.color}</p>
              <p className="mt-2 text-zinc-300">PIX: {formatUsedStockMoney(confirmAction.unit.pixPrice)}</p>
              <p className="mt-1 text-zinc-300">Cartão: {formatUsedStockInstallment(confirmAction.unit.installments, confirmAction.unit.installmentPrice)}</p>
              <p className="mt-2 text-xs text-zinc-500">Revisão salva: {confirmAction.unit.revision}</p>
            </div>

            {confirmAction.kind === "activate" && (
              <div className="mt-4 rounded-lg border border-[#ff6700]/30 bg-[#ff6700]/5 p-3 text-sm text-zinc-200">
                <p className="font-medium text-white">Confirme o recebimento e a conferência</p>
                <div className="mt-3 space-y-2">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-200"><input type="checkbox" checked={receivedConfirmed} onChange={(event) => setReceivedConfirmed(event.target.checked)} disabled={pendingId !== null} className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 accent-[#ff6700]" />Confirmo que esta unidade foi recebida.</label>
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-200"><input type="checkbox" checked={checkedConfirmed} onChange={(event) => setCheckedConfirmed(event.target.checked)} disabled={pendingId !== null} className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 accent-[#ff6700]" />Confirmo que esta unidade foi conferida.</label>
                </div>
                <p className="mt-3 text-xs text-zinc-400">Revise os dados da unidade e as fotos reais antes de confirmar a disponibilização.</p>
              </div>
            )}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={closeDialog} disabled={pendingId !== null} className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 disabled:opacity-50">Cancelar</button>
              <button type="button" onClick={() => void confirmTransition()} disabled={pendingId !== null || (confirmAction.kind === "activate" && (!receivedConfirmed || !checkedConfirmed))} className={`rounded-md px-4 py-2.5 text-sm font-medium text-white transition-colors disabled:opacity-50 ${confirmAction.kind === "sold" ? "bg-red-700 hover:bg-red-600" : "bg-[#ff6700] hover:bg-[#e85f00]"}`}>{pendingId ? "Processando..." : actionCopy.button}</button>
            </div>
          </div>
        )}
      </dialog>
    </div>
  );
};

export default UsedStockAdmin;
