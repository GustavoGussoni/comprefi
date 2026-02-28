// ============================================
// Constantes Centralizadas — CompreFi
// ============================================

/** Número do WhatsApp para contato/vendas (sem +, formato internacional) */
export const WHATSAPP_NUMBER = "5534999252590";

/** Nome da empresa */
export const COMPANY_NAME = "CompreFi";

/** Textos padrão de garantia */
export const WARRANTY_NEW = "Lacrado | 1 ano de garantia";
export const WARRANTY_USED = "Garantia CompreFi";

/** Subtítulos padrão por tipo de produto */
export const SUBTITLE_NEW = "Lacrados | 1 ano de garantia Apple";
export const SUBTITLE_USED = "Aparelhos verificados com garantia";

/** Textos padrão da seção "Por que comprar na CompreFi?" */
export const DEFAULT_WHY_CHOOSE_ITEMS = [
  "Produtos lacrados com 1 ano de garantia oficial Apple",
  "Suporte Eterno para todos os produtos adquiridos",
  "Programa de indicações com desconto acumulativo",
  "Economia de até R$20.000 em comparação com lojas oficiais",
  "Atendimento personalizado por especialistas Apple",
];

/** Gera a mensagem de WhatsApp para um produto flat */
export function buildWhatsAppMessageFlat(
  model: string,
  storage: string | undefined,
  paymentMethod: "pix" | "card",
  pixPrice: string,
  installmentPrice: string | undefined,
): string {
  const price =
    paymentMethod === "pix"
      ? `${pixPrice} no PIX`
      : `12x ${installmentPrice || ""}`;
  const storageText = storage ? ` ${storage}` : "";
  return `Olá! Tenho interesse no ${model}${storageText} por ${price}`;
}

/** Gera a mensagem de WhatsApp para um produto agrupado */
export function buildWhatsAppMessageGrouped(
  model: string,
  storage: string,
  color: string,
  paymentMethod: "pix" | "card",
  pixPrice: string,
  installmentPrice: string,
): string {
  const price =
    paymentMethod === "pix"
      ? `${pixPrice} no PIX`
      : `12x ${installmentPrice}`;
  return `Olá! Tenho interesse no ${model} ${storage} ${color} por ${price}`;
}

/** Abre o WhatsApp com a mensagem */
export function openWhatsApp(message: string): void {
  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, "_blank");
}