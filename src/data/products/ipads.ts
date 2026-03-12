import { GroupedProduct } from "../../types/product";

// iPad Pro Space Black
import iPadProSpB from "../../assets/new-images/ipad-pro/m5-space-black/ipad-pro-m5-space-b.png";
import iPadProSpB1 from "../../assets/new-images/ipad-pro/m5-space-black/ipad-pro-m5-space-b-1.png";
import iPadProSpB2 from "../../assets/new-images/ipad-pro/m5-space-black/ipad-pro-m5-space-b-2.png";

// iPad Pro Silver
import iPadProSilver from "../../assets/new-images/ipad-pro/m5-silver/ipad-pro-m5-silver.png";
import iPadProSilver1 from "../../assets/new-images/ipad-pro/m5-silver/ipad-pro-m5-silver-1.png";
import iPadProSilver2 from "../../assets/new-images/ipad-pro/m5-silver/ipad-pro-m5-silver-2.png";

// iPad Air Space Gray
import iPadAirSpG from "../../assets/new-images/ipad-air/m4-space-gray/ipad-air-m4-space-g.png";
import iPadAirSpG1 from "../../assets/new-images/ipad-air/m4-space-gray/ipad-air-m4-space-g-1.png";
import iPadAirSpG2 from "../../assets/new-images/ipad-air/m4-space-gray/ipad-air-m4-space-g-2.png";

// iPad Air Starlight
import iPadAirStarlight from "../../assets/new-images/ipad-air/m4-starlight/ipad-air-m4-starlight.png";
import iPadAirstarlight1 from "../../assets/new-images/ipad-air/m4-starlight/ipad-air-m4-starlight-1.png";
import iPadAirStarlight2 from "../../assets/new-images/ipad-air/m4-starlight/ipad-air-m4-starlight-2.png";

// iPad Air Blue
import iPadAirBlue from "../../assets/new-images/ipad-air/m4-blue/ipad-air-m4-blue.png";
import iPadAirBlue1 from "../../assets/new-images/ipad-air/m4-blue/ipad-air-m4-blue-1.png";
import iPadAirBlue2 from "../../assets/new-images/ipad-air/m4-blue/ipad-air-m4-blue-2.png";

// iPad Air Purple
import iPadAirPurple from "../../assets/new-images/ipad-air/m4-purple/ipad-air-m4-purple.png";
import iPadAirPurple1 from "../../assets/new-images/ipad-air/m4-purple/ipad-air-m4-purple-1.png";
import iPadAirPurple2 from "../../assets/new-images/ipad-air/m4-purple/ipad-air-m4-purple-2.png";

// iPad A16 Silver
import iPadA16Silver from "../../assets/new-images/ipad/a16-silver/ipad-a16-slv.png";
import iPadA16Silver1 from "../../assets/new-images/ipad/a16-silver/ipad-a16-slv-1.png";
import iPadA16Silver2 from "../../assets/new-images/ipad/a16-silver/ipad-a16-slv-2.png";

// iPad A16 Blue
import iPadA16Blue from "../../assets/new-images/ipad/a16-blue/ipad-a16-blue.png";
import iPadA16Blue1 from "../../assets/new-images/ipad/a16-blue/ipad-a16-blue-1.png";
import iPadA16Blue2 from "../../assets/new-images/ipad/a16-blue/ipad-a16-blue-2.png";

// iPad A16 Pink
import iPadA16Pink from "../../assets/new-images/ipad/a16-pink/ipad-a16-pink.png";
import iPadA16Pink1 from "../../assets/new-images/ipad/a16-pink/ipad-a16-pink-1.png";
import iPadA16Pink2 from "../../assets/new-images/ipad/a16-pink/ipad-a16-pink-2.png";

