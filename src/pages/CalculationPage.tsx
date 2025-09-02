import React, { useState, useEffect } from "react";
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
  temDefeito: boolean;
  precisaCotacao: boolean;
  cupomDesconto?: string; // Pode ser opcional
  descontoExtra?: number; // Pode ser opcional
  tempoExpiracao?: Date; // Pode ser opcional
  produtoDesejado?: any;

  // NOVAS VARIÁVEIS
  valorBase?: number; // Valor base do aparelho
  depreciacaoBateria?: number; // Depreciação por bateria
  depreciacaoDefeitos?: number; // Depreciação por defeitos
  valorAPagar?: number; // Valor a pagar
  valorComDesconto?: number; // Valor com desconto
}

const CalculationPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);

  const steps = [
    {
      id: 1,
      title: "Pesquisando no banco de dados de seminovos da CompreFi",
      description: "Verificando valores atualizados do seu iPhone",
      duration: 2000,
      icon: "🔍",
    },
    {
      id: 2,
      title: "Filtrando as especificações e selecionando melhor opção",
      description: "Analisando condições e defeitos informados",
      duration: 2500,
      icon: "⚙️",
    },
    {
      id: 3,
      title: "Gerando cálculo específico para sua troca",
      description: "Calculando valor final da sua troca",
      duration: 2000,
      icon: "🧮",
    },
  ];

  useEffect(() => {
    loadDataAndCalculate();
  }, []);

  const loadDataAndCalculate = async () => {
    try {
      // Pegar dados do localStorage
      const funnelDataStr = localStorage.getItem("funnelData");
      if (!funnelDataStr) {
        setError(
          "Dados do questionário não encontrados. Refaça o questionário."
        );
        return;
      }

      const data: FunnelData = JSON.parse(funnelDataStr);
      setFunnelData(data);

      // Atualizar título da etapa 3 com dados reais
      steps[2].title = `Gerando cálculo específico para trocar ${data.modeloAtual} por produto desejado`;

      // Iniciar simulação
      await simulateCalculation(data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao processar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const simulateCalculation = async (data: FunnelData) => {
    // Simular progresso através das 3 etapas
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      setCurrentStep(stepIndex);

      const step = steps[stepIndex];
      const stepDuration = step.duration;
      const progressIncrement = 100 / steps.length;
      const startProgress = stepIndex * progressIncrement;

      // Animar progresso da etapa atual
      const animationDuration = stepDuration;
      const animationSteps = 50;
      const progressStep = progressIncrement / animationSteps;
      const timeStep = animationDuration / animationSteps;

      for (let i = 0; i <= animationSteps; i++) {
        await new Promise((resolve) => setTimeout(resolve, timeStep));
        const currentProgress = startProgress + i * progressStep;
        setProgress(Math.min(currentProgress, 100));
      }

      // Pequena pausa entre etapas
      if (stepIndex < steps.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    // Finalizar cálculo
    setIsComplete(true);

    // Fazer chamada real para API ou usar fallback
    try {
      const result = await calculateTrade(data);

      // Salvar resultado no localStorage
      localStorage.setItem("tradeResult", JSON.stringify(result));

      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        navigate("/resultado-troca");
      }, 1500);
    } catch (error) {
      console.error("Erro no cálculo:", error);
      setError("Erro ao calcular a troca. Tente novamente.");
    }
  };

  const calculateTrade = async (data: FunnelData): Promise<TradeResult> => {
    try {
      console.log("🔧 Iniciando cálculo de troca...");

      // Buscar produto desejado (se necessário)
      let produtoDesejado;
      try {
        const response = await fetch(
          `http://localhost:3000/products/${data.modeloDesejado}`
        );
        if (response.ok) {
          produtoDesejado = await response.json();
          console.log("✅ Produto encontrado:", produtoDesejado);
        } else {
          console.warn("⚠️ Produto não encontrado, usando fallback");
          produtoDesejado = {
            id: data.modeloDesejado,
            model: "iPhone 15 Pro",
            pixPrice: "R$ 4.800,00",
          };
        }
      } catch (err) {
        console.warn("⚠️ Erro ao buscar produto, usando fallback:", err);
        produtoDesejado = {
          id: data.modeloDesejado,
          model: "iPhone 15 Pro",
          pixPrice: "R$ 4.800,00",
        };
      }

      // Preparar dados para API de troca (Formato da Tentativa 4)
      const tradeData = {
        modeloAtual: data.modeloAtual,
        capacidadeAtual: data.capacidadeAtual,
        corAtual: data.corAtual, // Este campo é obrigatório!
        bateriaAtual: data.bateriaAtual,
        defeitos: data.defeitos, // Array de strings
        pecasTrocadas: data.pecasTrocadas,
        quaisPecas: data.quaisPecas,
        modeloDesejado: produtoDesejado.model, // Nome do modelo
      };

      console.log("🔧 Dados enviados para API:", tradeData);

      const tradeResponse = await fetch(
        "http://localhost:3000/trade/calculate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tradeData),
        }
      );

      if (!tradeResponse.ok) {
        const errorText = await tradeResponse.text();
        console.error("❌ Erro da API:", errorText);
        throw new Error(`API Error: ${errorText}`);
      }

      const apiResult = await tradeResponse.json();
      console.log("✅ Resultado da API:", apiResult);

      // Mapear o resultado da API para o formato esperado pelo front-end
      return {
        valorAparelho: apiResult.valorAparelho || 0,
        valorFinal: apiResult.valorFinal || 0,
        temDefeito: data.defeitos.length > 0,
        precisaCotacao: apiResult.precisaCotacao || false,
        cupomDesconto:
          apiResult.cupomDesconto ||
          "TROCA2H-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        descontoExtra: apiResult.descontoExtra || 0,
        tempoExpiracao: apiResult.tempoExpiracao
          ? new Date(apiResult.tempoExpiracao)
          : new Date(Date.now() + 2 * 60 * 60 * 1000),
        produtoDesejado: produtoDesejado,

        // NOVAS VARIÁVEIS PARA O FRONT-END
        valorBase: apiResult.valorBase || 0, // Adicione se a API retornar
        depreciacaoBateria: apiResult.depreciacaoBateria || 0, // Adicione se a API retornar
        depreciacaoDefeitos: apiResult.depreciacaoDefeitos || 0, // Adicione se a API retornar
        valorAPagar: apiResult.valorAPagar || 0, // Adicione se a API retornar
        valorComDesconto: apiResult.valorComDesconto || 0, // Adicione se a API retornar
      };
    } catch (err) {
      console.error("❌ Erro no cálculo de troca:", err);
      // Fallback inteligente (já existente)
      const valorBase = getValorBase(data.modeloAtual);
      const depreciacao = calculateDepreciacao(data);
      const valorFinal = Math.max(500, valorBase - depreciacao);

      return {
        valorAparelho: valorBase,
        valorFinal: valorFinal,
        temDefeito: data.defeitos.length > 0,
        precisaCotacao: data.defeitos.length > 3,
        cupomDesconto:
          "TROCA2H-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
        descontoExtra: 200,
        tempoExpiracao: new Date(Date.now() + 2 * 60 * 60 * 1000),
        produtoDesejado: {
          model: "iPhone 15 Pro",
          pixPrice: "R$ 4.800,00",
        },
        // NOVAS VARIÁVEIS PARA O FRONT-END (fallback)
        valorBase: valorBase,
        depreciacaoBateria: (100 - data.bateriaAtual) * 10, // Exemplo de cálculo
        depreciacaoDefeitos: data.defeitos.length * 300, // Exemplo de cálculo
        valorAPagar: valorFinal, // No fallback, valor a pagar é o valor final
        valorComDesconto: valorFinal * 0.97, // Exemplo de cálculo
      };
    }
  };

  const getValorBase = (modelo: string): number => {
    if (modelo.includes("16")) return 4500;
    if (modelo.includes("15")) return 4000;
    if (modelo.includes("14")) return 3500;
    if (modelo.includes("13")) return 3000;
    if (modelo.includes("12")) return 2500;
    return 2000;
  };

  const calculateDepreciacao = (data: FunnelData): number => {
    let depreciacao = 0;

    // Depreciação por bateria
    if (data.bateriaAtual < 80) depreciacao += (80 - data.bateriaAtual) * 20;

    // Depreciação por defeitos
    depreciacao += data.defeitos.length * 300;

    // Depreciação por peças trocadas
    if (data.pecasTrocadas) depreciacao += 500;

    return depreciacao;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Ops! Algo deu errado
          </h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => navigate("/questionario")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors"
          >
            Refazer Questionário
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-10 h-10 text-white animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Calculando sua proposta...
          </h1>
          <p className="text-gray-400 text-lg">
            Estamos analisando todos os dados para gerar a melhor oferta para
            você!
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progresso</span>
            <span>{Math.round(progress)}%</span>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => {
            const isActive = currentStep === index;
            const isCompleted = currentStep > index;
            const isPending = currentStep < index;

            return (
              <div
                key={step.id}
                className={`
                  flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-500
                  ${
                    isActive
                      ? "border-blue-500 bg-blue-900 bg-opacity-30"
                      : isCompleted
                        ? "border-green-500 bg-green-900 bg-opacity-30"
                        : "border-gray-600 bg-gray-800"
                  }
                `}
              >
                {/* Icon/Status */}
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-xl
                  ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : isCompleted
                        ? "bg-green-500 text-white"
                        : "bg-gray-700 text-gray-400"
                  }
                `}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : isActive ? (
                    <div className="animate-spin">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    </div>
                  ) : (
                    step.icon
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3
                    className={`
                    font-semibold text-lg
                    ${
                      isActive
                        ? "text-blue-300"
                        : isCompleted
                          ? "text-green-300"
                          : "text-gray-400"
                    }
                  `}
                  >
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {step.description}
                  </p>
                </div>

                {/* Loading Animation for Active Step */}
                {isActive && (
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg px-6 py-3">
              <svg
                className="w-6 h-6 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-green-300 font-medium">
                Cálculo concluído! Redirecionando para sua proposta...
              </p>
            </div>
          </div>
        )}

        {/* Fun Facts */}
        <div className="mt-12 bg-gray-800 rounded-lg p-6">
          <h4 className="text-white font-semibold mb-3">💡 Você sabia?</h4>
          <div className="text-gray-400 text-sm space-y-2">
            <p>• A CompreFi já realizou mais de 10.000 trocas de iPhones</p>
            <p>• Nossos clientes economizam em média R$ 800 na troca</p>
            <p>• 98% dos nossos clientes recomendam nossos serviços</p>
            <p>• Garantia de 1 ano em todos os produtos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationPage;
