import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, Shield, Star, Phone } from "lucide-react";
import ImageLoader from "./ImageLoader";
import FAQ from "./FAQ";
import WhyChooseSection from "./WhyChooseCompreFi";
import ZoomableLightbox from "./ZoomableLightbox";
import {
  FlatProduct,
  GroupedProduct,
  Product,
  isGroupedProduct,
  getVariantPrice,
} from "../types/product";
import {
  openWhatsApp,
  buildWhatsAppMessageFlat,
  buildWhatsAppMessageGrouped,
} from "../data/constants";

// ============================================
// Props
// ============================================

interface ProductDetailProps {
  product: Product;
}

// ============================================
// Depoimentos (compartilhados)
// ============================================

const testimonials = [
  {
    id: 1,
    name: "Madu",
    text: "Com certeza vou recomendar você pra quem perguntar algo, um dos únicos que se preocupou em achar oq eu queria",
    rating: 5,
  },
  {
    id: 2,
    name: "Luana Bernardes",
    text: "Muuuuito obrigada Gustavo, pelo atendimento e agilidade. To muito feliz com meu novo celular. Você ganhou uma cliente e vai ganhar mais alguns hahaha pq vou super indicar. top d+",
    rating: 5,
  },
  {
    id: 3,
    name: "Marcos Pereira",
    text: "Já comprei diversos produtos Apple com a CompreFi e sempre tive experiências excelentes. Atendimento premium e produtos de qualidade.",
    rating: 5,
  },
];

// ============================================
// Galeria com Embla + Thumbnails
// ============================================

