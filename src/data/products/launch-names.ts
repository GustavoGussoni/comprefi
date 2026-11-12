// Compatibilidade exata EN/PT somente para o lote autorizado de 2026-11-12.
// Fonte: NAME-MAP.json da auditoria; sem importações externas em runtime.
interface LaunchNames {
  model: string;
  oldModel: string;
  colors: Record<string, string>;
}

const launchNames: Record<string, LaunchNames> = {
  "iphone-duo": {
    "model": "iPhone Duo",
    "colors": {
      "Star White": "Branco Estelar",
      "Night Sky": "Céu Noturno"
    },
    "oldModel": "iPhone Duo"
  },
  "apple-watch-ultra-4-ocean": {
    "model": "Apple Watch Ultra 4 — Pulseira Oceano",
    "colors": {
      "Black / Translucent Black Ocean Band": "Preto / Pulseira Oceano Preta Translúcida",
      "Black / Translucent Kelp Ocean Band": "Preto / Pulseira Oceano Verde-alga Translúcida",
      "Black / Translucent Gray Ocean Band": "Preto / Pulseira Oceano Cinza Translúcida",
      "Natural / Translucent Black Ocean Band": "Natural / Pulseira Oceano Preta Translúcida",
      "Natural / Translucent Kelp Ocean Band": "Natural / Pulseira Oceano Verde-alga Translúcida",
      "Natural / Translucent Gray Ocean Band": "Natural / Pulseira Oceano Cinza Translúcida"
    },
    "oldModel": "Apple Watch Ultra 4 Ocean"
  },
  "apple-watch-series-12-sport-band": {
    "model": "Apple Watch Series 12 — Pulseira Esportiva",
    "colors": {
      "Dark Bronze / Olive Sport Band": "Bronze Escuro / Pulseira Esportiva Verde-oliva",
      "Dark Bronze / Burgundy Sport Band": "Bronze Escuro / Pulseira Esportiva Bordô",
      "Dark Bronze / Navy Blue Sport Band": "Bronze Escuro / Pulseira Esportiva Azul-marinho",
      "Dark Bronze / Black Sport Band": "Bronze Escuro / Pulseira Esportiva Preta",
      "Dark Bronze / Sand Sport Band": "Bronze Escuro / Pulseira Esportiva Areia",
      "Dark Bronze / Pale Succulent Sport Band": "Bronze Escuro / Pulseira Esportiva Verde-claro",
      "Light Gold / Olive Sport Band": "Dourado Claro / Pulseira Esportiva Verde-oliva",
      "Light Gold / Burgundy Sport Band": "Dourado Claro / Pulseira Esportiva Bordô",
      "Light Gold / Navy Blue Sport Band": "Dourado Claro / Pulseira Esportiva Azul-marinho",
      "Light Gold / Black Sport Band": "Dourado Claro / Pulseira Esportiva Preta",
      "Light Gold / Sand Sport Band": "Dourado Claro / Pulseira Esportiva Areia",
      "Light Gold / Pale Succulent Sport Band": "Dourado Claro / Pulseira Esportiva Verde-claro",
      "Black / Olive Sport Band": "Preto / Pulseira Esportiva Verde-oliva",
      "Black / Burgundy Sport Band": "Preto / Pulseira Esportiva Bordô",
      "Black / Navy Blue Sport Band": "Preto / Pulseira Esportiva Azul-marinho",
      "Black / Black Sport Band": "Preto / Pulseira Esportiva Preta",
      "Black / Sand Sport Band": "Preto / Pulseira Esportiva Areia",
      "Black / Pale Succulent Sport Band": "Preto / Pulseira Esportiva Verde-claro",
      "Space Gray / Olive Sport Band": "Cinza Espacial / Pulseira Esportiva Verde-oliva",
      "Space Gray / Burgundy Sport Band": "Cinza Espacial / Pulseira Esportiva Bordô",
      "Space Gray / Navy Blue Sport Band": "Cinza Espacial / Pulseira Esportiva Azul-marinho",
      "Space Gray / Black Sport Band": "Cinza Espacial / Pulseira Esportiva Preta",
      "Space Gray / Sand Sport Band": "Cinza Espacial / Pulseira Esportiva Areia",
      "Space Gray / Pale Succulent Sport Band": "Cinza Espacial / Pulseira Esportiva Verde-claro"
    },
    "oldModel": "Apple Watch Series 12 Sport Band"
  }
};

export function normalizeLaunchColor(slug: string, color: string): string {
  const colors = Object.prototype.hasOwnProperty.call(launchNames, slug) ? launchNames[slug].colors : undefined;
  return colors && Object.prototype.hasOwnProperty.call(colors, color) ? colors[color] : color;
}

/** A primeira chave é PT; a segunda, quando existe, é o alias legado exato. */
export function launchColorAliases(slug: string, color: string): string[] {
  const canonical = normalizeLaunchColor(slug, color);
  const names = Object.prototype.hasOwnProperty.call(launchNames, slug) ? launchNames[slug] : undefined;
  const legacy = names && Object.keys(names.colors).find((key) => names.colors[key] === canonical);
  return legacy && legacy !== canonical ? [canonical, legacy] : [canonical];
}

/** Títulos personalizados do administrador não são traduzidos nem aparados. */
export function normalizeLaunchModel(slug: string, model: string): string {
  const names = Object.prototype.hasOwnProperty.call(launchNames, slug) ? launchNames[slug] : undefined;
  return names && model === names.oldModel ? names.model : model;
}
