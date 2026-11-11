import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Info, Link2 } from "lucide-react";
import { SubmissionAttempt } from "./submissionAttempt";
import { errorStatus, safeError } from "./api";
import { createPayload } from "./payload";
import ProductItemsEditor from "./ProductItemsEditor";
import { Button, Field, Panel, Select, Summary } from "./ui";
import { editableTerms } from "./lifecycle";
import {
  cardBase,
  cardFee,
  money,
  newSale,
  total,
  validateSale,
  type CatalogItem,
  type Payment,
  type Sale,
  type SheetActor,
} from "./model";

export default function SaleEditor({
  actor,
  catalog,
  catalogLoading,
  catalogError,
  initialSale,
  mode = "create",
  onCancel,
  onSave,
}: {
  actor: SheetActor;
  catalog: CatalogItem[];
  catalogLoading: boolean;
  catalogError: string;
  initialSale?: Sale;
  mode?: "create" | "edit";
  onCancel: () => void;
  onSave: (sale: Sale, idempotencyKey: string) => Promise<void>;
}) {
  const [sale, setSale] = useState<Sale>(() =>
    initialSale ? editableTerms(initialSale) : newSale(),
  );
  const [reviewing, setReviewing] = useState(false);
  const isEditing = mode === "edit";
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [locked, setLocked] = useState(false);
  const attempt = useRef(new SubmissionAttempt());
  const update = <K extends keyof Sale>(key: K, value: Sale[K]) => {
    setReviewing(false);
    setSale((current) => ({ ...current, [key]: value }));
  };
  const amount = (key: "base" | "pix" | "card" | "credit", value: string) => {
    setReviewing(false);
    const amountValue = value === "" ? 0 : Number(value);
    setSale((current) => ({
      ...current,
      [key]: amountValue,
      ...(key === "base" && current.payment === "pix"
        ? { pix: amountValue }
        : {}),
    }));
  };
  const changePayment = (payment: Payment) => {
    setReviewing(false);
    setSale((current) => ({
      ...current,
      payment,
      pix: payment === "pix" ? current.base : 0,
      card: payment === "pix" ? 0 : current.base,
    }));
  };
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    const message = validateSale(sale, catalog);
    if (message) {
      setError(message);
      return;
    }
    if (!reviewing) {
      setError("");
      setReviewing(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    let key: string | null;
    try {
      key = attempt.current.begin(JSON.stringify(createPayload(sale)));
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Confira o resultado com a equipe.",
      );
      return;
    }
    if (!key) return;
    setSaving(true);
    setError("");
    try {
      await onSave(sale, key);
      attempt.current.succeed();
    } catch (caught) {
      attempt.current.fail(errorStatus(caught));
      setLocked(!attempt.current.canEdit());
      setError(safeError(caught));
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <button
        className="cf-back"
        onClick={onCancel}
        disabled={saving || locked}
        type="button"
      >
        <ArrowLeft size={16} /> Pedidos
      </button>
      <div className="cf-page-heading">
        <div>
          <span className="cf-eyebrow">REGISTRE O COMBINADO</span>
          <h1>
            {reviewing
              ? "Confira antes de gerar o link"
              : isEditing
                ? "Editar pedido"
                : "Novo pedido"}
          </h1>
          <p>
            {isEditing
              ? "Corrija a negociação. Ao salvar, o link anterior deixará de funcionar."
              : "Preencha a negociação. O cliente completa o cadastro pelo link."}
          </p>
        </div>
      </div>
      <form className="cf-editor-grid" onSubmit={submit} aria-busy={saving}>
        <div className="cf-stack">
          <fieldset
            disabled={saving || locked}
            className="cf-form-fieldset cf-stack"
            style={reviewing ? { display: "none" } : undefined}
          >
            <Panel
              number="01"
              title="Atendimento e produtos"
              subtitle="Use o número da conversa no WhatsApp e selecione o que o cliente comprou."
            >
              <div className="cf-fields">
                <Field
                  label="WhatsApp do atendimento"
                  type="tel"
                  required
                  value={sale.whatsapp}
                  placeholder="(DDD) 90000-0000"
                  onChange={(event) => update("whatsapp", event.target.value)}
                  hint="Não será trocado automaticamente pelo celular do cadastro."
                />
                <Field
                  label="Responsável"
                  value={`${actor.name} · ${actor.role === "ADMIN" ? "administrador" : "vendedor"}`}
                  readOnly
                />
              </div>
              <ProductItemsEditor
                items={sale.items}
                catalog={catalog}
                loading={catalogLoading}
                error={catalogError}
                onChange={(items) => update("items", items)}
              />
            </Panel>
            <Panel
              number="02"
              title="Pagamento"
              subtitle="Informe o combinado. Inclua no cartão a taxa que você já acertou com o cliente."
            >
              <div className="cf-note">
                <Info size={17} />
                <p>
                  A volta já considera o seminovo. O crédito da troca não será
                  abatido novamente.
                </p>
              </div>
              <div className="cf-fields">
                <Field
                  label={
                    sale.hasTrade
                      ? "Volta negociada antes da taxa do cartão (R$)"
                      : "Valor negociado antes da taxa do cartão (R$)"
                  }
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={sale.base || ""}
                  onChange={(event) => amount("base", event.target.value)}
                />
                <Select
                  label="Pagamento combinado"
                  value={sale.payment}
                  onChange={(event) =>
                    changePayment(event.target.value as Payment)
                  }
                >
                  <option value="pix">PIX</option>
                  <option value="card">Cartão</option>
                  <option value="mixed">PIX + cartão</option>
                </Select>
                {sale.payment !== "card" && (
                  <Field
                    label="Valor no PIX (R$)"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    value={sale.pix || ""}
                    onChange={(event) => amount("pix", event.target.value)}
                  />
                )}
                {sale.payment !== "pix" && (
                  <>
                    <Field
                      label="Total final no cartão (R$)"
                      hint="Inclua o acréscimo já combinado."
                      type="number"
                      step="0.01"
                      min="0.01"
                      required
                      value={sale.card || ""}
                      onChange={(event) => amount("card", event.target.value)}
                    />
                    <Field
                      label="Número de parcelas"
                      type="number"
                      min="1"
                      max="24"
                      required
                      value={sale.installments}
                      onChange={(event) =>
                        update("installments", Number(event.target.value))
                      }
                    />
                  </>
                )}
              </div>
              <div className="cf-financial-total">
                {sale.payment !== "pix" && (
                  <>
                    <span>
                      Base destinada ao cartão <b>{money(cardBase(sale))}</b>
                    </span>
                    <span>
                      Acréscimo incluído <b>{money(cardFee(sale))}</b>
                    </span>
                  </>
                )}
                <span>
                  Total negociado <strong>{money(total(sale))}</strong>
                </span>
              </div>
            </Panel>
            <Panel
              number="03"
              title="Aparelho na troca"
              subtitle="Registre a avaliação já aprovada e o crédito atribuído ao aparelho."
            >
              <label className="cf-check">
                <input
                  type="checkbox"
                  checked={sale.hasTrade}
                  onChange={(event) => update("hasTrade", event.target.checked)}
                />
                <span>
                  O cliente entregará um aparelho como parte do pagamento.
                </span>
              </label>
              {sale.hasTrade && (
                <div className="cf-fields cf-space-top">
                  <Field
                    label="Modelo recebido"
                    required
                    value={sale.tradeModel}
                    onChange={(event) =>
                      update("tradeModel", event.target.value)
                    }
                  />
                  <Field
                    label="Capacidade"
                    required
                    value={sale.tradeStorage}
                    onChange={(event) =>
                      update("tradeStorage", event.target.value)
                    }
                  />
                  <Field
                    label="Cor do seminovo"
                    required
                    value={sale.tradeColor}
                    onChange={(event) =>
                      update("tradeColor", event.target.value)
                    }
                  />
                  <Field
                    label="Crédito aprovado (R$)"
                    required
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={sale.credit || ""}
                    onChange={(event) => amount("credit", event.target.value)}
                  />
                  <Field
                    label="IMEI / serial (opcional nesta etapa)"
                    value={sale.imei}
                    onChange={(event) => update("imei", event.target.value)}
                    hint="Se pendente, completar em termo de recebimento. Não inventar dados."
                  />
                  <Field
                    label="Estado, bateria, peças e acessórios"
                    value={sale.tradeNotes}
                    onChange={(event) =>
                      update("tradeNotes", event.target.value)
                    }
                  />
                </div>
              )}
            </Panel>
            <Panel number="04" title="Entrega e observações">
              <div className="cf-fields">
                <Select
                  label="Prazo combinado"
                  value={sale.delivery}
                  onChange={(event) =>
                    update("delivery", event.target.value as Sale["delivery"])
                  }
                >
                  <option value="standard">Padrão · 1 a 15 dias úteis</option>
                  <option value="date">Data máxima específica</option>
                </Select>
                {sale.delivery === "date" && (
                  <Field
                    label="Entregar até"
                    type="date"
                    required
                    value={sale.deadline}
                    onChange={(event) => update("deadline", event.target.value)}
                  />
                )}
                <Select
                  label="Modalidade"
                  value={sale.deliveryMode}
                  onChange={(event) =>
                    update("deliveryMode", event.target.value)
                  }
                >
                  <option>Entrega combinada</option>
                  <option>Retirada combinada</option>
                  <option>Envio por transportadora</option>
                </Select>
                <Field
                  wide
                  label="Observações da negociação (opcional)"
                  value={sale.notes}
                  onChange={(event) => update("notes", event.target.value)}
                />
              </div>
              <p className="cf-help">
                O prazo padrão é de 1 a 15 dias úteis após o pagamento total. Se
                escolher uma data máxima, ela será usada no contrato.
              </p>
            </Panel>
          </fieldset>
          {reviewing && (
            <section
              className="cf-review-before-link"
              aria-label="Revisão da negociação"
            >
              <Panel
                title="Esta é a negociação que o cliente verá"
                subtitle="Confira produtos, total, pagamento, troca e entrega antes de confirmar."
              >
                <dl className="cf-review">
                  <div>
                    <dt>WhatsApp do atendimento</dt>
                    <dd>{sale.whatsapp}</dd>
                  </div>
                </dl>
                <Summary sale={sale} showImages={false} />
                {sale.notes && (
                  <p className="cf-help">Observações: {sale.notes}</p>
                )}
                {sale.tradeNotes && (
                  <p className="cf-help">
                    Aparelho da troca: {sale.tradeNotes}
                  </p>
                )}
                <p className="cf-note">
                  {isEditing
                    ? "Salvar gera um novo link. Envie o novo link ao cliente; o anterior será bloqueado."
                    : "Gerar o link não cobra o cliente nem envia o cadastro ao CRM."}
                </p>
              </Panel>
            </section>
          )}
          {locked && (
            <p className="cf-note">
              Resultado ainda não confirmado. Os dados foram bloqueados; tente o
              mesmo envio. Não crie outro pedido antes de conferir a lista com a
              equipe.
            </p>
          )}
          {error && (
            <p className="cf-error" role="alert">
              {error}
            </p>
          )}
          <div className="cf-form-actions">
            <Button
              secondary
              onClick={reviewing ? () => setReviewing(false) : onCancel}
              disabled={saving || locked}
            >
              {reviewing ? "Voltar e corrigir" : "Voltar"}
            </Button>
            <Button type="submit" disabled={saving}>
              <Link2 size={17} />{" "}
              {saving
                ? isEditing
                  ? "Salvando alterações…"
                  : "Criando pedido…"
                : !reviewing
                  ? "Conferir pedido"
                  : isEditing
                    ? "Salvar e gerar novo link"
                    : "Confirmar e gerar link"}{" "}
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        <aside className="cf-sticky">
          <span className="cf-side-label">VISÃO DO CLIENTE</span>
          <Summary sale={sale} compact />
          <p className="cf-help">
            Valores são manuais; o catálogo não calcula a negociação. Nenhum
            envio confirma pagamento.
          </p>
        </aside>
      </form>
    </>
  );
}
