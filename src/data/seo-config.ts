// src/data/seo-config.ts
// Configurações de SEO por rota/categoria

export interface SEOConfig {
  title: string;
  description: string;
  url: string;
}

export const seoBySlug: Record<string, SEOConfig> = {
  "iphones-novos": {
    title: "iPhones Novos",
    description:
      "iPhone 17 Pro Max, iPhone 17 Pro, iPhone 17, iPhone 16 e mais. Novos, lacrados, com garantia Apple. Parcele em até 12x ou pague no Pix com desconto.",
    url: "/iphones-novos",
  },
  "iphones-seminovos": {
    title: "iPhones Seminovos",
    description:
      "iPhones seminovos com garantia CompreFi. Aparelhos revisados e testados com os melhores preços do mercado.",
    url: "/iphones-seminovos",
  },
  macbooks: {
    title: "MacBooks",
    description:
      "MacBook Air M5, MacBook Pro M5, MacBook Air M4 e mais. Novos, lacrados, com garantia Apple. Parcele em até 12x.",
    url: "/macbooks",
  },
  ipads: {
    title: "iPads",
    description:
      "iPad Pro M5, iPad Air M4, iPad A16 e mais. Novos, lacrados, com garantia Apple. Melhores preços do Brasil.",
    url: "/ipads",
  },
  "apple-watch": {
    title: "Apple Watch",
    description:
      "Apple Watch Ultra 3, Series 11, SE 3 e mais. Novos, lacrados, com garantia Apple. Parcele em até 12x.",
    url: "/apple-watch",
  },
  acessorios: {
    title: "Acessórios Apple",
    description:
      "AirPods Pro 3, AirPods 4, AirTag, MagSafe, Apple Pencil, Magic Keyboard e mais. Acessórios Apple originais com os melhores preços.",
    url: "/acessorios",
  },
};

export const seoByRoute: Record<string, SEOConfig> = {
  "/": {
    title: "",
    description:
      "Compre iPhones, MacBooks, iPads, Apple Watch e acessórios Apple com os melhores preços do Brasil. Novos e seminovos com garantia.",
    url: "/",
  },
  "/troca": {
    title: "Troca de iPhone",
    description:
      "Troque seu iPhone usado por um novo com desconto. Calculadora de troca instantânea. Avaliação justa e transparente.",
    url: "/troca",
  },
  "/teste-infalivel": {
    title: "Teste Infalível",
    description:
      "Descubra qual iPhone é ideal para você com nosso teste infalível. Responda algumas perguntas e receba uma recomendação personalizada.",
    url: "/teste-infalivel",
  },
  "/economia": {
    title: "Calculadora de Economia",
    description:
      "Descubra quanto você economiza comprando na CompreFi. Compare preços com a Apple Store oficial e veja a diferença.",
    url: "/economia",
  },
};
