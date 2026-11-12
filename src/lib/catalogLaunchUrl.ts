import { normalizeLaunchColor } from "../data/products/launch-names";

/** Compatibilidade de links legados sem alterar slugs, storage ou outros parâmetros. */
export function normalizeCatalogLaunchSearch(slug: string, search: string): string {
  const params = new URLSearchParams(search);
  const color = params.get("color");
  if (color === null) return search;
  const canonical = normalizeLaunchColor(slug, color);
  if (canonical === color) return search;
  params.set("color", canonical);
  return `?${params.toString()}`;
}
