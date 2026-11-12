import { hasValidVariantPricing, pricingKey } from "../types/product";
import type { GroupedProduct, PricingMap } from "../types/product";

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
      .map(({ storage, color }) => pricingKey(storage, color)),
  );
  const pricing: PricingMap = {};
  const colorsByStorage: Record<string, string[]> = {};

  for (const storage of local.storages) {
    for (const color of local.colors) {
      const key = pricingKey(storage, color.name);
      const price = remote.pricing?.[key];
      if (available.has(key) && hasValidVariantPricing(price)) {
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
      model: remote.model || local.model,
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
