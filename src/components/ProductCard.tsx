import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Bell } from "lucide-react";
import ImageLoader from "./ImageLoader";
import {
  FlatProduct,
  GroupedProduct,
  isGroupedProduct,
  getVariantPrice,
} from "../types/product";
import {
  buildWhatsAppMessageFlat,
  buildWhatsAppMessageGrouped,
  openWhatsApp,
} from "../data/constants";

// ============================================
// Props
// ============================================

interface ProductCardProps {
  product: FlatProduct | GroupedProduct;
  /** Método de pagamento selecionado externamente (para flat) */
  selectedPaymentMethod?: "pix" | "card";
  /** Callback quando muda método de pagamento (para flat) */
  onSelectPaymentMethod?: (productId: number, method: "pix" | "card") => void;
  /** Callback de compra (para flat) — se não fornecido, usa WhatsApp padrão */
  onBuyNow?: (product: FlatProduct) => void;
}

// ============================================
// Card para Produto Flat (Seminovos, iPads, etc.)
// ============================================

const FlatProductCard: React.FC<{
  product: FlatProduct;
  selectedPaymentMethod: "pix" | "card";
  onSelectPaymentMethod?: (productId: number, method: "pix" | "card") => void;
  onBuyNow?: (product: FlatProduct) => void;
}> = ({ product, selectedPaymentMethod, onSelectPaymentMethod, onBuyNow }) => {
  const categorySlug = product.category.toLowerCase().replace(/\s+/g, "-");

  const handleBuy = () => {
    if (onBuyNow) {
      onBuyNow(product);
    } else {
      const msg = buildWhatsAppMessageFlat(
        product.model,
        product.storage,
        selectedPaymentMethod,
        product.pixPrice,
        product.installmentPrice,
      );
      openWhatsApp(msg);
    }
  };

  const handlePaymentChange = (method: "pix" | "card") => {
    if (onSelectPaymentMethod) {
      onSelectPaymentMethod(product.id, method);
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/20">
      <div className="p-4">
        {/* Imagem do produto */}
        {product.image && (
          <Link
            to={`/produto/${categorySlug}/${product.id}`}
            className="block mb-3"
          >
            <div className="w-full  flex items-center justify-center">
              <ImageLoader
                src={product.image}
                alt={`${product.model} ${product.storage || ""} ${product.color || ""}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            </div>
          </Link>
        )}

        {/* Info do produto */}
        <Link to={`/produto/${categorySlug}/${product.id}`} className="block">
          <h3 className="text-lg font-bold mb-1 text-white">{product.model}</h3>
          {(product.storage || product.color) && (
            <p className="text-gray-400 mb-2 text-sm">
              {product.storage} {product.color}
            </p>
          )}
        </Link>

        {/* Bateria */}
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
                {product.installmentPrice.startsWith("12x")
                  ? product.installmentPrice
                  : `12x ${product.installmentPrice}`}
              </div>
            )}
            <div className="text-[#ff6100] font-medium text-sm">
              {product.pixPrice} <span className="text-xs">no PIX</span>
            </div>
          </div>
        </div>

        {/* Detalhes */}
        {product.details && (
          <div className="text-xs text-gray-400 mb-2">{product.details}</div>
        )}

        {/* Garantia e status */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-300 text-xs">
            {product.category.toLowerCase().includes("seminov")
              ? "Garantia 120 dias"
              : "1 ano garantia"}
          </span>
          <div className="bg-gray-800 px-2 py-1 rounded text-xs text-white">
            {product.category.toLowerCase().includes("seminov")
              ? "Seminovo"
              : "Novo"}
          </div>
        </div>

        {/* Pagamento */}
        <div className="flex space-x-1 mb-2">
          <button
            className={`flex-1 py-1 rounded-md text-xs transition-colors ${
              selectedPaymentMethod === "pix"
                ? "bg-[#ff610061] text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => handlePaymentChange("pix")}
          >
            PIX
          </button>
          <button
            className={`flex-1 py-1 rounded-md text-xs transition-colors ${
              selectedPaymentMethod === "card"
                ? "bg-[#ff610061] text-white"
                : "bg-gray-800 text-gray-300"
            }`}
            onClick={() => handlePaymentChange("card")}
          >
            Cartão
          </button>
        </div>

        {/* Botão comprar */}
        <button
          className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white py-1.5 text-sm rounded-md transition-colors flex items-center justify-center"
          onClick={handleBuy}
        >
          <Phone size={16} className="mr-1" />
          Comprar
        </button>
      </div>
    </div>
  );
};

// ============================================
// Card para Produto Agrupado (iPhones Novos, MacBooks)
// ============================================

const GroupedProductCard: React.FC<{ product: GroupedProduct }> = ({
  product,
}) => {
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");

  const currentStorage = product.storages[selectedStorage];

  // Filtrar cores disponíveis para o storage selecionado
  const availableColors = product.colorsByStorage
    ? product.colors.filter((c) =>
        product.colorsByStorage![currentStorage]?.includes(c.name),
      )
    : product.colors;

  // Garantir que selectedColor não ultrapasse o limite
  const safeColorIndex =
    selectedColor >= availableColors.length ? 0 : selectedColor;
  const currentColor = availableColors[safeColorIndex];

  // Determinar a imagem: imageByStorage tem prioridade sobre a cor
  const displayImage =
    product.imageByStorage?.[currentStorage] ?? currentColor?.image;

  // Buscar preço da variante selecionada
  const variantPrice = currentColor
    ? getVariantPrice(product.pricing, currentStorage, currentColor.name)
    : null;

  // Verificar se a variante está indisponível (sem preço)
  const isUnavailable = !variantPrice;

  // Resetar cor quando muda storage e a cor atual não está disponível
  const handleStorageChange = (idx: number) => {
    setSelectedStorage(idx);
    const newStorage = product.storages[idx];
    if (product.colorsByStorage) {
      const newAvailable = product.colors.filter((c) =>
        product.colorsByStorage![newStorage]?.includes(c.name),
      );
      const currentColorName = availableColors[safeColorIndex]?.name;
      const newIndex = newAvailable.findIndex(
        (c) => c.name === currentColorName,
      );
      setSelectedColor(newIndex >= 0 ? newIndex : 0);
    }
  };

  const handleBuy = () => {
    if (!currentColor) return;

    if (isUnavailable) {
      // Abre WhatsApp com mensagem de interesse / avise-me
      const msg = `Olá! Tenho interesse no ${product.model} ${currentStorage} ${currentColor.name}. Podem me avisar quando estiver disponível?`;
      openWhatsApp(msg);
      return;
    }

    const msg = buildWhatsAppMessageGrouped(
      product.model,
      currentStorage,
      currentColor.name,
      paymentMethod,
      variantPrice!.pixPrice,
      variantPrice!.installmentPrice,
    );
    openWhatsApp(msg);
  };

  // Determinar o slug da categoria para a URL
  const categorySlug = product.category.toLowerCase().replace(/\s+/g, "-");

  return (
    <div
      className={`bg-gray-900 rounded-lg overflow-hidden border transition-all duration-300 hover:shadow-lg hover:shadow-black/20 ${
        isUnavailable ? "border-gray-700 opacity-75" : "border-gray-800"
      }`}
    >
      <div className="p-4">
        {/* Imagem do produto */}
        {displayImage && (
          <Link
            to={`/produto/${categorySlug}/${product.slug}?storage=${encodeURIComponent(currentStorage)}&color=${encodeURIComponent(currentColor?.name || "")}`}
            className="block mb-3"
          >
            <div className="w-full rounded-lg overflow-hidden relative">
              <ImageLoader
                src={displayImage}
                alt={`${product.model} ${currentColor?.name || ""}`}
                className="w-full h-full"
              />
              {isUnavailable && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                  <span className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs font-medium border border-gray-600">
                    Indisponível
                  </span>
                </div>
              )}
            </div>
          </Link>
        )}

        {/* Info */}
        <Link
          to={`/produto/${categorySlug}/${product.slug}?storage=${encodeURIComponent(currentStorage)}&color=${encodeURIComponent(currentColor?.name || "")}`}
          className="block"
        >
          <h3 className="text-lg font-bold mb-1 text-white min-h-[56px] flex items-start">
            {product.model}
          </h3>
        </Link>

        {/* Seletor de cor */}
        {availableColors.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            <span className="text-gray-400 text-xs">Cor:</span>
            <div className="flex gap-1.5">
              {availableColors.map((color, idx) => (
                <button
                  key={color.name}
                  title={color.name}
                  className={`w-6 h-6 rounded-full border-2 transition-all ${
                    idx === safeColorIndex
                      ? "border-[#ff6100] scale-110"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  onClick={() => setSelectedColor(idx)}
                />
              ))}
            </div>
            {currentColor && (
              <span className="text-gray-300 text-xs ml-1">
                {currentColor.name}
              </span>
            )}
          </div>
        )}

        {/* Seletor de storage */}
        <div className="flex gap-1 mb-3">
          {product.storages.map((storage, idx) => (
            <button
              key={storage}
              className={`flex-1 py-1 rounded-md text-xs transition-colors ${
                idx === selectedStorage
                  ? "bg-[#ff6100] text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => handleStorageChange(idx)}
            >
              {storage}
            </button>
          ))}
        </div>

        {/* Preço ou Indisponível */}
        <div className="flex flex-col mb-2">
          {isUnavailable ? (
            <div className="text-gray-400 text-sm py-1">
              Indisponível no momento
            </div>
          ) : (
            <>
              {variantPrice!.originalPrice && (
                <div className="text-gray-400 line-through text-xs">
                  De {variantPrice!.originalPrice}
                </div>
              )}
              <div className="flex justify-between items-end">
                <div className="text-white text-sm font-medium">
                  12x {variantPrice!.installmentPrice}
                </div>
                <div className="text-[#ff6100] font-medium text-sm">
                  {variantPrice!.pixPrice}{" "}
                  <span className="text-xs">no PIX</span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Detalhes */}
        <div className="text-xs text-gray-400 mb-2">{product.details}</div>

        {/* Garantia */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-300 text-xs">1 ano garantia</span>
          <div className="bg-gray-800 px-2 py-1 rounded text-xs text-white">
            Novo
          </div>
        </div>

        {/* Pagamento ou Avise-me */}
        {isUnavailable ? (
          <button
            className="w-full bg-gray-700 hover:bg-gray-600 text-white py-1.5 text-sm rounded-md transition-colors flex items-center justify-center"
            onClick={handleBuy}
          >
            <Bell size={16} className="mr-1" />
            Avise-me quando chegar
          </button>
        ) : (
          <>
            <div className="flex space-x-1 mb-2">
              <button
                className={`flex-1 py-1 rounded-md text-xs transition-colors ${
                  paymentMethod === "pix"
                    ? "bg-[#ff610061] text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
                onClick={() => setPaymentMethod("pix")}
              >
                PIX
              </button>
              <button
                className={`flex-1 py-1 rounded-md text-xs transition-colors ${
                  paymentMethod === "card"
                    ? "bg-[#ff610061] text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
                onClick={() => setPaymentMethod("card")}
              >
                Cartão
              </button>
            </div>

            {/* Botão comprar */}
            <button
              className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white py-1.5 text-sm rounded-md transition-colors flex items-center justify-center"
              onClick={handleBuy}
            >
              <Phone size={16} className="mr-1" />
              Comprar
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================
// Componente Principal (Despacha para o tipo correto)
// ============================================

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedPaymentMethod = "pix",
  onSelectPaymentMethod,
  onBuyNow,
}) => {
  if (isGroupedProduct(product)) {
    return <GroupedProductCard product={product} />;
  }

  return (
    <FlatProductCard
      product={product}
      selectedPaymentMethod={selectedPaymentMethod}
      onSelectPaymentMethod={onSelectPaymentMethod}
      onBuyNow={onBuyNow}
    />
  );
};

export default ProductCard;
