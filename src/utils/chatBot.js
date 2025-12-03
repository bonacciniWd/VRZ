// Sistema de Bot Inteligente para Visione Rifatta
// Gerencia fluxos de conversação, respostas automáticas e transição para humanos

export const BOT_USER_ID = 'bot-vrz-assistant';
export const CHAT_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutos

export const CHAT_STATUS = {
  INACTIVE: 'inativo',
  BOT_ACTIVE: 'bot_ativo',
  HUMAN_REQUESTED: 'humano_solicitado',
  HUMAN_ACTIVE: 'humano_ativo'
};

// Banco de conhecimento expandido sobre a Visione Rifatta
export const BOT_KNOWLEDGE = {
  pt: {
    greeting: {
      title: '👋 Olá!',
      content: `Prazer em conhecê-lo! Sou o **VRZ Assistant**.

Somos uma software house completa especializada em:

🚀 **Desenvolvimento Web & Mobile**
👁️ **Visão Computacional & IA**
📊 **CRM/ERP Customizados**
⛓️ **Blockchain & Web3**
💳 **Gateways de Pagamento**
🛒 **E-commerce Personalizado**

Como posso ajudar você hoje? Use os botões abaixo ou digite sua pergunta! 😊`,
      keywords: ['oi', 'olá', 'hello', 'hi', 'boa tarde', 'boa noite', 'bom dia', 'hey', 'e aí']
    },

    services: {
      title: '🚀 Nossos Serviços',
      content: `Somos uma software house completa que oferece:

• **Visão Computacional** - IA para reconhecimento de imagens e vídeo
• **CRM & ERP** - Sistemas de gestão personalizados
• **QR-Code Solutions** - Pagamentos e rastreamento
• **Gateways de Pagamento** - Integração com Pix, cartões e mais
• **E-commerce Personalizado** - Lojas online sob medida
• **Portfólios Profissionais** - Sites modernos e responsivos
• **Aplicações Web Avançadas** - React, Next.js, Three.js
• **Web3 & Blockchain** - Smart contracts com Solidity e Pragma
• **Apps Mobile** - Flutter e React Native
• **Infraestrutura Cloud** - Railway, Supabase, AWS`,
      keywords: ['serviço', 'services', 'oferecem', 'fazem', 'trabalham', 'área']
    },
    
    technologies: {
      title: '⚙️ Stack Tecnológico',
      content: `Trabalhamos com tecnologias de ponta:

**Frontend:**
• React, Next.js, Vue.js
• Three.js para experiências 3D
• Tailwind CSS, Framer Motion

**Backend:**
• Node.js, Python, Deno
• PostgreSQL, Supabase
• APIs REST e GraphQL

**Mobile:**
• React Native (iOS/Android)
• Flutter (multiplataforma)

**Blockchain:**
• Solidity (Ethereum)
• Pragma (Starknet)
• Web3.js, Ethers.js

**Cloud & DevOps:**
• Railway, Vercel, AWS
• Docker, CI/CD
• Supabase (BaaS)`,
      keywords: ['tecnologia', 'tech', 'stack', 'linguagem', 'framework', 'ferramenta']
    },

    vision_ai: {
      title: '👁️ Visão Computacional',
      content: `Especialistas em **Computer Vision**:

• Reconhecimento facial e de objetos
• Análise de imagens médicas
• Controle de qualidade industrial
• Detecção de anomalias
• OCR (reconhecimento de texto)
• Rastreamento em tempo real

Usamos TensorFlow, OpenCV, PyTorch e modelos customizados de deep learning.`,
      keywords: ['visão', 'vision', 'computer', 'ia', 'ai', 'inteligência', 'reconhecimento', 'opencv']
    },

    crm_erp: {
      title: '📊 CRM & ERP Customizados',
      content: `Desenvolvemos sistemas de gestão completos:

**CRM (Customer Relationship):**
• Gestão de leads e pipeline
• Automação de marketing
• Relatórios e dashboards
• Integração com WhatsApp/Email

**ERP (Enterprise Resource):**
• Gestão financeira
• Controle de estoque
• Faturamento e NF-e
• Multi-empresa e multi-usuário

Totalmente personalizável para seu negócio!`,
      keywords: ['crm', 'erp', 'gestão', 'sistema', 'gerencial', 'empresa', 'negócio']
    },

    payment: {
      title: '💳 Gateways de Pagamento',
      content: `Integramos as principais formas de pagamento:

• **Pix** - Instantâneo e QR Code
• **Cartão de Crédito/Débito** - Parcelamento
• **Boleto Bancário**
• **Carteiras Digitais** - PicPay, Mercado Pago

Suportamos: Stripe, NuPay, Asaas, Mercado Pago, PagSeguro e mais.

✅ Segurança PCI-DSS
✅ Webhooks para notificações
✅ Recorrência e assinaturas`,
      keywords: ['pagamento', 'payment', 'pix', 'cartão', 'boleto', 'gateway', 'checkout']
    },

    ecommerce: {
      title: '🛒 E-commerce Personalizado',
      content: `Criamos lojas online completas:

• Catálogo de produtos ilimitado
• Carrinho e checkout otimizado
• Painel administrativo completo
• Gestão de estoque e pedidos
• Cupons e promoções
• Múltiplos meios de pagamento
• Integração com envio (Correios, Melhor Envio)
• SEO otimizado
• Analytics e relatórios

Muito além de templates! Seu e-commerce único.`,
      keywords: ['ecommerce', 'e-commerce', 'loja', 'shop', 'venda', 'produto', 'carrinho']
    },

    blockchain: {
      title: '⛓️ Web3 & Blockchain',
      content: `Desenvolvemos soluções blockchain:

**Smart Contracts:**
• Solidity (Ethereum, BSC, Polygon)
• Pragma (Starknet)
• Rust (Solana)

**DApps (Aplicações Descentralizadas):**
• NFT Marketplaces
• DeFi (finanças descentralizadas)
• DAOs (organizações autônomas)
• Tokens (ERC-20, ERC-721, ERC-1155)

**Integrações Web3:**
• Carteiras (MetaMask, WalletConnect)
• IPFS para armazenamento
• Oráculos (Chainlink)`,
      keywords: ['blockchain', 'web3', 'crypto', 'nft', 'solidity', 'smart contract', 'ethereum', 'defi']
    },

    mobile: {
      title: '📱 Aplicativos Mobile',
      content: `Apps nativos e híbridos:

**React Native:**
• iOS e Android simultâneos
• Performance nativa
• Hot reload para desenvolvimento rápido

**Flutter:**
• UI belíssima e fluida
• Widgets customizados
• Multiplataforma (iOS, Android, Web)

**Features comuns:**
• Notificações push
• Câmera e galeria
• Geolocalização
• Pagamentos in-app
• Modo offline
• Biometria (Face ID, Touch ID)`,
      keywords: ['mobile', 'app', 'aplicativo', 'ios', 'android', 'flutter', 'react native']
    },

    timeline: {
      title: '⏱️ Prazos de Desenvolvimento',
      content: `Nossos prazos médios por tipo de projeto:

📄 **Landing Page:** 1-2 semanas
🌐 **Site Institucional:** 2-4 semanas
🛒 **E-commerce Básico:** 4-6 semanas
🛒 **E-commerce Avançado:** 6-10 semanas
📊 **CRM/ERP MVP:** 8-12 semanas
📊 **CRM/ERP Completo:** 12-20 semanas
📱 **App Mobile MVP:** 6-10 semanas
📱 **App Mobile Completo:** 10-16 semanas
⛓️ **Blockchain/DApp:** 8-16 semanas
👁️ **Visão Computacional:** 8-20 semanas

*Prazos podem variar conforme complexidade e escopo.*`,
      keywords: ['prazo', 'tempo', 'demora', 'quando', 'entregar', 'delivery', 'timeline']
    },

    pricing: {
      title: '💰 Investimento',
      content: `Trabalhamos com proposta personalizada. Faixas de investimento:

💚 **Projetos Básicos** (Landing, Sites): R$ 2.500 - R$ 8.000
💙 **Projetos Intermediários** (E-commerce, Apps): R$ 8.000 - R$ 25.000
💜 **Projetos Avançados** (CRM, ERP, IA): R$ 25.000 - R$ 80.000
🔥 **Projetos Enterprise** (Blockchain, Integrados): R$ 80.000+

**Formas de pagamento:**
• Parcelamento em até 12x
• 50% início + 50% entrega
• Mensalidades para projetos longos

📞 **Análise gratuita** do seu projeto!`,
      keywords: ['preço', 'valor', 'custo', 'quanto', 'investimento', 'orçamento', 'budget']
    },

    portfolio: {
      title: '💼 Nosso Portfólio',
      content: `Alguns cases de sucesso:

🏢 **Sistema CRM Imobiliário**
• 500+ imóveis cadastrados
• Pipeline de vendas automatizado
• WhatsApp integrado

🛒 **E-commerce de Moda**
• 10.000+ produtos
• 50.000+ pedidos processados
• Integração com estoque físico

👁️ **IA de Reconhecimento Facial**
• 99.7% de precisão
• Tempo real (30fps)
• Controle de acesso empresarial

⛓️ **NFT Marketplace**
• 5.000+ NFTs mintados
• R$ 2M+ em transações
• Polygon & Ethereum

Role a página para ver mais projetos na seção "Projetos"!`,
      keywords: ['portfólio', 'portfolio', 'projeto', 'trabalho', 'case', 'exemplo', 'cliente']
    },

    coverage: {
      title: '🌎 Área de Abrangência',
      content: `Atendemos em todo o mundo!

🇧🇷 **Brasil:** Presença nacional, atendimento remoto
🌎 **América Latina:** Projetos em 6 países
🇺🇸 **América do Norte:** Clientes nos EUA e Canadá
🇪🇺 **Europa:** Parcerias ativas
🌏 **Ásia:** Expansão em andamento

**Modelo de trabalho:**
• 100% remoto
• Reuniões online (Zoom, Meet)
• Comunicação 24/7
• Fuso horário flexível
• Visitas presenciais quando necessário

Não importa onde você está, podemos trabalhar juntos! 🚀`,
      keywords: ['onde', 'localização', 'location', 'atende', 'país', 'cidade', 'remoto', 'presencial']
    },

    process: {
      title: '🔄 Nosso Processo',
      content: `Como trabalhamos do início ao fim:

**1️⃣ Descoberta (1-2 dias)**
• Reunião de briefing
• Análise de requisitos
• Proposta técnica e comercial

**2️⃣ Planejamento (3-5 dias)**
• Prototipagem (Figma)
• Arquitetura técnica
• Cronograma detalhado

**3️⃣ Desenvolvimento (Sprints)**
• Entregas semanais/quinzenais
• Testes contínuos
• Seu feedback constante

**4️⃣ Homologação**
• Testes finais
• Ajustes e refinamento
• Treinamento da equipe

**5️⃣ Lançamento**
• Deploy em produção
• Monitoramento 24/7
• Suporte pós-lançamento

**6️⃣ Manutenção**
• Atualizações mensais
• Correções prioritárias
• Novos recursos`,
      keywords: ['processo', 'como', 'funciona', 'etapa', 'metodologia', 'trabalho', 'fluxo']
    },

    support: {
      title: '🛟 Suporte e Manutenção',
      content: `Garantimos seu projeto funcionando sempre:

**Suporte Incluso (3 meses):**
• Correção de bugs
• Dúvidas técnicas
• Pequenos ajustes

**Planos de Manutenção:**
💚 **Basic** (R$ 500/mês)
• Até 4h/mês de ajustes
• Monitoramento semanal
• Backup automático

💙 **Pro** (R$ 1.500/mês)
• Até 12h/mês de desenvolvimento
• Monitoramento 24/7
• Atualizações de segurança
• Relatórios mensais

💜 **Enterprise** (R$ 4.000/mês)
• Horas ilimitadas
• Equipe dedicada
• SLA de 2h resposta
• Melhorias proativas`,
      keywords: ['suporte', 'support', 'manutenção', 'bug', 'erro', 'problema', 'ajuda', 'help']
    },

    meeting: {
      title: '📅 Agendar Reunião',
      content: `Vamos conversar sobre seu projeto!

**Reunião Gratuita de 30 minutos:**
• Entender sua necessidade
• Apresentar soluções
• Estimar prazos e valores
• Tirar todas suas dúvidas

**Como agendar:**
1. Escolha o melhor dia/horário
2. Informe seu contato (WhatsApp/Email)
3. Receba confirmação em até 2h úteis

**Disponibilidade:**
• Segunda a Sexta: 9h às 18h
• Sábados: 9h às 13h (sob consulta)

Prefere manhã ou tarde? 😊`,
      keywords: ['reunião', 'meeting', 'agendar', 'conversar', 'chamada', 'videochamada', 'call']
    }
  },

  en: {
    services: {
      title: '🚀 Our Services',
      content: `We are a complete software house offering:

• **Computer Vision** - AI for image and video recognition
• **CRM & ERP** - Custom management systems
• **QR-Code Solutions** - Payments and tracking
• **Payment Gateways** - Integration with Pix, cards, and more
• **Custom E-commerce** - Tailored online stores
• **Professional Portfolios** - Modern and responsive websites
• **Advanced Web Applications** - React, Next.js, Three.js
• **Web3 & Blockchain** - Smart contracts with Solidity and Pragma
• **Mobile Apps** - Flutter and React Native
• **Cloud Infrastructure** - Railway, Supabase, AWS`,
      keywords: ['service', 'services', 'offer', 'do', 'work', 'area']
    },
    // ... (similar structure for other topics in English)
  }
};

