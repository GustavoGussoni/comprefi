import React, { useState, useEffect } from "react";
import FAQ from "../components/FAQ";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { apiService, type Product } from "../services/api";

interface ProductCategoryPageProps {
  title: string;
  subtitle: string;
  category: string;
  emptyIcon?: string;
  emptyMessage?: string;
}

const ProductCategoryPage: React.FC<ProductCategoryPageProps> = ({
  title,
  subtitle,
  category,
  emptyIcon = "📦",
  emptyMessage = "Nenhum produto disponível no momento",
}) => {
  // Número de WhatsApp
  const whatsappNumber = "+5534999252590";

  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para controlar a forma de pagamento selecionada para cada produto
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<{
    [key: string]: "pix" | "card";
  }>({});

  // Buscar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar produtos da categoria especificada que estão ativos
        const data = await apiService.getProductsWithFilters({
          category: category,
          isActive: true,
        });

        setProducts(data);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
        setError("Erro ao carregar produtos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Função para selecionar forma de pagamento
  const selectPaymentMethod = (productId: string, method: "pix" | "card") => {
    setSelectedPaymentMethods((prev) => ({
      ...prev,
      [productId]: method,
    }));
  };

  // Função para redirecionar para o WhatsApp
  const redirectToWhatsApp = (product: Product) => {
    const paymentMethod = selectedPaymentMethods[product.id] || "pix";
    const price =
      paymentMethod === "pix"
        ? product.pixPrice
        : `12x ${product.installmentPrice}`;
    const message = `Quero comprar o ${product.model} ${product.storage || ""} por ${price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="product-category-container bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
            {title}
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center">{subtitle}</p>

          <LoadingSpinner message="Carregando produtos..." />
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="product-category-container bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
            {title}
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center">{subtitle}</p>

          <div className="bg-red-900 border border-red-700 text-red-100 px-6 py-4 rounded-lg mb-8 max-w-2xl mx-auto">
            <p className="text-center">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-700 hover:bg-red-600 text-white px-6 py-2 rounded-md transition-colors mx-auto block"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="product-category-container bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
            {title}
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center">{subtitle}</p>

          <div className="bg-gray-900 border border-gray-800 text-gray-300 px-6 py-12 rounded-lg mb-8 max-w-2xl mx-auto text-center">
            <div className="text-6xl mb-4">{emptyIcon}</div>
            <p className="text-xl mb-2">{emptyMessage}</p>
            <p className="text-gray-400">
              Estamos atualizando nosso estoque. Volte em breve!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="product-category-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
          {title}
        </h1>
        <p className="text-xl text-gray-300 mb-8 text-center">{subtitle}</p>

        {/* Lista de produtos usando ProductCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              selectedPaymentMethod={
                selectedPaymentMethods[product.id] || "pix"
              }
              onSelectPaymentMethod={(method) =>
                selectPaymentMethod(product.id, method)
              }
              onWhatsAppClick={() => redirectToWhatsApp(product)}
            />
          ))}
        </div>

        {/* Por que escolher a CompreFi */}
        <WhyChooseCompreFi />

        {/* FAQ */}
        <FAQ />
      </div>
    </div>
  );
};

export default ProductCategoryPage;
