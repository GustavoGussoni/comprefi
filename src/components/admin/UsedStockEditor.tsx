import { AlertCircle, Save, X } from "lucide-react";
import { USED_STOCK_ILLUSTRATIONS, USED_STOCK_ILLUSTRATION_PATHS } from "@/data/used-stock-illustrations";
import { isAllowedUsedStockImage } from "@/lib/usedStock";

export interface UsedStockEditorValues {
  model: string;
  storage: string;
  color: string;
  battery: string;
  details: string;
  image: string;
  imageIsIllustrative: boolean;
  realImages: string;
  pixPrice: string;
  installments: string;
  installmentPrice: string;
  imei: string;
  internalNotes: string;
}

interface UsedStockEditorProps {
  values: UsedStockEditorValues;
  title: string;
  saving: boolean;
  error: string | null;
  onChange: (values: UsedStockEditorValues) => void;
  onSave: () => void;
  onCancel: () => void;
  onRequestActivation?: () => void;
}

const inputClassName = "mt-1 w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white placeholder:text-zinc-600 focus:border-[#ff6700] focus:outline-none focus:ring-1 focus:ring-[#ff6700]";
const labelClassName = "block text-xs font-medium text-zinc-300";

const UsedStockEditor: React.FC<UsedStockEditorProps> = ({
  values,
  title,
  saving,
  error,
  onChange,
  onSave,
  onCancel,
  onRequestActivation,
}) => {
  const update = <K extends keyof UsedStockEditorValues>(key: K, value: UsedStockEditorValues[K]) => {
    onChange({ ...values, [key]: value });
  };
  const imageIsCustom = values.image !== "" && !USED_STOCK_ILLUSTRATION_PATHS.includes(values.image as (typeof USED_STOCK_ILLUSTRATION_PATHS)[number]);
  const imageIsInvalid = values.image !== "" && !isAllowedUsedStockImage(values.image);

  return (
    <section className="rounded-xl border border-white/10 bg-[#111] p-4 shadow-xl sm:p-6" aria-labelledby="used-stock-editor-title">
      <div className="flex flex-col justify-between gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-start">
        <div>
          <h2 id="used-stock-editor-title" className="text-lg font-semibold text-white">{title}</h2>
          <p className="mt-1 text-sm text-zinc-400">Salve o rascunho antes de disponibilizar a unidade. Os preços são informados manualmente.</p>
        </div>
        <button type="button" onClick={onCancel} className="self-start rounded-lg p-2 text-zinc-400 hover:bg-white/5 hover:text-white" aria-label="Fechar editor">
          <X size={18} />
        </button>
      </div>

      {error && (
        <div role="alert" className="mt-4 flex gap-2 rounded-lg border border-red-700/70 bg-red-950/40 p-3 text-sm text-red-100">
          <AlertCircle size={18} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <label className={labelClassName}>Modelo *
          <input value={values.model} onChange={(event) => update("model", event.target.value)} className={inputClassName} maxLength={180} required />
        </label>
        <label className={labelClassName}>Capacidade *
          <input value={values.storage} onChange={(event) => update("storage", event.target.value)} className={inputClassName} maxLength={80} required placeholder="Ex.: 256 GB" />
        </label>
        <label className={labelClassName}>Cor *
          <input value={values.color} onChange={(event) => update("color", event.target.value)} className={inputClassName} maxLength={120} required />
        </label>
        <label className={labelClassName}>Bateria (%)
          <input type="number" min="1" max="100" step="1" value={values.battery} onChange={(event) => update("battery", event.target.value)} className={inputClassName} placeholder="1 a 100" />
        </label>
        <label className={labelClassName}>Preço no PIX (R$)
          <input type="number" min="0" step="0.01" value={values.pixPrice} onChange={(event) => update("pixPrice", event.target.value)} className={inputClassName} inputMode="decimal" />
        </label>
        <label className={labelClassName}>Quantidade de parcelas
          <input type="number" min="1" max="24" step="1" value={values.installments} onChange={(event) => update("installments", event.target.value)} className={inputClassName} />
        </label>
        <label className={labelClassName}>Valor de cada parcela (R$)
          <input type="number" min="0" step="0.01" value={values.installmentPrice} onChange={(event) => update("installmentPrice", event.target.value)} className={inputClassName} inputMode="decimal" />
        </label>
        <label className={labelClassName}>IMEI (privado)
          <input value={values.imei} onChange={(event) => update("imei", event.target.value.replace(/\D/g, "").slice(0, 15))} className={inputClassName} inputMode="numeric" maxLength={15} placeholder="15 dígitos, opcional" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="used-stock-image-select">Ilustração da unidade</label>
          <select
            id="used-stock-image-select"
            value={imageIsCustom ? "custom" : values.image}
            onChange={(event) => update("image", event.target.value === "custom" ? "" : event.target.value)}
            className={inputClassName}
          >
            <option value="">Selecione depois (rascunho)</option>
            {USED_STOCK_ILLUSTRATIONS.map((illustration) => (
              <option key={illustration.value} value={illustration.value}>{illustration.label}</option>
            ))}
            <option value="custom">Outro caminho permitido</option>
          </select>
          {(imageIsCustom || values.image === "") && (
            <input
              value={values.image}
              onChange={(event) => update("image", event.target.value)}
              className={inputClassName}
              placeholder="/assets/... ou https://www.comprefi.com/assets/..."
              aria-describedby="used-stock-image-help"
            />
          )}
          <p id="used-stock-image-help" className={`mt-1 text-xs ${imageIsInvalid ? "text-red-300" : "text-zinc-500"}`}>
            {imageIsInvalid ? "Use somente /assets/... ou https://www.comprefi.com/assets/..." : "As imagens exibidas ao público devem ser identificadas como ilustrativas."}
          </p>
          <label className="mt-3 flex items-center gap-2 text-sm text-zinc-300">
            <input type="checkbox" checked={values.imageIsIllustrative} onChange={(event) => update("imageIsIllustrative", event.target.checked)} className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 accent-[#ff6700]" />
            Marcar como imagem ilustrativa
          </label>
        </div>
        <label className={labelClassName}>Detalhes visíveis ao cliente
          <textarea value={values.details} onChange={(event) => update("details", event.target.value)} className={`${inputClassName} min-h-28 resize-y`} maxLength={2000} placeholder="Estado e informações da unidade" />
        </label>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <label className={labelClassName}>Outras imagens permitidas (uma por linha)
          <textarea value={values.realImages} onChange={(event) => update("realImages", event.target.value)} className={`${inputClassName} min-h-24 resize-y`} placeholder="/assets/..." />
          <span className="mt-1 block text-xs font-normal text-zinc-500">Somente caminhos permitidos. Esta tela não utiliza fotos antigas como oferta atual.</span>
        </label>
        <label className={labelClassName}>Notas internas (privadas)
          <textarea value={values.internalNotes} onChange={(event) => update("internalNotes", event.target.value)} className={`${inputClassName} min-h-24 resize-y`} maxLength={1500} placeholder="Não aparece na vitrine." />
        </label>
      </div>

      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} disabled={saving} className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 transition-colors hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-60">Cancelar</button>
        {onRequestActivation && <button type="button" onClick={onRequestActivation} disabled={saving || imageIsInvalid} className="rounded-md border border-[#ff6700]/60 px-4 py-2.5 text-sm font-medium text-[#ff8a42] transition-colors hover:bg-[#ff6700]/10 disabled:cursor-not-allowed disabled:opacity-60">Salvar e disponibilizar</button>}
        <button type="button" onClick={onSave} disabled={saving || imageIsInvalid} className="inline-flex items-center justify-center rounded-md bg-[#ff6700] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#e85f00] disabled:cursor-not-allowed disabled:opacity-60"><Save size={17} className="mr-2" />{saving ? "Salvando..." : "Salvar rascunho"}</button>
      </div>
    </section>
  );
};

export default UsedStockEditor;
