import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Funnel } from "recharts";

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
  valorBase: number; // ← JÁ TEM
  valorFinal: number;
  depreciacao: number; // ← JÁ TEM
  depreciacaoBateria: number; // ← ADICIONAR
  depreciacaoDefeitos: number; // ← ADICIONAR
  precoProduto: number; // ← ADICIONAR
  valorComDesconto: number; // ← ADICIONAR
  precisaCotacao: boolean;
  motivoCotacao?: string;
  produtoDesejado: any;
}

interface ContactForm {
  nome: string;
  email: string;
  whatsapp: string;
  observacoes: string;
}

const ResultPage: React.FC = () => {
  const navigate = useNavigate();
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [result, setResult] = useState<TradeResult | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>({
    nome: "",
    email: "",
    whatsapp: "",
    observacoes: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(7200); // 2 horas em segundos
  const [showFAQ, setShowFAQ] = useState<boolean>(false);

  useEffect(() => {
    loadData();
    startTimer();
  }, []);

  const loadData = () => {
    try {
      // Carregar dados do funil
      const funnelDataStr = localStorage.getItem("funnelData");
      console.log(funnelDataStr);

      if (funnelDataStr) {
        setFunnelData(JSON.parse(funnelDataStr));
      }
      console.log(funnelData);

      // Verificar se dados são válidos

      // Carregar resultado do cálculo
      const resultStr = localStorage.getItem("tradeResult");
      if (resultStr) {
        setResult(JSON.parse(resultStr));
      } else {
        // Fallback se não tiver resultado
        setResult({
          valorBase: 3500,
          valorAparelho: 1450, // ← ADICIONAR
          valorFinal: 6216.67, // ← ALTERAR
          depreciacao: 1350, // ← ALTERAR
          depreciacaoBateria: 1000, // ← ADICIONAR
          depreciacaoDefeitos: 350, // ← ADICIONAR
          precoProduto: 7666.67, // ← ADICIONAR
          valorComDesconto: 6030.17, // ← ADICIONAR
          precisaCotacao: false,
          produtoDesejado: {
            model: "iPhone 15 Pro",
            pixPrice: "R$ 7.666,67", // ← ALTERAR
          },
        });
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      navigate("/trocar-de-iphone");
    }
  };

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return value;
  };
  const formatCurrency = (value: number | undefined | null): string => {
    if (!value || isNaN(value) || value === undefined || value === null) {
      return "R$ 0,00";
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setContactForm((prev) => ({ ...prev, whatsapp: formatted }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simular envio
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Preparar dados para WhatsApp
      const message = `
🔥 *NOVA SOLICITAÇÃO DE TROCA - CompreFi*

👤 *Cliente:* ${contactForm.nome}
📧 *Email:* ${contactForm.email}
📱 *WhatsApp:* ${contactForm.whatsapp}

📱 *TROCA DESEJADA:*
• De: ${funnelData?.modeloAtual} ${funnelData?.capacidadeAtual} ${funnelData?.bateriaAtual}%
• Para: ${result?.produtoDesejado?.model}

💰 *VALORES:*
• Valor base: R$ ${result?.produtoDesejado.pixPrice}
• Valor final: R$ ${formatCurrency(result?.valorFinal)} 
• Depreciação: R$ ${result?.depreciacao}

🔋 *ESTADO DO APARELHO:*
• Bateria: ${funnelData?.bateriaAtual}%
• Defeitos: ${funnelData?.defeitos?.join(", ") || "Nenhum"}
• Peças trocadas: ${funnelData?.pecasTrocadas ? "Sim" : "Não"}

📝 *Observações:* ${contactForm.observacoes || "Nenhuma"}

⏰ *Gerado em:* ${new Date().toLocaleString("pt-BR")}
    `.trim();

      // Redirecionar para WhatsApp
      const whatsappUrl = `https://wa.me/5534999252590?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      // Mostrar sucesso
      alert(
        "Dados enviados com sucesso! Você será redirecionado para o WhatsApp."
      );
    } catch (err) {
      console.error("Erro ao enviar:", err);
      alert("Erro ao enviar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Carregando resultado...</p>
        </div>
      </div>
    );
  }

  const valorTroca = result.valorFinal;
  const precoDesejado = parseFloat(
    result.produtoDesejado?.pixPrice
      ?.replace(/[^\d,]/g, "")
      .replace(",", ".") || "4800"
  );
  const valorPagar = Math.max(0, precoDesejado - valorTroca);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              🎉 Sua Troca Está Pronta!
            </h1>
            <p className="text-gray-400 text-lg">
              Calculamos o melhor valor para sua troca. Confira os detalhes
              abaixo.
            </p>
          </div>

          {/* Timer de Urgência */}
          <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-6 mb-8 border border-red-700">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                ⏰ Oferta Especial por Tempo Limitado!
              </h3>
              <p className="text-orange-200 mb-3">
                Desconto extra de R$ 200 válido por apenas:
              </p>
              <div className="text-3xl font-mono font-bold text-yellow-300">
                {formatTime(timeLeft)}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Resultado da Troca */}
            <div className="space-y-6">
              {/* Valor Principal */}
              <div className="bg-gradient-to-br from-green-900 to-emerald-900 rounded-lg p-8 border border-green-700">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-white mb-4">
                    💰 Valor da Sua Troca
                  </h2>
                  <div className="text-5xl font-bold text-green-300 mb-2">
                    R$ {valorTroca.toLocaleString("pt-BR")}
                  </div>
                  <p className="text-green-200">
                    Pelo seu {funnelData?.modeloAtual}{" "}
                    {funnelData?.capacidadeAtual}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Valor base do aparelho:</span>
                  <span className="text-white">
                    {formatCurrency(result?.valorBase)}
                  </span>
                </div>

                <div className="flex justify-between text-red-400">
                  <span>Depreciação bateria:</span>
                  <span>- {formatCurrency(result?.depreciacaoBateria)}</span>
                </div>

                <div className="flex justify-between text-red-400">
                  <span>Depreciação defeitos:</span>
                  <span>- {formatCurrency(result?.depreciacaoDefeitos)}</span>
                </div>

                <hr className="border-gray-700" />

                <div className="flex justify-between text-lg font-bold">
                  <span className="text-white">Valor final aparelho:</span>
                  <span className="text-green-400">
                    {formatCurrency(result?.valorAparelho)}
                  </span>
                </div>
              </div>

              {/* Resumo da Troca */}
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  📋 Resumo da Troca
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valor original:</span>
                    <span className="text-white">
                      {result?.produtoDesejado.pixPrice || 0}
                    </span>
                  </div>

                  <div className="flex justify-between text-red-400">
                    <span>Depreciação total:</span>
                    <span>- R$ {formatCurrency(result?.valorAparelho)}</span>
                  </div>

                  <hr className="border-gray-700" />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Valor final:</span>
                    <span className="text-green-400">
                      R$ {formatCurrency(result?.valorFinal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Produto Desejado */}
              <div className="bg-blue-900 bg-opacity-50 rounded-lg p-6 border border-blue-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  📱 iPhone Desejado
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Modelo:</span>
                    <span className="text-white">
                      {result.produtoDesejado?.model}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Preço PIX:</span>
                    <span className="text-white">
                      {result.produtoDesejado?.pixPrice}
                    </span>
                  </div>

                  <hr className="border-blue-700" />

                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-white">Você paga apenas:</span>
                    <span className="text-yellow-400">
                      R$ {valorPagar.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bônus */}
              <div className="bg-purple-900 bg-opacity-50 rounded-lg p-6 border border-purple-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  🎁 Bônus Inclusos
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-white">Capinha premium grátis;</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-white">
                      Até 20% OFF em acessórios originais Apple;
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-white">Suporte Eterno;</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-white">
                      Desconto de + R$ 200 (por 2h)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">
                  📞 Finalize Sua Troca
                </h3>
                <p className="text-gray-400 mb-6">
                  Preencha seus dados e nossa equipe entrará em contato em até
                  30 minutos!
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
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
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
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
                      value={contactForm.whatsapp}
                      onChange={handlePhoneChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="(11) 99999-9999"
                      maxLength={15}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Observações (opcional)
                    </label>
                    <textarea
                      value={contactForm.observacoes}
                      onChange={(e) =>
                        setContactForm((prev) => ({
                          ...prev,
                          observacoes: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="Alguma informação adicional..."
                      rows={3}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 text-white font-bold py-4 px-6 rounded-md transition-all duration-200 flex items-center justify-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">💬</span>
                        Finalizar via WhatsApp
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* FAQ */}
              <div className="bg-gray-900 rounded-lg border border-gray-700">
                <button
                  onClick={() => setShowFAQ(!showFAQ)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <h3 className="text-xl font-bold text-white">
                    ❓ Dúvidas Frequentes
                  </h3>
                  <span className="text-gray-400">{showFAQ ? "−" : "+"}</span>
                </button>

                {showFAQ && (
                  <div className="px-6 pb-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Como funciona a troca?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Você nos envia seu iPhone atual e recebe o novo. Todo
                        processo é feito com segurança e rastreamento.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        Quanto tempo demora?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Em média 24-48 horas após recebermos seu aparelho.
                        Processo completo em até 1 semana.
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-white mb-2">
                        E se eu desistir?
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Sem problemas! Devolvemos seu aparelho sem custo
                        adicional em até 7 dias.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
