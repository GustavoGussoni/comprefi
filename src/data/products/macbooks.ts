import { GroupedProduct } from "../../types/product";

// MacBook Pro Space Black
import macProSpB from "../../assets/new-images/macbooks/pro-sp-b/macpro-sp-b.png";
import macProSpB1 from "../../assets/new-images/macbooks/pro-sp-b/macpro-sp-b-1.png";
import macProSpB2 from "../../assets/new-images/macbooks/pro-sp-b/macpro-sp-b-2.png";
import macProSpB3 from "../../assets/new-images/macbooks/pro-sp-b/macpro-sp-b-3.png";

// MacBook Pro Silver
import macProSlv from "../../assets/new-images/macbooks/pro-slv/macpro-slv.png";
import macProSlv1 from "../../assets/new-images/macbooks/pro-slv/macpro-slv-1.png";
import macProSlv2 from "../../assets/new-images/macbooks/pro-slv/macpro-slv-2.png";
import macProSlv3 from "../../assets/new-images/macbooks/pro-slv/macpro-slv-3.png";

// Mac Studio Silver
import macStudioSlv from "../../assets/new-images/macstudio/m4-max/macstudio-slv.png";
import macStudioSlv1 from "../../assets/new-images/macstudio/m4-max/macstudio-slv-1.png";
import macStudioSlv2 from "../../assets/new-images/macstudio/m4-max/macstudio-slv-2.png";
import macStudioSlv3 from "../../assets/new-images/macstudio/m4-max/macstudio-slv-3.png";

// Mac Mini Silver
import macMiniSlv from "../../assets/new-images/macmini/m4/macmini-slv.png";
import macMiniSlv1 from "../../assets/new-images/macmini/m4/macmini-slv-1.png";
import macMiniSlv2 from "../../assets/new-images/macmini/m4/macmini-slv-2.png";

// MacBook Air Silver
import macAirSlv from "../../assets/new-images/macbooks/air-slv/macair-slv.png";
import macAirSlv1 from "../../assets/new-images/macbooks/air-slv/macair-slv-1.png";
import macAirSlv2 from "../../assets/new-images/macbooks/air-slv/macair-slv-2.png";
import macAirSlv3 from "../../assets/new-images/macbooks/air-slv/macair-slv-3.png";

// MacBook Air Midnight
import macAirMid from "../../assets/new-images/macbooks/air-mdn/macair-mdn.png";
import macAirMid1 from "../../assets/new-images/macbooks/air-mdn/macair-mdn-1.png";
import macAirMid2 from "../../assets/new-images/macbooks/air-mdn/macair-mdn-2.png";
import macAirMid3 from "../../assets/new-images/macbooks/air-mdn/macair-mdn-3.png";

// MacBook Air Starlight
import macAirSlght from "../../assets/new-images/macbooks/air-slght/macair-slght.png";
import macAirSlght1 from "../../assets/new-images/macbooks/air-slght/macair-slght-1.png";
import macAirSlght2 from "../../assets/new-images/macbooks/air-slght/macair-slght-2.png";
import macAirSlght3 from "../../assets/new-images/macbooks/air-slght/macair-slght-3.png";

// MacBook Air Skyblue
import macAirSkyB from "../../assets/new-images/macbooks/air-skyb/macair-skyb.png";
import macAirSkyB1 from "../../assets/new-images/macbooks/air-skyb/macair-skyb-1.png";
import macAirSkyB2 from "../../assets/new-images/macbooks/air-skyb/macair-skyb-2.png";
import macAirSkyB3 from "../../assets/new-images/macbooks/air-skyb/macair-skyb-3.png";

// MacBook Air M3 Space Gray
import macAirM3SpG from "../../assets/new-images/macbooks/air-m3-sp-g/macair-m3-sp-g.png";
import macAirM3SpG1 from "../../assets/new-images/macbooks/air-m3-sp-g/macair-m3-sp-g-1.png";
import macAirM3SpG2 from "../../assets/new-images/macbooks/air-m3-sp-g/macair-m3-sp-g-2.png";
import macAirM3SpG3 from "../../assets/new-images/macbooks/air-m3-sp-g/macair-m3-sp-g-3.png";

