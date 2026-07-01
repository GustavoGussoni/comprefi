import { GroupedProduct } from "../../types/product";

// MacBook Pro Space Black
import macProSpB from "../../assets/new-images/macbooks/pro-sp-b/macpro-sp-b.webp";
import macProSpB1 from "../../assets/new-images/macbooks/pro-sp-b/macpro-sp-b-1.webp";
import macProSpB2 from "../../assets/new-images/macbooks/pro-sp-b/macpro-sp-b-2.webp";
import macProSpB3 from "../../assets/new-images/macbooks/pro-sp-b/macpro-sp-b-3.webp";

// MacBook Pro Silver
import macProSlv from "../../assets/new-images/macbooks/pro-slv/macpro-slv.webp";
import macProSlv1 from "../../assets/new-images/macbooks/pro-slv/macpro-slv-1.webp";
import macProSlv2 from "../../assets/new-images/macbooks/pro-slv/macpro-slv-2.webp";
import macProSlv3 from "../../assets/new-images/macbooks/pro-slv/macpro-slv-3.webp";

// Mac Studio Silver
import macStudioSlv from "../../assets/new-images/macstudio/m4-max/macstudio-slv.webp";
import macStudioSlv1 from "../../assets/new-images/macstudio/m4-max/macstudio-slv-1.webp";
import macStudioSlv2 from "../../assets/new-images/macstudio/m4-max/macstudio-slv-2.webp";
import macStudioSlv3 from "../../assets/new-images/macstudio/m4-max/macstudio-slv-3.webp";

// Mac Mini Silver
import macMiniSlv from "../../assets/new-images/macmini/m4/macmini-slv.webp";
import macMiniSlv1 from "../../assets/new-images/macmini/m4/macmini-slv-1.webp";
import macMiniSlv2 from "../../assets/new-images/macmini/m4/macmini-slv-2.webp";

// MacBook Air Silver
import macAirSlv from "../../assets/new-images/macbooks/air-slv/macair-slv.webp";
import macAirSlv1 from "../../assets/new-images/macbooks/air-slv/macair-slv-1.webp";
import macAirSlv2 from "../../assets/new-images/macbooks/air-slv/macair-slv-2.webp";
import macAirSlv3 from "../../assets/new-images/macbooks/air-slv/macair-slv-3.webp";

// MacBook Air Midnight
import macAirMid from "../../assets/new-images/macbooks/air-mdn/macair-mdn.webp";
import macAirMid1 from "../../assets/new-images/macbooks/air-mdn/macair-mdn-1.webp";
import macAirMid2 from "../../assets/new-images/macbooks/air-mdn/macair-mdn-2.webp";
import macAirMid3 from "../../assets/new-images/macbooks/air-mdn/macair-mdn-3.webp";

// MacBook Air Starlight
import macAirSlght from "../../assets/new-images/macbooks/air-slght/macair-slght.webp";
import macAirSlght1 from "../../assets/new-images/macbooks/air-slght/macair-slght-1.webp";
import macAirSlght2 from "../../assets/new-images/macbooks/air-slght/macair-slght-2.webp";
import macAirSlght3 from "../../assets/new-images/macbooks/air-slght/macair-slght-3.webp";

// MacBook Air Skyblue
import macAirSkyB from "../../assets/new-images/macbooks/air-skyb/macair-skyb.webp";
import macAirSkyB1 from "../../assets/new-images/macbooks/air-skyb/macair-skyb-1.webp";
import macAirSkyB2 from "../../assets/new-images/macbooks/air-skyb/macair-skyb-2.webp";
import macAirSkyB3 from "../../assets/new-images/macbooks/air-skyb/macair-skyb-3.webp";

// MacBook Neo Silver
import macNeoSlv from "../../assets/new-images/macbooks/neo/macneo-slv.webp";
import macNeoSlv1 from "../../assets/new-images/macbooks/neo/macneo-slv-1.webp";
import macNeoSlv2 from "../../assets/new-images/macbooks/neo/macneo-slv-2.webp";

// MacBook Neo Blush
import macNeoBlush from "../../assets/new-images/macbooks/neo/macneo-blush.webp";
import macNeoBlush1 from "../../assets/new-images/macbooks/neo/macneo-blush-1.webp";
import macNeoBlush2 from "../../assets/new-images/macbooks/neo/macneo-blush-2.webp";

