import React, { useState } from "react";
import { Product, apiService } from "../../services/api";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
  onToggleActive: (product: Product) => void;
  onProductUpdated?: () => void; // Callback para recarregar lista após atualização
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  onToggleActive,
  onProductUpdated,
}) => {
  const [editingCostId, setEditingCostId] = useState<string | null>(null);
  const [tempCost, setTempCost] = useState<string>("");
  const [tempFreight, setTempFreight] = useState<string>("100");
  const [calculatingPrices, setCalculatingPrices] = useState<string | null>(
    null
  );

  const handleCostEdit = (product: Product) => {
    setEditingCostId(product.id);
    setTempCost(product.cost?.toString() || "");
    setTempFreight(product.freight?.toString() || "100");
  };

  const handleCostSave = async (product: Product) => {
    if (!tempCost || isNaN(Number(tempCost))) {
      alert("Por favor, insira um custo válido");
      return;
    }

    try {
      setCalculatingPrices(product.id);

      // 1. Calcular preços baseado no custo
      const calculatedPrices = await apiService.calculatePrices({
        cost: Number(tempCost),
        freight: Number(tempFreight) || 100,
        category: product.category,
      });

      // 2. Atualizar produto com custo e preços calculados
      await apiService.updateProduct(product.id, {
        cost: Number(tempCost),
        freight: Number(tempFreight) || 100,
        pixPrice: calculatedPrices.pixPrice,
        installmentPrice: calculatedPrices.installmentPrice,
        originalPrice: calculatedPrices.originalPrice,
      });

      // 3. Recarregar lista
      if (onProductUpdated) {
        onProductUpdated();
      }

      setEditingCostId(null);
      setTempCost("");
      setTempFreight("100");
    } catch (error) {
      console.error("Erro ao atualizar custo:", error);
      alert("Erro ao calcular preços. Verifique se a API está rodando.");
    } finally {
      setCalculatingPrices(null);
    }
  };

  const handleCostCancel = () => {
    setEditingCostId(null);
    setTempCost("");
    setTempFreight("100");
  };

  const formatCurrency = (value: string | number): string => {
    if (typeof value === "number") {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    }
    return value;
  };

  if (products.length === 0) {
    return (
      <div className="bg-gray-900 rounded-lg p-12 text-center">
        <div className="text-6xl mb-4">📱</div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Nenhum produto encontrado
        </h3>
        <p className="text-gray-400 mb-6">
          Não há produtos que correspondam aos filtros selecionados.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors"
        >
          🔄 Recarregar
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      {/* Header da Tabela */}
      <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
        <h3 className="text-lg font-semibold text-white">
          📋 Lista de Produtos ({products.length})
        </h3>
      </div>

      {/* Tabela Desktop */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Produto
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Categoria
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Custo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Preços
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.model}
                        className="h-12 w-12 rounded-lg object-cover mr-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-white">
                        {product.model}
                      </div>
                      <div className="text-sm text-gray-400">
                        {product.storage} • {product.color}
                      </div>
                      {product.battery && (
                        <div className="text-xs text-gray-500">
                          Bateria: {product.battery}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                    {product.category}
                  </span>
                  <div className="text-xs text-gray-500 mt-1">
                    {product.isNew ? "🆕 Novo" : "🔄 Seminovo"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {editingCostId === product.id ? (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Custo
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={tempCost}
                            onChange={(e) => setTempCost(e.target.value)}
                            className="w-28 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Custo"
                            autoFocus
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-400 mb-1">
                            Frete
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={tempFreight}
                            onChange={(e) => setTempFreight(e.target.value)}
                            className="w-20 px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="100"
                          />
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleCostSave(product)}
                          disabled={calculatingPrices === product.id}
                          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white px-3 py-1 rounded text-xs transition-colors flex items-center"
                          title="Salvar e recalcular preços"
                        >
                          {calculatingPrices === product.id ? (
                            <>
                              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                              Calculando...
                            </>
                          ) : (
                            "✓ Salvar"
                          )}
                        </button>
                        <button
                          onClick={handleCostCancel}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors"
                          title="Cancelar"
                        >
                          ✕ Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <div>
                        <div className="text-sm text-gray-300 font-medium">
                          {product.cost ? formatCurrency(product.cost) : "-"}
                        </div>
                        {product.freight && (
                          <div className="text-xs text-gray-500">
                            Frete: {formatCurrency(product.freight)}
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleCostEdit(product)}
                        className="text-blue-400 hover:text-blue-300 text-sm"
                        title="Editar custo e recalcular preços"
                      >
                        ✏️
                      </button>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                    <div className="text-green-400 font-medium">
                      PIX: {product.pixPrice}
                    </div>
                    {product.installmentPrice && (
                      <div className="text-blue-400 text-xs">
                        12x: {product.installmentPrice}
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="text-gray-500 text-xs line-through">
                        De: {product.originalPrice}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleActive(product)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                      product.isActive
                        ? "bg-green-900 text-green-300 hover:bg-green-800"
                        : "bg-red-900 text-red-300 hover:bg-red-800"
                    }`}
                  >
                    {product.isActive ? "✅ Ativo" : "❌ Inativo"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                    >
                      ✏️ Editar
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs transition-colors"
                    >
                      🗑️ Deletar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards Mobile */}
      <div className="lg:hidden divide-y divide-gray-700">
        {products.map((product) => (
          <div key={product.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.model}
                    className="h-16 w-16 rounded-lg object-cover mr-4"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                <div>
                  <h4 className="text-lg font-medium text-white">
                    {product.model}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {product.storage} • {product.color}
                  </p>
                  {product.battery && (
                    <p className="text-xs text-gray-500">
                      Bateria: {product.battery}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => onToggleActive(product)}
                className={`px-2 py-1 rounded text-xs font-medium ${
                  product.isActive
                    ? "bg-green-900 text-green-300"
                    : "bg-red-900 text-red-300"
                }`}
              >
                {product.isActive ? "✅" : "❌"}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Categoria</p>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-900 text-blue-300">
                  {product.category}
                </span>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Tipo</p>
                <span className="text-xs text-gray-400">
                  {product.isNew ? "🆕 Novo" : "🔄 Seminovo"}
                </span>
              </div>
            </div>

            {/* Custo - Mobile */}
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Custo e Frete</p>
              {editingCostId === product.id ? (
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Custo
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={tempCost}
                        onChange={(e) => setTempCost(e.target.value)}
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Custo"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">
                        Frete
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={tempFreight}
                        onChange={(e) => setTempFreight(e.target.value)}
                        className="w-full px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="100"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCostSave(product)}
                      disabled={calculatingPrices === product.id}
                      className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white py-2 px-4 rounded text-sm transition-colors"
                    >
                      {calculatingPrices === product.id
                        ? "Calculando..."
                        : "✓ Salvar"}
                    </button>
                    <button
                      onClick={handleCostCancel}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded text-sm transition-colors"
                    >
                      ✕ Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-300">
                      Custo: {product.cost ? formatCurrency(product.cost) : "-"}
                    </div>
                    {product.freight && (
                      <div className="text-xs text-gray-500">
                        Frete: {formatCurrency(product.freight)}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleCostEdit(product)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs transition-colors"
                  >
                    ✏️ Editar Custo
                  </button>
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Preços</p>
              <div className="space-y-1">
                <div className="text-green-400 font-medium">
                  PIX: {product.pixPrice}
                </div>
                {product.installmentPrice && (
                  <div className="text-blue-400 text-sm">
                    12x: {product.installmentPrice}
                  </div>
                )}
                {product.originalPrice && (
                  <div className="text-gray-500 text-sm line-through">
                    De: {product.originalPrice}
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(product)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm transition-colors"
              >
                ✏️ Editar
              </button>
              <button
                onClick={() => onDelete(product.id)}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded text-sm transition-colors"
              >
                🗑️ Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
