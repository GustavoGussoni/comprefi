import React from 'react';

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between items-center">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div key={stepNumber} className="flex flex-col items-center">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-blue-500 text-white ring-4 ring-blue-500 ring-opacity-30' 
                        : 'bg-gray-600 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    stepNumber
                  )}
                </div>
                
                <span className={`
                  text-xs mt-2 text-center max-w-16 leading-tight
                  ${isCurrent ? 'text-blue-400 font-medium' : 'text-gray-500'}
                `}>
                  {getStepLabel(stepNumber)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Current Step Description */}
        <div className="text-center mt-4">
          <p className="text-gray-300 text-sm">
            {getCurrentStepDescription(currentStep)}
          </p>
        </div>
      </div>
    </div>
  );
};

const getStepLabel = (step: number): string => {
  const labels = [
    'Modelo',
    'Memória',
    'Cor',
    'Bateria',
    'Estado',
    'Peças',
    'Desejo',
    'Perfil'
  ];
  return labels[step - 1] || '';
};

const getCurrentStepDescription = (step: number): string => {
  const descriptions = [
    'Qual iPhone você tem atualmente?',
    'Qual a capacidade de armazenamento?',
    'Qual a cor do seu iPhone?',
    'Qual a saúde da bateria?',
    'Seu iPhone tem algum defeito?',
    'Já trocou alguma peça?',
    'Qual iPhone você deseja?',
    'Algumas perguntas finais...'
  ];
  return descriptions[step - 1] || '';
};

export default StepProgress;

