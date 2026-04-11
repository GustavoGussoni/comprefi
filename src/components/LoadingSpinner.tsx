import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Carregando...",
  size = "md",
  color = "#ff6100",
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-center">
        <div
          className={`animate-spin rounded-full ${sizeClasses[size]} border-b-2 mx-auto mb-4`}
          style={{ borderColor: color }}
        ></div>
        {message && <p className="text-lg text-white">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;
