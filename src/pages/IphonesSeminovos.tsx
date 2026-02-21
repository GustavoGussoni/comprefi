import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import ImageLoader from "../components/ImageLoader";
import FAQ from "../components/FAQ";
import ProductCard from "../components/ProductCard";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";

// Imagens capa

import iphone16BTraseira from "../assets/new-images/semi/16b/16-white-traseira.jpg";
import iphone16VTraseira from "../assets/new-images/semi/16v/16-green-traseira.jpg";
import iphone15PMPTraseira from "../assets/new-images/semi/15-pm-p/15-pm-black-traseira.jpg";
import iphone14PMRTraseira from "../assets/new-images/semi/14-pm-r/14-pm-purple-traseira.jpg";

//16 branco

import iphone16ImgFrente from "../assets/new-images/semi/16b/16-white-frente.jpg";
import iphone16ImgLaterald from "../assets/new-images/semi/16b/16-white-laterald.jpg";
import iphone16ImgLaterale from "../assets/new-images/semi/16b/16-white-laterale.jpg";
import iphone16ImgBaixo from "../assets/new-images/semi/16b/16-white-baixo.jpg";
import iphone16ImgCima from "../assets/new-images/semi/16b/16-white-cima.jpg";

//16 verde

import iphone16VImgFrente from "../assets/new-images/semi/16v/16-green-frente.jpg";
import iphone16VImgLaterald from "../assets/new-images/semi/16v/16-green-laterald.jpg";
import iphone16VImgLaterale from "../assets/new-images/semi/16v/16-green-laterale.jpg";
import iphone16VImgBaixo from "../assets/new-images/semi/16v/16-green-baixo.jpg";
import iphone16VImgCima from "../assets/new-images/semi/16v/16-green-cima.jpg";

//15 Pro Max preto

import iphone15PMPImgFrente from "../assets/new-images/semi/15-pm-p/15-pm-black-frente.jpg";
import iphone15PMPImgLaterald from "../assets/new-images/semi/15-pm-p/15-pm-black-laterald.jpg";
import iphone15PMPImgLaterale from "../assets/new-images/semi/15-pm-p/15-pm-black-laterale.jpg";
import iphone15PMPImgBaixo from "../assets/new-images/semi/15-pm-p/15-pm-black-baixo.jpg";
import iphone15PMPImgCima from "../assets/new-images/semi/15-pm-p/15-pm-black-cima.jpg";

// 14 Pro Max roxo

import iphone14PMRImgFrente from "../assets/new-images/semi/14-pm-r/14-pm-purple-frente.jpg";
import iphone14PMRImgLaterald from "../assets/new-images/semi/14-pm-r/14-pm-purple-laterald.jpg";
import iphone14PMRImgLaterale from "../assets/new-images/semi/14-pm-r/14-pm-purple-laterale.jpg";
import iphone14PMRImgBaixo from "../assets/new-images/semi/14-pm-r/14-pm-purple-baixo.jpg";
import iphone14PMRImgCima from "../assets/new-images/semi/14-pm-r/14-pm-purple-laterale.jpg";

