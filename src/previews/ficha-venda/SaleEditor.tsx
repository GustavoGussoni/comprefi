import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Link2, Info } from "lucide-react";
import { Button, Field, Select, Panel, Summary } from "./ui";
import {
  newSale,
  exampleSale,
  validateSale,
  total,
  cardBase,
  cardFee,
  money,
  type Sale,
  type Payment,
} from "./model";

export default function SaleEditor({
  onCancel,
  onSave,
}: {
  onCancel: () => void;
  onSave: (sale: Sale) => void;
}) {
  const [sale, setSale] = useState<Sale>(newSale);
  const [error, setError] = useState("");
  const update = <K extends keyof Sale>(key: K, value: Sale[K]) =>
    setSale(s => ({ ...s, [key]: value }));
  const amount = (key: "base" | "pix" | "card" | "credit", value: string) => {
    const n = value === "" ? 0 : Number(value);
    setSale(s => ({
      ...s,
      [key]: n,
      ...(key === "base" && s.payment === "pix" ? { pix: n } : {}),
    }));
  };
  const changePayment = (payment: Payment) =>
    setSale(s => ({
      ...s,
      payment,
      pix: payment === "pix" ? s.base : 0,
      card: payment === "pix" ? 0 : s.base,
    }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    const message = validateSale(sale);
    if (message) {
      setError(message);
      return;
    }
    onSave({
      ...sale,
      reference: `CF-DEMO-${Date.now().toString().slice(-5)}`,
    });
  };
  return (
    <>
      <button className="cf-back" onClick={onCancel}>
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
        <Button
          secondary
          onClick={() =>
            setSale({
              ...exampleSale(),
              id: crypto.randomUUID(),
              reference: "NOVA",
            })
          }
        >
          Usar exemplo fictício
        </Button>
      </div>
      <form className="cf-editor-grid" onSubmit={submit}>
        <div className="cf-stack">
          <Panel
            number="01"
            title="Atendimento e produto"
            subtitle="O WhatsApp mantém a referência da conversa no DataCrazy."
          >
            <div className="cf-fields">
              <Field
                label="WhatsApp do atendimento"
                type="tel"
                required
                value={sale.whatsapp}
                placeholder="(DDD) 90000-0000"
                onChange={e => update("whatsapp", e.target.value)}
                hint="Não será trocado automaticamente pelo celular do cadastro."
              />
              <Field
                label="Responsável"
                value="Iago · vendedor (prévia)"
                readOnly
              />
              <Field
                label="Produto vendido"
                required
                value={sale.product}
                onChange={e => update("product", e.target.value)}
                placeholder="Ex.: iPhone Duo"
              />
              <Field
                label="Cor"
                required
                value={sale.color}
                onChange={e => update("color", e.target.value)}
                placeholder="Ex.: Night Sky"
              />
              <Field
                label="Armazenamento"
                required
                value={sale.storage}
                onChange={e => update("storage", e.target.value)}
              />
              <Select
                label="Condição"
                value={sale.condition}
                onChange={e => update("condition", e.target.value)}
              >
                <option>Novo e lacrado</option>
                <option>Seminovo</option>
              </Select>
              <Field
                label="Quantidade"
                type="number"
                min="1"
                max="20"
                required
                value={sale.quantity}
                onChange={e => update("quantity", Number(e.target.value))}
              />
            </div>
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
                onChange={e => amount("base", e.target.value)}
              />
              <Select
                label="Pagamento combinado"
                value={sale.payment}
                onChange={e => changePayment(e.target.value as Payment)}
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
                  onChange={e => amount("pix", e.target.value)}
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
                    onChange={e => amount("card", e.target.value)}
                  />
                  <Field
                    label="Número de parcelas"
                    type="number"
                    min="1"
                    max="24"
                    required
                    value={sale.installments}
                    onChange={e =>
                      update("installments", Number(e.target.value))
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
                onChange={e => update("hasTrade", e.target.checked)}
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
                  onChange={e => update("tradeModel", e.target.value)}
                />
                <Field
                  label="Capacidade"
                  required
                  value={sale.tradeStorage}
                  onChange={e => update("tradeStorage", e.target.value)}
                />
                <Field
                  label="Cor do seminovo"
                  required
                  value={sale.tradeColor}
                  onChange={e => update("tradeColor", e.target.value)}
                />
                <Field
                  label="Crédito aprovado (R$)"
                  required
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={sale.credit || ""}
                  onChange={e => amount("credit", e.target.value)}
                />
                <Field
                  label="IMEI / serial (opcional nesta etapa)"
                  value={sale.imei}
                  onChange={e => update("imei", e.target.value)}
                  hint="Se pendente, completar em termo de recebimento. Não inventar dados."
                />
                <Field
                  label="Estado, bateria, peças e acessórios"
                  value={sale.tradeNotes}
                  onChange={e => update("tradeNotes", e.target.value)}
                />
              </div>
            )}
          </Panel>
          <Panel number="04" title="Entrega e observações">
            <div className="cf-fields">
              <Select
                label="Prazo combinado"
                value={sale.delivery}
                onChange={e =>
                  update("delivery", e.target.value as Sale["delivery"])
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
                  onChange={e => update("deadline", e.target.value)}
                />
              )}
              <Select
                label="Modalidade"
                value={sale.deliveryMode}
                onChange={e => update("deliveryMode", e.target.value)}
              >
                <option>Entrega combinada</option>
                <option>Retirada combinada</option>
                <option>Envio por transportadora</option>
              </Select>
              <Field
                wide
                label="Observações da negociação (opcional)"
                value={sale.notes}
                onChange={e => update("notes", e.target.value)}
              />
            </div>
            <p className="cf-help">
              O padrão começa após a confirmação do pagamento. Uma data máxima
              manual substitui esse prazo no contrato.
            </p>
          </Panel>
          {error && (
            <p className="cf-error" role="alert">
              {error}
            </p>
          )}
          <div className="cf-form-actions">
            <Button secondary onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              <Link2 size={17} /> Gerar link demonstrativo{" "}
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>
        <aside className="cf-sticky">
          <span className="cf-side-label">VISÃO DO CLIENTE</span>
          <Summary sale={sale} compact />
          <p className="cf-help">
            Os dados ficam apenas na memória desta prévia. Nenhum link real é
            enviado.
          </p>
        </aside>
      </form>
    </>
  );
}
