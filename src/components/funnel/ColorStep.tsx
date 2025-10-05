import React, { useState, useEffect } from "react";

interface ColorStepProps {
  selectedColor: string;
  modelName: string;
  onSelect: (color: string) => void;
  getAvailableColors: () => Promise<string[]>;
}

const ColorStep: React.FC<ColorStepProps> = ({
  selectedColor,
  modelName,
  onSelect,
  getAvailableColors,
}) => {
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadColors();
  }, [modelName]);

  const loadColors = async () => {
    try {
      setLoading(true);
      const colors = await getAvailableColors();
      setAvailableColors(colors);
    } catch (error) {
      console.error("Erro ao carregar cores:", error);
      // Fallback colors
      setAvailableColors([
        "Preto",
        "Branco",
        "Azul",
        "Vermelho",
        "Rosa",
        "Amarelo",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getColorHex = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      // Cores básicas
      Preto: "#000000",
      Branco: "#FFFFFF",
      Vermelho: "#FF0000",
      Azul: "#0066CC",
      Verde: "#00AA00",
      Rosa: "#FF69B4",
      Roxo: "#8A2BE2",
      Amarelo: "#FFD700",

      // Cores específicas Apple
      Grafite: "#5C5C60",
      Dourado: "#FAD5A5",
      Prateado: "#E3E4E6",
      "Azul Sierra": "#4A90A4",
      "Verde Alpino": "#5F8A5B",
      "Titânio Natural": "#8E8E93",
      "Titânio Azul": "#5E7C8B",
      "Titânio Branco": "#F2F2F7",
      "Titânio Preto": "#1C1C1E",
      "Meia-noite": "#191970",
      "Luz das estrelas": "#F5F5DC",
      "Azul Pacífico": "#1E3A8A",
      Ultramarino: "#4338CA",
      "Verde-azulado": "#0891B2",

      // iPhone 11 cores
      Preto: "#000000",
      Verde: "#4ADE80",
      Amarelo: "#FDE047",
      Roxo: "#A855F7",

      // iPhone 12 cores
      Azul: "#3B82F6",
      Verde: "#10B981",
      Roxo: "#8B5CF6",

      // iPhone 13 cores
      Rosa: "#F472B6",
      Azul: "#60A5FA",

      // iPhone 14 cores
      Azul: "#3B82F6",
      Roxo: "#A855F7",
      Amarelo: "#FCD34D",

      // iPhone 15 cores
      Rosa: "#F9A8D4",
      Amarelo: "#FDE047",
      Verde: "#4ADE80",
      Azul: "#60A5FA",

      // iPhone 16 cores
      Ultramarino: "#4338CA",
      "Verde-azulado": "#0891B2",
      Rosa: "#F472B6",
    };

    return colorMap[colorName] || "#6B7280";
  };

  const getColorDisplayName = (colorName: string): string => {
    // Manter nomes originais da Apple
    return colorName;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Qual a cor do seu iPhone?
          </h2>
          <p className="text-gray-400">
            Carregando cores disponíveis para {modelName}...
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
          Qual a cor do seu iPhone?
        </h2> */}
        <p className="text-gray-400">
          Selecione a cor exata do seu{" "}
          <span className="text-blue-400 font-medium">{modelName}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableColors.map((color) => {
          const hexColor = getColorHex(color);
          const isLight = isLightColor(hexColor);

          return (
            <button
              key={color}
              onClick={() => onSelect(color)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${
                  selectedColor === color
                    ? "border-blue-500 bg-blue-500 bg-opacity-20 text-white transform scale-105"
                    : "border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300"
                }
              `}
            >
              <div className="flex flex-col items-center space-y-3">
                {/* Color Circle */}
                <div
                  className={`
                    w-12 h-12 rounded-full border-2 
                    ${isLight ? "border-gray-400" : "border-gray-600"}
                    ${selectedColor === color ? "ring-4 ring-blue-500 ring-opacity-50" : ""}
                  `}
                  style={{ backgroundColor: hexColor }}
                >
                  {selectedColor === color && (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className={`w-6 h-6 ${isLight ? "text-gray-800" : "text-white"}`}
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

                {/* Color Name */}
                <p className="text-sm font-medium">
                  {getColorDisplayName(color)}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {selectedColor && (
        <div className="mt-6 p-4 bg-green-900 bg-opacity-30 border border-green-700 rounded-lg">
          <div className="flex items-center">
            <div
              className="w-6 h-6 rounded-full border-2 border-green-400 mr-3"
              style={{ backgroundColor: getColorHex(selectedColor) }}
            ></div>
            <p className="text-green-300">
              Cor <span className="font-medium">{selectedColor}</span>{" "}
              selecionada!
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
              <strong>Dica:</strong> A cor exata pode influenciar no valor de
              revenda. Cores mais populares como Preto e Branco geralmente têm
              melhor aceitação no mercado.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine if a color is light
const isLightColor = (hex: string): boolean => {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;

  // Calculate luminance
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.5;
};

const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

export default ColorStep;
