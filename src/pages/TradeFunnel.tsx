import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "../components/funnel/StepProgress";
import ModelStep from "../components/funnel/ModelStep";
import CapacityStep from "../components/funnel/CapacityStep";
import ColorStep from "../components/funnel/ColorStep";
import BatteryStep from "../components/funnel/BatteryStep";
import DefectsStep from "../components/funnel/DefectsStep";
import PartsStep from "../components/funnel/PartsStep";
import DesiredModelStep from "../components/funnel/DesiredModelStep";
import QualificationStep from "../components/funnel/QualificationStep";
import { apiService } from "../services/api";

export interface FunnelData {
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

const StepHeader: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const stepTitles: { [key: number]: string } = {
    1: "Para começar, qual o seu companheiro atual?",
    2: "Legal! E qual a capacidade de armazenamento dele?",
    3: "Perfeito. Agora, nos diga a cor do seu aparelho.",
    4: "A saúde da bateria é super importante. Como está a do seu?",
    5: "Seu aparelho tem algum detalhe ou defeito que precisamos saber?",
    6: "Alguma peça já foi trocada?",
    7: "Agora a parte divertida! Qual vai ser a sua próxima máquina?",
    8: "Estamos quase lá! Só mais algumas perguntas rápidas.",
  };
  const title = stepTitles[currentStep] || "";
  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-semibold text-funnel-text-primary">
        {title}
      </h2>
    </div>
  );
};

