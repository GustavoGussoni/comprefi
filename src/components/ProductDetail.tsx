import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

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
      "_blank"
    );
  };

  // Função para voltar à página anterior
  const goBack = () => {
    navigate(-1);
  };

  // Depoimentos de clientes (simulados)
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

  // const chipLabel = product.model.includes("M4")
  //   ? "M4"
  //   : product.model.includes("M3")
  //   ? "M3"
  //   : product.model.includes("M2")
  //   ? "M2"
  //   : product.model.includes("M1")
  //   ? "M1"
  //   : null;

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
          {/* Imagem do Produto */}
          <div className="product-image">
            <ImageLoader
              src={product.image}
              alt={`${product.model} ${product.storage || ""} ${
                product.color || ""
              }`}
              className="w-full h-auto rounded-lg shadow-lg"
            />
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

        {/* Seção de Fotos Reais */}
        {product.realImages && (
          <div className="real-photos-section mb-16">
            <h2 className="text-2xl font-bold mb-6 text-white">Fotos Reais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.realImages.map((img, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => setEnlargedImage(img)}
                >
                  <ImageLoader
                    src={img}
                    alt={`${product.model} - Foto real ${index + 1}`}
                    className="w-full h-auto object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal para visualização ampliada de imagens */}
        {enlargedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setEnlargedImage(null)}
          >
            <div
              className="relative max-w-4xl max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 bg-[#ff6100] rounded-full p-2 text-white"
                onClick={() => setEnlargedImage(null)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <img
                src={enlargedImage}
                alt="Imagem ampliada"
                className="max-w-full max-h-[85vh] object-contain"
              />
            </div>
          </div>
        )}

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
