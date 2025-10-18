import React from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";
import TestimonialCard from "../components/TestimonialCard";
import CategoryCard from "../components/CategoryCard";
import ImageLoader from "../components/ImageLoader";

// Imagens
import desktopBanner from "../assets/images/IMG_2816_desktop.png";
import mobileBanner from "../assets/images/IMG_2791.png";

interface HomeProps {
  isMobile: boolean;
}

const Home: React.FC<HomeProps> = ({ isMobile }) => {
  // Dados dos depoimentos
  const testimonials = [
    {
      name: "Carlos Silva",
      text: "Comprei meu iPhone na CompreFi e fiquei impressionado com a qualidade do atendimento. Recomendo!",
      rating: 5,
    },
    {
      name: "Madu",
      text: "Com certeza vou recomendar você pra quem perguntar algo, um dos únicos que se preocupou em achar oq eu queria.",
      rating: 5,
    },
    {
      name: "Luana Bernardes",
      text: "Muuuuito obrigada Gustavo. Pelo atendimento e agilidade. To muito feliz com meu novo celular. Você ganhou uma cliente e vai ganhar mais alguns hahaha pq vou super indicar",
      rating: 5,
    },
  ];

  return (
    <div className="home-container">
      {/* Parábola - Padrão de Interrupção (Russell Brunson) */}
      <section className="parable-section max-w-4xl mx-auto py-16 px-4 border-b border-gray-800">
        <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
            A Verdade Sobre{" "}
            <span className="text-[#ff6100]">Ofertas Tentadoras</span>
          </h2>

          <div className="space-y-6 text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto">
            <p>
              Você não pode ver, tocar ou segurar a gravidade. Mas basta dar um
              passo para fora de uma borda... e você aprende, da forma mais
              dura, que ela existe.
            </p>

            <p>
              Da mesma forma, somos levados a acreditar que "produto Apple a
              preço de banana" é real.
            </p>

            <p>
              Assim como a gravidade, você pode até tentar negar o óbvio: a cara
              de golpe dessas ofertas.
            </p>

            <p>
              Mas quem já caiu, sabe — a frustração de perder dinheiro com um
              golpe não some nunca. Ela deixa cicatriz.
            </p>

            <p className="font-semibold text-white">
              Em vez disso, descubra uma nova forma de fazer upgrade no seu
              setup Apple todo ano — com segurança, confiança e economia real.
              Sem sustos. Sem promessas falsas. E com a experiência premium que
              você merece.
            </p>
          </div>
        </div>
      </section>

      {/* Banner Principal com ImageLoader */}
      <section className="banner-section w-full">
        <ImageLoader
          src={isMobile ? mobileBanner : desktopBanner}
          alt="CompreFi - Produtos Apple Premium"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* História Pessoal - Dividida em seções para melhor engajamento */}
      <section className="story-section max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Minha Jornada
        </h2>

        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="story-block">
            <p className="text-lg text-gray-200 leading-relaxed">
              Um dia, me vi sentado numa sala, trabalhando duro… mas para
              realizar o sonho de outra pessoa. Eu vendia para uma grande
              empresa do setor alimentício. Tinha um bom salário, estabilidade —
              o que muitos considerariam sucesso. Mas, por dentro, eu estava
              vazio.
            </p>
          </div>

          <div className="story-block">
            <p className="text-lg text-gray-200 leading-relaxed">
              Buscando propósito, entrei no mercado financeiro. Achei que seria
              uma jornada de aprendizado e liberdade, mas acabei perdendo tudo.
              Foi um dos momentos mais difíceis da minha vida.
            </p>
          </div>

          <div className="story-block">
            <p className="text-lg text-gray-200 leading-relaxed">
              Depois de muita reflexão, percebi: eu nunca deveria ter parado de
              servir pessoas. Sempre fui movido por oferecer uma experiência de
              compra de verdade — daquelas que encantam, que surpreendem, que
              criam vínculos.
            </p>
          </div>

          <div className="story-block">
            <p className="text-lg text-gray-200 leading-relaxed">
              Foi então que decidi voltar às minhas raízes. Escolhi trabalhar
              com algo que eu realmente amava: Apple. Me aprofundei, estudei,
              vivi o ecossistema — e me tornei especialista.
            </p>
            <p className="text-lg text-gray-200 leading-relaxed mt-4 font-semibold">
              Hoje, ajudo clientes Apple exigentes, que valorizam segurança,
              confiança e agilidade, a atualizarem seus produtos com
              tranquilidade, muitas vezes economizando de R$300 a quase R$20.000
              — tudo isso sem abrir mão da experiência premium que eles merecem.
            </p>
          </div>
        </div>
      </section>

      {/* Depoimentos com TestimonialCard */}
      <section className="testimonials-section py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          O Que Nossos Clientes Dizem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              text={testimonial.text}
              rating={testimonial.rating}
            />
          ))}
        </div>
      </section>

      {/* Módulo de Categorias com CategoryCard */}
      <section className="categories-section py-16 px-4 bg-gray-900">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          Nossos Produtos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <CategoryCard
            title="iPhones Seminovos"
            link="/iphones-seminovos"
            description="Aparelhos em excelente estado com garantia de 120 dias"
          />
          <CategoryCard
            title="iPhones Novos"
            link="/iphones-novos"
            description="Lacrados com 1 ano de garantia Apple"
          />
          <CategoryCard
            title="MacBooks"
            link="/macbooks"
            description="MacBook Apple. Desempenho excepcional"
          />
          <CategoryCard
            title="iPads"
            link="/ipads"
            description="iPad. Versátil e potente para trabalho, estudo e entretenimento"
          />
          <CategoryCard
            title="Apple Watch"
            link="/apple-watch"
            description="Nada melhor que um Apple Watch para monitorar sua saúde e atividades"
          />
          <CategoryCard
            title="Acessórios"
            link="/acessorios"
            description="Complementos originais para seus dispositivos Apple"
          />
        </div>
      </section>

      {/* Por que escolher a CompreFi */}
      <section className="why-choose-section py-16 px-4 ">
        <WhyChooseCompreFi />
      </section>

      {/* FAQ */}
      <section className="faq-section py-16 px-4">
        <FAQ />
      </section>

      {/* NOVA SEÇÃO: Escolha Seu Caminho - Conexão com Funis */}
      <section className="choose-path-section py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center text-white">
            Escolha Seu Caminho
          </h2>
          <p className="text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto">
            Seja para trocar seu iPhone atual ou aprender como economizar na
            compra de produtos Apple, temos a solução perfeita para você.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Card 1: TradeFunnel */}
            <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-8 border-2 border-blue-600 hover:border-blue-400 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto bg-blue-600 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Quer Trocar Seu iPhone?
                </h3>
                <p className="text-blue-100 text-lg mb-6">
                  Descubra quanto vale seu iPhone atual e quanto você economiza
                  na troca por um modelo mais novo.
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-blue-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Avaliação instantânea do seu aparelho</span>
                </li>
                <li className="flex items-start text-blue-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Proposta personalizada em minutos</span>
                </li>
                <li className="flex items-start text-blue-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Bônus exclusivos desbloqueados</span>
                </li>
              </ul>

              <Link
                to="/trocar-de-iphone"
                className="block w-full bg-white hover:bg-gray-100 text-blue-900 font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center text-lg shadow-lg"
              >
                Calcular Minha Troca Agora →
              </Link>
            </div>

            {/* Card 2: Economia (Lead Magnet) */}
            <div className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-2xl p-8 border-2 border-orange-600 hover:border-orange-400 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto bg-orange-600 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Quer Aprender a Economizar?
                </h3>
                <p className="text-orange-100 text-lg mb-6">
                  Receba nosso guia exclusivo e descubra como economizar de
                  R$300 a R$20.000 em produtos Apple.
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start text-orange-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Guia completo de economia em produtos Apple</span>
                </li>
                <li className="flex items-start text-orange-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Como evitar as 5 armadilhas mais comuns</span>
                </li>
                <li className="flex items-start text-orange-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-3 text-green-400 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Acesso imediato por email</span>
                </li>
              </ul>

              <Link
                to="/economia"
                className="block w-full bg-white hover:bg-gray-100 text-orange-900 font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center text-lg shadow-lg"
              >
                Baixar Guia Gratuito →
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-400 mt-8 text-sm">
            Mais de 1.400 clientes já escolheram a CompreFi para suas compras
            Apple
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
