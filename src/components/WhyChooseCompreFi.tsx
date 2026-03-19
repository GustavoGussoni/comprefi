import React from "react";
import { Check } from "lucide-react";

interface WhyChooseSectionProps {
  /** Categoria do produto (ex: "iPhones Seminovos", "iPhones Novos", "MacBooks") */
  category?: string;
  /** Título customizado (sobrescreve o título automático baseado na categoria) */
  title?: string;
  /** Pontos customizados (sobrescreve os pontos automáticos baseados na categoria) */
  items?: string[];
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({
  category,
  title: customTitle,
  items: customItems,
}) => {
  // Título e pontos padrão
  let title = "Por que escolher a CompreFi?";
  let points = [
    "Suporte vitalício para todos os produtos adquiridos",
    "Programa de indicações com desconto acumulativo",
    "Entrega presencial na porta da sua casa",
  ];

  // Personalizar com base na categoria
  if (category) {
    if (category.toLowerCase().includes("seminov")) {
      title = `Por que comprar ${category} na CompreFi?`;
      points = [
        "Todos os aparelhos passam por rigorosa inspeção de qualidade",
        "Garantia de 120 dias para sua tranquilidade",
        "Suporte vitalício para todos os produtos adquiridos",
        "Programa de indicações com desconto acumulativo",
        "Economia de até 40% em comparação com aparelhos novos",
      ];
    } else if (category.toLowerCase().includes("nov")) {
      title = `Por que comprar ${category} na CompreFi?`;
      points = [
        "Produtos originais com 1 ano de garantia oficial Apple",
        "Suporte vitalício para todos os produtos adquiridos",
        "Programa de indicações com desconto acumulativo",
        "Economia significativa em comparação com lojas oficiais",
        "Entrega presencial na porta da sua casa",
      ];
    } else {
      title = `Por que comprar ${category} na CompreFi?`;
    }
  }

  // Props customizadas sobrescrevem tudo
  if (customTitle) title = customTitle;
  if (customItems) points = customItems;

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <ul className="space-y-3 text-gray-300">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <Check
              size={24}
              className="mr-2 text-[#ff6100] flex-shrink-0 mt-0.5"
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyChooseSection;