// Keywords para detectar intenção de falar com humano
export const HUMAN_REQUEST_KEYWORDS = {
  pt: ['humano', 'pessoa', 'atendente', 'operador', 'alguém', 'falar com'],
  en: ['human', 'person', 'agent', 'operator', 'someone', 'talk to', 'speak with']
};

// Analisa mensagem e retorna resposta do bot
export function analyzeMessageAndRespond(message, language = 'pt') {
  const msg = message.toLowerCase().trim();
  const knowledge = BOT_KNOWLEDGE[language] || BOT_KNOWLEDGE.pt;

  // Verifica se usuário quer falar com humano
  const humanKeywords = HUMAN_REQUEST_KEYWORDS[language] || HUMAN_REQUEST_KEYWORDS.pt;
  if (humanKeywords.some(kw => msg.includes(kw))) {
    return {
      type: 'human_request',
      response: language === 'pt' 
        ? '🙋‍♂️ Entendido! Vou conectar você com nossa equipe.\n\nPor favor, deixe seu **nome**, **email** e uma breve descrição do que precisa. Um especialista entrará em contato em até **2 horas úteis**.\n\nEnquanto isso, posso responder outras dúvidas! 😊'
        : '🙋‍♂️ Understood! I\'ll connect you with our team.\n\nPlease leave your **name**, **email** and a brief description of what you need. A specialist will contact you within **2 business hours**.\n\nIn the meantime, I can answer other questions! 😊'
    };
  }

  // Busca no banco de conhecimento
  for (const [key, topic] of Object.entries(knowledge)) {
    if (topic.keywords.some(kw => msg.includes(kw))) {
      return {
        type: 'knowledge',
        topic: key,
        response: `${topic.title}\n\n${topic.content}`
      };
    }
  }

  // Resposta padrão se não encontrar match
  return {
    type: 'default',
    response: language === 'pt'
      ? '🤔 Hmm, não tenho certeza sobre isso. Posso ajudar com:\n\n• Nossos serviços e tecnologias\n• Prazos e investimentos\n• Portfólio e cases\n• Agendar uma reunião\n• Falar com a equipe\n\nO que você gostaria de saber?'
      : '🤔 Hmm, I\'m not sure about that. I can help with:\n\n• Our services and technologies\n• Timeline and pricing\n• Portfolio and cases\n• Schedule a meeting\n• Talk to the team\n\nWhat would you like to know?'
  };
}

