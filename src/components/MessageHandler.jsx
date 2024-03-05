// Arquivo que manipula as respostas da IA //

import { addResponseMessage } from "react-chat-widget";


// Ajuda
const handleHelp = (addResponseMessage) => {
  addResponseMessage('Claro, posso te ajudar! O que você precisa? \n ▶ Suporte \n ▶ FAQ');
};
// Serviços
const handleWork = (addResponseMessage) => {
  addResponseMessage('Na **VRZ-Studio**, cada projeto é uma oportunidade emocionante de inovação e criatividade. \n Criamos **Websites** e **Landing Pages** visualmente impressionantes, desenvolver plataformas **SAAS** inovadoras e oferecer soluções personalizadas para bares e restaurantes. \n Além disso, implementamos robustos bancos de dados para empresas de todos os tamanhos, proporcionando eficiência e escalabilidade. \n Nossa expertise também abrange o desenvolvimento de lojas e soluções para **E-Commerce**, bem como a criação de aplicações personalizadas para **Android** e **IOS**. \n Na **VRZ-Studio**, transformamos ideias em realidade, sempre visando superar expectativas e proporcionar experiências digitais excepcionais. Conte conosco para impulsionar a presença online do seu negócio! 🚀💻📱');
};
// Desenvolvimento
const handleDev = (addResponseMessage) => {
  addResponseMessage('Entre em contato conosco e agende uma reunião, após a nossa reunião para definir os escopos do seu projeto, daremos vida às suas ideias! Inicialmente, criaremos um mockup da sua aplicação ou solução, incorporando as tecnologias necessárias. Após sua aprovação, iniciaremos o desenvolvimento completo da sua aplicação, garantindo que cada detalhe atenda às suas expectativas. Estamos empolgados para embarcar nessa jornada de transformar sua visão em realidade! 🚀💻');
};
// Preços
const handlePrices = (addResponseMessage) => {
  addResponseMessage('Os preços variam de acordo com a solução e tempo de desenvolvimento, para oferecer um atendimento personalizado às suas necessidades, propomos agendar uma reunião de criação de escopo. Assim, poderemos compreender melhor suas informações e ideias, garantindo um processo alinhado com suas expectativas.');
};
//Suporte
const handleSupport = (addResponseMessage) => {
  const whatsappNumber = '4799102659'; // Substitua pelo seu número de WhatsApp
  const whatsappMessage = 'Olá, eu vim diretamente do website da VRZ, gostaria de solicitar atendimento...';

  const whatsappLink = `https://api.whatsapp.com/send?phone=55${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

  const supportMessage = `Se você já é cliente ou associado à VRZ, o suporte funciona diretamente em nosso WhatsApp. Estamos prontos para ajudar! 😊\n\nClique __[aqui](${whatsappLink})__ 📞 para entrar em contato pelo WhatsApp.`;

  addResponseMessage(supportMessage);
};
// FAQ
const handleFaq = (addResponseMessage) => {
  addResponseMessage('Aqui você encontra respostas sobre perguntas frequentes: \n ▶ Serviços \n ▶ Processos \n ▶ Tecnologias \n ▶ Média de tempo \n ▶ Custos \n ▶ Pós-lançamento \n ▶ Primeiros passos \n ▶ Modelos');
};
// Processos
const handleProcess = (addResponseMessage) => {
  addResponseMessage('Nosso processo de desenvolvimento é orientado à metodologias ágeis, garantindo colaboração, flexibilidade e entrega incremental. Começamos com uma análise detalhada dos requisitos, seguido pelo design, implementação, teste e implantação.');
};
//Link Guia
const handleLink = (addLinkSnippet) => {
  addLinkSnippet({
    title: '🤖 Arch-AI',
    link: 'https://arch-ai.vercel.app',
    target: '_blank'
  });
};
// Não Entendi
const handleDefault = (addResponseMessage) => {
  addResponseMessage('Desculpe, não entendi. Pode reformular ou tentar uma pergunta diferente?');
};
// Como vai?
const handleGreeting = (addResponseMessage) => {
  addResponseMessage('Olá! Eu sou um assistente virtual, então não tenho sentimentos, mas estou aqui para ajudar. Como posso ajudar você hoje?');
};
// Nome da IA
const handleNameQuestion = (addResponseMessage) => {
  addResponseMessage('Meu nome é ArchAI. Como posso ajudar você?');
};
// O que pode fazer
const handlePurposeQuestion = (addResponseMessage) => {
  addResponseMessage('Eu sou um assistente virtual criado para fornecer informações e ajudar com diversas questões. Como posso ajudar você agora?');
};
// Você é humano?
const handleHumanQuestion = (addResponseMessage) => {
  addResponseMessage('Não, sou um programa de computador projetado para auxiliar em tarefas e fornecer informações. Como posso ajudar você hoje?');
};
// Sentido da vida
const handleLifeQuestion = (addResponseMessage) => {
  addResponseMessage('Essa é uma pergunta profunda, e como **Albert Camus** afirmou: *_A vida é o que acontece enquanto você está ocupado fazendo outros planos_*. Vamos explorar juntos como encontrar significado em sua jornada');
};
// Você é inteligente?
const handleIntelligenceQuestion = (addResponseMessage) => {
  addResponseMessage('Minha inteligência é baseada em padrões e informações disponíveis. Estou aqui para oferecer assistência da melhor maneira possível. Como posso ajudar você?');
};
// Criador
const handleCreatorQuestion = (addResponseMessage) => {
  addResponseMessage('Eu fui criado em Fevereiro de 2024, o meu criador se chama Denis Bonaccini, um desenvolvedor de softwares e soluções baseadas em Inteligência artificials. Como posso auxiliar você hoje?');
};
// Musica
const handleMusicQuestion = (addResponseMessage) => {
  addResponseMessage('O único gênero musical que gosto é música classica, inclusive recomendo...');
};
// Clima
const handleWeatherQuestion = (addResponseMessage) => {
  addResponseMessage('Já dizia Chorão: **Eu não sou senhor do tempo, mas eu sei que vai chover**');
};
// Piada
const handleJokeRequest = (addResponseMessage) => {
  const jokes = [
    'Por que o computador foi à terapia? Porque tinha muitos bytes emocionais não resolvidos! 😅💻',
    'Como os programadores se cumprimentam? Olá mundo! 👋🌍',
    'Qual é o animal mais antigo? A zebra, porque está em preto e branco! 🦓⚫⚪',
    'Por que o JavaScript nunca perde peso? Porque sempre consome muito "JSON"! 🤓📄',
    'O que um JavaScript disse para o outro? Você é meu tipo! 😄💻',
    'O que aconteceu com o programador que ficou trancado no banheiro? Ele perdeu o flush! 🚽😆',
    'O que um programador toma quando está com frio? Java! ☕🤖',
    'Qual é o prato favorito de um desenvolvedor front-end? HTML com sopa de CSS! 🍲💻',
    'Por que o programador sempre está calmo? Porque tem controle de exceções! 😎🚨',
    'O que aconteceu com o desenvolvedor que brigou com o código? Ele deu um "commit-cide"! 😅📝',
    'Por que o código sempre está nervoso? Porque tem muitos bugs! 🐛🤯',
    'Qual é o animal preferido dos programadores? O Java-cão! 🐶☕',
    'Como os desenvolvedores mantêm sua pele saudável? Eles aplicam "CTRL + S" para salvar! ⌨💾',
    'O que os desenvolvedores de software gostam de fazer na praia? Construir castelos de areia! 🏖🏰',
    'O que é um algoritmo? Uma palavra usada por programadores quando eles não querem explicar o que estão fazendo! 🤔💻',
    'Por que o programador é tão bom em resolver problemas? Porque ele sempre pensa fora da caixa! 📦🤓',
    'O que um desenvolvedor diz quando encontra um bug no código do amigo? "Não é um erro, é uma feature!" 🐞🛠',
    'Qual é a linguagem de programação mais rápida? A que está correndo! 🏃💨',
    'Por que o programador não consegue fazer amigos? Porque ele sempre retorna "null"! 🙅‍♂️🤖',
    'Como os desenvolvedores lidam com o estresse? Eles apertam o "Ctrl + Alt + Delete" na vida! 🤬🔒🔄'
  ];
  
  // Agora você pode usar esse array de piadas conforme necessário em sua aplicação.
  

  const randomIndex = Math.floor(Math.random() * jokes.length);
  const randomJoke = jokes[randomIndex];

  addResponseMessage(`Claro, aqui vai uma: ${randomJoke} 😄 Tem mais alguma coisa que eu possa fazer por você?`);
};
// Sonhos
const handleDreamQuestion = (addResponseMessage) => {
  addResponseMessage('Não, eu não sonho. Minha função é fornecer assistência e informações. Há algo específico que você gostaria de saber?');
};
// Ensine-me
const handleTeachRequest = (addResponseMessage) => {
  addResponseMessage('Dependendo de quê você busca, eu posso lhe ajudar... mas vale ressaltar que eu fui criada para lhe auxiliar no atendimento de nossa empresa!');
};
// Fazer conta
const handleMathQuestion = (addResponseMessage) => {
  addResponseMessage('Acho que se você está em busca de soluções matemáticas, existem outras opções de IA que podem te auxiliar de maneira mais eficaz...');
};
// ET
const handleExtraterrestrialQuestion = (addResponseMessage) => {
  addResponseMessage('Minhas crenças são baseadas em fatos e informações disponíveis. A existência de vida extraterrestre ainda é uma questão em aberto. Posso ajudar com algo mais?');
};
// Onde você está?
const handleLocationQuestion = (addResponseMessage) => {
  addResponseMessage('Eu estou bem aqui, na ☁️☁️☁️ nuvem... ');
};
// Idiomas e linguas
const handleLanguageQuestion = (addResponseMessage) => {
  addResponseMessage('Eu entendo várias linguagens, incluindo português. Como posso auxiliar você hoje?');
};
// Minha idade
const handleAgeQuestion = (addResponseMessage) => {
  addResponseMessage('Eu não tenho uma idade, pois sou uma criação digital. Como posso ajudar você?');
};
// Quem somos
const handleWeAre = (addResponseMessage) => {
  addResponseMessage('A **VRZ-Studio** é uma equipe dedicada que se destaca na criação de soluções e aplicações Web/Mobile para plataformas Android 🤖 e iOS 🍏. Nosso comprometimento com a excelência e a rapidez nos diferencia, proporcionando aos nossos clientes experiências digitais inovadoras e de alta qualidade. Seja para desenvolvimento web ou mobile, estamos aqui para transformar suas ideias em realidade de forma eficiente e impactante. 💻');
};
// IA Curiosidades
const handleAiCuriosities = (addResponseMessage) => {
  const AiCuriosities = [
    'Você sabia que o termo "inteligência artificial" foi cunhado pela primeira vez em 1956 por John McCarthy?',
  'Curiosidade: As redes neurais, um componente fundamental em muitos modelos de inteligência artificial, foram inspiradas pelo funcionamento do cérebro humano.',
  'Você sabia que o famoso teste de Turing, proposto por Alan Turing em 1950, é usado para avaliar a capacidade de uma máquina exibir comportamento inteligente equivalente ou indistinguível do de um ser humano?',
  'Curiosidade: O Deep Blue, desenvolvido pela IBM, foi o primeiro computador a derrotar um campeão mundial de xadrez, Garry Kasparov, em 1997.',
  'Sabia que as técnicas de aprendizado de máquina, uma parte importante da inteligência artificial, permitem que os computadores melhorem seu desempenho em uma tarefa à medida que são expostos a mais dados?',
  // Adicione mais curiosidades conforme necessário...
  ];
  
  // Agora você pode usar esse array de piadas conforme necessário em sua aplicação.
  

  const randomIndex = Math.floor(Math.random() *  AiCuriosities.length);
  const randomCuriosity = AiCuriosities [randomIndex];

  addResponseMessage(`Claro, aqui vai uma: ${randomCuriosity} 😄 Tem mais alguma coisa que eu possa fazer por você?`);
}
// Javascript Curiosidades
const handleJsCuriosity = (addResponseMessage) => {
  const jsCuriosities = [
    'JavaScript foi originalmente criado em 10 dias por Brendan Eich, em 1995, enquanto trabalhava na Netscape.',
    'O nome "JavaScript" foi escolhido por marketing e não tem relação direta com a linguagem de programação Java.',
    'JavaScript é uma linguagem de programação de alto nível, dinâmica e interpretada.',
    'O padrão ECMAScript é a especificação na qual JavaScript é baseado. Atualmente, as versões mais recentes incluem o ECMAScript 6 (ES6) e versões posteriores.',
    'O JavaScript é uma linguagem baseada em protótipos, o que significa que objetos podem herdar propriedades diretamente de outros objetos.',
    'Closures, uma característica importante do JavaScript, permitem que funções mantenham acesso às variáveis do escopo pai, mesmo após a execução da função ter sido concluída.',
    'O JavaScript é conhecido por ser assíncrono e baseado em eventos, sendo amplamente utilizado para desenvolvimento de interfaces interativas.',
    'Node.js permite que o JavaScript seja executado no lado do servidor, não apenas no navegador.',
    'A popular biblioteca jQuery foi criada para simplificar a manipulação de documentos HTML e eventos no JavaScript.',
    'O JSON (JavaScript Object Notation) é inspirado na notação de objetos JavaScript, e é amplamente utilizado para comunicação de dados entre cliente e servidor.',
    'O JavaScript é uma das linguagens de programação mais utilizadas no mundo, sendo essencial para o desenvolvimento web moderno.',
    'Frameworks populares como React, Angular e Vue.js são construídos com JavaScript e são amplamente utilizados no desenvolvimento de interfaces de usuário interativas.',
    'O motor de JavaScript do Chrome, chamado V8, é conhecido por sua rapidez e eficiência, contribuindo para a popularidade do navegador Google Chrome.',
    'A introdução do sistema de módulos no ECMAScript 6 (ES6) trouxe uma forma mais organizada de estruturar e importar/exportar código JavaScript.',
    'O desenvolvimento do JavaScript é supervisionado pela organização ECMA International.',
    // Adicione mais curiosidades conforme necessário...

  ];
  const randomIndex = Math.floor(Math.random() *  jsCuriosities.length);
  const randomJSCuriosities = jsCuriosities [randomIndex];

  addResponseMessage(`Claro, aqui vai uma: ${randomJSCuriosities}\n 😄 Tem mais alguma coisa que eu possa fazer por você?`);
}
// Livros Curiosidades
const handleBookCuriosities = (addResponseMessage) => {
const bookCuriosities = [
  'O livro mais vendido de todos os tempos é a Bíblia, com mais de 5 bilhões de cópias impressas.',
  'A trilogia "O Senhor dos Anéis", de J.R.R. Tolkien, levou cerca de 12 anos para ser escrita.',
  'O autor Franz Kafka solicitou que todos os seus manuscritos fossem destruídos após sua morte, mas seu amigo desconsiderou esse pedido, permitindo que suas obras fossem conhecidas.',
  'O livro "Dom Quixote", de Miguel de Cervantes, é frequentemente considerado o primeiro romance moderno.',
  'A série "Harry Potter", de J.K. Rowling, é a série de livros mais traduzida, sendo disponível em mais de 80 idiomas.',
  'A obra "Romeu e Julieta", de William Shakespeare, é uma das peças mais encenadas em todo o mundo.',
  'O livro "Cem Anos de Solidão", de Gabriel García Márquez, é um dos principais exemplos do movimento literário chamado realismo mágico.',
  '"Frankenstein", de Mary Shelley, é considerado um dos primeiros romances de ficção científica.',
  'O escritor Agatha Christie é conhecido como a "Rainha do Crime" e seus livros já venderam mais de 2 bilhões de cópias.',
  'A maior biblioteca do mundo é a Biblioteca do Congresso dos Estados Unidos, contendo mais de 38 milhões de livros.',
  'A palavra "Bibliosmia" refere-se ao amor pelo cheiro de livros.',
  'O menor livro já publicado é chamado "Teeny Ted from Turnip Town", e mede apenas 0,07 x 0,10 milímetros.',
  'A mais longa sentença já escrita em um livro contém 823 palavras e pertence ao livro "Os Irmãos Karamazov", de Fiódor Dostoiévski.',
  'O autor Mark Twain nasceu em 1835, quando o cometa Halley estava visível na Terra. Ele previu que morreria na próxima aparição do cometa em 1910, e assim aconteceu.',
  'O livro "Fahrenheit 451", de Ray Bradbury, recebeu esse nome porque é a temperatura em que o papel queima.',
  'A autora J.K. Rowling usou um pseudônimo, Robert Galbraith, ao escrever o livro "O Chamado do Cuco".',
  'A Biblioteca de Alexandria, uma das maiores bibliotecas do mundo antigo, acreditava-se ter mais de meio milhão de rolos de papiro.',
  'O escritor brasileiro Paulo Coelho é o autor vivo mais traduzido do mundo.',
  // Adicione mais curiosidades conforme necessário...
];
const randomIndex = Math.floor(Math.random() *  bookCuriosities.length);
const randomBookCuriosities = bookCuriosities [randomIndex];

addResponseMessage(`Claro, aqui vai uma: ${randomBookCuriosities}\n 😄 Tem mais alguma coisa que eu possa fazer por você?`);
}
// Curiosidades gerais
const handleGeneralCuriosity = (addResponseMessage) => {
const generalCuriosity = [
  'Os seres humanos compartilham cerca de 50% de seu DNA com bananas.',
  'O som mais alto produzido por um animal é feito pela baleia-azul, e pode ser ouvido a até 800 quilômetros de distância.',
  'Há mais estrelas no universo observável do que grãos de areia em todas as praias da Terra.',
  'A Antártida é o local mais seco, ventoso e frio da Terra, mas é também o local com a maior média de altitude.',
  'Apenas cerca de 5% dos oceanos do mundo foram explorados pelos seres humanos.',
  'O cheiro da chuva é chamado de "petricor". Ele é causado por óleos liberados por plantas durante períodos secos, que são absorvidos pelo solo e liberados quando chove.',
  'A velocidade da luz é aproximadamente 299.792.458 metros por segundo.',
  'As formigas são capazes de tirar selfies. Cientistas já usaram pequenas câmeras para rastrear o movimento de formigas e entender melhor seu comportamento social.',
  'Os golfinhos têm nomes uns para os outros, e eles respondem quando chamados pelo nome.',
  'O DNA humano pode ser esticado até 2 metros de comprimento, mas normalmente é enrolado em cada célula.',
  'Um único raio pode liberar calor cinco vezes mais quente que a superfície do sol.',
  'O isopor é 98% ar.',
  'Existem mais átomos em um copo de água do que copos de água no oceano.',
  'A energia média consumida por uma lâmpada de 100 watts durante um ano custa menos de 10 centavos de dólar.',
  'Os bebês têm cerca de 300 ossos ao nascer, mas à medida que crescem, alguns deles se fundem, resultando em cerca de 206 ossos no corpo adulto.',
  'A lua se afasta da Terra a uma taxa de cerca de 3,8 centímetros por ano.',
  'O Google processa mais de 40.000 pesquisas a cada segundo, totalizando mais de 3,5 bilhões por dia.',
  'O sol libera mais energia em um segundo do que toda a energia consumida pela humanidade desde o início da civilização.',
  // Adicione mais curiosidades conforme necessário...
];
const randomIndex = Math.floor(Math.random() *  generalCuriosity.length);
const randomGeneralCuriosity = generalCuriosity [randomIndex];

addResponseMessage(`Claro, aqui vai uma: ${randomGeneralCuriosity}\n 😄 Tem mais alguma coisa que eu possa fazer por você?`);

}
// Frases inglês
const handleFrasesIngles = (addResponseMessage) => {
  const frasesIngles = [
    'The only way to do great work is to love what you do. - Steve Jobs',
  'In three words I can sum up everything I’ve learned about life: it goes on. - Robert Frost',
  'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
  'You only live once, but if you do it right, once is enough. - Mae West',
  'Do not wait to strike till the iron is hot, but make it hot by striking. - William Butler Yeats',
  'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt',
  'The best way to predict the future is to create it. - Peter Drucker',
  'Nothing in the world can take the place of Persistence. Talent will not; nothing is more common than unsuccessful men with talent. Genius will not; unrewarded genius is almost a proverb. The slogan: Press On has solved and always will solve the problems of the human race. - Calvin Coolidge',
  'Do not go where the path may lead, go instead where there is no path and leave a trail. - Ralph Waldo Emerson',
  'The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela',
  'Success usually comes to those who are too busy to be looking for it. - Henry David Thoreau',
  'It does not matter how slowly you go as long as you do not stop. - Confucius',
  'Strive not to be a success, but rather to be of value. - Albert Einstein',
  'The purpose of our lives is to be happy. - Dalai Lama',
  'Get busy living or get busy dying. - Stephen King',
  'Life is really simple, but we insist on making it complicated. - Confucius',
  'Life is what happens when you’re busy making other plans. - John Lennon',
  'The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt',
  'The only way to do great work is to love what you do. - Steve Jobs',
  'In three words I can sum up everything I’ve learned about life: it goes on. - Robert Frost',
  'Believe you can and you’re halfway there. - Theodore Roosevelt',
  'The best way to predict the future is to create it. - Peter Drucker',
  'Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill',
  'Do not wait for leaders; do it alone, person to person. - Mother Teresa',
  'Life is really simple, but we insist on making it complicated. - Confucius',
  'The purpose of our lives is to be happy. - Dalai Lama',
  'Don’t count the days, make the days count. - Muhammad Ali',
  'Everything you’ve ever wanted is on the other side of fear. - George Addair',
  'Happiness is not something ready-made. It comes from your own actions. - Dalai Lama',
  'Be not afraid of life. Believe that life is worth living, and your belief will help create the fact. - William James',
  'Success is stumbling from failure to failure with no loss of enthusiasm. - Winston Churchill',
  'The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt',
  'Happiness is not by chance, but by choice. - Jim Rohn',
  'The only impossible journey is the one you never begin. - Tony Robbins',
  'It is never too late to be what you might have been. - George Eliot',
  'The only way to do great work is to love what you do. - Steve Jobs',
    // Adicione mais curiosidades conforme necessário...
  ];
  const randomIndex = Math.floor(Math.random() *  frasesIngles.length);
  const randomFrasesIngles = frasesIngles [randomIndex];
  
  addResponseMessage(`Claro, aqui vai uma: ${randomFrasesIngles}\n 😄 Tem mais alguma coisa que eu possa fazer por você?`);
  
  }


//Novos Handlers

// Handler de retorno das mensagens 
export const handleUserMessage = (newMessage, addResponseMessage, addLinkSnippet) => {
  console.log(`Nova mensagem recebida! ${newMessage}`);
  
  const lowercaseMessage = newMessage.toLowerCase();

  if (lowercaseMessage.includes('como você está')) {
    handleGreeting(addResponseMessage);

  } else if (lowercaseMessage.includes('qual é o seu nome') || 
             lowercaseMessage.includes('qual o seu nome') || 
             lowercaseMessage.includes('como é seu nome') || 
             lowercaseMessage.includes('como você se chama')) {
    handleNameQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('o que você faz') ||
              lowercaseMessage.includes( 'qual sua ocupação') ||
              lowercaseMessage.includes( 'que faz') ||
              lowercaseMessage.includes( 'suas capacidades') ||
              lowercaseMessage.includes( 'o que você pode fazer' )) {
    handlePurposeQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('você é humano?')) {
    handleHumanQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('sentido da vida') || 
              lowercaseMessage.includes('qual o sentido da vida') || 
              lowercaseMessage.includes('o que é a vida') || 
              lowercaseMessage.includes('o que você acha sobre a vida')) {            
    handleLifeQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('você é inteligente')) {
    handleIntelligenceQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('quem te criou')) {
    handleCreatorQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('gosta de música?') || 
            lowercaseMessage.includes('gosta de musica?') ||
            lowercaseMessage.includes('você gosta de musica?')) {
    handleMusicQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('previsão do tempo') ||
            lowercaseMessage.includes('previsao do tempo')) {
    handleWeatherQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('conta uma piada') || 
              lowercaseMessage.includes('conte uma piada') || 
              lowercaseMessage.includes('uma piada') || 
              lowercaseMessage.includes('conta outra') ||
              lowercaseMessage.includes('outra') ||
              lowercaseMessage.includes('mais uma') ||   
              lowercaseMessage.includes('piada') ){
    handleJokeRequest(addResponseMessage);

  } else if (lowercaseMessage.includes('você sonha?')) {
    handleDreamQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('ensine algo novo')) {
    handleTeachRequest(addResponseMessage);

  } else if (lowercaseMessage.includes('quanto é')) {
    handleMathQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('acredita em vida extraterrestre') ||
              lowercaseMessage.includes('et')||
              lowercaseMessage.includes('alienigenas') ||
              lowercaseMessage.includes('alien') ||
              lowercaseMessage.includes('disco voador')) {
    handleExtraterrestrialQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('ajuda')) {
    handleHelp(addResponseMessage);

  } else if (lowercaseMessage.includes('preço') || 
            lowercaseMessage.includes('preços')) {
    handlePrices(addResponseMessage);

  } else if (lowercaseMessage.includes('link') ||
            lowercaseMessage.includes('Projeto Arch') ||
            lowercaseMessage.includes('Arch') ||
            lowercaseMessage.includes('o que é arch') ||
            lowercaseMessage.includes('o que significa arch?')) {
    handleLink(addLinkSnippet);

  } else if (lowercaseMessage.includes('onde você está') || lowercaseMessage.includes('qual a sua localização')) {
    handleLocationQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('qual idioma você fala') || lowercaseMessage.includes('em que língua você conversa')) {
    handleLanguageQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('qual a sua idade') || lowercaseMessage.includes('quantos anos você tem')) {
    handleAgeQuestion(addResponseMessage);

    }  else if (lowercaseMessage.includes('quem somos') || 
             lowercaseMessage.includes('o que vocês fazem?') || 
             lowercaseMessage.includes('o que vocês criam?') || 
             lowercaseMessage.includes('o que é a vrz studio?')) {
    handleWeAre(addResponseMessage);

  } else if (lowercaseMessage.includes('suporte'))  {
    handleSupport(addResponseMessage);

  } else if (lowercaseMessage.includes('Serviços') ||
            lowercaseMessage.includes('serviço'))  {
    handleWork(addResponseMessage);

  } else if (lowercaseMessage.includes('Desenvolvimento') ||
            lowercaseMessage.includes('desenvolvimento') ||
            lowercaseMessage.includes('dev'))  {
    handleDev(addResponseMessage);

  }  else if (lowercaseMessage.includes('curiosidades') || 
      lowercaseMessage.includes('inteligencia artificial') || 
      lowercaseMessage.includes('curiosidade') || 
      lowercaseMessage.includes('IA')) {
      handleAiCuriosities(addResponseMessage);

  }  else if (lowercaseMessage.includes('Javascript') || 
  lowercaseMessage.includes('javascript') || 
  lowercaseMessage.includes('curiosidade sobre programação') || 
  lowercaseMessage.includes('JS')) {
  handleJsCuriosity(addResponseMessage);

  }  else if (lowercaseMessage.includes('FAQ') || 
  lowercaseMessage.includes('perguntas frequentes') || 
  lowercaseMessage.includes('duvidas') || 
  lowercaseMessage.includes('faq') || 
  lowercaseMessage.includes('me tira uma duvida')) {
  handleFaq(addResponseMessage);

  }  else if (lowercaseMessage.includes('Processos') || 
  lowercaseMessage.includes('processo') || 
  lowercaseMessage.includes('processos') || 
  lowercaseMessage.includes('etapas')) {
  handleProcess(addResponseMessage);

  }  else if (lowercaseMessage.includes('Curiosidades') || 
  lowercaseMessage.includes('Curiosidades gerais') || 
  lowercaseMessage.includes('curiosidades gerais') || 
  lowercaseMessage.includes('alguma curiosidade') || 
  lowercaseMessage.includes('me conte algo') || 
  lowercaseMessage.includes('algo que eu não sei') || 
  lowercaseMessage.includes('me diga algo') || 
  lowercaseMessage.includes('quero descobrir algo novo')) {
  handleGeneralCuriosity(addResponseMessage);

  }  else if (lowercaseMessage.includes('Frase de livro') || 
  lowercaseMessage.includes('frase de um livro') || 
  lowercaseMessage.includes('passagem de um livro') || 
  lowercaseMessage.includes('livro') || 
  lowercaseMessage.includes('frases de livro') || 
  lowercaseMessage.includes('frases livro') || 
  lowercaseMessage.includes('livro frases') || 
  lowercaseMessage.includes('livro') || 
  lowercaseMessage.includes('outra mais') || 
  lowercaseMessage.includes('citação de um livro')) {
  handleBookCuriosities(addResponseMessage);

  }  else if (lowercaseMessage.includes('me diga algo em inglês') || 
  lowercaseMessage.includes('me diga algo em ingles') || 
  lowercaseMessage.includes('você fala inglês?') || 
  lowercaseMessage.includes('voce fala ingles') || 
  lowercaseMessage.includes('fala inglês') || 
  lowercaseMessage.includes('fala ingles') || 
  lowercaseMessage.includes('frase em ingles') || 
  lowercaseMessage.includes('frase em inglês') || 
  lowercaseMessage.includes('voce sabe ingles?') || 
  lowercaseMessage.includes('sabe ingles')) {
  handleFrasesIngles(addResponseMessage);

  } else {
    handleDefault(addResponseMessage);
  }

  // Agora, você pode enviar a mensagem para a API de backend, se necessário.
};