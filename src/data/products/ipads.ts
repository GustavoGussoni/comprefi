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
  storages: ["256GB"],
  colors: [
    { name: "Space Black", hex: "#1d1d1f", image: iPadProSpB, gallery: [iPadProSpB1, iPadProSpB2] },
  ],
  // 512GB e 1TB indisponíveis no momento
  pricing: {
    "256GB-Space Black": { originalPrice: "R$ 13.188,00", pixPrice: "R$ 11.869", installmentPrice: "R$ 1.127,81" },
  },
};

const iPadProM5_13_Wifi: GroupedProduct = {
  slug: "ipad-pro-m5-13-wifi",
  model: 'iPad Pro M5 13" Wi-Fi',
  specs: 'Chip M5, Tela Ultra Retina XDR 13", Face ID, USB-C (Thunderbolt/USB 4), Wi-Fi 6E, Bluetooth 5.3',
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
    "512GB": ["Space Black", "Silver"],
    "1TB": ["Space Black"],
  },
  pricing: {
    "1TB-Space Black": { originalPrice: "R$ 18.325,00", pixPrice: "R$ 16.493", installmentPrice: "R$ 1.567,17" },
    "512GB-Space Black": { originalPrice: "R$ 15.548,00", pixPrice: "R$ 13.993", installmentPrice: "R$ 1.329,62" },
    "512GB-Silver": { originalPrice: "R$ 15.548,00", pixPrice: "R$ 13.993", installmentPrice: "R$ 1.329,62" },
    "256GB-Space Black": { originalPrice: "R$ 13.049,00", pixPrice: "R$ 11.744", installmentPrice: "R$ 1.115,94" },
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
    "256GB-Space Black": { originalPrice: "R$ 11.105,00", pixPrice: "R$ 9.994", installmentPrice: "R$ 949,65" },
    "256GB-Silver": { originalPrice: "R$ 11.105,00", pixPrice: "R$ 9.994", installmentPrice: "R$ 949,65" },
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
  pricing: {
    "256GB-Space Black": { originalPrice: "R$ 10.794,00", pixPrice: "R$ 9.524", installmentPrice: "R$ 904,97" },
    "256GB-Silver": { originalPrice: "R$ 10.794,00", pixPrice: "R$ 9.524", installmentPrice: "R$ 904,97" },
  },
};

// iPad Pro M4 11" Wi-Fi — indisponível (zerado)

// ============================================
// iPad Air M4
// ============================================

const iPadAirM4_11_Wifi: GroupedProduct = {
  slug: "ipad-air-m4-11-wifi",
  model: 'iPad Air M4 11" Wi-Fi',
  specs: 'Chip M4, Tela Liquid Retina 11", Touch ID, USB-C, Wi-Fi 6E, Bluetooth 5.3',
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
    "256GB": ["Starlight", "Azul", "Roxo", "Space Gray"],
  },
  pricing: {
    "256GB-Starlight": { originalPrice: "R$ 8.060,00", pixPrice: "R$ 7.112", installmentPrice: "R$ 675,80" },
    "256GB-Azul": { originalPrice: "R$ 8.060,00", pixPrice: "R$ 7.112", installmentPrice: "R$ 675,80" },
    "256GB-Roxo": { originalPrice: "R$ 8.060,00", pixPrice: "R$ 7.112", installmentPrice: "R$ 675,80" },
    "256GB-Space Gray": { originalPrice: "R$ 8.060,00", pixPrice: "R$ 7.112", installmentPrice: "R$ 675,80" },
    "128GB-Starlight": { originalPrice: "R$ 6.594,00", pixPrice: "R$ 5.818", installmentPrice: "R$ 552,83" },
    "128GB-Space Gray": { originalPrice: "R$ 6.594,00", pixPrice: "R$ 5.818", installmentPrice: "R$ 552,83" },
    "128GB-Roxo": { originalPrice: "R$ 6.594,00", pixPrice: "R$ 5.818", installmentPrice: "R$ 552,83" },
    "128GB-Azul": { originalPrice: "R$ 6.594,00", pixPrice: "R$ 5.818", installmentPrice: "R$ 552,83" },
  },
};

// ============================================
// iPad Air M3
// ============================================

// iPad Air M3 13" Wi-Fi + Celular — indisponível (zerado)
// iPad Air M3 13" Wi-Fi — não está na planilha, removido
// iPad Air M3 11" Wi-Fi + Celular — indisponível (zerado)

const iPadAirM3_11_Wifi: GroupedProduct = {
  slug: "ipad-air-m3-11-wifi",
  model: 'iPad Air M3 11" Wi-Fi',
  specs: 'Chip M3, Tela Liquid Retina 11", Touch ID, USB-C, Wi-Fi 6E, Bluetooth 5.3',
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
  // 256GB removido (indisponível)
  pricing: {
    "128GB-Starlight": { originalPrice: "R$ 5.727,00", pixPrice: "R$ 5.053", installmentPrice: "R$ 480,17" },
    "128GB-Space Gray": { originalPrice: "R$ 5.727,00", pixPrice: "R$ 5.053", installmentPrice: "R$ 480,17" },
    "128GB-Roxo": { originalPrice: "R$ 5.727,00", pixPrice: "R$ 5.053", installmentPrice: "R$ 480,17" },
    "128GB-Azul": { originalPrice: "R$ 5.727,00", pixPrice: "R$ 5.053", installmentPrice: "R$ 480,17" },
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
  ],
  colorsByStorage: {
    "128GB": ["Prata", "Azul", "Rosa"],
    "256GB": ["Prata", "Azul", "Rosa"],
  },
  pricing: {
    "256GB-Prata": { originalPrice: "R$ 5.060,00", pixPrice: "R$ 4.465", installmentPrice: "R$ 424,27" },
    "256GB-Azul": { originalPrice: "R$ 5.060,00", pixPrice: "R$ 4.465", installmentPrice: "R$ 424,27" },
    "256GB-Rosa": { originalPrice: "R$ 5.060,00", pixPrice: "R$ 4.465", installmentPrice: "R$ 424,27" },
    "128GB-Prata": { originalPrice: "R$ 3.927,00", pixPrice: "R$ 3.465", installmentPrice: "R$ 329,25" },
    "128GB-Azul": { originalPrice: "R$ 3.927,00", pixPrice: "R$ 3.465", installmentPrice: "R$ 329,25" },
    "128GB-Rosa": { originalPrice: "R$ 3.927,00", pixPrice: "R$ 3.465", installmentPrice: "R$ 329,25" },
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
  // iPad Air M4
  iPadAirM4_11_Wifi,
  // iPad Air M3
  iPadAirM3_11_Wifi,
  // iPad 11
  iPad11_Wifi,
];
