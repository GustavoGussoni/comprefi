import { useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Info, Link2 } from "lucide-react";
import { SubmissionAttempt } from "./submissionAttempt";
import { errorStatus, safeError } from "./api";
import { createPayload } from "./payload";
import ProductItemsEditor from "./ProductItemsEditor";
import { Button, Field, Panel, Select, Summary } from "./ui";
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
  onCancel,
  onSave,
}: {
  actor: SheetActor;
  catalog: CatalogItem[];
  catalogLoading: boolean;
  catalogError: string;
  onCancel: () => void;
  onSave: (sale: Sale, idempotencyKey: string) => Promise<void>;
}) {
  const [sale, setSale] = useState<Sale>(newSale);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [locked, setLocked] = useState(false);
  const attempt = useRef(new SubmissionAttempt());
  const update = <K extends keyof Sale>(key: K, value: Sale[K]) =>
    setSale((current) => ({ ...current, [key]: value }));
  const amount = (key: "base" | "pix" | "card" | "credit", value: string) => {
    const amountValue = value === "" ? 0 : Number(value);
    setSale((current) => ({
      ...current,
      [key]: amountValue,
      ...(key === "base" && current.payment === "pix"
        ? { pix: amountValue }
        : {}),
    }));
  };
  const changePayment = (payment: Payment) =>
    setSale((current) => ({
      ...current,
      payment,
      pix: payment === "pix" ? current.base : 0,
      card: payment === "pix" ? 0 : current.base,
    }));
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (saving) return;
    const message = validateSale(sale, catalog);
    if (message) {
      setError(message);
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
        <ArrowLeft size={16} /> Fichas de venda
      </button>
      <div className="cf-page-heading">
        <div>
          <span className="cf-eyebrow">NEGOCIAÇÃO FECHADA</span>
          <h1>Nova ficha de venda</h1>
          <p>
            Registre o combinado. O cliente só completa os dados cadastrais.
          </p>
        </div>
      </div>
      <form className="cf-editor-grid" onSubmit={submit} aria-busy={saving}>
        <div className="cf-stack">
          <fieldset
            disabled={saving || locked}
            className="cf-form-fieldset cf-stack"
          >
            <Panel
              number="01"
              title="Atendimento e produtos"
              subtitle="O WhatsApp mantém a referência da conversa, sem alterar o contato automaticamente. SKU é resolvido pelo servidor."
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
              title="Condição financeira"
              subtitle="Informe os valores finais negociados, sem calcular taxas automaticamente."
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
                      ? "Volta base negociada (R$)"
                      : "Valor base negociado (R$)"
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
                  Total financeiro contratado{" "}
                  <strong>{money(total(sale))}</strong>
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
                O padrão começa após a confirmação do pagamento. Uma data máxima
                manual substitui esse prazo no contrato.
              </p>
            </Panel>
          </fieldset>
          {locked && (
            <p className="cf-note">
              Resultado ainda não confirmado. Os dados foram bloqueados; tente o
              mesmo envio. Não crie outra ficha antes de conferir a lista com a
              equipe.
            </p>
          )}
          {error && (
            <p className="cf-error" role="alert">
              {error}
            </p>
          )}
          <div className="cf-form-actions">
            <Button secondary onClick={onCancel} disabled={saving || locked}>
              Cancelar
            </Button>
            <Button type="submit" disabled={saving}>
              <Link2 size={17} />{" "}
              {saving ? "Criando ficha…" : "Gerar link seguro"}{" "}
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
