import React, { useState } from 'react';

interface BatteryStepProps {
  batteryLevel: number;
  onSelect: (battery: number) => void;
}

const BatteryStep: React.FC<BatteryStepProps> = ({ batteryLevel, onSelect }) => {
  const [inputValue, setInputValue] = useState<string>(batteryLevel.toString());

  const handleSliderChange = (value: number) => {
    setInputValue(value.toString());
    onSelect(value);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    const numValue = parseInt(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      onSelect(numValue);
    }
  };

  const getBatteryColor = (level: number): string => {
    if (level >= 90) return 'text-green-400';
    if (level >= 80) return 'text-yellow-400';
    if (level >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getBatteryBarColor = (level: number): string => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-yellow-500';
    if (level >= 60) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getBatteryStatus = (level: number): string => {
    if (level === 100) return 'Excelente - Como novo';
    if (level >= 90) return 'Muito boa - Pouco uso';
    if (level >= 80) return 'Boa - Uso normal';
    if (level >= 70) return 'Regular - Uso intenso';
    if (level >= 60) return 'Fraca - Precisa trocar em breve';
    return 'Muito fraca - Troca urgente';
  };

  const getDepreciationInfo = (level: number): { amount: string; color: string } => {
    if (level === 100) return { amount: 'R$ 200', color: 'text-green-400' };
    if (level >= 90) return { amount: 'R$ 400', color: 'text-yellow-400' };
    if (level >= 80) return { amount: 'R$ 1.000', color: 'text-orange-400' };
    return { amount: 'R$ 1.700', color: 'text-red-400' };
  };

  const depreciation = getDepreciationInfo(batteryLevel);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Qual a saúde da bateria do seu iPhone?
        </h2>
        <p className="text-gray-400">
          Vá em Ajustes → Bateria → Saúde da Bateria e Carregamento
        </p>
      </div>

      {/* Battery Visual */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          {/* Battery Icon */}
          <div className="w-32 h-16 border-2 border-gray-600 rounded-lg relative bg-gray-800">
            {/* Battery Fill */}
            <div 
              className={`h-full rounded-md transition-all duration-500 ${getBatteryBarColor(batteryLevel)}`}
              style={{ width: `${batteryLevel}%` }}
            ></div>
            
            {/* Battery Tip */}
            <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-2 h-6 bg-gray-600 rounded-r"></div>
            
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-lg font-bold ${getBatteryColor(batteryLevel)}`}>
                {batteryLevel}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-4">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={batteryLevel}
            onChange={(e) => handleSliderChange(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, 
                #ef4444 0%, 
                #f97316 25%, 
                #eab308 50%, 
                #22c55e 75%, 
                #22c55e 100%)`
            }}
          />
          
          {/* Slider Marks */}
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>0%</span>
            <span>25%</span>
            <span>50%</span>
            <span>75%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Manual Input */}
        <div className="flex items-center justify-center space-x-4">
          <label className="text-gray-300">Ou digite:</label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="100"
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-20 px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white text-center focus:border-blue-500 focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">%</span>
          </div>
        </div>
      </div>

      {/* Battery Status */}
      <div className="bg-gray-800 rounded-lg p-6 space-y-4">
        <div className="text-center">
          <h3 className={`text-lg font-semibold ${getBatteryColor(batteryLevel)}`}>
            {getBatteryStatus(batteryLevel)}
          </h3>
        </div>

        {/* Impact on Value */}
        <div className="border-t border-gray-700 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Impacto no valor:</span>
            <span className={`font-semibold ${depreciation.color}`}>
              -{depreciation.amount}
            </span>
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Quanto será descontado do valor do seu iPhone devido à bateria
          </p>
        </div>

        {/* Quick Select Buttons */}
        <div className="border-t border-gray-700 pt-4">
          <p className="text-sm text-gray-400 mb-3">Seleção rápida:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[100, 95, 85, 75].map(level => (
              <button
                key={level}
                onClick={() => handleSliderChange(level)}
                className={`
                  py-2 px-3 rounded-md text-sm font-medium transition-colors
                  ${batteryLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                `}
              >
                {level}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Help Text */}
      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-blue-300 text-sm">
              <strong>Como verificar:</strong> Vá em Ajustes → Bateria → Saúde da Bateria e Carregamento. 
              O número que aparece em "Capacidade Máxima" é o que você deve informar aqui.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatteryStep;

