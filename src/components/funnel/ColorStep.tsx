import React, { useState, useEffect } from "react";
import { Check, Info } from "lucide-react";

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

  /**
   * Mapeia nomes de cores (PT-BR, conforme retornados pelo backend)
   * para hex codes reais extraídos do CSS oficial da Apple.
   * Fonte: https://www.cybermoai.com/iphone-color-codes.html
   */
  const getColorHex = (colorName: string): string => {
    const colorMap: { [key: string]: string } = {
      // ── iPhone 16 Pro Max / 16 Pro ──
      "Titânio Natural": "#C2BCB2",
      "Titânio-deserto": "#BFA48F",
      "Titânio Preto": "#3C3C3D",
      "Titânio Branco": "#F2F1ED",

      // ── iPhone 16 Plus / 16 ──
      Ultramarino: "#9AADF6",
      "Verde-acinzentado": "#B0D4D2",
      // Rosa, Preto, Branco do iPhone 16 usam os mesmos hex abaixo

      // ── iPhone 15 Pro Max / 15 Pro ──
      "Titânio Azul": "#2F4452",
      // "Titânio Natural" já mapeado acima (15 Pro usa #837F7D, mas 16 Pro usa #C2BCB2)
      // Para diferenciar, usamos o hex do 16 Pro acima pois é o mais recente.
      // Se precisar distinguir, pode-se usar lógica por modelo.

      // ── iPhone 14 Pro Max / 14 Pro ──
      "Preto-espacial": "#403E3D",
      "Roxo-profundo": "#594F63",

      // ── iPhone 13 Pro Max / 13 Pro ──
      "Azul-Sierra": "#A7C1D9",
      "Verde-alpino": "#576856",
      Grafite: "#54524F",

      // ── iPhone 12 Pro Max / 12 Pro ──
      "Azul-Pacífico": "#2D4E5C",

      // ── iPhone 11 Pro Max / 11 Pro ──
      "Verde Meia-noite": "#4E5851",
      "Cinza-espacial": "#535150",

      // ── Cores compartilhadas (nomes genéricos usados em múltiplos modelos) ──
      Prateado: "#F0F2F2",
      Dourado: "#FAE7CF",
      "Meia-noite": "#222930",
      Estelar: "#FAF6F2",
      Vermelho: "#FC0324",

      // ── Cores base (iPhone 16/15/14/13/12/11 standard) ──
      Preto: "#1F2020",
      Branco: "#FAFAFA",
      Rosa: "#F2ADDA",
      Azul: "#9AADF6",
      Verde: "#AEE1CD",
      Roxo: "#D1CDDA",
      Amarelo: "#FFE681",
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
                      <Check
                        className={`w-6 h-6 ${isLight ? "text-gray-800" : "text-white"}`}
                      />
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
          <Info className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
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
