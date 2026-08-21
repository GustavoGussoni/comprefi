import React, { useState } from "react";
import PageTransition from "../components/PageTransition";
import {
  Smartphone,
  Monitor,
  Tablet,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const WHATSAPP_BASE = "https://wa.me/5534999252590?text=";
const WEBHOOK_URL = "https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/ddfbe711-a3c9-4730-827b-9218dd473b34";

// Tipos
type ProductCategory = "iphone" | "mac" | "ipad";
type Step = "intro" | "q1" | "q2" | "q3" | "capture" | "result";

interface QuizAnswer {
  category?: ProductCategory;
  usage?: string;
  storage?: string;
}

interface Recommendation {
  product: string;
  reason: string;
  whatsappText: string;
}

// Lógica de recomendação
const getRecommendation = (answers: QuizAnswer): Recommendation => {
  if (answers.category === "mac") {
    if (answers.usage === "pesado") {
      return {
        product: answers.storage === "muito" ? "MacBook Pro M5 Pro (24GB RAM / 1TB SSD)" : "MacBook Pro M5 Pro (24GB RAM / 512GB SSD)",
        reason: "Você trabalha com tarefas pesadas que exigem performance sustentada. O Pro com chip M5 Pro tem ventoinha para não perder desempenho em renders longos, tela XDR de 120Hz para trabalho visual e potência de sobra para edição 4K/8K e programação pesada.",
        whatsappText: "Oi Gussoni, fiz o teste no site e minha recomendação foi MacBook Pro M5 Pro. Quero saber preço e disponibilidade!",
      };
    }
    if (answers.usage === "intermediario") {
      return {
        product: answers.storage === "muito" ? "MacBook Air M5 (24GB RAM / 1TB SSD)" : "MacBook Air M5 (24GB RAM / 512GB SSD)",
        reason: "Você faz multitarefa e precisa de folga para muitas abas e apps simultâneos. O Air com 24GB de RAM é silencioso, leve e não vai travar. Para o seu uso, ele entrega mais que um Pro básico — e custa menos.",
        whatsappText: "Oi Gussoni, fiz o teste no site e minha recomendação foi MacBook Air M5 24GB. Quero saber preço e disponibilidade!",
      };
    }
    // basico
    return {
      product: answers.storage === "muito" ? "MacBook Air M4 (16GB RAM / 512GB SSD)" : "MacBook Air M4 (16GB RAM / 256GB SSD)",
      reason: "Para o seu uso, um Air com 16GB é mais que suficiente. Ele é 100% silencioso, super leve, a bateria dura o dia todo e não vai travar com planilhas, textos e navegação. Não gaste a mais com o que você não precisa.",
      whatsappText: "Oi Gussoni, fiz o teste no site e minha recomendação foi MacBook Air M4 16GB. Quero saber preço e disponibilidade!",
    };
  }

  if (answers.category === "iphone") {
    if (answers.usage === "pro") {
      return {
        product: answers.storage === "muito" ? "iPhone 16 Pro Max (512GB)" : answers.storage === "intermediario" ? "iPhone 16 Pro Max (256GB)" : "iPhone 16 Pro (256GB)",
        reason: "Você valoriza a melhor câmera e desempenho. A linha Pro Max entrega as melhores lentes da Apple, a maior bateria e a tela maior para quem trabalha com conteúdo visual. É o iPhone para quem não aceita menos.",
        whatsappText: "Oi Gussoni, fiz o teste no site e minha recomendação foi iPhone 16 Pro Max. Quero saber preço e disponibilidade!",
      };
    }
    if (answers.usage === "bateria") {
      return {
        product: answers.storage === "muito" ? "iPhone 16 Plus (256GB)" : "iPhone 16 Plus (128GB)",
        reason: "Você quer tela grande e bateria que dura muito. O iPhone 16 Plus tem a mesma tela generosa do Pro Max com bateria excelente, sem pagar o premium da câmera Pro. Ótimo custo-benefício para quem prioriza autonomia.",
        whatsappText: "Oi Gussoni, fiz o teste no site e minha recomendação foi iPhone 16 Plus. Quero saber preço e disponibilidade!",
      };
    }
    // normal
    return {
      product: answers.storage === "muito" ? "iPhone 16 (256GB)" : "iPhone 16 (128GB)",
      reason: "Você quer um iPhone excelente sem pagar a mais pelo que não precisa. O iPhone 16 tem câmera ótima, desempenho de sobra e tamanho confortável. É a compra inteligente para quem valoriza equilíbrio.",
      whatsappText: "Oi Gussoni, fiz o teste no site e minha recomendação foi iPhone 16. Quero saber preço e disponibilidade!",
    };
  }

  // iPad
  if (answers.usage === "pro") {
    return {
      product: "iPad Pro M4 (11\" ou 13\")",
      reason: "Você precisa de potência para criação pesada. O iPad Pro com chip M4 é uma máquina de produtividade com tela OLED e compatibilidade com Magic Keyboard e Apple Pencil Pro. Substitui um notebook para muitos profissionais.",
      whatsappText: "Oi Gussoni, fiz o teste no site e minha recomendação foi iPad Pro M4. Quero saber preço e disponibilidade!",
    };
  }
  return {
    product: "iPad Air M4 (11\")",
    reason: "Para estudo, anotações e consumo de conteúdo, o iPad Air com chip M4 é o equilíbrio perfeito. Leve, rápido, compatível com Apple Pencil e com potência de sobra para o dia a dia sem pagar o preço do Pro.",
    whatsappText: "Oi Gussoni, fiz o teste no site e minha recomendação foi iPad Air M4. Quero saber preço e disponibilidade!",
  };
};

const Captura: React.FC = () => {
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [contactForm, setContactForm] = useState({ nome: "", whatsapp: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCategorySelect = (category: ProductCategory) => {
    setAnswers({ ...answers, category });
    setStep("q2");
  };

  const handleUsageSelect = (usage: string) => {
    setAnswers({ ...answers, usage });
    setStep("q3");
  };

  const handleStorageSelect = (storage: string) => {
    setAnswers({ ...answers, storage });
    setStep("capture");
  };

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const recommendation = getRecommendation(answers);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          ...answers,
          recomendacao: recommendation.product,
          fonte: "quiz-teste-infalivel",
          dataEnvio: new Date().toISOString(),
        }),
      });
    } catch (err) {
      console.error("Erro webhook:", err);
    } finally {
      setIsSubmitting(false);
      setStep("result");
    }
  };

  const recommendation = getRecommendation(answers);

  // Componente de opção
  const OptionCard = ({ icon, title, subtitle, onClick }: { icon: React.ReactNode; title: string; subtitle: string; onClick: () => void }) => (
    <button
      onClick={onClick}
      className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-[#ff6100] rounded-xl p-5 text-left transition-all group"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-800 group-hover:bg-[#ff6100]/10 rounded-full flex items-center justify-center shrink-0 transition-colors">
          {icon}
        </div>
        <div>
          <p className="text-white font-medium text-lg">{title}</p>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#ff6100] ml-auto shrink-0 transition-colors" />
      </div>
    </button>
  );

  return (
    <PageTransition>
      <div className="bg-black min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-xl w-full">

          {/* ===== INTRO ===== */}
          {step === "intro" && (
            <div className="text-center">
              <Sparkles className="w-12 h-12 text-[#ff6100] mx-auto mb-6" />
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Descubra qual produto Apple<br />foi feito para a sua rotina.
              </h1>
              <p className="text-gray-300 text-lg mb-8 max-w-md mx-auto">
                Não gaste a mais com o que você não precisa, nem economize onde não deve.
                Responda 4 perguntas rápidas.
              </p>
              <button
                onClick={() => setStep("q1")}
                className="inline-flex items-center gap-2 bg-[#ff6100] hover:bg-[#e55a00] text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
              >
                Começar o Teste
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-gray-500 text-sm mt-4">Leva menos de 1 minuto.</p>
            </div>
          )}

          {/* ===== Q1: Categoria ===== */}
          {step === "q1" && (
            <div>
              <p className="text-[#ff6100] text-sm font-medium mb-2">Pergunta 1 de 3</p>
              <h2 className="text-2xl font-bold text-white mb-6">
                O que você está procurando hoje?
              </h2>
              <div className="space-y-3">
                <OptionCard
                  icon={<Smartphone className="w-6 h-6 text-[#ff6100]" />}
                  title="Um iPhone novo"
                  subtitle="Quero trocar meu celular"
                  onClick={() => handleCategorySelect("iphone")}
                />
                <OptionCard
                  icon={<Monitor className="w-6 h-6 text-[#ff6100]" />}
                  title="Um MacBook"
                  subtitle="Preciso de um computador para trabalhar"
                  onClick={() => handleCategorySelect("mac")}
                />
                <OptionCard
                  icon={<Tablet className="w-6 h-6 text-[#ff6100]" />}
                  title="Um iPad"
                  subtitle="Quero algo portátil para criar ou estudar"
                  onClick={() => handleCategorySelect("ipad")}
                />
              </div>
            </div>
          )}

          {/* ===== Q2: Uso ===== */}
          {step === "q2" && (
            <div>
              <button onClick={() => setStep("q1")} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
              <p className="text-[#ff6100] text-sm font-medium mb-2">Pergunta 2 de 3</p>

              {answers.category === "mac" && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">Como é o seu trabalho no dia a dia?</h2>
                  <div className="space-y-3">
                    <OptionCard icon={<span className="text-xl">📄</span>} title="Básico" subtitle="Planilhas, textos, navegação, e-mails" onClick={() => handleUsageSelect("basico")} />
                    <OptionCard icon={<span className="text-xl">⚡</span>} title="Intermediário" subtitle="Muitas abas, edição leve, multitarefa" onClick={() => handleUsageSelect("intermediario")} />
                    <OptionCard icon={<span className="text-xl">🚀</span>} title="Pesado" subtitle="Edição de vídeo 4K/8K, programação, 3D" onClick={() => handleUsageSelect("pesado")} />
                  </div>
                </>
              )}

              {answers.category === "iphone" && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">O que é mais importante para você?</h2>
                  <div className="space-y-3">
                    <OptionCard icon={<span className="text-xl">📸</span>} title="Câmera profissional" subtitle="Melhor câmera e máximo desempenho" onClick={() => handleUsageSelect("pro")} />
                    <OptionCard icon={<span className="text-xl">🔋</span>} title="Tela grande e bateria" subtitle="Autonomia que dura o dia todo" onClick={() => handleUsageSelect("bateria")} />
                    <OptionCard icon={<span className="text-xl">✨</span>} title="Equilíbrio" subtitle="Excelente celular, tamanho normal, bom preço" onClick={() => handleUsageSelect("normal")} />
                  </div>
                </>
              )}

              {answers.category === "ipad" && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">Como você pretende usar o iPad?</h2>
                  <div className="space-y-3">
                    <OptionCard icon={<span className="text-xl">🎨</span>} title="Criação profissional" subtitle="Desenho, edição, produção de conteúdo" onClick={() => handleUsageSelect("pro")} />
                    <OptionCard icon={<span className="text-xl">📚</span>} title="Estudo e dia a dia" subtitle="Anotações, leitura, vídeos, navegação" onClick={() => handleUsageSelect("basico")} />
                  </div>
                </>
              )}
            </div>
          )}

          {/* ===== Q3: Armazenamento ===== */}
          {step === "q3" && (
            <div>
              <button onClick={() => setStep("q2")} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
              <p className="text-[#ff6100] text-sm font-medium mb-2">Pergunta 3 de 3</p>
              <h2 className="text-2xl font-bold text-white mb-6">
                {answers.category === "mac" ? "Você guarda muitos arquivos pesados no computador?" : "Quanto espaço você precisa?"}
              </h2>
              <div className="space-y-3">
                {answers.category === "mac" ? (
                  <>
                    <OptionCard icon={<span className="text-xl">☁️</span>} title="Uso muita nuvem" subtitle="Guardo pouca coisa localmente" onClick={() => handleStorageSelect("pouco")} />
                    <OptionCard icon={<span className="text-xl">💾</span>} title="Preciso de muito espaço" subtitle="Projetos grandes, vídeos, arquivos pesados" onClick={() => handleStorageSelect("muito")} />
                  </>
                ) : (
                  <>
                    <OptionCard icon={<span className="text-xl">📱</span>} title="Básico" subtitle="Apps essenciais e algumas fotos" onClick={() => handleStorageSelect("pouco")} />
                    <OptionCard icon={<span className="text-xl">📷</span>} title="Intermediário" subtitle="Bastante app, fotos e vídeos" onClick={() => handleStorageSelect("intermediario")} />
                    <OptionCard icon={<span className="text-xl">🎬</span>} title="Muito espaço" subtitle="Gravo muito vídeo, não quero apagar nada" onClick={() => handleStorageSelect("muito")} />
                  </>
                )}
              </div>
            </div>
          )}

          {/* ===== CAPTURA ===== */}
          {step === "capture" && (
            <div>
              <button onClick={() => setStep("q3")} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
              <div className="text-center mb-8">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  Encontramos o equipamento perfeito para você!
                </h2>
                <p className="text-gray-400">
                  Preencha seus dados para ver a recomendação detalhada.
                </p>
              </div>
              <form onSubmit={handleCapture} className="space-y-4">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={contactForm.nome}
                  onChange={(e) => setContactForm({ ...contactForm, nome: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100]"
                />
                <input
                  type="tel"
                  placeholder="WhatsApp (00) 00000-0000"
                  value={contactForm.whatsapp}
                  onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100]"
                />
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100]"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg disabled:opacity-50"
                >
                  {isSubmitting ? "Carregando..." : "Ver Meu Resultado"}
                </button>
                <p className="text-gray-500 text-xs text-center">
                  Seus dados são usados apenas para contato. Sem spam.
                </p>
              </form>
            </div>
          )}

          {/* ===== RESULTADO ===== */}
          {step === "result" && (
            <div>
              <div className="text-center mb-8">
                <Sparkles className="w-10 h-10 text-[#ff6100] mx-auto mb-4" />
                <p className="text-[#ff6100] text-sm font-medium uppercase tracking-wider mb-2">Sua Recomendação</p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800 mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {recommendation.product}
                </h2>
                <p className="text-gray-300 leading-relaxed">
                  {recommendation.reason}
                </p>
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  Quer saber o preço e como comprar com tranquilidade?
                </h3>
                <p className="text-gray-400 mb-6 text-sm">
                  Manda mensagem pro Gussoni. A gente te passa os valores, tira suas dúvidas
                  e garante que você faça a melhor compra.
                </p>
                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(recommendation.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-colors text-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar com o Gussoni
                </a>
                <p className="text-gray-500 text-sm mt-4 italic">
                  "Você continua trabalhando. A gente cuida do resto."
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </PageTransition>
  );
};

export default Captura;
