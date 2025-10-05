import React from "react";

interface ModelStepProps {
  selectedModel: string;
  availableModels: string[];
  onSelect: (model: string) => void;
}

const ModelStep: React.FC<ModelStepProps> = ({
  selectedModel,
  availableModels,
  onSelect,
}) => {
  // Organizar modelos por série
  const organizeModels = (models: string[]) => {
    const series: { [key: string]: string[] } = {};

    models.forEach((model) => {
      if (model.includes("iPhone 16")) {
        if (!series["iPhone 16"]) series["iPhone 16"] = [];
        series["iPhone 16"].push(model);
      } else if (model.includes("iPhone 15")) {
        if (!series["iPhone 15"]) series["iPhone 15"] = [];
        series["iPhone 15"].push(model);
      } else if (model.includes("iPhone 14")) {
        if (!series["iPhone 14"]) series["iPhone 14"] = [];
        series["iPhone 14"].push(model);
      } else if (model.includes("iPhone 13")) {
        if (!series["iPhone 13"]) series["iPhone 13"] = [];
        series["iPhone 13"].push(model);
      } else if (model.includes("iPhone 12")) {
        if (!series["iPhone 12"]) series["iPhone 12"] = [];
        series["iPhone 12"].push(model);
      } else if (model.includes("iPhone 11")) {
        if (!series["iPhone 11"]) series["iPhone 11"] = [];
        series["iPhone 11"].push(model);
      } else if (model.includes("iPhone SE")) {
        if (!series["iPhone SE"]) series["iPhone SE"] = [];
        series["iPhone SE"].push(model);
      }
    });

    // Ordenar modelos dentro de cada série
    Object.keys(series).forEach((key) => {
      series[key].sort((a, b) => {
        // Priorizar modelos Pro Max > Pro > Plus > padrão > mini
        const getOrder = (model: string) => {
          if (model.includes("Pro Max")) return 1;
          if (model.includes("Pro")) return 2;
          if (model.includes("Plus")) return 3;
          if (model.includes("mini")) return 5;
          return 4; // padrão
        };
        return getOrder(a) - getOrder(b);
      });
    });

    return series;
  };

  const modelSeries = organizeModels(availableModels);
  const seriesOrder = [
    "iPhone 16",
    "iPhone 15",
    "iPhone 14",
    "iPhone 13",
    "iPhone 12",
    "iPhone 11",
    "iPhone SE",
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        {/* <h2 className="text-2xl font-bold text-white mb-2">
          Qual iPhone você tem atualmente?
        </h2> */}
        <p className="text-gray-400">
          Selecione o modelo exato do seu iPhone para um cálculo preciso
        </p>
      </div>

      <div className="space-y-6">
        {seriesOrder.map((series) => {
          if (!modelSeries[series]) return null;

          return (
            <div key={series} className="space-y-3">
              <h3 className="text-lg font-semibold text-blue-400 border-b border-gray-700 pb-2">
                {series}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {modelSeries[series].map((model) => (
                  <button
                    key={model}
                    onClick={() => onSelect(model)}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${
                        selectedModel === model
                          ? "border-blue-500 bg-blue-500 bg-opacity-20 text-white"
                          : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{model}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          {getModelDescription(model)}
                        </p>
                      </div>

                      {selectedModel === model && (
                        <div className="text-blue-400">
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
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedModel && (
        <div className="mt-6 p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-green-400 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-green-300">
              <span className="font-medium">{selectedModel}</span> selecionado!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const getModelDescription = (model: string): string => {
  if (model.includes("Pro Max")) return "Tela maior, câmeras Pro";
  if (model.includes("Pro")) return "Câmeras profissionais";
  if (model.includes("Plus")) return "Tela maior";
  if (model.includes("mini")) return "Compacto";
  if (model.includes("SE")) return "Clássico com Touch ID";
  return "Modelo padrão";
};

export default ModelStep;
