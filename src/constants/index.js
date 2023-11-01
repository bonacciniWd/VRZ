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
    title: "Planejamento",
    company_name: "Criação de escopos",
    icon: starbucks,
    iconBg: "#915EFF",
    date: "📝🤝",
    points: [
      " A empresa se reúne com o cliente para entender suas necessidades e requisitos.",
      " Isso inclui definir o escopo do projeto, objetivos e funcionalidades desejadas.",
      " Avaliação da viabilidade técnica e econômica do projeto para determinar se é realizável dentro do prazo e orçamento definidos.",
    ],
    },
  {
    title: "Design",
    company_name: "Estilização do projeto",
    icon: tesla,
    iconBg: "#915EFF",
    date: "🖌️🏗️",
    points: [
      "Os engenheiros de software projetam a arquitetura do sistema, definindo como os componentes do software se encaixam e interagem entre si.",
      "Designers de interface criam a aparência e a usabilidade do software, garantindo que atenda às necessidades dos usuários.",
    ],
    },
  {
    title: "Desenvolvimento",
    company_name: "Codificação da aplicação",
    icon: shopify,
    iconBg: "#915EFF",
    date: "🧑‍💻",
    points: [
      "Os programadores escrevem o código-fonte do software com base nas especificações do projeto e no design da arquitetura.",
      "Cada componente do software é testado individualmente para garantir que funcione corretamente.",
    ],
  },
  {
    title: "Testes e Implantação",
    company_name: "Testes das funcionalidades e segurança  ",
    icon: meta,
    iconBg: "#915EFF",
    date: "🧪🚀",
    points: [
      "O software é testado como um todo para identificar e corrigir bugs e garantir que atenda aos requisitos do cliente.",
      "O software é implantado em ambiente de produção para que os usuários finais possam começar a usá-lo.",
      "A empresa oferece suporte contínuo, atualizações e correções de bugs após o lançamento.",
      "Participar de revisões de código e fornecer feedback construtivo para novas ideias para seu projeto",
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
    name: "Two Variant",
    description:
      "Aplicação desenvolvida para a empresa @twovariant / twovariant.com.br. Uma loja virtual onde o usuário poderá realizar compras, acompanhar o tempo de entrega e frete, provedor de pagamentos conectado ao stripe, paypal, mercado livre e getnet.",
    tags: [
      {
        name: "React",
        color: "blue-text-gradient",
      },
      {
        name: "Postgree",
        color: "green-text-gradient",
      },
      {
        name: "Tailwind-CSS",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://twovariant.com.br",
  },
  {
    name: "Anunciarty",
    description:
      "Aplicação criada para a empresa de marketing @anunciarty_ , Cujo projeto inicial se deu à ideia onde pudessemos enriquecer a experiência do usuário e lhes mostrar a elevação do marketing em seu negócio. ",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: jobit,
    source_code_link: "anunciarty.vercel.app",
  },
  {
    name: "Soberana Luxo",
    description:
      "Aplicação criada em react e mongo-db, para a empresa @soberana.luxo, cujo objetivo é fomentar a ideia do consumo consciente, incentivando o aluguel para itens de uso quase que unicos, tais como joias de formaturas, casamentos e eventos.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: tripguide,
    source_code_link: "https://github.com/bonacciniWd/",
  },
];

export { services, technologies, experiences, testimonials, projects };