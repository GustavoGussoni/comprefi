import React, { useState } from "react";
import PageTransition from "../components/PageTransition";
import {
  Truck,
  Shield,
  Lightbulb,
  MessageCircle,
  ArrowRight,
  Quote,
  CheckCircle2,
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
        <section className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#ff6100] font-medium text-sm uppercase tracking-wider mb-4">
              Economia Real — Pilar CompreFi
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              O preço não é o único custo<br className="hidden md:block" /> de um produto Apple.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Economia real não é apenas pagar menos. É não perder tempo, não comprar errado
              e não ficar sozinho se alguma coisa acontecer.
            </p>
          </div>
        </section>

        {/* ===== PROBLEMA ===== */}
        <section className="bg-gray-950 py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
              Um produto R$ 500 mais barato pode custar muito mais caro.
            </h2>
            <div className="text-gray-300 text-lg leading-relaxed space-y-6">
              <p>
                A maioria das pessoas compara apenas o número final no Pix. Mas a vida continua
                depois da transferência.
              </p>
              <p>
                Quando você compra um iPhone ou um Mac para trabalhar, o custo real inclui
                o que acontece depois:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                {[
                  "Horas perdidas tentando configurar sozinho",
                  "Comprar uma configuração que vai travar em seis meses",
                  "Ficar sem aparelho se precisar acionar garantia",
                  "Não ter ninguém para perguntar: \"O que eu faço agora?\"",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-gray-900 rounded-lg p-4 border border-gray-800">
                    <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-white font-medium text-xl text-center">
                Quem compra bem trabalha tranquilo.
              </p>
              <p className="text-gray-400 text-center">
                Economia real é pagar um valor justo por uma experiência que protege a sua rotina.
              </p>
            </div>
          </div>
        </section>

        {/* ===== HISTÓRIAS REAIS ===== */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Como funciona a Economia Real na prática.
              </h2>
              <p className="text-gray-400">
                Histórias reais de clientes que economizaram sem abrir mão de tranquilidade.
              </p>
            </div>

            <div className="space-y-8">
              {/* Luiz */}
              <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-[#ff6100] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      Luiz — MacBook de alto valor
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Luiz precisava de um MacBook para trabalho. Encontrou referências no mercado
                      na faixa de R$ 25.000. Na CompreFi, ele adquiriu o equipamento por
                      aproximadamente R$ 22.488 — uma economia de mais de R$ 2.500. Mais do que
                      o valor economizado, ele teve a tranquilidade de uma compra remota segura,
                      orientação na escolha da configuração certa e suporte depois.
                    </p>
                    <p className="text-[#ff6100] font-medium italic">
                      "Economia real pode coexistir com suporte e segurança."
                    </p>
                  </div>
                </div>
              </div>

              {/* Murilo */}
              <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-[#ff6100] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      Murilo — Mac Studio para trabalho profissional
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Murilo precisava de um Mac Studio — uma máquina de uso profissional pesado.
                      Ele economizou aproximadamente R$ 10.000 em comparação aos preços de grandes
                      varejistas, sem abrir mão do suporte, da confiança e do acompanhamento
                      que recebeu antes e depois da compra.
                    </p>
                    <p className="text-[#ff6100] font-medium italic">
                      "Pagar caro sem cuidado é uma escolha evitável."
                    </p>
                  </div>
                </div>
              </div>

              {/* Cliente do desconto */}
              <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 text-[#ff6100] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      A cliente que escolheu pagar mais
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Uma cliente encontrou um iPhone um pouco mais barato em outro vendedor.
                      Ela nos procurou pedindo para igualar o preço. Conversamos sobre o que viria
                      depois: configuração, transferência, suporte, garantia. Ela analisou o
                      atendimento do concorrente — respostas secas, nenhum acompanhamento.
                      No fim, ela escolheu comprar com a CompreFi mesmo pagando mais.
                    </p>
                    <p className="text-[#ff6100] font-medium italic">
                      "Preço não é o único custo."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 3 PILARES ===== */}
        <section className="bg-gray-950 py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
              Os três pilares da Economia Real
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
                <div className="w-12 h-12 bg-[#ff6100]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-[#ff6100]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Entrega Presencial</h3>
                <p className="text-gray-400 text-sm">
                  Você não perde tempo indo buscar. O produto chega até você, pronto para usar.
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
                <div className="w-12 h-12 bg-[#ff6100]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-[#ff6100]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Suporte Pessoal</h3>
                <p className="text-gray-400 text-sm">
                  Você não perde horas no telefone com atendentes automáticos. A gente cuida do resto.
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 text-center">
                <div className="w-12 h-12 bg-[#ff6100]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-6 h-6 text-[#ff6100]" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Orientação na Compra</h3>
                <p className="text-gray-400 text-sm">
                  Você não gasta dinheiro comprando configuração errada. A gente ajuda a escolher certo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA PRINCIPAL ===== */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <MessageCircle className="w-12 h-12 text-[#ff6100] mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Mac, iPad ou iPhone?<br />Manda mensagem pro Gussoni.
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Se você quer comprar um produto Apple com economia real e tranquilidade
              para não parar a sua rotina, vamos conversar.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Falar com o Gussoni
              <ArrowRight className="w-5 h-5" />
            </a>
            <p className="text-gray-500 text-sm mt-4">
              Atendimento humano, sem robô, sem fila.
            </p>
          </div>
        </section>

        {/* ===== CAPTURA SUAVE ===== */}
        <section className="bg-gray-950 py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-xl">
            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                Ainda não é o momento de comprar?
              </h2>
              <p className="text-gray-400">
                Deixe seu WhatsApp. O Gussoni te avisa quando aparecer uma oportunidade real
                do produto que você procura. Sem urgência falsa, sem spam.
              </p>
            </div>

            {submitted ? (
              <div className="bg-green-900/20 border border-green-700 rounded-lg p-6 text-center">
                <CheckCircle2 className="w-10 h-10 text-green-500 mx-auto mb-3" />
                <p className="text-white font-medium">Pronto! Você será avisado.</p>
                <p className="text-gray-400 text-sm mt-1">
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
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp (00) 00000-0000"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent"
                />
                <select
                  value={formData.produto}
                  onChange={(e) => setFormData({ ...formData, produto: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ff6100] focus:border-transparent appearance-none"
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
                  className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Enviando..." : "Me avise de oportunidades"}
                </button>
                <p className="text-gray-500 text-xs text-center">
                  Seus dados são usados apenas para avisá-lo. Sem spam, prometemos.
                </p>
              </form>
            )}
          </div>
        </section>

        {/* ===== FRASE FINAL ===== */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-gray-500 text-lg italic">
              "Apple é o produto. A CompreFi é a tranquilidade ao redor dele."
            </p>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Economia;