// MacBook Neo Citrus
import macNeoCitrus from "../../assets/new-images/macbooks/neo/macneo-citrus.webp";
import macNeoCitrus1 from "../../assets/new-images/macbooks/neo/macneo-citrus-1.webp";
import macNeoCitrus2 from "../../assets/new-images/macbooks/neo/macneo-citrus-2.webp";

// MacBook Neo Indigo
import macNeoIndigo from "../../assets/new-images/macbooks/neo/macneo-indigo.webp";
import macNeoIndigo1 from "../../assets/new-images/macbooks/neo/macneo-indigo-1.webp";
import macNeoIndigo2 from "../../assets/new-images/macbooks/neo/macneo-indigo-2.webp";

export const macbooksProducts: GroupedProduct[] = [
  // ═══════════════════════════════════════════════
  // MacBook Pro M5
  // ═══════════════════════════════════════════════
  {
    slug: "macbook-pro-16-m5-max-48gb",
    model: 'MacBook Pro 16" M5 Max 48GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 16.2", Chip M5 Max (16-core CPU, 40-core GPU), 48 GB de memória unificada, Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 7. Desempenho extremo para profissionais.',
    storages: ["2TB"],
    colors: [
      {
        name: "Space Black",
        hex: "#1C1C1E",
        image: macProSpB,
        gallery: [macProSpB1, macProSpB2, macProSpB3],
      },
    ],
    pricing: {
      "2TB-Space Black": {
        originalPrice: "R$ 52.636,00",
        installmentPrice: "R$ 4.269,60",
        pixPrice: "R$ 44.933",
      },
    },
  },
  {
    slug: "macbook-pro-16-m5-max-36gb",
    model: 'MacBook Pro 16" M5 Max 36GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 16.2", Chip M5 Max (14-core CPU, 32-core GPU), 36 GB de memória unificada, Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 7. Desempenho profissional de alto nível.',
    storages: ["2TB"],
    colors: [
      {
        name: "Space Black",
        hex: "#1C1C1E",
        image: macProSpB,
        gallery: [macProSpB1, macProSpB2, macProSpB3],
      },
    ],
    pricing: {
      "2TB-Space Black": {
        originalPrice: "R$ 42.636,00",
        installmentPrice: "R$ 3.458,45",
        pixPrice: "R$ 36.397",
      },
    },
  },
  {
    slug: "macbook-pro-16-m5-pro-24gb",
    model: 'MacBook Pro 16" M5 Pro 24GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 16.2", Chip M5 Pro (14-core CPU, 20-core GPU), 24 GB de memória unificada, Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 7.',
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
        originalPrice: "R$ 27.635,00",
        installmentPrice: "R$ 2.241,60",
        pixPrice: "R$ 23.591",
      },
    },
  },
  {
    slug: "macbook-pro-14-m5-32gb",
    model: 'MacBook Pro 14" M5 32GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 14.2", Chip M5 (próxima geração), 32 GB de memória unificada, Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 7.',
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
        originalPrice: "R$ 24.778,00",
        installmentPrice: "R$ 2.009,84",
        pixPrice: "R$ 21.152",
      },
    },
  },
  {
    slug: "macbook-pro-14-m5-pro-24gb",
    model: 'MacBook Pro 14" M5 Pro 24GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 14.2", Chip M5 Pro (14-core CPU, 20-core GPU), 24 GB de memória unificada, Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 7.',
    storages: ["1TB", "2TB"],
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
    colorsByStorage: {
      "1TB": ["Space Black", "Silver"],
      "2TB": ["Space Black"],
    },
    pricing: {
      "1TB-Space Black": {
        originalPrice: "R$ 24.065,00",
        installmentPrice: "R$ 1.952,02",
        pixPrice: "R$ 20.543",
      },
      "1TB-Silver": {
        originalPrice: "R$ 24.065,00",
        installmentPrice: "R$ 1.952,02",
        pixPrice: "R$ 20.543",
      },
      "2TB-Space Black": {
        originalPrice: "R$ 27.350,00",
        installmentPrice: "R$ 2.218,54",
        pixPrice: "R$ 23.348",
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
    storages: ["1TB"],
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
      "1TB-Space Black": {
        originalPrice: "R$ 19.636,00",
        installmentPrice: "R$ 1.592,79",
        pixPrice: "R$ 16.763",
      },
      "1TB-Silver": {
        originalPrice: "R$ 19.636,00",
        installmentPrice: "R$ 1.592,79",
        pixPrice: "R$ 16.763",
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
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: macProSlv,
        gallery: [macProSlv1, macProSlv2, macProSlv3],
      },
    ],
    colorsByStorage: {
      "512GB": ["Space Black"],
      "1TB": ["Space Black", "Silver"],
    },
    pricing: {
      "512GB-Space Black": {
        originalPrice: "R$ 16.206,00",
        installmentPrice: "R$ 1.314,57",
        pixPrice: "R$ 13.835",
      },
      "1TB-Space Black": {
        originalPrice: "R$ 17.636,00",
        installmentPrice: "R$ 1.430,56",
        pixPrice: "R$ 15.055",
      },
      "1TB-Silver": {
        originalPrice: "R$ 17.636,00",
        installmentPrice: "R$ 1.430,56",
        pixPrice: "R$ 15.055",
      },
    },
  },
  // ═══════════════════════════════════════════════
  // MacBook Pro M4
  // ═══════════════════════════════════════════════
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
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: macProSlv,
        gallery: [macProSlv1, macProSlv2, macProSlv3],
      },
    ],
    pricing: {
      "512GB-Space Black": {
        originalPrice: "R$ 19.635,00",
        installmentPrice: "R$ 1.592,68",
        pixPrice: "R$ 16.761",
      },
      "512GB-Silver": {
        originalPrice: "R$ 16.761,00",
        installmentPrice: "R$ 1.451,11",
        pixPrice: "R$ 15.271",
      },
    },
  },
  {
    slug: "macbook-pro-14-m4-16gb",
    model: 'MacBook Pro 14" M4 16GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina XDR 14.2", Chip M4 (10-core CPU, 10-core GPU), 16 GB de memória unificada, 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, Wi-Fi 6E.',
    storages: ["1TB"],
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
      "1TB-Space Black": {
        originalPrice: "R$ 15.779,00",
        installmentPrice: "R$ 1.279,92",
        pixPrice: "R$ 13.470",
      },
      "1TB-Silver": {
        originalPrice: "R$ 15.779,00",
        installmentPrice: "R$ 1.279,92",
        pixPrice: "R$ 13.470",
      },
    },
  },
  // ═══════════════════════════════════════════════
  // Mac Studio
  // ═══════════════════════════════════════════════
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
        originalPrice: "R$ 31.208,00",
        installmentPrice: "R$ 2.531,41",
        pixPrice: "R$ 26.641",
      },
    },
  },
  // ═══════════════════════════════════════════════
  // MacBook Air M5
  // ═══════════════════════════════════════════════
  {
    slug: "macbook-air-15-m5-16gb",
    model: 'MacBook Air 15" M5 16GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 15.3", Chip M5 (próxima geração), 16 GB de memória unificada, Thunderbolt / USB 4, MagSafe 3, Wi-Fi 7.',
    storages: ["512GB"],
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
      {
        name: "Starlight",
        hex: "#F5E6D3",
        image: macAirSlght,
        gallery: [macAirSlght1, macAirSlght2, macAirSlght3],
      },
    ],
    pricing: {
      "512GB-Midnight": {
        originalPrice: "R$ 12.555,00",
        installmentPrice: "R$ 1.086,97",
        pixPrice: "R$ 11.439",
      },
      "512GB-Silver": {
        originalPrice: "R$ 12.555,00",
        installmentPrice: "R$ 1.086,97",
        pixPrice: "R$ 11.439",
      },
      "512GB-Skyblue": {
        originalPrice: "R$ 12.555,00",
        installmentPrice: "R$ 1.086,97",
        pixPrice: "R$ 11.439",
      },
      "512GB-Starlight": {
        originalPrice: "R$ 12.555,00",
        installmentPrice: "R$ 1.086,97",
        pixPrice: "R$ 11.439",
      },
    },
  },
  {
    slug: "macbook-air-13-m5-16gb",
    model: 'MacBook Air 13" M5 16GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 13.6", Chip M5 (próxima geração), 16 GB de memória unificada, Thunderbolt / USB 4, MagSafe 3, Wi-Fi 7.',
    storages: ["512GB"],
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
      {
        name: "Starlight",
        hex: "#F5E6D3",
        image: macAirSlght,
        gallery: [macAirSlght1, macAirSlght2, macAirSlght3],
      },
    ],
    pricing: {
      "512GB-Midnight": {
        originalPrice: "R$ 9.872,00",
        installmentPrice: "R$ 854,69",
        pixPrice: "R$ 8.995",
      },
      "512GB-Silver": {
        originalPrice: "R$ 9.872,00",
        installmentPrice: "R$ 854,69",
        pixPrice: "R$ 8.995",
      },
      "512GB-Skyblue": {
        originalPrice: "R$ 9.872,00",
        installmentPrice: "R$ 854,69",
        pixPrice: "R$ 8.995",
      },
      "512GB-Starlight": {
        originalPrice: "R$ 9.872,00",
        installmentPrice: "R$ 854,69",
        pixPrice: "R$ 8.995",
      },
    },
  },
  // ═══════════════════════════════════════════════
  // MacBook Air M4
  // ═══════════════════════════════════════════════
  {
    slug: "macbook-air-15-m4-16gb",
    model: 'MacBook Air 15" M4 16GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 15.3", Chip M4 (10-core CPU, 10-core GPU), 16 GB de memória unificada, 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E.',
    storages: ["256GB"],
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
    // 512GB removido (indisponível no momento)
    pricing: {
      "256GB-Midnight": {
        originalPrice: "R$ 9.322,00",
        installmentPrice: "R$ 807,08",
        pixPrice: "R$ 8.494",
      },
      "256GB-Silver": {
        originalPrice: "R$ 9.322,00",
        installmentPrice: "R$ 807,08",
        pixPrice: "R$ 8.494",
      },
      "256GB-Starlight": {
        originalPrice: "R$ 9.322,00",
        installmentPrice: "R$ 807,08",
        pixPrice: "R$ 8.494",
      },
      "256GB-Skyblue": {
        originalPrice: "R$ 9.322,00",
        installmentPrice: "R$ 807,08",
        pixPrice: "R$ 8.494",
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
      "256GB": ["Skyblue"],
      "512GB": ["Midnight", "Silver", "Starlight", "Skyblue"],
    },
    pricing: {
      "256GB-Skyblue": {
        originalPrice: "R$ 8.347,00",
        installmentPrice: "R$ 722,61",
        pixPrice: "R$ 7.605",
      },
      "512GB-Midnight": {
        originalPrice: "R$ 9.322,00",
        installmentPrice: "R$ 807,08",
        pixPrice: "R$ 8.494",
      },
      "512GB-Silver": {
        originalPrice: "R$ 9.322,00",
        installmentPrice: "R$ 807,08",
        pixPrice: "R$ 8.494",
      },
      "512GB-Starlight": {
        originalPrice: "R$ 9.322,00",
        installmentPrice: "R$ 807,08",
        pixPrice: "R$ 8.494",
      },
      "512GB-Skyblue": {
        originalPrice: "R$ 9.322,00",
        installmentPrice: "R$ 807,08",
        pixPrice: "R$ 8.494",
      },
    },
  },
  // ═══════════════════════════════════════════════
  // MacBook Neo
  // ═══════════════════════════════════════════════
  {
    slug: "macbook-neo-13-8gb",
    model: 'MacBook Neo 13" 8GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 13.6", 8 GB de memória unificada, design compacto e leve, ideal para uso diário e produtividade.',
    storages: ["256GB", "512GB"],
    colors: [
      {
        name: "Silver",
        hex: "#C0C0C0",
        image: macNeoSlv,
        gallery: [macNeoSlv1, macNeoSlv2],
      },
      {
        name: "Blush",
        hex: "#E8A0BF",
        image: macNeoBlush,
        gallery: [macNeoBlush1, macNeoBlush2],
      },
      {
        name: "Citrus",
        hex: "#C5D93D",
        image: macNeoCitrus,
        gallery: [macNeoCitrus1, macNeoCitrus2],
      },
      {
        name: "Indigo",
        hex: "#4B0082",
        image: macNeoIndigo,
        gallery: [macNeoIndigo1, macNeoIndigo2],
      },
    ],
    pricing: {
      "256GB": {
        originalPrice: "R$ 6.397,00",
        installmentPrice: "R$ 553,79",
        pixPrice: "R$ 5.828",
      },
      "512GB": {
        originalPrice: "R$ 7.189,00",
        installmentPrice: "R$ 622,42",
        pixPrice: "R$ 6.550",
      },
    },
  },
  // ═══════════════════════════════════════════════
  // Mac Mini
  // ═══════════════════════════════════════════════
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
        originalPrice: "R$ 6.517,00",
        installmentPrice: "R$ 564,24",
        pixPrice: "R$ 5.938",
      },
      "512GB-Silver": {
        originalPrice: "R$ 7.737,00",
        installmentPrice: "R$ 669,82",
        pixPrice: "R$ 7.049",
      },
    },
  },
];
