import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

const Agradecimento: React.FC = () => {
  const location = useLocation();
  const [sourcePage, setSourcePage] = useState<
    "teste-infalivel" | "economia" | "outro"
  >("outro");
  const [countdown, setCountdown] = useState(72); // 72 horas (3 dias)

  useEffect(() => {
    // Determinar de qual página o usuário veio
    const params = new URLSearchParams(location.search);
    const source = params.get("source");

    if (source === "teste-infalivel") {
      setSourcePage("teste-infalivel");
    } else if (source === "economia") {
      setSourcePage("economia");
    }
  }, [location]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevCount - 1;
      });
    }, 3600000); // Atualiza a cada hora (3600000 ms)

    return () => clearInterval(timer);
  }, []);

  return (
    <PageTransition>
      <div className="agradecimento-container bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Cabeçalho da página */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              Obrigado por se inscrever!
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Estamos muito felizes em ter você na comunidade CompreFi. Siga os
              passos abaixo para aproveitar ao máximo sua experiência.
            </p>
          </div>

          {/* Passos */}
          <div className="max-w-4xl mx-auto">
            {/* Passo 1 - Igual para todos */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg mb-8">
              <div className="flex items-start">
                <div className="bg-[#ff6100] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Siga a CompreFi no Instagram
                  </h2>
                  <p className="text-gray-300 mb-6">
                    Acompanhe nossos stories diários com dicas exclusivas,
                    novidades e conteúdo premium sobre o universo Apple.
                  </p>
                  <a
                    href="https://instagram.com/comprefi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 px-6 rounded-md transition-transform transform hover:scale-105"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Seguir @CompreFi
                  </a>
                </div>
              </div>
            </div>

            {/* Passo 2 - Condicional baseado na origem */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg mb-8">
              <div className="flex items-start">
                <div className="bg-[#ff6100] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <div>
                  {sourcePage === "teste-infalivel" ? (
                    <>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Faça download do seu brinde
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Seu guia exclusivo "Como identificar golpes em produtos
                        Apple" está pronto para download. Este material vai te
                        ajudar a evitar fraudes e economizar dinheiro.
                      </p>
                      <a
                        href="#download-guide"
                        className="inline-flex items-center bg-[#ff6100] hover:bg-[#e55a00] text-white py-3 px-6 rounded-md transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Baixar Guia PDF
                      </a>
                    </>
                  ) : sourcePage === "economia" ? (
                    <>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Assista o vídeo exclusivo
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Descubra como mais de 1.400 pessoas economizaram de R$
                        300,00 a R$ 20.000,00 em produtos Apple usando nosso
                        programa de indicações com desconto progressivo e
                        ofertas exclusivas.
                      </p>
                      <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg overflow-hidden mb-6">
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-16 w-16 text-[#ff6100] mx-auto mb-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <p className="text-gray-400">
                              Clique para assistir o vídeo
                            </p>
                          </div>
                        </div>
                      </div>
                      <a
                        href="#watch-video"
                        className="inline-flex items-center bg-[#ff6100] hover:bg-[#e55a00] text-white py-3 px-6 rounded-md transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Assistir Agora
                      </a>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-white mb-4">
                        Acesse conteúdo exclusivo
                      </h2>
                      <p className="text-gray-300 mb-6">
                        Preparamos conteúdo exclusivo para nossos assinantes.
                        Você terá acesso a dicas, guias e estratégias para
                        economizar em produtos Apple.
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <a
                          href="#download-guide"
                          className="inline-flex items-center bg-[#ff6100] hover:bg-[#e55a00] text-white py-3 px-6 rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                          </svg>
                          Baixar Guia
                        </a>
                        <a
                          href="#watch-video"
                          className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-md transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Assistir Vídeo
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Passo 3 - Igual para todos */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg mb-8">
              <div className="flex items-start">
                <div className="bg-[#ff6100] rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    Junte-se à família dos Refinados
                  </h2>
                  {/* <p className="text-gray-300 mb-6">
                    Entre para o nosso grupo exclusivo e receba brindes,
                    descontos e conteúdos premium que só compartilhamos com
                    membros.
                  </p> */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-lg border border-[#ff6100] mb-6">
                    <h3 className="text-xl font-bold text-white mb-3">
                      Cupom exclusivo para novos membros
                    </h3>
                    <p className="text-gray-300 mb-4">
                      Que tal receber um cupom de 20% OFF que pode chegar até
                      R$500,00 OFF em produtos originais Apple para você usar na
                      sua primeira compra?
                    </p>
                    <div className="flex items-center justify-between bg-gray-800 p-3 rounded-md border border-gray-700">
                      <span className="text-xl font-mono text-white tracking-wider">
                        REFINADO20
                      </span>
                      <button
                        className="text-[#ff6100] hover:text-white hover:bg-[#ff6100] border border-[#ff6100] py-1 px-3 rounded-md transition-colors text-sm"
                        onClick={() => {
                          navigator.clipboard.writeText("REFINADO20");
                          alert("Cupom copiado!");
                        }}
                      >
                        Copiar
                      </button>
                    </div>
                    <p className="text-gray-400 text-sm mt-3">
                      Cupom válido por{" "}
                      <span className="text-[#ff6100] font-semibold">
                        {countdown} horas
                      </span>
                      . Limite de 1 uso por cliente.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/5534999252590?text=Olá!%20Quero%20aproveitar%20a%20Oferta%20Exclusiva%20e%20usar%20meu%20cupom%20REFINADO20!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    Aproveitar Oferta Exclusiva
                  </a>
                </div>
              </div>
            </div>

            {/* Botões de navegação */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <Link
                to="/"
                className="inline-flex items-center bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-md transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Voltar para Home
              </Link>
              <a
                href="https://wa.me/5534999252590?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20CompreFi."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#ff6100] hover:bg-[#e55a00] text-white py-3 px-6 rounded-md transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Falar com Consultor
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Agradecimento;
