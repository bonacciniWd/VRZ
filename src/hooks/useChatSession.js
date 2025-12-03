import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../app/AuthContext.jsx';
import { CHAT_STATUS, CHAT_TIMEOUT_MS } from '../utils/chatBot.js';

/**
 * Hook para gerenciar sessões de chat
 * Rastreia status (bot/humano), timeout de inatividade e metadata
 */
export function useChatSession(roomId) {
  const { session } = useAuth();
  const userId = session?.user?.id;
  const [chatSession, setChatSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Busca ou cria sessão de chat
  const getOrCreateSession = useCallback(async () => {
    if (!roomId) return;
    
    setLoading(true);
    setError(null);

    try {
      // Tenta buscar sessão existente
      const { data: existing, error: fetchError } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('room_id', roomId)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = not found
        throw fetchError;
      }

      if (existing) {
        // Verifica se está inativa (>30min)
        const lastActivity = new Date(existing.last_activity_at).getTime();
        const isInactive = (Date.now() - lastActivity) > CHAT_TIMEOUT_MS;

        if (isInactive && existing.status !== CHAT_STATUS.INACTIVE) {
          // Marca como inativa
          const { data: updated } = await supabase
            .from('chat_sessions')
            .update({ 
              status: CHAT_STATUS.INACTIVE,
              ended_at: new Date().toISOString()
            })
            .eq('id', existing.id)
            .select()
            .single();
          
          setChatSession(updated || existing);
        } else {
          setChatSession(existing);
        }
      } else {
        // Cria nova sessão
        const { data: newSession, error: createError } = await supabase
          .from('chat_sessions')
          .insert({
            room_id: roomId,
            user_id: userId || null,
            status: CHAT_STATUS.BOT_ACTIVE,
            last_activity_at: new Date().toISOString(),
            metadata: {}
          })
          .select()
          .single();

        if (createError) throw createError;
        setChatSession(newSession);
      }
    } catch (err) {
      console.error('Error getting/creating chat session:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [roomId, userId]);

  // Atualiza última atividade
  const updateActivity = useCallback(async () => {
    if (!chatSession?.id) return;

    try {
      const now = new Date().toISOString();
      const { data } = await supabase
        .from('chat_sessions')
        .update({ last_activity_at: now })
        .eq('id', chatSession.id)
        .select()
        .single();

      if (data) {
        setChatSession(prev => ({
          ...prev,
          last_activity_at: data.last_activity_at
        }));
      }
    } catch (err) {
      // Erro ao atualizar atividade
    }
  }, [chatSession?.id]);

  // Atualiza status do chat
  const updateStatus = useCallback(async (newStatus) => {
    if (!chatSession) return;

    try {
      const updates = { 
        status: newStatus,
        last_activity_at: new Date().toISOString()
      };

      // Se marcando como inativo, registra quando encerrou
      if (newStatus === CHAT_STATUS.INACTIVE && !chatSession.ended_at) {
        updates.ended_at = new Date().toISOString();
      }

      // Se reativando, limpa ended_at
      if (newStatus !== CHAT_STATUS.INACTIVE && chatSession.ended_at) {
        updates.ended_at = null;
      }

      const { data, error } = await supabase
        .from('chat_sessions')
        .update(updates)
        .eq('id', chatSession.id)
        .select()
        .single();

      if (error) throw error;
      setChatSession(data);
      return data;
    } catch (err) {
      console.error('Error updating status:', err);
      setError(err.message);
    }
  }, [chatSession]);

  // Atualiza metadata (nome, email, etc)
  const updateMetadata = useCallback(async (metadata) => {
    if (!chatSession) return;

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .update({ 
          metadata: { ...chatSession.metadata, ...metadata },
          last_activity_at: new Date().toISOString()
        })
        .eq('id', chatSession.id)
        .select()
        .single();

      if (error) throw error;
      setChatSession(data);
      return data;
    } catch (err) {
      console.error('Error updating metadata:', err);
      setError(err.message);
    }
  }, [chatSession]);

  // Atribui admin para atendimento humano
  const assignAdmin = useCallback(async (adminId) => {
    if (!chatSession) return;

    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .update({ 
          assigned_admin_id: adminId,
          status: CHAT_STATUS.HUMAN_ACTIVE,
          last_activity_at: new Date().toISOString()
        })
        .eq('id', chatSession.id)
        .select()
        .single();

      if (error) throw error;
      setChatSession(data);
      return data;
    } catch (err) {
      console.error('Error assigning admin:', err);
      setError(err.message);
    }
  }, [chatSession]);

  // Carrega sessão ao montar
  useEffect(() => {
    getOrCreateSession();
  }, [getOrCreateSession]);

  // Subscreve a mudanças em tempo real
  useEffect(() => {
    if (!chatSession) return;

    const channel = supabase
      .channel(`chat_session_${chatSession.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'chat_sessions',
          filter: `id=eq.${chatSession.id}`
        },
        (payload) => {
          console.log('Chat session updated:', payload.new);
          setChatSession(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [chatSession?.id]);

  return {
    chatSession,
    loading,
    error,
    updateActivity,
    updateStatus,
    updateMetadata,
    assignAdmin,
    refresh: getOrCreateSession
  };
}
