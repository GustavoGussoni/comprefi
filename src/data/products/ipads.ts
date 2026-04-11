import { GroupedProduct } from "../../types/product";

// iPad Pro Space Black
import iPadProSpB from "../../assets/new-images/ipad-pro/m5-space-black/ipad-pro-m5-space-b.webp";
import iPadProSpB1 from "../../assets/new-images/ipad-pro/m5-space-black/ipad-pro-m5-space-b-1.webp";
import iPadProSpB2 from "../../assets/new-images/ipad-pro/m5-space-black/ipad-pro-m5-space-b-2.webp";

// iPad Pro Silver
import iPadProSilver from "../../assets/new-images/ipad-pro/m5-silver/ipad-pro-m5-silver.webp";
import iPadProSilver1 from "../../assets/new-images/ipad-pro/m5-silver/ipad-pro-m5-silver-1.webp";
import iPadProSilver2 from "../../assets/new-images/ipad-pro/m5-silver/ipad-pro-m5-silver-2.webp";

// iPad Air Space Gray
import iPadAirSpG from "../../assets/new-images/ipad-air/m4-space-gray/ipad-air-m4-space-g.webp";
import iPadAirSpG1 from "../../assets/new-images/ipad-air/m4-space-gray/ipad-air-m4-space-g-1.webp";
import iPadAirSpG2 from "../../assets/new-images/ipad-air/m4-space-gray/ipad-air-m4-space-g-2.webp";

// iPad Air Starlight
import iPadAirStarlight from "../../assets/new-images/ipad-air/m4-starlight/ipad-air-m4-starlight.webp";
import iPadAirstarlight1 from "../../assets/new-images/ipad-air/m4-starlight/ipad-air-m4-starlight-1.webp";
import iPadAirStarlight2 from "../../assets/new-images/ipad-air/m4-starlight/ipad-air-m4-starlight-2.webp";

// iPad Air Blue
import iPadAirBlue from "../../assets/new-images/ipad-air/m4-blue/ipad-air-m4-blue.webp";
import iPadAirBlue1 from "../../assets/new-images/ipad-air/m4-blue/ipad-air-m4-blue-1.webp";
import iPadAirBlue2 from "../../assets/new-images/ipad-air/m4-blue/ipad-air-m4-blue-2.webp";

// iPad Air Purple
import iPadAirPurple from "../../assets/new-images/ipad-air/m4-purple/ipad-air-m4-purple.webp";
import iPadAirPurple1 from "../../assets/new-images/ipad-air/m4-purple/ipad-air-m4-purple-1.webp";
import iPadAirPurple2 from "../../assets/new-images/ipad-air/m4-purple/ipad-air-m4-purple-2.webp";

// iPad A16 Silver
import iPadA16Silver from "../../assets/new-images/ipad/a16-silver/ipad-a16-slv.webp";
import iPadA16Silver1 from "../../assets/new-images/ipad/a16-silver/ipad-a16-slv-1.webp";
import iPadA16Silver2 from "../../assets/new-images/ipad/a16-silver/ipad-a16-slv-2.webp";

// iPad A16 Blue
import iPadA16Blue from "../../assets/new-images/ipad/a16-blue/ipad-a16-blue.webp";
import iPadA16Blue1 from "../../assets/new-images/ipad/a16-blue/ipad-a16-blue-1.webp";
import iPadA16Blue2 from "../../assets/new-images/ipad/a16-blue/ipad-a16-blue-2.webp";

// iPad A16 Pink
import iPadA16Pink from "../../assets/new-images/ipad/a16-pink/ipad-a16-pink.webp";
import iPadA16Pink1 from "../../assets/new-images/ipad/a16-pink/ipad-a16-pink-1.webp";
import iPadA16Pink2 from "../../assets/new-images/ipad/a16-pink/ipad-a16-pink-2.webp";

// iPad A16 Yellow
import iPadA16Yellow from "../../assets/new-images/ipad/a16-yellow/ipad-a16-yellow.webp";
import iPadA16Yellow1 from "../../assets/new-images/ipad/a16-yellow/ipad-a16-yellow-1.webp";
import iPadA16Yellow2 from "../../assets/new-images/ipad/a16-yellow/ipad-a16-yellow-2.webp";

// ============================================
// iPad Pro M5
// ============================================

