import type { GroupedProduct, PricingMap } from "../types/product";

interface ActiveMacbook {
  isActive: boolean;
  activeVariants: { storage: string; color: string; isActive: boolean }[];
  pricing: PricingMap;
}

const positiveBRL = (value: string | undefined): boolean => {
  if (!value) return false;
  const amount = Number(value.replace(/[^\d,]/g, "").replace(",", "."));
  return Number.isFinite(amount) && amount > 0;
};

/** A API pública é a autoridade sobre disponibilidade; as imagens e descrições continuam no Git. */
export function sellableMacbook(
  local: GroupedProduct,
  remote: ActiveMacbook | undefined,
): GroupedProduct | null {
  if (!remote?.isActive) return null;

  const available = new Set(
    (remote.activeVariants || [])
      .filter((variant) => variant.isActive)
      .map(({ storage, color }) => `${storage}-${color}`),
  );
  const pricing: PricingMap = {};
  const colorsByStorage: Record<string, string[]> = {};

  for (const storage of local.storages) {
    for (const color of local.colors) {
      const key = `${storage}-${color.name}`;
      const price = remote.pricing?.[key];
      if (
        available.has(key) &&
        positiveBRL(price?.pixPrice) &&
        positiveBRL(price?.installmentPrice) &&
        positiveBRL(price?.originalPrice)
      ) {
        pricing[key] = price;
        (colorsByStorage[storage] ||= []).push(color.name);
      }
    }
  }

  const storages = local.storages.filter((storage) => colorsByStorage[storage]);
  if (storages.length === 0) return null;

  return {
    ...local,
    storages,
    colors: local.colors.filter((color) =>
      storages.some((storage) => colorsByStorage[storage].includes(color.name)),
    ),
    colorsByStorage,
    pricing,
  };
}
