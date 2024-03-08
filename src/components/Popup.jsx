import React, { useEffect, useState, useRef } from 'react';
import { Widget, addResponseMessage, addLinkSnippet } from 'react-chat-widget';
import { handleUserMessage } from './MessageHandler';

import 'react-chat-widget/lib/styles.css';

import user from '../assets/user.png';
import rc from '../assets/ai.svg';
import Ai from '../assets/rc.svg';

import './Popup.css';

const Popup = () => {

  const [loaderActive, setLoaderActive] = useState(false);
  const handleTypingEffect = () => {
    setLoaderActive(true); // Ativa o loader antes de adicionar a mensagem
    const typingInterval = setInterval(() => {
      setTyping((prev) => !prev);
    }, 500);

    setTimeout(() => {
      clearInterval(typingInterval);
      setTyping(false);
      setLoaderActive(false); // Desativa o loader após o efeito de digitação
    }, 3000);
  };

  const [chatWindowOpen, setChatWindowOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(null);
  const initialMessageDisplayed = useRef(false);

  const handleToggle = () => {
    setChatWindowOpen((prev) => !prev);
  };

  useEffect(() => {
    if (initialMessageDisplayed.current) {
      addResponseMessage('Bem-vindo ao atendimento da VRZ-Studio, eu sou Arch 🤖, uma inteligência artificial e estou aqui para facilitar o seu atendimento. Você também pode me perguntar coisas do tipo:\n᠉ *Ajuda* \n ᠉ *Desenvolvimento* \n ᠉ *Preços* \n᠉ *Serviços* \n\n Você também pode perguntar: \n᠉ *Conte uma piada* \n᠉ *O que você faz* \n᠉ *Sentido da vida*\n');
      initialMessageDisplayed.current = true;
    } else if (!userName) {
      // Pergunta pelo nome do usuário na segunda interação
      addResponseMessage(`Seja bem-vindo ao nosso atendimento inteligente, poderia me dizer o seu nome?`);
      handleTypingEffect(); // Inicia o efeito de digitação com o loader

    } else {
      // Exibe mensagem personalizada com o nome do usuário
      addResponseMessage(`Olá ${userName}!! \n\n Bem-vindo ao atendimento da VRZ-Studio, eu sou Arch 🤖, uma inteligência artificial e estou aqui para facilitar o seu atendimento. Você também pode me perguntar coisas do tipo:\n\n᠉ *Ajuda* \n ᠉ *Desenvolvimento* \n ᠉ *Preços* \n᠉ *Serviços* \n\n Você também pode perguntar: \n᠉ *Conte uma piada* \n᠉ *O que você faz* \n᠉ *Sentido da vida*\n\n Saiba mais sobre IA, digite: \n ᠉ **Arch**`);
      handleTypingEffect(); // Inicia o efeito de digitação com o loader

      // ... (seu código existente)
    }
  }, [initialMessageDisplayed, userName]);

  useEffect(() => {
    if (messages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, messages[messages.length - 1]]);
    }
  }, [messages]);

  const handleNewUserMessage = (newMessage) => {
    if (!userName) {
      setUserName(newMessage);
    } else {
      setLoaderActive(true); // Ativa o loader antes de processar a mensagem do usuário

      handleUserMessage(newMessage, (responseMessage) => {
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
        setLoaderActive(false); // Desativa o loader após a mensagem do usuário ser processada
      }, addLinkSnippet, userName);
    }
  };

  return (
    <div>
      <Widget
        handleToggle={handleToggle}
        handleNewUserMessage={handleNewUserMessage}
        profileAvatar={Ai}
        title="Arch-AI"
        subtitle="Powered by VRZ-Studio"
        senderPlaceHolder="Digite aqui..."
        profileClientAvatar={user}
        titleAvatar={rc}
        chatId
        emojis
        showBadge
        toggleMsgLoader={loaderActive}
      />
      <div className={`loader ${loaderActive ? 'active' : ''}`}></div>
    </div>
  );
};

export default Popup;
