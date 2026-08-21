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

type ProductCategory = "iphone" | "mac" | "ipad";
type Step = "intro" | "q1" | "q2" | "q3" | "q4_screen" | "capture" | "result";

interface QuizAnswer {
  category?: ProductCategory;
  usage?: string;
  storage?: string;
  screenSize?: string;
}

interface Recommendation {
  product: string;
  reason: string;
  whatsappText: string;
}

// =============================================
// LÓGICA DE RECOMENDAÇÃO — CATÁLOGO REAL
// =============================================
const getRecommendation = (a: QuizAnswer): Recommendation => {
  // ---------- IPHONE ----------
  if (a.category === "iphone") {
    if (a.usage === "pro") {
      if (a.storage === "muito") {
        return rec("iPhone 17 Pro (512GB)", "Você valoriza a melhor câmera e precisa de bastante espaço. O iPhone 17 Pro entrega o sistema de câmera profissional da Apple com zoom óptico 5x, chip A19 Pro e tela ProMotion de 120Hz. Com 512GB, você grava sem se preocupar com espaço.");
      }
      return rec("iPhone 17 Pro (256GB)", "Você valoriza a melhor câmera e desempenho. O iPhone 17 Pro tem o sistema de câmera profissional da Apple com zoom óptico 5x, chip A19 Pro e tela ProMotion de 120Hz. Os 256GB são suficientes para quem não acumula vídeos pesados no aparelho.");
    }
    if (a.usage === "bateria") {
      if (a.storage === "muito") {
        return rec("iPhone 17 Pro Max (1TB)", "Você quer a maior tela e a maior bateria da Apple, com espaço de sobra. O Pro Max tem a tela de 6,9 polegadas, a bateria mais duradoura de todos os iPhones e 1TB para guardar tudo sem apagar nada.");
      }
      if (a.storage === "intermediario") {
        return rec("iPhone 17 Pro Max (512GB)", "Você quer tela grande e bateria que dura o dia todo, com bom espaço. O Pro Max tem a maior tela (6,9\") e a maior bateria de todos os iPhones. Com 512GB, você tem folga para fotos, vídeos e apps sem preocupação.");
      }
      return rec("iPhone 17 Pro Max (256GB)", "Você quer a maior tela e a maior bateria da Apple. O Pro Max tem 6,9 polegadas de tela e a bateria mais duradoura de todos os iPhones. Os 256GB atendem bem quem usa nuvem e não acumula muitos vídeos localmente.");
    }
    // equilíbrio
    if (a.storage === "muito") {
      return rec("iPhone 17 (256GB)", "Você quer um iPhone excelente sem pagar o premium da linha Pro. O iPhone 17 tem chip A19, câmera de alta qualidade e design atualizado. Com 256GB, você tem espaço de sobra para o dia a dia.");
    }
    if (a.storage === "intermediario") {
      return rec("iPhone 17 (256GB)", "Você quer equilíbrio entre qualidade e preço. O iPhone 17 tem chip A19, câmera ótima e design moderno. Os 256GB são ideais para quem usa bastante app, tira fotos e grava vídeos no dia a dia.");
    }
    return rec("iPhone 16 (128GB)", "Você quer um iPhone excelente com o melhor custo-benefício. O iPhone 16 tem chip A18, câmera de alta qualidade e tamanho confortável. Os 128GB atendem bem quem usa apps essenciais e fotos do dia a dia.");
  }

  // ---------- MAC ----------
  if (a.category === "mac") {
    const tela = a.screenSize || "menor"; // "menor" = 13/14, "maior" = 15/16

    if (a.usage === "pesado") {
      if (tela === "maior") {
        return rec(
          a.storage === "muito" ? "MacBook Pro 16\" M5 Pro 24GB (1TB)" : "MacBook Pro 16\" M5 Pro 24GB (1TB)",
          "Você trabalha com tarefas pesadas e quer a tela maior. O Pro 16\" com chip M5 Pro tem performance sustentada com ventoinha, tela XDR de 120Hz e potência de sobra para edição 4K/8K, programação pesada e 3D. A tela de 16 polegadas faz diferença real para quem passa horas trabalhando."
        );
      }
      return rec(
        a.storage === "muito" ? "MacBook Pro 14\" M5 Pro 24GB (1TB)" : "MacBook Pro 14\" M5 Pro 24GB (512GB)",
        "Você trabalha com tarefas pesadas e prefere portabilidade. O Pro 14\" com chip M5 Pro tem a mesma potência do 16\" em um formato mais compacto. Performance sustentada, tela XDR de 120Hz e potência para edição profissional e programação pesada."
      );
    }

    if (a.usage === "intermediario") {
      if (tela === "maior") {
        return rec(
          a.storage === "muito" ? "MacBook Air 15\" M5 24GB (1TB)" : "MacBook Air 15\" M5 24GB (512GB)",
          "Você faz multitarefa e quer uma tela generosa. O Air 15\" com 24GB de RAM é silencioso, leve para o tamanho e não vai travar com muitas abas e apps simultâneos. A tela de 15 polegadas dá conforto visual para quem trabalha o dia todo."
        );
      }
      return rec(
        a.storage === "muito" ? "MacBook Air 13\" M5 24GB (1TB)" : "MacBook Air 13\" M5 24GB (512GB)",
        "Você faz multitarefa e precisa de folga para muitas abas e apps simultâneos. O Air 13\" com 24GB de RAM é silencioso, ultra leve e não vai travar. Para o seu uso, ele entrega mais que um Pro básico — e custa menos."
      );
    }

    // básico
    if (tela === "maior") {
      return rec(
        a.storage === "muito" ? "MacBook Air 15\" M5 16GB (512GB)" : "MacBook Air 15\" M5 16GB (512GB)",
        "Para o seu uso, um Air 15\" com 16GB é mais que suficiente. Ele é silencioso, a bateria dura o dia todo e a tela de 15 polegadas dá conforto para trabalhar com planilhas, textos e navegação. Não gaste a mais com o que você não precisa."
      );
    }
    return rec(
      a.storage === "muito" ? "MacBook Air 13\" M5 16GB (512GB)" : "MacBook Air 13\" M5 16GB (512GB)",
      "Para o seu uso, um Air 13\" com 16GB é mais que suficiente. Ele é 100% silencioso, super leve, a bateria dura o dia todo e não vai travar com planilhas, textos e navegação. Não gaste a mais com o que você não precisa."
    );
  }

  // ---------- IPAD ----------
  if (a.usage === "pro") {
    return rec("iPad Pro M5 11\" Wi-Fi (256GB)", "Você precisa de potência para criação profissional. O iPad Pro com chip M5 é uma máquina de produtividade com tela OLED e compatibilidade com Magic Keyboard e Apple Pencil Pro. Substitui um notebook para muitos profissionais criativos.");
  }
  return rec("iPad 11 Wi-Fi (128GB)", "Para estudo, anotações e dia a dia, o iPad 11 é o equilíbrio perfeito. Leve, rápido, compatível com Apple Pencil e com potência de sobra para o cotidiano sem pagar o preço de um Pro. É a compra inteligente.");
};

