import React from "react";

interface WhyChooseCompreFiProps {
  category?: string;
}

const WhyChooseCompreFi: React.FC<WhyChooseCompreFiProps> = ({ category }) => {
  // Determinar o título e os pontos específicos com base na categoria
  let title = "Por que escolher a CompreFi?";
  let points = [
    "Produtos originais com garantia oficial",
    "Suporte vitalício para todos os produtos adquiridos",
    "Programa de indicações com desconto acumulativo",
    "Economia significativa em comparação com lojas oficiais",
    "Atendimento personalizado por especialistas Apple",
  ];

  // Personalizar pontos com base na categoria
  if (category) {
    if (category.includes("Seminovo")) {
      title = `Por que comprar ${category} na CompreFi?`;
      points = [
        "Todos os aparelhos passam por rigorosa inspeção de qualidade",
        "Garantia de 120 dias para sua tranquilidade",
        "Suporte vitalício para todos os produtos adquiridos",
        "Programa de indicações com desconto acumulativo",
        "Economia de até 40% em comparação com aparelhos novos",
      ];
    } else if (category.includes("Novo")) {
      title = `Por que comprar ${category} na CompreFi?`;
      points = [
        "Produtos originais com 1 ano de garantia oficial Apple",
        "Suporte vitalício para todos os produtos adquiridos",
        "Programa de indicações com desconto acumulativo",
        "Economia significativa em comparação com lojas oficiais",
        "Atendimento personalizado por especialistas Apple",
      ];
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <ul className="space-y-3 text-gray-300">
        {points.map((point, index) => (
          <li key={index} className="flex items-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2 text-[#ff6100] flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WhyChooseCompreFi;
