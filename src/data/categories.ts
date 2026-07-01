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

// ---- Macbooks: separar por linha de produto (mais caros primeiro) ----
const macStudio = macbooksProducts.filter((p) => p.model.includes("Mac Studio"));
const macbookPro = macbooksProducts.filter((p) => p.model.includes("MacBook Pro"));
const macbookAir = macbooksProducts.filter((p) => p.model.includes("MacBook Air"));
const macbookNeo = macbooksProducts.filter((p) => p.model.includes("MacBook Neo"));
const macMini = macbooksProducts.filter((p) => p.model.includes("Mac Mini"));

// ---- iPads: separar em seções iPad Pro, iPad Air e iPad ----
const iPadsPro = ipadsProducts.filter((p) => p.model.includes("iPad Pro"));
const iPadsAir = ipadsProducts.filter((p) => p.model.includes("iPad Air"));
const iPadsBase = ipadsProducts.filter(
  (p) =>
    !p.model.includes("iPad Pro") &&
    !p.model.includes("iPad Air"),
);

// ---- Apple Watch: separar em seções Ultra, Series e SE ----
const watchUltra = appleWatchProducts.filter((p) => p.model.includes("Ultra"));
const watchSeries = appleWatchProducts.filter((p) => p.model.includes("Series"));
const watchSE = appleWatchProducts.filter((p) => p.model.includes("SE"));

// ---- Acessórios: separar em seções ----
const acessoriosAudio = acessoriosProducts.filter((p) =>
  p.model.includes("AirPods"),
);
const acessoriosTecladoMouse = acessoriosProducts.filter((p) =>
  p.model.includes("Magic Keyboard") || p.model.includes("Magic Mouse"),
);
const acessoriosPencil = acessoriosProducts.filter((p) =>
  p.model.includes("Pencil"),
);
const acessoriosAirTag = acessoriosProducts.filter((p) =>
  p.model.includes("AirTag"),
);
const acessoriosCabosCarregadores = acessoriosProducts.filter((p) =>
  p.model.includes("Adaptador") ||
  p.model.includes("Carregador") ||
  p.model.includes("Cabo"),
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
      ...(macbookPro.length > 0 ? [{ title: "MacBook Pro", products: macbookPro }] : []),
      ...(macbookAir.length > 0 ? [{ title: "MacBook Air", products: macbookAir }] : []),
      ...(macbookNeo.length > 0 ? [{ title: "MacBook Neo", products: macbookNeo }] : []),
      ...(macStudio.length > 0 ? [{ title: "Mac Studio", products: macStudio }] : []),
      ...(macMini.length > 0 ? [{ title: "Mac Mini", products: macMini }] : []),
    ],
    whyChooseTitle: "Por que comprar na CompreFi?",
    whyChooseItems: DEFAULT_WHY_CHOOSE_ITEMS,
  },

  ipads: {
    title: "iPads",
    subtitle: SUBTITLE_NEW,
    slug: "ipads",
    type: "grouped",
    groupedSections: [
      ...(iPadsPro.length > 0 ? [{ title: "iPad Pro", products: iPadsPro }] : []),
      ...(iPadsAir.length > 0 ? [{ title: "iPad Air", products: iPadsAir }] : []),
      ...(iPadsBase.length > 0 ? [{ title: "iPad", products: iPadsBase }] : []),
    ],
    whyChooseTitle: "Por que comprar iPads na CompreFi?",
    whyChooseItems: DEFAULT_WHY_CHOOSE_ITEMS,
  },

  "apple-watch": {
    title: "Apple Watch",
    subtitle: SUBTITLE_NEW,
    slug: "apple-watch",
    type: "grouped",
    groupedSections: [
      ...(watchUltra.length > 0 ? [{ title: "Ultra", products: watchUltra }] : []),
      ...(watchSeries.length > 0 ? [{ title: "Series", products: watchSeries }] : []),
      ...(watchSE.length > 0 ? [{ title: "SE", products: watchSE }] : []),
    ],
    whyChooseTitle: "Por que comprar na CompreFi?",
    whyChooseItems: DEFAULT_WHY_CHOOSE_ITEMS,
  },

  acessorios: {
    title: "Acessórios Apple",
    subtitle: SUBTITLE_NEW,
    slug: "acessorios",
    type: "grouped",
    groupedSections: [
      ...(acessoriosAudio.length > 0 ? [{ title: "Áudio", products: acessoriosAudio }] : []),
      ...(acessoriosTecladoMouse.length > 0 ? [{ title: "Teclados e Mouse", products: acessoriosTecladoMouse }] : []),
      ...(acessoriosPencil.length > 0 ? [{ title: "Apple Pencil", products: acessoriosPencil }] : []),
      ...(acessoriosAirTag.length > 0 ? [{ title: "AirTag", products: acessoriosAirTag }] : []),
      ...(acessoriosCabosCarregadores.length > 0 ? [{ title: "Cabos e Carregadores", products: acessoriosCabosCarregadores }] : []),
    ],
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