import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "./funnel/StepProgress";
import ModelStep from "./funnel/ModelStep";
import CapacityStep from "./funnel/CapacityStep";
import ColorStep from "./funnel/ColorStep";
import BatteryStep from "./funnel/BatteryStep";
import DefectsStep from "./funnel/DefectsStep";
import PartsStep from "./funnel/PartsStep";
import DesiredModelStep from "./funnel/DesiredModelStep";
import QualificationStep from "./funnel/QualificationStep";
import { apiService } from "../services/api";

export interface FunnelData {
  // Aparelho atual
  modeloAtual: string;
  capacidadeAtual: string;
  corAtual: string;
  bateriaAtual: number;

  // Defeitos e peças
  defeitos: string[];
  pecasTrocadas: boolean;
  quaisPecas: string;

  // Aparelho desejado
  modeloDesejado: string;

  // Qualificação
  ondeOuviu: string;
  tempoPensando: string;
  urgenciaTroca: string;
}

const TradeFunnel: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Dados do funil
  const [funnelData, setFunnelData] = useState<FunnelData>({
    modeloAtual: "",
    capacidadeAtual: "",
    corAtual: "",
    bateriaAtual: 100,
    defeitos: [],
    pecasTrocadas: false,
    quaisPecas: "",
    modeloDesejado: "",
    ondeOuviu: "",
    tempoPensando: "",
    urgenciaTroca: "",
  });

  // Dados auxiliares da API
  const [combinations, setCombinations] = useState<any>({});
  const [defectsList, setDefectsList] = useState<any>({});
  const [qualificationOptions, setQualificationOptions] = useState<any>({});
  const [availableProducts, setAvailableProducts] = useState<any[]>([]);

  // Carregar dados da API
  useEffect(() => {
    loadApiData();
  }, []);

  const loadApiData = async () => {
    try {
      setLoading(true);

      const [combData, defectsData, qualData, productsData] = await Promise.all(
        [
          fetch("http://localhost:3000/trade/combinations").then((r) =>
            r.json()
          ),
          fetch("http://localhost:3000/trade/defects").then((r) => r.json()),
          fetch("http://localhost:3000/trade/qualification-options").then((r) =>
            r.json()
          ),
          apiService.getAllProducts(),
        ]
      );

      setCombinations(combData);
      setDefectsList(defectsData);
      setQualificationOptions(qualData);
      setAvailableProducts(productsData.filter((p: any) => p.isActive));
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const updateFunnelData = (field: string, value: any) => {
    console.log("🔧 updateFunnelData CHAMADA:", field, value);
    console.log("🔧 funnelData ANTES:", funnelData);
    console.log("🔧 modeloDesejado ANTES:", funnelData.modeloDesejado);

    setFunnelData((prev) => {
      const newData = { ...prev, [field]: value };
      console.log("🔧 funnelData DEPOIS:", newData);
      console.log("🔧 modeloDesejado DEPOIS:", newData.modeloDesejado);
      return newData;
    });
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Último passo - redirecionar para página de cálculo
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Salvar dados no localStorage para usar na próxima página
      localStorage.setItem("funnelData", JSON.stringify(funnelData));

      // Redirecionar para página de cálculo
      navigate("/calculo-troca");
    } catch (err) {
      console.error("Erro ao processar dados:", err);
      setError("Erro ao processar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 1:
        return !!funnelData.modeloAtual;
      case 2:
        return !!funnelData.capacidadeAtual;
      case 3:
        return !!funnelData.corAtual;
      case 4:
        return funnelData.bateriaAtual > 0;
      case 5:
        return true; // Defeitos são opcionais
      case 6:
        return !funnelData.pecasTrocadas || !!funnelData.quaisPecas;
      case 7:
        return !!funnelData.modeloDesejado;
      case 8:
        return (
          !!funnelData.ondeOuviu &&
          !!funnelData.tempoPensando &&
          !!funnelData.urgenciaTroca
        );
      default:
        return false;
    }
  };

  const getAvailableCapacities = (): string[] => {
    return combinations[funnelData.modeloAtual] || [];
  };

  const getAvailableColors = async (): Promise<string[]> => {
    if (!funnelData.modeloAtual) return [];

    try {
      const response = await fetch(
        `http://localhost:3000/trade/colors/${encodeURIComponent(funnelData.modeloAtual)}`
      );
      const data = await response.json();
      return data.colors || [];
    } catch (err) {
      console.error("Erro ao buscar cores:", err);
      return ["Preto", "Branco", "Azul", "Vermelho"]; // Fallback
    }
  };

  if (loading && currentStep === 1) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-white">Carregando questionário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Calculadora de Troca CompreFi
            </h1>
            <p className="text-gray-400">
              Responda este breve questionário e descubra quanto falta para
              trocar de iPhone
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <StepProgress currentStep={currentStep} totalSteps={8} />

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
              <p>{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 bg-red-700 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Fechar
              </button>
            </div>
          )}

          {/* Step Content */}
          <div className="bg-gray-900 rounded-lg p-8">
            {currentStep === 1 && (
              <ModelStep
                selectedModel={funnelData.modeloAtual}
                availableModels={Object.keys(combinations)}
                onSelect={(model) => {
                  updateFunnelData("modeloAtual", model);
                  // Reset campos dependentes
                  updateFunnelData("capacidadeAtual", "");
                  updateFunnelData("corAtual", "");
                }}
              />
            )}

            {currentStep === 2 && (
              <CapacityStep
                selectedCapacity={funnelData.capacidadeAtual}
                availableCapacities={getAvailableCapacities()}
                modelName={funnelData.modeloAtual}
                onSelect={(capacity) =>
                  updateFunnelData("capacidadeAtual", capacity)
                }
              />
            )}

            {currentStep === 3 && (
              <ColorStep
                selectedColor={funnelData.corAtual}
                modelName={funnelData.modeloAtual}
                onSelect={(color) => updateFunnelData("corAtual", color)}
                getAvailableColors={getAvailableColors}
              />
            )}

            {currentStep === 4 && (
              <BatteryStep
                batteryLevel={funnelData.bateriaAtual}
                onSelect={(battery) =>
                  updateFunnelData("bateriaAtual", battery)
                }
              />
            )}

            {currentStep === 5 && (
              <DefectsStep
                selectedDefects={funnelData.defeitos}
                defectsList={defectsList}
                onSelect={(defects) => updateFunnelData("defeitos", defects)}
              />
            )}

            {currentStep === 6 && (
              <PartsStep
                hasParts={funnelData.pecasTrocadas}
                whichParts={funnelData.quaisPecas}
                onSelectHasParts={(has) =>
                  updateFunnelData("pecasTrocadas", has)
                }
                onSelectWhichParts={(parts) =>
                  updateFunnelData("quaisPecas", parts)
                }
              />
            )}

            {currentStep === 7 && (
              <DesiredModelStep
                selectedModel={funnelData.modeloDesejado}
                availableProducts={availableProducts}
                onSelect={(model) => updateFunnelData("modeloDesejado", model)}
              />
            )}

            {currentStep === 8 && (
              <QualificationStep
                data={{
                  ondeOuviu: funnelData.ondeOuviu,
                  tempoPensando: funnelData.tempoPensando,
                  urgenciaTroca: funnelData.urgenciaTroca,
                }}
                options={qualificationOptions}
                onUpdate={(field, value) =>
                  updateFunnelData(field as keyof FunnelData, value)
                }
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              ← Voltar
            </button>

            <div className="text-center">
              <p className="text-gray-400 text-sm">Passo {currentStep} de 8</p>
            </div>

            <button
              onClick={nextStep}
              disabled={!isStepValid() || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processando...
                </>
              ) : currentStep === 8 ? (
                "Calcular Troca →"
              ) : (
                "Próximo →"
              )}
            </button>
          </div>

          {/* Bonus Message */}
          {currentStep === 1 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg border border-blue-700">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  🎁 Bônus Especial de Primeira Compra!
                </h3>
                <p className="text-blue-200">
                  Responda este questionário de 30 segundos e ganhe um desconto
                  especial que não expira! Use quando quiser na sua troca.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradeFunnel;
