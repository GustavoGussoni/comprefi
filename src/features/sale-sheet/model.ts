export type Payment = "pix" | "card" | "mixed";
export type SheetRole = "ADMIN" | "SALES";
export type CrmDeliveryMode = "disabled" | "datacrazy";

export type SheetActor = {
  id: string;
  name: string;
  email: string;
  role: SheetRole;
};
export type SaleItem = {
  lineId: string;
  variantId: string | null;
  groupSlug: string;
  product: string;
  color: string;
  storage: string;
  condition: string;
  quantity: number;
  image: string;
  crmSku?: string;
  crmProductId?: string;
  crmMappingStatus?: "confirmed" | "pending" | "manual";
};
export type CatalogItem = Omit<
  SaleItem,
  "lineId" | "quantity" | "variantId"
> & {
  id: string;
  category: string;
  model: string;
};
export type Client = {
  name: string;
  cpf: string;
  phone: string;
  email: string;
  birth: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  district: string;
  city: string;
  state: string;
  instagram: string;
};
export type SheetTerms = {
  whatsapp: string;
  items: SaleItem[];
  base: number;
  payment: Payment;
  pix: number;
  card: number;
  installments: number;
  hasTrade: boolean;
  tradeModel: string;
  tradeStorage: string;
  tradeColor: string;
  credit: number;
  imei: string;
  tradeNotes: string;
  delivery: "standard" | "date";
  deadline: string;
  deliveryMode: string;
  notes: string;
};
export type SheetTask = {
  status:
    | "waiting"
    | "ready"
    | "disabled"
    | "failed"
    | "sent"
    | "sending"
    | "uncertain";
  attempts: number;
  error?: string;
  deliveryMode?: CrmDeliveryMode;
};
export type SheetSnapshot = SheetTerms & {
  id: string;
  reference: string;
  createdAt: string;
  createdBy: SheetActor;
  revision: number;
  customer?: Client;
  submittedAt?: string;
  contractIssuedAt?: string;
  contractTemplateVersion?: string;
  linkExpiresAt: string;
  revoked: boolean;
  crm: SheetTask;
  pdf: SheetTask;
  crmAttachment: SheetTask;
};
export type PublicSheet = SheetTerms & {
  id: string;
  reference: string;
  createdAt: string;
  revision: number;
  linkExpiresAt: string;
  revoked: boolean;
  submitted: boolean;
};
export type Sale = SheetTerms;

export const newItem = (): SaleItem => ({
  lineId: crypto.randomUUID(),
  variantId: null,
  groupSlug: "",
  product: "",
  color: "",
  storage: "",
  condition: "Novo e lacrado",
  quantity: 1,
  image: "",
});
export const itemFromCatalog = (
  variant: CatalogItem,
  previous?: SaleItem,
): SaleItem => ({
  lineId: previous?.lineId || crypto.randomUUID(),
  variantId: variant.id,
  groupSlug: variant.groupSlug,
  product: variant.product || variant.model,
  color: variant.color,
  storage: variant.storage,
  condition: variant.condition || "",
  quantity: previous?.quantity || 1,
  image: variant.image,
  crmSku: variant.crmSku,
  crmProductId: variant.crmProductId,
  crmMappingStatus: variant.crmMappingStatus,
});
export const itemTitle = (sale: SheetTerms) =>
  sale.items.map((item) => item.product || "Produto a selecionar").join(" + ");
export const unitCount = (sale: SheetTerms) =>
  sale.items.reduce((sum, item) => sum + item.quantity, 0);
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value,
  );
export const digits = (value: string) => value.replace(/\D/g, "");
export const paymentName = (payment: Payment) =>
  ({ pix: "PIX", card: "Cartão", mixed: "PIX + cartão" })[payment];
export const cardBase = (sale: SheetTerms) =>
  sale.payment === "pix" ? 0 : sale.base - sale.pix;
export const cardFee = (sale: SheetTerms) =>
  sale.payment === "pix" ? 0 : sale.card - cardBase(sale);
export const total = (sale: SheetTerms) => sale.pix + sale.card;
export const deliveryText = (sale: SheetTerms) =>
  sale.delivery === "date" && sale.deadline
    ? `Até ${sale.deadline.split("-").reverse().join("/")} — data máxima combinada`
    : "De 1 a 15 dias úteis após a confirmação do pagamento";

