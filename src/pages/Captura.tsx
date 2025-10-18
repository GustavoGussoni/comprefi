import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import TestimonialCard from "../components/TestimonialCard";
import FAQ from "../components/FAQ";

const Captura: React.FC = () => {
  const navigate = useNavigate();

  const formatarDataHoraISO = () => {
    return new Date().toISOString();
  };

  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dataHoraFormatada = formatarDataHoraISO();

  const dadosCompletos = {
    ...formData,
    dataHora: dataHoraFormatada,
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Substitua a URL abaixo pela URL do seu webhook
      const webhookUrl =
        "https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/ddfbe711-a3c9-4730-827b-9218dd473b34";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCompletos),
      });

      if (!response.ok) {
        throw new Error(
          "Falha ao enviar o formulário. Por favor, tente novamente."
        );
      }

      setSubmitSuccess(true);
      // Opcional: redirecionar para uma página de agradecimento após alguns segundos
      setTimeout(() => navigate("/agradecimento?source=teste-infalivel"), 2000);
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar o formulário"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dados dos depoimentos
  const testimonials = [
    {
      name: "Roberto M.",
      text: "Quase caí em um golpe de R$ 4.200 comprando um MacBook. O guia me salvou e me ensinou a identificar fraudes em segundos!",
      rating: 5,
    },
    {
      name: "Juliana Santos",
      text: "Perdi R$ 2.800 em um golpe antes de conhecer a CompreFi. Agora sei exatamente o que verificar antes de comprar qualquer produto Apple.",
      rating: 5,
    },
    {
      name: "Pedro Oliveira",
      text: "O checklist de verificação é incrível! Identifiquei 3 ofertas falsas em menos de 5 minutos. Recomendo muito!",
      rating: 5,
    },
  ];

  // FAQ específico para Captura
  const faqItems = [
    {
      question: "O guia anti-golpes é realmente gratuito?",
      answer:
        "Sim! O guia completo + checklist + bônus são 100% gratuitos. Não há nenhum custo oculto.",
    },
    {
      question: "Quando vou receber o guia?",
      answer:
        "Você receberá o guia no seu e-mail em até 2 minutos após o cadastro. Verifique também sua caixa de spam.",
    },
    {
      question: "O guia funciona para todos os produtos Apple?",
      answer:
        "Sim! As técnicas de verificação funcionam para iPhone, MacBook, iPad, Apple Watch e acessórios Apple.",
    },
    {
      question: "Como o guia me protege de golpes?",
      answer:
        "O guia ensina a identificar ofertas falsas, verificar autenticidade de produtos, reconhecer sites fraudulentos e muito mais. São técnicas práticas e fáceis de aplicar.",
    },
    {
      question: "Meus dados estão seguros?",
      answer:
        "Sim! Seus dados são protegidos e usados apenas para enviar o guia. Você pode cancelar a qualquer momento.",
    },
  ];

  return (
    <PageTransition>
      <div className="captura-container bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Cabeçalho da página */}
          <div className="text-center mb-12">
            <div className="inline-block bg-red-900/30 border border-red-600 px-4 py-2 rounded-lg mb-6">
              <p className="text-red-400 font-semibold text-sm">
                ⚠️ ALERTA: Mais de 12.000 pessoas foram vítimas de golpes em
                2024
              </p>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              Guia Definitivo:{" "}
              <span className="text-[#ff6100]">
                Como Nunca Mais Cair em Golpes
              </span>{" "}
              ao Comprar Produtos Apple
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Receba gratuitamente nosso guia completo e aprenda o método
              infalível para identificar fraudes, ofertas falsas e produtos
              piratas em menos de 2 minutos.
            </p>

            {/* Urgência Sutil */}
            <div className="mt-6 inline-block bg-gradient-to-r from-orange-900 to-red-900 px-6 py-3 rounded-lg border border-orange-600">
              <p className="text-white font-semibold">
                🔥 Mais de 2.300 pessoas já se protegeram esta semana
              </p>
            </div>
          </div>

          {/* Conteúdo principal em duas colunas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Coluna da esquerda - Stack de Bônus */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-white text-center">
                🛡️ Ao Se Cadastrar HOJE, Você Recebe:
              </h2>

              {/* Stack de Bônus */}
              <div className="space-y-6">
                {/* Bônus Principal */}
                <div className="bg-gradient-to-r from-red-900 to-red-800 rounded-lg p-6 border-2 border-red-600">
                  <div className="flex items-start">
                    <div className="bg-red-600 rounded-full p-3 mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Guia Anti-Golpes Completo
                      </h3>
                      <p className="text-red-100 mb-2">
                        Método infalível para identificar fraudes em produtos
                        Apple
                      </p>
                      <p className="text-red-200 text-sm line-through">
                        Valor: R$127
                      </p>
                      <p className="text-green-400 font-bold">HOJE: GRÁTIS</p>
                    </div>
                  </div>
                </div>

                {/* Bônus 1 */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#ff6100] mr-3 flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="text-white font-bold mb-1">
                        BÔNUS 1: Checklist de Verificação Instantânea
                      </h4>
                      <p className="text-gray-300 text-sm mb-1">
                        Verifique a autenticidade de qualquer produto Apple em
                        menos de 2 minutos
                      </p>
                      <p className="text-gray-400 text-xs line-through">
                        Valor: R$67
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bônus 2 */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#ff6100] mr-3 flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="text-white font-bold mb-1">
                        BÔNUS 2: Lista dos 10 Golpes Mais Comuns
                      </h4>
                      <p className="text-gray-300 text-sm mb-1">
                        Conheça as fraudes mais aplicadas e como se proteger de
                        cada uma
                      </p>
                      <p className="text-gray-400 text-xs line-through">
                        Valor: R$87
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bônus 3 */}
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#ff6100] mr-3 flex-shrink-0 mt-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h4 className="text-white font-bold mb-1">
                        BÔNUS 3: Garantia de Compra Segura
                      </h4>
                      <p className="text-gray-300 text-sm mb-1">
                        Certificado de proteção ao comprar na CompreFi + suporte
                        prioritário
                      </p>
                      <p className="text-gray-400 text-xs line-through">
                        Valor: R$150
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-lg p-4 border-2 border-green-600">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-green-100 text-sm">VALOR TOTAL:</p>
                      <p className="text-white text-2xl font-bold line-through">
                        R$431
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-100 text-sm">HOJE:</p>
                      <p className="text-green-400 text-3xl font-bold">
                        GRÁTIS
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Garantias */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span className="text-sm">Seus dados estão 100% seguros</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-sm">Acesso imediato por email</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                    />
                  </svg>
                  <span className="text-sm">Sem spam, prometemos</span>
                </div>
              </div>
            </div>

            {/* Coluna da direita - Formulário */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg sticky top-4">
              <h2 className="text-2xl font-bold mb-6 text-white text-center">
                🛡️ Proteja-se Agora Gratuitamente
              </h2>
              <p className="text-gray-300 mb-6 text-center">
                Preencha o formulário e receba o guia completo + bônus por email
                em menos de 2 minutos.
              </p>

              {submitSuccess ? (
                <div className="bg-green-900/30 border border-green-500 rounded-lg p-6 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-green-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Cadastro realizado com sucesso!
                  </h3>
                  <p className="text-gray-300">
                    Enviamos o guia anti-golpes + bônus para o seu e-mail.
                    Verifique também sua caixa de spam.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block text-gray-300 mb-2">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="whatsapp"
                      className="block text-gray-300 mb-2"
                    >
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-800 border border-gray-700 rounded-md py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  {submitError && (
                    <div className="bg-red-900/30 border border-red-500 rounded-lg p-4">
                      <p className="text-red-300 text-sm">{submitError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#ff6100] to-orange-600 hover:from-orange-600 hover:to-[#ff6100] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {isSubmitting
                      ? "Enviando..."
                      : "🛡️ Quero Me Proteger de Golpes Agora"}
                  </button>

                  <p className="text-gray-400 text-xs text-center">
                    Ao se cadastrar, você concorda em receber comunicações da
                    CompreFi. Você pode cancelar a qualquer momento.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Depoimentos */}
          <section className="testimonials-section py-16 px-4 bg-gray-900 rounded-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
              Veja Como Outras Pessoas Se Protegeram
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Mais de 2.300 pessoas já evitaram golpes usando nosso guia
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  name={testimonial.name}
                  text={testimonial.text}
                  rating={testimonial.rating}
                />
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="faq-section py-16 px-4 bg-black rounded-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
              Perguntas Frequentes
            </h2>
            <div className="max-w-3xl mx-auto">
              <div className="faq-container space-y-4">
                {faqItems.map((item, index) => (
                  <div
                    key={index}
                    className="faq-item bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
                  >
                    <details className="group">
                      <summary className="cursor-pointer list-none p-6 flex justify-between items-center hover:bg-gray-800 transition-colors duration-200">
                        <h3 className="text-lg font-semibold text-white pr-4">
                          {item.question}
                        </h3>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-[#ff6100] flex-shrink-0 transform transition-transform duration-200 group-open:rotate-180"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </summary>
                      <div className="px-6 pb-6">
                        <p className="text-gray-300 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Final */}
          <div className="text-center mt-16 bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Não Seja a Próxima Vítima de Golpes
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Cadastre-se agora e receba o guia anti-golpes completo + 3 bônus
              exclusivos gratuitamente
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block bg-gradient-to-r from-[#ff6100] to-orange-600 hover:from-orange-600 hover:to-[#ff6100] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Sim! Quero Me Proteger Agora →
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Captura;
