import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../app/AuthContext.jsx';

/*
Messages schema (real from Supabase):

CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  room_type enum NOT NULL,                -- Uses enum type
  room_id uuid,
  proposal_id uuid,                       -- NEW: Link to proposals
  ticket_id uuid,                         -- NEW: Link to tickets
  content text,
  attachments jsonb,                      -- NEW: Support file uploads
  metadata jsonb,                         -- NEW: Additional data
  created_at timestamptz DEFAULT now(),
  edited_at timestamptz,                  -- DB uses 'edited_at', not 'updated_at'
  
  FOREIGN KEY (user_id) REFERENCES profiles(id),
  FOREIGN KEY (proposal_id) REFERENCES proposals(id),
  FOREIGN KEY (ticket_id) REFERENCES tickets(id)
);

NEW FEATURES TO IMPLEMENT:
- Link messages to specific proposals or tickets
- Support file attachments (images, PDFs)
- Track message edits with edited_at timestamp
*/

export function useMessages({ 
  roomType = 'global', 
  roomId = null,
  proposalId = null,   // NEW: Filter by proposal
  ticketId = null,     // NEW: Filter by ticket
  autoSubscribe = true,
  limit = 100 
} = {}) {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const channelRef = useRef(null);

  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Build query for this specific room
      let query = supabase
        .from('messages')
        .select('*')
        .eq('room_type', roomType)
        .order('created_at', { ascending: true });

      // Apply room_id filter
      if (roomId) {
        query = query.eq('room_id', roomId);
      } else if (roomId === null) {
        query = query.is('room_id', null);
      }
      
      // Apply proposal_id filter
      if (proposalId) {
        query = query.eq('proposal_id', proposalId);
      }
      
      // Apply ticket_id filter
      if (ticketId) {
        query = query.eq('ticket_id', ticketId);
      }
      
      const result = await query.limit(limit);

      const { data, error: qError } = result;
      
      if (qError) {
        setError(qError.message);
        setMessages([]);
      } else {
        setMessages(data || []);
      }
    } catch (e) {
      setError(e.message);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [roomType, roomId, proposalId, ticketId, limit]);

  const sendMessage = useCallback(async (content, options = {}) => {
    const { customUserId = null, attachments = null, proposal_id = proposalId, ticket_id = ticketId } = options;
    
    if (!content?.trim()) throw new Error('Message content is required');

    // Se customUserId é uma string (bot), usa sender_id
    const isBot = customUserId && typeof customUserId === 'string' && !customUserId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

    const messageData = {
      room_type: roomType,
      room_id: roomId,
      content: content.trim(),
    };

    if (isBot) {
      // Mensagem de bot
      messageData.sender_type = 'bot';
      messageData.sender_id = customUserId;
      messageData.user_id = null;
    } else {
      // Mensagem de usuário
      const effectiveUserId = customUserId || userId;
      if (!effectiveUserId) throw new Error('User not authenticated');
      messageData.sender_type = 'user';
      messageData.user_id = effectiveUserId;
    }
    
    // Add optional fields
    if (proposal_id) messageData.proposal_id = proposal_id;
    if (ticket_id) messageData.ticket_id = ticket_id;
    if (attachments) messageData.attachments = attachments;

    try {
      const { data, error: sendError } = await supabase
        .from('messages')
        .insert(messageData)
        .select()
        .single();

      if (sendError) {
        throw sendError;
      }

      // NÃO adiciona ao estado local, deixa o realtime fazer isso
      // Isso evita duplicação
      return data;
    } catch (err) {
      console.error('❌ Failed to send message:', err);
      throw err;
    }
  }, [userId, roomType, roomId, proposalId, ticketId]);

  const updateMessage = useCallback(async (id, content, attachments = null) => {
    if (!content?.trim()) throw new Error('Message content is required');

    const updateData = { 
      content: content.trim(),
      edited_at: new Date().toISOString(), // Track edit timestamp
    };
    if (attachments !== null) updateData.attachments = attachments;

    const { data, error: uError } = await supabase
      .from('messages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (uError) throw uError;

    setMessages(prev => prev.map(m => m.id === id ? data : m));
    return data;
  }, []);

  const deleteMessage = useCallback(async (id) => {
    const { error: dError } = await supabase
      .from('messages')
      .delete()
      .eq('id', id);

    if (dError) throw dError;

    setMessages(prev => prev.filter(m => m.id !== id));
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!autoSubscribe) return;

    // Cleanup previous channel
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
      channelRef.current = null;
    }

    const channelName = `messages:${roomType}:${roomId || 'global'}`;
    const channel = supabase.channel(channelName);

    // Listen to ALL messages of this room_type, filter client-side
    // Server-side filter doesn't work well with UUID comparisons
    channel.on(
      'postgres_changes',
      { 
        event: '*', 
        schema: 'public', 
        table: 'messages',
        filter: `room_type=eq.${roomType}`
      },
      (payload) => {
        // Client-side filtering to match our fetch query
        const eventData = payload.new || payload.old;
        const eventRoomId = eventData?.room_id;
        const eventRoomType = eventData?.room_type;
        
        // Must match room_type
        if (eventRoomType !== roomType) return;
        
        // If we're filtering by roomId, only accept messages with matching roomId
        if (roomId && eventRoomId !== roomId) return;
        
        // If we're not filtering by roomId (roomId is null), only accept messages with null roomId
        if (!roomId && eventRoomId !== null) return;

        if (payload.eventType === 'INSERT') {
          setMessages(prev => {
            // Check if message already exists
            const exists = prev.some(m => m.id === payload.new.id);
            if (exists) return prev;
            
            return [...prev, payload.new];
          });
        } else if (payload.eventType === 'UPDATE') {
          setMessages(prev => prev.map(m => m.id === payload.new.id ? payload.new : m));
        } else if (payload.eventType === 'DELETE') {
          setMessages(prev => prev.filter(m => m.id !== payload.old.id));
        }
      }
    );

    channel.subscribe((status) => {
      if (status === 'CHANNEL_ERROR') {
        setError('Realtime connection error');
      }
    });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
  }, [autoSubscribe, roomType, roomId, userId]);

  // Initial fetch
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    error,
    fetchMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
  };
}

export default useMessages;
