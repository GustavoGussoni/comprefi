import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import {
  findFlatProductById,
  findGroupedProductBySlug,
} from "../data/categories";

const ProductPage: React.FC = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();

  if (!category || !id) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Produto não encontrado
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-[#ff6100] hover:bg-[#e55a00] text-white px-6 py-3 rounded-md transition-colors"
          >
            Voltar para a Home
          </button>
        </div>
      </div>
    );
  }

  // Tentar buscar como ID numérico (FlatProduct)
  const numericId = parseInt(id, 10);
  if (!isNaN(numericId)) {
    const result = findFlatProductById(numericId);
    if (result) {
      return <ProductDetail product={result.product} />;
    }
  }

  // Tentar buscar como slug (GroupedProduct)
  const groupedResult = findGroupedProductBySlug(id);
  if (groupedResult) {
    return <ProductDetail product={groupedResult.product} />;
  }

  // Produto não encontrado
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white mb-4">
          Produto não encontrado
        </h1>
        <p className="text-gray-400 mb-6">
          O produto que você está procurando não existe ou foi removido.
        </p>
        <button
          onClick={() => navigate(`/${category}`)}
          className="bg-[#ff6100] hover:bg-[#e55a00] text-white px-6 py-3 rounded-md transition-colors"
        >
          Voltar para a categoria
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
