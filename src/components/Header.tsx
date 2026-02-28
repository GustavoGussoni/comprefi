import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Smartphone,
  Sparkles,
  Monitor,
  Tablet,
  Watch,
  Headphones,
  Phone,
  Menu,
  X,
} from "lucide-react";

const navLinks = [
  {
    to: "/iphones-seminovos",
    label: "iPhones Seminovos",
    icon: <Smartphone size={20} />,
  },
  {
    to: "/iphones-novos",
    label: "iPhones Novos",
    icon: <Sparkles size={20} />,
  },
  { to: "/macbooks", label: "MacBooks", icon: <Monitor size={20} /> },
  { to: "/ipads", label: "iPads", icon: <Tablet size={20} /> },
  { to: "/apple-watch", label: "Apple Watch", icon: <Watch size={20} /> },
  { to: "/acessorios", label: "Acessórios", icon: <Headphones size={20} /> },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  // Fechar menu ao navegar
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Bloquear scroll do body quando menu aberto (iOS-safe)
  useEffect(() => {
    if (isMenuOpen) {
      scrollYRef.current = window.scrollY;
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = "100%";
    } else {
      const scrollY = scrollYRef.current;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      if (scrollY > 0) {
        window.scrollTo(0, scrollY);
      }
      scrollYRef.current = 0;
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      scrollYRef.current = 0;
    };
  }, [isMenuOpen]);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Fechar com Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <h1
                className="text-2xl md:text-3xl font-bold"
                style={{ fontFamily: "Monument, sans-serif" }}
              >
                <span className="text-white">Compre</span>
                <span className="text-[#ff6100]">Fi</span>
              </h1>
            </Link>

            {/* Desktop: Nav links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive(link.to)
                      ? "text-white bg-[#ff6100]/20 border border-[#ff6100]/30"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop: Botão Fale Conosco */}
            <a
              href="https://wa.me/5534999252590"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex bg-[#ff6100] hover:bg-[#e55a00] text-white px-4 py-2 rounded-md transition-colors items-center text-sm font-medium"
            >
              <Phone size={16} className="mr-2" />
              Fale Conosco
            </a>

            {/* Mobile: Hamburger button */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile: Overlay */}
      {isMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9998,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
          }}
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile: Drawer */}
      <div
        ref={menuRef}
        className="lg:hidden"
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "280px",
          maxWidth: "80vw",
          backgroundColor: "#111",
          zIndex: 9999,
          transform: isMenuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          pointerEvents: isMenuOpen ? "auto" : "none",
        }}
      >
        {/* Drawer Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            borderBottom: "1px solid #333",
          }}
        >
          <span
            className="text-xl font-bold"
            style={{ fontFamily: "Monument, sans-serif" }}
          >
            <span className="text-white">Compre</span>
            <span className="text-[#ff6100]">Fi</span>
          </span>
          <button
            onClick={() => setIsMenuOpen(false)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              color: "#999",
            }}
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav Links */}
        <nav style={{ flex: 1, padding: "12px 0" }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "14px 20px",
                color: isActive(link.to) ? "#ff6100" : "#ccc",
                textDecoration: "none",
                fontSize: "16px",
                fontWeight: isActive(link.to) ? 600 : 400,
                backgroundColor: isActive(link.to)
                  ? "rgba(255, 97, 0, 0.08)"
                  : "transparent",
                borderLeft: isActive(link.to)
                  ? "3px solid #ff6100"
                  : "3px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  width: "24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {link.icon}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Botão WhatsApp no drawer */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid #333" }}>
          <a
            href="https://wa.me/5534999252590"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              backgroundColor: "#ff6100",
              color: "white",
              padding: "14px 20px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: 600,
              transition: "background-color 0.2s ease",
            }}
          >
            <Phone size={20} />
            Fale Conosco
          </a>
        </div>
      </div>
    </>
  );
};

export default Header;
