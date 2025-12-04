import React, { useEffect, useState, useMemo } from 'react';
import Lottie from 'lottie-react';
import ChatWindow from './ChatWindow.jsx';
import { logo } from '../assets';
import { useAuth } from '../app/AuthContext.jsx';
import { X } from 'lucide-react';
import chatAnimation from '/src/assets/chat.json';
import DevAnimation from '/src/assets/dev.json';

// Isola estado do chat para evitar re-render do resto da aplicação ao abrir/fechar
const ChatFloating = React.memo(() => {
  const { session } = useAuth();
  const [open, setOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  
  // Generate unique room_id per visitor (for admin to identify conversations)
  const roomId = useMemo(() => {
    const persistedRoom = localStorage.getItem('vrz_chat_room');
    if (persistedRoom) {
      return persistedRoom;
    }
    const id = (crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem('vrz_chat_room', id);
    return id;
  }, []);

  useEffect(() => {
    const persistedOpen = localStorage.getItem('vrz_chat_open');
    setOpen(persistedOpen === '1');
  }, []);

  const toggleOpen = (next) => {
    const val = typeof next === 'boolean' ? next : !open;
    setOpen(val);
    localStorage.setItem('vrz_chat_open', val ? '1' : '0');
    if (val) {
      setHasNewMessage(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {/* Keep ChatWindow mounted, just hide it */}
      <div style={{ display: open ? 'block' : 'none', pointerEvents: 'auto' }}>
        <ChatWindow userId={session?.user?.id} roomType='global' roomId={roomId} onClose={() => toggleOpen(false)} />
      </div>
      
      {!open && (
        <button
          onClick={() => toggleOpen(true)}
          aria-label='Abrir chat'
          style={{ position: 'fixed', pointerEvents: 'auto' }}
          className='bottom-8 right-6 w-20 h-20 md:w-28 md:h-28 rounded-full bg-transparent hover:from-green-500 hover:via-verde-vr hover:to-green-500 flex items-center justify-center shadow-2xl hover:shadow-azul-vr/50 transition-all duration-300 hover:scale-110 z-50 group'
        >
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full bg-verde-vr animate-ping opacity-10 overflow-hidden"></div>
          
          {/* Lottie Animation */}
          <Lottie
            animationData={chatAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))', }}
          />
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">!</span>
            </div>
          )}
          
          {/* Tooltip */}
          <div className="absolute right-24 md:mr-3 bottom-0 -mr-2 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-white/10">
          
           <Lottie
            animationData={DevAnimation}
            loop={true}
            autoplay={true}
            className="w-full h-40 bg-[url('/src/assets/fundodev.jpg')] bg-cover animate-bounce rounded-lg"
          />
            <p className="py-2 px-4 underline">💬 Precisa de ajuda?</p>
            <div className="absolute right-0 top-3/4 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-verde-vr"></div>
          </div>
        </button>
      )}
    </div>
  );
});

export default ChatFloating;