// Verifica se chat está inativo (timeout)
export function isChatInactive(lastMessageTime) {
  if (!lastMessageTime) return true;
  const now = Date.now();
  const lastTime = new Date(lastMessageTime).getTime();
  return (now - lastTime) > CHAT_TIMEOUT_MS;
}

// Gera mensagem de boas-vindas
export function getWelcomeMessage(language = 'pt') {
  return language === 'pt'
    ? '👋 Olá! Sou o **VRZ Assistant**, assistente virtual da **Visione Rifatta**.\n\nSomos uma software house especializada em:\n\n🚀 Desenvolvimento Web & Mobile\n👁️ Visão Computacional\n📊 CRM/ERP Customizados\n⛓️ Blockchain & Web3\n💳 Gateways de Pagamento\n🛒 E-commerce Personalizado\n\nComo posso ajudar você hoje? Escolha uma opção abaixo ou digite sua pergunta! 😊'
    : '👋 Hello! I\'m the **VRZ Assistant**, virtual assistant from **Visione Rifatta**.\n\nWe are a software house specialized in:\n\n🚀 Web & Mobile Development\n👁️ Computer Vision\n📊 Custom CRM/ERP\n⛓️ Blockchain & Web3\n💳 Payment Gateways\n🛒 Custom E-commerce\n\nHow can I help you today? Choose an option below or type your question! 😊';
}

// Gera mensagem de timeout
export function getTimeoutMessage(language = 'pt') {
  return language === 'pt'
    ? '⏰ Nosso chat ficou inativo por mais de 30 minutos e foi encerrado.\n\n👋 Mas estou de volta! Como posso ajudar agora?'
    : '⏰ Our chat was inactive for more than 30 minutes and was closed.\n\n👋 But I\'m back! How can I help you now?';
}
