import React, { useState } from "react";
import { apiService } from "../../services/api";

interface CalculatedPrices {
  pixPrice: string;
  installmentPrice: string;
  originalPrice: string;
  rawValues: {
    pixPrice: number;
    installmentPrice: number;
    originalPrice: number;
  };
}

const PriceCalculator: React.FC = () => {
  const [cost, setCost] = useState<string>("");
  const [freight, setFreight] = useState<string>("100");
  const [category, setCategory] = useState<string>("");
  const [calculatedPrices, setCalculatedPrices] =
    useState<CalculatedPrices | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "iPhones Novos",
    "iPhones Seminovos",
    "Macbooks",
    "iPads",
    "Apple Watch",
    "Acessórios",
  ];

  const handleCalculate = async () => {
    if (!cost || isNaN(Number(cost))) {
      setError("Por favor, insira um custo válido");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await apiService.calculatePrices({
        cost: Number(cost),
        freight: Number(freight) || 100,
        category: category || undefined,
      });

      setCalculatedPrices(result);
    } catch (err) {
      console.error("Erro ao calcular preços:", err);
      setError("Erro ao calcular preços. Verifique se a API está rodando.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCost("");
    setFreight("100");
    setCategory("");
    setCalculatedPrices(null);
    setError(null);
  };

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const formatCurrency = (value: number) => {
  //   return new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL",
  //   }).format(value);
  // };

  return (
    <div className="bg-gray-900 rounded-lg p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          🧮 Calculadora de Preços
        </h2>
        <p className="text-gray-400">
          Calcule automaticamente os preços de venda baseado no custo do produto
        </p>
      </div>

      {/* Formulário */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Custo do Produto *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              R$
            </span>
            <input
              type="number"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              placeholder="4500.00"
              step="0.01"
              className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Frete
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              R$
            </span>
            <input
              type="number"
              value={freight}
              onChange={(e) => setFreight(e.target.value)}
              placeholder="100.00"
              step="0.01"
              className="w-full pl-10 pr-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Padrão: R$ 100 | Macbooks: R$ 220
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Categoria
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Afeta o cálculo do frete</p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
          onClick={handleCalculate}
          disabled={loading || !cost}
          className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Calculando...
            </>
          ) : (
            <>🧮 Calcular Preços</>
          )}
        </button>
        <button
          onClick={handleClear}
          className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
        >
          🗑️ Limpar
        </button>
      </div>

      {/* Erro */}
      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {/* Resultados */}
      {calculatedPrices && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">
            💰 Preços Calculados
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Preço Original */}
            <div className="bg-purple-900 border border-purple-700 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">🏷️</div>
              <h4 className="text-lg font-semibold text-purple-300 mb-2">
                Preço Original
              </h4>
              <div className="text-3xl font-bold text-white mb-2">
                {calculatedPrices.originalPrice}
              </div>
              <p className="text-sm text-purple-400">Para alavancagem</p>
            </div>

            {/* Preço Parcelado */}
            <div className="bg-blue-900 border border-blue-700 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">💳</div>
              <h4 className="text-lg font-semibold text-blue-300 mb-2">
                Parcela 12x
              </h4>
              <div className="text-3xl font-bold text-white mb-2">
                {calculatedPrices.installmentPrice}
              </div>
              <p className="text-sm text-blue-400">12x sem juros</p>
            </div>

            {/* Preço PIX */}
            <div className="bg-green-900 border border-green-700 rounded-lg p-6 text-center">
              <div className="text-3xl mb-2">💳</div>
              <h4 className="text-lg font-semibold text-green-300 mb-2">
                Preço PIX
              </h4>
              <div className="text-3xl font-bold text-white mb-2">
                {calculatedPrices.pixPrice}
              </div>
              <p className="text-sm text-green-400">À vista no PIX</p>
            </div>
          </div>

          {/* Fórmulas */}
          {/* <div className="mt-8 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              📊 Fórmulas Utilizadas:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-400">
              <div>
                <strong className="text-green-400">PIX:</strong> (Custo + Frete)
                ÷ 0,9
              </div>
              <div>
                <strong className="text-blue-400">Parcela:</strong> (PIX ÷
                0,8651) ÷ 12
              </div>
              <div>
                <strong className="text-purple-400">Original:</strong> (Custo +
                Frete) ÷ 0,84
              </div>
            </div>
          </div> */}

          {/* Texto para Proposta */}
          <div className="mt-6 p-4 bg-gray-700 rounded-lg">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">
              📝 Texto para Proposta:
            </h4>
            <div className="bg-gray-800 p-3 rounded text-sm text-gray-300 font-mono">
              <p>
                <strong>Produto:</strong> [Nome do produto] - de{" "}
                {calculatedPrices.originalPrice} por{" "}
                <strong className="text-blue-400">
                  12x {calculatedPrices.installmentPrice}
                </strong>{" "}
                sem juros, ou{" "}
                <strong className="text-green-400">
                  {calculatedPrices.pixPrice}
                </strong>{" "}
                no PIX <br />
                <br />
                incluso:
                <br />
                - Capinha;
                <br />
                - Suporte Eterno;
                <br />
                - Até 20% OFF em Acessórios Originais Apple;
                <br />
                - Troca Garantida nos Próximos Lançamentos da Apple; <br />-
                Participação no programa de indicações com desconto progressivo.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceCalculator;
