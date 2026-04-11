import { GroupedProduct } from "../../types/product";

// Apple Watch Ultra 3 Black Ocean
import ultra3BlackOcean from "../../assets/new-images/watch/ultra-3-black/black-ocean-band/ultra-3-black-ocean.webp";
import ultra3BlackOcean1 from "../../assets/new-images/watch/ultra-3-black/black-ocean-band/ultra-3-black-ocean-1.webp";
import ultra3BlackOcean2 from "../../assets/new-images/watch/ultra-3-black/black-ocean-band/ultra-3-black-ocean-2.webp";

// Apple Watch Ultra 3 Natural Ocean
import ultra3NaturalOcean from "../../assets/new-images/watch/ultra-3-natural/black-ocean-band/ultra-3-nat-ocean.webp";
import ultra3NaturalOcean1 from "../../assets/new-images/watch/ultra-3-natural/black-ocean-band/ultra-3-nat-ocean-1.webp";
import ultra3NaturalOcean2 from "../../assets/new-images/watch/ultra-3-black/black-ocean-band/ultra-3-black-ocean-2.webp";

// Apple Watch Series 11 Black
import series11BlackSport from "../../assets/new-images/watch/series-11/black-sport-band/series-11-black-sport.webp";
import series11BlackSport1 from "../../assets/new-images/watch/series-11/black-sport-band/series-11-black-sport-1.webp";
import series11BlackSport2 from "../../assets/new-images/watch/series-11/black-sport-band/series-11-black-sport-2.webp";

// Apple Watch Series 11 Rose
import series11RoseGoldSport from "../../assets/new-images/watch/series-11/rose-gold-sport-band/series-11-rose-gold-sport.webp";
import series11RoseGoldSport1 from "../../assets/new-images/watch/series-11/rose-gold-sport-band/series-11-rose-gold-sport-1.webp";
import series11RoseGoldSport2 from "../../assets/new-images/watch/series-11/rose-gold-sport-band/series-11-rose-gold-sport-2.webp";

// Apple Watch Series 11 Silver
import series11SilverSport from "../../assets/new-images/watch/series-11/silver-sport-band/series-11-silver-sport.webp";
import series11SilverSport1 from "../../assets/new-images/watch/series-11/silver-sport-band/series-11-silver-sport-1.webp";
import series11SilverSport2 from "../../assets/new-images/watch/series-11/silver-sport-band/series-11-silver-sport-2.webp";

// Apple Watch Series 11 Space Gray
import series11SpaceGraySport from "../../assets/new-images/watch/series-11/space-gray-sport-band/series-11-space-gray-sport.webp";
import series11SpaceGraySport1 from "../../assets/new-images/watch/series-11/space-gray-sport-band/series-11-space-gray-sport-1.webp";
import series11SpaceGraySport2 from "../../assets/new-images/watch/series-11/space-gray-sport-band/series-11-space-gray-sport-2.webp";

// Apple Watch SE 3 Midnight
import se3MidnightSport from "../../assets/new-images/watch/se-3/midnight-sport-band/se-3-midnight-sport.webp";
import se3MidnightSport1 from "../../assets/new-images/watch/se-3/midnight-sport-band/se-3-midnight-sport-1.webp";
import se3MidnightSport2 from "../../assets/new-images/watch/se-3/midnight-sport-band/se-3-midnight-sport-2.webp";

// Apple Watch SE 3 Starlight
import se3StarlightSport from "../../assets/new-images/watch/se-3/starlight-sport-band/se-3-starlight-sport.webp";
import se3StarlightSport1 from "../../assets/new-images/watch/se-3/starlight-sport-band/se-3-starlight-sport-1.webp";
import se3StarlightSport2 from "../../assets/new-images/watch/se-3/starlight-sport-band/se-3-starlight-sport-2.webp";

// ============================================
// Apple Watch Ultra 3
// ============================================
const ultraWatch3Ocean: GroupedProduct = {
  slug: "apple-watch-ultra-3-ocean",
  model: "Apple Watch Ultra 3 Ocean",
  specs: "Chip S11 SiP, Tela Retina Sempre Ativa LTPO OLED (até 4000 nits), GPS de precisão e dupla frequência, Botão de Ação, Sirene, Profundímetro, Sensor de temperatura da água, Oxigênio no Sangue, ECG, Sensor cardíaco óptico, Detecção de Queda/Acidente, Resistência à água 100m, Certificação MIL-STD 810H, Mergulho recreativo até 40m, Wi-Fi 6E, Bluetooth 5.3",
  category: "apple-watch",
  details: "aparelho novo",
  battery: "100%",
  storages: ["49mm"],
  colors: [
    { name: "Natural", hex: "#c4b5a0", image: ultra3NaturalOcean, gallery: [ultra3NaturalOcean1, ultra3NaturalOcean2] },
    { name: "Preto", hex: "#1d1d1f", image: ultra3BlackOcean, gallery: [ultra3BlackOcean1, ultra3BlackOcean2] },
  ],
  pricing: {
    "49mm-Natural": { originalPrice: "R$ 6.661,00", pixPrice: "R$ 5.904,00", installmentPrice: "R$ 561,00" },
    "49mm-Preto": { originalPrice: "R$ 5.956,00", pixPrice: "R$ 5.279,00", installmentPrice: "R$ 502,00" },
  },
};

