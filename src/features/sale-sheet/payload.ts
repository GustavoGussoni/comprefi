import type { SheetTerms } from "./model";

/** SKU and CRM mapping are resolved and frozen only by the server. */
export function createPayload(terms: SheetTerms): SheetTerms {
  return {
    whatsapp: terms.whatsapp,
    base: terms.base,
    payment: terms.payment,
    pix: terms.pix,
    card: terms.card,
    installments: terms.installments,
    hasTrade: terms.hasTrade,
    tradeModel: terms.tradeModel,
    tradeStorage: terms.tradeStorage,
    tradeColor: terms.tradeColor,
    credit: terms.credit,
    imei: terms.imei,
    tradeNotes: terms.tradeNotes,
    delivery: terms.delivery,
    deadline: terms.deadline,
    deliveryMode: terms.deliveryMode,
    notes: terms.notes,
    items: terms.items.map((item) => ({
      lineId: item.lineId,
      variantId: item.variantId,
      groupSlug: item.groupSlug,
      product: item.product,
      color: item.color,
      storage: item.storage,
      condition: item.condition,
      quantity: item.quantity,
      image: "",
    })),
  };
}