const iPadProM5_13_Celular: GroupedProduct = {
  slug: "ipad-pro-m5-13-wifi-celular",
  model: 'iPad Pro M5 13" Wi-Fi + Celular',
  specs: 'Chip M5, Tela Ultra Retina XDR 13", Face ID, USB-C (Thunderbolt/USB 4), Wi-Fi 6E + 5G',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["256GB", "512GB", "1TB"],
  colors: [
    { name: "Space Black", hex: "#1d1d1f", image: iPadProSpB, gallery: [iPadProSpB1, iPadProSpB2] },
    { name: "Silver", hex: "#e3e4e5", image: iPadProSilver, gallery: [iPadProSilver1, iPadProSilver2] },
  ],
  colorsByStorage: {
    "256GB": ["Space Black"],
    "512GB": ["Space Black"],
    "1TB": ["Space Black"],
  },
  pricing: {
    "1TB-Space Black": { originalPrice: "R$ 18.188,00", pixPrice: "R$ 16.369,00", installmentPrice: "R$ 1.555,00" },
    "512GB-Space Black": { originalPrice: "R$ 15.410,00", pixPrice: "R$ 13.869,00", installmentPrice: "R$ 1.318,00" },
    "256GB-Space Black": { originalPrice: "R$ 13.049,00", pixPrice: "R$ 11.744,00", installmentPrice: "R$ 1.116,00" },
  },
};

const iPadProM5_13_Wifi: GroupedProduct = {
  slug: "ipad-pro-m5-13-wifi",
  model: 'iPad Pro M5 13" Wi-Fi',
  specs: 'Chip M5, Tela Ultra Retina XDR 13", Face ID, USB-C (Thunderbolt/USB 4), Wi-Fi 6E, Bluetooth 5.3',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["256GB", "512GB"],
  colors: [
    { name: "Space Black", hex: "#1d1d1f", image: iPadProSpB, gallery: [iPadProSpB1, iPadProSpB2] },
    { name: "Silver", hex: "#e3e4e5", image: iPadProSilver, gallery: [iPadProSilver1, iPadProSilver2] },
  ],
  colorsByStorage: {
    "256GB": ["Space Black"],
    "512GB": ["Space Black", "Silver"],
  },
  pricing: {
    "512GB-Space Black": { originalPrice: "R$ 14.021,00", pixPrice: "R$ 12.619,00", installmentPrice: "R$ 1.199,00" },
    "512GB-Silver": { originalPrice: "R$ 14.021,00", pixPrice: "R$ 12.619,00", installmentPrice: "R$ 1.199,00" },
    "256GB-Space Black": { originalPrice: "R$ 12.424,00", pixPrice: "R$ 11.182,00", installmentPrice: "R$ 1.062,00" },
  },
};

const iPadProM5_11_Wifi: GroupedProduct = {
  slug: "ipad-pro-m5-11-wifi",
  model: 'iPad Pro M5 11" Wi-Fi',
  specs: 'Chip M5, Tela Ultra Retina XDR 11", Face ID, USB-C (Thunderbolt/USB 4), Wi-Fi 6E, Bluetooth 5.3',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["256GB"],
  colors: [
    { name: "Space Black", hex: "#1d1d1f", image: iPadProSpB, gallery: [iPadProSpB1, iPadProSpB2] },
    { name: "Silver", hex: "#e3e4e5", image: iPadProSilver, gallery: [iPadProSilver1, iPadProSilver2] },
  ],
  pricing: {
    "256GB-Space Black": { originalPrice: "R$ 8.813,00", pixPrice: "R$ 7.932,00", installmentPrice: "R$ 754,00" },
    "256GB-Silver": { originalPrice: "R$ 8.813,00", pixPrice: "R$ 7.932,00", installmentPrice: "R$ 754,00" },
  },
};

// ============================================
// iPad Pro M4
// ============================================

const iPadProM4_13_Wifi: GroupedProduct = {
  slug: "ipad-pro-m4-13-wifi",
  model: 'iPad Pro M4 13" Wi-Fi',
  specs: 'Chip M4, Tela Ultra Retina XDR 13", Face ID, USB-C (Thunderbolt/USB 4), Wi-Fi 6E, Bluetooth 5.3',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["256GB"],
  colors: [
    { name: "Space Black", hex: "#1d1d1f", image: iPadProSpB, gallery: [iPadProSpB1, iPadProSpB2] },
    { name: "Silver", hex: "#e3e4e5", image: iPadProSilver, gallery: [iPadProSilver1, iPadProSilver2] },
  ],
  colorsByStorage: {
    "256GB": ["Space Black"],
  },
  pricing: {
    "256GB-Space Black": { originalPrice: "R$ 10.660,00", pixPrice: "R$ 9.406,00", installmentPrice: "R$ 894,00" },
  },
};

