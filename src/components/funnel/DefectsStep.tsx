import React from "react";

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
    console.log("🔧 CLICOU EM:", defectKey);
    console.log("🔧 DEFEITOS ATUAIS:", selectedDefects);

    const isSelected = selectedDefects.includes(defectKey);
    console.log("🔧 JÁ ESTÁ SELECIONADO?", isSelected);

    if (isSelected) {
      // Remove defeito
      const newDefects = selectedDefects.filter((d) => d !== defectKey);
      console.log("🔧 REMOVENDO - NOVOS DEFEITOS:", newDefects);
      onSelect(newDefects);
    } else {
      // Adiciona defeito
      const newDefects = [...selectedDefects, defectKey];
      console.log("🔧 ADICIONANDO - NOVOS DEFEITOS:", newDefects);
      onSelect(newDefects);
    }
  };

  const getDefectIcon = (defectId: string): string => {
    const iconMap: { [key: string]: string } = {
      nenhum: "✨",
      detalhe_leve: "🔍",
      detalhe_capinha: "🛡️",
      risco_tela: "📱",
      risco_camera: "📷",
      amassado: "🔨",
      tela_quebrada: "💥",
      camera_quebrada: "📸",
      faceid_off: "🚫",
      traseira_quebrada: "🔙",
      outros: "❓",
    };
    return iconMap[defectId] || "⚠️";
  };

  const getDefectColor = (defectId: string, isInstant: boolean): string => {
    if (isInstant) {
      return "border-green-500 bg-green-900";
    } else {
      return "border-orange-500 bg-orange-900";
    }
  };

  const hasManualQuotationDefects = selectedDefects.some((defect) =>
    defectsList.manualQuotation?.some((d) => d.id === defect)
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
              <div className="text-2xl">✨</div>
              <div>
                <p className="font-semibold text-lg">Nenhum defeito</p>
                <p className="text-sm text-gray-400">
                  Meu iPhone está em perfeito estado
                </p>
              </div>
            </div>

            {selectedDefects.includes("nenhum") && (
              <div className="text-green-400">
                <svg
                  className="w-6 h-6"
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
              {defectsList.instantCalculation.map((defect) => {
                console.log("🔍 DEFEITO:", defect);
                return (
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
                        <div className="text-xl">
                          {getDefectIcon(defect.id)}
                        </div>
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
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
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
                    <div className="text-xl">{getDefectIcon(defect.id)}</div>
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
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
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
            <div
              className={`
              w-5 h-5 mr-2
              ${
                selectedDefects.includes("nenhum")
                  ? "text-green-400"
                  : hasManualQuotationDefects
                    ? "text-orange-400"
                    : "text-blue-400"
              }
            `}
            >
              {selectedDefects.includes("nenhum") ? (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : hasManualQuotationDefects ? (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
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
          <svg
            className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
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
