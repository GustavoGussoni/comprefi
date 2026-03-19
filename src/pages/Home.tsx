import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import WhyChooseCompreFi from "../components/WhyChooseCompreFi";

// Imagens
import desktopBanner from "../assets/images/IMG_2816_desktop.png";
import mobileBanner from "../assets/images/IMG_2791.png";
import locsBanner from "../assets/images/MAPA-BRASIL-LOCAIS-DE-ENTREGA.gif";
import locsBannerStatic from "../assets/images/mapa-static.png";

interface HomeProps {
  isMobile: boolean;
}

const Home: React.FC<HomeProps> = ({ isMobile }) => {
  const [bannerSrc, setBannerSrc] = useState(locsBanner); // começa com GIF

  useEffect(() => {
    const timer = setTimeout(() => {
      setBannerSrc(locsBannerStatic); // troca pela imagem estática
    }, 7000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="home-container">
      {/* Parábola - Padrão de Interrupção (Russell Brunson)
    <section className="parable-section max-w-4xl mx-auto py-16 px-4 border-gray-800">
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
            to="/economia"
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
    </section> */}

      {/* Parábola - Como começou */}
      <section className="parable-section max-w-4xl mx-auto py-16 px-4 border-gray-800">
        <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
            O <span className="text-[#ff6100]">início</span>
          </h2>

          <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
            <p>
              Em 2022, eu perdi a grande maioria dos meus bens em uma aventura
              no mercado financeiro e agora me via com 500 reais pra sobreviver
              por mês, até o final do ano.
            </p>

            <p>
              Eu me sentia muito perdido, pois tinha acabado de deixar um bom
              emprego como vendedor pra arriscar tudo o que tinha no sonho da
              liberdade financeira.<br></br>Pensando por dias e noites, me
              lembrei de momentos, ainda como vendedor, em que era elogiado por
              meus clientes. A presteza, a atenção, o cuidado. Cada detalhe
              fazia muita diferença para cada um deles. Me lembrei de certa vez,
              em que dona Fátima, uma cliente da cidade de Uberaba, me enviou um
              bolo de aniversário com um cartão de agradecimento na porta da
              empresa. Isso não era algo normal, tendo em vista que é o vendedor
              quem geralmente presenteia o cliente (não nesse caso). E a verdade
              é que eu fazia tudo isso sem querer, apenas sendo quem eu sempre
              fui.
            </p>

            <p>
              Pouco tempo antes de estourar a bolha e eu perder tudo, em uma
              viagem pra Argentina, tive um forte desejo de voltar a servir as
              pessoas por meio das vendas. Eu tive medo, e deixei essa idéia
              adormecida. Mas quando vi a saída do buraco a partir do fundo do
              poço, não tive escolha. Eu precisava ouvir a voz que me chamava,
              porque essa era a minha ultima chance. Eu não tinha mais dinheiro.
            </p>

            <p>
              Escolhi vender os produtos de uma marca que sempre me
              identifiquei: a Apple. Mas foi aí que começou um novo pesadelo,
              porque agora eu teria que vender pela internet. Como eu faria pra
              transferir o meu conhecimento da venda “raiz” para a venda
              digital? <br></br>No Brasil, temos a cultura de aceitar menos do
              que merecemos. E quando entrei nesse mercado, percebi que as
              pessoas não sabiam o nível do atendimento que elas poderiam
              receber se deixassem de aceitar o que oferecem por ai.
            </p>

            <p className="text-white">
              Depois desse dia, eu entendi que vender, pra mim, sempre vai ser
              servir -{" "}
              <span className="font-semibold">
                e eu não consigo fazer isso pela metade.
              </span>
            </p>
          </div>

          {/* <div className="mt-8 flex justify-center">
          <Link
            to="/economia"
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
        </div> */}
        </div>
      </section>

      {/* Banner Principal */}
      <section className="banner-section w-full">
        <img
          src={isMobile ? mobileBanner : desktopBanner}
          alt="CompreFi - Produtos Apple Premium"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* História Pessoal - Dividida em seções para melhor engajamento
    <section className="story-section max-w-4xl mx-auto py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
        Minha Jornada
      </h2>

      <div className="story-block mb-10">
        
        <p className="text-lg text-gray-200 leading-relaxed">
          Um dia, me vi sentado numa sala, trabalhando duro… mas para realizar
          o sonho de outra pessoa. Eu vendia para uma grande empresa do setor
          alimentício. Tinha um bom salário, estabilidade — o que muitos
          considerariam sucesso. Mas, por dentro, eu estava vazio.
        </p>
      </div>

      <div className="story-block mb-10">
        
        <p className="text-lg text-gray-200 leading-relaxed">
          Buscando propósito, entrei no mercado financeiro. Achei que seria
          uma jornada de aprendizado e liberdade, mas acabei perdendo tudo.
          Foi um dos momentos mais difíceis da minha vida.
        </p>
      </div>

      <div className="story-block mb-10">
        
        <p className="text-lg text-gray-200 leading-relaxed">
          Depois de muita reflexão, percebi: eu nunca deveria ter parado de
          servir pessoas. Sempre fui movido por oferecer uma experiência de
          compra de verdade — daquelas que encantam, que surpreendem, que
          criam vínculos.
        </p>
      </div>

      <div className="story-block">
        
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
    </section> */}

      {/* História Pessoal - Dividida em seções para melhor engajamento */}
      <section className="story-section max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
          O que é <span className="text-[#ff6100]">importante</span> pra você?
        </h2>

        <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
          <p>
            Uma vez uma cliente pediu um desconto e o que aconteceu nesse dia
            mudou completamente a forma como ela trata o trabalho das pessoas.
          </p>
          <p>
            Ela tinha encontrado mais barato com outra pessoa e me disse que se
            eu quisesse, ela pagaria aquele mesmo valor, porque ela tinha
            gostado do meu atendimento. Como sempre, eu tratei ela bem, e
            perguntei o quê exatamente ela tinha encontrado lá. Então ela me
            enviou um print. No print deu pra ver que o outro atendente enviava
            respostas diretas, sem ter interesse algum no que ela falava. E pra
            mim, atender desse jeito nunca fez sentido.
          </p>

          <p>
            Ao mesmo tempo, eu já sabia que ela precisava do iPhone novo pra
            trabalhar, porque durante a nossa conversa eu deixei ela confortável
            o bastante pra me contar que tirava várias fotos e gravava vários
            vídeos todos os dias. Além de fotografar e gravar, ela também
            editava os vídeos por horas e depois de encontrar o ponto perfeito,
            ela postava no Instagram.
          </p>

          <p>
            Eu queria realmente entender o que era importante pra ela, então eu
            perguntei se ela sabia que a câmera do iPhone 17 Pro Max, apesar de
            ser a melhor do mercado, precisava de uma configuração extra depois
            que a gente iniciasse ele pela primeira vez. Ela me disse que não
            sabia, e que isso seria muito importante, porque ela precisava
            entregar o melhor conteúdo possível pra trazer novos seguidores pro
            perfil dela.
          </p>
          <p>
            Eu pedi pra ela analisar mais de perto a forma com que ela tava
            sendo tratada, e perguntei se ela achava que aquele atendente teria
            tempo pra ajudar ela a configurar a câmera nova. Ela ficou
            pensativa, e disse que mesmo assim preferia pagar mais barato. Eu
            entendi o ponto dela, e perguntei se eles também iriam até a casa
            dela pra entregar no horário que ela escolhesse e se eles ajudariam
            ela com a transferência dos arquivos, e esperariam lá, tomando um
            cafezinho com ela, até que terminasse. Ela respondeu que não, que
            teria que ir até a loja deles e que teria que ficar esperando lá até
            que a transferência terminasse.
          </p>
          <p>
            Então eu completei com a seguinte pergunta: se daqui um tempo você
            decidir que quer um Apple Watch, ou precisar de qualquer acessório
            original da Apple. Eles te garantem até 20% de desconto nessa
            próxima compra? Ela disse que não, e que eles ofereceram apenas uma
            capinha pra ela. Aí eu perguntei se eles ajudariam ela com o
            processo de solicitar a garantia da Apple caso acontecesse alguma
            coisa com o iPhone dela ou se ela tivesse alguma dúvida.
          </p>
          <p>
            Outra vez ela me respondeu que não e entao eu contei a história da
            Roberta pra ela. A Roberta, que é Personal e proprietária de uma
            academia, deixou de perder 5 horas e meia de um dia valioso de
            trabalho. Ela precisou acionar o suporte da Apple. Nesse caso em
            questão, a CompreFi fez todas as ligações, e a Roberta trabalhou
            normalmente durante todo o processo. Isso sem contar a dor de cabeça
            que essas solicitações burocráticas causam na gente.
          </p>

          <p>
            Nesse momento a cliente do desconto já tinha entendido que ela não
            merecia ser tratada daquela forma e que o que a gente oferece aqui
            na CompreFi não é só um simples telefone da maçã.
          </p>

          <p>
            Ela preferiu comprar com a gente e pagou mais caro porque entendeu
            que além do atendimento 100% personalizado, das condições exclusivas
            em acessórios originais, brindes, e suporte eterno, a gente também
            oferece tranquilidade.
          </p>

          <p>
            Então não, não teve o desconto e nem vai ter. Mas eu te garanto que
            você não vai se arrepender.<br></br> Pra comprar Mac, iPad, ou
            iPhone: Manda mensagem pro Gussoni.
          </p>
        </div>
      </section>

      {/* Banner Locais */}
      <section className="banner-locs max-w-4xl w-full mx-auto py-16 px-4">
        <img
          src={bannerSrc}
          alt="CompreFi - Produtos Apple Premium"
          className="w-full h-auto object-cover max-w-4xl"
        />
      </section>

      {/* Espaço para Depoimentos - Será implementado quando o usuário enviar os depoimentos */}
      <section className="testimonials-section py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white">
          O Que Nossos Clientes Dizem
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-900 flex flex-col justify-between rounded-lg p-6 border border-gray-800">
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
            <div className="flex flex-col justify-between h-full max-h-full">
              <p className="text-gray-300 mb-4 italic">
                "Comprei meu iPhone na CompreFi e fiquei impressionado com a
                qualidade do atendimento. Recomendo!"
              </p>
              <p className="text-white font-medium">Carlos Silva</p>
            </div>
          </div>

          <div className="bg-gray-900 flex flex-col justify-between rounded-lg p-6 border border-gray-800">
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
            <div className="flex flex-col justify-between h-full max-h-full">
              <p className="text-gray-300 mb-4 italic">
                "Com certeza vou recomendar você pra quem perguntar algo, um dos
                únicos que se preocupou em achar oq eu queria."
              </p>
              <p className="text-white font-medium">Madu</p>
            </div>
          </div>

          <div className="bg-gray-900 flex flex-col justify-between rounded-lg p-6 border border-gray-800">
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
            <div className="flex flex-col justify-between h-full max-h-full">
              <p className="text-gray-300 mb-4 italic">
                "Muuuuito obrigada Gustavo. Pelo atendimento e agilidade. To
                muito feliz com meu novo celular. Você ganhou uma cliente e vai
                ganhar mais alguns hahaha pq vou super indicar "
              </p>
              <p className="text-white font-medium">Luana Bernardes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section pt-16 px-4">
        <FAQ />
      </section>

      {/* Por que escolher a CompreFi */}
      <section className="why-choose-section py-16 px-4">
        <WhyChooseCompreFi />
      </section>

      {/* Módulo de Categorias */}
      <section className="categories-section py-16 px-4">
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