const iPadProM4_11_Wifi: GroupedProduct = {
  slug: "ipad-pro-m4-11-wifi",
  model: 'iPad Pro M4 11" Wi-Fi',
  specs: 'Chip M4, Tela Ultra Retina XDR 11", Face ID, USB-C (Thunderbolt/USB 4), Wi-Fi 6E, Bluetooth 5.3',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["256GB"],
  colors: [
    { name: "Space Black", hex: "#1d1d1f", image: iPadProSpB, gallery: [iPadProSpB1, iPadProSpB2] },
    { name: "Silver", hex: "#e3e4e5", image: iPadProSilver, gallery: [iPadProSilver1, iPadProSilver2] },
  ],
  pricing: {
    "256GB-Space Black": { originalPrice: "R$ 7.994,00", pixPrice: "R$ 7.053,00", installmentPrice: "R$ 670,00" },
    "256GB-Silver": { originalPrice: "R$ 7.994,00", pixPrice: "R$ 7.053,00", installmentPrice: "R$ 670,00" },
  },
};

// ============================================
// iPad Air M3
// ============================================

const iPadAirM3_13_Celular: GroupedProduct = {
  slug: "ipad-air-m3-13-wifi-celular",
  model: 'iPad Air M3 13" Wi-Fi + Celular',
  specs: 'Chip M3, Tela Liquid Retina 13", Touch ID, USB-C, Wi-Fi 6E + 5G, Bluetooth 5.3',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["128GB"],
  colors: [
    { name: "Space Gray", hex: "#86868b", image: iPadAirSpG, gallery: [iPadAirSpG1, iPadAirSpG2] },
    { name: "Starlight", hex: "#f0e4d3", image: iPadAirStarlight, gallery: [iPadAirstarlight1, iPadAirStarlight2] },
    { name: "Roxo", hex: "#b8a9c9", image: iPadAirPurple, gallery: [iPadAirPurple1, iPadAirPurple2] },
    { name: "Azul", hex: "#5b7fa6", image: iPadAirBlue, gallery: [iPadAirBlue1, iPadAirBlue2] },
  ],
  colorsByStorage: {
    "128GB": ["Roxo"],
  },
  pricing: {
    "128GB-Roxo": { originalPrice: "R$ 8.927,00", pixPrice: "R$ 7.877,00", installmentPrice: "R$ 748,00" },
  },
};

const iPadAirM3_13_Wifi: GroupedProduct = {
  slug: "ipad-air-m3-13-wifi",
  model: 'iPad Air M3 13" Wi-Fi',
  specs: 'Chip M3, Tela Liquid Retina 13", Touch ID, USB-C, Wi-Fi 6E, Bluetooth 5.3',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["128GB"],
  colors: [
    { name: "Space Gray", hex: "#86868b", image: iPadAirSpG, gallery: [iPadAirSpG1, iPadAirSpG2] },
    { name: "Starlight", hex: "#f0e4d3", image: iPadAirStarlight, gallery: [iPadAirstarlight1, iPadAirStarlight2] },
    { name: "Roxo", hex: "#b8a9c9", image: iPadAirPurple, gallery: [iPadAirPurple1, iPadAirPurple2] },
    { name: "Azul", hex: "#5b7fa6", image: iPadAirBlue, gallery: [iPadAirBlue1, iPadAirBlue2] },
  ],
  pricing: {
    "128GB-Starlight": { originalPrice: "R$ 7.460,00", pixPrice: "R$ 6.583,00", installmentPrice: "R$ 625,00" },
    "128GB-Space Gray": { originalPrice: "R$ 7.460,00", pixPrice: "R$ 6.583,00", installmentPrice: "R$ 625,00" },
    "128GB-Roxo": { originalPrice: "R$ 7.260,00", pixPrice: "R$ 6.406,00", installmentPrice: "R$ 609,00" },
    "128GB-Azul": { originalPrice: "R$ 7.260,00", pixPrice: "R$ 6.406,00", installmentPrice: "R$ 609,00" },
  },
};