export const macbooksProducts: GroupedProduct[] = [
  {
    slug: "mac-studio-m4-max-36gb",
    model: "Mac Studio M4 Max 36GB",
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      "Chip M4 Max (14/16-core CPU, 32/40-core GPU), 36 GB de memória unificada, Thunderbolt 5, HDMI, SDXC, Wi-Fi 6E. Desempenho profissional em formato compacto.",
    storages: ["512GB"],
    colors: [
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: macStudioSlv,
        gallery: [macStudioSlv1, macStudioSlv2, macStudioSlv3],
      },
    ],
    pricing: {
      "512GB-Silver": {
        originalPrice: "R$ 20.786,00",
        installmentPrice: "R$ 1.799,62",
        pixPrice: "R$ 18.939,00",
      },
    },
  },
  {
    slug: "macbook-pro-16-m4-pro-24gb",
    model: 'MacBook Pro 16" M4 Pro 24GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 16.2", Chip M4 Pro (14-core CPU, 20-core GPU), 24 GB de memória unificada, 3x Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 6E.',
    storages: ["512GB"],
    colors: [
      {
        name: "Space Black",
        hex: "#1C1C1E",
        image: macProSpB,
        gallery: [macProSpB1, macProSpB2, macProSpB3],
      },
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: macProSlv,
        gallery: [macProSlv1, macProSlv2, macProSlv3],
      },
    ],
    pricing: {
      "512GB-Space Black": {
        originalPrice: "R$ 20.299,00",
        installmentPrice: "R$ 1.757,00",
        pixPrice: "R$ 18.495,00",
      },
      "512GB-Silver": {
        originalPrice: "R$ 20.299,00",
        installmentPrice: "R$ 1.757,00",
        pixPrice: "R$ 18.495,00",
      },
    },
  },
  {
    slug: "macbook-pro-14-m4-24gb",
    model: 'MacBook Pro 14" M4 24GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 14.2", Chip M4 (10-core CPU, 10-core GPU), 24 GB de memória unificada, 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, Wi-Fi 6E.',
    storages: ["1TB"],
    colors: [
      {
        name: "Space Black",
        hex: "#1C1C1E",
        image: macProSpB,
        gallery: [macProSpB1, macProSpB2, macProSpB3],
      },
    ],
    pricing: {
      "1TB-Space Black": {
        originalPrice: "R$ 18.775,00",
        installmentPrice: "R$ 1.625,42",
        pixPrice: "R$ 17.106,00",
      },
    },
  },
  {
    slug: "macbook-pro-14-m5-24gb",
    model: 'MacBook Pro 14" M5 24GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 14.2", Chip M5 (próxima geração), 24 GB de memória unificada, Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 7.',
    storages: ["512GB"],
    colors: [
      {
        name: "Space Black",
        hex: "#1C1C1E",
        image: macProSpB,
        gallery: [macProSpB1, macProSpB2, macProSpB3],
      },
    ],
    pricing: {
      "512GB-Space Black": {
        originalPrice: "R$ 17.494,00",
        installmentPrice: "R$ 1.514,56",
        pixPrice: "R$ 15.939,00",
      },
    },
  },
  {
    slug: "macbook-pro-14-m4-pro-24gb",
    model: 'MacBook Pro 14" M4 Pro 24GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 14.2", Chip M4 Pro (12/14-core CPU, 16/20-core GPU), 24 GB de memória unificada, 3x Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 6E.',
    storages: ["512GB"],
    colors: [
      {
        name: "Space Black",
        hex: "#1C1C1E",
        image: macProSpB,
        gallery: [macProSpB1, macProSpB2, macProSpB3],
      },
    ],
    pricing: {
      "512GB-Space Black": {
        originalPrice: "R$ 15.970,00",
        installmentPrice: "R$ 1.382,59",
        pixPrice: "R$ 14.550,00",
      },
    },
  },
  {
    slug: "macbook-pro-14-m5-16gb",
    model: 'MacBook Pro 14" M5 16GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 14.2", Chip M5 (próxima geração), 16 GB de memória unificada, Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 7.',
    storages: ["512GB", "1TB"],
    colors: [
      {
        name: "Space Black",
        hex: "#1C1C1E",
        image: macProSpB,
        gallery: [macProSpB1, macProSpB2, macProSpB3],
      },
    ],
    pricing: {
      "512GB-Space Black": {
        originalPrice: "R$ 13.287,00",
        installmentPrice: "R$ 1.150,31",
        pixPrice: "R$ 12.106,00",
      },
      "1TB-Space Black": {
        originalPrice: "R$ 14.933,00",
        installmentPrice: "R$ 1.292,84",
        pixPrice: "R$ 13.606,00",
      },
    },
  },
  // MacBook Air 15" M4 24GB — removido (zerado na planilha)
  {
    slug: "macbook-air-15-m4-16gb",
    model: 'MacBook Air 15" M4 16GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 15.3", Chip M4 (10-core CPU, 10-core GPU), 16 GB de memória unificada, 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E.',
    storages: ["256GB", "512GB"],
    colors: [
      {
        name: "Midnight",
        hex: "#1C1C2E",
        image: macAirMid,
        gallery: [macAirMid1, macAirMid2, macAirMid3],
      },
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: macAirSlv,
        gallery: [macAirSlv1, macAirSlv2, macAirSlv3],
      },
      {
        name: "Skyblue",
        hex: "#87CEEB",
        image: macAirSkyB,
        gallery: [macAirSkyB1, macAirSkyB2, macAirSkyB3],
      },
    ],
    colorsByStorage: {
      "256GB": ["Midnight", "Silver", "Skyblue"],
      "512GB": ["Midnight"],
    },
    pricing: {
      "256GB-Midnight": {
        originalPrice: "R$ 10.665,00",
        installmentPrice: "R$ 923,32",
        pixPrice: "R$ 9.717,00",
      },
      "256GB-Silver": {
        originalPrice: "R$ 10.665,00",
        installmentPrice: "R$ 923,32",
        pixPrice: "R$ 9.717,00",
      },
      "256GB-Skyblue": {
        originalPrice: "R$ 10.665,00",
        installmentPrice: "R$ 923,32",
        pixPrice: "R$ 9.717,00",
      },
      "512GB-Midnight": {
        originalPrice: "R$ 11.885,00",
        installmentPrice: "R$ 1.028,90",
        pixPrice: "R$ 10.828,00",
      },
    },
  },
  {
    slug: "macbook-air-13-m4-16gb",
    model: 'MacBook Air 13" M4 16GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 13.6", Chip M4 (10-core CPU, 10-core GPU), 16 GB de memória unificada, 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E.',
    storages: ["256GB", "512GB"],
    colors: [
      {
        name: "Midnight",
        hex: "#1C1C2E",
        image: macAirMid,
        gallery: [macAirMid1, macAirMid2, macAirMid3],
      },
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: macAirSlv,
        gallery: [macAirSlv1, macAirSlv2, macAirSlv3],
      },
      {
        name: "Starlight",
        hex: "#F5E6D3",
        image: macAirSlght,
        gallery: [macAirSlght1, macAirSlght2, macAirSlght3],
      },
      {
        name: "Skyblue",
        hex: "#87CEEB",
        image: macAirSkyB,
        gallery: [macAirSkyB1, macAirSkyB2, macAirSkyB3],
      },
    ],
    colorsByStorage: {
      "256GB": ["Skyblue", "Midnight", "Silver", "Starlight"],
      "512GB": ["Silver", "Starlight", "Skyblue"],
    },
    pricing: {
      "256GB-Skyblue": {
        originalPrice: "R$ 8.104,00",
        installmentPrice: "R$ 701,60",
        pixPrice: "R$ 7.384,00",
      },
      "256GB-Midnight": {
        originalPrice: "R$ 8.104,00",
        installmentPrice: "R$ 701,60",
        pixPrice: "R$ 7.384,00",
      },
      "256GB-Silver": {
        originalPrice: "R$ 8.165,00",
        installmentPrice: "R$ 706,88",
        pixPrice: "R$ 7.439,00",
      },
      "256GB-Starlight": {
        originalPrice: "R$ 8.104,00",
        installmentPrice: "R$ 701,60",
        pixPrice: "R$ 7.384,00",
      },
      "512GB-Silver": {
        originalPrice: "R$ 9.689,00",
        installmentPrice: "R$ 838,86",
        pixPrice: "R$ 8.828,00",
      },
      "512GB-Starlight": {
        originalPrice: "R$ 9.689,00",
        installmentPrice: "R$ 838,86",
        pixPrice: "R$ 8.828,00",
      },
      "512GB-Skyblue": {
        originalPrice: "R$ 9.689,00",
        installmentPrice: "R$ 838,86",
        pixPrice: "R$ 8.828,00",
      },
    },
  },
  {
    slug: "macbook-air-15-m3-8gb",
    model: 'MacBook Air 15" M3 8GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 15.3", Chip M3 (8-core CPU, 10-core GPU), 8 GB de memória unificada, 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E.',
    storages: ["512GB"],
    colors: [
      {
        name: "Space Gray",
        hex: "#4A4A4A",
        image: macAirM3SpG,
        gallery: [macAirM3SpG1, macAirM3SpG2, macAirM3SpG3],
      },
    ],
    // 256GB-Midnight removido (zerado na planilha)
    pricing: {
      "512GB-Space Gray": {
        originalPrice: "R$ 9.567,00",
        installmentPrice: "R$ 828,30",
        pixPrice: "R$ 8.717,00",
      },
    },
  },
  {
    slug: "macbook-air-15-m3-16gb",
    model: 'MacBook Air 15" M3 16GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 15.3", Chip M3 (8-core CPU, 10-core GPU), 16 GB de memória unificada, 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E.',
    storages: ["256GB"],
    colors: [
      {
        name: "Midnight",
        hex: "#1C1C2E",
        image: macAirMid,
        gallery: [macAirMid1, macAirMid2, macAirMid3],
      },
    ],
    pricing: {
      "256GB-Midnight": {
        originalPrice: "R$ 8.592,00",
        installmentPrice: "R$ 743,83",
        pixPrice: "R$ 7.828,00",
      },
    },
  },
  {
    slug: "mac-mini-m4-16gb",
    model: "Mac Mini M4 16GB",
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      "Chip M4 (10-core CPU, 10-core GPU), 16 GB de memória unificada, 2x USB-C (frente), 3x Thunderbolt 4 (trás), HDMI, Gigabit Ethernet, Wi-Fi 6E.",
    storages: ["256GB", "512GB"],
    colors: [
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: macMiniSlv,
        gallery: [macMiniSlv1, macMiniSlv2],
      },
    ],
    pricing: {
      "256GB-Silver": {
        originalPrice: "R$ 4.994,00",
        installmentPrice: "R$ 432,38",
        pixPrice: "R$ 4.550,00",
      },
      "512GB-Silver": {
        originalPrice: "R$ 7.494,00",
        installmentPrice: "R$ 648,81",
        pixPrice: "R$ 6.828,00",
      },
    },
  },
];