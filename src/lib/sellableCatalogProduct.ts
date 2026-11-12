import { hasValidVariantPricing, pricingKey } from "../types/product";
import type { GroupedProduct, PricingMap } from "../types/product";
import { launchColorAliases, normalizeLaunchColor, normalizeLaunchModel } from "../data/products/launch-names";

export interface ActiveCatalogProduct {
  isActive: boolean;
  activeVariants: { storage: string; color: string; isActive: boolean }[];
  pricing: PricingMap;
  model?: string;
  specs?: string | null;
  details?: string | null;
  battery?: string | null;
}

/** O catálogo central controla ativação e preço; o Git resolve apenas imagens/metadados. */
export function sellableCatalogProduct(
  local: GroupedProduct,
  remote: ActiveCatalogProduct | undefined,
): GroupedProduct | null {
  if (!remote?.isActive) return null;

  const available = new Set(
    (remote.activeVariants || [])
      .filter((variant) => variant.isActive)
      .map(({ storage, color }) => pricingKey(storage, normalizeLaunchColor(local.slug, color))),
  );
  // Se ambos os aliases vierem com estados conflitantes, não reativar a combinação.
  const inactive = new Set(
    (remote.activeVariants || [])
      .filter((variant) => !variant.isActive && launchColorAliases(local.slug, variant.color).length > 1)
      .map(({ storage, color }) => pricingKey(storage, normalizeLaunchColor(local.slug, color))),
  );
  const pricing: PricingMap = {};
  const colorsByStorage: Record<string, string[]> = {};

  for (const storage of local.storages) {
    for (const color of local.colors) {
      const key = pricingKey(storage, color.name);
      const availableKey = pricingKey(storage, normalizeLaunchColor(local.slug, color.name));
      const sourceKey = launchColorAliases(local.slug, color.name)
        .map((alias) => pricingKey(storage, alias))
        .find((aliasKey) => Object.prototype.hasOwnProperty.call(remote.pricing || {}, aliasKey));
      // Usar só uma chave exata remota: PT tem precedência; preço inválido não ganha fallback.
      const price = sourceKey ? remote.pricing[sourceKey] : undefined;
      if (available.has(availableKey) && !inactive.has(availableKey) && hasValidVariantPricing(price)) {
        pricing[key] = price;
        (colorsByStorage[storage] ||= []).push(color.name);
      }
    }
  }

  const storages = local.storages.filter((storage) => colorsByStorage[storage]);
  if (storages.length === 0) return null;

  return {
    ...local,
    ...(local.requiresCatalogAvailability ? {
      model: normalizeLaunchModel(local.slug, remote.model || local.model),
      specs: remote.specs ?? local.specs,
      details: remote.details ?? local.details,
      battery: remote.battery ?? local.battery,
    } : {}),
    storages,
    colors: local.colors.filter((color) =>
      storages.some((storage) => colorsByStorage[storage].includes(color.name)),
    ),
    colorsByStorage,
    pricing,
  };
}
