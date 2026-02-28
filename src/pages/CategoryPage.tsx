import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { getCategoryBySlug } from "../data/categories";
import { FlatProduct, GroupedProduct } from "../types/product";
import { openWhatsApp, buildWhatsAppMessageFlat } from "../data/constants";
import ProductCard from "../components/ProductCard";
import WhyChooseSection from "../components/WhyChooseCompreFi";
import FAQ from "../components/FAQ";
import ImageLoader from "../components/ImageLoader";
import ZoomableLightbox from "../components/ZoomableLightbox";

// ============================================
// Carrossel de fotos reais por produto (seminovos)
// ============================================

const ProductPhotoCarousel: React.FC<{
  product: FlatProduct;
  onImageClick: (images: string[], index: number) => void;
}> = ({ product, onImageClick }) => {
  const allImages = [product.image, ...(product.realImages || [])].filter(
    Boolean,
  );

  const [carouselRef, carouselApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!carouselApi) return;
    setCurrentIndex(carouselApi.selectedScrollSnap());
  }, [carouselApi]);

  useEffect(() => {
    if (!carouselApi) return;
    onSelect();
    carouselApi.on("select", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi, onSelect]);

  // Early return APÓS todos os hooks
  if (!product.realImages || product.realImages.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">
          {product.model} {product.storage || ""}
        </h3>
        <span className="text-gray-400 text-sm">
          {currentIndex + 1} / {allImages.length} fotos
        </span>
      </div>

      <div className="overflow-hidden rounded-lg" ref={carouselRef}>
        <div className="flex">
          {allImages.map((img, index) => (
            <div
              key={index}
              className="flex-[0_0_75%] sm:flex-[0_0_45%] md:flex-[0_0_32%] min-w-0 pr-3 cursor-pointer"
              onClick={() => onImageClick(allImages, index)}
            >
              <div className="rounded-lg overflow-hidden bg-gray-900">
                <ImageLoader
                  src={img}
                  alt={`${product.model} - Foto ${index + 1}`}
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1.5 mt-3">
        {allImages.map((_, index) => (
          <button
            key={index}
            onClick={() => carouselApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentIndex === index ? "bg-[#ff6100] w-4" : "bg-gray-600"
            }`}
            aria-label={`Ir para foto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// CategoryPage
// ============================================

const CategoryPage: React.FC = () => {
  const location = useLocation();
  const categorySlug = location.pathname.replace(/^\//, "");
  const config = categorySlug ? getCategoryBySlug(categorySlug) : undefined;

  // Estado para pagamento (flat products)
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<{
    [key: number]: "pix" | "card";
  }>({});

  // Estado para lightbox
  const [lightboxImages, setLightboxImages] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number>(0);

  const selectPaymentMethod = (productId: number, method: "pix" | "card") => {
    setSelectedPaymentMethods((prev) => ({
      ...prev,
      [productId]: method,
    }));
  };

  const redirectToWhatsApp = (product: FlatProduct) => {
    const paymentMethod = selectedPaymentMethods[product.id] || "pix";
    const msg = buildWhatsAppMessageFlat(
      product.model,
      product.storage,
      paymentMethod,
      product.pixPrice,
      product.installmentPrice,
    );
    openWhatsApp(msg);
  };

  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxImages(null);
  };

  // Página não encontrada
  if (!config) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Categoria não encontrada
          </h1>
          <p className="text-gray-400">A categoria solicitada não existe.</p>
        </div>
      </div>
    );
  }

  // Coletar todos os flat products (para fotos reais)
  const allFlatProducts: FlatProduct[] = [];
  if (config.products) {
    allFlatProducts.push(...config.products);
  }
  if (config.sections) {
    config.sections.forEach((section) => {
      allFlatProducts.push(...section.products);
    });
  }

  // Verificar se há fotos reais em algum produto
  const productsWithPhotos = allFlatProducts.filter(
    (p) => p.realImages && p.realImages.length > 0,
  );

  // ---- Renderizar grid de produtos flat ----
  const renderFlatGrid = (products: FlatProduct[]) => (
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
  );

  // ---- Renderizar grid de produtos agrupados ----
  const renderGroupedGrid = (products: GroupedProduct[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
          {config.title}
        </h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          {config.subtitle}
        </p>

        {/* Conteúdo por tipo */}
        {config.type === "grouped" &&
          config.groupedProducts &&
          renderGroupedGrid(config.groupedProducts)}

        {config.type === "flat" &&
          !config.sections &&
          config.products &&
          renderFlatGrid(config.products)}

        {config.type === "flat" && config.sections && (
          <>
            {config.sections.map((section, idx) => (
              <div key={idx} className={idx > 0 ? "mt-12" : ""}>
                <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-2">
                  {section.title}
                </h2>
                {renderFlatGrid(section.products)}
              </div>
            ))}
          </>
        )}

        {/* Seção de Fotos Reais (só para categorias com fotos) */}
        {productsWithPhotos.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-white">Fotos Reais</h2>
            {productsWithPhotos.map((product) => (
              <ProductPhotoCarousel
                key={product.id}
                product={product}
                onImageClick={openLightbox}
              />
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxImages && (
          <ZoomableLightbox
            images={lightboxImages}
            startIndex={lightboxIndex}
            productName={config.title}
            onClose={closeLightbox}
          />
        )}

        {/* Por que escolher a CompreFi */}
        <div className="mt-16">
          <WhyChooseSection
            category={config.title}
            title={config.whyChooseTitle}
            items={config.whyChooseItems}
          />
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
