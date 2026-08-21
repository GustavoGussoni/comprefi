import React from "react";
import PageTransition from "../components/PageTransition";
import {
  Monitor,
  Zap,
  MessageCircle,
  ArrowRight,
  Cpu,
  Wind,
  HardDrive,
  Palette,
  Layout,
  Eye,
  BatteryCharging,
} from "lucide-react";

const WHATSAPP_URL = "https://wa.me/5534999252590?text=Oi%20Gussoni%2C%20vim%20pelo%20guia%20MacBook%20e%20quero%20ajuda%20para%20escolher%20o%20meu.";

const DicasMac: React.FC = () => {
  return (
    <PageTransition>
      <div className="bg-black min-h-screen">
        {/* ===== HERO ===== */}
        <section className="container mx-auto px-4 pt-16 pb-12 md:pt-24 md:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-[#ff6100] font-medium text-sm uppercase tracking-wider mb-4">
              Guia MacBook — Compra Inteligente
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Como escolher e usar o Mac certo<br className="hidden md:block" /> para trabalhar sem parar.
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Você não precisa descobrir tudo sozinho. Aprenda a escolher a configuração
              certa para a sua rotina e descubra como extrair o máximo do seu Mac.
            </p>
          </div>
        </section>

        {/* ===== PARTE 1: COMO ESCOLHER ===== */}
        <section className="bg-gray-950 py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Air, Pro ou Neo? O que realmente importa.
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Muitas pessoas gastam milhares a mais em um Pro quando um Air resolveria perfeitamente.
                Outras economizam comprando 8GB de RAM e descobrem, seis meses depois, que a máquina trava.
              </p>
            </div>

            <div className="space-y-8">
              {/* MacBook Air */}
              <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                    <Wind className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      MacBook Air — O equilíbrio perfeito
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Para advogados, médicos, empreendedores, estudantes e pessoas que viajam muito.
                      Quem usa o computador para navegação, planilhas, documentos, apresentações e
                      até edição leve de fotos e vídeos.
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1 font-medium">O que ninguém te conta:</p>
                      <p className="text-gray-200 text-sm">
                        O Air não tem ventoinha. Ele é 100% silencioso e não junta poeira por dentro.
                        Para 90% das pessoas, um Air com 16GB ou 24GB de RAM é melhor que um Pro básico.
                        Ele é mais leve, mais fino e tem a mesma duração de bateria.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MacBook Pro */}
              <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center shrink-0">
                    <Cpu className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      MacBook Pro — Para quem não pode perder um segundo de render
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Para editores de vídeo (4K/8K), programadores pesados, designers 3D,
                      produtores musicais e engenheiros. Quem precisa de performance sustentada
                      por horas sem queda.
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1 font-medium">O que ninguém te conta:</p>
                      <p className="text-gray-200 text-sm">
                        A tela do Pro (Liquid Retina XDR com ProMotion de 120Hz) faz diferença real
                        para quem trabalha com cor e fluidez visual. Ele tem ventoinha, então não
                        perde performance quando fica horas trabalhando no máximo. Se você não
                        sabe se precisa de um Pro, provavelmente não precisa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* MacBook Neo */}
              <div className="bg-gray-900 rounded-xl p-6 md:p-8 border border-gray-800">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center shrink-0">
                    <Palette className="w-6 h-6 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      MacBook Neo — O novo integrante
                    </h3>
                    <p className="text-gray-300 leading-relaxed mb-4">
                      Para quem busca o design mais moderno e portabilidade extrema com as novas
                      cores (Blush, Citrus, Indigo, Silver). A porta de entrada para o mundo Apple com estilo.
                    </p>
                    <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                      <p className="text-sm text-gray-400 mb-1 font-medium">O que ninguém te conta:</p>
                      <p className="text-gray-200 text-sm">
                        Excelente para uso cotidiano e trabalho leve. Para uso profissional intenso
                        (muitas abas, apps pesados, edição), o Air ou Pro com mais RAM ainda são
                        as escolhas de segurança a longo prazo.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regra de Ouro */}
            <div className="mt-12 bg-gradient-to-r from-[#ff6100]/10 to-orange-900/10 rounded-xl p-6 md:p-8 border border-[#ff6100]/30">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#ff6100]" />
                A regra de ouro: RAM e Armazenamento
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <HardDrive className="w-4 h-4 text-gray-400" />
                    <p className="text-white font-medium">RAM (Memória)</p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong className="text-red-400">8GB:</strong> Evite para trabalho. O mínimo para
                    tranquilidade hoje são 16GB. Se você trabalha com muitas abas, apps simultâneos
                    ou edição, vá direto para 24GB ou mais.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Monitor className="w-4 h-4 text-gray-400" />
                    <p className="text-white font-medium">Armazenamento (SSD)</p>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <strong className="text-yellow-400">Importante:</strong> O armazenamento do Mac
                    não pode ser trocado depois. Se você trabalha com arquivos pesados, vá direto
                    para 512GB ou 1TB. Não economize aqui.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PARTE 2: DICAS DE PRODUTIVIDADE ===== */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                5 hábitos para extrair o máximo do seu Mac
              </h2>
              <p className="text-gray-400">
                Comprar bem é o primeiro passo. Usar bem é o segundo.
              </p>
            </div>

            <div className="space-y-6">
              {/* Dica 1 */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-[#ff6100] shrink-0">01</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Esqueça o Mouse. Domine o Trackpad.
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      O trackpad do Mac não é como o dos outros notebooks. Ele é a principal
                      ferramenta de produtividade. Ative os gestos em Ajustes do Sistema &gt; Trackpad.
                      Deslize com 3 dedos para cima para ver todas as janelas (Mission Control).
                      Deslize para os lados para alternar entre áreas de trabalho. Depois que você
                      se acostuma, o mouse parece lento.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica 2 */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-[#ff6100] shrink-0">02</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      Spotlight: Seu Assistente Invisível
                      <kbd className="text-xs bg-gray-700 px-2 py-0.5 rounded text-gray-300">⌘ + Espaço</kbd>
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Pare de procurar aplicativos no Launchpad ou arquivos em pastas. Pressione
                      Command + Espaço, digite o que precisa e aperte Enter. O Spotlight abre apps,
                      encontra arquivos, faz contas matemáticas, converte moedas e busca na web —
                      tudo em milissegundos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica 3 */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-[#ff6100] shrink-0">03</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Layout className="w-4 h-4" />
                      Hot Corners (Cantos de Acesso Rápido)
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Configure os cantos da tela para ações rápidas. Arraste o mouse para o canto
                      inferior direito para criar uma Nota Rápida. Canto superior esquerdo para ver
                      a Mesa. Canto superior direito para bloquear a tela. Configure em
                      Ajustes &gt; Mesa e Dock &gt; Hot Corners. Parece simples, mas economiza
                      dezenas de cliques por dia.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica 4 */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-[#ff6100] shrink-0">04</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Quick Look (Visualização Rápida)
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Não abra o arquivo para ver o que tem dentro. Selecione qualquer arquivo,
                      foto ou PDF e aperte a Barra de Espaço. Ele abre instantaneamente em
                      pré-visualização. Aperte de novo e fecha. Funciona com imagens, vídeos,
                      documentos, planilhas — quase tudo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dica 5 */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-start gap-4">
                  <span className="text-2xl font-bold text-[#ff6100] shrink-0">05</span>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <BatteryCharging className="w-4 h-4" />
                      Cuide da Bateria (Ela Cuida de Você)
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      A bateria do Mac é inteligente. Deixe o "Carregamento Otimizado" sempre
                      ativado (Ajustes &gt; Bateria). Ele aprende a sua rotina e segura a carga
                      em 80% até perto da hora que você costuma tirar da tomada, prolongando a
                      vida útil por anos. Não precisa ficar desligando e ligando na tomada
                      obsessivamente — o Mac gerencia sozinho.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA PRINCIPAL ===== */}
        <section className="bg-gray-950 py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <MessageCircle className="w-12 h-12 text-[#ff6100] mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Precisa de ajuda para escolher o seu próximo Mac?
            </h2>
            <p className="text-gray-300 text-lg mb-4 max-w-2xl mx-auto">
              Não passe horas lendo fóruns e vendo vídeos no YouTube para tentar descobrir sozinho.
              Manda mensagem pro Gussoni. A gente analisa a sua rotina, o seu trabalho e te indica
              a configuração exata para você não ter dor de cabeça.
            </p>
            <p className="text-gray-500 text-sm mb-8 italic">
              "Você continua trabalhando. A gente cuida do resto."
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

        {/* ===== FRASE FINAL ===== */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p className="text-gray-500 text-lg italic">
              "Quem compra bem trabalha tranquilo."
            </p>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default DicasMac;
