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
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Desenvolvimento e manutenção de aplicações web utilizando React.js e outras tecnologias relacionadas.",
      "Colaborar com equipes multifuncionais, incluindo designers, gerentes de produto e outros desenvolvedores para criar produtos de alta qualidade.",
      "Implementando design responsivo e garantindo compatibilidade entre navegadores.",
      "Participar de revisões de código e fornecer feedback construtivo para outros desenvolvedores.",
    ],
    },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Desenvolvimento e manutenção de aplicações web utilizando React.js e outras tecnologias relacionadas.",
      "Colaborar com equipes multifuncionais, incluindo designers, gerentes de produto e outros desenvolvedores para criar produtos de alta qualidade.",
      "Implementando design responsivo e garantindo compatibilidade entre navegadores.",
      "Participar de revisões de código e fornecer feedback construtivo para outros desenvolvedores.",
    ],
    },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Desenvolvimento e manutenção de aplicações web utilizando React.js e outras tecnologias relacionadas.",
      "Colaborar com equipes multifuncionais, incluindo designers, gerentes de produto e outros desenvolvedores para criar produtos de alta qualidade.",
      "Implementando design responsivo e garantindo compatibilidade entre navegadores.",
      "Participar de revisões de código e fornecer feedback construtivo para outros desenvolvedores.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Desenvolvimento e manutenção de aplicações web utilizando React.js e outras tecnologias relacionadas.",
      "Colaborar com equipes multifuncionais, incluindo designers, gerentes de produto e outros desenvolvedores para criar produtos de alta qualidade.",
      "Implementando design responsivo e garantindo compatibilidade entre navegadores.",
      "Participar de revisões de código e fornecer feedback construtivo para outros desenvolvedores.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Eu achava que era impossível fazer um site tão bonito quanto o nosso produto, mas Denis me provou errado.",
    name: "Sara Lee",
    designation: "CFO",
    company: "HeyDoser Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Denis optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Plataforma baseada na web que permite aos usuários pesquisar, reservar e gerenciar aluguéis de carros de vários fornecedores, fornecendo uma solução conveniente e eficiente para as necessidades de transporte.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/bonacciniWd",
  },
  {
    name: "Job IT",
    description:
      "Aplicativo Web que permite que os usuários pesquisem vagas de emprego, visualizem faixas salariais estimadas para posições e localizem vagas disponíveis com base em sua localização atual.",
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
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
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
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
