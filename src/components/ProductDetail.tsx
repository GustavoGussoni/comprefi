import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import ImageLoader from "./ImageLoader";
import FAQ from "./FAQ";

interface ProductDetailProps {
  product: {
    id: number;
    model: string;
    storage?: string;
    color?: string;
    battery?: string;
    originalPrice?: string;
    installmentPrice?: string;
    pixPrice: string;
    details?: string;
    image: string;
    realImages: string[];
    specs?: string;
    category: string;
  };
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    "pix" | "card"
  >("pix");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [lightboxCurrent, setLightboxCurrent] = useState(0);
  const scrollYRef = useRef(0);

  // Todas as imagens: imagem principal + fotos reais
  const allImages = [product.image, ...(product.realImages || [])];

  // Embla para galeria principal
  const [mainRef, mainApi] = useEmblaCarousel({ loop: true });

  // Embla para lightbox
  const [lightboxRef, lightboxApi] = useEmblaCarousel({
    loop: true,
    startIndex: lightboxIndex ?? 0,
  });

  // Sincronizar thumbnail com slide principal
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

  // Atualizar contador do lightbox quando navega
  const onLightboxSelect = useCallback(() => {
    if (!lightboxApi) return;
    setLightboxCurrent(lightboxApi.selectedScrollSnap());
  }, [lightboxApi]);

  useEffect(() => {
    if (!lightboxApi) return;
    onLightboxSelect();
    lightboxApi.on("select", onLightboxSelect);
    return () => {
      lightboxApi.off("select", onLightboxSelect);
    };
  }, [lightboxApi, onLightboxSelect]);