function rec(product: string, reason: string): Recommendation {
  return {
    product,
    reason,
    whatsappText: `Oi Gussoni, fiz o teste no site e minha recomendação foi ${product}. Quero saber preço e disponibilidade!`,
  };
}

// =============================================
// COMPONENTE
// =============================================
const OptionCard = ({ icon, title, subtitle, onClick }: { icon: React.ReactNode; title: string; subtitle: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-[#ff6100] rounded-xl p-5 text-left transition-all group"
  >
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-gray-800 group-hover:bg-[#ff6100]/10 rounded-full flex items-center justify-center shrink-0 transition-colors">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-white font-medium text-lg">{title}</p>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
      <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[#ff6100] shrink-0 transition-colors" />
    </div>
  </button>
);

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
    const updated = { ...answers, storage };
    setAnswers(updated);
    // Mac precisa de pergunta extra sobre tamanho de tela
    if (answers.category === "mac") {
      setStep("q4_screen");
    } else {
      setStep("capture");
    }
  };

  const handleScreenSize = (screenSize: string) => {
    setAnswers({ ...answers, screenSize });
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

  // Calcular progresso
  const totalSteps = answers.category === "mac" ? 4 : 3;
  const currentStepNum = step === "q1" ? 1 : step === "q2" ? 2 : step === "q3" ? 3 : step === "q4_screen" ? 4 : 0;

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
                Responda algumas perguntas rápidas.
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
              <p className="text-[#ff6100] text-sm font-medium mb-2">Pergunta 1 de {totalSteps}</p>
              <h2 className="text-2xl font-bold text-white mb-6">O que você está procurando hoje?</h2>
              <div className="space-y-3">
                <OptionCard icon={<Smartphone className="w-6 h-6 text-[#ff6100]" />} title="Um iPhone novo" subtitle="Quero trocar meu celular" onClick={() => handleCategorySelect("iphone")} />
                <OptionCard icon={<Monitor className="w-6 h-6 text-[#ff6100]" />} title="Um MacBook" subtitle="Preciso de um computador para trabalhar" onClick={() => handleCategorySelect("mac")} />
                <OptionCard icon={<Tablet className="w-6 h-6 text-[#ff6100]" />} title="Um iPad" subtitle="Quero algo portátil para criar ou estudar" onClick={() => handleCategorySelect("ipad")} />
              </div>
            </div>
          )}

          {/* ===== Q2: Uso ===== */}
          {step === "q2" && (
            <div>
              <button onClick={() => { setStep("q1"); setAnswers({}); }} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
              <p className="text-[#ff6100] text-sm font-medium mb-2">Pergunta 2 de {totalSteps}</p>

              {answers.category === "mac" && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">Como é o seu trabalho no dia a dia?</h2>
                  <div className="space-y-3">
                    <OptionCard icon={<span className="text-xl">📄</span>} title="Básico" subtitle="Planilhas, textos, navegação, e-mails" onClick={() => handleUsageSelect("basico")} />
                    <OptionCard icon={<span className="text-xl">⚡</span>} title="Intermediário" subtitle="Muitas abas, edição leve, multitarefa pesada" onClick={() => handleUsageSelect("intermediario")} />
                    <OptionCard icon={<span className="text-xl">🚀</span>} title="Pesado" subtitle="Edição de vídeo 4K/8K, programação, 3D" onClick={() => handleUsageSelect("pesado")} />
                  </div>
                </>
              )}

              {answers.category === "iphone" && (
                <>
                  <h2 className="text-2xl font-bold text-white mb-6">O que é mais importante para você?</h2>
                  <div className="space-y-3">
                    <OptionCard icon={<span className="text-xl">📸</span>} title="Câmera profissional" subtitle="Melhor câmera e máximo desempenho" onClick={() => handleUsageSelect("pro")} />
                    <OptionCard icon={<span className="text-xl">🔋</span>} title="Tela grande e bateria" subtitle="Maior tela e autonomia que dura o dia todo" onClick={() => handleUsageSelect("bateria")} />
                    <OptionCard icon={<span className="text-xl">✨</span>} title="Equilíbrio" subtitle="Excelente celular, bom preço, tamanho normal" onClick={() => handleUsageSelect("normal")} />
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
              <p className="text-[#ff6100] text-sm font-medium mb-2">Pergunta 3 de {totalSteps}</p>
              <h2 className="text-2xl font-bold text-white mb-6">
                {answers.category === "mac" ? "Você guarda muitos arquivos pesados no computador?" : "Quanto espaço você precisa?"}
              </h2>
              <div className="space-y-3">
                {answers.category === "mac" ? (
                  <>
                    <OptionCard icon={<span className="text-xl">☁️</span>} title="Uso muita nuvem" subtitle="Guardo pouca coisa localmente" onClick={() => handleStorageSelect("pouco")} />
                    <OptionCard icon={<span className="text-xl">💾</span>} title="Preciso de muito espaço" subtitle="Projetos grandes, vídeos, arquivos pesados" onClick={() => handleStorageSelect("muito")} />
                  </>
                ) : answers.category === "ipad" ? (
                  // iPad pula direto para captura (recomendação não depende de storage)
                  <>
                    <OptionCard icon={<span className="text-xl">📱</span>} title="Básico" subtitle="Apps, anotações e navegação" onClick={() => { setAnswers({ ...answers, storage: "pouco" }); setStep("capture"); }} />
                    <OptionCard icon={<span className="text-xl">📷</span>} title="Bastante espaço" subtitle="Muitos apps, fotos, vídeos e arquivos" onClick={() => { setAnswers({ ...answers, storage: "muito" }); setStep("capture"); }} />
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

          {/* ===== Q4: Tamanho de Tela (Só Mac) ===== */}
          {step === "q4_screen" && (
            <div>
              <button onClick={() => setStep("q3")} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </button>
              <p className="text-[#ff6100] text-sm font-medium mb-2">Pergunta 4 de 4</p>
              <h2 className="text-2xl font-bold text-white mb-6">Qual tamanho de tela você prefere?</h2>
              <div className="space-y-3">
                {answers.usage === "pesado" ? (
                  <>
                    <OptionCard icon={<span className="text-xl">💻</span>} title="14 polegadas" subtitle="Mais portátil, fácil de levar para qualquer lugar" onClick={() => handleScreenSize("menor")} />
                    <OptionCard icon={<span className="text-xl">🖥️</span>} title="16 polegadas" subtitle="Tela maior, mais conforto para trabalhar por horas" onClick={() => handleScreenSize("maior")} />
                  </>
                ) : (
                  <>
                    <OptionCard icon={<span className="text-xl">💻</span>} title="13 polegadas" subtitle="Ultra portátil, mais leve e compacto" onClick={() => handleScreenSize("menor")} />
                    <OptionCard icon={<span className="text-xl">🖥️</span>} title="15 polegadas" subtitle="Tela maior, mais conforto visual para o dia a dia" onClick={() => handleScreenSize("maior")} />
                  </>
                )}
              </div>
            </div>
          )}

          {/* ===== CAPTURA ===== */}
          {step === "capture" && (
            <div>
              <button onClick={() => {
                if (answers.category === "mac") setStep("q4_screen");
                else setStep("q3");
              }} className="flex items-center gap-1 text-gray-400 hover:text-white text-sm mb-4 transition-colors">
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
                <input type="text" placeholder="Seu nome" value={contactForm.nome} onChange={(e) => setContactForm({ ...contactForm, nome: e.target.value })} required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100]" />
                <input type="tel" placeholder="WhatsApp (00) 00000-0000" value={contactForm.whatsapp} onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })} required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100]" />
                <input type="email" placeholder="Seu e-mail" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ff6100]" />
                <button type="submit" disabled={isSubmitting} className="w-full bg-[#ff6100] hover:bg-[#e55a00] text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg disabled:opacity-50">
                  {isSubmitting ? "Carregando..." : "Ver Meu Resultado"}
                </button>
                <p className="text-gray-500 text-xs text-center">Seus dados são usados apenas para contato. Sem spam.</p>
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
                <h2 className="text-2xl font-bold text-white mb-4">{recommendation.product}</h2>
                <p className="text-gray-300 leading-relaxed">{recommendation.reason}</p>
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
