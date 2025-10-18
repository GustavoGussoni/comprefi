import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import TestimonialCard from "../components/TestimonialCard";
import FAQ from "../components/FAQ";

const Economia: React.FC = () => {
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
      const webhookUrl =
        "https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/77af256e-7701-4254-8be1-77e266f3dc6d";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosCompletos),
      });

      console.log(response);

      const text = await response.text();
      console.log("Resposta do webhook:", text);

      if (!response.ok) {
        throw new Error(
          "Falha ao enviar o formulário. Por favor, tente novamente."
        );
      }

      setSubmitSuccess(true);
      setTimeout(() => navigate("/agradecimento?source=economia"), 2000);
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
      name: "Maria C.",
      text: "Depois de perder R$ 3.500 em um golpe online, descobri a CompreFi e finalmente pude comprar meu iPhone com segurança e ainda economizei mais de R$ 1.200!",
      rating: 5,
    },
    {
      name: "Carlos Silva",
      text: "O guia me ajudou a identificar ofertas falsas e economizar R$ 2.300 na compra do meu MacBook. Recomendo!",
      rating: 5,
    },
    {
      name: "Ana Paula",
      text: "Aprendi técnicas que nunca imaginei. Economizei R$ 890 no meu iPad e ainda ganhei garantia estendida!",
      rating: 5,
    },
  ];

  return (
    <PageTransition>
      <div className="economia-container bg-black min-h-screen">
        <div className="container mx-auto px-4 py-12">
          {/* Cabeçalho da página */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white leading-tight">
              Descubra Como Economizar{" "}
              <span className="text-[#ff6100]">em Produtos Apple</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Receba gratuitamente nosso guia completo e aprenda as estratégias
              que já ajudaram mais de 1.400 pessoas a comprarem produtos Apple
              premium com segurança e economia real.
            </p>

            {/* Urgência Sutil */}
            <div className="mt-6 inline-block bg-gradient-to-r from-orange-900 to-red-900 px-6 py-3 rounded-lg border border-orange-600">
              <p className="text-white font-semibold">
                ⚡ Últimas 50 vagas para receber o guia hoje
              </p>
            </div>
          </div>

          {/* Conteúdo principal em duas colunas em telas maiores */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
            {/* Coluna da esquerda - Stack de Bônus */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800 shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-white text-center">
                🎁 Ao Se Cadastrar HOJE, Você Recebe:
              </h2>

              {/* Stack de Bônus */}
              <div className="space-y-6">
                {/* Bônus Principal */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 border-2 border-blue-600">
                  <div className="flex items-start">
                    <div className="bg-blue-600 rounded-full p-3 mr-4">
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        Guia Completo de Economia
                      </h3>
                      <p className="text-blue-100 mb-2">
                        Como economizar em produtos Apple com segurança e
                        qualidade
                      </p>
                      <p className="text-blue-200 text-sm line-through">
                        Valor: R$97
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
                        BÔNUS 1: Checklist de Verificação
                      </h4>
                      <p className="text-gray-300 text-sm mb-1">
                        Passo a passo para verificar a autenticidade de qualquer
                        produto Apple
                      </p>
                      <p className="text-gray-400 text-xs line-through">
                        Valor: R$47
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
                        BÔNUS 2: As 5 Armadilhas Mais Comuns
                      </h4>
                      <p className="text-gray-300 text-sm mb-1">
                        Identifique ofertas fraudulentas antes de cair em golpes
                      </p>
                      <p className="text-gray-400 text-xs line-through">
                        Valor: R$67
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
                        BÔNUS 3: Cupom de R$100
                      </h4>
                      <p className="text-gray-300 text-sm mb-1">
                        Desconto exclusivo na sua primeira compra na CompreFi
                      </p>
                      <p className="text-gray-400 text-xs line-through">
                        Valor: R$100
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
                        R$311
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
                Receba Seu Guia + Bônus Grátis
              </h2>
              <p className="text-gray-300 mb-6 text-center">
                Preencha o formulário abaixo e receba tudo por email em menos de
                2 minutos.
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
                    Enviamos o guia + bônus para o seu e-mail. Verifique também
                    sua caixa de spam.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="nome" className="block text-gray-300 mb-2">
                      Nome completo
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
                    <label
                      htmlFor="whatsapp"
                      className="block text-gray-300 mb-2"
                    >
                      WhatsApp
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

                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      E-mail
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

                  {submitError && (
                    <div className="bg-red-900/30 border border-red-500 rounded-md p-3 text-red-200">
                      {submitError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-[#ff6100] hover:bg-[#e55a00] text-white py-4 px-6 rounded-md transition-colors font-medium text-lg flex items-center justify-center ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "🎁 Quero Receber o Guia Grátis"
                    )}
                  </button>

                  <p className="text-gray-400 text-sm text-center mt-4">
                    Seus dados estão seguros e nunca serão compartilhados com
                    terceiros. Ao se cadastrar, você concorda com nossa política
                    de privacidade.
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* Depoimentos */}
          <section className="testimonials-section py-16 px-4 bg-gray-900 rounded-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-white">
              Veja O Que Quem Recebeu o Guia Está Dizendo
            </h2>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Mais de 1.400 pessoas já economizaram milhares de reais usando
              nossas estratégias
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
            <div className="max-w-3xl mx-auto">
              <FAQ />
            </div>
          </section>

          {/* CTA Final */}
          <div className="text-center mt-16 bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl border border-gray-800">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Pronto para Economizar em Produtos Apple?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Cadastre-se agora e receba o guia completo + 3 bônus exclusivos
              gratuitamente
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("form")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-block bg-[#ff6100] hover:bg-[#e55a00] text-white font-bold py-4 px-8 rounded-lg transition-colors duration-300 shadow-lg"
            >
              Sim! Quero Receber o Guia Grátis →
            </a>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Economia;
