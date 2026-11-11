import type { SheetActor, SheetSnapshot, SheetTerms } from "./model";

export type SheetBucket = "active" | "cancelled" | "archived";
export const bucketLabels: Record<SheetBucket, string> = {
  active: "Em andamento",
  cancelled: "Cancelados",
  archived: "Arquivados",
};
export function sheetBucket(sheet: SheetSnapshot): SheetBucket {
  if (sheet.archivedAt) return "archived";
  return sheet.revoked ? "cancelled" : "active";
}
export function ownsSheet(actor: SheetActor, sheet: SheetSnapshot): boolean {
  return actor.role === "ADMIN" || sheet.createdBy.id === actor.id;
}
export function canEditSheet(sheet: SheetSnapshot): boolean {
  return !sheet.submittedAt && !sheet.revoked && !sheet.archivedAt;
}
export function canArchiveSheet(sheet: SheetSnapshot): boolean {
  return Boolean(sheet.submittedAt || sheet.revoked) && !sheet.archivedAt;
}
export function canUnarchiveSheet(sheet: SheetSnapshot): boolean {
  return Boolean(sheet.archivedAt);
}
export function sheetStateLabel(sheet: SheetSnapshot): string {
  if (sheet.archivedAt) return "Arquivado";
  if (sheet.revoked) return "Cancelado";
  return sheet.submittedAt ? "Cadastro recebido" : "Aguardando cliente";
}
/** Only commercial fields enter the editor; customer/document/task data never do. */
export function editableTerms(sheet: SheetTerms): SheetTerms {
  return {
    whatsapp: sheet.whatsapp,
    items: sheet.items.map((item) => ({ ...item })),
    base: sheet.base,
    payment: sheet.payment,
    pix: sheet.pix,
    card: sheet.card,
    installments: sheet.installments,
    hasTrade: sheet.hasTrade,
    tradeModel: sheet.tradeModel,
    tradeStorage: sheet.tradeStorage,
    tradeColor: sheet.tradeColor,
    credit: sheet.credit,
    imei: sheet.imei,
    tradeNotes: sheet.tradeNotes,
    delivery: sheet.delivery,
    deadline: sheet.deadline,
    deliveryMode: sheet.deliveryMode,
    notes: sheet.notes,
  };
}
