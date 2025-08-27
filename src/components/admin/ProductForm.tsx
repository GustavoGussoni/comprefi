import React, { useState, useEffect } from "react";
import { apiService, type Product } from "../../services/api";

interface ProductFormProps {
  product?: Product | null;
  onSave: () => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    model: "",
    storage: "",
    color: "",
    battery: "",
    originalPrice: "",
    installmentPrice: "",
    pixPrice: "",
    details: "",
    image: "",
    realImages: [] as string[],
    category: "",
    specs: "",
    cost: "",
    freight: "100",
    isActive: true,
    isNew: true,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [calculatedPrices, setCalculatedPrices] = useState<any>(null);

  const categories = [
    "iPhones Novos",
    "iPhones Seminovos",
    "Macbooks",
    "iPads",
    "Apple Watch",
    "Acessórios",
  ];

  // Carregar dados do produto para edição
  useEffect(() => {
    if (product) {
      setFormData({
        model: product.model || "",
        storage: product.storage || "",
        color: product.color || "",
        battery: product.battery || "",
        originalPrice: product.originalPrice || "",
        installmentPrice: product.installmentPrice || "",
        pixPrice: product.pixPrice || "",
        details: product.details || "",
        image: product.image || "",
        realImages: product.realImages || [],
        category:
          product.category == "Acessórios"
            ? "acessorios"
            : product.category || "",
        specs: product.specs || "",
        cost: product.cost?.toString() || "",
        freight: product.freight?.toString() || "100",
        isActive: product.isActive ?? true,
        isNew: product.isNew ?? true,
      });
    }
  }, [product]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCalculatePrices = async () => {
    if (!formData.cost || isNaN(Number(formData.cost))) {
      setError("Por favor, insira um custo válido para calcular os preços");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await apiService.calculatePrices({
        cost: Number(formData.cost),
        freight: Number(formData.freight) || 100,
        category: formData.category || undefined,
      });

      setCalculatedPrices(result);
      setFormData((prev) => ({
        ...prev,
        pixPrice: result.pixPrice,
        installmentPrice: result.installmentPrice,
        originalPrice: result.originalPrice,
      }));
    } catch (err) {
      console.error("Erro ao calcular preços:", err);
      setError("Erro ao calcular preços. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (!formData.model.trim()) errors.push("Modelo é obrigatório");
    if (!formData.category.trim()) errors.push("Categoria é obrigatória");
    if (!formData.pixPrice.trim()) errors.push("Preço PIX é obrigatório");
    if (!formData.storage.trim() && formData.category !== "Acessórios") {
      errors.push("Armazenamento é obrigatório");
    }
    if (!formData.color.trim()) errors.push("Cor é obrigatória");
    // if (!formData.battery.trim()) errors.push("Bateria é obrigatória");
    if (!formData.details.trim()) errors.push("Detalhes são obrigatórios");
    if (!formData.specs.trim()) errors.push("Especificações são obrigatórias");

    // Validação específica para seminovos
    if (!formData.isNew && !formData.battery.trim()) {
      errors.push("Bateria é obrigatória para produtos seminovos");
    }

    return errors;
  };

  const prepareDataForAPI = () => {
    // Limpar URLs de imagem vazias
    const cleanRealImages = formData.realImages.filter(
      (img) => img.trim() !== ""
    );

    // Preparar dados conforme esperado pela API
    const apiData: any = {
      model: formData.model.trim(),
      storage: formData.storage.trim(),
      color: formData.color.trim(),
      battery: formData.battery.trim(),
      originalPrice: formData.originalPrice.trim(),
      installmentPrice: formData.installmentPrice.trim(),
      pixPrice: formData.pixPrice.trim(),
      details: formData.details.trim(),
      category: formData.category.trim(),
      specs: formData.specs.trim(),
      isActive: formData.isActive,
      isNew: formData.isNew,
      realImages: cleanRealImages,
    };

    // Adicionar imagem principal se fornecida
    if (formData.image.trim()) {
      apiData.image = formData.image.trim();
    }

    // Adicionar custo e frete se fornecidos (como números)
    if (formData.cost && !isNaN(Number(formData.cost))) {
      apiData.cost = Number(formData.cost);
    }

    if (formData.freight && !isNaN(Number(formData.freight))) {
      apiData.freight = Number(formData.freight);
    }

    return apiData;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar formulário
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(`Erros de validação:\n${validationErrors.join("\n")}`);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const productData = prepareDataForAPI();

      console.log("Dados sendo enviados para a API:", productData);

      if (product) {
        await apiService.updateProduct(product.id, productData);
      } else {
        await apiService.createProduct(productData);
      }

      onSave();
    } catch (err: any) {
      console.error("Erro ao salvar produto:", err);

      // Tentar extrair mensagem de erro mais específica
      let errorMessage =
        "Erro ao salvar produto. Verifique os dados e tente novamente.";

      if (err.message) {
        errorMessage = err.message;
      }

      // Se for erro 400, pode ser problema de validação
      if (err.message?.includes("400")) {
        errorMessage =
          "Dados inválidos. Verifique se todos os campos obrigatórios estão preenchidos corretamente.";
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addImageUrl = () => {
    setFormData((prev) => ({
      ...prev,
      realImages: [...prev.realImages, ""],
    }));
  };

  const updateImageUrl = (index: number, url: string) => {
    setFormData((prev) => ({
      ...prev,
      realImages: prev.realImages.map((img, i) => (i === index ? url : img)),
    }));
  };

  const removeImageUrl = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      realImages: prev.realImages.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-gray-900 rounded-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {product ? "✏️ Editar Produto" : "➕ Novo Produto"}
          </h2>
          <p className="text-gray-400 mt-1">
            {product
              ? "Atualize as informações do produto"
              : "Cadastre um novo produto no sistema"}
          </p>
        </div>
        <button
          onClick={onCancel}
          className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          ❌ Cancelar
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
          <pre className="whitespace-pre-wrap text-sm">{error}</pre>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Informações Básicas */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            📱 Informações Básicas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Modelo do Produto *
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleInputChange}
                placeholder="iPhone 15 Pro Max"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Categoria *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma categoria</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Armazenamento {formData.category !== "Acessórios" && "*"}
              </label>
              <input
                type="text"
                name="storage"
                value={formData.storage}
                onChange={handleInputChange}
                placeholder="256GB"
                required={formData.category !== "Acessórios"}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cor *
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                placeholder="Titânio Natural"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bateria * {!formData.isNew && "(Obrigatório para seminovos)"}
              </label>
              <input
                type="text"
                name="battery"
                value={formData.battery}
                onChange={handleInputChange}
                placeholder={formData.isNew ? "100%" : "89%"}
                required={formData.category !== "Acessórios"}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.isNew
                  ? "Produtos novos: sempre 100%"
                  : "Obrigatório para produtos seminovos"}
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleInputChange}
                  className="mr-2 rounded"
                />
                <span className="text-gray-300">Produto Novo</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2 rounded"
                />
                <span className="text-gray-300">Ativo</span>
              </label>
            </div>
          </div>
        </div>

        {/* Cálculo de Preços */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            💰 Cálculo de Preços
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Custo do Produto
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  R$
                </span>
                <input
                  type="number"
                  name="cost"
                  value={formData.cost}
                  onChange={handleInputChange}
                  placeholder="4500.00"
                  step="0.01"
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Frete
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  R$
                </span>
                <input
                  type="number"
                  name="freight"
                  value={formData.freight}
                  onChange={handleInputChange}
                  placeholder="100.00"
                  step="0.01"
                  className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleCalculatePrices}
                disabled={loading || !formData.cost}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                {loading ? "Calculando..." : "🧮 Calcular"}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preço PIX *
              </label>
              <input
                type="text"
                name="pixPrice"
                value={formData.pixPrice}
                onChange={handleInputChange}
                placeholder="R$ 5.111,11"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preço Parcelado *
              </label>
              <input
                type="text"
                name="installmentPrice"
                value={formData.installmentPrice}
                onChange={handleInputChange}
                placeholder="R$ 492,59"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preço Original *
              </label>
              <input
                type="text"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleInputChange}
                placeholder="R$ 5.476,19"
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Detalhes e Especificações */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            📝 Detalhes e Especificações
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Detalhes do Produto *
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleInputChange}
                placeholder="sem detalhes | garantia Apple até junho"
                rows={3}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Especificações Técnicas *
              </label>
              <textarea
                name="specs"
                value={formData.specs}
                onChange={handleInputChange}
                placeholder='Tela Super Retina XDR de 6,7", chip A17 Pro, câmera tripla de 48MP...'
                rows={4}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Imagens */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">🖼️ Imagens</h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Imagem Principal
              </label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://exemplo.com/imagem-principal.jpg"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-300">
                  Imagens Reais do Produto
                </label>
                <button
                  type="button"
                  onClick={addImageUrl}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition-colors"
                >
                  ➕ Adicionar Imagem
                </button>
              </div>

              <div className="space-y-3">
                {formData.realImages.map((imageUrl, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e) => updateImageUrl(index, e.target.value)}
                      placeholder={`https://exemplo.com/imagem-${index + 1}.jpg`}
                      className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeImageUrl(index)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded transition-colors"
                    >
                      🗑️
                    </button>
                  </div>
                ))}

                {formData.realImages.length === 0 && (
                  <p className="text-gray-500 text-sm italic">
                    Nenhuma imagem adicionada. Clique em "Adicionar Imagem" para
                    incluir fotos reais do produto.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                {product ? "Atualizando..." : "Salvando..."}
              </>
            ) : (
              <>{product ? "💾 Atualizar Produto" : "💾 Salvar Produto"}</>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            ❌ Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
