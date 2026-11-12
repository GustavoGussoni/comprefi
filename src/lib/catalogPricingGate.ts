import { hasValidVariantPricing } from "../types/product";
import type { VariantPricing } from "../types/product";

/** Custo é entrada de cálculo, não custo persistido no schema atual do catálogo. */
export function hasPositiveCost(cost: string): boolean {
  return cost.trim() !== "" && Number.isFinite(Number(cost)) && Number(cost) > 0;
}

/** Não aceitar preço provisório na primeira precificação. Edição de oferta anterior permanece. */
export function canSaveCatalogPricing(
  previous: VariantPricing | undefined,
  draft: VariantPricing,
  cost: string,
  costEdited: boolean,
): boolean {
  return hasValidVariantPricing(draft) &&
    (hasValidVariantPricing(previous) || (costEdited && hasPositiveCost(cost)));
}
