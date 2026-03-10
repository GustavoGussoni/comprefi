// ============================================
// Registry de Categorias — CompreFi
// ============================================
// Ponto central que conecta slugs de URL → dados + configuração.
// Ao adicionar uma nova categoria, basta criar o arquivo de dados
// em data/products/ e registrar aqui.

import { CategoryConfig } from "../types/product";
import { SUBTITLE_NEW, SUBTITLE_USED, DEFAULT_WHY_CHOOSE_ITEMS } from "./constants";

// Dados por categoria
import { iphonesSeminovosProducts } from "./products/iphones-seminovos";
import { iphonesNovosProducts } from "./products/iphones-novos";
import { macbooksProducts } from "./products/macbooks";
import { ipadsProducts } from "./products/ipads";
import { appleWatchProducts } from "./products/apple-watch";
import { acessoriosProducts } from "./products/acessorios";

// ---- Macbooks: separar em seções M5, M4 e M3/M2/M1 ----
const macbooksM5 = macbooksProducts.filter((p) => p.model.includes("M5"));
const macbooksM4 = macbooksProducts.filter(
  (p) =>
    p.model.includes("M4") &&
    !p.model.includes("M5"),
);
const macbooksM3Older = macbooksProducts.filter(
  (p) =>
    !p.model.includes("M4") &&
    !p.model.includes("M5"),
);

// ============================================
// Registry
// ============================================

export const categoryRegistry: Record<string, CategoryConfig> = {
  "iphones-seminovos": {
    title: "iPhones Seminovos",
    subtitle: SUBTITLE_USED,
    slug: "iphones-seminovos",
    type: "flat",
    products: iphonesSeminovosProducts,
    whyChooseTitle: "Por que comprar na CompreFi?",
    whyChooseItems: [
      "Todos os aparelhos passam por verificação completa de 47 pontos",
      "Bateria com no mínimo 80% de saúde garantida",
      "Suporte vitalício para todos os produtos adquiridos",
      "Programa de indicações com desconto acumulativo",
      "Garantia CompreFi em todos os seminovos",
    ],
  },

  "iphones-novos": {
    title: "iPhones Novos",
    subtitle: SUBTITLE_NEW,
    slug: "iphones-novos",
    type: "grouped",
    groupedProducts: iphonesNovosProducts,
    whyChooseTitle: "Por que comprar na CompreFi?",
    whyChooseItems: DEFAULT_WHY_CHOOSE_ITEMS,
  },

  macbooks: {
    title: "MacBooks, iMacs e Mac Minis",
    subtitle: SUBTITLE_NEW,
    slug: "macbooks",
    type: "grouped",
    groupedSections: [
      ...(macbooksM5.length > 0 ? [{ title: "Linha M5", products: macbooksM5 }] : []),
      ...(macbooksM4.length > 0 ? [{ title: "Linha M4", products: macbooksM4 }] : []),
      ...(macbooksM3Older.length > 0 ? [{ title: "Linha M3 / M2 / M1", products: macbooksM3Older }] : []),
    ],
    whyChooseTitle: "Por que comprar na CompreFi?",
    whyChooseItems: DEFAULT_WHY_CHOOSE_ITEMS,
  },

  ipads: {
    title: "iPads",
    subtitle: SUBTITLE_NEW,
    slug: "ipads",
    type: "flat",
    products: ipadsProducts,
    whyChooseTitle: "Por que comprar iPads na CompreFi?",
    whyChooseItems: DEFAULT_WHY_CHOOSE_ITEMS,
  },

  "apple-watch": {
    title: "Apple Watch",
    subtitle: SUBTITLE_NEW,
    slug: "apple-watch",
    type: "flat",
    products: appleWatchProducts,
    whyChooseTitle: "Por que comprar na CompreFi?",
    whyChooseItems: DEFAULT_WHY_CHOOSE_ITEMS,
  },

  acessorios: {
    title: "Acessórios Apple",
    subtitle: SUBTITLE_NEW,
    slug: "acessorios",
    type: "flat",
    products: acessoriosProducts,
    whyChooseTitle: "Por que comprar na CompreFi?",
    whyChooseItems: DEFAULT_WHY_CHOOSE_ITEMS,
  },
};

// ============================================
// Helpers
// ============================================

/** Busca a configuração de uma categoria pelo slug da URL */
export function getCategoryBySlug(slug: string): CategoryConfig | undefined {
  return categoryRegistry[slug];
}

/** Retorna todos os slugs de categorias disponíveis */
export function getAllCategorySlugs(): string[] {
  return Object.keys(categoryRegistry);
}

/** Busca um produto flat por ID em todas as categorias */
export function findFlatProductById(id: number): {
  product: import("../types/product").FlatProduct;
  category: CategoryConfig;
} | null {
  for (const key of Object.keys(categoryRegistry)) {
    const config = categoryRegistry[key];
    if (config.type === "flat") {
      // Buscar nos products diretos
      if (config.products) {
        const found = config.products.find((p) => p.id === id);
        if (found) return { product: found, category: config };
      }
      // Buscar nas seções
      if (config.sections) {
        for (const section of config.sections) {
          const found = section.products.find((p) => p.id === id);
          if (found) return { product: found, category: config };
        }
      }
    }
  }
  return null;
}

/** Busca um produto agrupado por slug em todas as categorias */
export function findGroupedProductBySlug(slug: string): {
  product: import("../types/product").GroupedProduct;
  category: CategoryConfig;
} | null {
  for (const key of Object.keys(categoryRegistry)) {
    const config = categoryRegistry[key];
    if (config.type === "grouped") {
      // Buscar nos groupedProducts diretos
      if (config.groupedProducts) {
        const found = config.groupedProducts.find((p) => p.slug === slug);
        if (found) return { product: found, category: config };
      }
      // Buscar nas groupedSections
      if (config.groupedSections) {
        for (const section of config.groupedSections) {
          const found = section.products.find((p) => p.slug === slug);
          if (found) return { product: found, category: config };
        }
      }
    }
  }
  return null;
}