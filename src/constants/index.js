import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Sobre",
  },
  {
    id: "work",
    title: "Projetos",
  },
  {
    id: "contact",
    title: "Contato",
  },
];

const services = [
  {
    title: "Desenvolvedor Web",
    icon: web,
  },
  {
    title: "Dev React, React-Native",
    icon: mobile,
  },
  {
    title: "Dev Banco de dados",
    icon: backend,
  },
  {
    title: "Criador de conteúdo",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [

   
  {
    title: "Formação",
    company_name: "Instituto Europeu de Design",
    icon: starbucks,
    iconBg: "#E6DEDD",
    date: "Jan 2010 - Dec 2014",
    points: [
      "Minha formação pelo Instituto Europeu de Design foi um mergulho profundo no mundo da criatividade e da inovação, preparando-me para desafios emocionantes no campo da moda.",
      "Colaborar com equipes multifuncionais, incluindo designers, gerentes de produto e outros desenvolvedores para criar produtos de alta qualidade.",
      "Minha paixão pela moda me levou a permanecer atualizado constantemente, mantendo-me curioso e sempre à procura de novos artistas, músicas e tendências.",
    ],
    },
  {
    title: "Estilista",
    company_name: "TNG",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2015 - Jan 2016",
    points: [
      "Minha carreira deu um salto significativo quando abracei a oportunidade de me tornar estilista na aclamada marca TNG, uma experiência que me permitiu mergulhar profundamente no mundo da moda.",
      "Nesse papel, eu não apenas criei, mas também influenciei o estilo e a direção da marca, contribuindo para sua consolidação como uma referência na indústria da moda. ",
      "Foi uma fase de crescimento pessoal e profissional que moldou minha trajetória na moda",
    ],
  },
  {
    title: "Minha 1ª Marca",
    company_name: "MAYWHO",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Fev 2016 - Apr 2017",
    points: [
      "Nascia então a minha própria marca, a MAYWHO, um marco na minha jornada. Ao longo dos anos, além de dar vida à minha própria criação, tive o privilégio de atuar como stylist, deixando minha marca autoral em diversos projetos notáveis.",
      "Desenvolvimento e preparação de campanhas e parcerias da MAYWHO",
      "Destaco com orgulho um projeto publicado na renomada Vanity Teen, onde pude explorar minha visão única da moda e contribuir para a criação de um editorial de destaque na indústria.",
    ],
  },

  {
    title: "Estilista",
    company_name: "Colcci",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Apr 2017 - Ago 2023",
    points: [
      "Minha trajetória na COLCCI representou anos de dedicação e paixão pela moda. Durante esse tempo, contribuí para o design e criação de peças memoráveis.  ",
      "Enquanto também trabalhava com a marca CLC, minha carreira alcançou um novo patamar. ",
      "Contudo, em um determinado momento, me deparei com uma encruzilhada que sinalizava uma nova e emocionante etapa de evolução em minha jornada profissional.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Eu achava que era impossível fazer um site tão bonito quanto o nosso produto, mas Denis me provou errado.",
    name: "CaduOliver_",
    designation: "Estilista e CEO",
    company: "TwoVariant",
    image: "https://randomuser.me/api/portraits/lego/3.jpg",
  },
  {
    testimonial:
      "Once we got in touch with Denis, he responded promptly, was attentive, and created the Walram.com.br store",
    name: "James-Lu",
    designation: "CEO",
    company: "Meixinelec / Walram Eletrônics",
    image: "https://randomuser.me/api/portraits/lego/7.jpg",
  },
  {
    testimonial:
      "Depois que o Denis criou o nosso briefing, tudo fluiu. Ele realmente faz acontecer...",
    name: "Elisa Mara",
    designation: "Empreendedora",
    company: "Essenciais Express",
    image: "https://randomuser.me/api/portraits/lego/9.jpg",
  },
];

const projects = [
  {
    name: "Colcci Verão 2022",
    description:
      "Estampas criadas por mim, usadas em coleção da colcci verão 2022, com participação da modelo Winnie Harlow.",
    tags: [
      {
        name: "2022",
        color: "blue-text-gradient",
      },
      {
        name: "Colcci",
        color: "green-text-gradient",
      },
      {
        name: "Winnie Harlow",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://www.behance.net/gallery/128683249/Jardim-optico",
  },
  {
    name: "Colcci Rock in Rio",
    description:
      "Essa coleção COLCCI + Rock in Rio combina a essência de ambas as marcas, criando um guarda-roupa que celebra a música e a moda de uma forma única e emocionante.",
    tags: [
      {
        name: "Rock-In-Rio",
        color: "blue-text-gradient",
      },
      {
        name: "Colcci",
        color: "green-text-gradient",
      },
      {
        name: "Música",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "https://www.behance.net/gallery/182514877/Drop-Colcci-Rocknrio",
  },
  {
    name: "CLC Primavera 2024",
    description:
      "Primavera 2024 da CLC é uma celebração do estilo e da elegância, projetada para elevar seu guarda-roupa nesta temporada. Cada peça é uma expressão de moda contemporânea e conforto, projetada para acompanhar você em todas as aventuras da primavera.",
    tags: [
      {
        name: "ClC",
        color: "blue-text-gradient",
      },
      {
        name: "2024",
        color: "green-text-gradient",
      },
      {
        name: "Primavera",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://www.behance.net/gallery/182522975/CLC-PRIMAVERA2024",
  },
];

export { services, technologies, experiences, testimonials, projects };
