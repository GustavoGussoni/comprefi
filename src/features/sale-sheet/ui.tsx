import type {
  ReactNode,
  InputHTMLAttributes,
  SelectHTMLAttributes,
  MouseEventHandler,
} from "react";
import { useId, useState } from "react";
import {
  ArrowUpRight,
  ShieldCheck,
  Smartphone,
  Truck,
  RefreshCw,
} from "lucide-react";
import {
  money,
  deliveryText,
  paymentName,
  total,
  cardFee,
  unitCount,
  type SaleItem,
  type Sale,
} from "./model";

export function Brand() {
  return (
    <div className="cf-brand">
      <span className="cf-mark" aria-hidden="true" />
      CompreFi
      <span className="cf-brand-divider" />
      <span className="cf-brand-caption">com você, do início ao novo.</span>
    </div>
  );
}
export function Button({
  children,
  onClick,
  secondary,
  disabled,
  type = "button",
  className = "",
}: {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  secondary?: boolean;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cf-button ${secondary ? "cf-button-secondary" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
export function Field({
  label,
  hint,
  wide,
  error,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
  wide?: boolean;
  error?: string;
}) {
  const generatedId = useId();
  const inputId = props.id || `cf-field-${generatedId}`;
  const hintId = `${inputId}-hint`;
  const errorId = `${inputId}-error`;
  const describedBy =
    [props["aria-describedby"], hint ? hintId : "", error ? errorId : ""]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <label className={`cf-field ${wide ? "cf-wide" : ""}`}>
      <span>
        {label}
        {props.required && <b aria-hidden="true"> *</b>}
      </span>
      <input
        aria-label={label}
        {...props}
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      <small id={hintId}>{hint}</small>
      {error && (
        <small id={errorId} className="cf-field-error" role="alert">
          {error}
        </small>
      )}
    </label>
  );
}
export function Select({
  label,
  children,
  error,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  children: ReactNode;
  error?: string;
}) {
  const generatedId = useId();
  const selectId = props.id || `cf-select-${generatedId}`;
  const errorId = `${selectId}-error`;
  const describedBy =
    [props["aria-describedby"], error ? errorId : ""]
      .filter(Boolean)
      .join(" ") || undefined;
  return (
    <label className="cf-field">
      <span>{label}</span>
      <select
        aria-label={label}
        {...props}
        id={selectId}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      >
        {children}
      </select>
      {error && (
        <small id={errorId} className="cf-field-error" role="alert">
          {error}
        </small>
      )}
    </label>
  );
}
export function Panel({
  number,
  title,
  subtitle,
  children,
}: {
  number?: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="cf-panel">
      <div className="cf-panel-heading">
        {number && <span className="cf-number">{number}</span>}
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "green" | "orange" | "neutral" | "red";
}) {
  return (
    <span className={`cf-badge cf-badge-${tone}`}>
      <i />
      {children}
    </span>
  );
}
export function ProductThumbnail({ item }: { item: SaleItem }) {
  const [failedSource, setFailedSource] = useState("");
  return (
    <span className="cf-product-photo">
      {item.image && failedSource !== item.image ? (
        <img
          src={item.image}
          alt={`${item.product} — ${item.color}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailedSource(item.image)}
        />
      ) : (
        <span className="cf-photo-empty">
          <Smartphone size={27} strokeWidth={1.3} />
          <small>Sem foto</small>
        </span>
      )}
    </span>
  );
}
export function Summary({
  sale,
  compact = false,
  showSku = false,
  showImages = true,
}: {
  sale: Sale;
  compact?: boolean;
  showSku?: boolean;
  showImages?: boolean;
}) {
  return (
    <div className={`cf-summary ${compact ? "cf-summary-compact" : ""}`}>
      <div className="cf-summary-top">
        <span className="cf-eyebrow">SUA COMPRA</span>
        <ShieldCheck size={17} />
      </div>
      <div className="cf-items-summary-heading">
        <span>Produtos</span>
        <small>{unitCount(sale)} unidade(s)</small>
      </div>
      {sale.items.map((item) => (
        <div className="cf-product cf-product-line" key={item.lineId}>
          {showImages && <ProductThumbnail item={item} />}
          <div>
            <h3>{item.product || "Produto a selecionar"}</h3>
            <p>
              {item.storage || "Capacidade a definir"} <span>·</span>{" "}
              {item.color || "Cor a definir"}
            </p>
            <small>
              {item.condition} <span>·</span> {item.quantity} unidade(s)
            </small>
            {showSku && item.variantId && (
              <small>SKU: {item.crmSku || "Pendente"}</small>
            )}
          </div>
        </div>
      ))}
      {sale.hasTrade && (
        <div className="cf-trade-summary">
          <RefreshCw size={16} />
          <div>
            <strong>Seu aparelho entra na troca</strong>
            <p>
              {sale.tradeModel || "Aparelho a informar"} · {sale.tradeStorage}
            </p>
            <small>
              {sale.tradeColor || "Cor a informar"} · crédito acordado:{" "}
              {money(sale.credit)}
            </small>
          </div>
        </div>
      )}
      <div className="cf-price">
        <span>{sale.hasTrade ? "Volta combinada" : "Valor combinado"}</span>
        <strong>{money(total(sale))}</strong>
        <small>
          {sale.hasTrade
            ? "O crédito da troca já está abatido."
            : "Condição definida com seu vendedor."}
        </small>
      </div>
      <dl className="cf-money-lines">
        <div>
          <dt>Forma de pagamento</dt>
          <dd>{paymentName(sale.payment)}</dd>
        </div>
        {sale.pix > 0 && (
          <div>
            <dt>PIX</dt>
            <dd>{money(sale.pix)}</dd>
          </div>
        )}
        {sale.card > 0 && (
          <>
            <div>
              <dt>Cartão · {sale.installments}x</dt>
              <dd>{money(sale.card)}</dd>
            </div>
            <div>
              <dt>Parcela aproximada</dt>
              <dd>{money(sale.card / sale.installments)}</dd>
            </div>
            {cardFee(sale) > 0 && (
              <div>
                <dt>Taxa do cartão já incluída</dt>
                <dd>{money(cardFee(sale))}</dd>
              </div>
            )}
          </>
        )}
      </dl>
      <div className="cf-delivery">
        <Truck size={18} />
        <div>
          <strong>Entrega combinada</strong>
          <p>{deliveryText(sale)}</p>
          {sale.hasTrade && (
            <small>Recebemos seu seminovo na entrega do novo.</small>
          )}
        </div>
      </div>
      {!compact && (
        <p className="cf-summary-note">
          Algum detalhe diferente do combinado? Fale com seu vendedor antes de
          enviar o cadastro. <ArrowUpRight size={13} />
        </p>
      )}
    </div>
  );
}
