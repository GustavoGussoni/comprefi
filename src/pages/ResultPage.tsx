import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface FunnelData {
  modeloAtual: string;
  capacidadeAtual: string;
  corAtual: string;
  bateriaAtual: number;
  defeitos: string[];
  pecasTrocadas: boolean;
  quaisPecas: string;
  modeloDesejado: string;
  ondeOuviu: string;
  tempoPensando: string;
  urgenciaTroca: string;
}

interface TradeResult {
  valorAparelho: number;
  valorFinal: number;
  valorBase: number;
  depreciacaoBateria: number;
  depreciacaoDefeitos: number;
  precoProduto: number;
  valorComDesconto: number;
  temDefeito: boolean;
  precisaCotacao: boolean;
  cupomDesconto?: string;
  produtoDesejado?: any;
}

interface ContactForm {
  nome: string;
  email: string;
  whatsapp: string;
}

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [result, setResult] = useState<TradeResult | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({
    nome: "",
    email: "",
    whatsapp: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(1800); // 30 minutos
  const [showFAQ, setShowFAQ] = useState<boolean>(false);

  useEffect(() => {
    loadData();
    startTimer();

    // Cleanup no unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const loadData = () => {
    try {
      // Carregar dados do funil
      const funnelDataStr = localStorage.getItem("funnelData");
      if (funnelDataStr) {
        setFunnelData(JSON.parse(funnelDataStr));
      }

      // Carregar resultado do cálculo
      const resultStr = localStorage.getItem("tradeResult");
      if (resultStr) {
        setResult(JSON.parse(resultStr));
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  const startTimer = () => {
    // Limpar timer anterior se existir
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };

  const formatCurrency = (value: number | undefined | null): string => {
    if (!value || isNaN(value)) {
      return "R$ 0,00";
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Calcular desconto dinâmico (3% do valor final)
  const calculateDiscount = (): number => {
    if (!result?.valorFinal) return 0;
    return result.valorFinal * 0.03;
  };

  // Valor atual baseado no timer (com ou sem desconto)
  const getCurrentValue = (): number => {
    if (!result?.valorFinal) return 0;
    if (timeLeft > 0) {
      return result.valorComDesconto || result.valorFinal * 0.97;
    }
    return result.valorFinal;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setContactForm((prev) => ({ ...prev, whatsapp: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular envio para CRM
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Mostrar resultado após envio
      setShowResult(true);

      console.log("✅ Formulário enviado, mostrando resultado");
    } catch (err) {
      console.error("❌ Erro ao enviar:", err);
      alert("Erro ao enviar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const currentValue = getCurrentValue();
    const discount = calculateDiscount();

    const message = `
🔥 *CONFIRMAÇÃO DE TROCA - CompreFi*

👤 *Cliente:* ${contactForm.nome}
📧 *Email:* ${contactForm.email}
📱 *WhatsApp:* ${contactForm.whatsapp}

📱 *TROCA CONFIRMADA:*
• De: ${funnelData?.modeloAtual} ${funnelData?.capacidadeAtual}
• Para: ${result?.produtoDesejado?.model}

💰 *VALORES FINAIS:*
• Valor do seu aparelho: ${formatCurrency(result?.valorAparelho)}
• Valor a pagar: ${formatCurrency(result?.valorComDesconto)}
${timeLeft > 0 ? `• Desconto aplicado: ${formatCurrency(discount)}` : "• Valor original (sem desconto)"}

⏰ *Confirmado em:* ${new Date().toLocaleString("pt-BR")}
    `.trim();

    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    // Limpar localStorage
    localStorage.removeItem("funnelData");
    localStorage.removeItem("tradeResult");
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    );
  }

  const currentValue = getCurrentValue();
  const discount = calculateDiscount();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            // FORMULÁRIO PRIMEIRO - DESIGN MINIMALISTA
            <>
              {/* Header Focado */}
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-white mb-4">
                  🎯 Sua Troca Personalizada Está Pronta!
                </h1>
                <p className="text-gray-400 text-lg">
                  Complete seus dados abaixo para desbloquear sua proposta
                  exclusiva
                </p>
              </div>

              {/* Timer de Urgência - Destaque Principal */}
              <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-8 mb-8 border border-red-700 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  ⏰ Desconto Especial Expira Em:
                </h3>
                <div className="text-5xl font-mono font-bold text-yellow-300 mb-3">
                  {formatTime(timeLeft)}
                </div>
                <p className="text-orange-200 text-lg">
                  Economia de {formatCurrency(discount)} • Apenas hoje!
                </p>
                {timeLeft === 0 && (
                  <p className="text-red-300 text-sm mt-2">
                    ⚠️ Desconto expirado - valor original aplicado
                  </p>
                )}
              </div>

              {/* Teaser do Valor - SEM DETALHES */}
              <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-lg p-6 mb-8 border border-green-700 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  💰 Sua Troca Final
                </h3>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {formatCurrency(result?.valorComDesconto)}
                </div>
                <p className="text-green-200">
                  {funnelData?.modeloAtual} → {result?.produtoDesejado?.model}
                </p>
                <div className="mt-4 p-3 bg-green-800 bg-opacity-50 rounded-lg">
                  <p className="text-green-300 text-sm">
                    🔒 <strong>Breakdown completo + bônus exclusivos</strong>{" "}
                    serão revelados após o cadastro
                  </p>
                </div>
              </div>

              {/* Formulário Minimalista - Foco Principal */}
              <div className="bg-gray-900 rounded-lg p-8 border border-gray-700">
                <h3 className="text-2xl font-bold text-white mb-2 text-center">
                  📞 Desbloqueie Sua Proposta
                </h3>
                <p className="text-gray-400 mb-6 text-center">
                  Preencha abaixo para ver todos os detalhes e garantir seus
                  bônus
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.nome}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          nome: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-lg"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-lg"
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
                      value={contactForm.whatsapp}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-4 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none text-lg"
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-5 px-6 rounded-md transition-all duration-200 flex items-center justify-center text-lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Desbloqueando sua proposta...
                      </>
                    ) : (
                      <>
                        <span className="mr-3">🔓</span>
                        Desbloquear Minha Proposta Completa
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-gray-500 text-sm">
                    🔒 Seus dados estão seguros • Sem spam • Sem
                    compartilhamento
                  </p>
                </div>
              </div>

              {/* Social Proof Minimalista */}
              <div className="mt-8 text-center">
                <p className="text-gray-400 text-sm mb-4">
                  ⭐⭐⭐⭐⭐ Mais de 2.847 clientes já fizeram sua troca conosco
                </p>
                <div className="flex justify-center space-x-8 text-xs text-gray-500">
                  <span>✓ Processo 100% seguro</span>
                  <span>✓ Garantia total</span>
                  <span>✓ Suporte vitalício</span>
                </div>
              </div>
            </>
          ) : (
            // RESULTADO COMPLETO - REVEAL PROGRESSIVO
            <>
              {/* Header de Sucesso */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto bg-green-600 rounded-full flex items-center justify-center mb-4">
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
                <h1 className="text-4xl font-bold text-white mb-4">
                  🎉 Parabéns, {contactForm.nome.split(" ")[0]}!
                </h1>
                <p className="text-gray-400 text-lg">
                  Sua proposta exclusiva foi desbloqueada. Veja todos os
                  detalhes:
                </p>
              </div>

              {/* Valor Principal - Destaque */}
              <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-lg p-8 border border-green-700 mb-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    💰 Valor Final da Sua Troca
                  </h2>
                  <div className="text-6xl font-bold text-green-400 mb-4">
                    {formatCurrency(result?.valorComDesconto)}
                  </div>
                  <p className="text-green-200 text-lg mb-4">
                    Você economiza{" "}
                    {formatCurrency((result?.precoProduto || 0) - currentValue)}{" "}
                    na troca!
                  </p>
                  {timeLeft > 0 && (
                    <div className="bg-yellow-900 bg-opacity-50 rounded-lg p-4 border border-yellow-700">
                      <p className="text-yellow-300 font-bold">
                        ⏰ Desconto válido por mais {formatTime(timeLeft)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Breakdown Detalhado */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-white mb-6 text-center">
                  📊 Breakdown Completo da Sua Troca
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h4 className="text-white font-medium mb-3">
                      📱 Seu Aparelho Atual:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Modelo:</span>
                        <span className="text-white">
                          {funnelData?.modeloAtual}{" "}
                          {funnelData?.capacidadeAtual}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Valor base:</span>
                        <span className="text-white">
                          {formatCurrency(result?.valorBase)}
                        </span>
                      </div>
                      <div className="flex justify-between text-red-400">
                        <span>
                          Depreciação bateria ({funnelData?.bateriaAtual}%):
                        </span>
                        <span>
                          - {formatCurrency(result?.depreciacaoBateria)}
                        </span>
                      </div>
                      <div className="flex justify-between text-red-400">
                        <span>Depreciação defeitos:</span>
                        <span>
                          - {formatCurrency(result?.depreciacaoDefeitos)}
                        </span>
                      </div>
                      <hr className="border-gray-700" />
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-white">Valor final:</span>
                        <span className="text-green-400">
                          {formatCurrency(result?.valorAparelho)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-700">
                    <h4 className="text-white font-medium mb-3">
                      🎯 Aparelho Desejado:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Modelo:</span>
                        <span className="text-white">
                          {result?.produtoDesejado?.model}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Preço original:</span>
                        <span className="text-white">
                          {formatCurrency(result?.precoProduto)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          Valor a pagar (original):
                        </span>
                        <span className="text-yellow-400">
                          {formatCurrency(result?.valorFinal)}
                        </span>
                      </div>
                      {timeLeft > 0 && (
                        <div className="flex justify-between text-lg font-bold text-green-400">
                          <span className="text-white">
                            Com desconto especial (3%):
                          </span>
                          <span className="text-green-400">
                            {formatCurrency(result?.valorComDesconto)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bônus Exclusivos */}
              <div className="bg-purple-900 bg-opacity-50 rounded-lg p-6 border border-purple-700 mb-8">
                <h3 className="text-xl font-bold text-white mb-4 text-center">
                  🎁 Seus Bônus Exclusivos Desbloqueados
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-white text-sm">
                          Capinha premium
                        </span>
                      </div>
                      <span className="text-green-400 text-sm font-bold">
                        R$ 150
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-white text-sm">
                          Película aplicada
                        </span>
                      </div>
                      <span className="text-green-400 text-sm font-bold">
                        R$ 80
                      </span>
                    </div>
                  </div>

                  <div className="bg-purple-800 bg-opacity-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-green-400 mr-2">✓</span>
                        <span className="text-white text-sm">
                          Garantia estendida
                        </span>
                      </div>
                      <span className="text-green-400 text-sm font-bold">
                        R$ 200
                      </span>
                    </div>
                  </div>

                  {timeLeft > 0 && (
                    <div className="bg-yellow-800 bg-opacity-50 rounded-lg p-4 border border-yellow-600">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-2">⚡</span>
                          <span className="text-white text-sm">
                            Desconto especial
                          </span>
                        </div>
                        <span className="text-yellow-400 text-sm font-bold">
                          {formatCurrency(discount)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-4 bg-purple-800 bg-opacity-50 rounded-lg border border-purple-600">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-white">Total em bônus:</span>
                    <span className="text-green-400 text-lg">
                      {formatCurrency(430 + (timeLeft > 0 ? discount : 0))}
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Principal */}
              <div className="text-center mb-8">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-md transition-all duration-200 flex items-center justify-center mx-auto text-lg"
                >
                  <span className="mr-3">💬</span>
                  Confirmar Troca no WhatsApp
                </button>

                <p className="text-gray-500 text-sm mt-4">
                  🔒 Proposta válida por{" "}
                  {formatTime(timeLeft > 0 ? timeLeft : 0)}
                  {timeLeft === 0 && " (valor original)"}
                </p>
              </div>

              {/* FAQ */}
              <div className="bg-gray-900 rounded-lg border border-gray-700">
                <button
                  onClick={() => setShowFAQ(!showFAQ)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <h3 className="text-xl font-bold text-white">
                    ❓ Perguntas Frequentes
                  </h3>
                  <svg
                    className={`w-6 h-6 text-gray-400 transform transition-transform ${
                      showFAQ ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showFAQ && (
                  <div className="px-6 pb-6 space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Como funciona a troca?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Você nos envia seu iPhone atual e recebe o novo.
                        Pagamento apenas da diferença.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Qual a garantia?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Todos os produtos têm garantia de 1 ano da Apple ou
                        CompreFi.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Como é feita a avaliação?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Nossa equipe técnica avalia seu aparelho pessoalmente
                        antes da troca.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Posso cancelar?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Sim, você pode cancelar a qualquer momento antes da
                        finalização.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">
                        Quanto tempo demora?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        O processo completo leva de 2 a 5 dias úteis.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-white font-medium mb-2">
                        E se meu iPhone valer menos?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Reavaliamos e você decide se aceita a nova proposta ou
                        cancela.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
