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
    const cleaned = valorPix.replace(/[^\d.,]/g, "");
    const normalized = cleaned.replace(/\./g, "").replace(",", ".");
    const num = parseFloat(normalized);
    return isNaN(num) ? 0 : num;
  }, [valorPix]);

  const simulacoes = useMemo(() => {
    if (valorNumerico <= 0) return [];

    return TAXAS.map(({ parcelas, taxa }) => {
      const divisor = 1 - taxa / 100;
      const valorComTaxa = valorNumerico / divisor;
      const valorParcela = valorComTaxa / parcelas;

      return {
        parcelas,
        taxa,
        valorParcela,
        valorTotal: valorComTaxa,
        textoCopiavel: `${formatCurrency(valorNumerico)} no pix ou ${parcelas}x ${formatCurrency(valorParcela)}`,
      };
    });
  }, [valorNumerico]);

  const handleCopy = async (texto: string, index: number) => {
    try {
      await navigator.clipboard.writeText(texto);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = texto;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-start space-x-3">
        <CreditCard className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            Simulador de Taxas
          </h2>
          <p className="text-gray-400 text-sm">
            Digite o valor no Pix e copie a opção de parcelamento
          </p>
        </div>
      </div>

      {/* Input do valor */}
      <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-gray-800">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Valor do produto no Pix (R$)
        </label>
        <input
          type="text"
          inputMode="numeric"
          value={valorPix}
          onChange={(e) => setValorPix(e.target.value)}
          placeholder="Ex: 7386"
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white text-xl font-mono placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {valorNumerico > 0 && (
          <p className="text-sm text-gray-400 mt-2">
            Valor: <span className="text-white font-medium">{formatCurrency(valorNumerico)}</span>
          </p>
        )}
      </div>

      {/* Lista de simulações — cards no mobile */}
      {simulacoes.length > 0 && (
        <div className="space-y-2">
          {simulacoes.map((sim, index) => (
            <div
              key={sim.parcelas}
              className={`rounded-lg border p-3 sm:p-4 transition-colors ${
                sim.parcelas === 12
                  ? "bg-blue-900/30 border-blue-700"
                  : "bg-gray-900 border-gray-800 hover:border-gray-700"
              }`}
            >
              {/* Linha principal: parcelas + parcela + botão */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-white font-bold text-lg w-10 shrink-0">
                    {sim.parcelas}x
                  </span>
                  <div className="min-w-0">
                    <span className="text-green-400 font-mono font-semibold text-lg">
                      {formatCurrency(sim.valorParcela)}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                      ({sim.taxa}%)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(sim.textoCopiavel, index)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all shrink-0 ${
                    copiedIndex === index
                      ? "bg-green-600 text-white"
                      : "bg-gray-700 hover:bg-gray-600 text-gray-300 active:bg-gray-500"
                  }`}
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              {/* Texto que será copiado — visível para conferência */}
              <p className="text-gray-400 text-xs mt-1.5 font-mono break-words">
                {sim.textoCopiavel}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Info */}
      {valorNumerico > 0 && (
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
          <p className="text-xs text-gray-500">
            <strong className="text-gray-400">Fórmula:</strong> Valor Pix ÷ (1 - taxa%) ÷ parcelas
          </p>
          <p className="text-xs text-gray-500 mt-1">
            <strong className="text-gray-400">Ex 12x:</strong>{" "}
            {formatCurrency(valorNumerico)} ÷ 0,877 ÷ 12 ={" "}
            {formatCurrency(valorNumerico / 0.877 / 12)}
          </p>
        </div>
      )}
    </div>
  );
};

export default SimuladorTaxas;