const iPadAirM3_11_Celular: GroupedProduct = {
  slug: "ipad-air-m3-11-wifi-celular",
  model: 'iPad Air M3 11" Wi-Fi + Celular',
  specs: 'Chip M3, Tela Liquid Retina 11", Touch ID, USB-C, Wi-Fi 6E + 5G, Bluetooth 5.3',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["128GB", "256GB"],
  colors: [
    { name: "Space Gray", hex: "#86868b", image: iPadAirSpG, gallery: [iPadAirSpG1, iPadAirSpG2] },
    { name: "Starlight", hex: "#f0e4d3", image: iPadAirStarlight, gallery: [iPadAirstarlight1, iPadAirStarlight2] },
    { name: "Roxo", hex: "#b8a9c9", image: iPadAirPurple, gallery: [iPadAirPurple1, iPadAirPurple2] },
    { name: "Azul", hex: "#5b7fa6", image: iPadAirBlue, gallery: [iPadAirBlue1, iPadAirBlue2] },
  ],
  colorsByStorage: {
    "128GB": ["Space Gray"],
    "256GB": ["Starlight", "Azul"],
  },
  pricing: {
    "256GB-Starlight": { originalPrice: "R$ 8.794,00", pixPrice: "R$ 7.759,00", installmentPrice: "R$ 737,00" },
    "256GB-Azul": { originalPrice: "R$ 8.794,00", pixPrice: "R$ 7.759,00", installmentPrice: "R$ 737,00" },
    "128GB-Space Gray": { originalPrice: "R$ 7.594,00", pixPrice: "R$ 6.700,00", installmentPrice: "R$ 637,00" },
  },
};

const iPadAirM3_11_Wifi: GroupedProduct = {
  slug: "ipad-air-m3-11-wifi",
  model: 'iPad Air M3 11" Wi-Fi',
  specs: 'Chip M3, Tela Liquid Retina 11", Touch ID, USB-C, Wi-Fi 6E, Bluetooth 5.3',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["128GB", "256GB"],
  colors: [
    { name: "Space Gray", hex: "#86868b", image: iPadAirSpG, gallery: [iPadAirSpG1, iPadAirSpG2] },
    { name: "Starlight", hex: "#f0e4d3", image: iPadAirStarlight, gallery: [iPadAirstarlight1, iPadAirStarlight2] },
    { name: "Roxo", hex: "#b8a9c9", image: iPadAirPurple, gallery: [iPadAirPurple1, iPadAirPurple2] },
    { name: "Azul", hex: "#5b7fa6", image: iPadAirBlue, gallery: [iPadAirBlue1, iPadAirBlue2] },
  ],
  colorsByStorage: {
    "128GB": ["Starlight", "Space Gray", "Roxo", "Azul"],
    "256GB": ["Starlight", "Azul", "Roxo"],
  },
  pricing: {
    "256GB-Starlight": { originalPrice: "R$ 6.594,00", pixPrice: "R$ 5.818,00", installmentPrice: "R$ 553,00" },
    "256GB-Azul": { originalPrice: "R$ 6.594,00", pixPrice: "R$ 5.818,00", installmentPrice: "R$ 553,00" },
    "256GB-Roxo": { originalPrice: "R$ 6.594,00", pixPrice: "R$ 5.818,00", installmentPrice: "R$ 553,00" },
    "128GB-Starlight": { originalPrice: "R$ 5.594,00", pixPrice: "R$ 4.936,00", installmentPrice: "R$ 469,00" },
    "128GB-Space Gray": { originalPrice: "R$ 5.394,00", pixPrice: "R$ 4.759,00", installmentPrice: "R$ 452,00" },
    "128GB-Roxo": { originalPrice: "R$ 5.260,00", pixPrice: "R$ 4.642,00", installmentPrice: "R$ 441,00" },
    "128GB-Azul": { originalPrice: "R$ 5.260,00", pixPrice: "R$ 4.642,00", installmentPrice: "R$ 441,00" },
  },
};

// ============================================
// iPad 11
// ============================================

