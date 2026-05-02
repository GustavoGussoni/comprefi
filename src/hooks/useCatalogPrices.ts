/**
 * Hook para buscar preços atualizados do backend em background.
 *
 * O frontend continua usando os dados locais (imports) como fonte primária.
 * Este hook faz fetch dos preços do backend e sobrescreve o PricingMap
 * dos produtos, garantindo que os preços estejam sempre atualizados
 * sem precisar de novo deploy.
 */
import { useEffect, useState } from "react";
import type { PricingMap, VariantPricing } from "../types/product";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

interface BackendProduct {
  slug: string;
  model: string;
  category: string;
  section: string | null;
  isActive: boolean;
  storages: string[];
  pricing: Record<string, VariantPricing>;
  activeVariants: { storage: string; color: string; isActive: boolean }[];
}

interface CatalogPricesResult {
  /** Map de slug → pricing atualizado do backend */
  pricingBySlug: Record<string, PricingMap>;
  /** Slugs de produtos inativos no backend */
  inactiveSlugs: Set<string>;
  /** Se está carregando */
  loading: boolean;
  /** Se houve erro (frontend continua com dados locais) */
  error: boolean;
}

export function useCatalogPrices(category: string): CatalogPricesResult {
  const [pricingBySlug, setPricingBySlug] = useState<
    Record<string, PricingMap>
  >({});
  const [inactiveSlugs, setInactiveSlugs] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchPrices() {
      try {
        const response = await fetch(`${API_URL}/catalog/products/${category}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const products: BackendProduct[] = await response.json();

        if (cancelled) return;

        const newPricing: Record<string, PricingMap> = {};
        const newInactive = new Set<string>();

        for (const product of products) {
          if (!product.isActive) {
            newInactive.add(product.slug);
            continue;
          }

          // Só sobrescreve se tem pricing válido
          if (
            product.pricing &&
            Object.keys(product.pricing).length > 0
          ) {
            newPricing[product.slug] = product.pricing;
          }
        }

        setPricingBySlug(newPricing);
        setInactiveSlugs(newInactive);
        setError(false);
      } catch (err) {
        // Falha silenciosa — frontend continua com dados locais
        console.warn(
          "[CompreFi] Não foi possível atualizar preços do backend:",
          err
        );
        if (!cancelled) {
          setError(true);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPrices();

    return () => {
      cancelled = true;
    };
  }, [category]);

  return { pricingBySlug, inactiveSlugs, loading, error };
}

/**
 * Mescla o pricing local com o pricing do backend.
 * O backend tem prioridade — se existir preço no backend, ele sobrescreve o local.
 */
export function mergePricing(
  localPricing: PricingMap,
  backendPricing: PricingMap | undefined
): PricingMap {
  if (!backendPricing || Object.keys(backendPricing).length === 0) {
    return localPricing;
  }

  // Backend sobrescreve tudo
  return { ...localPricing, ...backendPricing };
}
