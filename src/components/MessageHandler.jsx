// MessageHandler.js

// ... (código anterior)

const handleHelp = (addResponseMessage) => {
  addResponseMessage('Claro, posso te ajudar! O que você precisa?');
};

const handlePrices = (addResponseMessage) => {
  addResponseMessage('Os preços variam de acordo com os serviços. Como posso te ajudar mais especificamente?');
};

const handleLink = (addLinkSnippet) => {
  addLinkSnippet({
    title: 'Link Útil',
    link: 'https://example.com',
    target: '_blank'
  });
};

const handleDefault = (addResponseMessage) => {
  addResponseMessage('Desculpe, não entendi. Pode reformular ou tentar uma pergunta diferente?');
};

const handleGreeting = (addResponseMessage) => {
  addResponseMessage('Olá! Eu sou um assistente virtual, então não tenho sentimentos, mas estou aqui para ajudar. Como posso ajudar você hoje?');
};

const handleNameQuestion = (addResponseMessage) => {
  addResponseMessage('Meu nome é ArchAI. Como posso ajudar você?');
};

const handlePurposeQuestion = (addResponseMessage) => {
  addResponseMessage('Eu sou um assistente virtual criado para fornecer informações e ajudar com diversas questões. Como posso ajudar você agora?');
};

const handleHumanQuestion = (addResponseMessage) => {
  addResponseMessage('Não, sou um programa de computador projetado para auxiliar em tarefas e fornecer informações. Como posso ajudar você hoje?');
};

const handleLifeQuestion = (addResponseMessage) => {
  addResponseMessage('Essa é uma pergunta profunda, e como **Albert Camus** afirmou: *_A vida é o que acontece enquanto você está ocupado fazendo outros planos_*. Vamos explorar juntos como encontrar significado em sua jornada');
};

const handleIntelligenceQuestion = (addResponseMessage) => {
  addResponseMessage('Minha inteligência é baseada em padrões e informações disponíveis. Estou aqui para oferecer assistência da melhor maneira possível. Como posso ajudar você?');
};

const handleCreatorQuestion = (addResponseMessage) => {
  addResponseMessage('Eu fui criado em Fevereiro de 2024, o meu criador se chama Denis Bonaccini, um desenvolvedor de softwares e soluções baseadas em Inteligência artificials. Como posso auxiliar você hoje?');
};

const handleMusicQuestion = (addResponseMessage) => {
  addResponseMessage('O único gênero musical que gosto é música classica, inclusive recomendo...');
};

const handleWeatherQuestion = (addResponseMessage) => {
  addResponseMessage('Já dizia Chorão: **Eu não sou senhor do tempo, mas eu sei que vai chover**');
};

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

const handleDreamQuestion = (addResponseMessage) => {
  addResponseMessage('Não, eu não sonho. Minha função é fornecer assistência e informações. Há algo específico que você gostaria de saber?');
};

const handleTeachRequest = (addResponseMessage) => {
  addResponseMessage('Dependendo de quê você busca, eu posso lhe ajudar... mas vale ressaltar que eu fui criada para lhe auxiliar no atendimento de nossa empresa!');
};

const handleMathQuestion = (addResponseMessage) => {
  addResponseMessage('Acho que se você está em busca de soluções matemáticas, existem outras opções de IA que podem te auxiliar de maneira mais eficaz...');
};

const handleExtraterrestrialQuestion = (addResponseMessage) => {
  addResponseMessage('Minhas crenças são baseadas em fatos e informações disponíveis. A existência de vida extraterrestre ainda é uma questão em aberto. Posso ajudar com algo mais?');
};

const handleLocationQuestion = (addResponseMessage) => {
  addResponseMessage('Eu não tenho uma localização física, pois sou um programa de computador. Posso ajudar com algo mais?');
};

const handleLanguageQuestion = (addResponseMessage) => {
  addResponseMessage('Eu entendo várias linguagens, incluindo português. Como posso auxiliar você hoje?');
};

const handleAgeQuestion = (addResponseMessage) => {
  addResponseMessage('Eu não tenho uma idade, pois sou uma criação digital. Como posso ajudar você?');
};

// ... (outras funções)

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

  } else if (lowercaseMessage.includes('você é humano')) {
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

  } else if (lowercaseMessage.includes('você sonha')) {
    handleDreamQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('ensine algo novo')) {
    handleTeachRequest(addResponseMessage);

  } else if (lowercaseMessage.includes('quanto é')) {
    handleMathQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('acredita em vida extraterrestre')) {
    handleExtraterrestrialQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('ajuda')) {
    handleHelp(addResponseMessage);

  } else if (lowercaseMessage.includes('preço') || lowercaseMessage.includes('preços')) {
    handlePrices(addResponseMessage);

  } else if (lowercaseMessage.includes('site')) {
    handleLink(addLinkSnippet);

  } else if (lowercaseMessage.includes('onde você está') || lowercaseMessage.includes('qual a sua localização')) {
    handleLocationQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('qual idioma você fala') || lowercaseMessage.includes('em que língua você conversa')) {
    handleLanguageQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('qual a sua idade') || lowercaseMessage.includes('quantos anos você tem')) {
    handleAgeQuestion(addResponseMessage);
  } else {
    handleDefault(addResponseMessage);
  }

  // Agora, você pode enviar a mensagem para a API de backend, se necessário.
};