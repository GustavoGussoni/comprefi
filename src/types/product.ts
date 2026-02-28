// ============================================
// Tipos para produtos — CompreFi
// ============================================

// ---------- Produtos Agrupados (iPhones Novos) ----------

/** Preço de uma variante específica (cor + storage) */
export interface VariantPricing {
  originalPrice: string;
  installmentPrice: string;
  pixPrice: string;
}

/** Uma cor disponível para o produto */
export interface ProductColor {
  name: string;
  hex: string;
  image: string; // imagem traseira principal
  gallery: string[]; // fotos adicionais dessa cor
}

/** Preços indexados por "storage-cor" ou "storage" */
export type PricingMap = Record<string, VariantPricing>;

/** Produto agrupado com variantes (para iPhones Novos) */
export interface GroupedProduct {
  slug: string; // ex: "iphone-17-pro-max"
  model: string; // ex: "iPhone 17 Pro Max"
  specs: string;
  category: string;
  details: string;
  battery: string;
  storages: string[]; // ex: ["256GB", "512GB", "1TB"]
  colors: ProductColor[];
  pricing: PricingMap;
  /** Cores disponíveis por storage (se alguma cor não está disponível em algum storage) */
  colorsByStorage?: Record<string, string[]>;
}

// ---------- Produtos Flat (Seminovos, Macbooks, iPads, etc.) ----------

/** Produto flat (um card = uma variante) */
export interface FlatProduct {
  id: number;
  model: string;
  storage?: string;
  color?: string;
  battery?: string;
  originalPrice?: string;
  installmentPrice?: string;
  pixPrice: string;
  details?: string;
  image: string;
  realImages: string[];
  specs?: string;
  category: string;
}

// ---------- Tipo Unificado ----------

/** Qualquer produto do catálogo */
export type Product = FlatProduct | GroupedProduct;

// ---------- Type Guards ----------

/** Verifica se o produto é agrupado (tem slug) */
export function isGroupedProduct(product: Product): product is GroupedProduct {
  return "slug" in product && typeof (product as GroupedProduct).slug === "string";
}

/** Verifica se o produto é flat (tem id numérico) */
export function isFlatProduct(product: Product): product is FlatProduct {
  return "id" in product && typeof (product as FlatProduct).id === "number";
}

// ---------- Configuração de Categoria ----------

/** Seção dentro de uma categoria (ex: "Linha M4", "Linha M3") */
export interface CategorySection {
  title: string;
  products: FlatProduct[];
}

/** Configuração de uma categoria no registry */
export interface CategoryConfig {
  title: string;
  subtitle: string;
  slug: string;
  type: "flat" | "grouped";
  /** Produtos flat (quando type === "flat") */
  products?: FlatProduct[];
  /** Produtos agrupados (quando type === "grouped") */
  groupedProducts?: GroupedProduct[];
  /** Seções (quando a categoria tem sub-divisões, ex: Macbooks M4 / M3) */
  sections?: CategorySection[];
  /** Textos da seção "Por que comprar na CompreFi?" */
  whyChooseTitle?: string;
  whyChooseItems?: string[];
}

// ============================================
// Helpers
// ============================================

/** Gera a chave de pricing a partir de storage e cor */
export function pricingKey(storage: string, color: string): string {
  return `${storage}-${color}`;
}

/** Busca o preço de uma variante. Se não encontrar a combinação exata,
 *  tenta buscar só pelo storage (para modelos onde cor não muda preço) */
export function getVariantPrice(
  pricing: PricingMap,
  storage: string,
  color: string,
): VariantPricing | null {
  // Tenta combinação exata
  const exact = pricing[pricingKey(storage, color)];
  if (exact) return exact;

  // Tenta só pelo storage (fallback para quando cor não muda preço)
  const storageOnly = pricing[storage];
  if (storageOnly) return storageOnly;

  return null;
}

/** Retorna o menor preço PIX de todas as variantes */
export function getLowestPrice(pricing: PricingMap): string {
  let lowest = Infinity;
  let lowestStr = "";
  for (const key of Object.keys(pricing)) {
    const val = pricing[key];
    const num = parseFloat(
      val.pixPrice
        .replace("R$", "")
        .replace(/\./g, "")
        .replace(",", ".")
        .trim(),
    );
    if (num < lowest) {
      lowest = num;
      lowestStr = val.pixPrice;
    }
  }
  return lowestStr;
}