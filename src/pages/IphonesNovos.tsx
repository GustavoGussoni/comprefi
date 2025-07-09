import React, { useState, useEffect } from "react";
import FAQ from "../components/FAQ";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";
import ProductCard from "../components/ProductCard";
import { apiService, type Product } from "../services/api";

const IphonesNovos: React.FC = () => {
  // Número de WhatsApp
  const whatsappNumber = "+5534999252590";

  // Estados
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para controlar a forma de pagamento selecionada para cada produto
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<{
    [key: number]: "pix" | "card";
  }>({});

  // Buscar produtos da API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Buscar produtos da categoria "iPhones Novos" que estão ativos
        const data = await apiService.getProductsWithFilters({
          category: "iPhones Novos",
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
  }, []);

  // Função para selecionar forma de pagamento
  const selectPaymentMethod = (productId: number, method: "pix" | "card") => {
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
    const message = `Quero comprar o ${product.model} ${product.storage} por ${price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="iphones-novos-container bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
            iPhones Novos
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center">
            Lacrados | 1 ano de garantia Apple
          </p>

          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg text-white">Carregando produtos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="iphones-novos-container bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
            iPhones Novos
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-center">
            Lacrados | 1 ano de garantia Apple
          </p>

          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <p className="text-red-500 text-lg mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors text-white"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="iphones-novos-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
          iPhones Novos
        </h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          Lacrados | 1 ano de garantia Apple
        </p>

        {/* Contador de produtos */}
        <div className="mb-8 text-center">
          <p className="text-gray-400">
            {products.length > 0
              ? `${products.length} produto${products.length > 1 ? "s" : ""} encontrado${products.length > 1 ? "s" : ""}`
              : "Nenhum produto encontrado"}
          </p>
        </div>

        {/* Lista de produtos */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectPaymentMethod={selectPaymentMethod}
                onBuyNow={redirectToWhatsApp}
                selectedPaymentMethod={selectedPaymentMethods[product.id]}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              Nenhum produto disponível no momento.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Novos produtos serão adicionados em breve!
            </p>
          </div>
        )}

        {/* Por que escolher a CompreFi */}
        <div className="mt-16">
          <WhyChooseCompreFi category="iPhones Novos" />
        </div>

        {/* FAQ - Seção separada */}
        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default IphonesNovos;