// ============================================
// Apple Watch Series 11
// ============================================

const series11SportBand: GroupedProduct = {
  slug: "apple-watch-series-11-sport-band",
  model: "Apple Watch Series 11 Sport Band",
  specs: "Chip S11 SiP, Tela Retina Sempre Ativa LTPO OLED (até 3000 nits), Oxigênio no Sangue, ECG, Sensor cardíaco óptico, Detecção de Queda/Acidente, Sensor de temperatura, Resistência à água 50m, GPS, Wi-Fi 6E, Bluetooth 5.3",
  category: "apple-watch",
  details: "aparelho novo",
  battery: "100%",
  storages: ["42mm", "46mm"],
  colors: [
    { name: "Preto", hex: "#1d1d1f", image: series11BlackSport, gallery: [series11BlackSport1, series11BlackSport2] },
    { name: "Space Gray", hex: "#86868b", image: series11SpaceGraySport, gallery: [series11SpaceGraySport1, series11SpaceGraySport2] },
    { name: "Silver", hex: "#e3e4e5", image: series11SilverSport, gallery: [series11SilverSport1, series11SilverSport2] },
    { name: "Rose", hex: "#e8c4b8", image: series11RoseGoldSport, gallery: [series11RoseGoldSport1, series11RoseGoldSport2] },
  ],
  pricing: {
    "46mm-Preto": { originalPrice: "R$ 3.452,00", pixPrice: "R$ 2.994,00", installmentPrice: "R$ 285,00" },
    "46mm-Space Gray": { originalPrice: "R$ 3.452,00", pixPrice: "R$ 2.994,00", installmentPrice: "R$ 285,00" },
    "46mm-Silver": { originalPrice: "R$ 3.452,00", pixPrice: "R$ 2.994,00", installmentPrice: "R$ 285,00" },
    "46mm-Rose": { originalPrice: "R$ 3.452,00", pixPrice: "R$ 2.994,00", installmentPrice: "R$ 285,00" },
    "42mm-Preto": { originalPrice: "R$ 3.257,00", pixPrice: "R$ 2.826,00", installmentPrice: "R$ 269,00" },
    "42mm-Space Gray": { originalPrice: "R$ 3.257,00", pixPrice: "R$ 2.826,00", installmentPrice: "R$ 269,00" },
    "42mm-Silver": { originalPrice: "R$ 3.257,00", pixPrice: "R$ 2.826,00", installmentPrice: "R$ 269,00" },
    "42mm-Rose": { originalPrice: "R$ 3.257,00", pixPrice: "R$ 2.826,00", installmentPrice: "R$ 269,00" },
  },
};

// ============================================
// Apple Watch SE 3
// ============================================

const se3SportBand: GroupedProduct = {
  slug: "apple-watch-se-3-sport-band",
  model: "Apple Watch SE 3 Sport Band",
  specs: "Chip S10 SiP, Tela Retina LTPO OLED (até 1000 nits), Sensor cardíaco óptico, Detecção de Queda/Acidente, Resistência à água 50m, GPS, Wi-Fi 6, Bluetooth 5.3",
  category: "apple-watch",
  details: "aparelho novo",
  battery: "100%",
  storages: ["40mm", "44mm"],
  colors: [
    { name: "Midnight", hex: "#1d1d2c", image: se3MidnightSport, gallery: [se3MidnightSport1, se3MidnightSport2] },
    { name: "Starlight", hex: "#f0e4d3", image: se3StarlightSport, gallery: [se3StarlightSport1, se3StarlightSport2] },
  ],
  colorsByStorage: {
    "40mm": ["Midnight", "Starlight"],
    "44mm": ["Midnight"],
  },
  pricing: {
    "44mm-Midnight": { originalPrice: "R$ 2.896,00", pixPrice: "R$ 2.512,00", installmentPrice: "R$ 239,00" },
    "40mm-Midnight": { originalPrice: "R$ 2.770,00", pixPrice: "R$ 2.403,00", installmentPrice: "R$ 228,00" },
    "40mm-Starlight": { originalPrice: "R$ 2.770,00", pixPrice: "R$ 2.403,00", installmentPrice: "R$ 228,00" },
  },
};

// ============================================
// Exportação
// ============================================

export const appleWatchProducts: GroupedProduct[] = [
  // Ultra
  ultraWatch3Ocean,
  // Series
  series11SportBand,
  // SE
  se3SportBand,
];