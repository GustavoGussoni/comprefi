import React, { useState } from "react";
// import ImageLoader from "../components/ImageLoader";
import FAQ from "../components/FAQ";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";
import ProductCard from "../components/ProductCard";

// Imagem da tabela de preços

import iphone17PMLTraseira from "../assets/new-images/iphones-novos/17-pm-l/iphone-17-pro-finish-select-202509-6-9inch-cosmicorange.webp";
import iphone17PMATraseira from "../assets/new-images/iphones-novos/17-pm-a/17-pm-azul-traseira.png";
import iphone17PMPTraseira from "../assets/new-images/iphones-novos/17-pm-p/17-pm-prata-traseira.png";

// 17 pro max laranja

import iphone17PML1 from "../assets/new-images/iphones-novos/17-pm-l/iphone-17-pro-finish-select-202509-6-9inch-cosmicorange_AV1.webp";
import iphone17PML3 from "../assets/new-images/iphones-novos/17-pm-l/iphone-17-pro-finish-select-202509-6-9inch-cosmicorange_AV3.webp";

// 17 pro max Azul
import iphone17PMA2 from "../assets/new-images/iphones-novos/17-pm-a/17-pm-azul-2.png";
import iphone17PMA3 from "../assets/new-images/iphones-novos/17-pm-a/17-pm-azul-3.png";

// 17 pro max Prata
import iphone17PMP2 from "../assets/new-images/iphones-novos/17-pm-p/17-pm-prata-2.png";
import iphone17PMP3 from "../assets/new-images/iphones-novos/17-pm-p/17-pm-prata-3.png";
// import iphonesPriceTable from "../assets/images/iPhones Novos.png";

