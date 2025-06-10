import React from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";

// Imagens
import desktopBanner from "../assets/images/IMG_2816_desktop.png";
import mobileBanner from "../assets/images/IMG_2791.png";

interface HomeProps {
  isMobile: boolean;
}

const Home: React.FC<HomeProps> = ({ isMobile }) => {
  return (
    <div className="home-container">
      {/* Banner Principal */}
      <section className="banner-section w-full">
        <img
          src={isMobile ? mobileBanner : desktopBanner}
          alt="CompreFi - Produtos Apple Premium"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Parábola - Padrão de Interrupção (Russell Brunson) */}
      <section className="parable-section max-w-4xl mx-auto py-16 px-4 border-b border-gray-800">
        <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
            A Verdade Sobre{" "}
            <span className="text-[#ff6100]">Ofertas Tentadoras</span>
          </h2>

          <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
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

          <div className="mt-8 flex justify-center">
            <Link
              to="/iphones-seminovos"
              className="bg-[#ff6100] hover:bg-[#e55a00] text-white py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              Descubra Como
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* História Pessoal - Dividida em seções para melhor engajamento */}
      <section className="story-section max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          Minha Jornada
        </h2>

        <div className="story-block mb-10">
          {/* <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#ff6100]">
            Início
          </h3> */}
          <p className="text-lg text-gray-200 leading-relaxed">
            Um dia, me vi sentado numa sala, trabalhando duro… mas para realizar
            o sonho de outra pessoa. Eu vendia para uma grande empresa do setor
            alimentício. Tinha um bom salário, estabilidade — o que muitos
            considerariam sucesso. Mas, por dentro, eu estava vazio.
          </p>
        </div>

        <div className="story-block mb-10">
          {/* <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#ff6100]">
            Mudança
          </h3> */}
          <p className="text-lg text-gray-200 leading-relaxed">
            Buscando propósito, entrei no mercado financeiro. Achei que seria
            uma jornada de aprendizado e liberdade, mas acabei perdendo tudo.
            Foi um dos momentos mais difíceis da minha vida.
          </p>
        </div>

        <div className="story-block mb-10">
          {/* <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#ff6100]">
            Reflexão
          </h3> */}
          <p className="text-lg text-gray-200 leading-relaxed">
            Depois de muita reflexão, percebi: eu nunca deveria ter parado de
            servir pessoas. Sempre fui movido por oferecer uma experiência de
            compra de verdade — daquelas que encantam, que surpreendem, que
            criam vínculos.
          </p>
        </div>

        <div className="story-block">
          {/* <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#ff6100]">
            Renascimento
          </h3> */}
          <p className="text-lg text-gray-200 leading-relaxed">
            Foi então que decidi voltar às minhas raízes. Escolhi trabalhar com
            algo que eu realmente amava: Apple. Me aprofundei, estudei, vivi o
            ecossistema — e me tornei especialista.
          </p>
          <p className="text-lg text-gray-200 leading-relaxed mt-4 font-semibold">
            Hoje, ajudo clientes Apple exigentes, que valorizam segurança,
            confiança e agilidade, a atualizarem seus produtos com
            tranquilidade, muitas vezes economizando de R$300 a quase R$20.000 —
            tudo isso sem abrir mão da experiência premium que eles merecem.
          </p>
        </div>
      </section>

      {/* Módulo de Categorias */}
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
            description="Notebooks Apple com desempenho excepcional"
          />
          <CategoryCard
            title="iPads"
            link="/ipads"
            description="Tablets versáteis para trabalho e entretenimento"
          />
          <CategoryCard
            title="Apple Watch"
            link="/apple-watch"
            description="Smartwatches para monitorar sua saúde e atividades"
          />
          <CategoryCard
            title="Acessórios"
            link="/acessorios"
            description="Complementos originais para seus dispositivos Apple"
          />
        </div>
      </section>

      {/* Espaço para Depoimentos - Será implementado quando o usuário enviar os depoimentos */}
      <section className="testimonials-section py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          O Que Nossos Clientes Dizem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#ff6100]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 mb-4 italic">
              "Comprei meu iPhone na CompreFi e fiquei impressionado com a
              qualidade do atendimento. Recomendo!"
            </p>
            <p className="text-white font-medium">Carlos Silva</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#ff6100]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 mb-4 italic">
              "Com certeza vou recomendar você pra quem perguntar algo, um dos
              únicos que se preocupou em achar oq eu queria."
            </p>
            <p className="text-white font-medium">Madu</p>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex mb-4">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#ff6100]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-300 mb-4 italic">
              "Muuuuito obrigada Gustavo. Pelo atendimento e agilidade. To muito
              feliz com meu novo celular. Você ganhou uma cliente e vai ganhar
              mais alguns hahaha pq vou super indicar "
            </p>
            <p className="text-white font-medium">Luana Bernardes</p>
          </div>
        </div>
      </section>

      {/* Por que escolher a CompreFi */}
      <section className="why-choose-section py-16 px-4">
        <WhyChooseCompreFi />
      </section>

      {/* FAQ */}
      <section className="faq-section py-16 px-4">
        <FAQ />
      </section>
    </div>
  );
};

// Componente de Card para Categorias
interface CategoryCardProps {
  title: string;
  link: string;
  description: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  link,
  description,
}) => {
  return (
    <Link
      to={link}
      className="category-card block bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#ff6100]/20 hover:-translate-y-1 cursor-pointer"
    >
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="text-[#ff6100] font-medium flex items-center">
          Ver produtos
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default Home;
