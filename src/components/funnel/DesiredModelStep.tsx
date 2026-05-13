import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
  Package,
  Search,
  Check,
  Info,
} from "lucide-react";

interface Product {
  id: string;
  model: string;
  storage: string;
  color: string;
  pixPrice: string;
  installmentPrice: string;
  originalPrice: string;
  category: string;
  isActive: boolean;
  isNew: boolean;
}

interface DesiredModelStepProps {
  selectedModel: string;
  availableProducts: Product[];
  onSelect: (model: string) => void;
}

const DesiredModelStep: React.FC<DesiredModelStepProps> = ({
  selectedModel,
  availableProducts,
  onSelect,
}) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("iPhones Novos");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedModel, setExpandedModel] = useState<string | null>(null);

  // Filtrar produtos ativos por categoria e busca
  const filteredProducts = availableProducts.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.storage.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch && product.isActive;
  });

  // Categorias únicas
  const categories = [
    ...new Set(availableProducts.map((p) => p.category)),
  ].sort();

  // Agrupar por modelo
  const groupedProducts = filteredProducts.reduce(
    (acc, product) => {
      const key = product.model;
      if (!acc[key]) acc[key] = [];
      acc[key].push(product);
      return acc;
    },
    {} as { [key: string]: Product[] },
  );

  // Agrupar variantes por storage dentro de cada modelo
  const getStorageGroups = (products: Product[]) => {
    const storageMap: { [storage: string]: Product[] } = {};
    for (const p of products) {
      if (!storageMap[p.storage]) storageMap[p.storage] = [];
      storageMap[p.storage].push(p);
    }

    // Ordenar variantes dentro de cada storage por preço PIX decrescente
    for (const key of Object.keys(storageMap)) {
      storageMap[key].sort((a, b) => {
        const priceA =
          parseFloat(a.pixPrice.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
        const priceB =
          parseFloat(b.pixPrice.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
        return priceB - priceA;
      });
    }

    // Ordenar por storage decrescente (maior primeiro)
    return Object.entries(storageMap).sort((a, b) => {
      const toGB = (s: string): number => {
        const num = parseFloat(s) || 0;
        if (s.toUpperCase().includes("TB")) return num * 1024;
        return num;
      };
      return toGB(b[0]) - toGB(a[0]);
    });
  };

  const getModelIcon = (model: string) => {
    if (model.includes("MacBook"))
      return <Laptop className="w-5 h-5 text-gray-400" />;
    if (model.includes("iPad"))
      return <Tablet className="w-5 h-5 text-gray-400" />;
    if (model.includes("Watch"))
      return <Watch className="w-5 h-5 text-gray-400" />;
    if (model.includes("iPhone"))
      return <Smartphone className="w-5 h-5 text-gray-400" />;
    return <Package className="w-5 h-5 text-gray-400" />;
  };

  const getModelBadge = (
    model: string,
  ): { text: string; color: string } | null => {
    if (model.includes("Pro Max"))
      return { text: "Pro Max", color: "bg-purple-600" };
    if (model.includes("Pro")) return { text: "Pro", color: "bg-blue-600" };
    if (model.includes("Plus")) return { text: "Plus", color: "bg-green-600" };
    if (model.includes("mini")) return { text: "mini", color: "bg-orange-600" };
    if (model.includes("Air")) return { text: "Air", color: "bg-sky-600" };
    if (model.includes("Ultra")) return { text: "Ultra", color: "bg-red-600" };
    return null;
  };

  const formatPrice = (price: string): string => {
    const num = parseFloat(price.replace(/[^\d.,]/g, "").replace(",", "."));
    if (isNaN(num)) return price;
    return num.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  // Preço mais baixo do modelo (para exibir no accordion fechado)
  const getLowestPrice = (products: Product[]): string => {
    const prices = products
      .map((p) =>
        parseFloat(p.pixPrice.replace(/[^\d.,]/g, "").replace(",", ".")),
      )
      .filter((n) => !isNaN(n) && n > 0);
    if (prices.length === 0) return "—";
    return Math.min(...prices).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
  };

  // Verificar se o modelo selecionado pertence a este grupo
  const isModelSelected = (products: Product[]): boolean => {
    return products.some((p) => p.id === selectedModel);
  };

  // Encontrar produto selecionado
  const selectedProduct = availableProducts.find((p) => p.id === selectedModel);

  const handleToggleModel = (modelName: string) => {
    setExpandedModel(expandedModel === modelName ? null : modelName);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-gray-400">
          Escolha o modelo que você gostaria de ter. Mostraremos apenas produtos
          disponíveis.
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !selectedCategory
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por modelo ou capacidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-2">
        {Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhum produto encontrado</p>
          </div>
        ) : (
          Object.entries(groupedProducts).map(([modelName, products]) => {
            const isExpanded = expandedModel === modelName;
            const hasSelection = isModelSelected(products);
            const badge = getModelBadge(modelName);
            const storageGroups = getStorageGroups(products);

            return (
              <div
                key={modelName}
                className={`rounded-lg border-2 overflow-hidden transition-all duration-200 ${
                  hasSelection
                    ? "border-green-500 bg-gray-800"
                    : isExpanded
                      ? "border-gray-500 bg-gray-800"
                      : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                }`}
              >
                {/* Model Header (clickable) */}
                <button
                  onClick={() => handleToggleModel(modelName)}
                  className="w-full flex items-center justify-between p-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    {getModelIcon(modelName)}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-white font-semibold">
                          {modelName}
                        </h3>
                        {badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium text-white ${badge.color}`}
                          >
                            {badge.text}
                          </span>
                        )}
                        {hasSelection && (
                          <Check className="w-4 h-4 text-green-400" />
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        A partir de{" "}
                        <span className="text-green-400 font-medium">
                          R$ {getLowestPrice(products)}
                        </span>{" "}
                        no PIX
                        <span className="text-gray-500 ml-2">
                          — {storageGroups.length} capacidade
                          {storageGroups.length > 1 ? "s" : ""}
                        </span>
                      </p>
                    </div>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>

                {/* Expanded Content - Storage groups */}
                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3">
                    <div className="border-t border-gray-700 pt-3" />
                    {storageGroups.map(([storage, variants]) => (
                      <div key={storage}>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 font-medium">
                          {storage}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {variants.map((product) => {
                            const isSelected = product.id === selectedModel;
                            return (
                              <button
                                key={product.id}
                                onClick={() => onSelect(product.id)}
                                className={`p-3 rounded-lg border transition-all duration-150 text-left ${
                                  isSelected
                                    ? "border-green-500 bg-green-900/30 ring-1 ring-green-500/50"
                                    : "border-gray-600 bg-gray-700/50 hover:border-gray-500 hover:bg-gray-700"
                                }`}
                              >
                                <p
                                  className={`text-sm font-medium ${isSelected ? "text-green-300" : "text-gray-200"}`}
                                >
                                  {product.color}
                                </p>
                                <p className="mt-1">
                                  <span className="text-xs text-gray-400">
                                    PIX:{" "}
                                  </span>
                                  <span
                                    className={`text-sm font-semibold ${isSelected ? "text-green-400" : "text-green-400"}`}
                                  >
                                    R$ {formatPrice(product.pixPrice)}
                                  </span>
                                </p>
                                <p className="text-xs text-gray-500">
                                  12x R$ {formatPrice(product.installmentPrice)}
                                </p>
                                {isSelected && (
                                  <div className="flex items-center gap-1 mt-1">
                                    <Check className="w-3 h-3 text-green-400" />
                                    <span className="text-xs text-green-400">
                                      Selecionado
                                    </span>
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Selected Model Confirmation */}
      {selectedProduct && (
        <div className="p-4 bg-green-900/30 border border-green-700 rounded-lg">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
            <p className="text-green-300">
              <span className="font-medium">{selectedProduct.model}</span>
              {" — "}
              {selectedProduct.storage}, {selectedProduct.color}
              {" — "}
              <span className="text-green-400 font-semibold">
                R$ {formatPrice(selectedProduct.pixPrice)}
              </span>
              {" no PIX"}
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-blue-300 text-sm">
            <strong>Produtos disponíveis:</strong> Mostramos apenas iPhones que
            temos em estoque. Os preços são atualizados em tempo real e incluem
            garantia CompreFi.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DesiredModelStep;
