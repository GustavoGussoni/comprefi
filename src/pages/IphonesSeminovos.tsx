import React, { useState } from "react";
import ImageLoader from "../components/ImageLoader";
import FAQ from "../components/FAQ";
import ProductCard from "../components/ProductCard";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";

// Imagens estilizadas
import iphone15ProMaxImg from "../assets/images/iphone15promax_fancy.png";
import iphone15Img from "../assets/images/iphone15_fancy.png";
import iphone14ProMaxImg from "../assets/images/iphone14promax_fancy.png";
import iphone12ProImg from "../assets/images/iphone12pro_fancy.png";

// Imagens reais
import iphone15ProMaxReal1 from "../assets/images/IMG_3371.HEIC.png";
import iphone15ProMaxReal2 from "../assets/images/IMG_3396.png";
import iphone15Real1 from "../assets/images/IMG_3397.png";
import iphone15Real2 from "../assets/images/IMG_3375.png";
import iphone14ProMaxReal1 from "../assets/images/IMG_3401.png";
import iphone14ProMaxReal2 from "../assets/images/IMG_3381.png";
import iphone12ProReal1 from "../assets/images/IMG_3400.png";
import iphone12ProReal2 from "../assets/images/IMG_3380.png";

const IphonesSeminovos: React.FC = () => {
  // Número de WhatsApp
  const whatsappNumber = "5534999252590";

  // Dados dos produtos extraídos da tabela de preços
  const products = [
    {
      id: 1,
      model: "iPhone 15 Pro Max",
      storage: "256GB",
      color: "Titânio Natural",
      battery: "89%",
      originalPrice: "R$ 6.590,00",
      installmentPrice: "R$ 540,67",
      pixPrice: "R$ 5.690",
      details: "sem detalhes | garantia Apple até junho",
      image: iphone15ProMaxImg,
      realImages: [iphone15ProMaxReal1, iphone15ProMaxReal2],
      category: "iPhones Seminovos",
    },
    {
      id: 2,
      model: "iPhone 15",
      storage: "256GB",
      color: "Preto",
      battery: "90%",
      originalPrice: "R$ 5.190,00",
      installmentPrice: "R$ 379,13",
      pixPrice: "R$ 3.990",
      details: "*pequeno detalhe na lateral",
      image: iphone15Img,
      realImages: [iphone15Real1, iphone15Real2],
      category: "iPhones Seminovos",
    },
    {
      id: 3,
      model: "iPhone 14 Pro Max",
      storage: "512GB",
      color: "Preto",
      battery: "81%",
      originalPrice: "R$ 5.900,00",
      installmentPrice: "R$ 465,60",
      pixPrice: "R$ 4.900",
      details: "*detalhes de capinha na borda",
      image: iphone14ProMaxImg,
      realImages: [iphone14ProMaxReal1, iphone14ProMaxReal2],
      category: "iPhones Seminovos",
    },
    {
      id: 4,
      model: "iPhone 14 Pro Max",
      storage: "256GB",
      color: "Roxo",
      battery: "87%",
      originalPrice: "R$ 5.300,00",
      installmentPrice: "R$ 441,85",
      pixPrice: "R$ 4.650",
      details: "*detalhe na lateral",
      image: iphone14ProMaxImg,
      realImages: [iphone14ProMaxReal1, iphone14ProMaxReal2],
      category: "iPhones Seminovos",
    },
    {
      id: 5,
      model: "iPhone 12 Pro",
      storage: "128GB",
      color: "Dourado",
      battery: "78%",
      originalPrice: "R$ 2.700,00",
      installmentPrice: "R$ 189,09",
      pixPrice: "R$ 1.990",
      details: "sem detalhes",
      image: iphone12ProImg,
      realImages: [iphone12ProReal1, iphone12ProReal2],
      category: "iPhones Seminovos",
    },
  ];

  // Estado para controlar a forma de pagamento selecionada para cada produto
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<{
    [key: number]: "pix" | "card";
  }>({});

  // Estado para controlar a visualização ampliada de imagens
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Função para selecionar forma de pagamento
  const selectPaymentMethod = (productId: number, method: "pix" | "card") => {
    setSelectedPaymentMethods((prev) => ({
      ...prev,
      [productId]: method,
    }));
  };

  // Função para redirecionar para o WhatsApp
  const redirectToWhatsApp = (product: any) => {
    const paymentMethod = selectedPaymentMethods[product.id] || "pix";
    const price =
      paymentMethod === "pix"
        ? product.pixPrice
        : `12x ${product.installmentPrice}`;
    const message = `Quero comprar o ${product.model} ${product.storage} ${product.color} por ${price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="iphones-seminovos-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
          iPhones Seminovos
        </h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          Garantia de 120 dias
        </p>

        {/* Lista de produtos */}
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

        {/* Seção de Fotos Reais */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-white">Fotos Reais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) =>
              product.realImages.map((img, imgIndex) => (
                <div
                  key={`${product.id}-${imgIndex}`}
                  className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                  onClick={() => setEnlargedImage(img)}
                >
                  <ImageLoader
                    src={img}
                    alt={`${product.model} - Foto real ${imgIndex + 1}`}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-2 text-center text-gray-400 text-sm">
                    {product.model} {product.storage}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

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

        {/* Por que escolher a CompreFi */}
        <div className="mt-16">
          <WhyChooseCompreFi category="iPhones Seminovos" />
        </div>

        {/* FAQ */}
        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default IphonesSeminovos;
