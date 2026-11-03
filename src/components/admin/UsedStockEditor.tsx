import { AlertCircle, Save, X } from "lucide-react";
import { isAllowedUsedStockImage } from "@/lib/usedStock";
import type { UsedStockCatalogVariant } from "@/services/api";

export interface UsedStockEditorValues {
  catalogVariantId: string;
  battery: string;
  details: string;
  realImages: string;
  pixPrice: string;
  installments: string;
  installmentPrice: string;
  imei: string;
  internalNotes: string;
}

interface LegacyIdentity {
  model: string;
  storage: string;
  color: string;
}

interface UsedStockEditorProps {
  values: UsedStockEditorValues;
  title: string;
  saving: boolean;
  error: string | null;
  catalogVariants: UsedStockCatalogVariant[];
  legacyIdentity?: LegacyIdentity;
  isNew: boolean;
  onChange: (values: UsedStockEditorValues) => void;
  onSave: () => void;
  onCancel: () => void;
  onRequestActivation?: () => void;
}

const inputClassName =
  "mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#ff6700] focus:outline-none focus:ring-1 focus:ring-[#ff6700]";
const labelClassName = "block text-xs font-medium text-zinc-300";

function imageList(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

const UsedStockEditor: React.FC<UsedStockEditorProps> = ({
  values,
  title,
  saving,
  error,
  catalogVariants,
  legacyIdentity,
  isNew,
  onChange,
  onSave,
  onCancel,
  onRequestActivation,
}) => {
  const update = <K extends keyof UsedStockEditorValues>(
    key: K,
    value: UsedStockEditorValues[K],
  ) => {
    onChange({ ...values, [key]: value });
  };
  const selectedVariant = catalogVariants.find(
    (variant) => variant.id === values.catalogVariantId,
  );
  const identity = selectedVariant || legacyIdentity;
  const selectedVariantInactive =
    selectedVariant && (!selectedVariant.isActive || !selectedVariant.groupIsActive);
  const hasInvalidPhoto = imageList(values.realImages).some(
    (image) => !isAllowedUsedStockImage(image),
  );

  return (
    <section
      className="rounded-xl border border-white/10 bg-[#111] p-4 shadow-xl sm:p-6"
      aria-labelledby="used-stock-editor-title"
    >
      <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-start">
        <div>
          <h2 id="used-stock-editor-title" className="text-lg font-semibold text-white">
            {title}
          </h2>
          <p className="mt-1 text-sm text-zinc-400">
            A identificação vem do Catálogo. Preços, bateria, IMEI e histórico são desta unidade.
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          className="self-start rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white"
          aria-label="Fechar editor"
        >
          <X size={18} />
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 flex gap-2 rounded-lg border border-red-700/70 bg-red-950/40 p-3 text-sm text-red-100"
        >
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-5 rounded-lg border border-[#ff6700]/25 bg-[#ff6700]/5 p-4">
        <label className={labelClassName} htmlFor="used-stock-catalog-variant">
          Variante do Catálogo {isNew ? "*" : ""}
        </label>
        <select
          id="used-stock-catalog-variant"
          value={values.catalogVariantId}
          onChange={(event) => update("catalogVariantId", event.target.value)}
          className={inputClassName}
        >
          <option value="">Selecione a variante de identificação</option>
          {catalogVariants.map((variant) => {
            const unavailable = !variant.isActive || !variant.groupIsActive;
            return (
              <option key={variant.id} value={variant.id} disabled={unavailable}>
                {variant.model} · {variant.storage} · {variant.color}
                {unavailable ? " — inativa" : ""}
                {variant.unitCount > 0 ? ` (${variant.unitCount} unidade${variant.unitCount === 1 ? "" : "s"})` : ""}
              </option>
            );
          })}
        </select>
        {selectedVariantInactive ? (
          <p className="mt-2 text-xs text-amber-200">
            Esta variante ou seu grupo está inativo. Ela não pode ser selecionada para uma nova unidade nem disponibilizada.
          </p>
        ) : values.catalogVariantId ? null : (
          <p className="mt-2 text-xs text-zinc-400">
            Não encontrou a identificação? Gustavo deve cadastrar modelo e variante uma única vez em Produtos e variantes; este editor não aceita modelo livre.
          </p>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <label className={labelClassName}>
            Modelo
            <input value={identity?.model || ""} readOnly className={`${inputClassName} cursor-default text-zinc-300`} placeholder="Derivado da variante" />
          </label>
          <label className={labelClassName}>
            Capacidade
            <input value={identity?.storage || ""} readOnly className={`${inputClassName} cursor-default text-zinc-300`} placeholder="Derivada da variante" />
          </label>
          <label className={labelClassName}>
            Cor
            <input value={identity?.color || ""} readOnly className={`${inputClassName} cursor-default text-zinc-300`} placeholder="Derivada da variante" />
          </label>
        </div>
        {!values.catalogVariantId && legacyIdentity && (
          <p className="mt-3 text-xs text-amber-200">
            Vínculo pendente: a identificação acima é somente o registro histórico desta unidade. Selecione a variante correspondente para vinculá-la, sem recriar o cadastro.
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className={labelClassName}>
          Bateria (%)
          <input type="number" min="1" max="100" step="1" value={values.battery} onChange={(event) => update("battery", event.target.value)} className={inputClassName} placeholder="1 a 100" />
        </label>
        <label className={labelClassName}>
          Preço no PIX (R$)
          <input type="number" min="0" step="0.01" value={values.pixPrice} onChange={(event) => update("pixPrice", event.target.value)} className={inputClassName} inputMode="decimal" />
        </label>
        <label className={labelClassName}>
          Quantidade de parcelas
          <input type="number" min="1" max="24" step="1" value={values.installments} onChange={(event) => update("installments", event.target.value)} className={inputClassName} />
        </label>
        <label className={labelClassName}>
          Valor de cada parcela (R$)
          <input type="number" min="0" step="0.01" value={values.installmentPrice} onChange={(event) => update("installmentPrice", event.target.value)} className={inputClassName} inputMode="decimal" />
        </label>
        <label className={labelClassName}>
          IMEI (privado)
          <input value={values.imei} onChange={(event) => update("imei", event.target.value.replace(/\D/g, "").slice(0, 15))} className={inputClassName} inputMode="numeric" maxLength={15} placeholder="15 dígitos, opcional" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <label className={labelClassName}>
          Detalhes visíveis ao cliente
          <textarea value={values.details} onChange={(event) => update("details", event.target.value)} className={`${inputClassName} min-h-28 resize-y`} maxLength={2000} placeholder="Estado e informações da unidade" />
        </label>
        <label className={labelClassName}>
          Fotos reais da unidade (uma por linha)
          <textarea value={values.realImages} onChange={(event) => update("realImages", event.target.value)} className={`${inputClassName} min-h-28 resize-y`} placeholder="/assets/... ou https://www.comprefi.com/assets/..." aria-describedby="used-stock-photo-help" />
          <span id="used-stock-photo-help" className={`mt-1 block text-xs font-normal ${hasInvalidPhoto ? "text-red-300" : "text-zinc-500"}`}>
            {hasInvalidPhoto
              ? "Use apenas caminhos permitidos. Renders antigos não podem ser usados."
              : "A primeira foto será a capa. Rascunhos podem ficar sem fotos, mas a ativação exige ao menos uma foto real."}
          </span>
        </label>
      </div>

      <label className={`mt-4 ${labelClassName}`}>
        Notas internas (privadas)
        <textarea value={values.internalNotes} onChange={(event) => update("internalNotes", event.target.value)} className={`${inputClassName} min-h-24 resize-y`} maxLength={1500} placeholder="Não aparece na vitrine." />
      </label>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} disabled={saving} className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60">Cancelar</button>
        {onRequestActivation && <button type="button" onClick={onRequestActivation} disabled={saving || hasInvalidPhoto} className="rounded-md border border-[#ff6700]/60 px-4 py-2.5 text-sm font-medium text-[#ff8a42] transition-colors hover:bg-[#ff6700]/10 disabled:cursor-not-allowed disabled:opacity-60">Salvar e disponibilizar</button>}
        <button type="button" onClick={onSave} disabled={saving || hasInvalidPhoto} className="inline-flex items-center justify-center rounded-md bg-[#ff6700] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e85f00] disabled:cursor-not-allowed disabled:opacity-60"><Save size={17} className="mr-2" />{saving ? "Salvando..." : "Salvar rascunho"}</button>
      </div>
    </section>
  );
};

export default UsedStockEditor;
