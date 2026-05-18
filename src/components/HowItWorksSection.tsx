import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  FileCheck,
  CreditCard,
  PackageCheck,
  Handshake,
  ChevronRight,
} from "lucide-react";

import { WHATSAPP_NUMBER } from "../data/constants";
import printSuporteEterno from "@/assets/images/print-suporte-eterno.jpg";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface Step {
  number: number;
  title: string;
  icon: React.ReactNode;
  description: string;
  extra?: React.ReactNode;
}

const whatsappMessages = [
  {
    text: "Opa, tudo bem? Já estou fazendo o pedido com meu fornecedor. Assim que confirmar te aviso aqui, tá bom?",
    time: "09:12",
    fromMe: true,
  },
  {
    text: "Pedido confirmado! Aguardando envio. Te aviso tudo por aqui :D",
    time: "14:35",
    fromMe: true,
  },
  {
    text: "Pedido enviado! Agora vamos aguardar mais um pouco e assim que chegar aqui pra mim eu já te chamo pra combinarmos a entrega",
    time: "10:48",
    fromMe: true,
  },
  {
    text: "Opaaa, tudo bem? Seu pedido já chegou! Bora combinar o melhor horário de entrega?",
    time: "16:22",
    fromMe: true,
  },
];

function WhatsAppBubble({
  text,
  time,
  fromMe,
}: {
  text: string;
  time: string;
  fromMe: boolean;
}) {
  return (
    <div className={`flex ${fromMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed ${
          fromMe
            ? "bg-[#005C4B] text-gray-100 rounded-tr-none"
            : "bg-[#1F2C34] text-gray-200 rounded-tl-none"
        }`}
      >
        <p>{text}</p>
        <div className="flex justify-end items-center gap-1 mt-1">
          <span className="text-[10px] text-gray-400">{time}</span>
          {fromMe && (
            <svg
              className="w-4 h-3 text-[#53BDEB]"
              viewBox="0 0 16 11"
              fill="currentColor"
            >
              <path d="M11.071.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-2.011-2.095a.463.463 0 0 0-.336-.153.457.457 0 0 0-.336.153l-.672.672a.463.463 0 0 0 0 .672l2.992 2.992a.463.463 0 0 0 .336.153.457.457 0 0 0 .381-.178l6.836-8.424a.463.463 0 0 0 0-.604l-.315-.9z" />
              <path d="M14.757.653a.457.457 0 0 0-.304-.102.493.493 0 0 0-.381.178l-6.19 7.636-1.143-1.19-.672.672 2.124 2.124a.463.463 0 0 0 .336.153.457.457 0 0 0 .381-.178l6.836-8.424a.463.463 0 0 0 0-.604l-.987-.265z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

function WhatsAppChat() {
  return (
    <div className="mt-5 rounded-xl overflow-hidden border border-gray-700/50 bg-[#0B141A]">
      {/* WhatsApp header */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[#1F2C34] border-b border-gray-700/30">
        <div className="w-8 h-8 rounded-full bg-[#FF6100] flex items-center justify-center text-white text-xs font-bold">
          CF
        </div>
        <div>
          <p className="text-white text-sm font-medium">CompreFi</p>
          <p className="text-gray-400 text-[10px]">online</p>
        </div>
      </div>
      {/* Messages */}
      <div className="p-3 space-y-3">
        {whatsappMessages.map((msg, i) => (
          <div key={i}>
            {i === 3 && (
              <div className="flex justify-center my-2">
                <span className="text-[10px] text-gray-500 bg-[#1F2C34] px-2 py-0.5 rounded">
                  1 dia depois
                </span>
              </div>
            )}
            <WhatsAppBubble {...msg} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Steps                                                              */
/* ------------------------------------------------------------------ */

const iconClass = "w-6 h-6 text-[#FF6100]";

const steps: Step[] = [
  {
    number: 1,
    title: "Consultoria",
    icon: <MessageCircle className={iconClass} />,
    description:
      "Você entra em contato e informa o seu produto de preferência — ou a gente te ajuda a escolher a opção que mais se encaixa ao seu dia a dia.",
  },
  {
    number: 2,
    title: "Contrato",
    icon: <FileCheck className={iconClass} />,
    description:
      "Como hoje em dia o golpe virou moda, nós assinamos um contrato com validade jurídica. Ele protege ambos os lados e garante que o seu produto vai chegar até você.",
  },
  {
    number: 3,
    title: "Pagamento",
    icon: <CreditCard className={iconClass} />,
    description:
      "Você escolhe: Pix, parcelado em até 21x, ou entrada no Pix + parcelas. E não, a gente não parcela no boleto — mas calma, as opções são ótimas.",
  },
  {
    number: 4,
    title: "Envio",
    icon: <PackageCheck className={iconClass} />,
    description:
      "Agora é com a gente. Mas fica tranquilo, porque você será informado durante todo o processo:",
    extra: <WhatsAppChat />,
  },
  {
    number: 5,
    title: "Entrega Presencial + Suporte Pessoal",
    icon: <Handshake className={iconClass} />,
    description:
      "A entrega é feita no horário que você escolher, e nós te ajudamos com todo o processo de configuração e transferência dos dados. E não acaba por aqui — seu Suporte Pessoal é eterno. Qualquer dúvida, pode contar com a gente. E pode contar mesmo!...",
    extra: (
      <div className="mt-5">
        <img
          src={printSuporteEterno}
          alt="Print do WhatsApp — suporte eterno com cliente"
          className="rounded-xl border border-gray-700/50 w-full"
        />
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  IntersectionObserver hook                                          */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Step Card                                                          */
/* ------------------------------------------------------------------ */

function StepCard({ step, index }: { step: Step; index: number }) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`relative flex gap-5 md:gap-8 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: isVisible ? `${index * 100}ms` : "0ms" }}
    >
      {/* Timeline line + number */}
      <div className="flex flex-col items-center shrink-0">
        {/* Step number circle */}
        <div className="relative w-12 h-12 rounded-full bg-[#FF6100]/15 border-2 border-[#FF6100]/40 flex items-center justify-center z-10">
          <span className="text-[#FF6100] font-bold text-lg">
            {step.number}
          </span>
        </div>
        {/* Vertical line */}
        {index < steps.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-[#FF6100]/30 to-gray-800/30 mt-2" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 md:pb-16 pt-1 flex-1 min-w-0">
        {/* Title row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-[#FF6100]/10 border border-[#FF6100]/20">
            {step.icon}
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            {step.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-base leading-relaxed max-w-xl">
          {step.description}
        </p>

        {/* Extra content (WhatsApp chat or print) */}
        {step.extra}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function HowItWorksSection() {
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);

  return (
    <section
      id="como-funciona"
      className="relative w-full bg-[#000] py-20 md:py-28 overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:24px_24px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          ref={headerRef}
          className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Como <span className="text-[#FF6100]">funciona</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Do primeiro contato à entrega em mãos — simples, transparente e
            acompanhado
          </p>
        </div>

        {/* Timeline */}
        <div>
          {steps.map((step, index) => (
            <StepCard key={step.number} step={step} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`text-center mt-8 transition-all duration-700 delay-500 ${
            headerVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Olá! Quero minha consultoria gratuita")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6100] hover:bg-[#e55800] text-white font-semibold rounded-xl transition-colors duration-200 text-lg"
          >
            Quero minha consultoria gratuita
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