export const emptyClient: Client = {
  name: "",
  cpf: "",
  phone: "",
  email: "",
  birth: "",
  cep: "",
  street: "",
  number: "",
  complement: "",
  district: "",
  city: "",
  state: "",
  instagram: "",
};
export const newSale = (): Sale => ({
  whatsapp: "",
  items: [newItem()],
  base: 0,
  payment: "pix",
  pix: 0,
  card: 0,
  installments: 1,
  hasTrade: false,
  tradeModel: "",
  tradeStorage: "",
  tradeColor: "",
  credit: 0,
  imei: "",
  tradeNotes: "",
  delivery: "standard",
  deadline: "",
  deliveryMode: "Entrega combinada",
  notes: "",
});
export function validateSale(
  sale: Sale,
  catalog: CatalogItem[],
): string | null {
  if (!sale.items.length || sale.items.length > 20)
    return "Inclua entre 1 e 20 itens na ficha.";
  for (let index = 0; index < sale.items.length; index += 1) {
    const item = sale.items[index];
    if (
      !item.product.trim() ||
      !item.color.trim() ||
      !item.storage.trim() ||
      !item.condition.trim()
    )
      return `Complete modelo, cor, armazenamento e condição do item ${index + 1}.`;
    if (
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 20
    )
      return `Informe uma quantidade entre 1 e 20 para o item ${index + 1}.`;
    if (
      item.variantId &&
      !catalog.some(
        (variant) =>
          variant.id === item.variantId &&
          variant.groupSlug === item.groupSlug &&
          (variant.product || variant.model) === item.product &&
          variant.color === item.color &&
          variant.storage === item.storage &&
          (variant.condition
            ? variant.condition === item.condition
            : ["Novo e lacrado", "Seminovo"].includes(item.condition)),
      )
    )
      return `Selecione uma combinação válida do catálogo para o item ${index + 1}.`;
  }
  if (digits(sale.whatsapp).length !== 11)
    return "Informe o WhatsApp do atendimento com DDD.";
  if (
    ![sale.base, sale.pix, sale.card, sale.credit].every(
      (value) =>
        Number.isFinite(value) &&
        value >= 0 &&
        value <= 10_000_000 &&
        Math.abs(value * 100 - Math.round(value * 100)) < 1e-7,
    ) ||
    sale.base <= 0
  )
    return "Informe uma volta positiva e valores financeiros válidos.";
  if (sale.payment === "card" && sale.pix !== 0)
    return "No cartão, o valor no PIX deve ser zero.";
  if (sale.pix > sale.base)
    return "O PIX não pode superar a volta base negociada.";
  if (sale.payment === "pix" && (sale.pix !== sale.base || sale.card !== 0))
    return "No PIX, o valor deve corresponder à volta combinada.";
  if (
    sale.payment !== "pix" &&
    (cardBase(sale) <= 0 || sale.card < cardBase(sale))
  )
    return "O total no cartão deve cobrir o saldo base destinado ao cartão.";
  if (sale.payment === "mixed" && sale.pix <= 0)
    return "Informe a parte do PIX para o pagamento misto.";
  if (
    !Number.isInteger(sale.installments) ||
    sale.installments < 1 ||
    sale.installments > 24
  )
    return "Escolha uma quantidade válida de parcelas.";
  if (
    sale.hasTrade &&
    (!sale.tradeModel.trim() ||
      !sale.tradeColor.trim() ||
      !sale.tradeStorage.trim() ||
      sale.credit <= 0)
  )
    return "Complete o aparelho da troca e seu crédito aprovado.";
  if (
    sale.delivery === "date" &&
    (!sale.deadline ||
      !/^\d{4}-\d{2}-\d{2}$/.test(sale.deadline) ||
      !validCalendarDate(sale.deadline) ||
      sale.deadline < todayBrazil())
  )
    return "Escolha uma data máxima válida, de hoje em diante.";
  return null;
}
function validCalendarDate(value: string): boolean {
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}
function todayBrazil(): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) =>
    parts.find((entry) => entry.type === type)?.value || "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}
export function validCpf(value: string): boolean {
  const normalized = digits(value);
  if (normalized.length !== 11 || /^(\d)\1+$/.test(normalized)) return false;
  for (let length = 9; length <= 10; length += 1) {
    const sum = normalized
      .slice(0, length)
      .split("")
      .reduce(
        (totalValue, digit, index) =>
          totalValue + Number(digit) * (length + 1 - index),
        0,
      );
    const digit = (sum * 10) % 11;
    if ((digit === 10 ? 0 : digit) !== Number(normalized[length])) return false;
  }
  return true;
}
