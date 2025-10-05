// src/pages/CalculationPage.tsx

import PageTransition from "@/components/PageTransition";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Database,
  Filter,
  Calculator,
  Check,
  Loader,
  AlertTriangle,
} from "lucide-react";
import { apiService } from "../services/api"; // Certifique-se que o apiService está acessível

// --- Interfaces (sem alterações) ---
interface FunnelData {
  modeloAtual: string;
  capacidadeAtual: string;
  corAtual: string;
  bateriaAtual: number;
  defeitos: string[];
  pecasTrocadas: boolean;
  quaisPecas: string;
  modeloDesejado: string; // Este é o ID do produto
  ondeOuviu: string;
  tempoPensando: string;
  urgenciaTroca: string;
}
interface TradeResult {
  valorAparelho: number;
  valorFinal: number;
  temDefeito: boolean;
  precisaCotacao: boolean;
  valorBase: number;
  depreciacaoBateria: number;
  depreciacaoDefeitos: number;
  precoProduto: number;
  valorComDesconto: number;
  produtoDesejado?: any;
}

const CalculationPage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    {
      id: 1,
      title: "Analisando o valor de mercado do seu aparelho",
      description:
        "Consultando nosso banco de dados para garantir o preço mais justo para o seu iPhone.",
      duration: 2500,
      icon: <Database size={24} />,
    },
    {
      id: 2,
      title: "Avaliando as condições informadas",
      description:
        "Considerando a saúde da bateria e os detalhes que você nos deu para uma avaliação precisa.",
      duration: 3000,
      icon: <Filter size={24} />,
    },
    {
      id: 3,
      title: "Calculando sua oferta de troca personalizada",
      description:
        "Combinando todos os dados para gerar a melhor proposta de troca possível para você.",
      duration: 2000,
      icon: <Calculator size={24} />,
    },
  ];

  useEffect(() => {
    loadDataAndCalculate();
  }, []);

  const loadDataAndCalculate = async () => {
    try {
      const funnelDataStr = localStorage.getItem("funnelData");
      if (!funnelDataStr) {
        setError(
          "Dados do questionário não encontrados. Por favor, preencha o formulário novamente."
        );
        return;
      }
      const data: FunnelData = JSON.parse(funnelDataStr);
      await simulateCalculation(data);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError(
        "Ocorreu um erro inesperado ao processar sua solicitação. Tente novamente."
      );
    }
  };

  const simulateCalculation = async (data: FunnelData) => {
    for (let stepIndex = 0; stepIndex < steps.length; stepIndex++) {
      setCurrentStep(stepIndex);
      const step = steps[stepIndex];
      const stepDuration = step.duration;
      const progressIncrement = 100 / steps.length;
      const startProgress = stepIndex * progressIncrement;
      const animationSteps = 50;
      const progressStep = progressIncrement / animationSteps;
      const timeStep = stepDuration / animationSteps;

      for (let i = 0; i <= animationSteps; i++) {
        await new Promise((resolve) => setTimeout(resolve, timeStep));
        setProgress(Math.min(startProgress + i * progressStep, 100));
      }
      if (stepIndex < steps.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    }

    setIsComplete(true);

    try {
      const result = await calculateTrade(data);
      localStorage.setItem("tradeResult", JSON.stringify(result));
      setTimeout(() => {
        navigate("/resultado-troca");
      }, 1500);
    } catch (error) {
      console.error("Erro no cálculo:", error);
      setError(
        "Não foi possível calcular sua proposta no momento. Por favor, tente novamente mais tarde."
      );
    }
  };

  // --- FUNÇÃO CORRIGIDA ---
  const calculateTrade = async (data: FunnelData): Promise<TradeResult> => {
    // 1. Buscar todos os produtos para encontrar o nome do modelo pelo ID
    const allProducts = await apiService.getAllProducts();
    const foundProduct = allProducts.find((p) => p.id === data.modeloDesejado);

    if (!foundProduct) {
      throw new Error(
        `Produto com ID ${data.modeloDesejado} não encontrado no frontend.`
      );
    }

    // 2. Montar o corpo da requisição com o NOME do modelo
    const requestBody = {
      modeloAtual: data.modeloAtual,
      capacidadeAtual: data.capacidadeAtual,
      corAtual: data.corAtual,
      bateriaAtual: data.bateriaAtual,
      defeitos: data.defeitos,
      pecasTrocadas: data.pecasTrocadas,
      quaisPecas: data.quaisPecas,
      modeloDesejado: foundProduct.model, // Usando o nome do modelo
    };

    // 3. Fazer a chamada à API
    const response = await fetch("http://localhost:3000/trade/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${errorText}`);
    }

    const apiResult = await response.json();

    // 4. Mapear o resultado (sem alterações aqui)
    return {
      valorAparelho: apiResult.valorAparelho,
      valorFinal: apiResult.valorFinal,
      temDefeito: apiResult.temDefeito,
      precisaCotacao: apiResult.precisaCotacao,
      valorBase: apiResult.valorBase,
      depreciacaoBateria: apiResult.depreciacaoBateria,
      depreciacaoDefeitos: apiResult.depreciacaoDefeitos,
      precoProduto: apiResult.precoProduto,
      valorComDesconto: apiResult.valorComDesconto,
      produtoDesejado: apiResult.produtoDesejado,
    };
  };

  if (error) {
    return (
      <div className="min-h-screen bg-funnel-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertTriangle className="text-funnel-error mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-bold text-funnel-text-primary mb-4">
            Ops! Algo deu errado
          </h2>
          <p className="text-funnel-text-secondary mb-6">{error}</p>
          <button
            onClick={() => navigate("/trocar-de-iphone")}
            className="bg-funnel-primary hover:opacity-90 text-funnel-text-on-primary font-medium py-3 px-6 rounded-md transition-colors"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen bg-funnel-background flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-funnel-primary/20 rounded-full flex items-center justify-center mb-4 border-2 border-funnel-primary/30">
                <Loader className="w-10 h-10 text-funnel-primary animate-spin" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-funnel-text-primary mb-4">
              Calculando sua proposta...
            </h1>
            <p className="text-funnel-text-secondary text-lg">
              Estamos analisando seus dados para gerar a melhor oferta para
              você!
            </p>
          </div>

          <div className="mb-12">
            <div className="flex justify-between text-sm text-funnel-text-secondary mb-2">
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-funnel-surface-light rounded-full h-3 mb-4">
              <div
                className="bg-funnel-primary h-3 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg border-2 transition-all duration-500 ${
                    isActive
                      ? "border-funnel-primary/80 bg-funnel-primary/10"
                      : isCompleted
                        ? "border-funnel-success/50 bg-funnel-success/10"
                        : "border-funnel-surface-light bg-funnel-surface"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      isActive
                        ? "bg-funnel-primary text-funnel-text-on-primary"
                        : isCompleted
                          ? "bg-funnel-success text-white"
                          : "bg-funnel-surface-light text-funnel-text-secondary"
                    }`}
                  >
                    {isCompleted ? (
                      <Check size={24} />
                    ) : isActive ? (
                      <div className="animate-spin">{step.icon}</div>
                    ) : (
                      step.icon
                    )}
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-lg ${
                        isActive
                          ? "text-funnel-primary"
                          : isCompleted
                            ? "text-funnel-success"
                            : "text-funnel-text-secondary"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-funnel-text-secondary text-sm mt-1">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {isComplete && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 bg-funnel-success/10 border border-funnel-success/50 rounded-lg px-6 py-3">
                <Check className="w-6 h-6 text-funnel-success" />
                <p className="text-funnel-success font-medium">
                  Cálculo concluído! Redirecionando para sua proposta...
                </p>
              </div>
            </div>
          )}

          <div className="mt-12 bg-funnel-surface rounded-lg p-6 border border-funnel-surface-light">
            <h4 className="text-funnel-text-primary font-semibold mb-3">
              💡 Enquanto você espera, sabia que na CompreFi:
            </h4>
            <div className="text-funnel-text-secondary text-sm space-y-2">
              <p>
                • A **Troca é Garantida**: Nossa equipe vai até você para
                avaliar e entregar seu novo iPhone em mãos.
              </p>
              <p>
                • Você tem **Suporte Eterno**: Qualquer dúvida sobre seu
                aparelho, estaremos aqui para ajudar, para sempre.
              </p>
              <p>
                • Nossos clientes economizam, em média, **25% a mais** do que em
                outras lojas na troca.
              </p>
              <p>
                • Você ganha acesso ao nosso **Programa de Indicações** para
                economizar ainda mais no futuro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CalculationPage;
