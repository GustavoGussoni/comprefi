import type { GroupedProduct } from "../../types/product";
import { iphoneDuoColors, ultra4Colors, series12Colors } from "./launch-images";

// Metadados de exibição alinhados ao manifesto central de 2026-11-12.
// Nenhum preço local: grupo e variantes vendáveis devem vir da API do catálogo.
export const iphoneDuo: GroupedProduct = {
  slug: "iphone-duo",
  model: "iPhone Duo",
  category: "iphones-novos",
  specs: "Design dobrável em titânio, tela interna Super Retina XDR OLED de 7,6 polegadas e externa de 5,4 polegadas, ProMotion de até 120 Hz, chip A20 Pro e sistema de câmeras Dual Fusion de 48 MP.",
  details: "Produto novo e lacrado. Garantia de 1 ano do fabricante, conforme os termos aplicáveis.",
  battery: "100%",
  storages: ["256GB", "512GB", "1TB", "2TB"],
  colors: iphoneDuoColors,
  pricing: {},
  requiresCatalogAvailability: true,
};

export const appleWatchUltra4: GroupedProduct = {
  slug: "apple-watch-ultra-4-ocean",
  model: "Apple Watch Ultra 4 Ocean",
  category: "apple-watch",
  specs: "Caixa de titânio de 49 mm, chip S11, tela Retina Sempre Ativa de até 3.000 nits com cristal de safira, GPS de dupla frequência, GPS + Cellular e Botão de Ação. A conectividade celular exige plano e operadora compatíveis.",
  details: "Produto novo e lacrado. Garantia de 1 ano do fabricante, conforme os termos aplicáveis.",
  battery: "100%",
  storages: ["49mm"],
  colors: ultra4Colors,
  pricing: {},
  requiresCatalogAvailability: true,
};

export const appleWatchSeries12: GroupedProduct = {
  slug: "apple-watch-series-12-sport-band",
  model: "Apple Watch Series 12 Sport Band",
  category: "apple-watch",
  specs: "Caixa de alumínio de 42 mm ou 46 mm, chip S11, tela Retina Sempre Ativa de até 2.000 nits, GPS, Wi-Fi e Bluetooth. Pulseira Sport Band na combinação selecionada.",
  details: "Produto novo e lacrado. Garantia de 1 ano do fabricante, conforme os termos aplicáveis.",
  battery: "100%",
  storages: ["42mm", "46mm"],
  colors: series12Colors,
  pricing: {},
  requiresCatalogAvailability: true,
};

export const launchProducts = [iphoneDuo, appleWatchUltra4, appleWatchSeries12];
