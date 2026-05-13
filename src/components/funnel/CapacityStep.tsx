import React from "react";
import {
  Smartphone,
  Camera,
  Video,
  Briefcase,
  Film,
  HardDrive,
  CheckCircle2,
  Info,
} from "lucide-react";

interface CapacityStepProps {
  selectedCapacity: string;
  availableCapacities: string[];
  modelName: string;
  onSelect: (capacity: string) => void;
}

const CapacityStep: React.FC<CapacityStepProps> = ({
  selectedCapacity,
  availableCapacities,
  modelName,
  onSelect,
}) => {
  const getCapacityDescription = (capacity: string): string => {
    switch (capacity) {
      case "64GB":
        return "Básico - Fotos e apps essenciais";
      case "128GB":
        return "Padrão - Uso moderado";
      case "256GB":
        return "Avançado - Muitas fotos e vídeos";
      case "512GB":
        return "Profissional - Uso intenso";
      case "1TB":
        return "Máximo - Criadores de conteúdo";
      default:
        return "Capacidade de armazenamento";
    }
  };

  const getCapacityIcon = (capacity: string): React.ReactNode => {
    const iconProps = { size: 28, className: "text-current" };
    switch (capacity) {
      case "64GB":
        return <Smartphone {...iconProps} />;
      case "128GB":
        return <Camera {...iconProps} />;
      case "256GB":
        return <Video {...iconProps} />;
      case "512GB":
        return <Briefcase {...iconProps} />;
      case "1TB":
        return <Film {...iconProps} />;
      default:
        return <HardDrive {...iconProps} />;
    }
  };

  const getCapacityColor = (capacity: string): string => {
    switch (capacity) {
      case "64GB":
        return "border-gray-500 bg-gray-800";
      case "128GB":
        return "border-blue-500 bg-blue-900";
      case "256GB":
        return "border-green-500 bg-green-900";
      case "512GB":
        return "border-purple-500 bg-purple-900";
      case "1TB":
        return "border-yellow-500 bg-yellow-900";
      default:
        return "border-gray-500 bg-gray-800";
    }
  };

  if (availableCapacities.length === 0) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          {/* <h2 className="text-2xl font-bold text-white mb-2">
            Capacidade de Armazenamento
          </h2> */}
          <p className="text-gray-400">
            Carregando opções disponíveis para {modelName}...
          </p>
        </div>

        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        {/* <h2 className="text-2xl font-bold text-white mb-2">
          Qual a capacidade de armazenamento?
        </h2> */}
        <p className="text-gray-400">
          Selecione a capacidade do seu{" "}
          <span className="text-blue-400 font-medium">{modelName}</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {availableCapacities.map((capacity) => (
          <button
            key={capacity}
            onClick={() => onSelect(capacity)}
            className={`
              p-6 rounded-lg border-2 transition-all duration-200 text-left
              ${
                selectedCapacity === capacity
                  ? "border-blue-500 bg-blue-500 bg-opacity-20 text-white transform scale-105"
                  : `${getCapacityColor(capacity)} bg-opacity-20 hover:bg-opacity-30 text-gray-300 hover:border-opacity-70`
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div>{getCapacityIcon(capacity)}</div>

                <div>
                  <p className="text-xl font-bold">{capacity}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {getCapacityDescription(capacity)}
                  </p>
                </div>
              </div>

              {selectedCapacity === capacity && (
                <div className="text-blue-400">
                  <CheckCircle2 size={24} />
                </div>
              )}
            </div>
          </button>
        ))}
      </div>

      {selectedCapacity && (
        <div className="mt-6 p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
          <div className="flex items-center">
            <CheckCircle2
              size={20}
              className="text-green-400 mr-2 flex-shrink-0"
            />
            <p className="text-green-300">
              <span className="font-medium">{selectedCapacity}</span>{" "}
              selecionado para seu {modelName}
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
              <strong>Como verificar:</strong> Vá em Ajustes → Geral → Sobre. A
              capacidade aparece em "Capacidade" ou você pode ver em Ajustes →
              Geral → Armazenamento do iPhone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CapacityStep;
