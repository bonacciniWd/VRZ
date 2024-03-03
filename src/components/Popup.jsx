// Popup.js
import React, { useEffect, useState, useRef } from 'react';
import { Widget, addResponseMessage, addLinkSnippet } from 'react-chat-widget';
import { handleUserMessage } from './MessageHandler';

import 'react-chat-widget/lib/styles.css';

import user from '../assets/user.png';
import rc from '../assets/rc.png';
import Ai from '../assets/Ai.png';

import './Popup.css';

const Popup = () => {
  const [chatWindowOpen, setChatWindowOpen] = useState(true);
  const [messages, setMessages] = useState([]);  // Adicionamos um estado para controlar as mensagens

  const handleToggle = () => {
    setChatWindowOpen((prev) => !prev);
  };

  useEffect(() => {
    addResponseMessage('Bem-vindo ao atendimento da VRZ-Studio, eu sou Arch 🤖, uma inteligência artificial e estou aqui para facilitar o seu atendimento. Você também pode me perguntar coisas do tipo:\n▶ _Ajuda_\n▶ _Preços_\n▶ _Serviços_\n▶ _Conte uma piada_\n▶ _O que você faz_\n▶ _Sentido da vida_\n');
  }, []);

  useEffect(() => {
    // Atualiza as mensagens quando o estado messages é modificado
    if (messages.length > 0) {
      addResponseMessage(messages[messages.length - 1]);
    }
  }, [messages]);

  const handleNewUserMessage = (newMessage) => {
    handleUserMessage(newMessage, (responseMessage) => {
      // Adiciona a nova mensagem ao estado messages
      setMessages((prevMessages) => [...prevMessages, responseMessage]);
    }, addLinkSnippet);
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