const IphonesNovos: React.FC = () => {
  // Número de WhatsApp
  const whatsappNumber = "+5534999252590";

  // Dados dos produtos extraídos da tabela de preços
  const products = [
    {
      id: 6,
      model: "iPhone 17 Pro Max",
      storage: "(1TB)",
      color: "Laranja",
      battery: "100%",
      originalPrice: "R$ 13.150,00",
      installmentPrice: "R$ 1.151,02",
      pixPrice: "R$ 12.110",
      details: "aparelho novo",
      image: iphone17PMLTraseira,
      realImages: [iphone17PML1, iphone17PML3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro Max (lançado em setembro de 2025) destaca-se pela tela de 6,9 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 5.088 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 7,
      model: "iPhone 17 Pro Max",
      storage: "(512GB)",
      color: "Azul | Prata",
      battery: "100%",
      originalPrice: "R$ 11.464,00",
      installmentPrice: "R$ 1.006,43",
      pixPrice: "R$ 10.592",
      details: "aparelho novo",
      image: iphone17PMATraseira,
      realImages: [
        iphone17PMA2,
        iphone17PMA3,
        iphone17PMPTraseira,
        iphone17PMP2,
        iphone17PMP3,
      ],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro Max (lançado em setembro de 2025) destaca-se pela tela de 6,9 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 5.088 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 8,
      model: "iPhone 17 Pro Max",
      storage: "(512GB)",
      color: "Laranja",
      battery: "100%",
      originalPrice: "R$ 10.877,00",
      installmentPrice: "R$ 954,89",
      pixPrice: "R$ 10.049",
      details: "aparelho novo",
      image: iphone17PMLTraseira,
      realImages: [iphone17PML1, iphone17PML3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro Max (lançado em setembro de 2025) destaca-se pela tela de 6,9 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 5.088 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 9,
      model: "iPhone 17 Pro Max",
      storage: "(256GB)",
      color: "Prata",
      battery: "100%",
      originalPrice: "R$ 9.877,00",
      installmentPrice: "R$ 867,10",
      pixPrice: "R$ 9.125",
      details: "aparelho novo",
      image: iphone17PMPTraseira,
      realImages: [iphone17PMP2, iphone17PMP3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro Max (lançado em setembro de 2025) destaca-se pela tela de 6,9 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 5.088 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 10,
      model: "iPhone 17 Pro Max",
      storage: "(256GB)",
      color: "Azul",
      battery: "100%",
      originalPrice: "R$ 9.589,00",
      installmentPrice: "R$ 841,17",
      pixPrice: "R$ 8.853",
      details: "aparelho novo",
      image: iphone17PMATraseira,
      realImages: [iphone17PMA2, iphone17PMA3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro Max (lançado em setembro de 2025) destaca-se pela tela de 6,9 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 5.088 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 11,
      model: "iPhone 17 Pro Max",
      storage: "(256GB)",
      color: "Laranja",
      battery: "100%",
      originalPrice: "R$ 9.400,00",
      installmentPrice: "R$ 825,78",
      pixPrice: "R$ 8.691",
      details: "aparelho novo",
      image: iphone17PMLTraseira,
      realImages: [iphone17PML1, iphone17PML3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro Max (lançado em setembro de 2025) destaca-se pela tela de 6,9 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 5.088 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 12,
      model: "iPhone 17 Pro",
      storage: "(1TB)",
      color: "Prata | Laranja",
      battery: "100%",
      originalPrice: "R$ 11.650,00",
      installmentPrice: "R$ 1.022,02",
      pixPrice: "R$ 10.754",
      details: "aparelho novo",
      image: iphone17PMPTraseira,
      realImages: [
        iphone17PMP2,
        iphone17PMP3,
        iphone17PMLTraseira,
        iphone17PML1,
        iphone17PML3,
      ],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro (lançado em setembro de 2025) destaca-se pela tela de 6,3 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 4.252 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 13,
      model: "iPhone 17 Pro",
      storage: "(512GB)",
      color: "Azul",
      battery: "100%",
      originalPrice: "R$ 10.550,00",
      installmentPrice: "R$ 923,80",
      pixPrice: "R$ 9.721",
      details: "aparelho novo",
      image: iphone17PMATraseira,
      realImages: [iphone17PMA2, iphone17PMA3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro (lançado em setembro de 2025) destaca-se pela tela de 6,3 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 4.252 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 14,
      model: "iPhone 17 Pro",
      storage: "(512GB)",
      color: "Prata",
      battery: "100%",
      originalPrice: "R$ 10.470,00",
      installmentPrice: "R$ 918,74",
      pixPrice: "R$ 9.665",
      details: "aparelho novo",
      image: iphone17PMPTraseira,
      realImages: [iphone17PMP2, iphone17PMP3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro (lançado em setembro de 2025) destaca-se pela tela de 6,3 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 4.252 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 15,
      model: "iPhone 17 Pro",
      storage: "(512GB)",
      color: "Laranja",
      battery: "100%",
      originalPrice: "R$ 10.350,00",
      installmentPrice: "R$ 908,41",
      pixPrice: "R$ 9.560",
      details: "aparelho novo",
      image: iphone17PMLTraseira,
      realImages: [iphone17PML1, iphone17PML3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro (lançado em setembro de 2025) destaca-se pela tela de 6,3 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 4.252 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 16,
      model: "iPhone 17 Pro",
      storage: "(256GB)",
      color: "Azul",
      battery: "100%",
      originalPrice: "R$ 9.289,00",
      installmentPrice: "R$ 815,45",
      pixPrice: "R$ 8.582",
      details: "aparelho novo",
      image: iphone17PMATraseira,
      realImages: [iphone17PMA2, iphone17PMA3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro (lançado em setembro de 2025) destaca-se pela tela de 6,3 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 4.252 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 17,
      model: "iPhone 17 Pro",
      storage: "(256GB)",
      color: "Prata",
      battery: "100%",
      originalPrice: "R$ 9.229,00",
      installmentPrice: "R$ 810,19",
      pixPrice: "R$ 8.526",
      details: "aparelho novo",
      image: iphone17PMPTraseira,
      realImages: [iphone17PMP2, iphone17PMP3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro (lançado em setembro de 2025) destaca-se pela tela de 6,3 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 4.252 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
    },
    {
      id: 18,
      model: "iPhone 17 Pro",
      storage: "(256GB)",
      color: "Laranja",
      battery: "100%",
      originalPrice: "R$ 8.993,00",
      installmentPrice: "R$ 789,53",
      pixPrice: "R$ 8.309",
      details: "aparelho novo",
      image: iphone17PMLTraseira,
      realImages: [iphone17PML1, iphone17PML3],
      category: "iPhones Novos",
      specs:
        "O iPhone 17 Pro (lançado em setembro de 2025) destaca-se pela tela de 6,3 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 4.252 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.",
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
      "_blank",
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
