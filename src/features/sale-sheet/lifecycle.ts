import type { SheetActor, SheetSnapshot, SheetTerms } from "./model";

export type SheetBucket = "active" | "finalized" | "cancelled" | "archived";
export const bucketLabels: Record<SheetBucket, string> = {
  active: "Em andamento",
  finalized: "Finalizados",
  cancelled: "Cancelados",
  archived: "Arquivados",
};
export function sheetBucket(sheet: SheetSnapshot): SheetBucket {
  if (sheet.archivedAt) return "archived";
  if (sheet.revoked) return "cancelled";
  return sheet.finalizedAt ? "finalized" : "active";
}
export function ownsSheet(actor: SheetActor, sheet: SheetSnapshot): boolean {
  return actor.role === "ADMIN" || sheet.createdBy.id === actor.id;
}
export function canEditSheet(sheet: SheetSnapshot): boolean {
  return (
    !sheet.submittedAt &&
    !sheet.revoked &&
    !sheet.archivedAt &&
    !sheet.finalizedAt
  );
}
export function canFinalizeSheet(sheet: SheetSnapshot): boolean {
  return (
    Boolean(sheet.submittedAt) &&
    !sheet.revoked &&
    !sheet.archivedAt &&
    !sheet.finalizedAt
  );
}
export function canReopenSheet(sheet: SheetSnapshot): boolean {
  // Reopening never implicitly unarchives or reactivates a cancelled link.
  return Boolean(sheet.finalizedAt);
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
  if (sheet.finalizedAt) return "Finalizado";
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
