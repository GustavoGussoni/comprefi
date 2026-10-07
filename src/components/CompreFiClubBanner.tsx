import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";

const COMMUNITY_URL = "https://chat.whatsapp.com/DiKOZFzV0712sLl54XseFL";

export default function CompreFiClubBanner() {
  return (
    <section
      aria-labelledby="comprefi-club-title"
      className="relative mb-10 overflow-hidden rounded-2xl border border-[#ff6100]/25 bg-[#151515] p-6 text-white sm:p-8 lg:p-10"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#ff6100]/10 blur-3xl"
      />
      <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-12">
        <div>
          <span className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#ff853d]">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[#ff6100]"
            />
            Procedência de verdade
          </span>
          <h2
            id="comprefi-club-title"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            CompreFi <span className="text-[#ff6100]">Club</span>
          </h2>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-gray-300">
            O seu clube de ofertas do estoque de seminovos da CompreFi.
            Aparelhos com defeito recebidos na troca não entram na nossa
            vitrine. Aqui, procedência vem primeiro.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-200">
            <span className="inline-flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                className="h-4 w-4 text-[#ff853d]"
              />
              Ofertas atualizadas toda semana
            </span>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck
                aria-hidden="true"
                className="h-4 w-4 text-[#ff853d]"
              />
              100% originais, sem peças trocadas e testados
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck
                aria-hidden="true"
                className="h-4 w-4 text-[#ff853d]"
              />
              6 meses de garantia CompreFi
            </span>
          </div>
        </div>
        <div className="flex flex-col items-start lg:items-end">
          <a
            href={COMMUNITY_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Entrar no CompreFi Club, comunidade no WhatsApp (abre em nova aba)"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-[#102017] transition-colors hover:bg-[#31e573] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#25D366] sm:w-auto"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Entrar no CompreFi Club
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <span className="mt-2 text-xs text-gray-400">
            A comunidade abre no WhatsApp.
          </span>
        </div>
      </div>
    </section>
  );
}
