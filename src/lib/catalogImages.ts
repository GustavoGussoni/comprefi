import type { GroupedProduct } from "../types/product";

/** Resolve pelo nome exato da variante; não mistura acabamentos nem pulseiras. */
export function resolveCatalogImages(
  product: GroupedProduct,
  storage: string,
  color: string,
): { image: string; gallery: string[] } {
  const variant = product.colors.find((entry) => entry.name === color);
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
