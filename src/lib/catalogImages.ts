import type { GroupedProduct } from "../types/product";
import { normalizeLaunchColor } from "../data/products/launch-names";

/** Resolve a variante exata (aliases EN/PT somente no lote); não mistura acabamentos/pulseiras. */
export function resolveCatalogImages(
  product: GroupedProduct,
  storage: string,
  color: string,
): { image: string; gallery: string[] } {
  const canonical = normalizeLaunchColor(product.slug, color);
  const variant = product.colors.find((entry) => normalizeLaunchColor(product.slug, entry.name) === canonical);
  if (!variant) return { image: "", gallery: [] };
  return {
    image: product.imageByStorage?.[storage] ?? variant.image,
    gallery: variant.gallery,
  };
}

export function resolveCatalogGallery(product: GroupedProduct, storage: string, color: string): string[] {
  const images = resolveCatalogImages(product, storage, color);
  return [images.image, ...images.gallery].filter(Boolean);
}
