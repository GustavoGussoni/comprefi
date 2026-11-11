export const DELIVERY_DEADLINE_EXPIRED_MESSAGE =
  "O prazo de entrega combinado para esta compra venceu. Fale com a CompreFi para revisar o pedido e receber um novo link.";

/** Only known error codes produce customer-facing copy; raw server messages are never shown. */
export function publicSubmissionValidationMessage(
  status: number,
  body: unknown,
): string | undefined {
  if (
    status === 400 &&
    body &&
    typeof body === "object" &&
    !Array.isArray(body) &&
    "code" in body &&
    body.code === "delivery_deadline_expired"
  ) {
    return DELIVERY_DEADLINE_EXPIRED_MESSAGE;
  }
  return undefined;
}
