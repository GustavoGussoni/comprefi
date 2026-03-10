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
        originalPrice: "R$ 20.786,95",
        installmentPrice: "R$ 1.799,62",
        pixPrice: "R$ 18.939,22",
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
        originalPrice: "R$ 20.421,10",
        installmentPrice: "R$ 1.767,95",
        pixPrice: "R$ 18.605,89",
      },
      "512GB-Silver": {
        originalPrice: "R$ 20.421,10",
        installmentPrice: "R$ 1.767,95",
        pixPrice: "R$ 18.605,89",
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
        originalPrice: "R$ 18.347,93",
        installmentPrice: "R$ 1.588,46",
        pixPrice: "R$ 16.717,00",
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
        originalPrice: "R$ 17.494,27",
        installmentPrice: "R$ 1.514,56",
        pixPrice: "R$ 15.939,22",
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
        originalPrice: "R$ 15.969,88",
        installmentPrice: "R$ 1.382,59",
        pixPrice: "R$ 14.550,33",
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
        originalPrice: "R$ 13.225,98",
        installmentPrice: "R$ 1.145,03",
        pixPrice: "R$ 12.050,33",
      },
      "1TB-Space Black": {
        originalPrice: "R$ 15.055,24",
        installmentPrice: "R$ 1.303,40",
        pixPrice: "R$ 13.717,00",
      },
    },
  },
  {
    slug: "macbook-air-15-m4-24gb",
    model: 'MacBook Air 15" M4 24GB',
    category: "Macbooks",
    details: "aparelho novo",
    battery: "100%",
    specs:
      'Tela Liquid Retina 15.3", Chip M4 (10-core CPU, 10-core GPU), 24 GB de memória unificada, 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E.',
    storages: ["512GB"],
    colors: [
      {
        name: "Midnight",
        hex: "#1C1C2E",
        image: macAirMid,
        gallery: [macAirMid1, macAirMid2, macAirMid3],
      },
    ],
    pricing: {
      "512GB-Midnight": {
        originalPrice: "R$ 12.982,07",
        installmentPrice: "R$ 1.123,92",
        pixPrice: "R$ 11.828,11",
      },
    },
  },
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
        name: "Starlight",
        hex: "#F5E6D3",
        image: macAirSlght,
        gallery: [macAirSlght1, macAirSlght2, macAirSlght3],
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
      "256GB": ["Silver", "Skyblue"],
      "512GB": ["Midnight", "Starlight"],
    },
    pricing: {
      "256GB-Silver": {
        originalPrice: "R$ 9.567,44",
        installmentPrice: "R$ 828,30",
        pixPrice: "R$ 8.717,00",
      },
      "256GB-Skyblue": {
        originalPrice: "R$ 9.567,44",
        installmentPrice: "R$ 828,30",
        pixPrice: "R$ 8.717,00",
      },
      "512GB-Midnight": {
        originalPrice: "R$ 11.640,61",
        installmentPrice: "R$ 1.007,78",
        pixPrice: "R$ 10.605,89",
      },
      "512GB-Starlight": {
        originalPrice: "R$ 11.640,61",
        installmentPrice: "R$ 1.007,78",
        pixPrice: "R$ 10.605,89",
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
      "256GB": ["Skyblue", "Midnight", "Silver"],
      "512GB": ["Midnight", "Silver", "Starlight", "Skyblue"],
    },
    pricing: {
      "256GB-Skyblue": {
        originalPrice: "R$ 8.104,02",
        installmentPrice: "R$ 701,60",
        pixPrice: "R$ 7.383,67",
      },
      "256GB-Midnight": {
        originalPrice: "R$ 8.104,02",
        installmentPrice: "R$ 701,60",
        pixPrice: "R$ 7.383,67",
      },
      "256GB-Silver": {
        originalPrice: "R$ 8.104,02",
        installmentPrice: "R$ 701,60",
        pixPrice: "R$ 7.383,67",
      },
      "512GB-Midnight": {
        originalPrice: "R$ 9.555,24",
        installmentPrice: "R$ 827,24",
        pixPrice: "R$ 8.705,89",
      },
      "512GB-Silver": {
        originalPrice: "R$ 9.555,24",
        installmentPrice: "R$ 827,24",
        pixPrice: "R$ 8.705,89",
      },
      "512GB-Starlight": {
        originalPrice: "R$ 9.555,24",
        installmentPrice: "R$ 827,24",
        pixPrice: "R$ 8.705,89",
      },
      "512GB-Skyblue": {
        originalPrice: "R$ 9.555,24",
        installmentPrice: "R$ 827,24",
        pixPrice: "R$ 8.705,89",
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
    storages: ["256GB", "512GB"],
    colors: [
      {
        name: "Space Gray",
        hex: "#4A4A4A",
        image: "",
        gallery: [],
      },
      {
        name: "Midnight",
        hex: "#1C1C2E",
        image: macAirMid,
        gallery: [macAirMid1, macAirMid2, macAirMid3],
      },
    ],
    colorsByStorage: {
      "256GB": ["Midnight"],
      "512GB": ["Space Gray"],
    },
    pricing: {
      "256GB-Midnight": {
        originalPrice: "R$ 8.286,95",
        installmentPrice: "R$ 717,44",
        pixPrice: "R$ 7.550,33",
      },
      "512GB-Space Gray": {
        originalPrice: "R$ 9.506,46",
        installmentPrice: "R$ 823,02",
        pixPrice: "R$ 8.661,44",
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
        originalPrice: "R$ 8.469,88",
        installmentPrice: "R$ 733,28",
        pixPrice: "R$ 7.717,00",
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
        originalPrice: "R$ 4.994,27",
        installmentPrice: "R$ 432,38",
        pixPrice: "R$ 4.550,33",
      },
      "512GB-Silver": {
        originalPrice: "R$ 7.311,34",
        installmentPrice: "R$ 632,98",
        pixPrice: "R$ 6.661,44",
      },
    },
  },
];