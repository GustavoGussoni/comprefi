import React, { useState, useEffect } from "react";
import { apiService, type Product } from "../services/api";
import ProductForm from "../components/admin/ProductForm";
import ProductTable from "../components/admin/ProductTable";
import PriceCalculator from "../components/admin/PriceCalculator";
import AdminStats from "../components/admin/AdminStats";

const Admin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "calculator" | "add-product"
  >("dashboard");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Carregar produtos
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  // Filtrar produtos
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Categorias únicas
  const categories = [...new Set(products.map((p) => p.category))];

  // Estatísticas
  const stats = {
    total: products.length,
    active: products.filter((p) => p.isActive).length,
    inactive: products.filter((p) => !p.isActive).length,
    new: products.filter((p) => p.isNew).length,
    used: products.filter((p) => !p.isNew).length,
  };

  const handleProductSaved = () => {
    loadProducts();
    setEditingProduct(null);
    setActiveTab("products");
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setActiveTab("add-product");
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Tem certeza que deseja deletar este produto?")) return;

    try {
      await apiService.deleteProduct(productId);
      loadProducts();
    } catch (err) {
      console.error("Erro ao deletar produto:", err);
      alert("Erro ao deletar produto");
    }
  };

  const handleToggleActive = async (product: Product) => {
    try {
      await apiService.updateProduct(product.id, {
        isActive: !product.isActive,
      });
      loadProducts();
    } catch (err) {
      console.error("Erro ao atualizar produto:", err);
      alert("Erro ao atualizar produto");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Principal */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin CompreFi</h1>
              <p className="text-gray-400 mt-1">Gerenciamento de produtos</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-400">Total de produtos</p>
                <p className="text-2xl font-bold text-blue-400">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "products", label: "Produtos", icon: "📱" },
              { id: "calculator", label: "Calculadora", icon: "🧮" },
              {
                id: "add-product",
                label: editingProduct ? "Editar Produto" : "Novo Produto",
                icon: "➕",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-400"
                    : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
            <p>{error}</p>
            <button
              onClick={loadProducts}
              className="mt-2 bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-sm"
            >
              Tentar Novamente
            </button>
          </div>
        )}

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <AdminStats stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Produtos Recentes */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">
                  Produtos Recentes
                </h3>
                <div className="space-y-3">
                  {products.slice(0, 5).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 bg-gray-800 rounded"
                    >
                      <div>
                        <p className="font-medium">{product.model}</p>
                        <p className="text-sm text-gray-400">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-400 font-medium">
                          {product.pixPrice}
                        </p>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            product.isActive
                              ? "bg-green-900 text-green-300"
                              : "bg-red-900 text-red-300"
                          }`}
                        >
                          {product.isActive ? "Ativo" : "Inativo"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categorias */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Por Categoria</h3>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const count = products.filter(
                      (p) => p.category === category
                    ).length;
                    const activeCount = products.filter(
                      (p) => p.category === category && p.isActive
                    ).length;
                    return (
                      <div
                        key={category}
                        className="flex items-center justify-between p-3 bg-gray-800 rounded"
                      >
                        <span className="font-medium">{category}</span>
                        <div className="text-right">
                          <span className="text-blue-400 font-medium">
                            {count} produtos
                          </span>
                          <p className="text-xs text-gray-400">
                            {activeCount} ativos
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lista de Produtos */}
        {activeTab === "products" && (
          <div className="space-y-6">
            {/* Filtros */}
            <div className="bg-gray-900 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Buscar produtos
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Nome do produto ou categoria..."
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Categoria
                  </label>
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Todas as categorias</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => setActiveTab("add-product")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                  >
                    ➕ Novo Produto
                  </button>
                </div>
              </div>
            </div>

            {/* Tabela de Produtos */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Carregando produtos...</p>
              </div>
            ) : (
              <ProductTable
                products={filteredProducts}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onToggleActive={handleToggleActive}
              />
            )}
          </div>
        )}

        {/* Calculadora de Preços */}
        {activeTab === "calculator" && (
          <div className="max-w-2xl mx-auto">
            <PriceCalculator />
          </div>
        )}

        {/* Formulário de Produto */}
        {activeTab === "add-product" && (
          <div className="max-w-4xl mx-auto">
            <ProductForm
              product={editingProduct}
              onSave={handleProductSaved}
              onCancel={() => {
                setEditingProduct(null);
                setActiveTab("products");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
