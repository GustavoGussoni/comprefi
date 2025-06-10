import React, { useState } from "react";
// import ImageLoader from "../components/ImageLoader";
import FAQ from "../components/FAQ";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";
import ProductCard from "../components/ProductCard";

// Imagem da tabela de preços
// import iphonesPriceTable from "../assets/images/iPhones Novos.png";

const IphonesNovos: React.FC = () => {
  // Número de WhatsApp
  const whatsappNumber = "+5534999252590";

  // Dados dos produtos extraídos da tabela de preços
  const products = [
    {
      id: 6,
      model: "iPhone 16 Pro Max",
      storage: "(1TB)",
      color:
        "Titânio Preto, Titânio Cinza/Natural, Titânio Branco, Titânio Deserto",
      battery: "100%",
      originalPrice: "R$ 14445.35",
      installmentPrice: "R$ 1160",
      pixPrice: "R$ 12.039",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela ~6.9", Chip A18 Pro, Câmera Ultra Wide 48MP, Zoom Óptico 5x, Wi-Fi 7, Botão de Captura, Bateria ~4676 mAh (Rumor)',
    },
    {
      id: 7,
      model: "iPhone 16 Pro",
      storage: "(1TB)",
      color:
        "Titânio Preto, Titânio Cinza/Natural, Titânio Branco, Titânio Deserto",
      battery: "100%",
      originalPrice: "R$ 13015.93",
      installmentPrice: "R$ 1061",
      pixPrice: "R$ 11.017",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela ~6.3", Chip A18 Pro, Câmera Ultra Wide 48MP, Zoom Óptico 5x, Wi-Fi 7, Botão de Captura, Bateria ~3355 mAh (Rumor)',
    },
    {
      id: 8,
      model: "iPhone 16 Pro Max",
      storage: "(512GB)",
      color:
        "Titânio Preto, Titânio Cinza/Natural, Titânio Branco, Titânio Deserto",
      battery: "100%",
      originalPrice: "R$ 12374.76",
      installmentPrice: "R$ 1023",
      pixPrice: "R$ 10.619",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela ~6.9", Chip A18 Pro, Câmera Ultra Wide 48MP, Zoom Óptico 5x, Wi-Fi 7, Botão de Captura, Bateria ~4676 mAh (Rumor)',
    },
    {
      id: 9,
      model: "iPhone 16 Pro",
      storage: "(512GB)",
      color:
        "Titânio Preto, Titânio Cinza/Natural, Titânio Branco, Titânio Deserto",
      battery: "100%",
      originalPrice: "R$ 10692.95",
      installmentPrice: "R$ 881",
      pixPrice: "R$ 9.142",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela ~6.3", Chip A18 Pro, Câmera Ultra Wide 48MP, Zoom Óptico 5x, Wi-Fi 7, Botão de Captura, Bateria ~3355 mAh (Rumor)',
    },
    {
      id: 10,
      model: "iPhone 15 Pro Max",
      storage: "(512GB)",
      color: "Titânio Preto, Titânio Branco, Titânio Azul, Titânio Natural",
      battery: "100%",
      originalPrice: "R$ 9527.68",
      installmentPrice: "R$ 826",
      pixPrice: "R$ 8.573",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela Super Retina XDR 6.7", Chip A17 Pro, Câmera Tripla 48MP, USB-C (USB 3), Titânio, Botão de Ação',
    },
    {
      id: 11,
      model: "iPhone 16 Pro Max",
      storage: "(256GB)",
      color:
        "Titânio Preto, Titânio Cinza/Natural, Titânio Branco, Titânio Deserto",
      battery: "100%",
      originalPrice: "R$ 9386.00",
      installmentPrice: "R$ 765",
      pixPrice: "R$ 7.937",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela ~6.9", Chip A18 Pro, Câmera Ultra Wide 48MP, Zoom Óptico 5x, Wi-Fi 7, Botão de Captura, Bateria ~4676 mAh (Rumor)',
    },
    {
      id: 12,
      model: "iPhone 16 Pro",
      storage: "(256GB)",
      color:
        "Titânio Preto, Titânio Cinza/Natural, Titânio Branco, Titânio Deserto",
      battery: "100%",
      originalPrice: "R$ 8415.00",
      installmentPrice: "R$ 710",
      pixPrice: "R$ 7.369",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela ~6.3", Chip A18 Pro, Câmera Ultra Wide 48MP, Zoom Óptico 5x, Wi-Fi 7, Botão de Captura, Bateria ~3355 mAh (Rumor)',
    },
    {
      id: 13,
      model: "iPhone 16 Plus",
      storage: "(256GB)",
      color: "Preto, Branco, Rosa, Teal, Ultramarino",
      battery: "100%",
      originalPrice: "R$ 8206.89",
      installmentPrice: "R$ 705",
      pixPrice: "R$ 7.323",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela 6.7", Chip A18, Câmera 48MP Fusion, Botão de Ação, Botão de Captura, USB-C (Rumor/Preliminar)',
    },
    {
      id: 14,
      model: "iPhone 16 Pro",
      storage: "(128GB)",
      color:
        "Titânio Preto, Titânio Cinza/Natural, Titânio Branco, Titânio Deserto",
      battery: "100%",
      originalPrice: "R$ 7580.61",
      installmentPrice: "R$ 644",
      pixPrice: "R$ 6.687",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela ~6.3", Chip A18 Pro, Câmera Ultra Wide 48MP, Zoom Óptico 5x, Wi-Fi 7, Botão de Captura, Bateria ~3355 mAh (Rumor)',
    },
    {
      id: 15,
      model: "iPhone 16 Plus",
      storage: "(128GB)",
      color: "Preto, Branco, Rosa, Teal, Ultramarino",
      battery: "100%",
      originalPrice: "R$ 7558.18",
      installmentPrice: "R$ 634",
      pixPrice: "R$ 6.585",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela 6.7", Chip A18, Câmera 48MP Fusion, Botão de Ação, Botão de Captura, USB-C (Rumor/Preliminar)',
    },
    {
      id: 16,
      model: "iPhone 16",
      storage: "(256GB)",
      color: "Preto, Branco, Rosa, Teal, Ultramarino",
      battery: "100%",
      originalPrice: "R$ 7295.39",
      installmentPrice: "R$ 618",
      pixPrice: "R$ 6.414",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela 6.1", Chip A18, Câmera 48MP Fusion, Botão de Ação, Botão de Captura, USB-C (Rumor/Preliminar)',
    },
    {
      id: 17,
      model: "iPhone 15",
      storage: "(256GB)",
      color: "Rosa, Amarelo, Verde, Azul, Preto",
      battery: "100%",
      originalPrice: "R$ 6994.64",
      installmentPrice: "R$ 563",
      pixPrice: "R$ 5.846",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela Super Retina XDR 6.1", Chip A16 Bionic, Câmera Dupla 48MP, Dynamic Island, USB-C (USB 2)',
    },
    {
      id: 18,
      model: "iPhone 16",
      storage: "(128GB)",
      color: "Preto, Branco, Rosa, Teal, Ultramarino",
      battery: "100%",
      originalPrice: "R$ 6417.93",
      installmentPrice: "R$ 519",
      pixPrice: "R$ 5.392",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela 6.1", Chip A18, Câmera 48MP Fusion, Botão de Ação, Botão de Captura, USB-C (Rumor/Preliminar)',
    },
    {
      id: 19,
      model: "iPhone 15",
      storage: "(128GB)",
      color: "Rosa, Amarelo, Verde, Azul, Preto",
      battery: "100%",
      originalPrice: "R$ 5436.39",
      installmentPrice: "R$ 468",
      pixPrice: "R$ 4.857",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela Super Retina XDR 6.1", Chip A16 Bionic, Câmera Dupla 48MP, Dynamic Island, USB-C (USB 2)',
    },
    {
      id: 20,
      model: "iPhone 16e",
      storage: "(128GB)",
      color: "Preto, Branco, Rosa, Teal, Ultramarino",
      battery: "100%",
      originalPrice: "R$ 4937.87",
      installmentPrice: "R$ 399",
      pixPrice: "R$ 4.142",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela 6.1", Chip A18, Câmera 48MP Fusion, Botão de Ação, Botão de Captura, USB-C (Rumor/Preliminar)',
    },
    {
      id: 21,
      model: "iPhone 14",
      storage: "(128GB)",
      color: "Meia-noite, Roxo, Estelar,RED, Azul, Amarelo",
      battery: "100%",
      originalPrice: "R$ 4716.15",
      installmentPrice: "R$ 410",
      pixPrice: "R$ 4.255",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela Super Retina XDR 6.1", Chip A15 Bionic (GPU 5-core), Câmera Dupla 12MP, Detecção de Acidente',
    },
    {
      id: 22,
      model: "iPhone 13",
      storage: "(128GB)",
      color: "RED, Estelar, Meia-noite, Azul, Rosa, Verde",
      battery: "100%",
      originalPrice: "R$ 4120.38",
      installmentPrice: "R$ 344",
      pixPrice: "R$ 3.573",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela Super Retina XDR 6.1", Chip A15 Bionic (GPU 4-core), Câmera Dupla 12MP, Modo Cinema',
    },
    {
      id: 23,
      model: "iPhone 11",
      storage: "(128GB)",
      color: "Preto, Verde, Amarelo, Roxo,RED, Branco",
      battery: "100%",
      originalPrice: "R$ 3546.81",
      installmentPrice: "R$ 297",
      pixPrice: "R$ 3.085",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela Liquid Retina HD LCD 6.1", Chip A13 Bionic, Câmera Dupla 12MP, Modo Noite',
    },
    {
      id: 24,
      model: "iPhone 12",
      storage: "(64GB)",
      color: "Preto, Branco,RED, Verde, Azul, Roxo",
      battery: "100%",
      originalPrice: "R$ 3551.58",
      installmentPrice: "R$ 289",
      pixPrice: "R$ 3.005",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela Super Retina XDR OLED 6.1", Chip A14 Bionic, Câmera Dupla 12MP, 5G, Ceramic Shield',
    },
    {
      id: 25,
      model: "iPhone 11",
      storage: "(64GB)",
      color: "Preto, Verde, Amarelo, Roxo,RED, Branco",
      battery: "100%",
      originalPrice: "R$ 2921.77",
      installmentPrice: "R$ 249",
      pixPrice: "R$ 2.585",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "iPhones Novos",
      specs:
        'Tela Liquid Retina HD LCD 6.1", Chip A13 Bionic, Câmera Dupla 12MP, Modo Noite',
    },
  ];

  // Estado para controlar a forma de pagamento selecionada para cada produto
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<{
    [key: number]: "pix" | "card";
  }>({});

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
    const message = `Quero comprar o ${product.model} ${product.storage} por ${price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="iphones-novos-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
          iPhones Novos
        </h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          Lacrados | 1 ano de garantia Apple
        </p>

        {/* Tabela de preços original como referência */}
        {/* <div className="mb-12 flex justify-center">
          <ImageLoader
            src={iphonesPriceTable}
            alt="Tabela de preços iPhones Novos"
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div> */}

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

        {/* Por que escolher a CompreFi */}
        <div className="mt-16">
          <WhyChooseCompreFi category="iPhones Novos" />
        </div>

        {/* FAQ - Seção separada */}
        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default IphonesNovos;
