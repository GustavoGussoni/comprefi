import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de página
    setIsLoading(true);

    // Detectar se é iOS para otimizações específicas
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

    // Tempo de carregamento mais curto para iOS para melhor performance
    const loadTime = isIOS ? 300 : 500;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadTime);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-transition">
      {isLoading ? (
        // Renderizar via Portal no body para garantir que fixed funcione
        // independente de qualquer transform em containers pais
        createPortal(
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.9)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ display: "inline-block" }}>
                {/* Loader otimizado para iOS - mais leve e com menos animações complexas */}
                <svg
                  style={{ width: "64px", height: "64px", color: "#ff6100" }}
                  viewBox="0 0 24 24"
                >
                  <circle
                    style={{ opacity: 0.25 }}
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    style={{ opacity: 0.75 }}
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0 12 12"
                      to="360 12 12"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </path>
                </svg>
                <p
                  style={{ marginTop: "16px", color: "white", fontWeight: 500 }}
                >
                  Carregando...
                </p>
              </div>
            </div>
          </div>,
          document.body,
        )
      ) : (
        <div className="animate-fadeIn">{children}</div>
      )}
    </div>
  );
};

export default PageTransition;
