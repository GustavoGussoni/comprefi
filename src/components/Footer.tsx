import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white" style={{ fontFamily: 'Monument, sans-serif' }}>
              <span className="text-white">Compre</span>
              <span className="text-[#ff6100]">Fi</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Ajudamos clientes Apple exigentes a atualizarem seus produtos com tranquilidade, economia e sem abrir mão da experiência premium que merecem.
            </p>
            <p className="text-gray-400">
              CNPJ: 47.781.967/0001-11
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contato</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#ff6100]">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
                <a href="https://wa.me/5534999252590" className="hover:text-[#ff6100]">(34) 99925-2590</a>
              </li>
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-[#ff6100]">
                  <rect x="3" y="5" width="18" height="14" rx="2" ry="2"></rect>
                  <polyline points="3 7 12 13 21 7"></polyline>
                </svg>
                <a href="mailto:sac@comprefi.com" className="hover:text-[#ff6100]">sac@comprefi.com</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Formas de Pagamento</h3>
            <div className="flex flex-wrap gap-2">
              <div className="bg-gray-800 p-2 rounded-md">
                <span className="text-[#ff6100]">PIX</span>
              </div>
              <div className="bg-gray-800 p-2 rounded-md">
                <span className="text-white">Cartão</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} CompreFi - Todos os direitos reservados</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
