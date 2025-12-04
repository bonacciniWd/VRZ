import React, { useState, useEffect, useRef } from 'react';
import { useMessages } from '../hooks/useMessages.js';
import { useChatSession } from '../hooks/useChatSession.js';
import { useLanguage } from '../app/LanguageContext.jsx';
import { QUICK_REPLIES } from '../utils/quickReplies.js';
import { ChatAuthModal } from './ChatAuthModal.jsx';
import { 
  BOT_USER_ID, 
  CHAT_STATUS, 
  analyzeMessageAndRespond, 
  isChatInactive, 
  getWelcomeMessage,
  getTimeoutMessage 
} from '../utils/chatBot.js';
import { Send, Sparkles, X, Minimize2, User } from 'lucide-react';

const ChatWindow = ({ userId, roomType = 'global', roomId = null, onClose }) => {
  const [input, setInput] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [quickRepliesExpanded, setQuickRepliesExpanded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(!userId);
  const [guestUserId, setGuestUserId] = useState(null);
  const messagesEndRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const isReady = !!userId || !!guestUserId;
  const effectiveUserId = userId || guestUserId;
  const { language } = useLanguage();
  
  // Gerenciamento de sessão de chat
  const { 
    chatSession, 
    updateActivity, 
    updateStatus,
    updateMetadata
  } = useChatSession(roomId);
  
  const chatStatus = chatSession?.status || CHAT_STATUS.BOT_ACTIVE;
  
  const { messages, loading, error, sendMessage: sendMsg } = useMessages({
    roomType,
    roomId,
    autoSubscribe: true,
    limit: 100
  });

  const quickReplies = QUICK_REPLIES[language] || QUICK_REPLIES.pt;

  // Processar formulário de autenticação
  const handleAuthSubmit = async (formData) => {
    try {
      // Gera ID temporário para guest
      const tempId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setGuestUserId(tempId);
      
      // Armazena dados no metadata da sessão
      if (chatSession?.id) {
        await updateMetadata({
          guestName: formData.name,
          guestEmail: formData.email,
          guestWhatsapp: formData.whatsapp
        });
      }
      
      setShowAuthModal(false);
    } catch (err) {
      console.error('Erro ao processar autenticação:', err);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Monitor inactivity and reset chat after 30 minutes
  useEffect(() => {
    if (!chatSession?.last_activity_at) return;
    const CHAT_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

    const checkInactivity = () => {
      const lastActivity = new Date(chatSession.last_activity_at).getTime();
      const now = Date.now();
      const inactiveFor = now - lastActivity;
      
      // Se inativo por mais de 30min e ainda não foi marcado como inativo
      if (inactiveFor > CHAT_TIMEOUT_MS && chatStatus !== CHAT_STATUS.INACTIVE) {
        updateStatus(CHAT_STATUS.INACTIVE);
        setShowQuickReplies(true);
        // Envia mensagem de timeout
        if (isReady) {
          const timeoutMsg = getTimeoutMessage(language);
          sendBotMessage(timeoutMsg);
        }
      }
    };

    // Verifica a cada 30 segundos
    inactivityTimerRef.current = setInterval(checkInactivity, 30000);

    return () => {
      if (inactivityTimerRef.current) {
        clearInterval(inactivityTimerRef.current);
      }
    };
  }, [chatSession?.last_activity_at, chatStatus, isReady, language, updateStatus]);

  // Envia mensagem de boas-vindas ao abrir pela primeira vez
  useEffect(() => {
    if (isReady && messages.length === 0 && !loading && chatStatus === CHAT_STATUS.BOT_ACTIVE) {
      const welcomeMsg = getWelcomeMessage(language);
      setTimeout(() => sendBotMessage(welcomeMsg), 500);
    }
  }, [isReady, messages.length, loading, chatStatus, language]);

  // Show welcome message if no messages
  const shouldShowWelcome = false; // Desabilitado pois enviamos via bot

  // Envia mensagem do bot
  async function sendBotMessage(content) {
    if (!isReady) return;
    try {
      await sendMsg(content, { customUserId: BOT_USER_ID });
    } catch (err) {
      // Erro ao enviar mensagem do bot
    }
  }

  // Processa resposta automática do bot
  async function processBotResponse(userMessage) {
    // Primeiro mostra o typing indicator
    setIsTyping(true);
    
    // Simula tempo de "digitação" ANTES de enviar
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));
    
    // Analisa e prepara a resposta
    const response = analyzeMessageAndRespond(userMessage, language);
    
    // Esconde typing e envia a mensagem
    setIsTyping(false);
    
    // Aguarda um pouco antes de enviar (parece mais natural)
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Se usuário pediu atendimento humano
    if (response.type === 'human_request') {
      await updateStatus(CHAT_STATUS.HUMAN_REQUESTED);
      await sendBotMessage(response.response);
      // TODO: Notificar admins via Supabase realtime ou criar notificação
    } else {
      await sendBotMessage(response.response);
    }
  }

  async function sendMessage(content = null) {
    if (!isReady) return;
    const text = content || input.trim();
    if (!text) return;
    
    setInput('');
    setShowQuickReplies(false);
    
    try {
      // Atualiza atividade
      await updateActivity();
      
      // Envia mensagem do usuário
      await sendMsg(text);
      
      // Se chat ainda está em modo bot, processa resposta automática
      if (chatStatus === CHAT_STATUS.BOT_ACTIVE || chatStatus === CHAT_STATUS.INACTIVE) {
        // Reativa chat se estava inativo
        if (chatStatus === CHAT_STATUS.INACTIVE) {
          await updateStatus(CHAT_STATUS.BOT_ACTIVE);
        }
        await processBotResponse(text);
      }
      // Se já solicitou humano ou está em atendimento humano, não responde automaticamente
      
    } catch (err) {
      // Erro ao enviar mensagem
    }
  }

  async function handleQuickReply(reply) {
    // Envia mensagem do usuário
    await sendMessage(reply.text);
    
    // Processa resposta do bot
    await processBotResponse(reply.text);
  }

  // Formatar mensagem do bot (remove ** e adiciona formatação HTML)
  function formatBotMessage(content) {
    return content
      .split('\n')
      .map((line, idx) => {
        // Títulos com emoji
        if (line.match(/^[\u{1F300}-\u{1F9FF}]/u) && line.includes(':')) {
          return (
            <div key={idx} className="font-bold text-verde-vr mb-2">
              {line.replace(/\*\*/g, '')}
            </div>
          );
        }
        // Lista com bullet
        if (line.trim().startsWith('•')) {
          const text = line.replace(/•/g, '').replace(/\*\*/g, '').trim();
          const [title, ...desc] = text.split(' - ');
          return (
            <div key={idx} className="flex gap-2 mb-1.5">
              <span className="text-verde-vr">•</span>
              <span>
                <span className="font-semibold text-white">{title}</span>
                {desc.length > 0 && <span className="text-white/80"> - {desc.join(' - ')}</span>}
              </span>
            </div>
          );
        }
        // Subtítulos (texto seguido de :)
        if (line.trim().endsWith(':') && !line.startsWith('•')) {
          return (
            <div key={idx} className="font-semibold text-white mt-3 mb-1">
              {line.replace(/\*\*/g, '')}
            </div>
          );
        }
        // Texto normal
        const formatted = line.replace(/\*\*/g, '');
        return formatted ? (
          <div key={idx} className="text-white/90 leading-relaxed">
            {formatted}
          </div>
        ) : (
          <div key={idx} className="h-2" />
        );
      });
  }

  return (
    <div className="fixed bottom-6 right-6 w-[420px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-3rem)] flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl overflow-hidden" style={{ zIndex: 9999 }}>
      {/* Header with gradient */}
      <div className="relative bg-gradient-to-r from-verde-vr via-green-500 to-verde-vr p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              {chatStatus === CHAT_STATUS.HUMAN_ACTIVE || chatStatus === CHAT_STATUS.HUMAN_REQUESTED ? (
                <User className="w-5 h-5 text-verde-vr" />
              ) : (
                <Sparkles className="w-5 h-5 text-verde-vr" />
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h3 className="font-bold text-white">
              {chatStatus === CHAT_STATUS.HUMAN_ACTIVE ? 'Atendimento Humano' : 
               chatStatus === CHAT_STATUS.HUMAN_REQUESTED ? 'Conectando...' :
               'VRZ Assistant'}
            </h3>
            <p className="text-xs text-white/80">
              {chatStatus === CHAT_STATUS.HUMAN_REQUESTED ? 'Aguardando atendente' :
               chatStatus === CHAT_STATUS.INACTIVE ? 'Chat encerrado (inativo)' :
               'Online • Responde rápido'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onClose}
            aria-label="Minimizar chat"
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <Minimize2 className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={onClose}
            aria-label="Fechar chat"
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/50">
        {loading && (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-2 border-verde-vr border-t-transparent"></div>
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-300">
            ❌ Erro: {error}
          </div>
        )}

        {/* Welcome message */}
        {shouldShowWelcome && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-verde-vr to-green-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <div className="bg-gradient-to-br from-verde-vr/20 to-green-500/10 border border-verde-vr/30 rounded-2xl rounded-tl-none p-4 shadow-lg">
                <p className="text-sm text-white whitespace-pre-line leading-relaxed">{welcomeMsg}</p>
              </div>
              <p className="text-xs text-white/40 mt-1 ml-1">Agora mesmo</p>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((m, idx) => {
          // Identificação robusta do bot
          const isBot = m.sender_type === 'bot' || 
                       m.sender_id === BOT_USER_ID ||
                       (m.user_id === null && m.content?.includes('VRZ Assistant')) ||
                       (!m.user_id && m.content?.includes('assistente da VRZ'));
          
          const isMe = !isBot && m.user_id === userId;
          const time = new Date(m.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

          return (
            <div key={m.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''} animate-fade-in`}>
              {!isMe && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-verde-vr to-green-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`flex-1 max-w-[80%] ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                <div className={`
                  rounded-2xl p-4 shadow-lg
                  ${isMe 
                    ? 'bg-gradient-to-br from-verde-vr to-green-500 text-white rounded-tr-none' 
                    : 'bg-slate-800/80 border border-white/10 text-white rounded-tl-none'
                  }
                `}>
                  {isBot ? (
                    <div className="text-sm space-y-1">{formatBotMessage(m.content)}</div>
                  ) : (
                    <p className="text-sm whitespace-pre-line leading-relaxed">{m.content}</p>
                  )}
                </div>
                <p className={`text-xs text-white/40 mt-1 ${isMe ? 'mr-1' : 'ml-1'}`}>
                  {isBot ? '🤖 Bot' : time}
                </p>
              </div>
              {isMe && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-vr to-purple-500 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  {userId ? userId.slice(0, 2).toUpperCase() : 'U'}
                </div>
              )}
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-verde-vr to-green-500 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-slate-800/80 border border-white/10 rounded-2xl rounded-tl-none p-4 shadow-lg">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-verde-vr rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-verde-vr rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-verde-vr rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}

        {!isReady && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 text-sm text-yellow-300 text-center">
            🔄 Reconectando...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick replies - Menu retrátil */}
      {(chatStatus === CHAT_STATUS.BOT_ACTIVE || chatStatus === CHAT_STATUS.INACTIVE) && (
        <div className="bg-slate-900/50 border-t border-white/5">
          {/* Botão para expandir/recolher */}
          <button
            onClick={() => setQuickRepliesExpanded(!quickRepliesExpanded)}
            className="w-full px-4 py-2 flex items-center justify-between text-xs text-white/60 hover:text-verde-vr transition group"
          >
            <span className="font-semibold">
              {language === 'pt' ? 'Perguntas frequentes' : 'Frequent questions'}
            </span>
            <div className={`transform transition-transform duration-300 ${!quickRepliesExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>

          {/* Menu de botões com animação */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
            quickRepliesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4 pb-3 grid grid-cols-2 gap-2">
              {quickReplies.map((reply) => (
                <button
                  key={reply.id}
                  onClick={() => {
                    handleQuickReply(reply);
                    setQuickRepliesExpanded(false);
                  }}
                  disabled={!isReady}
                  className="text-xs px-3 py-2.5 rounded-lg bg-slate-800/70 hover:bg-verde-vr/20 border border-white/10 hover:border-verde-vr/50 text-white/90 hover:text-verde-vr transition disabled:opacity-50 text-left font-medium"
                >
                  {reply.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Mensagem de aguardando atendente */}
      {chatStatus === CHAT_STATUS.HUMAN_REQUESTED && (
        <div className="px-4 pb-3 bg-slate-900/50">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
            <p className="text-sm text-yellow-300">
              {language === 'pt' 
                ? '⏳ Sua solicitação foi enviada. Um atendente entrará em contato em breve.' 
                : '⏳ Your request has been sent. An agent will contact you shortly.'}
            </p>
          </div>
        </div>
      )}

      {/* Input area */}
      <div className="p-4 bg-slate-900/80 border-t border-white/10">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            className="flex-1 bg-slate-800/70 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-verde-vr/50 focus:ring-2 focus:ring-verde-vr/20 transition disabled:opacity-50"
            disabled={!isReady}
            placeholder={language === 'pt' ? 'Digite sua mensagem...' : 'Type your message...'}
          />
          <button 
            onClick={() => sendMessage()} 
            disabled={!isReady || !input.trim()}
            className="w-12 h-12 bg-gradient-to-br from-verde-vr to-green-500 hover:from-green-500 hover:to-verde-vr rounded-xl flex items-center justify-center transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-verde-vr/50"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
