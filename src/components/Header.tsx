import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-black border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <h1
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "Monument, sans-serif" }}
              >
                <span className="text-white">Compre</span>
                <span className="text-[#ff6100]">Fi</span>
              </h1>
            </Link>
          </div>

          {/* Menu de Navegação */}
          {/* <nav className="flex flex-wrap justify-center gap-2 md:gap-4"> 
            <Link to="/iphones-seminovos" className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              iPhones Seminovos
            </Link>
            <Link to="/iphones-novos" className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              iPhones Novos
            </Link>
            <Link to="/macbooks" className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              MacBooks
            </Link>
            <Link to="/ipads" className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              iPads
            </Link>
            <Link to="/apple-watch" className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              Apple Watch
            </Link>
            <Link to="/acessorios" className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              Acessórios
            </Link>
            <Link to="/teste-infalivel" className="px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
              Teste Infalivel
            </Link>
          </nav> */}

          {/* Botão de Contato */}
          <div className="mt-4 md:mt-0">
            <a
              href="https://wa.me/5534999252590"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#ff6100] hover:bg-[#e55a00] text-white px-4 py-2 rounded-md transition-colors flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
