import React from "react";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="bg-funnel-surface-light">
      <div
        className="bg-funnel-primary h-1 transition-all duration-500" // <-- MUDANÇA 2: Cor da barra padronizada
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default StepProgress;
