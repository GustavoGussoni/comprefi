import React, { useState } from "react";
// import ImageLoader from "../components/ImageLoader";
import FAQ from "../components/FAQ";
import { Link } from "react-router-dom";

// Imagem da tabela de preços
// import acessoriosPriceTable from "../assets/images/Acessorios Originais.png";

const Acessorios: React.FC = () => {
  // Número de WhatsApp
  const whatsappNumber = "+5534999252590";

  // Dados dos produtos extraídos da tabela de preços
  const products = [
    {
      id: 80,
      model: "AirPods Max",
      storage: "",
      color: "Cinza-espacial, Prateado, Verde, Azul-celeste, Rosa",
      battery: "100%",
      originalPrice: "R$ 5.207,42",
      installmentPrice: "R$ 424",
      pixPrice: "R$ 4.400",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Chip H1 (em cada fone), Cancelamento Ativo de Ruído, Modo Ambiente, Áudio Espacial com rastreamento dinâmico da cabeça, Equalização Adaptativa, Até 20h de áudio com ANC/Modo Ambiente",
    },
    {
      id: 81,
      model: "AirPods Pro 2ª Geração (Tipo C Magsafe)",
      storage: "Tipo C Magsafe",
      color: "Branco",
      battery: "100%",
      originalPrice: "R$ 2.189,21",
      installmentPrice: "R$ 182",
      pixPrice: "R$ 1.891",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Chip H2, Cancelamento Ativo de Ruído (até 2x melhor), Modo Ambiente Adaptável, Áudio Espacial Personalizado, Controle por Toque, Resistência a poeira, suor e água (IP54), Estojo de carregamento MagSafe (USB-C) com alto-falante e entrada para cordão",
    },
    {
      id: 82,
      model: "AirPods 4 (C/ Noise Cancelation)",
      storage: "C/ Noise Cancelation",
      color: "Branco",
      battery: "100%",
      originalPrice: "R$ 2.232,87",
      installmentPrice: "R$ 182",
      pixPrice: "R$ 1.891",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Chip H2 (provável), Cancelamento Ativo de Ruído, Áudio Espacial, Design atualizado (provável), Estojo de carregamento USB-C (provável)",
    },
    {
      id: 83,
      model: "AirPods 4 (S/ Noise Cancelation)",
      storage: "S/ Noise Cancelation",
      color: "Branco",
      battery: "100%",
      originalPrice: "R$ 1.853,88",
      installmentPrice: "R$ 151",
      pixPrice: "R$ 1.572",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Chip H2 (provável), Áudio Espacial, Design atualizado (provável), Estojo de carregamento USB-C (provável)",
    },
    {
      id: 84,
      model: "AirPods 3",
      storage: "",
      color: "Branco",
      battery: "100%",
      originalPrice: "R$ 1.449,37",
      installmentPrice: "R$ 123",
      pixPrice: "R$ 1.279",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Chip H1, Áudio Espacial com rastreamento dinâmico da cabeça, Equalização Adaptativa, Sensor de força, Resistência a suor e água (IPX4), Estojo de carregamento MagSafe ou Lightning",
    },
    {
      id: 85,
      model: "AirPods 2",
      storage: "",
      color: "Branco",
      battery: "100%",
      originalPrice: "R$ 1.204,73",
      installmentPrice: "R$ 104",
      pixPrice: "R$ 1.083",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Chip H1, Acesso à Siri por voz, Conexão rápida, Até 5h de áudio, Estojo de carregamento Lightning",
    },
    {
      id: 86,
      model: "Apple Pencil Pro",
      storage: "",
      color: "Branco",
      originalPrice: "R$ 1.394,09",
      installmentPrice: "R$ 116",
      pixPrice: "R$ 1.205",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Pareamento e carga sem fio, Precisão absoluta, Sensibilidade à inclinação e pressão, Baixa latência, Gesto de apertar, Rotação do sensor giroscópico, Resposta tátil, Buscar Apple Pencil, Ponta substituível",
    },
    {
      id: 87,
      model: "Apple Pencil 1ª Geração",
      storage: "",
      color: "Branco",
      originalPrice: "R$ 1.226,77",
      installmentPrice: "R$ 105",
      pixPrice: "R$ 1.095",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Pareamento e carga via Lightning, Precisão absoluta, Sensibilidade à inclinação e pressão, Baixa latência, Ponta substituível",
    },
    {
      id: 88,
      model: "AirTag (4 unidades)",
      storage: "4 unidades",
      color: "Branco/Prateado",
      originalPrice: "R$ 1.109,71",
      installmentPrice: "R$ 94",
      pixPrice: "R$ 973",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Chip U1 (Banda Ultralarga e Busca Precisa), Bluetooth LE, Alto-falante integrado, Resistência a água e poeira (IP67), Bateria CR2032 substituível (dura mais de um ano), Integração com app Buscar",
    },
    {
      id: 89,
      model: "Apple Pencil 2ª Geração",
      storage: "",
      color: "Branco",
      originalPrice: "R$ 1.076,06",
      installmentPrice: "R$ 93",
      pixPrice: "R$ 960",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Pareamento e carga magnética, Precisão absoluta, Sensibilidade à inclinação e pressão, Baixa latência, Dois toques para trocar de ferramenta, Ponta substituível",
    },
    {
      id: 90,
      model: "AirTag (1 unidades)",
      storage: "1 unidades",
      color: "Branco/Prateado",
      originalPrice: "R$ 642,93",
      installmentPrice: "R$ 52",
      pixPrice: "R$ 544",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Chip U1 (Banda Ultralarga e Busca Precisa), Bluetooth LE, Alto-falante integrado, Resistência a água e poeira (IP67), Bateria CR2032 substituível (dura mais de um ano), Integração com app Buscar",
    },
    {
      id: 91,
      model: "Fonte Turbo USB-C 20w",
      storage: "",
      color: "Branco",
      originalPrice: "R$ 293,13",
      installmentPrice: "R$ 24",
      pixPrice: "R$ 250",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Adaptador de energia USB-C de 20W, Carregamento rápido para iPhones e iPads compatíveis",
    },
    {
      id: 92,
      model: "Cabo USB-C",
      storage: "",
      color: "Branco",
      originalPrice: "R$ 298,63",
      installmentPrice: "R$ 24",
      pixPrice: "R$ 250",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Cabo de carregamento USB-C para USB-C (1m ou 2m), Suporta carregamento e transferência de dados",
    },
    {
      id: 93,
      model: "Cabo Lightning",
      storage: "",
      color: "Branco",
      originalPrice: "R$ 296,22",
      installmentPrice: "R$ 24",
      pixPrice: "R$ 250",
      details: "aparelho novo",
      image: "",
      realImages: [],
      category: "Acessorios",
      specs:
        "Cabo de USB-C para Lightning ou USB-A para Lightning (1m ou 2m), Suporta carregamento e transferência de dados",
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
    // Removida a variável não utilizada paymentMethod
    const message = `Quero comprar o ${product.model}${
      product.specs ? " " + product.specs : ""
    } por ${product.price}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank"
    );
  };

  return (
    <div className="acessorios-container bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white text-center">
          Acessórios Apple
        </h1>
        <p className="text-xl text-gray-300 mb-8 text-center">
          Lacrados | 1 ano de garantia Apple
        </p>

        {/* Tabela de preços original como referência */}
        {/* <div className="mb-12 flex justify-center">
        <ImageLoader
          src={acessoriosPriceTable}
          alt="Tabela de preços Acessórios Apple"
          className="max-w-full h-auto rounded-lg shadow-lg"
        />
      </div> */}

        {/* Lista de produtos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
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
                  {product.specs && (
                    <p className="text-gray-400 mb-4">{product.specs}</p>
                  )}

                  <div className="flex flex-col mt-4">
                    <div className="text-[#ff6100] text-xl font-medium">
                      {product.price}
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-gray-300 text-sm">
                      Lacrado | 1 ano de garantia
                    </span>
                    <div className="bg-gray-800 px-2 py-1 rounded text-xs text-white">
                      Original
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

        {/* Informações adicionais */}
        <div className="mt-16 bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-white">
            Por que comprar Acessórios Apple na CompreFi?
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
                Produtos originais com 1 ano de garantia oficial Apple
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
        <div className="mt-16">
          <FAQ />
        </div>
      </div>
    </div>
  );
};

export default Acessorios;
