import { ArrowRight, RefreshCw, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeTradeInvite() {
  return (
    <section
      aria-labelledby="home-trade-title"
      className="px-4 pb-16 pt-2 md:pb-24"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#FF6100]/25 bg-[#141414] px-6 py-10 sm:px-10 md:px-14 md:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#FF6100]/10 blur-3xl"
        />
        <div className="relative grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_minmax(230px,0.56fr)]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#FF6100]/30 bg-[#FF6100]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#FF9B5C]">
              <RefreshCw aria-hidden="true" className="h-3.5 w-3.5" />
              Troca de iPhone
            </span>
            <h2
              id="home-trade-title"
              className="mt-5 max-w-2xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
            >
              Sem tempo para vender seu iPhone antigo?
              <span className="block text-[#FF6100]">A gente cuida disso.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-gray-300 sm:text-lg">
              Seu iPhone atual pode entrar na troca pelo próximo. Sem precisar
              anunciar, negociar e perder tempo. Você segue com o seu dia; a
              CompreFi cuida da proposta.
            </p>
            <Link
              to="/trocar-de-iphone"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#FF6100] px-7 py-3 text-base font-semibold text-white transition-colors hover:bg-[#e55800] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FF6100]"
            >
              Quero trocar meu iPhone
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </div>
          <div
            aria-hidden="true"
            className="hidden md:flex items-center justify-center"
          >
            <div className="relative flex h-52 w-52 items-center justify-center rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#262626] to-[#101010] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
              <Smartphone
                className="h-24 w-24 text-white/75"
                strokeWidth={1.1}
              />
              <span className="absolute -bottom-4 -right-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FF6100]/50 bg-[#26170e] text-[#FF6100] shadow-xl">
                <RefreshCw className="h-8 w-8" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
