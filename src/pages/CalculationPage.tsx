import React, { useState, useEffect } from "react";

interface CalculationPageProps {
  formData: {
    modeloAtual: string;
    capacidadeAtual: string;
    modeloDesejado: string;
  };
  onComplete: (result: any) => void;
  onError: (error: string) => void;
}

const CalculationPage: React.FC<CalculationPageProps> = ({
  formData,
  onComplete,
  onError,
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);

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
      title: `Gerando cálculo específico para trocar ${formData.modeloAtual} por ${formData.modeloDesejado}`,
      description: "Calculando valor final da sua troca",
      duration: 2000,
      icon: "🧮",
    },
  ];

  useEffect(() => {
    simulateCalculation();
  }, []);

  const simulateCalculation = async () => {
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

    // Simular chamada da API de cálculo
    try {
      // Aqui você faria a chamada real para a API
      // const result = await apiService.calculateTrade(formData);

      // Simulação de resultado
      const mockResult = {
        valorAparelho: 3500,
        valorFinal: 1200,
        temDefeito: false,
        precisaCotacao: false,
        cupomDesconto: "TROCA2H-ABC123",
        descontoExtra: 3,
        tempoExpiracao: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 horas
      };

      // Aguardar um pouco antes de redirecionar
      setTimeout(() => {
        onComplete(mockResult);
      }, 1500);
    } catch (error) {
      console.error("Erro no cálculo:", error);
      onError("Erro ao calcular a troca. Tente novamente.");
    }
  };

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
