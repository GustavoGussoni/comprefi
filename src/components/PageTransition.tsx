import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento de página
    setIsLoading(true);
    
    // Detectar se é iOS para otimizações específicas
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="text-center">
            <div className="inline-block">
              {/* Loader otimizado para iOS - mais leve e com menos animações complexas */}
              <svg className="w-16 h-16 text-[#ff6100]" viewBox="0 0 24 24">
                <circle 
                  className="opacity-25" 
                  cx="12" 
                  cy="12" 
                  r="10" 
                  stroke="currentColor" 
                  strokeWidth="4"
                ></circle>
                <path 
                  className="opacity-75" 
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
              <p className="mt-4 text-white font-medium">Carregando...</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-fadeIn">{children}</div>
      )}
    </div>
  );
};

export default PageTransition;
