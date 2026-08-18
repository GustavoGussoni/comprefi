import React, { useState, useMemo } from "react";
import { Copy, Check, CreditCard } from "lucide-react";

// Taxas por número de parcelas (1x a 21x)
const TAXAS: { parcelas: number; taxa: number }[] = [
  { parcelas: 1, taxa: 2.99 },
  { parcelas: 2, taxa: 4.69 },
  { parcelas: 3, taxa: 5.49 },
  { parcelas: 4, taxa: 6.29 },
  { parcelas: 5, taxa: 7.09 },
  { parcelas: 6, taxa: 7.89 },
  { parcelas: 7, taxa: 8.3 },
  { parcelas: 8, taxa: 9.1 },
  { parcelas: 9, taxa: 9.9 },
  { parcelas: 10, taxa: 10.7 },
  { parcelas: 11, taxa: 11.5 },
  { parcelas: 12, taxa: 12.3 },
  { parcelas: 13, taxa: 12.71 },
  { parcelas: 14, taxa: 13.34 },
  { parcelas: 15, taxa: 13.97 },
  { parcelas: 16, taxa: 14.6 },
  { parcelas: 17, taxa: 15.23 },
  { parcelas: 18, taxa: 15.86 },
  { parcelas: 19, taxa: 16.0 },
  { parcelas: 20, taxa: 16.49 },
  { parcelas: 21, taxa: 17.0 },
];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const SimuladorTaxas: React.FC = () => {
  const [valorPix, setValorPix] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const valorNumerico = useMemo(() => {
    // Remove tudo que não é número ou vírgula/ponto
    const cleaned = valorPix.replace(/[^\d.,]/g, "");
    // Trata vírgula como decimal
    const normalized = cleaned.replace(/\./g, "").replace(",", ".");
    const num = parseFloat(normalized);
    return isNaN(num) ? 0 : num;
  }, [valorPix]);

  const simulacoes = useMemo(() => {
    if (valorNumerico <= 0) return [];

    return TAXAS.map(({ parcelas, taxa }) => {
      const divisor = 1 - taxa / 100; // ex: 12,3% → 0,877
      const valorComTaxa = valorNumerico / divisor;
      const valorParcela = valorComTaxa / parcelas;
      const valorTotal = valorComTaxa;

      return {
        parcelas,
        taxa,
        valorParcela,
        valorTotal,
        textoCopiavel: `${formatCurrency(valorNumerico)} no pix ou ${parcelas}x ${formatCurrency(valorParcela)}`,
      };
    });
  }, [valorNumerico]);

  const handleCopy = async (texto: string, index: number) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Fallback para navegadores sem suporte
      const textarea = document.createElement("textarea");
      textarea.value = texto;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValorPix(e.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <CreditCard className="w-6 h-6 text-blue-400" />
        <div>
          <h2 className="text-2xl font-bold text-white">
            Simulador de Taxas da Maquininha
          </h2>
          <p className="text-gray-400 text-sm">
            Digite o valor no Pix e veja todas as opções de parcelamento
          </p>
        </div>
      </div>

      {/* Input do valor */}
      <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Valor do produto no Pix (R$)
        </label>
        <input
          type="text"
          value={valorPix}
          onChange={handleInputChange}
          placeholder="Ex: 7386"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-xl font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {valorNumerico > 0 && (
          <p className="text-sm text-gray-400 mt-2">
            Valor interpretado: {formatCurrency(valorNumerico)}
          </p>
        )}
      </div>

      {/* Tabela de simulações */}
      {simulacoes.length > 0 && (
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="grid grid-cols-[60px_70px_1fr_auto] md:grid-cols-[80px_80px_150px_1fr_auto] gap-0 bg-gray-800 px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
            <span>Parcelas</span>
            <span>Taxa</span>
            <span className="hidden md:block">Valor Parcela</span>
            <span>Texto para copiar</span>
            <span className="text-right">Ação</span>
          </div>

          <div className="divide-y divide-gray-800">
            {simulacoes.map((sim, index) => (
              <div
                key={sim.parcelas}
                className={`grid grid-cols-[60px_70px_1fr_auto] md:grid-cols-[80px_80px_150px_1fr_auto] gap-0 px-4 py-3 items-center hover:bg-gray-800/50 transition-colors ${
                  sim.parcelas === 12
                    ? "bg-blue-900/20 border-l-2 border-l-blue-500"
                    : ""
                }`}
              >
                <span className="text-white font-bold">{sim.parcelas}x</span>
                <span className="text-yellow-400 text-sm font-mono">
                  {sim.taxa}%
                </span>
                <span className="hidden md:block text-green-400 font-mono font-medium">
                  {formatCurrency(sim.valorParcela)}
                </span>
                <span className="text-gray-300 text-sm font-mono truncate pr-2">
                  {sim.textoCopiavel}
                </span>
                <button
                  onClick={() => handleCopy(sim.textoCopiavel, index)}
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded text-xs font-medium transition-all ${
                    copiedIndex === index
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                  }`}
                  title="Copiar"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info */}
      {valorNumerico > 0 && (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <p className="text-xs text-gray-500">
            <strong className="text-gray-400">Fórmula:</strong> Valor Pix ÷
            (1 - taxa%) ÷ nº parcelas = valor da parcela
          </p>
          <p className="text-xs text-gray-500 mt-1">
            <strong className="text-gray-400">Exemplo 12x:</strong>{" "}
            {formatCurrency(valorNumerico)} ÷ 0,877 ÷ 12 ={" "}
            {formatCurrency(valorNumerico / 0.877 / 12)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SimuladorTaxas;