// iPad A16 Yellow
import iPadA16Yellow from "../../assets/new-images/ipad/a16-yellow/ipad-a16-yellow.png";
import iPadA16Yellow1 from "../../assets/new-images/ipad/a16-yellow/ipad-a16-yellow-1.png";
import iPadA16Yellow2 from "../../assets/new-images/ipad/a16-yellow/ipad-a16-yellow-2.png";

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
    "1TB-Space Black": { originalPrice: "R$ 18.187,92", pixPrice: "R$ 16.369,13", installmentPrice: "R$ 1.555,41" },
    "512GB-Space Black": { originalPrice: "R$ 15.410,14", pixPrice: "R$ 13.869,13", installmentPrice: "R$ 1.317,86" },
    "256GB-Space Black": { originalPrice: "R$ 12.771,25", pixPrice: "R$ 11.494,13", installmentPrice: "R$ 1.092,18" },
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
    "512GB-Space Black": { originalPrice: "R$ 14.021,25", pixPrice: "R$ 12.619,13", installmentPrice: "R$ 1.199,08" },
    "512GB-Silver": { originalPrice: "R$ 14.021,25", pixPrice: "R$ 12.619,13", installmentPrice: "R$ 1.199,08" },
    "256GB-Space Black": { originalPrice: "R$ 12.424,03", pixPrice: "R$ 11.181,63", installmentPrice: "R$ 1.062,49" },
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
    "256GB-Space Black": { originalPrice: "R$ 8.812,92", pixPrice: "R$ 7.931,63", installmentPrice: "R$ 753,67" },
    "256GB-Silver": { originalPrice: "R$ 8.812,92", pixPrice: "R$ 7.931,63", installmentPrice: "R$ 753,67" },
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
    "256GB-Space Black": { originalPrice: "R$ 10.660,40", pixPrice: "R$ 9.406,24", installmentPrice: "R$ 893,79" },
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
  colorsByStorage: {
    "256GB": ["Space Black"],
  },
  pricing: {
    "256GB-Space Black": { originalPrice: "R$ 8.127,07", pixPrice: "R$ 7.170,94", installmentPrice: "R$ 681,39" },
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
    "128GB-Roxo": { originalPrice: "R$ 8.927,07", pixPrice: "R$ 7.876,82", installmentPrice: "R$ 748,46" },
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
    "128GB-Starlight": { originalPrice: "R$ 7.460,40", pixPrice: "R$ 6.582,71", installmentPrice: "R$ 625,49" },
    "128GB-Space Gray": { originalPrice: "R$ 7.460,40", pixPrice: "R$ 6.582,71", installmentPrice: "R$ 625,49" },
    "128GB-Roxo": { originalPrice: "R$ 7.260,40", pixPrice: "R$ 6.406,24", installmentPrice: "R$ 608,73" },
    "128GB-Azul": { originalPrice: "R$ 7.260,40", pixPrice: "R$ 6.406,24", installmentPrice: "R$ 608,73" },
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
    "256GB-Starlight": { originalPrice: "R$ 8.793,73", pixPrice: "R$ 7.759,18", installmentPrice: "R$ 737,28" },
    "256GB-Azul": { originalPrice: "R$ 8.793,73", pixPrice: "R$ 7.759,18", installmentPrice: "R$ 737,28" },
    "128GB-Space Gray": { originalPrice: "R$ 7.593,73", pixPrice: "R$ 6.700,35", installmentPrice: "R$ 636,67" },
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
  pricing: {
    "256GB-Starlight": { originalPrice: "R$ 7.393,73", pixPrice: "R$ 6.523,88", installmentPrice: "R$ 619,91" },
    "256GB-Azul": { originalPrice: "R$ 7.393,73", pixPrice: "R$ 6.523,88", installmentPrice: "R$ 619,91" },
    "256GB-Roxo": { originalPrice: "R$ 7.393,73", pixPrice: "R$ 6.523,88", installmentPrice: "R$ 619,91" },
    "128GB-Starlight": { originalPrice: "R$ 5.727,07", pixPrice: "R$ 5.053,29", installmentPrice: "R$ 480,17" },
    "128GB-Space Gray": { originalPrice: "R$ 5.393,73", pixPrice: "R$ 4.759,18", installmentPrice: "R$ 452,22" },
    "128GB-Roxo": { originalPrice: "R$ 5.393,73", pixPrice: "R$ 4.759,18", installmentPrice: "R$ 452,22" },
    "128GB-Azul": { originalPrice: "R$ 5.393,73", pixPrice: "R$ 4.759,18", installmentPrice: "R$ 452,22" },
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
    "256GB-Prata": { originalPrice: "R$ 4.460,40", pixPrice: "R$ 3.935,65", installmentPrice: "R$ 373,97" },
    "256GB-Azul": { originalPrice: "R$ 4.460,40", pixPrice: "R$ 3.935,65", installmentPrice: "R$ 373,97" },
    "256GB-Rosa": { originalPrice: "R$ 4.460,40", pixPrice: "R$ 3.935,65", installmentPrice: "R$ 373,97" },
    "128GB-Prata": { originalPrice: "R$ 3.193,73", pixPrice: "R$ 2.818,00", installmentPrice: "R$ 267,77" },
    "128GB-Amarelo": { originalPrice: "R$ 3.100,40", pixPrice: "R$ 2.735,65", installmentPrice: "R$ 259,94" },
    "128GB-Azul": { originalPrice: "R$ 3.100,40", pixPrice: "R$ 2.735,65", installmentPrice: "R$ 259,94" },
    "128GB-Rosa": { originalPrice: "R$ 3.100,40", pixPrice: "R$ 2.735,65", installmentPrice: "R$ 259,94" },
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
    "256GB-Prata": { originalPrice: "R$ 3.660,40", pixPrice: "R$ 3.229,76", installmentPrice: "R$ 306,90" },
    "256GB-Azul": { originalPrice: "R$ 3.660,40", pixPrice: "R$ 3.229,76", installmentPrice: "R$ 306,90" },
    "256GB-Rosa": { originalPrice: "R$ 3.660,40", pixPrice: "R$ 3.229,76", installmentPrice: "R$ 306,90" },
    "256GB-Amarelo": { originalPrice: "R$ 3.660,40", pixPrice: "R$ 3.229,76", installmentPrice: "R$ 306,90" },
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