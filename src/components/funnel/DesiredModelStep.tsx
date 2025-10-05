import React, { useState } from "react";

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

  // Filtrar produtos por categoria e busca
  const filteredProducts = availableProducts.filter((product) => {
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    const matchesSearch =
      !searchTerm ||
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.storage.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch && product.isActive;
  });

  // Obter categorias únicas
  const categories = [
    ...new Set(availableProducts.map((p) => p.category)),
  ].sort();

  // Agrupar produtos por modelo
  const groupedProducts = filteredProducts.reduce(
    (acc, product) => {
      const key = `${product.model}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(product);
      return acc;
    },
    {} as { [key: string]: Product[] }
  );

  const getModelIcon = (model: string): string => {
    if (model.includes("iPhone 16")) return "📱";
    if (model.includes("iPhone 15")) return "📱";
    if (model.includes("iPhone 14")) return "📱";
    if (model.includes("iPhone 13")) return "📱";
    if (model.includes("iPhone 12")) return "📱";
    if (model.includes("iPhone 11")) return "📱";
    if (model.includes("MacBook")) return "💻";
    if (model.includes("iPad")) return "📱";
    if (model.includes("Apple Watch")) return "⌚";
    return "📦";
  };

  const getModelBadge = (model: string): { text: string; color: string } => {
    if (model.includes("Pro Max"))
      return { text: "Pro Max", color: "bg-purple-600" };
    if (model.includes("Pro")) return { text: "Pro", color: "bg-blue-600" };
    if (model.includes("Plus")) return { text: "Plus", color: "bg-green-600" };
    if (model.includes("mini")) return { text: "mini", color: "bg-orange-600" };
    return { text: "", color: "" };
  };

  const formatPrice = (price: string): string => {
    return price.replace("R$", "").trim();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        {/* <h2 className="text-2xl font-bold text-white mb-2">
          Qual iPhone você deseja?
        </h2> */}
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
            className={`
            px-4 py-2 rounded-full text-sm font-medium transition-colors
            ${
              !selectedCategory
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }
          `}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }
            `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar por modelo ou capacidade..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 pl-10 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        {Object.keys(groupedProducts).length === 0 ? (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47.881-6.08 2.33l-.926-.926A9.953 9.953 0 0112 13c2.74 0 5.23 1.1 7.006 2.904l-.926.926A7.963 7.963 0 0112 15z"
                />
              </svg>
            </div>
            <p className="text-gray-400">
              Nenhum produto encontrado com os filtros selecionados.
            </p>
          </div>
        ) : (
          Object.entries(groupedProducts).map(([modelName, products]) => {
            const badge = getModelBadge(modelName);
            // const isSelected = products.some(
            //   (product) => product.id === selectedModel
            // );

            return (
              <div key={modelName} className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getModelIcon(modelName)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <span>{modelName}</span>
                      {badge.text && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium text-white ${badge.color}`}
                        >
                          {badge.text}
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {products.length} opção{products.length > 1 ? "ões" : ""}{" "}
                      disponível{products.length > 1 ? "eis" : ""}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {products.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        console.log("🔧 CLICOU NO MODELO:", modelName);
                        console.log("🔧 CHAMANDO onSelect com:", modelName);

                        console.log(
                          "🔧 ID DO PRODUTO SELECIONADO:",
                          product.id
                        );
                        onSelect(product.id);
                        console.log("🔧 onSelect executado");
                      }}
                      className={`
p-4 rounded-lg border-2 transition-all duration-200 text-left
${
  product.id === selectedModel // <-- AGORA COMPARA O ID DO PRODUTO COM O SELECIONADO
    ? "border-blue-500 bg-blue-500 bg-opacity-20 text-white transform scale-105"
    : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300"
}
`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium text-sm">
                            {product.storage}
                          </p>
                          {product.isNew && (
                            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                              Novo
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-400">{product.color}</p>

                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="text-gray-400">PIX:</span>
                            <span className="text-green-400 font-semibold ml-1">
                              R$ {formatPrice(product.pixPrice)}
                            </span>
                          </p>
                          <p className="text-xs text-gray-400">
                            12x R$ {formatPrice(product.installmentPrice)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Selected Model Confirmation */}
      {selectedModel && (
        <div className="mt-6 p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-300">
              <span className="font-medium">
                {availableProducts.find((p) => p.id === selectedModel)?.model ||
                  selectedModel}
              </span>{" "}
              selecionado como seu iPhone dos sonhos!
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <div className="flex items-start">
          <svg
            className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="text-blue-300 text-sm">
              <strong>Produtos disponíveis:</strong> Mostramos apenas iPhones
              que temos em estoque. Os preços são atualizados em tempo real e
              incluem garantia CompreFi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesiredModelStep;
