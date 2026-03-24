import { FlatProduct } from "../../types/product";

// Imagens capa
// import iphone16BTraseira from "../../assets/new-images/semi/16b/16-white-traseira.jpg";
// import iphone16VTraseira from "../../assets/new-images/semi/16v/16-green-traseira.jpg";
import iphone15PMPTraseira from "../../assets/new-images/semi/15-pm-p/15-pm-black-traseira.jpg";
import iphone14PMRTraseira from "../../assets/new-images/semi/14-pm-r/14-pm-purple-traseira.jpg";

// 16 branco
// import iphone16ImgFrente from "../../assets/new-images/semi/16b/16-white-frente.jpg";
// import iphone16ImgLaterald from "../../assets/new-images/semi/16b/16-white-laterald.jpg";
// import iphone16ImgLaterale from "../../assets/new-images/semi/16b/16-white-laterale.jpg";
// import iphone16ImgBaixo from "../../assets/new-images/semi/16b/16-white-baixo.jpg";
// import iphone16ImgCima from "../../assets/new-images/semi/16b/16-white-cima.jpg";

// // 16 verde
// import iphone16VImgFrente from "../../assets/new-images/semi/16v/16-green-frente.jpg";
// import iphone16VImgLaterald from "../../assets/new-images/semi/16v/16-green-laterald.jpg";
// import iphone16VImgLaterale from "../../assets/new-images/semi/16v/16-green-laterale.jpg";
// import iphone16VImgBaixo from "../../assets/new-images/semi/16v/16-green-baixo.jpg";
// import iphone16VImgCima from "../../assets/new-images/semi/16v/16-green-cima.jpg";

// 15 Pro Max preto
import iphone15PMPImgFrente from "../../assets/new-images/semi/15-pm-p/15-pm-black-frente.jpg";
import iphone15PMPImgLaterald from "../../assets/new-images/semi/15-pm-p/15-pm-black-laterald.jpg";
import iphone15PMPImgLaterale from "../../assets/new-images/semi/15-pm-p/15-pm-black-laterale.jpg";
import iphone15PMPImgBaixo from "../../assets/new-images/semi/15-pm-p/15-pm-black-baixo.jpg";
import iphone15PMPImgCima from "../../assets/new-images/semi/15-pm-p/15-pm-black-cima.jpg";

// 14 Pro Max roxo
import iphone14PMRImgFrente from "../../assets/new-images/semi/14-pm-r/14-pm-purple-frente.jpg";
import iphone14PMRImgLaterald from "../../assets/new-images/semi/14-pm-r/14-pm-purple-laterald.jpg";
import iphone14PMRImgLaterale from "../../assets/new-images/semi/14-pm-r/14-pm-purple-laterale.jpg";
import iphone14PMRImgBaixo from "../../assets/new-images/semi/14-pm-r/14-pm-purple-baixo.jpg";
import iphone14PMRImgCima from "../../assets/new-images/semi/14-pm-r/14-pm-purple-laterale.jpg";

export const iphonesSeminovosProducts: FlatProduct[] = [
  //{
  //   id: 1,
  //   model: "iPhone 16",
  //   storage: "128GB",
  //   color: "Branco",
  //   battery: "98%",
  //   originalPrice: "R$ 4.790,00",
  //   installmentPrice: "R$ 398,14",
  //   pixPrice: "R$ 4.190",
  //   details:
  //     "sem detalhes | acompanha caixa e capinha",
  //   image: iphone16BTraseira,
  //   realImages: [
  //     iphone16ImgFrente,
  //     iphone16ImgLaterald,
  //     iphone16ImgLaterale,
  //     iphone16ImgBaixo,
  //     iphone16ImgCima,
  //   ],
  //   category: "iPhones Seminovos",
  //   specs:
  //     'O iPhone 16 (2024) traz o processador A18 (3nm), 8 GB de RAM para Apple Intelligence, e câmeras de 48 MP, apresentando o novo "Controle da Câmera", botão de Ação e tela Super Retina XDR OLED de 6,1 polegadas. Possui bateria de 3561 mAh, conector USB-C, Wi-Fi 7 e estrutura em alumínio com Ceramic Shield.',
  // },
  // {
  //   id: 2,
  //   model: "iPhone 16",
  //   storage: "128GB",
  //   color: "Verde",
  //   battery: "90%",
  //   originalPrice: "R$ 4.690,00",
  //   installmentPrice: "R$ 379,14",
  //   pixPrice: "R$ 3.990",
  //   details: "sem detalhes | acompanha capinha",
  //   image: iphone16VTraseira,
  //   realImages: [
  //     iphone16VImgFrente,
  //     iphone16VImgLaterald,
  //     iphone16VImgLaterale,
  //     iphone16VImgBaixo,
  //     iphone16VImgCima,
  //   ],
  //   category: "iPhones Seminovos",
  //   specs:
  //     'O iPhone 16 (2024) traz o processador A18 (3nm), 8 GB de RAM para Apple Intelligence, e câmeras de 48 MP, apresentando o novo "Controle da Câmera", botão de Ação e tela Super Retina XDR OLED de 6,1 polegadas. Possui bateria de 3561 mAh, conector USB-C, Wi-Fi 7 e estrutura em alumínio com Ceramic Shield.',
  // },
  {
    id: 3,
    model: "iPhone 15 Pro Max",
    storage: "256GB",
    color: "Titânio Preto",
    battery: "87%",
    originalPrice: "R$ 4.990,00",
    installmentPrice: "R$ 436,65",
    pixPrice: "R$ 4.590",
    details: "sem detalhes | acompanha caixa",
    image: iphone15PMPTraseira,
    realImages: [
      iphone15PMPImgFrente,
      iphone15PMPImgLaterald,
      iphone15PMPImgLaterale,
      iphone15PMPImgBaixo,
      iphone15PMPImgCima,
    ],
    category: "iPhones Seminovos",
    specs:
      'O iPhone 15 Pro Max é o topo de linha da Apple de 2023, destacando-se pela estrutura em titânio, processador A17 Pro de 3nm e câmera telefoto de 5x. Possui tela OLED de 6,7" (120Hz), 8GB de RAM, USB-C 3.0 e sistema de câmera tripla de 48MP, oferecendo alto desempenho e grande autonomia de bateria.',
  },
  {
    id: 4,
    model: "iPhone 14 Pro Max",
    storage: "128GB",
    color: "Roxo",
    battery: "83%",
    originalPrice: "R$ 3.890,00",
    installmentPrice: "R$ 341,13",
    pixPrice: "R$ 3.590",
    details: "sem detalhes de uso | acompanha capinha",
    image: iphone14PMRTraseira,
    realImages: [
      iphone14PMRImgFrente,
      iphone14PMRImgLaterald,
      iphone14PMRImgLaterale,
      iphone14PMRImgBaixo,
      iphone14PMRImgCima,
    ],
    category: "iPhones Seminovos",
    specs:
      "O iPhone 14 Pro Max possui uma tela de 6,7 polegadas Super Retina XDR OLED com ProMotion (120Hz) e Dynamic Island. É equipado com o chip A16 Bionic, 6 GB de RAM e câmera principal de 48 MP. Oferece armazenamento até 1 TB, resistência à água IP68, 5G e bateria com duração superior a um dia.",
  },
];