import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  lp,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  app,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide,
  threejs,
  delivery,
  
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
    title: {
      pt: "Delivery e totens de atendimento",
      en: "Delivery and self-service kiosks",
      es: "Delivery y terminales de autoservicio",
      it: "Delivery e chioschi self-service",
      fr: "Livraison et bornes libre-service"
    },
    description: {
      pt: "Sistemas otimizados para delivery e restaurantes, incluindo totens de atendimento e também gestão de comandas e saídas de produtos",
      en: "Optimized systems for delivery and restaurants, including self-service kiosks and management of orders and product outputs",
      es: "Sistemas optimizados para delivery y restaurantes, incluyendo terminales de autoservicio y gestión de comandas y salidas de productos",
      it: "Sistemi ottimizzati per delivery e ristoranti, inclusi chioschi self-service e gestione di ordini e uscite di prodotti",
      fr: "Systèmes optimisés pour la livraison et les restaurants, y compris les bornes libre-service et la gestion des commandes et des sorties de produits"
    },
    icon: delivery,
  },
  {
    title: {
      pt: "CRM Personalizado",
      en: "Custom CRM",
      es: "CRM Personalizado",
      it: "CRM Personalizzato",
      fr: "CRM Personnalisé"
    },
    description: {
      pt: "Solução customizada para gestão de clientes. Gerencie e acompanhe todos os processos de sua empresa em um só lugar...",
      en: "Custom solution for customer management. Manage and track all your company's processes in one place...",
      es: "Solución personalizada para la gestión de clientes. Gestione y acompañe todos los procesos de su empresa en un solo lugar...",
      it: "Soluzione personalizzata per la gestione dei clienti. Gestisci e monitora tutti i processi della tua azienda in un unico posto...",
      fr: "Solution personnalisée pour la gestion des clients. Gérez et suivez tous les processus de votre entreprise en un seul endroit..."
    },
    icon: web,
  },
  {
    title: {
      pt: "E-Commerce",
      en: "E-Commerce",
      es: "E-Commerce",
      it: "E-Commerce",
      fr: "E-Commerce"
    },
    description: {
      pt: "Plataforma completa de e-commerce para vendas online, oferecendo uma experiência intuitiva e segura para os clientes. Conta com um sistema integrado de gerenciamento, permitindo o acompanhamento detalhado de pedidos e pagamentos em tempo real.",
      en: "Complete e-commerce platform for online sales, offering an intuitive and secure experience for customers. Includes an integrated management system, allowing detailed tracking of orders and payments in real time.",
      es: "Plataforma completa de comercio electrónico para ventas online, ofreciendo una experiencia intuitiva y segura para los clientes. Cuenta con un sistema integrado de gestión, permitiendo el seguimiento detallado de pedidos y pagos en tiempo real.",
      it: "Piattaforma completa di e-commerce per vendite online, offrendo un'esperienza intuitiva e sicura per i clienti. Include un sistema di gestione integrato, che consente il monitoraggio dettagliato degli ordini e dei pagamenti in tempo reale.",
      fr: "Plateforme complète de commerce électronique pour les ventes en ligne, offrant une expérience intuitive et sécurisée aux clients. Comprend un système de gestion intégré, permettant un suivi détaillé des commandes et des paiements en temps réel."
    },
    icon: mobile,
  },
  {
    title: {
      pt: "Gateway de Pagamentos",
      en: "Payment Gateway",
      es: "Pasarela de Pagos",
      it: "Gateway di Pagamento",
      fr: "Passerelle de Paiement"
    },
    description: {
      pt: "Cansado de ficar refém dos provedores de pagamentos? Taxas abusivas, lentidão em recebimento de repasses? Que tal ter seu próprio gateway? Aceite todas as bandeiras de cartões, boletos e PIX* (Válido somente no Brasil*).",
      en: "Tired of being hostage to payment providers? High fees, slow transfers? How about having your own gateway? Accept all card brands, bank slips and PIX* (Valid only in Brazil*).",
      es: "¿Cansado de depender de los proveedores de pagos? ¿Tarifas abusivas, lentitud en los pagos? ¿Qué tal tener tu propia pasarela? Acepta todas las marcas de tarjetas, boletos y PIX* (Válido solo en Brasil*).",
      it: "Stanco di dipendere dai fornitori di pagamenti? Commissioni elevate, lentezza nei trasferimenti? Che ne dici di avere il tuo gateway? Accetta tutte le carte, bollettini e PIX* (Valido solo in Brasile*).",
      fr: "Marre d'être dépendant des prestataires de paiement ? Frais élevés, lenteur des virements ? Et si vous aviez votre propre passerelle ? Acceptez toutes les cartes, les billets et PIX* (Valable uniquement au Brésil*)."
    },
    icon: backend,
  },
  {
    title: {
      pt: "Aplicativos IOS e Android",
      en: "IOS and Android Apps",
      es: "Aplicaciones IOS y Android",
      it: "App IOS e Android",
      fr: "Applications IOS et Android"
    },
    description: {
      pt: "Desenvolvimento de apps para iOS e Android. Tem uma ideia de aplicativo, mas não sabe por onde e nem como começar? A gente te ajuda com isso. (App de loja, App de agendamento de serviços, Delivery, Hospedagem, Aluguel de carros e etc..)  ",
      en: "Development of apps for iOS and Android. Have an app idea but don't know where to start? We help you with that. (Store app, service scheduling app, delivery, hosting, car rental, etc..)",
      es: "Desarrollo de aplicaciones para iOS y Android. ¿Tienes una idea de aplicación pero no sabes por dónde empezar? Te ayudamos con eso. (App de tienda, app de programación de servicios, delivery, hospedaje, alquiler de autos, etc..)",
      it: "Sviluppo di app per iOS e Android. Hai un'idea di app ma non sai da dove iniziare? Ti aiutiamo noi. (App di negozio, app di prenotazione servizi, delivery, hosting, noleggio auto, ecc..)",
      fr: "Développement d'applications pour iOS et Android. Vous avez une idée d'application mais ne savez pas par où commencer ? Nous vous aidons. (App de boutique, app de prise de rendez-vous, livraison, hébergement, location de voitures, etc..)."
    },
    icon: app,
  },
  {
    title: {
      pt: "Página Institucional e Portfólio Profissional",
      en: "Institutional Page and Professional Portfolio",
      es: "Página Institucional y Portafolio Profesional",
      it: "Pagina Istituzionale e Portfolio Professionale",
      fr: "Page institutionnelle et portfolio professionnel"
    },
    description: {
      pt: "Desenvolvimento de portfólios profissionais e pessoais. A VRZ Studio utiliza as mais avançadas tecnologias do mercado, combinando eficiência, design sofisticado e um toque de exclusividade para elevar o seu perfil.",
      en: "Development of professional and personal portfolios. VRZ Studio uses the most advanced technologies on the market, combining efficiency, sophisticated design and a touch of exclusivity to elevate your profile.",
      es: "Desarrollo de portafolios profesionales y personales. VRZ Studio utiliza las tecnologías más avanzadas del mercado, combinando eficiencia, diseño sofisticado y un toque de exclusividad para elevar tu perfil.",
      it: "Sviluppo di portfolio professionali e personali. VRZ Studio utilizza le tecnologie più avanzate del mercato, combinando efficienza, design sofisticato e un tocco di esclusività per elevare il tuo profilo.",
      fr: "Développement de portfolios professionnels et personnels. VRZ Studio utilise les technologies les plus avancées du marché, alliant efficacité, design sophistiqué et une touche d'exclusivité pour valoriser votre profil."
    },
    icon: lp,
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
    title: {
      pt: "Descoberta e Planejamento",
      en: "Discovery and Planning",
      es: "Descubrimiento y Planificación",
      it: "Scoperta e Pianificazione",
      fr: "Découverte et Planification"
    },
    company_name: {
      pt: "Consultoria e Levantamento de Requisitos",
      en: "Consulting and Requirements Gathering",
      es: "Consultoría y Levantamiento de Requisitos",
      it: "Consulenza e Raccolta Requisiti",
      fr: "Conseil et Collecte des Exigences"
    },
    icon: tesla,
    iconBg: "#0c0A4b",
    date: "📝🤝",
    points: {
      pt: [
        "Reuniões iniciais com o cliente para entender profundamente o negócio, necessidades e expectativas.",
        "Definição clara dos requisitos funcionais e não funcionais do sistema.",
        "Análise de viabilidade técnica, escopo do projeto, prazos e orçamento.",
        "Criação de um plano detalhado do projeto e cronograma."
      ],
      en: [
        "Initial meetings with the client to deeply understand the business, needs, and expectations.",
        "Clear definition of functional and non-functional system requirements.",
        "Technical feasibility analysis, project scope, deadlines, and budget.",
        "Creation of a detailed project plan and schedule."
      ],
      es: [
        "Reuniones iniciales con el cliente para comprender profundamente el negocio, necesidades y expectativas.",
        "Definición clara de los requisitos funcionales y no funcionales del sistema.",
        "Análisis de viabilidad técnica, alcance del proyecto, plazos y presupuesto.",
        "Creación de un plan de proyecto detallado y cronograma."
      ],
      it: [
        "Riunioni iniziali con il cliente per comprendere a fondo il business, le esigenze e le aspettative.",
        "Definizione chiara dei requisiti funzionali e non funzionali del sistema.",
        "Analisi di fattibilità tecnica, ambito del progetto, scadenze e budget.",
        "Creazione di un piano di progetto dettagliato e cronoprogramma."
      ],
      fr: [
        "Réunions initiales avec le client pour bien comprendre l'entreprise, les besoins et les attentes.",
        "Définition claire des exigences fonctionnelles et non fonctionnelles du système.",
        "Analyse de faisabilité technique, portée du projet, délais et budget.",
        "Création d'un plan de projet détaillé et d'un calendrier."
      ]
    }
  },
  {
    title: {
      pt: "Arquitetura e Design de Soluções",
      en: "Architecture and Solution Design",
      es: "Arquitectura y Diseño de Soluciones",
      it: "Architettura e Design delle Soluzioni",
      fr: "Architecture et Conception de Solutions"
    },
    company_name: {
      pt: "Arquitetura do Sistema e UX/UI Design",
      en: "System Architecture and UX/UI Design",
      es: "Arquitectura del Sistema y Diseño UX/UI",
      it: "Architettura del Sistema e UX/UI Design",
      fr: "Architecture du Système et UX/UI Design"
    },
    icon: tesla,
    iconBg: "#10B981",
    date: "🖌️🏗️",
    points: {
      pt: [
        "Criação da arquitetura de software, definindo a estrutura e os componentes principais.",
        "Escolha de tecnologias e ferramentas mais adequadas para o projeto (banco de dados, frameworks, APIs).",
        "Designers de UX/UI criam wireframes e protótipos, focando na experiência do usuário.",
        "Validação de design com o cliente para garantir que o visual e a usabilidade estão alinhados com as expectativas."
      ],
      en: [
        "Creation of software architecture, defining the structure and main components.",
        "Choosing the most suitable technologies and tools for the project (database, frameworks, APIs).",
        "UX/UI designers create wireframes and prototypes, focusing on user experience.",
        "Design validation with the client to ensure that the look and usability meet expectations."
      ],
      es: [
        "Creación de la arquitectura de software, definiendo la estructura y los componentes principales.",
        "Elección de tecnologías y herramientas más adecuadas para el proyecto (base de datos, frameworks, APIs).",
        "Diseñadores UX/UI crean wireframes y prototipos, enfocándose en la experiencia del usuario.",
        "Validación de diseño con el cliente para garantizar que el aspecto y la usabilidad estén alineados con las expectativas."
      ],
      it: [
        "Creazione dell'architettura software, definendo la struttura e i componenti principali.",
        "Scelta delle tecnologie e degli strumenti più adatti per il progetto (database, framework, API).",
        "I designer UX/UI creano wireframe e prototipi, concentrandosi sull'esperienza utente.",
        "Validazione del design con il cliente per garantire che l'aspetto e l'usabilità siano in linea con le aspettative."
      ],
      fr: [
        "Création de l'architecture logicielle, définissant la structure et les composants principaux.",
        "Choix des technologies et des outils les plus adaptés au projet (base de données, frameworks, API).",
        "Les designers UX/UI créent des wireframes et des prototypes, en se concentrant sur l'expérience utilisateur.",
        "Validation du design avec le client pour garantir que l'apparence et l'utilisabilité répondent aux attentes."
      ]
    }
  },
  {
    title: {
      pt: "Desenvolvimento e Integração",
      en: "Development and Integration",
      es: "Desarrollo e Integración",
      it: "Sviluppo e Integrazione",
      fr: "Développement et Intégration"
    },
    company_name: {
      pt: "Codificação e Implementação",
      en: "Coding and Implementation",
      es: "Codificación e Implementación",
      it: "Codifica e Implementazione",
      fr: "Codage et Mise en œuvre"
    },
    icon: shopify,
    iconBg: "#F59E0B",
    date: "💻👨‍💻",
    points: {
      pt: [
        "Desenvolvimento dos módulos e funcionalidades seguindo as especificações definidas.",
        "Integração com APIs externas e serviços de terceiros, quando aplicável.",
        "Revisão e versionamento de código com ferramentas como Git, garantindo colaboração eficiente.",
        "Testes unitários e integração contínua (CI/CD) para assegurar a qualidade do código."
      ],
      en: [
        "Development of modules and features according to defined specifications.",
        "Integration with external APIs and third-party services, when applicable.",
        "Code review and versioning with tools like Git, ensuring efficient collaboration.",
        "Unit testing and continuous integration (CI/CD) to ensure code quality."
      ],
      es: [
        "Desarrollo de módulos y funcionalidades siguiendo las especificaciones definidas.",
        "Integración con APIs externas y servicios de terceros, cuando sea aplicable.",
        "Revisión y versionado de código con herramientas como Git, garantizando colaboración eficiente.",
        "Pruebas unitarias e integración continua (CI/CD) para asegurar la calidad del código."
      ],
      it: [
        "Sviluppo di moduli e funzionalità secondo le specifiche definite.",
        "Integrazione con API esterne e servizi di terze parti, quando applicabile.",
        "Revisione e versionamento del codice con strumenti come Git, garantendo collaborazione efficiente.",
        "Test unitari e integrazione continua (CI/CD) per garantire la qualità del codice."
      ],
      fr: [
        "Développement des modules et fonctionnalités selon les spécifications définies.",
        "Intégration avec des API externes et des services tiers, le cas échéant.",
        "Revue et versionnage du code avec des outils comme Git, garantissant une collaboration efficace.",
        "Tests unitaires et intégration continue (CI/CD) pour assurer la qualité du code."
      ]
    }
  },
  {
    title: {
      pt: "Testes e Qualidade",
      en: "Testing and Quality",
      es: "Pruebas y Calidad",
      it: "Test e Qualità",
      fr: "Tests et Qualité"
    },
    company_name: {
      pt: "Garantia de Qualidade e Testes",
      en: "Quality Assurance and Testing",
      es: "Garantía de Calidad y Pruebas",
      it: "Garanzia di Qualità e Test",
      fr: "Assurance Qualité et Tests"
    },
    icon: tesla,
    iconBg: "#EF4444",
    date: "🧪🛠️",
    points: {
      pt: [
        "Testes funcionais, de usabilidade, e de desempenho para identificar possíveis bugs.",
        "Testes de segurança, garantindo proteção de dados e conformidade com LGPD (ou outra legislação aplicável).",
        "Testes automatizados para garantir cobertura eficiente e redução de erros manuais.",
        "Correção de falhas e refinamento da aplicação antes da entrega final."
      ],
      en: [
        "Functional, usability, and performance testing to identify possible bugs.",
        "Security testing, ensuring data protection and compliance with LGPD (or other applicable legislation).",
        "Automated testing to ensure efficient coverage and reduce manual errors.",
        "Bug fixing and application refinement before final delivery."
      ],
      es: [
        "Pruebas funcionales, de usabilidad y de rendimiento para identificar posibles errores.",
        "Pruebas de seguridad, garantizando la protección de datos y el cumplimiento de la LGPD (u otra legislación aplicable).",
        "Pruebas automatizadas para garantizar una cobertura eficiente y reducir errores manuales.",
        "Corrección de errores y refinamiento de la aplicación antes de la entrega final."
      ],
      it: [
        "Test funzionali, di usabilità e di prestazioni per identificare possibili bug.",
        "Test di sicurezza, garantendo la protezione dei dati e la conformità alla LGPD (o altra legislazione applicabile).",
        "Test automatizzati per garantire una copertura efficiente e ridurre gli errori manuali.",
        "Correzione dei bug e perfezionamento dell'applicazione prima della consegna finale."
      ],
      fr: [
        "Tests fonctionnels, d'utilisabilité et de performance pour identifier d'éventuels bugs.",
        "Tests de sécurité, garantissant la protection des données et la conformité à la LGPD (ou autre législation applicable).",
        "Tests automatisés pour garantir une couverture efficace et réduire les erreurs manuelles.",
        "Correction des défauts et amélioration de l'application avant la livraison finale."
      ]
    }
  },
  {
    title: {
      pt: "Implantação e Suporte Contínuo",
      en: "Deployment and Continuous Support",
      es: "Implementación y Soporte Continuo",
      it: "Implementazione e Supporto Continuo",
      fr: "Déploiement et Support Continu"
    },
    company_name: {
      pt: "Entrega e Pós-lançamento",
      en: "Delivery and Post-launch",
      es: "Entrega y Post-lanzamiento",
      it: "Consegna e Post-lancio",
      fr: "Livraison et Post-lancement"
    },
    icon: tesla,
    iconBg: "#8B5CF6",
    date: "🚀🔧",
    points: {
      pt: [
        "Implantação do sistema em ambiente de produção, realizando os ajustes necessários.",
        "Monitoramento pós-implantação para garantir desempenho e resolver problemas rapidamente.",
        "Treinamento dos usuários finais, quando aplicável, para garantir o uso eficiente do software.",
        "Suporte contínuo, manutenção, melhorias e atualizações para garantir a longevidade do sistema."
      ],
      en: [
        "System deployment in production environment, making necessary adjustments.",
        "Post-deployment monitoring to ensure performance and resolve issues quickly.",
        "Training of end users, when applicable, to ensure efficient use of the software.",
        "Continuous support, maintenance, improvements, and updates to ensure system longevity."
      ],
      es: [
        "Implementación del sistema en ambiente de producción, realizando los ajustes necesarios.",
        "Monitoreo post-implementación para garantizar el rendimiento y resolver problemas rápidamente.",
        "Capacitación de los usuarios finales, cuando sea aplicable, para garantizar el uso eficiente del software.",
        "Soporte continuo, mantenimiento, mejoras y actualizaciones para garantizar la longevidad del sistema."
      ],
      it: [
        "Implementazione del sistema in ambiente di produzione, apportando le modifiche necessarie.",
        "Monitoraggio post-implementazione per garantire le prestazioni e risolvere rapidamente i problemi.",
        "Formazione degli utenti finali, quando applicabile, per garantire l'uso efficiente del software.",
        "Supporto continuo, manutenzione, miglioramenti e aggiornamenti per garantire la longevità del sistema."
      ],
      fr: [
        "Déploiement du système en environnement de production, en apportant les ajustements nécessaires.",
        "Surveillance post-déploiement pour garantir les performances et résoudre rapidement les problèmes.",
        "Formation des utilisateurs finaux, le cas échéant, pour garantir une utilisation efficace du logiciel.",
        "Support continu, maintenance, améliorations et mises à jour pour garantir la longévité du système."
      ]
    }
  }
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
    name: {
      pt: "Two Variant",
      en: "Two Variant",
      es: "Two Variant",
      it: "Two Variant",
      fr: "Two Variant"
    },
    description: {
      pt: "Aplicação desenvolvida para a empresa @twovariant / twovariant.com.br. Uma loja virtual onde o usuário poderá realizar compras, acompanhar o tempo de entrega e frete, provedor de pagamentos próprio.",
      en: "Application developed for the company @twovariant / twovariant.com.br. A virtual store where users can make purchases, track delivery time and shipping, with its own payment provider.",
      es: "Aplicación desarrollada para la empresa @twovariant / twovariant.com.br. Una tienda virtual donde el usuario puede realizar compras, seguir el tiempo de entrega y envío, con proveedor de pagos propio.",
      it: "Applicazione sviluppata per l'azienda @twovariant / twovariant.com.br. Un negozio virtuale dove l'utente può effettuare acquisti, monitorare i tempi di consegna e spedizione, con proprio fornitore di pagamenti.",
      fr: "Application développée pour l'entreprise @twovariant / twovariant.com.br. Une boutique virtuelle où l'utilisateur peut effectuer des achats, suivre le délai de livraison et d'expédition, avec son propre fournisseur de paiement."
    },
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
    source_code_link: "https://twovariant.com",
  },
  {
    name: {
      pt: "Borlenz Design",
      en: "Borlenz Design",
      es: "Borlenz Design",
      it: "Borlenz Design",
      fr: "Borlenz Design"
    },
    description: {
      pt: "Aplicação criada para a empresa de Design @borlenzdesign, Cujo projeto inicial se deu à ideia onde pudessemos enriquecer a experiência do usuário e lhes mostrar a elevação do design em seu negócio.",
      en: "Application created for the design company @borlenzdesign. The initial project was to enrich the user experience and show the elevation of design in their business.",
      es: "Aplicación creada para la empresa de diseño @borlenzdesign. El proyecto inicial fue enriquecer la experiencia del usuario y mostrar la elevación del diseño en su negocio.",
      it: "Applicazione creata per l'azienda di design @borlenzdesign. Il progetto iniziale era arricchire l'esperienza utente e mostrare l'elevazione del design nel loro business.",
      fr: "Application créée pour l'entreprise de design @borlenzdesign. Le projet initial visait à enrichir l'expérience utilisateur et à montrer l'élévation du design dans leur entreprise."
    },
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
    source_code_link: "https://borlenz.vercel.app",
  },
  {
    name: {
      pt: "Skyterra Mídia",
      en: "Skyterra Media",
      es: "Skyterra Media",
      it: "Skyterra Media",
      fr: "Skyterra Media"
    },
    description: {
      pt: "Aplicação criada em react e mongo-db, para a empresa @skyterramidia, cujo objetivo é oferecer serviços de produção aúdio visual em todo o Brasil, sejam eles em terra ou aéreos.",
      en: "Application created in React and MongoDB for the company @skyterramidia, whose goal is to offer audiovisual production services throughout Brazil, both on land and in the air.",
      es: "Aplicación creada en React y MongoDB para la empresa @skyterramidia, cuyo objetivo es ofrecer servicios de producción audiovisual en todo Brasil, tanto en tierra como en aire.",
      it: "Applicazione creata in React e MongoDB per l'azienda @skyterramidia, il cui obiettivo è offrire servizi di produzione audiovisiva in tutto il Brasile, sia a terra che in aria.",
      fr: "Application créée en React et MongoDB pour l'entreprise @skyterramidia, dont le but est d'offrir des services de production audiovisuelle dans tout le Brésil, sur terre et dans les airs."
    },
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
    source_code_link: "https://skyterramidia.com.br",
  },
];

export { services, technologies, experiences, testimonials, projects };