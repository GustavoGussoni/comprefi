// src/components/funnel/QualificationStep.tsx

import React, { useEffect, useRef } from "react";
import {
  Instagram,
  Sparkles,
  Users,
  Clapperboard,
  Search,
  Handshake,
  HelpCircle,
  Lightbulb,
  Calendar,
  Rocket,
  Zap,
  CalendarPlus,
  Hourglass,
  BrainCircuit,
  CheckCircle2,
  Info,
} from "lucide-react";

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
  onUpdate: (field: keyof QualificationData, value: string) => void;
  onCompletion: () => void;
}

const iconProps = {
  size: 28,
  className: "mb-2 mx-auto",
};

const iconMap: { [key: string]: React.ReactNode } = {
  Instagram: <Instagram {...iconProps} />,
  TikTok: <Sparkles {...iconProps} />,
  Facebook: <Users {...iconProps} />,
  YouTube: <Clapperboard {...iconProps} />,
  Google: <Search {...iconProps} />,
  "Indicação de amigo": <Handshake {...iconProps} />,
  Outros: <HelpCircle {...iconProps} />,
  "Primeira vez que penso nisso": <Lightbulb {...iconProps} />,
  "Há algumas semanas": <Calendar {...iconProps} />,
  "Há 1 mês": <Calendar {...iconProps} />,
  "Há 2 meses": <Calendar {...iconProps} />,
  "Há 3 meses ou mais": <Calendar {...iconProps} />,
  "Agora mesmo": <Rocket {...iconProps} />,
  "Na próxima semana": <Zap {...iconProps} />,
  "Daqui 2 semanas": <CalendarPlus {...iconProps} />,
  "Próximo mês": <Calendar {...iconProps} />,
  "Daqui 2 meses": <Hourglass {...iconProps} />,
  "Daqui 3 meses": <Hourglass {...iconProps} />,
  "Ainda não decidi": <BrainCircuit {...iconProps} />,
};

const QualificationStep: React.FC<QualificationStepProps> = ({
  data,
  options,
  onUpdate,
  onCompletion,
}) => {
  const wasCompleted = useRef(false);
  const isComplete = !!(
    data.ondeOuviu &&
    data.tempoPensando &&
    data.urgenciaTroca
  );

  useEffect(() => {
    if (isComplete && !wasCompleted.current) {
      onCompletion();
      wasCompleted.current = true;
    }
  }, [data, isComplete, onCompletion]);

  const renderOptionButton = (
    group: keyof QualificationData,
    option: string
  ) => {
    const isSelected = data[group] === option;
    const baseClasses =
      "p-4 rounded-lg border-2 transition-all duration-200 text-center flex flex-col justify-center items-center h-full";
    const selectedClasses =
      "bg-funnel-primary border-funnel-primary text-funnel-text-on-primary";
    const unselectedClasses =
      "border-funnel-surface-light bg-funnel-surface-light hover:border-funnel-primary/50";

    return (
      <button
        key={option}
        onClick={() => onUpdate(group, option)}
        className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses}`}
      >
        {iconMap[option] || <HelpCircle {...iconProps} />}
        <p className="text-sm font-medium">{option}</p>
      </button>
    );
  };

  return (
    <div className="space-y-10">
      {/* --- SEÇÕES DE PERGUNTAS (sem alterações) --- */}
      <div>
        <h3 className="text-lg font-semibold text-funnel-text-primary mb-4">
          Onde você ouviu falar sobre a CompreFi?
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {options.ondeOuviu?.map((source) =>
            renderOptionButton("ondeOuviu", source)
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-funnel-text-primary mb-4">
          Há quanto tempo você pensa em trocar de iPhone?
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {options.tempoPensando?.map((time) =>
            renderOptionButton("tempoPensando", time)
          )}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-funnel-text-primary mb-4">
          Você quer trocar em quanto tempo?
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {options.urgenciaTroca?.map((urgency) =>
            renderOptionButton("urgenciaTroca", urgency)
          )}
        </div>
      </div>

      {/* --- BLOCOS RESTAURADOS E ADAPTADOS --- */}

      {/* 1. Resumo das Respostas */}
      <div className="bg-funnel-surface-light rounded-lg p-6 space-y-4">
        <h4 className="text-lg font-semibold text-funnel-text-primary">
          Resumo das suas respostas:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-3 rounded-lg border ${data.ondeOuviu ? "border-funnel-primary/50 bg-funnel-primary/10" : "border-funnel-surface-light bg-funnel-surface"}`}
          >
            <p className="text-sm text-funnel-text-secondary">
              Conheceu a CompreFi via:
            </p>
            <p
              className={`font-medium ${data.ondeOuviu ? "text-funnel-primary" : "text-funnel-text-secondary"}`}
            >
              {data.ondeOuviu || "Aguardando..."}
            </p>
          </div>
          <div
            className={`p-3 rounded-lg border ${data.tempoPensando ? "border-funnel-primary/50 bg-funnel-primary/10" : "border-funnel-surface-light bg-funnel-surface"}`}
          >
            <p className="text-sm text-funnel-text-secondary">
              Pensa em trocar há:
            </p>
            <p
              className={`font-medium ${data.tempoPensando ? "text-funnel-primary" : "text-funnel-text-secondary"}`}
            >
              {data.tempoPensando || "Aguardando..."}
            </p>
          </div>
          <div
            className={`p-3 rounded-lg border ${data.urgenciaTroca ? "border-funnel-primary/50 bg-funnel-primary/10" : "border-funnel-surface-light bg-funnel-surface"}`}
          >
            <p className="text-sm text-funnel-text-secondary">
              Quer trocar em:
            </p>
            <p
              className={`font-medium ${data.urgenciaTroca ? "text-funnel-primary" : "text-funnel-text-secondary"}`}
            >
              {data.urgenciaTroca || "Aguardando..."}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Mensagem de Conclusão */}
      {isComplete && (
        <div className="bg-funnel-success/10 border border-funnel-success/50 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle2 className="w-5 h-5 text-funnel-success mr-2" />
            <p className="text-funnel-success">
              <strong>Perfeito!</strong> Todas as informações foram coletadas.
            </p>
          </div>
        </div>
      )}

      {/* 3. Aviso de Privacidade */}
      <div className="bg-funnel-primary/10 border border-funnel-primary/20 rounded-lg p-4">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-funnel-primary mr-2 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-funnel-text-secondary text-sm">
              <strong>Privacidade garantida:</strong> Suas informações são
              usadas apenas para personalizar sua experiência e melhorar nossos
              serviços. Não compartilhamos dados com terceiros.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QualificationStep;
