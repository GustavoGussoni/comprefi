import React from "react";
import { Link } from "react-router-dom";
import ImageLoader from "./ImageLoader";
import { ProductCardProps } from "./ProductCardProps";

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectPaymentMethod,
  onBuyNow,
  selectedPaymentMethod = "pix",
}) => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#ff6100] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6100]/10">
      <div className="p-4">
        {/* Imagem do produto com link para página de detalhes */}
        <Link
          to={`/produto/${product.category
            .toLowerCase()
            .replace(/\s+/g, "-")}/${product.id}`}
          className="block mb-3"
        >
          <ImageLoader
            src={product.image || ""}
            alt={`${product.model} ${product.storage || ""} ${
              product.color || ""
            }`}
            className="w-full h-auto rounded-lg"
          />
        </Link>

        {/* Informações do produto com link para página de detalhes */}
        <Link
          to={`/produto/${product.category
            .toLowerCase()
            .replace(/\s+/g, "-")}/${product.id}`}
          className="block"
        >
          <h3 className="text-lg font-bold mb-1 text-white">{product.model}</h3>
          {product.storage && product.color && (
            <p className="text-gray-400 mb-2 text-sm">
              {product.storage} {product.color}
            </p>
          )}
        </Link>

        {/* Bateria (se aplicável) */}
        {product.battery && (
          <div className="flex items-center mb-2">
            <span className="text-gray-300 mr-2 text-sm">Bateria:</span>
            <span
              className={`font-medium text-sm ${
                parseInt(product.battery) > 85
                  ? "text-green-500"
                  : parseInt(product.battery) > 80
                    ? "text-yellow-500"
                    : "text-orange-500"
              }`}
            >
              {product.battery}
            </span>
          </div>
        )}

        {/* Preços */}
        <div className="flex flex-col mb-2">
          {product.originalPrice && (
            <div className="text-gray-400 line-through text-xs">
              De {product.originalPrice}
            </div>
          )}
          <div className="flex justify-between items-end">
            {product.installmentPrice && (
              <div className="text-white text-sm font-medium">
                12x {product.installmentPrice}
              </div>
            )}
            <div className="text-[#ff6100] font-medium text-sm">
              {product.pixPrice} <span className="text-xs">no PIX</span>
            </div>
          </div>
        </div>

        {/* Detalhes (se aplicável) */}
        {product.details && (
          <div className="text-xs text-gray-400 mb-2">{product.details}</div>
        )}

        {/* Garantia e status */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-300 text-xs">
            {product.category.includes("Seminovo")
              ? "Garantia 120 dias"
              : "1 ano garantia"}
          </span>
          <div className="bg-gray-800 px-2 py-1 rounded text-xs text-white">
            {product.category.includes("Seminovo") ? "Seminovo" : "Novo"}
          </div>
        </div>

        {/* Seleção de forma de pagamento */}
        <div className="flex space-x-1 mb-2">
          <button
            className={`flex-1 py-1 rounded-md text-xs transition-colors ${
              selectedPaymentMethod === "pix"
                ? "bg-[#ff610061] text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => onSelectPaymentMethod(product.id, "pix")}
          >
            PIX
          </button>
          <button
            className={`flex-1 py-1 rounded-md text-xs transition-colors ${
              selectedPaymentMethod === "card"
                ? "bg-[#ff610061] text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => onSelectPaymentMethod(product.id, "card")}
          >
            Cartão
          </button>
        </div>

        {/* Botões de ação */}
        <div className="flex space-x-2">
          {/* <Link
            to={`/produto/${product.category
              .toLowerCase()
              .replace(/\s+/g, "-")}/${product.id}`}
            className="flex-1 py-1.5 bg-gray-800 hover:bg-gray-700 text-white text-sm rounded-md transition-colors flex items-center justify-center"
          >
            Ver detalhes
          </Link> */}
          <button
            className="flex-1 bg-[#ff6100] hover:bg-[#e55a00] text-white py-1.5 text-sm rounded-md transition-colors flex items-center justify-center"
            onClick={() => onBuyNow(product)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