const IphonesSeminovos: React.FC = () => {
  // Número de WhatsApp
  const whatsappNumber = "5534999252590";

  // Dados dos produtos extraídos da tabela de preços
  const products = [
    {
      id: 1,
      model: "iPhone 16",
      storage: "128GB",
      color: "Branco",
      battery: "98%",
      originalPrice: "R$ 4.790,00",
      installmentPrice: "R$ 398,14",
      pixPrice: "R$ 4.190",
      details:
        "sem detalhes | acompanha caixa e capinha | Garantia Apple até 04/2026",
      image: iphone16BTraseira,
      realImages: [
        iphone16ImgFrente,
        iphone16ImgLaterald,
        iphone16ImgLaterale,
        iphone16ImgBaixo,
        iphone16ImgCima,
      ],
      category: "iPhones Seminovos",
      specs:
        'O iPhone 16 (2024) traz o processador A18 (3nm), 8 GB de RAM para Apple Intelligence, e câmeras de 48 MP, apresentando o novo "Controle da Câmera", botão de Ação e tela Super Retina XDR OLED de 6,1 polegadas. Possui bateria de 3561 mAh, conector USB-C, Wi-Fi 7 e estrutura em alumínio com Ceramic Shield.',
    },
    {
      id: 2,
      model: "iPhone 16",
      storage: "128GB",
      color: "Verde",
      battery: "90%",
      originalPrice: "R$ 4.690,00",
      installmentPrice: "R$ 379,14",
      pixPrice: "R$ 3.990",
      details: "sem detalhes | acompanha capinha | Garantia Apple até 04/2026",
      image: iphone16VTraseira,
      realImages: [
        iphone16VImgFrente,
        iphone16VImgLaterald,
        iphone16VImgLaterale,
        iphone16VImgBaixo,
        iphone16VImgCima,
      ],
      category: "iPhones Seminovos",
      specs:
        'O iPhone 16 (2024) traz o processador A18 (3nm), 8 GB de RAM para Apple Intelligence, e câmeras de 48 MP, apresentando o novo "Controle da Câmera", botão de Ação e tela Super Retina XDR OLED de 6,1 polegadas. Possui bateria de 3561 mAh, conector USB-C, Wi-Fi 7 e estrutura em alumínio com Ceramic Shield.',
    },
    {
      id: 3,
      model: "iPhone 15 Pro Max",
      storage: "256GB",
      color: "Titânio Preto",
      battery: "87%",
      originalPrice: "R$ 4.990,00",
      installmentPrice: "R$ 426,65",
      pixPrice: "R$ 4.490",
      details: "sem detalhes | acompanha caixa",
      image: iphone15PMPTraseira,
      realImages: [
        iphone15PMPImgFrente,
        iphone15PMPImgLaterald,
        iphone15PMPImgLaterale,
        iphone15PMPImgBaixo,
        iphone15PMPImgCima,
      ],
      category: "iPhones Seminovos",
      specs:
        'O iPhone 15 Pro Max é o topo de linha da Apple de 2023, destacando-se pela estrutura em titânio, processador A17 Pro de 3nm e câmera telefoto de 5x. Possui tela OLED de 6,7" (120Hz), 8GB de RAM, USB-C 3.0 e sistema de câmera tripla de 48MP, oferecendo alto desempenho e grande autonomia de bateria.',
    },
    {
      id: 4,
      model: "iPhone 14 Pro Max",
      storage: "128GB",
      color: "Roxo",
      battery: "83%",
      originalPrice: "R$ 3.890,00",
      installmentPrice: "R$ 341,13",
      pixPrice: "R$ 3.590",
      details: "sem detalhes de uso | acompanha capinha",
      image: iphone14PMRTraseira,
      realImages: [
        iphone14PMRImgFrente,
        iphone14PMRImgLaterald,
        iphone14PMRImgLaterale,
        iphone14PMRImgBaixo,
        iphone14PMRImgCima,
      ],
      category: "iPhones Seminovos",
      specs:
        "O iPhone 14 Pro Max possui uma tela de 6,7 polegadas Super Retina XDR OLED com ProMotion (120Hz) e Dynamic Island. É equipado com o chip A16 Bionic, 6 GB de RAM e câmera principal de 48 MP. Oferece armazenamento até 1 TB, resistência à água IP68, 5G e bateria com duração superior a um dia.",
    },
  ];

  // Estado para controlar a forma de pagamento selecionada para cada produto
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<{
    [key: number]: "pix" | "card";
  }>({});

  // Estado para controlar a visualização ampliada de imagens
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Bloqueia scroll do body quando modal está aberto
  useEffect(() => {
    if (enlargedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [enlargedImage]);

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
      "_blank",
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
                  className="bg-gray-900 rounded-lg overflow-hidden cursor-pointer transform transition-transform md:hover:scale-105 active:scale-95"
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
              )),
            )}
          </div>
        </div>

        {/* Modal renderizado via Portal - FORA da árvore DOM do componente */}
        {enlargedImage &&
          createPortal(
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.95)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 99999,
                padding: "16px",
                touchAction: "none",
                WebkitOverflowScrolling: "touch",
              }}
              onClick={() => setEnlargedImage(null)}
            >
              <button
                style={{
                  position: "absolute",
                  top: "16px",
                  right: "16px",
                  backgroundColor: "#ff6100",
                  border: "none",
                  borderRadius: "50%",
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 100000,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setEnlargedImage(null);
                }}
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
              <img
                src={enlargedImage}
                alt="Imagem ampliada do produto"
                onClick={(e) => e.stopPropagation()}
                style={{
                  maxWidth: "100%",
                  maxHeight: "85vh",
                  objectFit: "contain",
                  borderRadius: "8px",
                }}
              />
            </div>,
            document.body,
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
