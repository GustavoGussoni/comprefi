import React from "react";
import {
  Smartphone,
  Battery,
  Camera,
  ScanFace,
  Volume2,
  Mic,
  CircleDot,
  ToggleLeft,
  Plug,
  User,
  Fingerprint,
  Package,
  Wrench,
  CircleCheck,
  Check,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";

interface PartsStepProps {
  hasParts: boolean;
  whichParts: string;
  onSelectHasParts: (has: boolean) => void;
  onSelectWhichParts: (parts: string) => void;
}

const PartsStep: React.FC<PartsStepProps> = ({
  hasParts,
  whichParts,
  onSelectHasParts,
  onSelectWhichParts,
}) => {
  const commonParts = [
    "Tela",
    "Bateria",
    "Câmera traseira",
    "Câmera frontal",
    "Alto-falante",
    "Microfone",
    "Botão home",
    "Botões laterais",
    "Conector de carregamento",
    "Face ID",
    "Touch ID",
    "Traseira/Chassi",
  ];

  const handlePartToggle = (part: string) => {
    const currentParts = whichParts.split(", ").filter((p) => p.trim() !== "");

    if (currentParts.includes(part)) {
      // Remove a peça
      const newParts = currentParts.filter((p) => p !== part);
      onSelectWhichParts(newParts.join(", "));
    } else {
      // Adiciona a peça
      const newParts = [...currentParts, part];
      onSelectWhichParts(newParts.join(", "));
    }
  };

  const getPartIcon = (part: string): React.ReactNode => {
    const iconProps = { size: 18, className: "text-current" };
    const iconMap: { [key: string]: React.ReactNode } = {
      Tela: <Smartphone {...iconProps} />,
      Bateria: <Battery {...iconProps} />,
      "Câmera traseira": <Camera {...iconProps} />,
      "Câmera frontal": <ScanFace {...iconProps} />,
      "Alto-falante": <Volume2 {...iconProps} />,
      Microfone: <Mic {...iconProps} />,
      "Botão home": <CircleDot {...iconProps} />,
      "Botões laterais": <ToggleLeft {...iconProps} />,
      "Conector de carregamento": <Plug {...iconProps} />,
      "Face ID": <User {...iconProps} />,
      "Touch ID": <Fingerprint {...iconProps} />,
      "Traseira/Chassi": <Package {...iconProps} />,
    };
    return iconMap[part] || <Wrench {...iconProps} />;
  };

  const selectedParts = whichParts.split(", ").filter((p) => p.trim() !== "");

  return (
    <div className="space-y-6">
      <div className="text-center">
        {/* <h2 className="text-2xl font-bold text-white mb-2">
          Já trocou alguma peça do seu iPhone?
        </h2> */}
        <p className="text-gray-400">
          Peças trocadas podem afetar o valor. Seja transparente para uma
          avaliação precisa.
        </p>
      </div>

      {/* Sim/Não Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            onSelectHasParts(false);
            onSelectWhichParts("");
          }}
          className={`
            p-6 rounded-lg border-2 transition-all duration-200 text-center
            ${
              !hasParts
                ? "border-green-500 bg-green-500 bg-opacity-20 text-white"
                : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300"
            }
          `}
        >
          <div className="flex flex-col items-center space-y-3">
            <CircleCheck size={40} className="text-current" />
            <div>
              <p className="text-lg font-semibold">Não</p>
              <p className="text-sm text-gray-400">
                Todas as peças são originais
              </p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectHasParts(true)}
          className={`
            p-6 rounded-lg border-2 transition-all duration-200 text-center
            ${
              hasParts
                ? "border-orange-500 bg-orange-500 bg-opacity-20 text-white"
                : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300"
            }
          `}
        >
          <div className="flex flex-col items-center space-y-3">
            <Wrench size={40} className="text-current" />
            <div>
              <p className="text-lg font-semibold">Sim</p>
              <p className="text-sm text-gray-400">
                Algumas peças foram trocadas
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Parts Selection */}
      {hasParts && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-orange-400 mb-2">
              Quais peças foram trocadas?
            </h3>
            <p className="text-gray-400 text-sm">
              Selecione todas as peças que foram substituídas
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {commonParts.map((part) => (
              <button
                key={part}
                onClick={() => handlePartToggle(part)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 text-left
                  ${
                    selectedParts.includes(part)
                      ? "border-orange-500 bg-orange-500 bg-opacity-20 text-white"
                      : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300"
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <div>{getPartIcon(part)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{part}</p>
                  </div>
                  {selectedParts.includes(part) && (
                    <div className="text-orange-400">
                      <Check size={16} />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Custom Parts Input */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-300">
              Outras peças ou detalhes adicionais:
            </label>
            <textarea
              value={whichParts}
              onChange={(e) => onSelectWhichParts(e.target.value)}
              placeholder="Ex: Tela, Bateria, ou descreva outras peças trocadas..."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none resize-none"
              rows={3}
            />
            <p className="text-xs text-gray-400">
              Você pode editar manualmente ou usar os botões acima para
              selecionar
            </p>
          </div>
        </div>
      )}

      {/* Status Message */}
      {hasParts !== undefined && (
        <div
          className={`
          p-4 rounded-lg border
          ${
            !hasParts
              ? "bg-green-900 bg-opacity-30 border-green-700"
              : "bg-orange-900 bg-opacity-30 border-orange-700"
          }
        `}
        >
          <div className="flex items-center">
            <div className="mr-2 flex-shrink-0">
              {!hasParts ? (
                <CheckCircle2 size={20} className="text-green-400" />
              ) : (
                <AlertTriangle size={20} className="text-orange-400" />
              )}
            </div>

            <p
              className={`
              ${!hasParts ? "text-green-300" : "text-orange-300"}
            `}
            >
              {!hasParts
                ? "Ótimo! Peças originais mantêm o valor do seu iPhone."
                : selectedParts.length > 0
                  ? `Peças trocadas detectadas: ${selectedParts.join(", ")}. Isso exigirá cotação manual.`
                  : "Por favor, especifique quais peças foram trocadas."}
            </p>
          </div>
        </div>
      )}

      {/* Warning for Manual Quotation */}
      {hasParts && selectedParts.length > 0 && (
        <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
          <div className="flex items-start">
            <AlertTriangle
              size={20}
              className="text-yellow-400 mr-2 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-yellow-300 text-sm">
                <strong>Cotação Manual Necessária:</strong> Peças trocadas
                requerem avaliação individual. Você receberá uma cotação
                personalizada em até 3 horas por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <div className="flex items-start">
          <Info size={20} className="text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-blue-300 text-sm">
              <strong>Por que perguntamos:</strong> Peças não originais ou
              reparos podem afetar a funcionalidade e valor de revenda. Nossa
              avaliação considera a qualidade e origem de cada componente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsStep;
