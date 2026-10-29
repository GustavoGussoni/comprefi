import { RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import CompreFiClubBanner from "@/components/CompreFiClubBanner";
import FAQ from "@/components/FAQ";
import SEOHead from "@/components/SEOHead";
import WhyChooseSection from "@/components/WhyChooseCompreFi";
import { seoBySlug } from "@/data/seo-config";
import { apiService, type UsedStockPublicUnit } from "@/services/api";
import UsedStockCard from "./UsedStockCard";

const WHY_CHOOSE_ITEMS = [
  "Todos os aparelhos passam por verificação completa de 47 pontos",
  "Saúde da bateria informada individualmente em cada anúncio.",
  "Suporte vitalício para todos os produtos adquiridos",
  "Programa de indicações com desconto acumulativo",
  "6 meses de garantia CompreFi em todos os seminovos",
];

const UsedStockCatalog: React.FC = () => {
  const [units, setUnits] = useState<UsedStockPublicUnit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const loadUnits = useCallback(async (cancelled: { current: boolean }) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiService.getPublicUsedStock();
      if (!cancelled.current) setUnits(result);
    } catch {
      if (!cancelled.current) {
        setUnits([]);
        setError("Não foi possível consultar os seminovos disponíveis agora.");
      }
    } finally {
      if (!cancelled.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cancelled = { current: false };
    void loadUnits(cancelled);
    return () => {
      cancelled.current = true;
    };
  }, [loadUnits, reloadKey]);

  const seo = seoBySlug["iphones-seminovos"];

  return (
    <div className="min-h-screen bg-black">
      {seo && <SEOHead title={seo.title} description={seo.description} url={seo.url} />}
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-2 text-center text-3xl font-bold text-white md:text-4xl">
          iPhones Seminovos
        </h1>
        <p className="mb-8 text-center text-xl text-gray-300">
          Aparelhos verificados com garantia
        </p>

        <CompreFiClubBanner />

        <section className="mt-8" aria-labelledby="used-stock-heading">
          <h2 id="used-stock-heading" className="sr-only">
            Unidades disponíveis de iPhones seminovos
          </h2>
          {loading && (
            <div className="py-12 text-center" role="status">
              <RefreshCw className="mx-auto mb-3 h-7 w-7 animate-spin text-[#ff6100]" />
              <p className="text-gray-300">Consultando as unidades disponíveis...</p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg border border-red-700/70 bg-red-950/40 p-6 text-center">
              <p className="text-red-100">{error}</p>
              <button
                type="button"
                onClick={() => setReloadKey((value) => value + 1)}
                className="mt-4 rounded-md border border-red-400/60 px-4 py-2 text-sm text-red-100 transition-colors hover:bg-red-900/50"
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && units.length === 0 && (
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-8 text-center">
              <h3 className="text-xl font-semibold text-white">Nenhum seminovo disponível no momento</h3>
              <p className="mt-2 text-sm text-gray-400">
                Consulte novamente em breve para ver as próximas unidades.
              </p>
            </div>
          )}

          {!loading && !error && units.length > 0 && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {units.map((unit) => (
                <UsedStockCard key={unit.id} unit={unit} />
              ))}
            </div>
          )}
        </section>

        <div className="mt-16">
          <WhyChooseSection
            category="iPhones Seminovos"
            title="Por que escolher a CompreFi?"
            items={WHY_CHOOSE_ITEMS}
          />
        </div>

        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default UsedStockCatalog;
