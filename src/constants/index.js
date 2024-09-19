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
    title: "Descoberta e Planejamento",
    company_name: "Consultoria e Levantamento de Requisitos",
    icon: tesla, // ícone específico de planejamento
    iconBg: "#3B82F6",
    date: "📝🤝",
    points: [
      "Reuniões iniciais com o cliente para entender profundamente o negócio, necessidades e expectativas.",
      "Definição clara dos requisitos funcionais e não funcionais do sistema.",
      "Análise de viabilidade técnica, escopo do projeto, prazos e orçamento.",
      "Criação de um plano detalhado do projeto e cronograma.",
    ],
  },
  {
    title: "Arquitetura e Design de Soluções",
    company_name: "Arquitetura do Sistema e UX/UI Design",
    icon: tesla, // ícone específico de arquitetura
    iconBg: "#10B981",
    date: "🖌️🏗️",
    points: [
      "Criação da arquitetura de software, definindo a estrutura e os componentes principais.",
      "Escolha de tecnologias e ferramentas mais adequadas para o projeto (banco de dados, frameworks, APIs).",
      "Designers de UX/UI criam wireframes e protótipos, focando na experiência do usuário.",
      "Validação de design com o cliente para garantir que o visual e a usabilidade estão alinhados com as expectativas.",
    ],
  },
  {
    title: "Desenvolvimento e Integração",
    company_name: "Codificação e Implementação",
    icon: shopify, // ícone específico de desenvolvimento
    iconBg: "#F59E0B",
    date: "💻👨‍💻",
    points: [
      "Desenvolvimento dos módulos e funcionalidades seguindo as especificações definidas.",
      "Integração com APIs externas e serviços de terceiros, quando aplicável.",
      "Revisão e versionamento de código com ferramentas como Git, garantindo colaboração eficiente.",
      "Testes unitários e integração contínua (CI/CD) para assegurar a qualidade do código.",
    ],
  },
  {
    title: "Testes e Qualidade",
    company_name: "Garantia de Qualidade e Testes",
    icon: tesla, // ícone específico de testes
    iconBg: "#EF4444",
    date: "🧪🛠️",
    points: [
      "Testes funcionais, de usabilidade, e de desempenho para identificar possíveis bugs.",
      "Testes de segurança, garantindo proteção de dados e conformidade com LGPD (ou outra legislação aplicável).",
      "Testes automatizados para garantir cobertura eficiente e redução de erros manuais.",
      "Correção de falhas e refinamento da aplicação antes da entrega final.",
    ],
  },
  {
    title: "Implantação e Suporte Contínuo",
    company_name: "Entrega e Pós-lançamento",
    icon: tesla, // ícone específico de implantação
    iconBg: "#8B5CF6",
    date: "🚀🔧",
    points: [
      "Implantação do sistema em ambiente de produção, realizando os ajustes necessários.",
      "Monitoramento pós-implantação para garantir desempenho e resolver problemas rapidamente.",
      "Treinamento dos usuários finais, quando aplicável, para garantir o uso eficiente do software.",
      "Suporte contínuo, manutenção, melhorias e atualizações para garantir a longevidade do sistema.",
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