const iPad11_Wifi: GroupedProduct = {
  slug: "ipad-11-wifi",
  model: "iPad 11 Wi-Fi",
  specs: 'Chip A16, Tela Liquid Retina 10.9", Touch ID, USB-C, Wi-Fi 6, Bluetooth 5.2',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["128GB", "256GB"],
  colors: [
    { name: "Prata", hex: "#e3e4e5", image: iPadA16Silver, gallery: [iPadA16Silver1, iPadA16Silver2] },
    { name: "Azul", hex: "#5b7fa6", image: iPadA16Blue, gallery: [iPadA16Blue1, iPadA16Blue2] },
    { name: "Rosa", hex: "#f5c5c5", image: iPadA16Pink, gallery: [iPadA16Pink1, iPadA16Pink2] },
    { name: "Amarelo", hex: "#f5e6a3", image: iPadA16Yellow, gallery: [iPadA16Yellow1, iPadA16Yellow2] },
  ],
  colorsByStorage: {
    "128GB": ["Prata", "Azul", "Rosa", "Amarelo"],
    "256GB": ["Prata", "Azul", "Rosa"],
  },
  pricing: {
    "256GB-Prata": { originalPrice: "R$ 4.460,00", pixPrice: "R$ 3.936,00", installmentPrice: "R$ 374,00" },
    "256GB-Azul": { originalPrice: "R$ 4.460,00", pixPrice: "R$ 3.936,00", installmentPrice: "R$ 374,00" },
    "256GB-Rosa": { originalPrice: "R$ 4.460,00", pixPrice: "R$ 3.936,00", installmentPrice: "R$ 374,00" },
    "128GB-Prata": { originalPrice: "R$ 3.260,00", pixPrice: "R$ 2.877,00", installmentPrice: "R$ 273,00" },
    "128GB-Amarelo": { originalPrice: "R$ 3.260,00", pixPrice: "R$ 2.877,00", installmentPrice: "R$ 273,00" },
    "128GB-Azul": { originalPrice: "R$ 3.260,00", pixPrice: "R$ 2.877,00", installmentPrice: "R$ 273,00" },
    "128GB-Rosa": { originalPrice: "R$ 3.260,00", pixPrice: "R$ 2.877,00", installmentPrice: "R$ 273,00" },
  },
};

// ============================================
// iPad 10
// ============================================

const iPad10_Wifi: GroupedProduct = {
  slug: "ipad-10-wifi",
  model: "iPad 10 Wi-Fi",
  specs: 'Chip A14 Bionic, Tela Liquid Retina 10.9", Touch ID, USB-C, Wi-Fi 6, Bluetooth 5.2',
  category: "ipads",
  details: "aparelho novo",
  battery: "100%",
  storages: ["256GB"],
  colors: [
    { name: "Prata", hex: "#e3e4e5", image: iPadA16Silver, gallery: [iPadA16Silver1, iPadA16Silver2] },
    { name: "Azul", hex: "#5b7fa6", image: iPadA16Blue, gallery: [iPadA16Blue1, iPadA16Blue2] },
    { name: "Rosa", hex: "#f5c5c5", image: iPadA16Pink, gallery: [iPadA16Pink1, iPadA16Pink2] },
    { name: "Amarelo", hex: "#f5e6a3", image: iPadA16Yellow, gallery: [iPadA16Yellow1, iPadA16Yellow2] },
  ],
  pricing: {
    "256GB-Prata": { originalPrice: "R$ 3.860,00", pixPrice: "R$ 3.406,00", installmentPrice: "R$ 324,00" },
    "256GB-Azul": { originalPrice: "R$ 3.860,00", pixPrice: "R$ 3.406,00", installmentPrice: "R$ 324,00" },
    "256GB-Rosa": { originalPrice: "R$ 3.860,00", pixPrice: "R$ 3.406,00", installmentPrice: "R$ 324,00" },
    "256GB-Amarelo": { originalPrice: "R$ 3.860,00", pixPrice: "R$ 3.406,00", installmentPrice: "R$ 324,00" },
  },
};

// ============================================
// Exportação
// ============================================

export const ipadsProducts: GroupedProduct[] = [
  // iPad Pro M5
  iPadProM5_13_Celular,
  iPadProM5_13_Wifi,
  iPadProM5_11_Wifi,
  // iPad Pro M4
  iPadProM4_13_Wifi,
  iPadProM4_11_Wifi,
  // iPad Air M3
  iPadAirM3_13_Celular,
  iPadAirM3_13_Wifi,
  iPadAirM3_11_Celular,
  iPadAirM3_11_Wifi,
  // iPad 11
  iPad11_Wifi,
  // iPad 10
  iPad10_Wifi,
];