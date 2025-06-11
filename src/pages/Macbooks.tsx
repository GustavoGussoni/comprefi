import React, { useState } from "react";
// import ImageLoader from "../components/ImageLoader";
import FAQ from "../components/FAQ";

// Imagem da tabela de preços
// import macbooksPriceTable from "../assets/images/MacBook.png";
// import macM4PriceTable from "../assets/images/Mac M4.png";
import { Link } from "react-router-dom";

const Macbooks: React.FC = () => {
  // Número de WhatsApp
  const whatsappNumber = "5534999252590";

  // Dados dos produtos extraídos da tabela de preços - Linha M4
  const m4Products = [
    {
      id: 26,
      model: 'MacBook Pro 16" M4 Max',
      storage: "(48GB RAM / 1TB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 37.014,06",
      installmentPrice: "12x R$ 3.151,00",
      pixPrice: "R$ 32.712,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 16.2", Chip M4 Max (14/16-core CPU, 32/40-core GPU), 3x Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 27,
      model: 'MacBook Pro 16" M4 Max',
      storage: "(36GB RAM / 1TB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 35.063,34",
      installmentPrice: "12x R$ 2.823,00",
      pixPrice: "R$ 29.303,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 16.2", Chip M4 Max (14/16-core CPU, 32/40-core GPU), 3x Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 28,
      model: 'MacBook Pro 14" M4 Max',
      storage: "(36GB RAM / 1TB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 377,44",
      installmentPrice: "12x R$ 031,00",
      pixPrice: "R$ 326,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 14.2", Chip M4 Max (14/16-core CPU, 32/40-core GPU), 3x Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 29,
      model: 'MacBook Pro 16" M4 Pro',
      storage: "(48GB RAM / 512GB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 363,27",
      installmentPrice: "12x R$ 031,00",
      pixPrice: "R$ 326,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 16.2", Chip M4 Pro (14-core CPU, 20-core GPU), 3x Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 30,
      model: 'MacBook Pro 16" M4 Pro',
      storage: "(24GB RAM / 512GB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 23.928,42",
      installmentPrice: "12x R$ 1.985,00",
      pixPrice: "R$ 20.610,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 16.2", Chip M4 Pro (14-core CPU, 20-core GPU), 3x Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 31,
      model: 'MacBook Pro 14" M4',
      storage: "(24GB RAM / 1TB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 22.252,98",
      installmentPrice: "12x R$ 1.832,00",
      pixPrice: "R$ 19.019,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 14.2", Chip M4 (10-core CPU, 10-core GPU), 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 32,
      model: 'MacBook Pro 14" M4 Pro',
      storage: "(24GB RAM / 512GB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 18.840,71",
      installmentPrice: "12x R$ 1.602,00",
      pixPrice: "R$ 16.632,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 14.2", Chip M4 Pro (12/14-core CPU, 16/20-core GPU), 3x Thunderbolt 5, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 33,
      model: 'MacBook Pro 14" M4',
      storage: "(16GB RAM / 1TB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 16.336,43",
      installmentPrice: "12x R$ 1.394,00",
      pixPrice: "R$ 14.473,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 14.2", Chip M4 (10-core CPU, 10-core GPU), 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 34,
      model: 'MacBook Air 15"M4',
      storage: "(16GB RAM / 512GB SSD)",
      color: 'Cor para "MacBook Air 15"M4" não encontrada',
      battery: "100%",
      originalPrice: "R$ 14.640,16",
      installmentPrice: "12x R$ 1.181,00",
      pixPrice: "R$ 12.257,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs: 'Especificações para "MacBook Air 15"M4" não encontradas',
    },
    {
      id: 35,
      model: 'MacBook Air 13"M4',
      storage: "(24GB RAM / 512GB SSD)",
      color: 'Cor para "MacBook Air 13"M4" não encontrada',
      battery: "100%",
      originalPrice: "R$ 14.660,78",
      installmentPrice: "12x R$ 1.181,00",
      pixPrice: "R$ 12.257,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs: 'Especificações para "MacBook Air 13"M4" não encontradas',
    },
    {
      id: 36,
      model: 'MacBook Pro 14" M4',
      storage: "(16GB RAM / 512GB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 14.199,56",
      installmentPrice: "12x R$ 1.230,00",
      pixPrice: "R$ 12.769,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 14.2", Chip M4 (10-core CPU, 10-core GPU), 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 38,
      model: 'MacBook Air 13"M4',
      storage: "(16GB RAM / 512GB SSD)",
      color: 'Cor para "MacBook Air 13"M4" não encontrada',
      battery: "100%",
      originalPrice: "R$ 11.230,47",
      installmentPrice: "12x R$ 983,00",
      pixPrice: "R$ 10.201,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs: 'Especificações para "MacBook Air 13"M4" não encontradas',
    },
    {
      id: 39,
      model: 'MacBook Air 15"M4',
      storage: "(16GB RAM / 256GB SSD)",
      color: 'Cor para "MacBook Air 15"M4" não encontrada',
      battery: "100%",
      originalPrice: "R$ 12.397,87",
      installmentPrice: "12x R$ 1.027,00",
      pixPrice: "R$ 10.666,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs: 'Especificações para "MacBook Air 15"M4" não encontradas',
    },
    {
      id: 40,
      model: 'MacBook Air 13"M4',
      storage: "(16GB RAM / 256GB SSD)",
      color: 'Cor para "MacBook Air 13"M4" não encontrada',
      battery: "100%",
      originalPrice: "R$ 9.289,76",
      installmentPrice: "12x R$ 797,00",
      pixPrice: "R$ 8.269,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs: 'Especificações para "MacBook Air 13"M4" não encontradas',
    },
    {
      id: 37,
      model: "iMac M4 24",
      storage: "(16GB RAM / 256GB SSD)",
      color: 'Cor para "iMac M4 24" não encontrada',
      battery: "100%",
      originalPrice: "R$ 14.810,83",
      installmentPrice: "12x R$ 1.246,00",
      pixPrice: "R$ 12.939,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Imacs",
      specs: 'Especificações para "iMac M4 24" não encontradas',
    },
    {
      id: 41,
      model: "Mac Mini M4",
      storage: "(16GB RAM / 512GB SSD)",
      color: "Prateado",
      battery: "100%",
      originalPrice: "R$ 9.250,49",
      installmentPrice: "12x R$ 781,00",
      pixPrice: "R$ 8.110,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Mac Minis",
      specs:
        "Chip M4 (10-core CPU, 10-core GPU), 2x USB-C (frente), 3x Thunderbolt 4 (trás), HDMI, Gigabit Ethernet, Wi-Fi 6E",
    },
    {
      id: 42,
      model: "Mac Mini M4",
      storage: "(16GB RAM / 256GB SSD)",
      color: "Prateado",
      battery: "100%",
      originalPrice: "R$ 7.318,77",
      installmentPrice: "12x R$ 606,00",
      pixPrice: "R$ 6.291,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Mac Minis",
      specs:
        "Chip M4 (10-core CPU, 10-core GPU), 2x USB-C (frente), 3x Thunderbolt 4 (trás), HDMI, Gigabit Ethernet, Wi-Fi 6E",
    },
  ];

  // Dados dos produtos extraídos da tabela de preços - Linha M3 e anteriores
  const olderProducts = [
    {
      id: 43,
      model: 'MacBook Pro 16" M3 Max',
      storage: "(48GB RAM / 1TB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 31.287,85",
      installmentPrice: "12x R$ 2.713,00",
      pixPrice: "R$ 28.166,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 16.2", Chip M3 Max (14/16-core CPU, 30/40-core GPU), 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 44,
      model: 'MacBook Pro 14" M3 Pro',
      storage: "(18GB RAM / 512GB SSD)",
      color: "Prata, Preto-espacial",
      battery: "100%",
      originalPrice: "R$ 16.323,30",
      installmentPrice: "12x R$ 1.329,00",
      pixPrice: "R$ 13.791,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 14.2", Chip M3 Pro (11/12-core CPU, 14/18-core GPU), 3x Thunderbolt 4, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 45,
      model: 'MacBook Pro 14" M3',
      storage: "(8GB RAM / 512GB SSD)",
      color: "Prata, Cinza-espacial",
      battery: "100%",
      originalPrice: "R$ 12.218,92",
      installmentPrice: "12x R$ 1.027,00",
      pixPrice: "R$ 10.666,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina XDR 14.2", Chip M3 (8-core CPU, 10-core GPU), 2x Thunderbolt / USB 4, HDMI, SDXC, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 46,
      model: 'MacBook Air 15" M3',
      storage: "(8GB RAM / 512GB SSD)",
      color: "Prateado, Estelar, Cinza-espacial, Meia-noite",
      battery: "100%",
      originalPrice: "R$ 12.044,58",
      installmentPrice: "12x R$ 995,00",
      pixPrice: "R$ 10.326,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina 15.3", Chip M3 (8-core CPU, 10-core GPU), 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 47,
      model: 'MacBook Air 13" M3',
      storage: "(16GB RAM / 512GB SSD)",
      color: "Prateado, Estelar, Cinza-espacial, Meia-noite",
      battery: "100%",
      originalPrice: "R$ 11.006,85",
      installmentPrice: "12x R$ 929,00",
      pixPrice: "R$ 9.644,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina 13.6", Chip M3 (8-core CPU, 8/10-core GPU), 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 48,
      model: 'MacBook Air 15" M3',
      storage: "(16GB RAM / 256GB SSD)",
      color: "Prateado, Estelar, Cinza-espacial, Meia-noite",
      battery: "100%",
      originalPrice: "R$ 10.836,69",
      installmentPrice: "12x R$ 929,00",
      pixPrice: "R$ 9.644,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina 15.3", Chip M3 (8-core CPU, 10-core GPU), 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 49,
      model: 'MacBook Air 13" M3',
      storage: "(16GB RAM / 256GB SSD)",
      color: "Prateado, Estelar, Cinza-espacial, Meia-noite",
      battery: "100%",
      originalPrice: "R$ 9.188,53",
      installmentPrice: "12x R$ 759,00",
      pixPrice: "R$ 7.882,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina 13.6", Chip M3 (8-core CPU, 8/10-core GPU), 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 50,
      model: 'MacBook Air 13" M2',
      storage: "(8GB RAM / 512GB SSD)",
      color: "Prateado, Estelar, Cinza-espacial, Meia-noite",
      battery: "100%",
      originalPrice: "R$ 8.765,32",
      installmentPrice: "12x R$ 743,00",
      pixPrice: "R$ 7.712,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina 13.6", Chip M2 (8-core CPU, 8/10-core GPU), 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6',
    },
    {
      id: 51,
      model: 'MacBook Air 13" M3',
      storage: "(8GB RAM / 256GB SSD)",
      color: "Prateado, Estelar, Cinza-espacial, Meia-noite",
      battery: "100%",
      originalPrice: "R$ 8.946,02",
      installmentPrice: "12x R$ 743,00",
      pixPrice: "R$ 7.712,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina 13.6", Chip M3 (8-core CPU, 8/10-core GPU), 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6E',
    },
    {
      id: 52,
      model: 'MacBook Air 13" M2',
      storage: "(16GB RAM / 256GB SSD)",
      color: "Prateado, Estelar, Cinza-espacial, Meia-noite",
      battery: "100%",
      originalPrice: "R$ 8.406,42",
      installmentPrice: "12x R$ 683,00",
      pixPrice: "R$ 7.087,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina 13.6", Chip M2 (8-core CPU, 8/10-core GPU), 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6',
    },
    {
      id: 53,
      model: 'MacBook Air 13" M2',
      storage: "(8GB RAM / 256GB SSD)",
      color: "Prateado, Estelar, Cinza-espacial, Meia-noite",
      battery: "100%",
      originalPrice: "R$ 8.195,76",
      installmentPrice: "12x R$ 661,00",
      pixPrice: "R$ 6.860,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Liquid Retina 13.6", Chip M2 (8-core CPU, 8/10-core GPU), 2x Thunderbolt / USB 4, MagSafe 3, Wi-Fi 6',
    },
    {
      id: 54,
      model: "MacBook Air M1",
      storage: "(8GB RAM / 256GB SSD)",
      color: "Dourado, Prateado, Cinza-espacial",
      battery: "100%",
      originalPrice: "R$ 6.306,84",
      installmentPrice: "12x R$ 522,00",
      pixPrice: "R$ 5.416,00",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Macbooks",
      specs:
        'Tela Retina 13.3", Chip M1 (8-core CPU, 7/8-core GPU), 2x Thunderbolt / USB 4, Wi-Fi 6',
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
    const message = `Quero comprar o ${product.model} ${product.specs} por ${price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="macbooks-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
          MacBooks
        </h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          Lacrados | 1 ano de garantia Apple
        </p>

        {/* Seção Linha M4 */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-2">
            Linha M4
          </h2>

          {/* Tabela de preços original como referência */}
          {/* <div className="mb-8 flex justify-center">
            <ImageLoader
              src={macM4PriceTable}
              alt="Tabela de preços MacBooks M4"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div> */}

          {/* Lista de produtos M4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {m4Products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#ff6100] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6100]/10 cursor-pointer"
              >
                <div className="p-6">
                  <Link
                    to={`/produto/${product.category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${product.id}`}
                    className="block mb-3"
                  >
                    <h3 className="text-xl font-bold mb-1 text-white">
                      {product.model}
                    </h3>
                    <p className="text-gray-400 mb-4">{product.specs}</p>

                    <div className="flex flex-col">
                      <div className="text-lg font-bold text-white mb-1">
                        12x {product.installmentPrice}
                      </div>
                      <div className="text-[#ff6100] font-medium">
                        ou {product.pixPrice} no PIX
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-gray-300 text-sm">
                        Lacrado | 1 ano de garantia
                      </span>
                      <div className="bg-[#ff6100]/20 px-2 py-1 rounded text-xs text-[#ff6100]">
                        M4
                      </div>
                    </div>
                  </Link>
                  {/* Seleção de forma de pagamento */}
                  <div className="mt-4 flex space-x-2">
                    <button
                      className={`flex-1 py-2 rounded-md transition-colors ${
                        selectedPaymentMethods[product.id] === "pix"
                          ? "bg-[#ff610040] text-white"
                          : "bg-gray-800 text-gray-300"
                      }`}
                      onClick={() => selectPaymentMethod(product.id, "pix")}
                    >
                      PIX
                    </button>
                    <button
                      className={`flex-1 py-2 rounded-md transition-colors ${
                        selectedPaymentMethods[product.id] === "card"
                          ? "bg-[#ff610040] text-white"
                          : "bg-gray-800 text-gray-300"
                      }`}
                      onClick={() => selectPaymentMethod(product.id, "card")}
                    >
                      Cartão
                    </button>
                  </div>

                  <button
                    className="mt-4 w-full bg-[#ff6100] hover:bg-[#e55a00] text-white py-2 rounded-md transition-colors flex items-center justify-center"
                    onClick={() => redirectToWhatsApp(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Comprar agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção Linha M3 e anteriores */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-800 pb-2">
            Linha M3 e anteriores
          </h2>

          {/* Tabela de preços original como referência */}
          {/* <div className="mb-8 flex justify-center">
            <ImageLoader
              src={macbooksPriceTable}
              alt="Tabela de preços MacBooks M3 e anteriores"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div> */}

          {/* Lista de produtos M3 e anteriores */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {olderProducts.map((product) => (
              <div
                key={product.id}
                className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#ff6100] transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6100]/10 cursor-pointer"
              >
                <div className="p-6">
                  <Link
                    to={`/produto/${product.category
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${product.id}`}
                    className="block mb-3"
                  >
                    <h3 className="text-xl font-bold mb-1 text-white">
                      {product.model}
                    </h3>
                    <p className="text-gray-400 mb-4">{product.specs}</p>

                    <div className="flex flex-col">
                      <div className="text-lg font-bold text-white mb-1">
                        12x {product.installmentPrice}
                      </div>
                      <div className="text-[#ff6100] font-medium">
                        ou {product.pixPrice} no PIX
                      </div>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                      <span className="text-gray-300 text-sm">
                        Lacrado | 1 ano de garantia
                      </span>
                      <div className="bg-gray-800 px-2 py-1 rounded text-xs text-white">
                        {product.model.includes("M3")
                          ? "M3"
                          : product.model.includes("M2")
                          ? "M2"
                          : "M1"}
                      </div>
                    </div>
                  </Link>
                  {/* Seleção de forma de pagamento */}
                  <div className="mt-4 flex space-x-2">
                    <button
                      className={`flex-1 py-2 rounded-md transition-colors ${
                        selectedPaymentMethods[product.id] === "pix"
                          ? "bg-[#ff610040] text-white"
                          : "bg-gray-800 text-gray-300"
                      }`}
                      onClick={() => selectPaymentMethod(product.id, "pix")}
                    >
                      PIX
                    </button>
                    <button
                      className={`flex-1 py-2 rounded-md transition-colors ${
                        selectedPaymentMethods[product.id] === "card"
                          ? "bg-[#ff610040] text-white"
                          : "bg-gray-800 text-gray-300"
                      }`}
                      onClick={() => selectPaymentMethod(product.id, "card")}
                    >
                      Cartão
                    </button>
                  </div>

                  <button
                    className="mt-4 w-full bg-[#ff6100] hover:bg-[#e55a00] text-white py-2 rounded-md transition-colors flex items-center justify-center"
                    onClick={() => redirectToWhatsApp(product)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    Comprar agora
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Informações adicionais */}
        <div className="mt-16 bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Por que comprar MacBooks na CompreFi?
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
              <span>Produtos lacrados com 1 ano de garantia oficial Apple</span>
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
                Economia de até R$20.000 em comparação com lojas oficiais
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
        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default Macbooks;
