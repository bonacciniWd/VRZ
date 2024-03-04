import React, { useEffect, useState, useRef } from 'react';
import { Widget, addResponseMessage, addUserMessage, addLinkSnippet } from 'react-chat-widget';
import { handleUserMessage } from './MessageHandler';

import 'react-chat-widget/lib/styles.css';

import user from '../assets/user.png';
import rc from '../assets/rc.png';
import Ai from '../assets/Ai.png';

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
    if (!initialMessageDisplayed.current) {
      addResponseMessage('Bem-vindo ao atendimento da VRZ-Studio, eu sou Arch 🤖, uma inteligência artificial e estou aqui para facilitar o seu atendimento. Você também pode me perguntar coisas do tipo:\n᠉ *Ajuda* \n ᠉ *Desenvolvimento* \n ᠉ *Preços* \n᠉ *Serviços* \n\n Você também pode perguntar: \n᠉ *Conte uma piada* \n᠉ *O que você faz* \n᠉ *Sentido da vida*\n');
      initialMessageDisplayed.current = true;
    } else if (!userName) {
      // Pergunta pelo nome do usuário na segunda interação
      addResponseMessage('Antes de começarmos, poderia me dizer o seu nome?');
    } else {
      // Exibe mensagem personalizada com o nome do usuário
      addResponseMessage(`Olá ${userName}, O que você precisa?`);
    }
  }, [initialMessageDisplayed, userName]);

  useEffect(() => {
    if (messages.length > 0) {
      handleUserMessage(messages[messages.length - 1].message, (responseMessage) => {
        // Adiciona a nova mensagem ao estado messages
        setMessages((prevMessages) => [...prevMessages, responseMessage]);
      }, addLinkSnippet, userName);
    }
  }, [messages, userName]);

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
        sendButtonAlt
        emojis
        showBadge
        toggleMsgLoader
      />
    </div>
  );
};

export default Popup;
