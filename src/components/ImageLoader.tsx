import React, { useState, useEffect } from 'react';

// Componente de carregamento de imagem com animação
const ImageLoader: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    img.onerror = () => setError(true);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder com animação de pulso */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
          <svg className="w-12 h-12 text-gray-600 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      )}

      {/* Imagem com animação de fade-in */}
      <img 
        src={src} 
        alt={alt} 
        className={`w-full h-auto object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ display: error ? 'none' : 'block' }}
      />

      {/* Fallback para erro */}
      {error && (
        <div className="absolute inset-0 bg-gray-800 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Imagem indisponível</span>
        </div>
      )}
    </div>
  );
};

export default ImageLoader;
