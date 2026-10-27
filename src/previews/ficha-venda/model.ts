import { catalogProducts, type CatalogVariant } from "./catalogProducts";

export type Payment = "pix" | "card" | "mixed";
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
};
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
  variant: CatalogVariant,
  previous?: SaleItem
): SaleItem => ({
  lineId: previous?.lineId || crypto.randomUUID(),
  variantId: variant.id,
  groupSlug: variant.groupSlug,
  product: variant.model,
  color: variant.color,
  storage: variant.storage,
  condition: variant.condition,
  quantity: previous?.quantity || 1,
  image: variant.image,
});
export const itemTitle = (sale: Sale) =>
  sale.items.map(i => i.product || "Produto a selecionar").join(" + ");
export const unitCount = (sale: Sale) =>
  sale.items.reduce((sum, item) => sum + item.quantity, 0);
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
export type Sale = {
  id: string;
  reference: string;
  createdAt: string;
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
  customer?: Client;
  crm: "waiting" | "simulated" | "failed";
  pdf: "waiting" | "ready";
  revoked: boolean;
};
export const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(
    value
  );
export const digits = (value: string) => value.replace(/\D/g, "");
export const paymentName = (p: Payment) =>
  ({ pix: "PIX", card: "Cartão", mixed: "PIX + cartão" })[p];
export const cardBase = (sale: Sale) =>
  sale.payment === "pix" ? 0 : sale.base - sale.pix;
export const cardFee = (sale: Sale) =>
  sale.payment === "pix" ? 0 : sale.card - cardBase(sale);
export const total = (sale: Sale) => sale.pix + sale.card;
export const deliveryText = (s: Sale) =>
  s.delivery === "date" && s.deadline
    ? `Até ${s.deadline.split("-").reverse().join("/")} — data máxima combinada`
    : "De 1 a 15 dias úteis após a confirmação do pagamento";
export const demoClient: Client = {
  name: "Cliente Demonstração",
  cpf: "111.444.777-35",
  phone: "(00) 90000-0000",
  email: "cliente@example.com",
  birth: "1990-01-01",
  cep: "00000-000",
  street: "Rua de Exemplo",
  number: "100",
  complement: "",
  district: "Bairro de Exemplo",
  city: "Cidade Exemplo",
  state: "MG",
  instagram: "",
};
export const emptyClient: Client = Object.fromEntries(
  Object.keys(demoClient).map(k => [k, ""])
) as Client;
export const newSale = (): Sale => ({
  id: crypto.randomUUID(),
  reference: "NOVA",
  createdAt: new Date().toISOString(),
  whatsapp: "",
  items: [newItem()],
  base: 0,
  payment: "pix",
  pix: 0,
  card: 0,
  installments: 1,
  hasTrade: false,
  tradeModel: "",
  tradeStorage: "256 GB",
  tradeColor: "",
  credit: 0,
  imei: "",
  tradeNotes: "",
  delivery: "standard",
  deadline: "",
  deliveryMode: "Entrega combinada",
  notes: "",
  crm: "waiting",
  pdf: "waiting",
  revoked: false,
});
const sampleItem = (
  slug: string,
  preferredColor: string,
  preferredStorage: string
): SaleItem => {
  const options = catalogProducts.filter(v => v.groupSlug === slug);
  const match =
    options.find(
      v =>
        v.color === preferredColor &&
        v.storage.replace(/\s/g, "") === preferredStorage
    ) ||
    options.find(v => v.color === preferredColor) ||
    options[0];
  return match ? itemFromCatalog(match) : newItem();
};
export const exampleSale = (): Sale => ({
  ...newSale(),
  id: "exemplo",
  reference: "CF-2026-0042",
  createdAt: "2026-10-27T15:30:00.000Z",
  whatsapp: "(00) 90000-0000",
  items: [
    sampleItem("iphone-18-pro-max", "Bordô", "512GB"),
    sampleItem("iphone-18-pro", "Prata", "256GB"),
  ],
  base: 18700,
  pix: 18700,
  hasTrade: true,
  tradeModel: "iPhone 18 Pro Max",
  tradeStorage: "256 GB",
  tradeColor: "Bordô",
  credit: 9500,
  tradeNotes:
    "Avaliação aprovada. Identificação e recebimento junto com a entrega dos produtos.",
});
export const initialSales = (): Sale[] => [
  exampleSale(),
  {
    ...exampleSale(),
    id: "concluida",
    reference: "CF-2026-0041",
    items: [sampleItem("iphone-18-pro", "Bordô", "256GB")],
    base: 4200,
    pix: 0,
    payment: "card",
    card: 4560,
    installments: 6,
    customer: { ...demoClient, name: "Cadastro de Exemplo" },
    crm: "simulated",
    pdf: "ready",
  },
];
export function validateSale(s: Sale): string | null {
  if (!s.items.length || s.items.length > 20)
    return "Inclua entre 1 e 20 itens na ficha.";
  for (let index = 0; index < s.items.length; index++) {
    const item = s.items[index];
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
      !catalogProducts.some(
        v =>
          v.id === item.variantId &&
          v.groupSlug === item.groupSlug &&
          v.model === item.product &&
          v.color === item.color &&
          v.storage === item.storage &&
          v.condition === item.condition
      )
    )
      return `Selecione uma combinação válida do catálogo para o item ${index + 1}.`;
  }
  if (digits(s.whatsapp).length < 10 || digits(s.whatsapp).length > 13)
    return "Informe o WhatsApp do atendimento com DDD.";
  if (
    ![s.base, s.pix, s.card, s.credit].every(
      n => Number.isFinite(n) && n >= 0
    ) ||
    s.base <= 0
  )
    return "Informe uma volta positiva e valores financeiros válidos.";
  if (s.pix > s.base) return "O PIX não pode superar a volta base negociada.";
  if (s.payment === "pix" && (s.pix !== s.base || s.card !== 0))
    return "No PIX, o valor deve corresponder à volta combinada.";
  if (s.payment !== "pix" && (cardBase(s) <= 0 || s.card < cardBase(s)))
    return "O total no cartão deve cobrir o saldo base destinado ao cartão.";
  if (s.payment === "mixed" && s.pix <= 0)
    return "Informe a parte do PIX para o pagamento misto.";
  if (
    !Number.isInteger(s.installments) ||
    s.installments < 1 ||
    s.installments > 24
  )
    return "Escolha uma quantidade válida de parcelas.";
  if (
    s.hasTrade &&
    (!s.tradeModel.trim() ||
      !s.tradeColor.trim() ||
      !s.tradeStorage.trim() ||
      s.credit <= 0)
  )
    return "Complete o aparelho da troca e seu crédito aprovado.";
  if (
    s.delivery === "date" &&
    (!s.deadline || s.deadline < new Date().toLocaleDateString("en-CA"))
  )
    return "Escolha uma data máxima válida, de hoje em diante.";
  return null;
}
export function validCpf(value: string): boolean {
  const n = digits(value);
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;
  for (let len = 9; len <= 10; len++) {
    const sum = n
      .slice(0, len)
      .split("")
      .reduce((v, d, i) => v + Number(d) * (len + 1 - i), 0);
    const digit = (sum * 10) % 11;
    if ((digit === 10 ? 0 : digit) !== Number(n[len])) return false;
  }
  return true;
}
