import React, { useEffect, useMemo, useRef, useState } from 'react';
import DashboardLayout from '../../components/dashboard/Layout.jsx';
import { useAuth } from '../../app/AuthContext.jsx';
import { supabase } from '../../lib/supabase.js';
import Button from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { QUICK_REPLIES } from '../../utils/quickReplies.js';

const AdminChats = () => {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [since, setSince] = useState(''); // ISO date filter optional
  const [selectedRoom, setSelectedRoom] = useState('');

  // For admin, we need a special fetch that gets ALL global messages regardless of room_id
  const [allMessages, setAllMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const channelRef = useRef(null);

  // Fetch all global messages
  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('messages')
        .select('*')
        .eq('room_type', 'global')
        .order('created_at', { ascending: true })
        .limit(500);
      
      const { data, error: err } = await query;
      
      if (err) {
        console.error('Error fetching messages:', err);
        setError(err.message);
      } else {
        setAllMessages(data || []);
        // Set initial selected room if not set
        if (!selectedRoom && data && data.length > 0) {
          const firstRoom = data.find(m => !!m.room_id)?.room_id || '';
          setSelectedRoom(firstRoom);
        }
      }
    } catch (e) {
      console.error('Exception fetching messages:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter messages based on search and date
  const filteredMessages = useMemo(() => {
    let filtered = allMessages;
    
    if (since) {
      const sinceDate = new Date(since);
      filtered = filtered.filter(m => new Date(m.created_at) >= sinceDate);
    }
    
    if (search) {
      filtered = filtered.filter(m => m.content?.toLowerCase().includes(search.toLowerCase()));
    }
    
    return filtered;
  }, [allMessages, since, search]);

  // Initial fetch and refetch when since changes
  useEffect(() => {
    fetchMessages();
  }, [since]);

  // Realtime subscription for all global messages
  useEffect(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase.channel('admin-global-messages');
    
    channel.on(
      'postgres_changes',
      { 
        event: '*', 
        schema: 'public', 
        table: 'messages',
        filter: 'room_type=eq.global'
      },
      (payload) => {
        if (payload.eventType === 'INSERT') {
          // Avoid duplicates from optimistic updates
          if (payload.new.user_id === userId) {
            setAllMessages(prev => {
              const exists = prev.some(m => m.id === payload.new.id);
              return exists ? prev : [...prev, payload.new];
            });
          } else {
            setAllMessages(prev => {
              const exists = prev.some(m => m.id === payload.new.id);
              return exists ? prev : [...prev, payload.new];
            });
          }
        } else if (payload.eventType === 'UPDATE') {
          setAllMessages(prev => prev.map(m => m.id === payload.new.id ? payload.new : m));
        } else if (payload.eventType === 'DELETE') {
          setAllMessages(prev => prev.filter(m => m.id !== payload.old.id));
        }
      }
    );

    channel.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Admin subscribed to global messages');
      }
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [userId]);

  async function sendMessage(text) {
    const content = (text ?? input).trim();
    if (!content || !selectedRoom) return;
    
    setInput('');
    
    const optimistic = {
      id: `temp-${Date.now()}-${Math.random()}`,
      user_id: userId,
      room_type: 'global',
      room_id: selectedRoom,
      content,
      created_at: new Date().toISOString()
    };
    
    setAllMessages(prev => [...prev, optimistic]);
    
    try {
      const { data, error: err } = await supabase
        .from('messages')
        .insert({
          user_id: userId,
          room_type: 'global',
          room_id: selectedRoom,
          content
        })
        .select()
        .single();
      
      if (err) {
        console.error('Error sending message:', err);
        // Remove optimistic message
        setAllMessages(prev => prev.filter(m => m.id !== optimistic.id));
      } else {
        // Replace optimistic with real message
        setAllMessages(prev => prev.map(m => m.id === optimistic.id ? data : m));
      }
    } catch (err) {
      console.error('Failed to send message:', err);
      setAllMessages(prev => prev.filter(m => m.id !== optimistic.id));
    }
  }

  const rooms = useMemo(() => {
    const map = new Map();
    for (const m of filteredMessages) {
      if (!m.room_id) continue;
      const prev = map.get(m.room_id) || { room_id: m.room_id, lastAt: '', lastMsg: '' };
      if (!prev.lastAt || new Date(m.created_at) > new Date(prev.lastAt)) {
        prev.lastAt = m.created_at;
        prev.lastMsg = m.content || '';
      }
      map.set(m.room_id, prev);
    }
    return Array.from(map.values()).sort((a,b) => new Date(b.lastAt) - new Date(a.lastAt));
  }, [filteredMessages]);

  const filteredByRoom = useMemo(() => {
    return selectedRoom ? filteredMessages.filter(m => m.room_id === selectedRoom) : [];
  }, [filteredMessages, selectedRoom]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Admin - Chats</h1>
        <div className="flex gap-2 items-center">
          <input type="date" className="bg-slate-800 border border-white/20 rounded px-2 py-1 text-xs" value={since} onChange={(e)=>setSince(e.target.value ? new Date(e.target.value).toISOString() : '')} />
          <Input value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Buscar mensagem" />
          <Button variant="outline" onClick={fetchMessages} className="text-xs h-auto px-3 py-2">Atualizar</Button>
        </div>
      </div>
      {error && <p className="text-sm text-red-400">Erro: {error}</p>}
      {loading && <p className="text-sm opacity-70">Carregando...</p>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="border border-white/10 rounded-lg p-4 bg-slate-900/60">
          <h2 className="text-sm font-semibold mb-3">Conversas</h2>
          <ul className="space-y-2 max-h-[520px] overflow-y-auto pr-1">
            {rooms.map(r => (
              <li key={r.room_id}>
                <button onClick={()=>setSelectedRoom(r.room_id)} className={`w-full text-left text-xs px-3 py-2 rounded border ${selectedRoom===r.room_id?'border-verde-vr bg-slate-800/80':'border-white/10 bg-slate-800/40'} hover:border-verde-vr`}>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium">{r.room_id.slice(0,8)}</span>
                    <span className="opacity-50">{new Date(r.lastAt).toLocaleString()}</span>
                  </div>
                  <div className="opacity-80 mt-1 line-clamp-1">{r.lastMsg}</div>
                </button>
              </li>
            ))}
            {rooms.length===0 && <li className="text-xs opacity-60">Sem conversas.</li>}
          </ul>
        </div>
        <div className="lg:col-span-2 border border-white/10 rounded-lg p-4 bg-slate-900/60">
          <div className="h-[480px] overflow-y-auto space-y-2 pr-1">
            {filteredByRoom.map((m) => (
              <div key={m.id} className={`text-sm ${m.user_id === userId ? 'text-verde-vr' : 'text-white'}`}>
                <span className="opacity-70">[{new Date(m.created_at).toLocaleString()}]</span> {m.content}
              </div>
            ))}
            {filteredByRoom.length === 0 && !loading && <div className="text-sm opacity-60">Nenhuma mensagem nesta conversa.</div>}
          </div>
          <div className="mt-3 flex gap-2">
            <Input value={input} onChange={(e)=>setInput(e.target.value)} onKeyDown={(e)=>{ if (e.key==='Enter') sendMessage(); }} placeholder="Responder..." />
            <Button onClick={()=>sendMessage()} className="px-4">Enviar</Button>
          </div>
        </div>
        <div className="border border-white/10 rounded-lg p-4 bg-slate-900/60">
          <h2 className="text-sm font-semibold mb-3">Respostas Rápidas</h2>
          <div className="flex flex-wrap gap-2">
            {QUICK_REPLIES.map((qr) => (
              <Button key={qr.label} variant="outline" className="text-xs h-auto px-3 py-1" onClick={()=>sendMessage(qr.text)}>{qr.label}</Button>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminChats;