const ProductGallery: React.FC<{
  images: string[];
  productName: string;
  galleryKey: string;
}> = ({ images, productName, galleryKey }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });

  const onMainSelect = useCallback(() => {
    if (!mainApi) return;
    setSelectedThumb(mainApi.selectedScrollSnap());
  }, [mainApi]);

  useEffect(() => {
    if (!mainApi) return;
    onMainSelect();
    mainApi.on("select", onMainSelect);
    return () => {
      mainApi.off("select", onMainSelect);
    };
  }, [mainApi, onMainSelect]);

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi],
  );

  // Reset ao mudar galleryKey (ex: troca de cor)
  useEffect(() => {
    if (mainApi) {
      mainApi.scrollTo(0, true);
      setSelectedThumb(0);
    }
  }, [galleryKey, mainApi]);

  if (images.length === 0) return null;

  return (
    <div className="product-gallery">
      {/* Carrossel Principal */}
      <div className="overflow-hidden rounded-lg cursor-pointer" ref={mainRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div
              key={`${galleryKey}-${index}`}
              className="flex-[0_0_100%] min-w-0"
              onClick={() => setLightboxIndex(index)}
            >
              <ImageLoader
                src={img}
                alt={`${productName} - Foto ${index + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Indicador + hint */}
      <div className="flex items-center justify-between mt-3 mb-3 px-1">
        <span className="text-gray-400 text-sm">
          {selectedThumb + 1} / {images.length} fotos
        </span>
        <span className="text-gray-500 text-xs">Toque para ampliar</span>
      </div>

      {/* Thumbnails */}
      <div
        className="flex gap-2 overflow-x-auto pb-2"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {images.map((img, index) => (
          <button
            key={`thumb-${galleryKey}-${index}`}
            onClick={() => onThumbClick(index)}
            className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${
              selectedThumb === index
                ? "border-[#ff6100] opacity-100"
                : "border-gray-700 opacity-50 hover:opacity-80"
            }`}
          >
            <img
              src={img}
              alt={`Miniatura ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <ZoomableLightbox
          images={images}
          startIndex={lightboxIndex}
          productName={productName}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
};

// ============================================
// Seção de Depoimentos
// ============================================

const TestimonialsSection: React.FC = () => (
  <div className="testimonials-section mb-16">
    <h2 className="text-2xl font-bold mb-6 text-white">
      O Que Nossos Clientes Dizem
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial) => (
        <div
          key={testimonial.id}
          className="bg-gray-900 rounded-lg p-6 border border-gray-800"
        >
          <div className="flex mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className="text-[#ff6100]"
                fill="currentColor"
              />
            ))}
          </div>
          <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
          <p className="text-white font-medium">{testimonial.name}</p>
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// Flat Product View
// ============================================

const FlatProductView: React.FC<{ product: FlatProduct }> = ({ product }) => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");

  const allImages = [product.image, ...(product.realImages || [])].filter(
    Boolean,
  );
  const productName =
    `${product.model} ${product.storage || ""} ${product.color || ""}`.trim();
  const isSeminovo = product.category.toLowerCase().includes("seminov");
  const warranty = isSeminovo
    ? "Garantia de 120 dias"
    : "1 ano de garantia Apple";

  const handleBuy = () => {
    const msg = buildWhatsAppMessageFlat(
      product.model,
      product.storage,
      paymentMethod,
      product.pixPrice,
      product.installmentPrice,
    );
    openWhatsApp(msg);
  };

  return (
    <div className="product-detail-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para {product.category}
        </button>

        {/* Seção Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Galeria */}
          <ProductGallery
            images={allImages}
            productName={productName}
            galleryKey={`flat-${product.id}`}
          />

          {/* Info */}
          <div className="product-info bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h1 className="text-3xl font-bold mb-2 text-white">
              {product.model}
            </h1>
            {(product.storage || product.color) && (
              <p className="text-xl text-gray-300 mb-6">
                {[product.storage, product.color].filter(Boolean).join(" • ")}
              </p>
            )}

            {/* Bateria */}
            {product.battery && (
              <div className="flex items-center mb-6">
                <span className="text-gray-300 mr-2">Bateria:</span>
                <span
                  className={`font-medium ${
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
            <div className="pricing mb-6">
              {product.originalPrice && (
                <div className="text-gray-400 line-through text-sm mb-1">
                  De {product.originalPrice}
                </div>
              )}
              {product.installmentPrice && (
                <div className="text-xl font-bold text-white mb-1">
                  Por{" "}
                  {product.installmentPrice.startsWith("12x")
                    ? product.installmentPrice
                    : `12x ${product.installmentPrice}`}
                </div>
              )}
              <div className="text-2xl text-[#ff6100] font-medium">
                ou {product.pixPrice} no PIX
              </div>
            </div>

            {/* Detalhes (seminovos) */}
            {product.details && isSeminovo && (
              <div className="details mb-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-white">
                  Detalhes do Produto
                </h3>
                <p className="text-gray-300">{product.details}</p>
              </div>
            )}

            {/* Especificações */}
            {product.specs && (
              <div className="specs mb-6">
                <h3 className="text-lg font-medium mb-2 text-white">
                  Especificações
                </h3>
                <p className="text-gray-300">{product.specs}</p>
              </div>
            )}

            {/* Garantia */}
            <div className="warranty mb-8 flex items-center">
              <Shield size={20} className="mr-2 text-[#ff6100]" />
              <span className="text-gray-300">{warranty}</span>
            </div>

            {/* Pagamento */}
            <div className="payment-selection mb-6">
              <h3 className="text-lg font-medium mb-3 text-white">
                Forma de Pagamento
              </h3>
              <div className="flex space-x-4">
                <button
                  className={`flex-1 py-3 rounded-md transition-colors ${
                    paymentMethod === "pix"
                      ? "bg-[#ff610040] text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("pix")}
                >
                  PIX
                </button>
                <button
                  className={`flex-1 py-3 rounded-md transition-colors ${
                    paymentMethod === "card"
                      ? "bg-[#ff610040] text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  Cartão
                </button>
              </div>
            </div>

            {/* Botão Comprar */}
            <button
              className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white py-4 rounded-md transition-colors flex items-center justify-center text-lg font-medium"
              onClick={handleBuy}
            >
              <Phone size={24} className="mr-2" />
              Comprar agora
            </button>
          </div>
        </div>

        {/* Depoimentos */}
        <TestimonialsSection />

        {/* Por que comprar */}
        <div className="mb-16">
          <WhyChooseSection category={product.category} />
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

// ============================================
// Grouped Product View
// ============================================

const GroupedProductView: React.FC<{ product: GroupedProduct }> = ({
  product,
}) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialStorage = searchParams.get("storage") || product.storages[0];
  const initialColor = searchParams.get("color") || product.colors[0].name;

  const [selectedStorage, setSelectedStorage] = useState(initialStorage);
  const [selectedColor, setSelectedColor] = useState(initialColor);
  const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("pix");

  // Cores disponíveis para o storage selecionado
  const availableColors = product.colorsByStorage
    ? product.colorsByStorage[selectedStorage] ||
      product.colors.map((c) => c.name)
    : product.colors.map((c) => c.name);

  const effectiveColor = availableColors.includes(selectedColor)
    ? selectedColor
    : availableColors[0];

  const colorData =
    product.colors.find((c) => c.name === effectiveColor) || product.colors[0];

  const price = getVariantPrice(
    product.pricing,
    selectedStorage,
    effectiveColor,
  );

  const galleryImages = [colorData.image, ...colorData.gallery];
  const productName = `${product.model} ${effectiveColor}`;

  // Atualizar query params
  useEffect(() => {
    setSearchParams(
      { storage: selectedStorage, color: effectiveColor },
      { replace: true },
    );
  }, [selectedStorage, effectiveColor, setSearchParams]);

  const handleBuy = () => {
    if (!price) return;
    const msg = buildWhatsAppMessageGrouped(
      product.model,
      selectedStorage,
      effectiveColor,
      paymentMethod,
      price.pixPrice,
      price.installmentPrice,
    );
    openWhatsApp(msg);
  };

  return (
    <div className="product-detail-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Voltar para {product.category}
        </button>

        {/* Seção Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Galeria — muda com a cor */}
          <ProductGallery
            images={galleryImages}
            productName={productName}
            galleryKey={effectiveColor}
          />

          {/* Info com seletores */}
          <div className="product-info bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h1 className="text-3xl font-bold mb-2 text-white">
              {product.model}
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              {selectedStorage} • {effectiveColor}
            </p>

            {/* Seletor de Cor */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-400 mb-2">Cor</h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color) => {
                  const isAvailable = availableColors.includes(color.name);
                  const isSelected = color.name === effectiveColor;
                  return (
                    <button
                      key={color.name}
                      onClick={() => {
                        if (isAvailable) setSelectedColor(color.name);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all ${
                        isSelected
                          ? "border-[#ff6100] bg-[#ff610015]"
                          : isAvailable
                            ? "border-gray-700 hover:border-gray-500"
                            : "border-gray-800 opacity-30 cursor-not-allowed"
                      }`}
                      disabled={!isAvailable}
                    >
                      <span
                        className={`w-5 h-5 rounded-full border ${
                          ["#F5F5F0", "#C0C0C0", "#D4AF37"].includes(color.hex)
                            ? "border-gray-400"
                            : "border-gray-600"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                      <span
                        className={`text-sm ${isSelected ? "text-white" : "text-gray-300"}`}
                      >
                        {color.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Seletor de Storage */}
            {product.storages.length > 1 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-400 mb-2">
                  Capacidade
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product.storages.map((storage) => (
                    <button
                      key={storage}
                      onClick={() => setSelectedStorage(storage)}
                      className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all ${
                        selectedStorage === storage
                          ? "border-[#ff6100] bg-[#ff610015] text-white"
                          : "border-gray-700 text-gray-300 hover:border-gray-500"
                      }`}
                    >
                      {storage}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Bateria */}
            {product.battery && (
              <div className="flex items-center mb-6">
                <span className="text-gray-300 mr-2">Bateria:</span>
                <span className="font-medium text-green-500">
                  {product.battery}
                </span>
              </div>
            )}

            {/* Preços */}
            <div className="pricing mb-6">
              {price ? (
                <>
                  {price.originalPrice && (
                    <div className="text-gray-400 line-through text-sm mb-1">
                      De {price.originalPrice}
                    </div>
                  )}
                  {price.installmentPrice && (
                    <div className="text-xl font-bold text-white mb-1">
                      Por 12x {price.installmentPrice}
                    </div>
                  )}
                  <div className="text-2xl text-[#ff6100] font-medium">
                    ou {price.pixPrice} no PIX
                  </div>
                </>
              ) : (
                <div className="text-xl text-gray-400">
                  Selecione uma variante para ver o preço
                </div>
              )}
            </div>

            {/* Especificações */}
            {product.specs && (
              <div className="specs mb-6">
                <h3 className="text-lg font-medium mb-2 text-white">
                  Especificações
                </h3>
                <p className="text-gray-300">{product.specs}</p>
              </div>
            )}

            {/* Garantia */}
            <div className="warranty mb-8 flex items-center">
              <Shield size={20} className="mr-2 text-[#ff6100]" />
              <span className="text-gray-300">1 ano de garantia Apple</span>
            </div>

            {/* Pagamento */}
            <div className="payment-selection mb-6">
              <h3 className="text-lg font-medium mb-3 text-white">
                Forma de Pagamento
              </h3>
              <div className="flex space-x-4">
                <button
                  className={`flex-1 py-3 rounded-md transition-colors ${
                    paymentMethod === "pix"
                      ? "bg-[#ff610040] text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("pix")}
                >
                  PIX
                </button>
                <button
                  className={`flex-1 py-3 rounded-md transition-colors ${
                    paymentMethod === "card"
                      ? "bg-[#ff610040] text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setPaymentMethod("card")}
                >
                  Cartão
                </button>
              </div>
            </div>

            {/* Botão Comprar */}
            <button
              className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white py-4 rounded-md transition-colors flex items-center justify-center text-lg font-medium"
              onClick={handleBuy}
              disabled={!price}
            >
              <Phone size={24} className="mr-2" />
              Comprar agora
            </button>
          </div>
        </div>

        {/* Depoimentos */}
        <TestimonialsSection />

        {/* Por que comprar */}
        <div className="mb-16">
          <WhyChooseSection category={product.category} />
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

// ============================================
// Componente Principal — Roteador
// ============================================

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  if (isGroupedProduct(product)) {
    return <GroupedProductView product={product} />;
  }
  return <FlatProductView product={product as FlatProduct} />;
};

export default ProductDetail;
