import React, { useEffect, useState, useRef } from 'react';
import { Widget, addResponseMessage, addLinkSnippet } from 'react-chat-widget';
import { handleUserMessage } from './MessageHandler';

import 'react-chat-widget/lib/styles.css';

import user from '../assets/user.png';
import rc from '../assets/ai.svg';
import Ai from '../assets/rc.svg';

import './Popup.css';

const Popup = () => {
  const [chatWindowOpen, setChatWindowOpen] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userName, setUserName] = useState(null);
  const [typing, setTyping] = useState(false); // Novo estado para controlar o efeito de digitação
  const initialMessageDisplayed = useRef(false);

  const handleToggle = () => {
    setChatWindowOpen((prev) => !prev);
  };

  const handleTypingEffect = () => {
    // Função para simular o efeito de digitação
    setTyping(true);
    setTimeout(() => setTyping(false), 3000); // Desliga o efeito de digitação após 3 segundos
  };

  useEffect(() => {
    if (initialMessageDisplayed.current) {
      addResponseMessage('Bem-vindo ao atendimento da VRZ-Studio, eu sou Arch 🤖, uma inteligência artificial e estou aqui para facilitar o seu atendimento. Você também pode me perguntar coisas do tipo:\n᠉ *Ajuda* \n ᠉ *Desenvolvimento* \n ᠉ *Preços* \n᠉ *Serviços* \n\n Você também pode perguntar: \n᠉ *Conte uma piada* \n᠉ *O que você faz* \n᠉ *Sentido da vida*\n');
      initialMessageDisplayed.current = true;
      handleTypingEffect();
    } else if (!userName) {
      addResponseMessage(`Seja bem-vindo ao nosso atendimento inteligente, poderia me dizer o seu nome?`);
      handleTypingEffect();
    } else {
      addResponseMessage(`Olá ${userName}!! \n\n Bem-vindo ao atendimento da VRZ-Studio, eu sou Arch 🤖, uma inteligência artificial e estou aqui para facilitar o seu atendimento. Você também pode me perguntar coisas do tipo:\n\n᠉ *Ajuda* \n ᠉ *Desenvolvimento* \n ᠉ *Preços* \n᠉ *Serviços* \n\n Você também pode perguntar: \n᠉ *Conte uma piada* \n᠉ *O que você faz* \n᠉ *Sentido da vida*\n\n Saiba mais sobre IA, digite: \n ᠉ **Arch**`);
      handleTypingEffect();
      if (messages.length > 1) {
        handleUserMessage(messages[1], (responseMessage) => {
          setMessages((prevMessages) => [...prevMessages, responseMessage]);
        }, addLinkSnippet, userName);
      }
    }
  }, [initialMessageDisplayed, userName, messages]);

  useEffect(() => {
    if (messages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, messages[messages.length - 1]]);
    }
  }, [messages]);

  const handleNewUserMessage = (newMessage) => {
    if (!userName) {
      setUserName(newMessage);
    } else {
      handleUserMessage(newMessage, (responseMessage) => {
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
        toggleMsgLoader
        typing={typing}
      />
    </div>
  );
};

export default Popup;
