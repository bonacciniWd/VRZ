import React, { useEffect, useState, useMemo } from 'react';
import ChatWindow from './ChatWindow.jsx';
import { logo } from '../assets';
import { useAuth } from '../app/AuthContext.jsx';
import { MessageCircle, X } from 'lucide-react';

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
          className='bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-verde-vr via-green-500 to-verde-vr hover:from-green-500 hover:via-verde-vr hover:to-green-500 flex items-center justify-center shadow-2xl hover:shadow-verde-vr/50 transition-all duration-300 hover:scale-110 z-50 group'
        >
          {/* Pulse ring animation */}
          <div className="absolute inset-0 rounded-full bg-verde-vr animate-ping opacity-20"></div>
          
          {/* Icon */}
          <MessageCircle className="w-8 h-8 text-white relative z-10" />
          
          {/* Notification badge */}
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <span className="text-[10px] text-white font-bold">!</span>
            </div>
          )}
          
          {/* Tooltip */}
          <div className="absolute right-full mr-3 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-white/10">
            💬 Precisa de ajuda?
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full border-8 border-transparent border-l-slate-900"></div>
          </div>
        </button>
      )}
    </div>
  );
});

export default ChatFloating;
