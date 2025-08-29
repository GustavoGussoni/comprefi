import React from 'react';

interface QualificationData {
  ondeOuviu: string;
  tempoPensando: string;
  urgenciaTroca: string;
}

interface QualificationOptions {
  ondeOuviu: string[];
  tempoPensando: string[];
  urgenciaTroca: string[];
}

interface QualificationStepProps {
  data: QualificationData;
  options: QualificationOptions;
  onUpdate: (field: string, value: string) => void;
}

const QualificationStep: React.FC<QualificationStepProps> = ({ data, options, onUpdate }) => {
  const getSourceIcon = (source: string): string => {
    const iconMap: { [key: string]: string } = {
      'Instagram': '📷',
      'TikTok': '🎵',
      'Facebook': '👥',
      'YouTube': '📺',
      'Google': '🔍',
      'Indicação': '👨‍👩‍👧‍👦',
      'WhatsApp': '💬',
      'Site': '🌐',
      'Loja física': '🏪',
      'Outros': '❓'
    };
    return iconMap[source] || '📱';
  };

  const getTimeIcon = (time: string): string => {
    const iconMap: { [key: string]: string } = {
      'Primeira vez': '💡',
      'Há 1 semana': '📅',
      'Há 1 mês': '🗓️',
      'Há 2 meses': '📆',
      'Há 3 meses': '🕐',
      'Há 6 meses': '⏰',
      'Há 1 ano': '📅',
      'Há mais de 1 ano': '⏳'
    };
    return iconMap[time] || '🤔';
  };

  const getUrgencyIcon = (urgency: string): string => {
    const iconMap: { [key: string]: string } = {
      'Agora': '🚀',
      'Esta semana': '⚡',
      'Próxima semana': '📅',
      'Daqui 2 semanas': '🗓️',
      'Próximo mês': '📆',
      'Daqui 2 meses': '⏰',
      'Daqui 3 meses': '🕐',
      'Ainda não sei': '🤷‍♂️'
    };
    return iconMap[urgency] || '⏱️';
  };

  const getUrgencyColor = (urgency: string): string => {
    if (urgency === 'Agora' || urgency === 'Esta semana') return 'border-red-500 bg-red-900';
    if (urgency === 'Próxima semana' || urgency === 'Daqui 2 semanas') return 'border-orange-500 bg-orange-900';
    if (urgency === 'Próximo mês') return 'border-yellow-500 bg-yellow-900';
    return 'border-blue-500 bg-blue-900';
  };

  const isComplete = data.ondeOuviu && data.tempoPensando && data.urgenciaTroca;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Últimas perguntas!
        </h2>
        <p className="text-gray-400">
          Essas informações nos ajudam a personalizar sua experiência e oferecer o melhor atendimento.
        </p>
      </div>

      {/* Onde ouviu falar */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-400">
          Onde você ouviu falar sobre a CompreFi?
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {options.ondeOuviu?.map(source => (
            <button
              key={source}
              onClick={() => onUpdate('ondeOuviu', source)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${data.ondeOuviu === source
                  ? 'border-blue-500 bg-blue-500 bg-opacity-20 text-white'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="text-2xl">{getSourceIcon(source)}</div>
                <p className="text-sm font-medium">{source}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Tempo pensando */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-green-400">
          Há quanto tempo você pensa em trocar de iPhone?
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {options.tempoPensando?.map(time => (
            <button
              key={time}
              onClick={() => onUpdate('tempoPensando', time)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${data.tempoPensando === time
                  ? 'border-green-500 bg-green-500 bg-opacity-20 text-white'
                  : 'border-gray-600 bg-gray-800 hover:border-gray-500 hover:bg-gray-750 text-gray-300'
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="text-2xl">{getTimeIcon(time)}</div>
                <p className="text-sm font-medium text-center">{time}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Urgência da troca */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-purple-400">
          Você quer trocar em quanto tempo?
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {options.urgenciaTroca?.map(urgency => (
            <button
              key={urgency}
              onClick={() => onUpdate('urgenciaTroca', urgency)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${data.urgenciaTroca === urgency
                  ? 'border-purple-500 bg-purple-500 bg-opacity-20 text-white'
                  : `${getUrgencyColor(urgency)} bg-opacity-20 hover:bg-opacity-30 text-gray-300`
                }
              `}
            >
              <div className="flex flex-col items-center space-y-2">
                <div className="text-2xl">{getUrgencyIcon(urgency)}</div>
                <p className="text-sm font-medium text-center">{urgency}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="bg-gray-800 rounded-lg p-6 space-y-4">
        <h4 className="text-lg font-semibold text-white">Resumo das suas respostas:</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`
            p-3 rounded-lg border
            ${data.ondeOuviu 
              ? 'border-blue-500 bg-blue-900 bg-opacity-30' 
              : 'border-gray-600 bg-gray-700'
            }
          `}>
            <p className="text-sm text-gray-400">Conheceu a CompreFi via:</p>
            <p className={`font-medium ${data.ondeOuviu ? 'text-blue-300' : 'text-gray-500'}`}>
              {data.ondeOuviu || 'Não informado'}
            </p>
          </div>
          
          <div className={`
            p-3 rounded-lg border
            ${data.tempoPensando 
              ? 'border-green-500 bg-green-900 bg-opacity-30' 
              : 'border-gray-600 bg-gray-700'
            }
          `}>
            <p className="text-sm text-gray-400">Pensa em trocar há:</p>
            <p className={`font-medium ${data.tempoPensando ? 'text-green-300' : 'text-gray-500'}`}>
              {data.tempoPensando || 'Não informado'}
            </p>
          </div>
          
          <div className={`
            p-3 rounded-lg border
            ${data.urgenciaTroca 
              ? 'border-purple-500 bg-purple-900 bg-opacity-30' 
              : 'border-gray-600 bg-gray-700'
            }
          `}>
            <p className="text-sm text-gray-400">Quer trocar em:</p>
            <p className={`font-medium ${data.urgenciaTroca ? 'text-purple-300' : 'text-gray-500'}`}>
              {data.urgenciaTroca || 'Não informado'}
            </p>
          </div>
        </div>
      </div>

      {/* Completion Status */}
      {isComplete && (
        <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-green-300">
              <strong>Perfeito!</strong> Todas as informações foram coletadas. 
              Clique em "Calcular Troca" para ver sua proposta personalizada!
            </p>
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
              <strong>Privacidade garantida:</strong> Suas informações são usadas apenas para personalizar 
              sua experiência e melhorar nossos serviços. Não compartilhamos dados com terceiros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationStep;

