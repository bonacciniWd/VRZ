import React, { useEffect, useState, useRef } from 'react';
import { Widget, addResponseMessage, addLinkSnippet } from 'react-chat-widget';
import { handleUserMessage } from './MessageHandler';


import 'react-chat-widget/lib/styles.css';

import launcherOpen from '../assets/rc.svg';
import user from '../assets/user.png';
import rc from '../assets/ai.svg';
import Ai from '../assets/rc.svg';

import './Popup.css';

const Popup = () => {
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
    } else {
      // Exibe mensagem personalizada com o nome do usuário
      addResponseMessage(`Olá ${userName}!! \n\n Bem-vindo ao atendimento da VRZ-Studio, eu sou Arch 🤖, uma inteligência artificial e estou aqui para facilitar o seu atendimento. Você também pode me perguntar coisas do tipo:\n\n᠉ *Ajuda* \n ᠉ *Desenvolvimento* \n ᠉ *Preços* \n᠉ *Serviços* \n\n Você também pode perguntar: \n᠉ *Conte uma piada* \n᠉ *O que você faz* \n᠉ *Sentido da vida*\n\n Saiba mais sobre IA, digite: \n ᠉ **Arch**`);

      // Se houver uma segunda mensagem, envie-a automaticamente
      if (messages.length > 1) {
        handleUserMessage(messages[1], (responseMessage) => {
          // Adiciona a nova mensagem ao estado messages
          setMessages((prevMessages) => [...prevMessages, responseMessage]);
        }, addLinkSnippet, userName);
      }
    }
  }, [initialMessageDisplayed, userName]);

  useEffect(() => {
    if (messages.length > 0) {
      addResponseMessage(messages[messages.length - 1]);
    }
  }, [messages]);

  const handleNewUserMessage = (newMessage) => {
    if (!userName) {
      // Se ainda não tiver o nome do usuário, define o nome
      setUserName(newMessage);
    } else {
      // Se já tiver o nome do usuário, processa como uma mensagem regular
      handleUserMessage(newMessage, (responseMessage) => {
        // Adiciona a nova mensagem ao estado messages
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
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
        launcherOpenImg={launcherOpen}
      />
    </div>
  );
};

export default Popup;
