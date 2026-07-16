import { FlatProduct } from "../../types/product";


// 16 branco
// import iphone16BTraseira from "../../assets/new-images/semi/16b/16-white-traseira.jpg";
// import iphone16ImgFrente from "../../assets/new-images/semi/16b/16-white-frente.jpg";
// import iphone16ImgLaterald from "../../assets/new-images/semi/16b/16-white-laterald.jpg";
// import iphone16ImgLaterale from "../../assets/new-images/semi/16b/16-white-laterale.jpg";
// import iphone16ImgBaixo from "../../assets/new-images/semi/16b/16-white-baixo.jpg";
// import iphone16ImgCima from "../../assets/new-images/semi/16b/16-white-cima.jpg";

// // 16 verde
// import iphone16VTraseira from "../../assets/new-images/semi/16v/16-green-traseira.jpg";
// import iphone16VImgFrente from "../../assets/new-images/semi/16v/16-green-frente.jpg";
// import iphone16VImgLaterald from "../../assets/new-images/semi/16v/16-green-laterald.jpg";
// import iphone16VImgLaterale from "../../assets/new-images/semi/16v/16-green-laterale.jpg";
// import iphone16VImgBaixo from "../../assets/new-images/semi/16v/16-green-baixo.jpg";
// import iphone16VImgCima from "../../assets/new-images/semi/16v/16-green-cima.jpg";

// 15 Pro Max preto
// import iphone15PMPTraseira from "../../assets/new-images/semi/15-pm-p/15-pm-black-traseira.jpg";
// import iphone15PMPImgFrente from "../../assets/new-images/semi/15-pm-p/15-pm-black-frente.jpg";
// import iphone15PMPImgLaterald from "../../assets/new-images/semi/15-pm-p/15-pm-black-laterald.jpg";
// import iphone15PMPImgLaterale from "../../assets/new-images/semi/15-pm-p/15-pm-black-laterale.jpg";
// import iphone15PMPImgBaixo from "../../assets/new-images/semi/15-pm-p/15-pm-black-baixo.jpg";
// import iphone15PMPImgCima from "../../assets/new-images/semi/15-pm-p/15-pm-black-cima.jpg";

// 17 pro laranja
import iphone17PLTraseira from "../../assets/new-images/semi/17-p-laranja/17-p-laranja-traseira.jpeg";
import iphone17PLfrente from "../../assets/new-images/semi/17-p-laranja/17-p-laranja-frente.jpeg";
import iphone17PLlaterald from "../../assets/new-images/semi/17-p-laranja/17-p-laranja-laterald.jpeg";
import iphone17PLlaterale from "../../assets/new-images/semi/17-p-laranja/17-p-laranja-laterale.jpeg";
import iphone17PLbaixo from "../../assets/new-images/semi/17-p-laranja/17-p-laranja-baixo.jpeg";
import iphone17PLcima from "../../assets/new-images/semi/17-p-laranja/17-p-laranja-cima.jpeg";

//16 pro max nat
import iphone16PMNTraseira from "../../assets/new-images/semi/16-p-m-nat/16-p-m-nat.jpg";
import iphone16PMNfrente from "../../assets/new-images/semi/16-p-m-nat/16-p-m-frente.jpg";
import iphone16PMNlaterald from "../../assets/new-images/semi/16-p-m-nat/16-p-m-laterald.jpg";
import iphone16PMNlaterale from "../../assets/new-images/semi/16-p-m-nat/16-p-m-laterale.jpg";
import iphone16PMNbaixo from "../../assets/new-images/semi/16-p-m-nat/16-p-m-baixo.jpg";
import iphone16PMNcima from "../../assets/new-images/semi/16-p-m-nat/16-p-m-cima.jpg";

// 16 pro desert

import iphone16PDTraseira from "../../assets/new-images/semi/16-p-desert/16-pro-desert-traseira.jpg";
import iphone16PDFrente from "../../assets/new-images/semi/16-p-desert/16-pro-desert-frente.jpg";
import iphone16PDLaterald from "../../assets/new-images/semi/16-p-desert/16-pro-desert-laterald.jpg";
import iphone16PDLaterale from "../../assets/new-images/semi/16-p-desert/16-pro-desert-laterale.jpg";
import iphone16PDBaixo from "../../assets/new-images/semi/16-p-desert/16-pro-desert-baixo.jpg";
import iphone16PDCima from "../../assets/new-images/semi/16-p-desert/16-pro-desert-cima.jpg";

//15 azul

import iphone15AzTraseira from "../../assets/new-images/semi/15-azul/15-azul-traseira.jpg"
import iphone15AzFrente from "../../assets/new-images/semi/15-azul/15-azul-frente.jpg"
import iphone15AzLaterald from "../../assets/new-images/semi/15-azul/15-azul-laretald.jpg"
import iphone15AzLaterale from "../../assets/new-images/semi/15-azul/15-azul-laterale.jpg"
import iphone15AzBaixo from "../../assets/new-images/semi/15-azul/15-azul-baixo.jpg"
import iphone15AzCima from "../../assets/new-images/semi/15-azul/15-azul-cima.jpg"

