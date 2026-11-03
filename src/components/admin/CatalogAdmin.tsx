import { Boxes, PackageSearch } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import CatalogTable from "@/components/admin/CatalogTable";
import UsedStockAdmin from "@/components/admin/UsedStockAdmin";

interface CatalogAdminProps {
  readOnly?: boolean;
}

const USED_STOCK_CATEGORY = "iphones-seminovos";

const CatalogAdmin: React.FC<CatalogAdminProps> = ({ readOnly = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const isUsedStockTab = searchParams.get("categoria") === USED_STOCK_CATEGORY;

  const selectTab = (tab: "catalog" | "used-stock") => {
    navigate(
      tab === "used-stock"
        ? "/admin/catalogo?categoria=iphones-seminovos"
        : "/admin/catalogo",
    );
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-white/10">
        <div
          className="-mb-px flex gap-1 overflow-x-auto"
          role="tablist"
          aria-label="Seções do catálogo"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!isUsedStockTab}
            onClick={() => selectTab("catalog")}
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              !isUsedStockTab
                ? "border-[#ff6700] text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-200"
            }`}
          >
            <Boxes size={17} />
            Produtos e variantes
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={isUsedStockTab}
            onClick={() => selectTab("used-stock")}
            className={`inline-flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
              isUsedStockTab
                ? "border-[#ff6700] text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-200"
            }`}
          >
            <PackageSearch size={17} />
            iPhones Seminovos
          </button>
        </div>
      </div>

      {isUsedStockTab ? <UsedStockAdmin /> : <CatalogTable readOnly={readOnly} />}
    </div>
  );
};

export default CatalogAdmin;
