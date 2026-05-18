import React from "react";
import {
  ChevronDown,
  PackageCheck,
  ShieldCheck,
  CircleDollarSign,
} from "lucide-react";
import heroImage from "../assets/images/gustavo-hero.png";

const HeroBanner: React.FC = () => {
  const handleScrollToContent = () => {
    const target = document.getElementById("como-funciona");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center overflow-hidden bg-[#000]">
      {/* ── Desktop Layout ── */}
      <div className="hidden lg:flex relative z-10 max-w-7xl mx-auto w-full px-6 xl:px-8 items-center">
        {/* Left — Text */}
        <div className="flex-1 py-16">
          <h1 className="text-5xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6">
            Tranquilidade
            <br />
            para quem{" "}
            <span className="text-[#ff6100] italic">
              não pode
              <br />
              parar.
            </span>
          </h1>

          <p className="text-xl text-gray-300 mb-10 max-w-lg leading-relaxed">
            Você continua trabalhando.
            <br />A gente{" "}
            <span className="text-white font-semibold underline underline-offset-4 decoration-[#ff6100]">
              cuida
            </span>{" "}
            do resto.
          </p>

          <button
            onClick={handleScrollToContent}
            className="group bg-[#ff6100] hover:bg-[#e55a00] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-[#ff6100]/25 text-lg mb-14"
          >
            Comprar com suporte completo
            <ChevronDown className="inline-block ml-2 w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Claims — Desktop: 3 columns */}
          <div className="grid grid-cols-3 gap-8">
            <ClaimItem
              icon={<PackageCheck className="w-12 h-12 text-[#ff6100]" />}
              title="Entrega Presencial"
              description="Você não precisa sair da sua rotina"
            />
            <ClaimItem
              icon={<ShieldCheck className="w-12 h-12 text-[#ff6100]" />}
              title="Suporte Pessoal"
              description="Você nunca fica sozinho"
            />
            <ClaimItem
              icon={<CircleDollarSign className="w-12 h-12 text-[#ff6100]" />}
              title="Economia Real"
              description="Você economiza tempo, dinheiro e dor de cabeça"
            />
          </div>
        </div>

        {/* Right — Photo with fade */}
        <div className="flex-1 relative flex justify-end">
          {/* Glow behind photo */}
          <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-[#ff6100]/6 rounded-full blur-[100px] pointer-events-none" />
          <div
            className="relative max-w-[520px] xl:max-w-[580px]"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 50%, transparent 95%), linear-gradient(to right, transparent 0%, black 15%, black 80%, transparent 100%)",
              WebkitMaskComposite: "intersect",
              maskImage:
                "linear-gradient(to bottom, black 50%, transparent 95%), linear-gradient(to right, transparent 0%, black 15%, black 80%, transparent 100%)",
              maskComposite: "intersect",
            }}
          >
            <img
              src={heroImage}
              alt="Gustavo Gussoni - CompreFi"
              className="w-full h-auto object-contain opacity-50"
            />
          </div>
        </div>
      </div>

      {/* ── Mobile Layout ── */}
      <div className="lg:hidden relative w-full min-h-[90vh] flex flex-col justify-center">
        {/* Background photo — positioned to the right */}
        <div className="absolute inset-0 z-0 flex justify-end">
          <img
            src={heroImage}
            alt=""
            className="h-full object-cover object-top opacity-50"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 40%, transparent 90%), linear-gradient(to right, transparent 0%, black 30%)",
              WebkitMaskComposite: "intersect",
              maskImage:
                "linear-gradient(to bottom, black 40%, transparent 90%), linear-gradient(to right, transparent 0%, black 30%)",
              maskComposite: "intersect",
              position: "relative",
              right: "-107px",
              top: "40px",
            }}
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000]/70 to-transparent z-[1]" />

        {/* Content */}
        <div className="relative z-10 px-6 py-16 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-white mb-6">
            Tranquilidade
            <br />
            para quem{" "}
            <span className="text-[#ff6100] italic">
              não pode
              <br />
              parar.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-md leading-relaxed">
            Você continua trabalhando.
            <br />A gente{" "}
            <span className="text-white font-semibold underline underline-offset-4 decoration-[#ff6100]">
              cuida
            </span>{" "}
            do resto.
          </p>

          <button
            onClick={handleScrollToContent}
            className="group bg-[#ff6100] hover:bg-[#e55a00] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 text-lg mb-12"
          >
            Comprar com suporte completo
            <ChevronDown className="inline-block ml-2 w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </button>

          {/* Claims — Mobile: 2 + 1 grid */}
          <div className="w-full max-w-sm">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <ClaimItem
                icon={<PackageCheck className="w-12 h-12 text-[#ff6100]" />}
                title="Entrega Presencial"
                description="Você não precisa sair da sua rotina"
                centered
              />
              <ClaimItem
                icon={<ShieldCheck className="w-12 h-12 text-[#ff6100]" />}
                title="Suporte Pessoal"
                description="Você nunca fica sozinho"
                centered
              />
            </div>
            <div className="flex justify-center">
              <div className="w-1/2">
                <ClaimItem
                  icon={
                    <CircleDollarSign className="w-12 h-12 text-[#ff6100]" />
                  }
                  title="Economia Real"
                  description="Você economiza tempo, dinheiro e dor de cabeça"
                  centered
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Claim Item ── */

interface ClaimItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  centered?: boolean;
}

const ClaimItem: React.FC<ClaimItemProps> = ({
  icon,
  title,
  description,
  centered = false,
}) => (
  <div
    className={`flex flex-col gap-2 ${centered ? "items-center text-center" : "items-start"}`}
  >
    <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#ff6100]/10 border border-[#ff6100]/30">
      {icon}
    </div>
    <h3 className="text-white font-bold text-sm sm:text-base mt-1">{title}</h3>
    <p className="text-gray-400 text-xs sm:text-sm leading-snug">
      {description}
    </p>
  </div>
);

export default HeroBanner;
