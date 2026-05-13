import React from "react";
import {
  Sparkles,
  Search,
  ShieldCheck,
  Smartphone,
  Camera,
  Hammer,
  Zap,
  CameraOff,
  ScanFace,
  RotateCcw,
  HelpCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
  Check,
} from "lucide-react";

interface DefectsStepProps {
  selectedDefects: string[];
  defectsList: {
    instantCalculation: Array<{
      id: string;
      label: string;
      description: string;
      impact: string;
    }>;
    manualQuotation: Array<{ id: string; label: string; description: string }>;
  };
  onSelect: (defects: string[]) => void;
}

const DefectsStep: React.FC<DefectsStepProps> = ({
  selectedDefects,
  defectsList,
  onSelect,
}) => {
  const handleDefectToggle = (defectKey: string) => {
    const isSelected = selectedDefects.includes(defectKey);

    if (isSelected) {
      const newDefects = selectedDefects.filter((d) => d !== defectKey);
      onSelect(newDefects);
    } else {
      const newDefects = [...selectedDefects, defectKey];
      onSelect(newDefects);
    }
  };

  const getDefectIcon = (defectId: string): React.ReactNode => {
    const iconProps = { size: 20, className: "text-current" };
    const iconMap: { [key: string]: React.ReactNode } = {
      nenhum: <Sparkles {...iconProps} />,
      detalhe_leve: <Search {...iconProps} />,
      detalhe_capinha: <ShieldCheck {...iconProps} />,
      risco_tela: <Smartphone {...iconProps} />,
      risco_camera: <Camera {...iconProps} />,
      amassado: <Hammer {...iconProps} />,
      tela_quebrada: <Zap {...iconProps} />,
      camera_quebrada: <CameraOff {...iconProps} />,
      faceid_off: <ScanFace {...iconProps} />,
      traseira_quebrada: <RotateCcw {...iconProps} />,
      outros: <HelpCircle {...iconProps} />,
    };
    return iconMap[defectId] || <AlertTriangle {...iconProps} />;
  };

  const getDefectColor = (defectId: string, isInstant: boolean): string => {
    if (isInstant) {
      return "border-green-500 bg-green-900";
    } else {
      return "border-orange-500 bg-orange-900";
    }
  };

  const hasManualQuotationDefects = selectedDefects.some((defect) =>
    defectsList.manualQuotation?.some((d) => d.id === defect),
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        {/* <h2 className="text-2xl font-bold text-white mb-2">
          Seu iPhone tem algum defeito?
        </h2> */}
        <p className="text-gray-400">
          Seja honesto para obtermos o valor mais preciso. Você pode selecionar
          múltiplos defeitos.
        </p>
      </div>

      {/* Nenhum Defeito - Opção Especial */}
      <div className="mb-6">
        <button
          onClick={() =>
            onSelect(selectedDefects.includes("nenhum") ? [] : ["nenhum"])
          }
          className={`
            w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
            ${
              selectedDefects.includes("nenhum")
                ? "border-green-500 bg-green-500 bg-opacity-20 text-white"
                : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Sparkles size={24} className="text-current" />
              <div>
                <p className="font-semibold text-lg">Nenhum defeito</p>
                <p className="text-sm text-gray-400">
                  Meu iPhone está em perfeito estado
                </p>
              </div>
            </div>

            {selectedDefects.includes("nenhum") && (
              <div className="text-green-400">
                <CheckCircle2 size={24} />
              </div>
            )}
          </div>
        </button>
      </div>

      {/* Defeitos com Cálculo Instantâneo */}
      {!selectedDefects.includes("nenhum") &&
        defectsList.instantCalculation && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <h3 className="text-lg font-semibold text-green-400">
                Defeitos Leves (Cálculo Instantâneo)
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {defectsList.instantCalculation.map((defect) => (
                <button
                  key={defect.id}
                  onClick={() => handleDefectToggle(defect.id)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-200 text-left
                    ${
                      selectedDefects.includes(defect.id)
                        ? "border-green-500 bg-green-500 bg-opacity-20 text-white"
                        : "border-green-600 bg-green-900 bg-opacity-20 hover:bg-opacity-30 text-gray-300"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div>{getDefectIcon(defect.id)}</div>
                      <div>
                        <p className="font-medium">{defect.label}</p>
                        <p className="text-xs text-gray-400">
                          {defect.description}
                        </p>
                        <p className="text-xs text-red-400 font-medium">
                          {defect.impact}
                        </p>
                      </div>
                    </div>

                    {selectedDefects.includes(defect.id) && (
                      <div className="text-green-400">
                        <Check size={20} />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

      {/* Defeitos com Cotação Manual */}
      {!selectedDefects.includes("nenhum") && defectsList.manualQuotation && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-orange-400">
              Defeitos Graves (Cotação Manual - até 3h)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {defectsList.manualQuotation.map((defect) => (
              <button
                key={defect.id}
                onClick={() => handleDefectToggle(defect.id)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 text-left
                  ${
                    selectedDefects.includes(defect.id)
                      ? "border-orange-500 bg-orange-500 bg-opacity-20 text-white"
                      : "border-orange-600 bg-orange-900 bg-opacity-20 hover:bg-opacity-30 text-gray-300"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div>{getDefectIcon(defect.id)}</div>
                    <div>
                      <p className="font-medium">{defect.label}</p>
                      <p className="text-xs text-gray-400">
                        {defect.description}
                      </p>
                      <p className="text-xs text-orange-400 font-medium">
                        Cotação manual
                      </p>
                    </div>
                  </div>

                  {selectedDefects.includes(defect.id) && (
                    <div className="text-orange-400">
                      <Check size={20} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Status Message */}
      {selectedDefects.length > 0 && (
        <div
          className={`
          p-4 rounded-lg border
          ${
            selectedDefects.includes("nenhum")
              ? "bg-green-900 bg-opacity-30 border-green-700"
              : hasManualQuotationDefects
                ? "bg-orange-900 bg-opacity-30 border-orange-700"
                : "bg-blue-900 bg-opacity-30 border-blue-700"
          }
        `}
        >
          <div className="flex items-center">
            <div className="mr-2 flex-shrink-0">
              {selectedDefects.includes("nenhum") ? (
                <CheckCircle2 size={20} className="text-green-400" />
              ) : hasManualQuotationDefects ? (
                <AlertTriangle size={20} className="text-orange-400" />
              ) : (
                <Info size={20} className="text-blue-400" />
              )}
            </div>

            <p
              className={`
              ${
                selectedDefects.includes("nenhum")
                  ? "text-green-300"
                  : hasManualQuotationDefects
                    ? "text-orange-300"
                    : "text-blue-300"
              }
            `}
            >
              {selectedDefects.includes("nenhum")
                ? "Perfeito! Seu iPhone está em ótimo estado."
                : hasManualQuotationDefects
                  ? "Defeitos graves detectados. Você receberá uma cotação personalizada em até 3 horas."
                  : `${selectedDefects.length} defeito(s) selecionado(s). Cálculo será feito instantaneamente.`}
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <div className="flex items-start">
          <Info size={20} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-300 text-sm">
              <strong>Seja honesto:</strong> Informações precisas garantem uma
              avaliação justa. Defeitos não declarados podem resultar na recusa
              da troca ou renegociação do valor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefectsStep;
