import type { UsedStockPublicUnit } from "@/services/api";

export function formatUsedStockMoney(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function formatUsedStockInstallment(
  installments: number,
  installmentPrice: number,
): string {
  return `${installments}x de ${formatUsedStockMoney(installmentPrice)}`;
}

/** Espelha a política de imagens do backend para feedback imediato no editor. */
export function isAllowedUsedStockImage(value: string): boolean {
  const hasControlCharacter = Array.from(value).some((character) => {
    const code = character.charCodeAt(0);
    return code <= 31 || code === 127;
  });
  if (!value || hasControlCharacter || /[?#\\]/.test(value)) return false;

  if (value.startsWith("/assets/")) {
    const segments = value.slice("/assets/".length).split("/");
    return (
      /^\/assets\/[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(value) &&
      segments.every(
        (segment) => segment.length > 0 && segment !== "." && segment !== "..",
      )
    );
  }

  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "www.comprefi.com" &&
      url.port === "" &&
      url.username === "" &&
      url.password === "" &&
      !url.search &&
      !url.hash &&
      isAllowedUsedStockImage(url.pathname)
    );
  } catch {
    return false;
  }
}

export function buildUsedStockWhatsAppMessage(
  unit: UsedStockPublicUnit,
  paymentMethod: "pix" | "card",
): string {
  const chosenPayment = paymentMethod === "pix" ? "PIX" : "cartão";
  const battery = unit.battery === null ? "não informada" : `${unit.battery}%`;

  return [
    "Olá! Tenho interesse nesta unidade de seminovo.",
    `Unidade: ${unit.id}`,
    `${unit.model} ${unit.storage}, cor ${unit.color}, bateria ${battery}.`,
    `Valores: ${formatUsedStockMoney(unit.pixPrice)} no PIX ou ${formatUsedStockInstallment(unit.installments, unit.installmentPrice)} no cartão.`,
    `Forma de pagamento desejada: ${chosenPayment}.`,
  ].join(" ");
}

export function usedStockUnitName(unit: Pick<UsedStockPublicUnit, "model" | "storage" | "color">): string {
  return `${unit.model} ${unit.storage} • ${unit.color}`;
}
