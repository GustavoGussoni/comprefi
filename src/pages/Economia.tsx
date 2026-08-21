import React, { useState } from "react";
import PageTransition from "../components/PageTransition";
import {
  Truck,
  Shield,
  Lightbulb,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  XCircle,
  ShieldAlert,
  HelpCircle,
  TrendingDown,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5534999252590?text=Oi%20Gussoni%2C%20vim%20pela%20p%C3%A1gina%20de%20economia%20e%20quero%20saber%20mais.";
const WEBHOOK_URL = "https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/77af256e-7701-4254-8be1-77e266f3dc6d";

const Economia: React.FC = () => {
  const [formData, setFormData] = useState({ nome: "", whatsapp: "", produto: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          fonte: "economia-captura-suave",
          dataEnvio: new Date().toISOString(),
        }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Erro ao enviar:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="bg-black min-h-screen">

        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#ff6100]/5 to-transparent" />
          <div className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24 relative">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-[#ff6100] font-medium text-sm uppercase tracking-widest mb-6">
                Economia Real
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
                O preço não é o único custo.
              </h1>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Economia real não é apenas pagar menos. É não perder tempo,
                não comprar errado e não ficar sozinho se alguma coisa acontecer.
              </p>
            </div>
          </div>
        </section>

        {/* ===== DIVISOR ===== */}
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800" />
        </div>

        {/* ===== PROBLEMA — VISUAL ===== */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                R$ 500 mais barato pode custar<br className="hidden md:block" /> muito mais caro.
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                A maioria compara apenas o número no Pix. Mas a vida continua depois da transferência.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 flex items-start gap-4">
                <Clock className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Horas perdidas</p>
                  <p className="text-gray-400 text-sm">Tentando configurar e transferir dados sozinho.</p>
                </div>
              </div>
              <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 flex items-start gap-4">
                <TrendingDown className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Configuração errada</p>
                  <p className="text-gray-400 text-sm">Comprar uma máquina que vai travar em seis meses.</p>
                </div>
              </div>
              <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 flex items-start gap-4">
                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Tempo sem aparelho</p>
                  <p className="text-gray-400 text-sm">Ficar dias parado se precisar acionar garantia.</p>
                </div>
              </div>
              <div className="bg-red-950/30 border border-red-900/50 rounded-2xl p-6 flex items-start gap-4">
                <HelpCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium mb-1">Sem ninguém para ajudar</p>
                  <p className="text-gray-400 text-sm">"O que eu faço agora?" — e ninguém responde.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-2xl md:text-3xl font-bold text-white">
                Quem compra bem trabalha tranquilo.
              </p>
            </div>
          </div>
        </section>

        {/* ===== DIVISOR ===== */}
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800" />
        </div>

        {/* ===== HISTÓRIAS REAIS ===== */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <p className="text-[#ff6100] font-medium text-sm uppercase tracking-widest mb-4">
                Histórias Reais
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Economia Real na prática.
              </h2>
            </div>

            <div className="space-y-6">
              {/* Luiz */}
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-3 text-center shrink-0">
                      <p className="text-green-400 text-sm font-medium">Economizou</p>
                      <p className="text-green-400 text-3xl font-bold">R$ 2.500</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Luiz — MacBook de alto valor</h3>
                      <p className="text-gray-400 text-sm">Compra remota com orientação e suporte</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Luiz precisava de um MacBook para trabalho. Encontrou referências no mercado
                    na faixa de R$ 25.000. Na CompreFi, ele adquiriu o equipamento por
                    aproximadamente R$ 22.488. Mais do que o valor economizado, ele teve a
                    tranquilidade de uma compra remota segura e orientação na escolha da
                    configuração certa.
                  </p>
                  <p className="text-[#ff6100] font-medium mt-4 italic text-sm">
                    "Economia real pode coexistir com suporte e segurança."
                  </p>
                </div>
              </div>

              {/* Murilo */}
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-5 py-3 text-center shrink-0">
                      <p className="text-green-400 text-sm font-medium">Economizou</p>
                      <p className="text-green-400 text-3xl font-bold">R$ 10.000</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Murilo — Mac Studio profissional</h3>
                      <p className="text-gray-400 text-sm">Alto ticket com confiança e acompanhamento</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Murilo precisava de um Mac Studio — uma máquina de uso profissional pesado.
                    Ele economizou aproximadamente R$ 10.000 em comparação aos preços de grandes
                    varejistas, sem abrir mão do suporte, da confiança e do acompanhamento
                    que recebeu antes e depois da compra.
                  </p>
                  <p className="text-[#ff6100] font-medium mt-4 italic text-sm">
                    "Pagar caro sem cuidado é uma escolha evitável."
                  </p>
                </div>
              </div>

              {/* Cliente do desconto */}
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-5 py-3 text-center shrink-0">
                      <ShieldAlert className="w-8 h-8 text-blue-400 mx-auto" />
                      <p className="text-blue-400 text-sm font-medium mt-1">Escolha</p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">A cliente que escolheu pagar mais</h3>
                      <p className="text-gray-400 text-sm">Preço não é o único custo</p>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Uma cliente encontrou um iPhone mais barato em outro vendedor e nos pediu
                    para igualar o preço. Conversamos sobre o que viria depois: configuração,
                    transferência, suporte, garantia. Ela analisou o atendimento do concorrente
                    — respostas secas, nenhum acompanhamento. No fim, ela escolheu comprar com
                    a CompreFi mesmo pagando mais.
                  </p>
                  <p className="text-[#ff6100] font-medium mt-4 italic text-sm">
                    "Preço não é o único custo."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DIVISOR ===== */}
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800" />
        </div>

        {/* ===== 3 PILARES ===== */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-16">
              <p className="text-[#ff6100] font-medium text-sm uppercase tracking-widest mb-4">
                Como Funciona
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Os três pilares da Economia Real.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6100]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Truck className="w-8 h-8 text-[#ff6100]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Entrega Presencial</h3>
                <p className="text-gray-400 leading-relaxed">
                  Você não perde tempo indo buscar. O produto chega até você, pronto para usar.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6100]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Shield className="w-8 h-8 text-[#ff6100]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Suporte Pessoal</h3>
                <p className="text-gray-400 leading-relaxed">
                  Você não perde horas no telefone com atendentes automáticos. A gente cuida do resto.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#ff6100]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-[#ff6100]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Orientação na Compra</h3>
                <p className="text-gray-400 leading-relaxed">
                  Você não gasta dinheiro comprando configuração errada. A gente ajuda a escolher certo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== DIVISOR ===== */}
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800" />
        </div>

        {/* ===== CTA PRINCIPAL ===== */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <div className="w-16 h-16 bg-green-600/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <MessageCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Mac, iPad ou iPhone?
            </h2>
            <p className="text-2xl text-gray-300 mb-8">
              Manda mensagem pro Gussoni.
            </p>
            <p className="text-gray-400 mb-10 max-w-lg mx-auto">
              Se você quer comprar um produto Apple com economia real e tranquilidade
              para não parar a sua rotina, vamos conversar.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl transition-colors text-lg shadow-lg shadow-green-600/20"
            >
              Falar com o Gussoni
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-gray-600 text-sm mt-5">
              Atendimento humano, sem robô, sem fila.
            </p>
          </div>
        </section>

        {/* ===== DIVISOR ===== */}
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-800" />
        </div>

        {/* ===== CAPTURA SUAVE ===== */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-md">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white mb-3">
                Ainda não é o momento?
              </h2>
              <p className="text-gray-400">
                Deixe seu WhatsApp. O Gussoni te avisa quando aparecer uma oportunidade real.
                Sem urgência falsa, sem spam.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-900/20 border border-green-800 rounded-2xl p-8 text-center">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="text-white font-medium text-lg">Pronto! Você será avisado.</p>
                <p className="text-gray-400 text-sm mt-2">
                  O Gussoni entrará em contato quando surgir uma oportunidade para você.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={formData.nome}
                  onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp (00) 00000-0000"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent"
                />
                <select
                  value={formData.produto}
                  onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-800 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent appearance-none"
                >
                  <option value="" disabled>Qual produto você procura?</option>
                  <option value="iPhone">iPhone</option>
                  <option value="MacBook">MacBook</option>
                  <option value="iPad">iPad</option>
                  <option value="Apple Watch">Apple Watch</option>
                  <option value="AirPods">AirPods</option>
                  <option value="Outro">Outro / Não sei ainda</option>
                </select>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white font-medium py-3.5 px-6 rounded-xl transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Me avise de oportunidades"}
                </button>
                <p className="text-gray-600 text-xs text-center">
                  Seus dados são usados apenas para avisá-lo. Sem spam, prometemos.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ===== FRASE FINAL ===== */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <div className="border-t border-gray-800 mb-16" />
            <p className="text-gray-600 text-lg italic">
              "Apple é o produto. A CompreFi é a tranquilidade ao redor dele."
            </p>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Economia;
