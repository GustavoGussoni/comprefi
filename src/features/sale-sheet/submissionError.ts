export const DELIVERY_DEADLINE_EXPIRED_MESSAGE =
  "O prazo máximo de entrega desta ficha venceu. Entre em contato com a CompreFi para revisar a negociação e receber uma nova ficha.";

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
