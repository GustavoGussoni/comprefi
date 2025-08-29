import React, { useState, useEffect } from "react";

interface ResultData {
  valorAparelho: number;
  valorFinal: number;
  temDefeito: boolean;
  precisaCotacao: boolean;
  cupomDesconto?: string;
  descontoExtra?: number;
  tempoExpiracao?: Date;
}

interface FormData {
  modeloAtual: string;
  capacidadeAtual: string;
  modeloDesejado: string;
  bateriaAtual: number;
  corAtual: string;
  defeitos: string[];
  pecasTrocadas: boolean;
}

interface ResultPageProps {
  result: ResultData;
  formData: FormData;
  onSubmitContact: (contactData: {
    nome: string;
    email: string;
    whatsapp: string;
  }) => void;
}

const ResultPage: React.FC<ResultPageProps> = ({
  result,
  formData,
  onSubmitContact,
}) => {
  const [showContactForm, setShowContactForm] = useState<boolean>(false);
  const [contactData, setContactData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
  });
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Countdown timer para o desconto
  useEffect(() => {
    if (result.tempoExpiracao) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const expiration = new Date(result.tempoExpiracao!).getTime();
        const distance = expiration - now;

        if (distance > 0) {
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft(
            `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        } else {
          setTimeLeft("EXPIRADO");
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [result.tempoExpiracao]);

  const handleSubmitContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSubmitContact(contactData);
      // Sucesso será tratado pelo componente pai
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
      alert("Erro ao enviar dados. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setContactData({ ...contactData, whatsapp: formatted });
  };

  if (result.precisaCotacao) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto bg-orange-600 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-10 h-10 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-white mb-4">
              Cotação Personalizada Necessária
            </h1>
            <p className="text-gray-400 text-lg">
              Devido às condições específicas do seu iPhone, nossa equipe fará
              uma avaliação personalizada.
            </p>
          </div>

          <div className="bg-orange-900 bg-opacity-30 border border-orange-700 rounded-lg p-6 mb-8">
            <h3 className="text-orange-300 font-semibold text-lg mb-3">
              ⏰ Você receberá sua cotação em até 3 horas
            </h3>
            <p className="text-orange-200 text-sm">
              Nossa equipe especializada analisará as condições específicas do
              seu {formData.modeloAtual}e enviará uma proposta personalizada via
              WhatsApp.
            </p>
          </div>

          <button
            onClick={() => setShowContactForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
          >
            Receber Cotação no WhatsApp
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-4xl mx-auto">
        {!showContactForm ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              <h1 className="text-3xl font-bold text-white mb-4">
                🎉 Sua Proposta Está Pronta!
              </h1>
              <p className="text-gray-400 text-lg">
                Calculamos o valor exato para trocar seu {formData.modeloAtual}{" "}
                por um {formData.modeloDesejado}
              </p>
            </div>

            {/* Main Result Card */}
            <div className="bg-gradient-to-br from-blue-900 to-green-900 rounded-2xl p-8 mb-8 border border-blue-500">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Valor para completar sua troca:
                </h2>
                <div className="text-5xl font-bold text-green-400 mb-2">
                  {formatCurrency(result.valorFinal)}
                </div>
                <p className="text-blue-200">
                  Seu {formData.modeloAtual} vale{" "}
                  {formatCurrency(result.valorAparelho)}
                </p>
              </div>

              {/* Payment Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
                  <div className="text-green-400 font-semibold text-lg mb-1">
                    💰 PIX com desconto
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(result.valorFinal * 0.97)}{" "}
                    {/* 3% desconto */}
                  </div>
                  <div className="text-sm text-gray-300">
                    Economia de {formatCurrency(result.valorFinal * 0.03)}
                  </div>
                </div>

                <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
                  <div className="text-blue-400 font-semibold text-lg mb-1">
                    💳 12x sem juros
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {formatCurrency(result.valorFinal / 12)}
                  </div>
                  <div className="text-sm text-gray-300">
                    Total: {formatCurrency(result.valorFinal)}
                  </div>
                </div>
              </div>

              {/* Bonus Section */}
              <div className="bg-yellow-900 bg-opacity-30 border border-yellow-600 rounded-lg p-4">
                <h3 className="text-yellow-300 font-semibold text-lg mb-3 text-center">
                  🎁 Bônus Inclusos na Sua Troca:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-yellow-200">
                    <span className="mr-2">✅</span>
                    Capinha de proteção grátis
                  </div>
                  <div className="flex items-center text-yellow-200">
                    <span className="mr-2">✅</span>
                    Até 20% OFF em acessórios originais
                  </div>
                  <div className="flex items-center text-yellow-200">
                    <span className="mr-2">✅</span>
                    Troca garantida nos próximos lançamentos
                  </div>
                  <div className="flex items-center text-yellow-200">
                    <span className="mr-2">✅</span>
                    Suporte técnico eterno
                  </div>
                  <div className="flex items-center text-yellow-200">
                    <span className="mr-2">✅</span>
                    Programa de indicações com desconto progressivo
                  </div>
                  <div className="flex items-center text-yellow-200">
                    <span className="mr-2">✅</span>
                    Garantia de 1 ano
                  </div>
                </div>
              </div>
            </div>

            {/* Urgency Timer */}
            {result.cupomDesconto && timeLeft && timeLeft !== "EXPIRADO" && (
              <div className="bg-red-900 bg-opacity-30 border border-red-600 rounded-lg p-6 mb-8 text-center">
                <h3 className="text-red-300 font-bold text-xl mb-2">
                  ⚡ Oferta Especial por Tempo Limitado!
                </h3>
                <p className="text-red-200 mb-3">
                  Desconto extra de {result.descontoExtra}% expira em:
                </p>
                <div className="text-3xl font-mono font-bold text-red-400 mb-3">
                  {timeLeft}
                </div>
                <p className="text-red-200 text-sm">
                  Cupom:{" "}
                  <span className="font-mono bg-red-800 px-2 py-1 rounded">
                    {result.cupomDesconto}
                  </span>
                </p>
              </div>
            )}

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => setShowContactForm(true)}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-12 rounded-lg text-xl transition-colors shadow-lg"
              >
                📱 Receber Proposta no WhatsApp
              </button>
              <p className="text-gray-400 text-sm mt-3">
                Enviaremos todos os detalhes e próximos passos
              </p>
            </div>
          </>
        ) : (
          /* Contact Form */
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                📧 Onde devemos enviar sua simulação?
              </h2>
              <p className="text-gray-400">
                Preencha seus dados para receber a proposta completa com todos
                os detalhes
              </p>
            </div>

            <form onSubmit={handleSubmitContact} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Nome completo *
                </label>
                <input
                  type="text"
                  required
                  value={contactData.nome}
                  onChange={(e) =>
                    setContactData({ ...contactData, nome: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Seu nome completo"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={contactData.email}
                  onChange={(e) =>
                    setContactData({ ...contactData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={contactData.whatsapp}
                  onChange={handlePhoneChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="(11) 99999-9999"
                  maxLength={15}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
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
                  </div>
                ) : (
                  "📱 Enviar Proposta Agora"
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                🔒 Seus dados estão seguros e não serão compartilhados com
                terceiros
              </p>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {!showContactForm && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              ❓ Perguntas Frequentes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Como funciona a troca?
                </h4>
                <p className="text-gray-400 text-sm">
                  Você nos envia seu iPhone usado, avaliamos e enviamos o novo.
                  Todo o processo é seguro e rastreado.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  E se meu iPhone valer menos?
                </h4>
                <p className="text-gray-400 text-sm">
                  Nossa avaliação é precisa. Se houver diferença, você pode
                  cancelar sem custos ou renegociar.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Qual a garantia?
                </h4>
                <p className="text-gray-400 text-sm">
                  Todos os iPhones têm garantia de 1 ano e suporte técnico
                  vitalício da CompreFi.
                </p>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h4 className="text-white font-semibold mb-2">
                  Posso parcelar?
                </h4>
                <p className="text-gray-400 text-sm">
                  Sim! Oferecemos parcelamento em até 12x sem juros no cartão de
                  crédito.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
