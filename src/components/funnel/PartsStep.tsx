import React from 'react';

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
  onSelectWhichParts 
}) => {
  const commonParts = [
    'Tela',
    'Bateria',
    'Câmera traseira',
    'Câmera frontal',
    'Alto-falante',
    'Microfone',
    'Botão home',
    'Botões laterais',
    'Conector de carregamento',
    'Face ID',
    'Touch ID',
    'Traseira/Chassi'
  ];

  const handlePartToggle = (part: string) => {
    const currentParts = whichParts.split(', ').filter(p => p.trim() !== '');
    
    if (currentParts.includes(part)) {
      // Remove a peça
      const newParts = currentParts.filter(p => p !== part);
      onSelectWhichParts(newParts.join(', '));
    } else {
      // Adiciona a peça
      const newParts = [...currentParts, part];
      onSelectWhichParts(newParts.join(', '));
    }
  };

  const getPartIcon = (part: string): string => {
    const iconMap: { [key: string]: string } = {
      'Tela': '📱',
      'Bateria': '🔋',
      'Câmera traseira': '📷',
      'Câmera frontal': '🤳',
      'Alto-falante': '🔊',
      'Microfone': '🎤',
      'Botão home': '⚪',
      'Botões laterais': '🔘',
      'Conector de carregamento': '🔌',
      'Face ID': '👤',
      'Touch ID': '👆',
      'Traseira/Chassi': '📦'
    };
    return iconMap[part] || '🔧';
  };

  const selectedParts = whichParts.split(', ').filter(p => p.trim() !== '');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Já trocou alguma peça do seu iPhone?
        </h2>
        <p className="text-gray-400">
          Peças trocadas podem afetar o valor. Seja transparente para uma avaliação precisa.
        </p>
      </div>

      {/* Sim/Não Selection */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => {
            onSelectHasParts(false);
            onSelectWhichParts('');
          }}
          className={`
            p-6 rounded-lg border-2 transition-all duration-200 text-center
            ${!hasParts
              ? 'border-green-500 bg-green-500 bg-opacity-20 text-white'
              : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300'
            }
          `}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="text-4xl">✅</div>
            <div>
              <p className="text-lg font-semibold">Não</p>
              <p className="text-sm text-gray-400">Todas as peças são originais</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onSelectHasParts(true)}
          className={`
            p-6 rounded-lg border-2 transition-all duration-200 text-center
            ${hasParts
              ? 'border-orange-500 bg-orange-500 bg-opacity-20 text-white'
              : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300'
            }
          `}
        >
          <div className="flex flex-col items-center space-y-3">
            <div className="text-4xl">🔧</div>
            <div>
              <p className="text-lg font-semibold">Sim</p>
              <p className="text-sm text-gray-400">Algumas peças foram trocadas</p>
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
            {commonParts.map(part => (
              <button
                key={part}
                onClick={() => handlePartToggle(part)}
                className={`
                  p-3 rounded-lg border-2 transition-all duration-200 text-left
                  ${selectedParts.includes(part)
                    ? 'border-orange-500 bg-orange-500 bg-opacity-20 text-white'
                    : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300'
                  }
                `}
              >
                <div className="flex items-center space-x-2">
                  <div className="text-lg">{getPartIcon(part)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{part}</p>
                  </div>
                  {selectedParts.includes(part) && (
                    <div className="text-orange-400">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
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
              Você pode editar manualmente ou usar os botões acima para selecionar
            </p>
          </div>
        </div>
      )}

      {/* Status Message */}
      {hasParts !== undefined && (
        <div className={`
          p-4 rounded-lg border
          ${!hasParts
            ? 'bg-green-900 bg-opacity-30 border-green-700'
            : 'bg-orange-900 bg-opacity-30 border-orange-700'
          }
        `}>
          <div className="flex items-center">
            <div className={`
              w-5 h-5 mr-2
              ${!hasParts ? 'text-green-400' : 'text-orange-400'}
            `}>
              {!hasParts ? (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            
            <p className={`
              ${!hasParts ? 'text-green-300' : 'text-orange-300'}
            `}>
              {!hasParts ? (
                'Ótimo! Peças originais mantêm o valor do seu iPhone.'
              ) : selectedParts.length > 0 ? (
                `Peças trocadas detectadas: ${selectedParts.join(', ')}. Isso exigirá cotação manual.`
              ) : (
                'Por favor, especifique quais peças foram trocadas.'
              )}
            </p>
          </div>
        </div>
      )}

      {/* Warning for Manual Quotation */}
      {hasParts && selectedParts.length > 0 && (
        <div className="bg-yellow-900 bg-opacity-30 border border-yellow-700 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-yellow-300 text-sm">
                <strong>Cotação Manual Necessária:</strong> Peças trocadas requerem avaliação individual. 
                Você receberá uma cotação personalizada em até 3 horas por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-400 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-blue-300 text-sm">
              <strong>Por que perguntamos:</strong> Peças não originais ou reparos podem afetar a funcionalidade 
              e valor de revenda. Nossa avaliação considera a qualidade e origem de cada componente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartsStep;