  // Quando clica no thumbnail, navega o carrossel principal
  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi],
  );

  // Bloqueia scroll do body quando lightbox está aberto (compatível com iOS Safari)
  useEffect(() => {
    if (lightboxIndex !== null) {
      scrollYRef.current = window.scrollY;
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollYRef.current);
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [lightboxIndex]);

  // Sincronizar lightbox com o índice correto ao abrir
  useEffect(() => {
    if (lightboxApi && lightboxIndex !== null) {
      lightboxApi.scrollTo(lightboxIndex, true);
    }
  }, [lightboxApi, lightboxIndex]);

  // Fechar lightbox com Escape e navegar com setas
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") lightboxApi?.scrollPrev();
      if (e.key === "ArrowRight") lightboxApi?.scrollNext();
    };
    if (lightboxIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [lightboxIndex, lightboxApi]);

  // Número de WhatsApp
  const whatsappNumber = "+5534999252590";

  // Função para redirecionar para o WhatsApp
  const redirectToWhatsApp = () => {
    const price =
      selectedPaymentMethod === "pix"
        ? product.pixPrice
        : `12x ${product.installmentPrice}`;
    const productName = `${product.model} ${product.storage || ""} ${
      product.color || ""
    }`.trim();
    const message = `Quero comprar o ${productName} por ${price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
    );
  };

  // Função para voltar à página anterior
  const goBack = () => {
    navigate(-1);
  };

  // Depoimentos de clientes
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

  // Lightbox com Portal
  const renderLightbox = () => {
    if (lightboxIndex === null) return null;
    return createPortal(
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.97)",
          zIndex: 99999,
          display: "flex",
          flexDirection: "column",
          touchAction: "pan-x",
        }}
      >
        {/* Header do lightbox */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 16px",
            flexShrink: 0,
          }}
        >
          <span style={{ color: "#999", fontSize: "14px" }}>
            {lightboxCurrent + 1} / {allImages.length}
          </span>
          <button
            style={{
              backgroundColor: "#ff6100",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            onClick={() => setLightboxIndex(null)}
            aria-label="Fechar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Carrossel do lightbox */}
        <div
          style={{ flex: 1, overflow: "hidden", position: "relative" }}
          ref={lightboxRef}
        >
          <div style={{ display: "flex", height: "100%" }}>
            {allImages.map((img, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 100%",
                  minWidth: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "16px",
                }}
              >
                <img
                  src={img}
                  alt={`${product.model} - Foto ${index + 1}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    borderRadius: "8px",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Setas de navegação (visíveis em desktop, ocultas em mobile) */}
          <button
            onClick={() => lightboxApi?.scrollPrev()}
            className="hidden md:flex"
            style={{
              position: "absolute",
              left: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 97, 0, 0.8)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <button
            onClick={() => lightboxApi?.scrollNext()}
            className="hidden md:flex"
            style={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              backgroundColor: "rgba(255, 97, 0, 0.8)",
              border: "none",
              borderRadius: "50%",
              width: "44px",
              height: "44px",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
            aria-label="Próxima"
          >
            ›
          </button>
        </div>

        {/* Hint de swipe no mobile */}
        <div
          className="md:hidden"
          style={{
            textAlign: "center",
            padding: "8px",
            color: "#666",
            fontSize: "12px",
            flexShrink: 0,
          }}
        >
          Deslize para navegar entre as fotos
        </div>
      </div>,
      document.body,
    );
  };

  return (
    <div className="product-detail-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        {/* Botão Voltar */}
        <button
          onClick={goBack}
          className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Voltar para {product.category}
        </button>

        {/* Seção Principal do Produto */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Galeria de Imagens */}
          <div className="product-gallery">
            {/* Carrossel Principal */}
            <div
              className="overflow-hidden rounded-lg cursor-pointer"
              ref={mainRef}
            >
              <div className="flex">
                {allImages.map((img, index) => (
                  <div
                    key={index}
                    className="flex-[0_0_100%] min-w-0"
                    onClick={() => setLightboxIndex(index)}
                  >
                    <ImageLoader
                      src={img}
                      alt={`${product.model} - Foto ${index + 1}`}
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Indicador de posição + hint */}
            <div className="flex items-center justify-between mt-3 mb-3 px-1">
              <span className="text-gray-400 text-sm">
                {selectedThumb + 1} / {allImages.length} fotos
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
              {allImages.map((img, index) => (
                <button
                  key={index}
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
          </div>

          {/* Informações do Produto */}
          <div className="product-info bg-gray-900 rounded-lg p-8 border border-gray-800">
            <h1 className="text-3xl font-bold mb-2 text-white">
              {product.model}
            </h1>
            {product.storage && product.color && (
              <p className="text-xl text-gray-300 mb-6">
                {product.storage} • {product.color}
              </p>
            )}

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

            <div className="pricing mb-6">
              {product.originalPrice && (
                <div className="text-gray-400 line-through text-sm mb-1">
                  De {product.originalPrice}
                </div>
              )}
              {product.installmentPrice && (
                <div className="text-xl font-bold text-white mb-1">
                  Por 12x {product.installmentPrice}
                </div>
              )}
              <div className="text-2xl text-[#ff6100] font-medium">
                ou {product.pixPrice} no PIX
              </div>
            </div>

            {product.details && product.category.includes("Seminovo") && (
              <div className="details mb-6 p-4 bg-gray-800 rounded-lg">
                <h3 className="text-lg font-medium mb-2 text-white">
                  Detalhes do Produto
                </h3>
                <p className="text-gray-300">{product.details}</p>
              </div>
            )}

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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-[#ff6100]"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-300">
                {product.category.includes("Seminovo")
                  ? "Garantia de 120 dias"
                  : "1 ano de garantia Apple"}
              </span>
            </div>

            {/* Seleção de forma de pagamento */}
            <div className="payment-selection mb-6">
              <h3 className="text-lg font-medium mb-3 text-white">
                Forma de Pagamento
              </h3>
              <div className="flex space-x-4">
                <button
                  className={`flex-1 py-3 rounded-md transition-colors ${
                    selectedPaymentMethod === "pix"
                      ? "bg-[#ff610040] text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("pix")}
                >
                  PIX
                </button>
                <button
                  className={`flex-1 py-3 rounded-md transition-colors ${
                    selectedPaymentMethod === "card"
                      ? "bg-[#ff610040] text-white"
                      : "bg-gray-800 text-gray-300"
                  }`}
                  onClick={() => setSelectedPaymentMethod("card")}
                >
                  Cartão
                </button>
              </div>
            </div>

            {/* Botão de Compra */}
            <button
              className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white py-4 rounded-md transition-colors flex items-center justify-center text-lg font-medium"
              onClick={redirectToWhatsApp}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Comprar agora
            </button>
          </div>
        </div>

        {/* Lightbox */}
        {renderLightbox()}

        {/* Seção de Depoimentos */}
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
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#ff6100]"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="text-white font-medium">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="additional-info mb-16 bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Por que comprar na CompreFi?
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ff6100] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                {product.category.includes("Seminovo")
                  ? "Todos os aparelhos passam por rigorosa inspeção de qualidade"
                  : "Produtos originais com 1 ano de garantia oficial Apple"}
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ff6100] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Suporte vitalício para todos os produtos adquiridos</span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ff6100] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Programa de indicações com desconto acumulativo</span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ff6100] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Economia significativa em comparação com lojas oficiais
              </span>
            </li>
            <li className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-[#ff6100] flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Atendimento personalizado por especialistas Apple</span>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="faq-section">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
