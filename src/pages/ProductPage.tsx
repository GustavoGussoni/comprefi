import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import PageTransition from "../components/PageTransition";
import { apiService, categoryMapping, type Product } from "../services/api";

const ProductPage: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!category || !id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Buscar produto por ID na API
        const productData = await apiService.getProductById(id);

        if (productData) {
          // Verificar se a categoria da URL corresponde à categoria do produto
          const expectedCategoryUrl =
            categoryMapping[productData.category] ||
            productData.category.toLowerCase();

          if (category !== expectedCategoryUrl) {
            // Redirecionar para a URL correta
            navigate(`/produto/${expectedCategoryUrl}/${id}`, {
              replace: true,
            });
            return;
          }

          setProduct(productData);
        } else {
          setError("Produto não encontrado");
          setTimeout(() => {
            navigate(`/${category}`);
          }, 2000);
        }
      } catch (err) {
        console.error("Erro ao buscar produto:", err);
        setError("Erro ao carregar produto. Tente novamente.");

        setTimeout(() => {
          if (category) {
            navigate(`/${category}`);
          } else {
            navigate("/");
          }
        }, 3000);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, id, navigate]);

  // Loading state
  if (loading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-lg">Carregando produto...</p>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Error state
  if (error) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <div className="space-y-2">
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors mr-4"
              >
                Tentar Novamente
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-lg transition-colors"
              >
                Voltar ao Início
              </button>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  // Product not found
  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg mb-4">Produto não encontrado</p>
            <p className="text-gray-400 mb-6">Redirecionando...</p>
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ProductDetail product={{ ...product, image: product.image || "" }} />
    </PageTransition>
  );
};

export default ProductPage;
