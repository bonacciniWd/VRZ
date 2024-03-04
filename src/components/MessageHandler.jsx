// Arquivo que manipula as respostas da IA //

import { addResponseMessage } from "react-chat-widget";


// Ajuda
const handleHelp = (addResponseMessage) => {
  addResponseMessage('Claro, posso te ajudar! O que você precisa? \n ▶ Suporte ');
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
//Link Guia
const handleLink = (addLinkSnippet) => {
  addLinkSnippet({
    title: 'Links úteis',
    link: 'https://vrz-studio.tech',
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
// Ver filmes
const handleMovieQuestion = (addResponseMessage) => {
  addResponseMessage('Eu não assisto filmes, mas posso ajudar a recomendar com base nos seus gostos. Algum gênero específico que você prefere?');
};
// Lê livros
const handleBookQuestion = (addResponseMessage) => {
  addResponseMessage('Embora eu não leia livros, posso fornecer informações sobre diversos temas. Existe um tópico específico que você gostaria de saber mais?');
};
// Hobbies
const handleHobbyQuestion = (addResponseMessage) => {
  addResponseMessage('Eu não tenho hobbies, mas estou aqui para ajudar com os seus interesses. Alguma atividade específica que você gostaria de discutir?');
};
// Técnologia 
const handleTechQuestion = (addResponseMessage) => {
  addResponseMessage('Eu adoro tecnologia! Se tiver alguma dúvida sobre gadgets, programação, ou outros temas relacionados, estou à disposição.');
};
// Curiosidades
const techCuriosities = [
  'Sabia que a primeira linguagem de programação de alto nível foi Fortran, desenvolvida pela IBM em 1957?',
  'Você sabia que a internet foi inventada por Tim Berners-Lee em 1989? Ele também é o criador do HTML!',
  'Curiosidade: O termo "bug" para descrever um erro de programação originou-se quando um inseto ficou preso em um relé no Mark II, um computador da década de 1940.',
  'Você sabia que o código-fonte do sistema operacional Unix foi escrito em linguagem de programação C? Isso influenciou profundamente o desenvolvimento de sistemas operacionais modernos.',
  'Curiosidade: O primeiro mouse foi inventado por Douglas Engelbart em 1963. Ele tinha apenas uma única tecla!',
  'Você sabia que a linguagem de programação Python recebeu esse nome em homenagem ao grupo de comédia britânico "Monty Python"?',
  // Adicione mais curiosidades conforme necessário...
];
// Curiosidades Props
const getRandomItem = (array) => array[Math.floor(Math.random() * array.length)];
// Handle das Curiosidades
const handleTechCuriosityRequest = (addResponseMessage) => {
  const randomTechCuriosity = getRandomItem(techCuriosities);
  addResponseMessage(randomTechCuriosity);
};
// Ai-Curiosidades
const aiCuriosities = [
  'Você sabia que o termo "inteligência artificial" foi cunhado pela primeira vez em 1956 por John McCarthy?',
  'Curiosidade: As redes neurais, um componente fundamental em muitos modelos de inteligência artificial, foram inspiradas pelo funcionamento do cérebro humano.',
  'Você sabia que o famoso teste de Turing, proposto por Alan Turing em 1950, é usado para avaliar a capacidade de uma máquina exibir comportamento inteligente equivalente ou indistinguível do de um ser humano?',
  'Curiosidade: O Deep Blue, desenvolvido pela IBM, foi o primeiro computador a derrotar um campeão mundial de xadrez, Garry Kasparov, em 1997.',
  'Sabia que as técnicas de aprendizado de máquina, uma parte importante da inteligência artificial, permitem que os computadores melhorem seu desempenho em uma tarefa à medida que são expostos a mais dados?',
  // Adicione mais curiosidades conforme necessário...
];
// Handle da Ai-Curiosidades
const handleAICuriosityRequest = (addResponseMessage) => {
  const randomAICuriosity = getRandomItem(aiCuriosities);
  addResponseMessage(randomAICuriosity);
};
// Frases filosóficas
const philosophicalQuotes = [
  'A única coisa que sei é que nada sei. - Sócrates',
  'A vida sem examinação não vale a pena ser vivida. - Sócrates',
  'O homem é a medida de todas as coisas. - Protágoras',
  'Cogito, ergo sum. (Penso, logo existo.) - René Descartes',
  'A liberdade é a possibilidade do isolamento. - Friedrich Nietzsche',
  'O que é ser é ser percebido. - George Berkeley',
  'A mente é tudo. O que você pensa, você se torna. - Buda',
  'O homem nasce livre, mas está acorrentado em toda parte. - Jean-Jacques Rousseau',
  'A existência precede a essência. - Jean-Paul Sartre',
  'Deus está morto. - Friedrich Nietzsche',
  'A filosofia é um campo de batalha, não uma biblioteca. - Karl Marx',
  'O homem é condenado a ser livre. - Jean-Paul Sartre',
  'A imaginação é mais importante que o conhecimento. - Albert Einstein',
  'O sentido da vida é encontrar o seu dom. O propósito da vida é entregá-lo. - Pablo Picasso',
  'O tempo é uma ilusão. - Albert Einstein',
  'Não podemos solucionar problemas usando o mesmo tipo de pensamento que usamos quando os criamos. - Albert Einstein',
  'A verdadeira sabedoria está em reconhecer a própria ignorância. - Sócrates',
  'O preço de qualquer coisa é a quantidade de vida que você troca por isso. - Henry David Thoreau',
  'Somos o que fazemos repetidamente. A excelência, portanto, não é um ato, mas um hábito. - Aristóteles',
  'O conhecimento fala, mas a sabedoria escuta. - Jimi Hendrix',
  // Adicione mais frases conforme necessário...
];
// Handle das frases filosóficas
const handlePhilosophicalQuoteRequest = (addResponseMessage) => {
  const randomPhilosophicalQuote = getRandomItem(philosophicalQuotes);
  addResponseMessage(randomPhilosophicalQuote);
};
// Frases de livros
const handleBookPhrases = (addResponseMessage) => {
  const bookPhrases = [
    'É melhor ser temido do que amado, se não se pode ser os dois. - Nicolau Maquiavel, "O Príncipe"',
    'Somos uma forma de vida que surgiu porque o cosmos quis saber o que aconteceria se se visse a si mesmo. - Carl Sagan, "Bilhões de Bilhões"',
    'Entender como os outros pensam é uma habilidade valiosa, especialmente quando esses outros são pessoas importantes para você. - Ray Dalio, "Princípios"',
    'A liberdade é a liberdade de dizer que dois mais dois são quatro. Se isso for concedido, todo o resto se segue. - George Orwell, "1984"',
    'Só se vê bem com o coração, o essencial é invisível aos olhos. - Antoine de Saint-Exupéry, "O Pequeno Príncipe"',
    'O homem é homem porque é capaz de fazer o bem contra sua inclinação. - Fiódor Dostoiévski, "Crime e Castigo"',
    'Mesmo a menor pessoa pode mudar o curso do futuro. - J.R.R. Tolkien, "O Senhor dos Anéis"',
    'Ninguém merece suas lágrimas, e quem as merece não te fará chorar. - Gabriel García Márquez, "Cem Anos de Solidão"',
    'Todos os animais são iguais, mas alguns animais são mais iguais que outros. - George Orwell, "A Revolução dos Bichos"',
    'Aquele que lê muito e anda muito, vê muito e sabe muito. - Miguel de Cervantes, "Dom Quixote"',
    'As pessoas nunca percebem nada. - J.D. Salinger, "O Apanhador no Campo de Centeio"',
    'A melhor vingança é ser diferente do seu inimigo. - Marco Aurélio, "Meditações"',
    'A vulnerabilidade não é ganhar nem perder; é ter coragem de aparecer e ser visto quando não temos controle sobre o resultado. - Brené Brown, "A Coragem de Ser Imperfeito"',
    'Aqueles que abrem mão da liberdade essencial por um pouco de segurança temporária não merecem nem liberdade nem segurança. - George Orwell, "1984"',
    'Tu te tornas eternamente responsável por aquilo que cativas. - Antoine de Saint-Exupéry, "O Pequeno Príncipe"',
    // Adicione mais frases conforme necessário...
  ];

  const randomIndex = Math.floor(Math.random() * bookPhrases.length);
  const randomPhrase = bookPhrases[randomIndex];

  addResponseMessage(`Uma citação de um livro famoso: ${randomPhrase} 📚 Tem mais alguma coisa que eu possa fazer por você?`);
};
// Curiosidades  sobre a linguagem JavaScript
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

  const randomIndex = Math.floor(Math.random() * jsCuriosities.length);
  const randomCuriosity = jsCuriosities[randomIndex];

  addResponseMessage(`Uma curiosidade sobre JavaScript: ${randomCuriosity} 🤓 Tem mais alguma coisa que eu possa fazer por você?`);
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

  } else if (lowercaseMessage.includes('acredita em vida extraterrestre')) {
    handleExtraterrestrialQuestion(addResponseMessage);

  } else if (lowercaseMessage.includes('ajuda')) {
    handleHelp(addResponseMessage);

  } else if (lowercaseMessage.includes('preço') || 
            lowercaseMessage.includes('preços')) {
    handlePrices(addResponseMessage);

  } else if (lowercaseMessage.includes('link')) {
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

  } else if (lowerCaseMessage.includes('filme favorito', 'assistir filme')) {
    handleMovieQuestion(addResponseMessage);
  } else if (lowerCaseMessage.includes('livro favorito', 'ler livro')) {
    handleBookQuestion(addResponseMessage);
  } else if (lowerCaseMessage.includes('hobby', 'passatempo')) {
    handleHobbyQuestion(addResponseMessage);
  } else if (lowerCaseMessage.includes('tecnologia', 'gadgets')) {
    handleTechQuestion(addResponseMessage);
  } else if (lowerCaseMessage.includes('curiosidade sobre tecnologia', 'sabia que')) {
    handleTechCuriosityRequest(addResponseMessage);
  } else if (lowerCaseMessage.includes('piada', 'conta uma piada')) {
    handleJokeRequest(addResponseMessage);
  } else if (lowerCaseMessage.includes('curiosidade sobre inteligência artificial', 'curiosidade', 'curiosidades', 'me conte algo que eu não sei')) {
    handleAICuriosityRequest(addResponseMessage);
    
  } else if (lowerCaseMessage.includes('frase filosófica', 'filosofia')) {
    handlePhilosophicalQuoteRequest(addResponseMessage);

  }  else if (newMessage.toLowerCase().includes('citação de livro', 'frase de livro', 'frase famosa')) {
    handleBookPhrases(addResponseMessage);
    
  } else if (newMessage.toLowerCase().includes('curiosidade sobre javascript')) {
      handleJsCuriosity(addResponseMessage);
    } else {
    handleDefault(addResponseMessage);
  }

  // Agora, você pode enviar a mensagem para a API de backend, se necessário.
};