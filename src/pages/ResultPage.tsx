/* eslint-disable @typescript-eslint/no-unused-vars */
// src/pages/ResultPage.tsx

import {
  CheckCircle2,
  Gift,
  MessageSquare,
  Percent,
  Repeat,
  ShieldCheck,
  Users,
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// --- Interfaces ---
interface FunnelData {
  modeloAtual: string;
  capacidadeAtual: string;
  corAtual: string;
  bateriaAtual: number;
  defeitos: string[];
  pecasTrocadas: boolean;
  quaisPecas: string;
  modeloDesejado: string;
  ondeOuviu: string;
  tempoPensando: string;
  urgenciaTroca: string;
}

interface TradeResult {
  valorAparelho: number;
  valorFinal: number;
  valorBase: number;
  depreciacaoBateria: number;
  depreciacaoDefeitos: number;
  precoProduto: number;
  valorComDesconto: number;
  temDefeito: boolean;
  precisaCotacao: boolean;
  cupomDesconto?: string;
  produtoDesejado?: any;
}

// --- INTERFACE ATUALIZADA ---
interface ContactForm {
  nome: string;
  email: string;
  whatsapp: string;
  cep: string; // <-- ADICIONADO
}

// --- CONSTANTES DE VALIDAÇÃO ATUALIZADAS ---
const NAME_REGEX = /^[a-zA-ZÀ-ÿ']+\s+[a-zA-ZÀ-ÿ'\s]*$/;
const PHONE_REGEX = /\(\d{2}\)\s\d{5}-\d{4}/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CEP_REGEX = /^\d{5}-\d{3}$/; // <-- ADICIONADO

const ResultPage: React.FC = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [funnelData, setFunnelData] = useState<FunnelData | null>(null);
  const [result, setResult] = useState<TradeResult | null>(null);

  // console.log(result);
  // --- ESTADO INICIAL ATUALIZADO ---
  const [contactForm, setContactForm] = useState<ContactForm>({
    nome: "",
    email: "",
    whatsapp: "",
    cep: "", // <-- ADICIONADO
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const stored = localStorage.getItem("comprefi_timer_start");
    if (stored) {
      const elapsed = Math.floor((Date.now() - parseInt(stored, 10)) / 1000);
      const remaining = 1800 - elapsed;
      return remaining > 0 ? remaining : 0;
    }
    return 1800;
  });
  const [showFAQ, setShowFAQ] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  useEffect(() => {
    loadData();
    startTimer();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (showResult) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [showResult]);

  const loadData = () => {
    try {
      const funnelDataStr = localStorage.getItem("funnelData");
      if (funnelDataStr) {
        setFunnelData(JSON.parse(funnelDataStr));
      }

      const resultStr = localStorage.getItem("tradeResult");
      if (resultStr) {
        setResult(JSON.parse(resultStr));
      }
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    }
  };

  const startTimer = () => {
    // Persistir o momento de início no localStorage
    if (!localStorage.getItem("comprefi_timer_start")) {
      localStorage.setItem("comprefi_timer_start", Date.now().toString());
    }

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Se já expirou, não iniciar o intervalo
    if (timeLeft <= 0) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const formatCurrency = (value: number | undefined | null): string => {
    if (value === null || value === undefined || isNaN(value)) {
      return "R$ 0,00";
    }
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const calculateDiscount = (): number => {
    if (!result?.valorFinal) return 0;
    return result.valorFinal * 0.03;
  };

  // --- FUNÇÃO DE VALIDAÇÃO ATUALIZADA ---
  const validateField = (name: string, value: string) => {
    let error: string | null = null;
    switch (name) {
      case "nome":
        if (value && !NAME_REGEX.test(value.trim())) {
          error = "Por favor, insira um nome e sobrenome válidos.";
        }
        break;
      case "email":
        if (value && !EMAIL_REGEX.test(value)) {
          error = "Por favor, insira um e-mail válido.";
        }
        break;
      case "whatsapp":
        if (value && !PHONE_REGEX.test(value)) {
          error = "Por favor, insira um número de WhatsApp completo.";
        }
        break;
      case "cep": // <-- ADICIONADO
        if (value && !CEP_REGEX.test(value)) {
          error = "Por favor, insira um CEP válido (formato XXXXX-XXX).";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return !error;
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length > 11) return contactForm.whatsapp;

    let formatted = numbers;
    if (numbers.length > 2) {
      formatted = `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
    }
    if (numbers.length > 7) {
      formatted = `(${numbers.substring(0, 2)}) ${numbers.substring(2, 7)}-${numbers.substring(7, 11)}`;
    }
    return formatted;
  };

  // --- NOVA FUNÇÃO DE FORMATAÇÃO DE CEP ---
  const formatCep = (value: string): string => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length > 8) return contactForm.cep;

    if (numbers.length > 5) {
      return `${numbers.substring(0, 5)}-${numbers.substring(5, 8)}`;
    }
    return numbers;
  };

  // --- FUNÇÃO DE INPUT ATUALIZADA ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    let processedValue = value;
    if (name === "whatsapp") {
      processedValue = formatPhone(value);
    } else if (name === "cep") {
      processedValue = formatCep(value);
    }

    setContactForm((prev) => ({ ...prev, [name]: processedValue }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // --- SUBMIT ATUALIZADO ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNameValid = validateField("nome", contactForm.nome);
    const isEmailValid = validateField("email", contactForm.email);
    const isWhatsappValid = validateField("whatsapp", contactForm.whatsapp);
    const isCepValid = validateField("cep", contactForm.cep);

    if (!isNameValid || !isEmailValid || !isWhatsappValid || !isCepValid) {
      return;
    }

    setLoading(true);
    try {
      // Enviar dados para o webhook do CRM
      const webhookUrl =
        "https://api.datacrazy.io/v1/crm/api/crm/integrations/webhook/business/54169891-77a1-4507-a932-cb0556e7a6a7";

      const discount = calculateDiscount();
      const mensagemFollowUp = `CONFIRMAÇÃO DE TROCA - CompreFi\n\nCliente: ${contactForm.nome}\nEmail: ${contactForm.email}\nWhatsApp: ${contactForm.whatsapp}\nCEP: ${contactForm.cep}\n\nTROCA CONFIRMADA:\n* De: ${funnelData?.modeloAtual || ""} ${funnelData?.capacidadeAtual || ""}\n* Para: ${result?.produtoDesejado?.modelo || ""}\n\nVALORES FINAIS:\n* Valor do seu aparelho: ${formatCurrency(result?.valorAparelho)}\n* Valor a pagar: ${formatCurrency(result?.valorComDesconto)}\n${timeLeft > 0 ? `* Desconto Refinado Exclusivo: ${formatCurrency(discount)}` : "* Valor original (sem desconto)"}\n${result?.cupomDesconto ? `* Cupom: ${result.cupomDesconto}` : ""}\n\nConfirmado em: ${new Date().toLocaleString("pt-BR")}`;

      const webhookData = {
        // Dados de contato
        nome: contactForm.nome,
        email: contactForm.email,
        whatsapp: contactForm.whatsapp,
        cep: contactForm.cep,
        // Dados do aparelho atual
        modeloAtual: funnelData?.modeloAtual || "",
        capacidadeAtual: funnelData?.capacidadeAtual || "",
        corAtual: funnelData?.corAtual || "",
        bateriaAtual: funnelData?.bateriaAtual || 0,
        defeitos: funnelData?.defeitos || [],
        pecasTrocadas: funnelData?.pecasTrocadas || false,
        quaisPecas: funnelData?.quaisPecas || "",
        // Dados de qualificação
        ondeOuviu: funnelData?.ondeOuviu || "",
        tempoPensando: funnelData?.tempoPensando || "",
        urgenciaTroca: funnelData?.urgenciaTroca || "",
        // Produto desejado
        modeloDesejado: result?.produtoDesejado?.modelo || funnelData?.modeloDesejado || "",
        // Valores calculados
        valorBase: result?.valorBase || 0,
        valorAparelho: result?.valorAparelho || 0,
        depreciacaoBateria: result?.depreciacaoBateria || 0,
        depreciacaoDefeitos: result?.depreciacaoDefeitos || 0,
        valorFinal: result?.valorFinal || 0,
        valorComDesconto: result?.valorComDesconto || 0,
        cupomDesconto: result?.cupomDesconto || "",
        precisaCotacao: result?.precisaCotacao || false,
        // Mensagem pronta para follow-up via CRM
        mensagemFollowUp,
        // Metadata
        fonte: "funil-troca",
        dataEnvio: new Date().toISOString(),
      };

      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      }).catch((err) => console.error("Erro ao enviar webhook:", err));

      setShowResult(true);
    } catch (err) {
      console.error("Erro ao enviar:", err);
      setErrors((prev) => ({
        ...prev,
        general: "Erro ao enviar dados. Tente novamente.",
      }));
    } finally {
      setLoading(false);
    }
  };

  // --- MENSAGEM WHATSAPP ATUALIZADA ---
  const handleWhatsAppRedirect = () => {
    const discount = calculateDiscount();
    const message = `
*CONFIRMAÇÃO DE TROCA - CompreFi*

*Cliente:* ${contactForm.nome}
*Email:* ${contactForm.email}
*WhatsApp:* ${contactForm.whatsapp}
*CEP:* ${contactForm.cep}

*TROCA CONFIRMADA:*
• De: ${funnelData?.modeloAtual} ${funnelData?.capacidadeAtual}
• Para: ${result?.produtoDesejado?.modelo}

*VALORES FINAIS:*
• Valor do seu aparelho: ${formatCurrency(result?.valorAparelho)}
• Valor a pagar: ${formatCurrency(result?.valorComDesconto)}
${timeLeft > 0 ? `• Desconto Refinado Exclusivo: ${formatCurrency(discount)}` : "• Valor original (sem desconto)"}

*Confirmado em:* ${new Date().toLocaleString("pt-BR")}
    `.trim();
    const whatsappUrl = `https://wa.me/5534999252590?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    localStorage.removeItem("funnelData");
    localStorage.removeItem("tradeResult");
  };

  if (!result) {
    return (
      <div className="min-h-screen bg-funnel-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-funnel-primary mx-auto mb-4"></div>
          <p className="text-funnel-text-primary">Carregando...</p>
        </div>
      </div>
    );
  }

  const totalEconomy =
    (result?.precoProduto || 0) - (result?.valorComDesconto || 0);

  return (
    <div className="min-h-screen bg-funnel-background text-funnel-text-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-funnel-text-primary mb-4">
                  Sua Troca Personalizada Está Pronta!
                </h1>
                <p className="text-funnel-text-secondary text-lg">
                  Complete seus dados para desbloquear sua proposta exclusiva.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-900 to-orange-900 rounded-lg p-8 mb-8 border border-red-700 text-center">
                <h3 className="text-2xl font-bold text-white mb-3">
                  Desconto Refinado Exclusivo Expira Em:
                </h3>
                <div className="text-5xl font-mono font-bold text-funnel-warning mb-3">
                  {formatTime(timeLeft)}
                </div>
                {timeLeft > 0 ? (
                  <p className="text-orange-200 text-lg">
                    Economia de {formatCurrency(calculateDiscount())} • Apenas
                    hoje!
                  </p>
                ) : (
                  <p className="text-red-300 text-sm mt-2">
                    Você perdeu o desconto exclusivo, mas ainda pode garantir os
                    4 bônus se fechar hoje. Não perca!
                  </p>
                )}
              </div>

              <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-lg p-6 mb-8 border border-green-700 text-center">
                <h3 className="text-xl font-bold text-white mb-2">
                  Você está a um passo de economizar
                </h3>
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {formatCurrency(totalEconomy)}
                </div>
                <p className="text-green-200">
                  na troca do seu {funnelData?.modeloAtual} por um <br></br>
                  {result?.produtoDesejado?.modelo}
                </p>
                <div className="mt-4 p-4 bg-green-800 bg-opacity-50 rounded-lg text-left text-sm">
                  <p className="text-green-300 font-semibold mb-2">
                    Ao desbloquear, você verá:
                  </p>
                  <ul className="space-y-1 text-green-200">
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>O valor exato que pagaremos no seu iPhone.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>
                        O cálculo detalhado da depreciação (100% transparente).
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>
                        O valor final com seu Desconto Refinado Exclusivo.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">✓</span>
                      <span>Acesso a 4 Bônus Exclusivos da CompreFi.</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mb-12 space-y-6">
                {/* <h3 className="text-2xl font-bold text-center text-funnel-text-primary">
                  Junte-se a milhares de clientes satisfeitos
                </h3> */}

                <div className="bg-funnel-surface p-4 rounded-lg border border-funnel-surface-light flex items-start">
                  {/* <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Foto do cliente"
                    className="w-12 h-12 rounded-full mr-4 border-2 border-funnel-primary"
                  /> */}
                  <div>
                    <p className="text-funnel-text-secondary italic">
                      "Comprei meu iPhone na CompreFi e fiquei impressionado com
                      a qualidade do atendimento. Recomendo!"
                    </p>
                    <p className="text-right font-semibold text-funnel-text-primary mt-2">
                      - Carlos Silva
                    </p>
                  </div>
                </div>
                <div className="bg-funnel-surface p-4 rounded-lg border border-funnel-surface-light flex items-start">
                  {/* <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    alt="Foto do cliente"
                    className="w-12 h-12 rounded-full mr-4 border-2 border-funnel-primary"
                  /> */}
                  <div>
                    <p className="text-funnel-text-secondary italic">
                      "Muuuuito obrigada Gustavo. Pelo atendimento e agilidade.
                      To muito feliz com meu novo celular. Você ganhou uma
                      cliente e vai ganhar mais alguns hahaha pq vou super
                      indicar "
                    </p>
                    <p className="text-right font-semibold text-funnel-text-primary mt-2">
                      - Luana Bernardes
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-funnel-surface rounded-lg p-8 border border-funnel-surface-light">
                <h3 className="text-2xl font-bold text-funnel-text-primary mb-2 text-center">
                  Desbloqueie Sua Proposta
                </h3>
                <p className="text-funnel-text-secondary mb-6 text-center">
                  Preencha para ver os detalhes e garantir seus bônus.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-funnel-text-secondary mb-2">
                      Nome completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      required
                      value={contactForm.nome}
                      onChange={handleInputChange}
                      onBlur={(e) =>
                        validateField(e.target.name, e.target.value)
                      }
                      className={`w-full px-4 py-4 bg-funnel-surface-light border rounded-md text-funnel-text-primary placeholder-gray-400 focus:border-funnel-primary focus:outline-none text-lg ${errors.nome ? "border-funnel-error" : "border-gray-600"}`}
                      placeholder="Seu nome e sobrenome"
                    />
                    {errors.nome && (
                      <p className="text-funnel-error text-sm mt-2">
                        {errors.nome}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-funnel-text-secondary mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={contactForm.email}
                      onChange={handleInputChange}
                      onBlur={(e) =>
                        validateField(e.target.name, e.target.value)
                      }
                      className={`w-full px-4 py-4 bg-funnel-surface-light border rounded-md text-funnel-text-primary placeholder-gray-400 focus:border-funnel-primary focus:outline-none text-lg ${errors.email ? "border-funnel-error" : "border-gray-600"}`}
                      placeholder="seu@email.com"
                    />
                    {errors.email && (
                      <p className="text-funnel-error text-sm mt-2">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-funnel-text-secondary mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      required
                      value={contactForm.whatsapp}
                      onChange={handleInputChange}
                      onBlur={(e) =>
                        validateField(e.target.name, e.target.value)
                      }
                      className={`w-full px-4 py-4 bg-funnel-surface-light border rounded-md text-funnel-text-primary placeholder-gray-400 focus:border-funnel-primary focus:outline-none text-lg ${errors.whatsapp ? "border-funnel-error" : "border-gray-600"}`}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.whatsapp && (
                      <p className="text-funnel-error text-sm mt-2">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  {/* --- NOVO CAMPO DE CEP --- */}
                  <div>
                    <label className="block text-sm font-medium text-funnel-text-secondary mb-2">
                      CEP (para agilizar a visita) *
                    </label>
                    <input
                      type="tel"
                      name="cep"
                      required
                      value={contactForm.cep}
                      onChange={handleInputChange}
                      onBlur={(e) =>
                        validateField(e.target.name, e.target.value)
                      }
                      className={`w-full px-4 py-4 bg-funnel-surface-light border rounded-md text-funnel-text-primary placeholder-gray-400 focus:border-funnel-primary focus:outline-none text-lg ${errors.cep ? "border-funnel-error" : "border-gray-600"}`}
                      placeholder="00000-000"
                    />
                    {errors.cep && (
                      <p className="text-funnel-error text-sm mt-2">
                        {errors.cep}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-funnel-primary hover:opacity-90 disabled:bg-gray-600 text-funnel-text-on-primary font-bold py-5 px-6 rounded-md transition-all duration-200 flex items-center justify-center text-lg"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Desbloqueando...
                      </>
                    ) : (
                      "Desbloquear Minha Proposta Completa"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-funnel-text-secondary text-sm">
                    Seus dados estão seguros.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto bg-funnel-success rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-funnel-text-primary mb-4">
                  Parabéns, {contactForm.nome.split(" ")[0]}!
                </h1>
                <p className="text-funnel-text-secondary text-lg">
                  Sua proposta exclusiva foi desbloqueada. Veja os detalhes:
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg p-8 border border-blue-700 mb-8">
                <h3 className="text-2xl font-bold text-white mb-6 text-center">
                  Resumo da Sua Oferta Refinada
                </h3>
                <div className="space-y-4 text-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">
                      Crédito pelo seu {funnelData?.modeloAtual}:
                    </span>
                    <span className="font-bold text-white">
                      {formatCurrency(result?.valorAparelho)}
                    </span>
                  </div>
                  {timeLeft > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-blue-200">
                        Desconto Refinado Exclusivo:
                      </span>
                      <span className="font-bold text-white">
                        - {formatCurrency(calculateDiscount())}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200">4 Bônus Exclusivos:</span>
                    <span className="font-bold text-white">Inclusos</span>
                  </div>
                  <hr className="border-blue-600" />
                  <div className="flex justify-between items-center text-2xl">
                    <span className="font-bold text-white">
                      Sua Economia Total Hoje:
                    </span>
                    <span className="font-bold text-green-400">
                      {formatCurrency(totalEconomy)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-funnel-surface rounded-lg p-6 border border-funnel-surface-light mb-8">
                <h3 className="text-xl font-bold text-funnel-text-primary mb-6 text-center">
                  Breakdown Completo da Sua Troca
                </h3>

                <div className="space-y-4">
                  <div className="bg-funnel-surface-light rounded-lg p-4">
                    <h4 className="text-funnel-text-primary font-medium mb-3">
                      Seu Aparelho Atual:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-funnel-text-secondary">
                          Modelo:
                        </span>
                        <span className="text-funnel-text-primary">
                          {funnelData?.modeloAtual}{" "}
                          {funnelData?.capacidadeAtual}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-funnel-text-secondary">
                          Valor base:
                        </span>
                        <span className="text-funnel-text-primary">
                          {formatCurrency(result?.valorBase)}
                        </span>
                      </div>
                      <div className="flex justify-between text-red-400">
                        <span>
                          Depreciação bateria ({funnelData?.bateriaAtual}%):
                        </span>
                        <span>
                          - {formatCurrency(result?.depreciacaoBateria)}
                        </span>
                      </div>
                      <div className="flex justify-between text-red-400">
                        <span>Depreciação defeitos:</span>
                        <span>
                          - {formatCurrency(result?.depreciacaoDefeitos)}
                        </span>
                      </div>
                      <hr className="border-gray-700 my-2" />
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-funnel-text-primary">
                          Valor final do seu aparelho:
                        </span>
                        <span className="text-funnel-success">
                          {formatCurrency(result?.valorAparelho)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-900 bg-opacity-30 rounded-lg p-4 border border-blue-700">
                    <h4 className="text-white font-medium mb-3">
                      Aparelho Desejado:
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Modelo:</span>
                        <span className="text-white">
                          {result?.produtoDesejado?.modelo}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Preço original:</span>
                        <span className="text-white">
                          {formatCurrency(result?.precoProduto)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">
                          Valor a pagar (original):
                        </span>
                        <span className="text-yellow-400">
                          {formatCurrency(result?.valorFinal)}
                        </span>
                      </div>
                      {timeLeft > 0 && (
                        <div className="flex justify-between text-lg font-bold text-green-400">
                          <span className="text-white">
                            Com Desconto Refinado Exclusivo:
                          </span>
                          <span className="text-funnel-success">
                            {formatCurrency(result?.valorComDesconto)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-funnel-text-secondary text-xs mt-4 text-center">
                  Nota sobre a avaliação: Esta é baseada nas suas respostas.
                  Nossa equipe fará uma verificação final do aparelho para
                  confirmar as condições e garantir o valor mais justo para
                  você.
                </p>
              </div>

              <div className="bg-funnel-surface rounded-lg p-6 border border-funnel-surface-light mb-8">
                <h3 className="text-xl font-bold text-funnel-text-primary mb-6 text-center flex items-center justify-center">
                  <Gift className="w-6 h-6 mr-3 text-funnel-primary" />
                  Seus Bônus Exclusivos Desbloqueados
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-funnel-surface-light rounded-lg">
                    <ShieldCheck className="w-8 h-8 text-funnel-success mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-funnel-text-primary">
                        Suporte Eterno
                      </h4>
                      <p className="text-sm text-funnel-text-secondary">
                        Qualquer dúvida sobre o uso do seu aparelho ou
                        necessidade de orientação, nossa equipe estará aqui para
                        te ajudar. Para sempre e sem custo adicional.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-funnel-surface-light rounded-lg">
                    <Percent className="w-8 h-8 text-funnel-success mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-funnel-text-primary">
                        Até 20% OFF em Acessórios Originais
                      </h4>
                      <p className="text-sm text-funnel-text-secondary">
                        Como nosso cliente, você tem acesso a descontos
                        exclusivos em toda a nossa linha de acessórios originais
                        Apple.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-funnel-surface-light rounded-lg">
                    <Repeat className="w-8 h-8 text-funnel-success mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-funnel-text-primary">
                        Garantia de Recompra Futura
                      </h4>
                      <p className="text-sm text-funnel-text-secondary">
                        Quando decidir trocar este novo iPhone no futuro, nós
                        garantimos a recompra dele, facilitando seu próximo
                        upgrade e valorizando seu investimento.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-funnel-surface-light rounded-lg">
                    <Users className="w-8 h-8 text-funnel-success mr-4 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-funnel-text-primary">
                        Acesso ao Programa de Indicações
                      </h4>
                      <p className="text-sm text-funnel-text-secondary">
                        Indique amigos e acumule descontos para a sua próxima
                        troca. Quanto mais amigos você traz, mais você economiza
                        no futuro.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mb-8 bg-funnel-surface p-6 rounded-lg border border-funnel-surface-light">
                <h3 className="text-2xl font-bold text-funnel-text-primary mb-4">
                  Próximo Passo: Agende sua Troca
                </h3>
                <p className="text-funnel-text-secondary mb-6">
                  Clique no botão abaixo para confirmar sua compra no WhatsApp e
                  agendar a sua entrega.
                </p>
                <button
                  onClick={handleWhatsAppRedirect}
                  className="bg-funnel-success hover:opacity-90 text-white font-bold py-4 px-8 rounded-md transition-all"
                >
                  <MessageSquare className="w-6 h-6 mr-3" />
                  Confirmar Troca no WhatsApp
                </button>
                <div className="text-left mt-6 space-y-2 text-funnel-text-secondary text-sm">
                  <p>
                    <strong>Como funciona:</strong>
                  </p>
                  <p>
                    1. <strong>Confirme no WhatsApp:</strong> Nossa equipe irá
                    validar sua proposta, tirar todas as suas dúvidas, e enviar
                    o link de pagamento ou chave Pix.
                  </p>
                  <p>
                    2. <strong>Agende a Visita:</strong> Combinaremos o melhor
                    dia e horário para irmos até você.
                  </p>
                  <p>
                    3. <strong>Receba e Troque:</strong> Entregamos seu novo
                    iPhone em mãos e ajudamos na transferência de dados na hora.
                    simples, rápido, seguro e Refinado.
                  </p>
                </div>
              </div>

              <div className="bg-funnel-surface rounded-lg border border-funnel-surface-light">
                <button
                  onClick={() => setShowFAQ(!showFAQ)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <h3 className="text-xl font-bold text-funnel-text-primary">
                    Perguntas Frequentes
                  </h3>
                  <svg
                    className={`w-6 h-6 text-funnel-text-secondary transform transition-transform ${
                      showFAQ ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {showFAQ && (
                  <div className="px-6 pb-6 space-y-4">
                    <div>
                      <h4 className="text-funnel-text-primary font-medium mb-2">
                        Como funciona a troca?
                      </h4>
                      <p className="text-funnel-text-secondary text-sm">
                        É simples, rápido, seguro e Refinado. Após confirmar sua
                        compra, nossa equipe agenda uma visita para ir até você.
                        Entregamos seu novo iPhone em mãos e te ajudamos com a
                        transferência de todos os seus dados.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-funnel-text-primary font-medium mb-2">
                        Como é feita a avaliação final?
                      </h4>
                      <p className="text-funnel-text-secondary text-sm">
                        Nossa equipe técnica faz uma verificação rápida do seu
                        aparelho no momento da troca para confirmar as condições
                        que você informou no questionário. O objetivo é garantir
                        uma troca justa e transparente para ambos.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-funnel-text-primary font-medium mb-2">
                        Qual a garantia?
                      </h4>
                      <p className="text-funnel-text-secondary text-sm">
                        Todos os produtos têm garantia completa de 1 ano com a
                        Apple. E você terá Suporte Eterno com a CompreFi.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-funnel-text-primary font-medium mb-2">
                        Posso adicionar acessórios ao meu pedido com desconto?
                      </h4>
                      <p className="text-funnel-text-secondary text-sm">
                        Com certeza! Como nosso cliente Refinado, você tem até
                        20% de desconto em acessórios originais. Basta informar
                        à nossa equipe no WhatsApp quais itens você gostaria de
                        adicionar, e eles incluirão na sua proposta final.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-funnel-text-primary font-medium mb-2">
                        Posso cancelar?
                      </h4>
                      <p className="text-funnel-text-secondary text-sm">
                        Sim, você pode cancelar a qualquer momento antes da
                        finalização da troca e deve avisar com antecedência à
                        visita.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