const getProductValue = (product: { model?: string; storage?: string }) => {
  const modelName = product.model || "";
  const storageStr = product.storage || "";

  const getModifierValue = (name: string) => {
    if (name.includes("Pro Max")) return 4;
    if (name.includes("Pro")) return 3;
    if (name.includes("Plus")) return 2;
    return 1;
  };

  const extractGeneration = (name: string) => {
    const match = name.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  // --- FUNÇÃO CORRIGIDA PARA ENTENDER TB e GB ---
  const extractCapacityInGB = (storageString: string) => {
    const numMatch = storageString.match(/\d+/);
    if (!numMatch) return 0;

    const number = parseInt(numMatch[0], 10);

    if (storageString.toUpperCase().includes("TB")) {
      return number * 1024; // Converte Terabytes para Gigabytes
    }
    return number; // Assume que é Gigabytes
  };

  const generation = extractGeneration(modelName.split(" ")[1] || "");
  const modifier = getModifierValue(modelName);
  const capacity = extractCapacityInGB(storageStr);

  return generation * 1000000 + modifier * 100000 + capacity;
};

const sortProducts = (products: any[]) => {
  return products.sort((a, b) => getProductValue(b) - getProductValue(a));
};

const TradeFunnel: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const topOfStepRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);

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

  const [combinations, setCombinations] = useState<any>({});
  const [defectsList, setDefectsList] = useState<any>({});
  const [qualificationOptions, setQualificationOptions] = useState<any>({});

  const [allAvailableIphones, setAllAvailableIphones] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  useEffect(() => {
    loadApiData();
  }, []);

  useEffect(() => {
    if (!funnelData.modeloAtual || allAvailableIphones.length === 0) {
      setFilteredProducts(allAvailableIphones);
      return;
    }

    const currentUserProduct = {
      model: funnelData.modeloAtual,
      storage: funnelData.capacidadeAtual || "0 GB",
    };
    const currentUserValue = getProductValue(currentUserProduct);

    const filtered = allAvailableIphones.filter(
      (p) => getProductValue(p) >= currentUserValue
    );
    setFilteredProducts(filtered);
  }, [funnelData.modeloAtual, funnelData.capacidadeAtual, allAvailableIphones]);

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

      const activeIphones = productsData.filter(
        (p: any) => p.isActive && p.category === "iPhones Novos"
      );

      const sortedIphones = sortProducts(activeIphones);
      setAllAvailableIphones(sortedIphones);
      setFilteredProducts(sortedIphones);
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
      setError("Erro ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleScrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const updateFunnelData = (field: string, value: any) => {
    setFunnelData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep((prev) => prev + 1);
      setTimeout(() => handleScrollTo(topOfStepRef), 100);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setTimeout(() => handleScrollTo(topOfStepRef), 100);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      localStorage.setItem("funnelData", JSON.stringify(funnelData));
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
        return true;
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
      return ["Preto", "Branco", "Azul", "Vermelho"];
    }
  };

  if (loading && currentStep === 1) {
    return (
      <div className="min-h-screen bg-funnel-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-funnel-primary mx-auto mb-4"></div>
          <p className="text-funnel-text-primary">Carregando questionário...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-funnel-background text-funnel-text-primary">
      <div
        className="bg-funnel-surface border-b border-funnel-surface-light"
        ref={topOfStepRef}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-funnel-text-primary mb-2">
              Descubra em 30 segundos quanto seu iPhone vale na troca
            </h1>
            <p className="text-funnel-text-secondary">
              Responda 8 perguntas rápidas e receba uma oferta garantida pelo
              seu aparelho hoje.
            </p>
          </div>
        </div>
      </div>

      <StepProgress currentStep={currentStep} totalSteps={8} />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-funnel-error/20 border border-funnel-error/50 text-funnel-error px-4 py-3 rounded mb-6">
              <p>{error}</p>
              <button
                onClick={() => setError(null)}
                className="mt-2 bg-funnel-error/80 hover:bg-funnel-error px-3 py-1 rounded text-sm text-funnel-text-on-primary"
              >
                Fechar
              </button>
            </div>
          )}

          <div className="bg-funnel-surface rounded-lg p-6 sm:p-8">
            <StepHeader currentStep={currentStep} />

            {currentStep === 1 && (
              <ModelStep
                selectedModel={funnelData.modeloAtual}
                availableModels={Object.keys(combinations)}
                onSelect={(model) => {
                  updateFunnelData("modeloAtual", model);
                  updateFunnelData("capacidadeAtual", "");
                  updateFunnelData("corAtual", "");
                  handleScrollTo(navigationRef);
                }}
              />
            )}
            {currentStep === 2 && (
              <CapacityStep
                selectedCapacity={funnelData.capacidadeAtual}
                availableCapacities={getAvailableCapacities()}
                modelName={funnelData.modeloAtual}
                onSelect={(capacity) => {
                  updateFunnelData("capacidadeAtual", capacity);
                  handleScrollTo(navigationRef);
                }}
              />
            )}
            {currentStep === 3 && (
              <ColorStep
                selectedColor={funnelData.corAtual}
                modelName={funnelData.modeloAtual}
                onSelect={(color) => {
                  updateFunnelData("corAtual", color);
                  handleScrollTo(navigationRef);
                }}
                getAvailableColors={getAvailableColors}
              />
            )}
            {currentStep === 4 && (
              <BatteryStep
                batteryLevel={funnelData.bateriaAtual}
                onSelect={(battery) => {
                  updateFunnelData("bateriaAtual", battery);
                  handleScrollTo(navigationRef);
                }}
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
                onSelectHasParts={(has) => {
                  updateFunnelData("pecasTrocadas", has);
                  if (has === false) {
                    handleScrollTo(navigationRef);
                  }
                }}
                onSelectWhichParts={(parts) => {
                  updateFunnelData("quaisPecas", parts);
                  handleScrollTo(navigationRef);
                }}
              />
            )}
            {currentStep === 7 && (
              <DesiredModelStep
                selectedModel={funnelData.modeloDesejado}
                availableProducts={filteredProducts}
                onSelect={(model) => {
                  updateFunnelData("modeloDesejado", model);
                  handleScrollTo(navigationRef);
                }}
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
                onCompletion={() => handleScrollTo(navigationRef)}
              />
            )}
          </div>

          {currentStep === 8 && (
            <div className="text-center mt-6 p-4 bg-funnel-surface-light rounded-lg">
              <p className="text-funnel-text-secondary">
                Você respondeu tudo! Estamos preparando uma avaliação justa e
                transparente para você. Clique abaixo para ver sua oferta.
              </p>
            </div>
          )}

          <div
            className="flex justify-between items-center mt-8"
            ref={navigationRef}
          >
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="bg-funnel-surface-light hover:bg-gray-700 disabled:bg-gray-800 disabled:cursor-not-allowed text-funnel-text-primary font-medium py-3 px-6 rounded-md transition-colors"
            >
              ← Voltar
            </button>

            <div className="text-center">
              <p className="text-funnel-text-secondary text-sm">
                Passo {currentStep} de 8
              </p>
            </div>

            <button
              onClick={nextStep}
              disabled={!isStepValid() || loading}
              className="bg-funnel-primary hover:opacity-90 disabled:bg-gray-600 disabled:cursor-not-allowed text-funnel-text-on-primary font-bold py-3 px-6 rounded-md transition-colors flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processando...
                </>
              ) : currentStep === 8 ? (
                "Ver Minha Oferta →"
              ) : (
                "Próximo →"
              )}
            </button>
          </div>

          {currentStep === 1 && (
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-900 to-purple-900 rounded-lg border border-blue-700">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Bônus Especial de Primeira Compra!
                </h3>
                <p className="text-blue-200">
                  Responda este questionário e ganhe um desconto especial que
                  não expira! Use quando quiser na sua troca.
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
