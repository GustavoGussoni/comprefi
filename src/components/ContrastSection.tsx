import { useEffect, useRef, useState } from "react";
import {
  SearchX,
  ShieldAlert,
  TrendingDown,
  UserX,
  MessageCircle,
  Truck,
  PiggyBank,
  Headphones,
  X,
  Check,
  ArrowDown,
} from "lucide-react";

interface ContrastItem {
  painIcon: React.ReactNode;
  painText: string;
  solutionIcon: React.ReactNode;
  solutionText: string;
}

const contrastPairs: ContrastItem[] = [
  {
    painIcon: <SearchX className="w-5 h-5 text-red-400/70 shrink-0" />,
    painText: "Você pesquisa sozinho e compra inseguro",
    solutionIcon: (
      <MessageCircle className="w-5 h-5 text-emerald-400 shrink-0" />
    ),
    solutionText: "Consultoria gratuita e personalizada",
  },
  {
    painIcon: <ShieldAlert className="w-5 h-5 text-red-400/70 shrink-0" />,
    painText: "Compra e torce pra dar certo",
    solutionIcon: <Truck className="w-5 h-5 text-emerald-400 shrink-0" />,
    solutionText: "Entrega Presencial com Suporte Pessoal",
  },
  {
    painIcon: <TrendingDown className="w-5 h-5 text-red-400/70 shrink-0" />,
    painText: "Paga caro e descobre que podia ter economizado",
    solutionIcon: <PiggyBank className="w-5 h-5 text-emerald-400 shrink-0" />,
    solutionText: "Economia Real de tempo, dinheiro e dor de cabeça",
  },
  {
    painIcon: <UserX className="w-5 h-5 text-red-400/70 shrink-0" />,
    painText: "Problema depois? Se vira sozinho",
    solutionIcon: <Headphones className="w-5 h-5 text-emerald-400 shrink-0" />,
    solutionText: "Suporte Pessoal direto no WhatsApp",
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export default function ContrastSection() {
  const { ref: sectionRef, isVisible } = useInView(0.1);

  return (
    <section className="relative w-full bg-[#000] py-20 md:py-28 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div
        ref={sectionRef}
        className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div
          className={`text-center mb-14 md:mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Existe um jeito <span className="text-[#FF6100]">melhor</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Compare e veja por que centenas de clientes escolhem a CompreFi
          </p>
        </div>

        {/* ===== DESKTOP: Two cards side by side ===== */}
        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {/* Pain side — O jeito antigo (apagado) */}
          <div
            className={`relative rounded-2xl border border-red-500/10 bg-[#0d1117]/80 p-8 lg:p-10 transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
          >
            <h3 className="text-xl lg:text-2xl font-bold text-red-400/80 mb-8">
              O jeito antigo
            </h3>
            <ul className="space-y-6">
              {contrastPairs.map((item, index) => (
                <li key={index} className="flex items-start gap-4 opacity-60">
                  <div className="mt-0.5 p-2 rounded-lg bg-red-500/5 border border-red-500/10">
                    {item.painIcon}
                  </div>
                  <span className="text-gray-500 text-base lg:text-lg leading-relaxed pt-1.5">
                    {item.painText}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution side — O jeito CompreFi (brilhando, verde esmeralda) */}
          <div
            className={`relative rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-[#0d1117] to-[#0d1117] p-8 lg:p-10 shadow-[0_0_40px_rgba(16,185,129,0.06)] transition-all duration-700 delay-400 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
          >
            {/* Green glow accent top */}
            <div className="absolute -top-px left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
            <h3 className="text-xl lg:text-2xl font-bold text-emerald-400 mb-8">
              O jeito CompreFi
            </h3>
            <ul className="space-y-6">
              {contrastPairs.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-0.5 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    {item.solutionIcon}
                  </div>
                  <span className="text-white text-base lg:text-lg leading-relaxed pt-1.5 font-medium">
                    {item.solutionText}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== MOBILE: Item-by-item with X → ↓ → ✓ + separators ===== */}
        <div className="md:hidden space-y-0">
          {contrastPairs.map((item, index) => (
            <div key={index}>
              <div
                className={`flex flex-col items-center gap-1.5 py-3 transition-all duration-600 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{
                  transitionDelay: isVisible ? `${200 + index * 150}ms` : "0ms",
                }}
              >
                {/* Pain row — apagado */}
                <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0d1117]/60 border border-red-500/10 opacity-85">
                  <div className="p-1.5 rounded-full bg-red-500/10">
                    <X className="w-3.5 h-3.5 text-red-400/80" />
                  </div>
                  <span className="text-gray-500 text-sm leading-relaxed">
                    {item.painText}
                  </span>
                </div>

                {/* Arrow indicator */}
                <ArrowDown className="w-3 h-3 text-gray-600" />

                {/* Solution row — brilhando (verde esmeralda) */}
                <div className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/25 shadow-[0_0_16px_rgba(16,185,129,0.05)]">
                  <div className="p-1.5 rounded-full bg-emerald-500/15">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-white text-sm leading-relaxed font-semibold">
                    {item.solutionText}
                  </span>
                </div>
              </div>

              {/* Separator between pairs */}
              {index < contrastPairs.length - 1 && (
                <div className="flex justify-center py-3">
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-500/50 to-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