// 14 Pro Max roxo
// import iphone14PMRTraseira from "../../assets/new-images/semi/14-pm-r/14-pm-purple-traseira.jpg";
// import iphone14PMRImgFrente from "../../assets/new-images/semi/14-pm-r/14-pm-purple-frente.jpg";
// import iphone14PMRImgLaterald from "../../assets/new-images/semi/14-pm-r/14-pm-purple-laterald.jpg";
// import iphone14PMRImgLaterale from "../../assets/new-images/semi/14-pm-r/14-pm-purple-laterale.jpg";
// import iphone14PMRImgBaixo from "../../assets/new-images/semi/14-pm-r/14-pm-purple-baixo.jpg";
// import iphone14PMRImgCima from "../../assets/new-images/semi/14-pm-r/14-pm-purple-laterale.jpg";

export const iphonesSeminovosProducts: FlatProduct[] = [
{
    id: 1,
    model: "iPhone 17 Pro",
    storage: "256GB",
    color: "Laranja",
    battery: "100%",
    originalPrice: "R$ 7.290,00",
    installmentPrice: "R$ 663,15",
    pixPrice: "R$ 6.979",
    details:
      "1 ano de garantia Apple",
    image: iphone17PLTraseira,
    realImages: [
      iphone17PLfrente,
      iphone17PLlaterald,
      iphone17PLlaterale,
      iphone17PLbaixo,
      iphone17PLcima,
    ],
    category: "iPhones Seminovos",
    specs:
      'O iPhone 17 Pro (lançado em setembro de 2025) destaca-se pela tela de 6,3 polegadas, chip A19 Pro (3nm), 12 GB de RAM e sistema de câmeras triplo de 48 MP. Conta com corpo em alumínio, Face ID, iOS 26, bateria de 4.252 mAh com carregamento rápido de 40W e conectividade Wi-Fi 7, sendo focado em desempenho e fotografia de alta resolução.',
  },
 {
   id: 2,
   model: "iPhone 16 Pro Max",
   storage: "256GB",
   color: "Titânio Natural",
   battery: "91%",
   originalPrice: "R$ 6.990,00",
   installmentPrice: "R$ 616,69",
   pixPrice: "R$ 6.490",
   details: "sem detalhes | acompanha capinha",
   image: iphone16PMNTraseira,
   realImages: [
     iphone16PMNfrente,
     iphone16PMNlaterald,
     iphone16PMNlaterale,
     iphone16PMNbaixo,
     iphone16PMNcima,
   ],
   category: "iPhones Seminovos",
   specs:
     'O iPhone 16 Pro Max (lançado em setembro de 2024) destaca-se pela tela Super Retina XDR OLED de 6,9 polegadas com tecnologia ProMotion de até 120 Hz, chip A18 Pro e sistema de câmeras Pro composto por uma câmera Fusion de 48 MP, ultra-angular de 48 MP e teleobjetiva de 12 MP com zoom óptico de 5x. Conta com estrutura em titânio, Face ID, iOS 18 de fábrica, bateria com autonomia de até 33 horas de reprodução de vídeo, recarga rápida e MagSafe de até 25W, além de conectividade 5G, Bluetooth 5.3 e Wi-Fi 7, sendo focado em alto desempenho, fotografia avançada e produção profissional de vídeos.',
 },
 {
   id: 3,
   model: "iPhone 16 Pro",
   storage: "128GB",
   color: "Titânio Desert",
   battery: "89%",
   originalPrice: "R$ 4.990,00",
   installmentPrice: "R$ 426,64",
   pixPrice: "R$ 4.490",
   details: "sem detalhes | acompanha caixa",
   image: iphone16PDTraseira,
   realImages: [
     iphone16PDFrente,
     iphone16PDLaterald,
     iphone16PDLaterale,
     iphone16PDBaixo,
     iphone16PDCima,
   ],
   category: "iPhones Seminovos",
   specs:
     'O iPhone 16 Pro (lançado em setembro de 2024) destaca-se pela tela Super Retina XDR OLED de 6,3 polegadas com tecnologia ProMotion de até 120 Hz, chip A18 Pro e sistema de câmeras Pro composto por uma câmera Fusion de 48 MP, ultra-angular de 48 MP e teleobjetiva de 12 MP com zoom óptico de 5x. Conta com estrutura em titânio, Face ID, iOS 18 de fábrica, bateria com autonomia de até 27 horas de reprodução de vídeo, recarga rápida e MagSafe de até 25W, além de conectividade 5G, Bluetooth 5.3 e Wi-Fi 7, sendo focado em alto desempenho, fotografia avançada e produção profissional de vídeos.',
 },
{
  id: 4,
  model: "iPhone 15",
  storage: "128GB",
  color: "Azul",
  battery: "86%",
  originalPrice: "R$ 2.990,00",
  installmentPrice: "R$ 246,10",
  pixPrice: "R$ 2.590",
  details: "sem detalhes de uso",
  image: iphone15AzTraseira,
  realImages: [
    iphone15AzFrente,
    iphone15AzLaterald,
    iphone15AzLaterale,
    iphone15AzBaixo,
    iphone15AzCima,
  ],
  category: "iPhones Seminovos",
  specs:
    "O iPhone 15 (lançado em setembro de 2023) destaca-se pela tela Super Retina XDR OLED de 6,1 polegadas, chip A16 Bionic e sistema de câmera dupla composto por uma câmera principal de 48 MP e ultra-angular de 12 MP, além de zoom óptico de 2x possibilitado pelo sensor principal. Conta com estrutura em alumínio, Dynamic Island, Face ID, iOS 17 de fábrica, bateria com autonomia de até 20 horas de reprodução de vídeo, recarga rápida e MagSafe de até 15W, além de conectividade 5G, Bluetooth 5.3, Wi-Fi 6 e entrada USB-C, sendo focado em desempenho, fotografia de alta resolução e praticidade para o uso diário.",
},
];