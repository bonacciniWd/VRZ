import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../app/AuthContext.jsx';

// Hook agrega contagens para painel. RLS deve já filtrar conforme papel.
// Para usuário normal: counts pessoais (propostas user_id, payments user_id, tickets user_id, messages user_id?)
// Para admin: totals gerais.
export function useDashboardStats({ scope = 'auto' } = {}) {
  const { session, profile } = useAuth();
  const [stats, setStats] = useState({ proposals: 0, payments: 0, tickets: 0, messagesToday: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isAdmin = profile?.role === 'admin';
  const effectiveScope = scope === 'auto' ? (isAdmin ? 'global' : 'personal') : scope;

  const countHead = async (table, filters = []) => {
    let query = supabase.from(table).select('id', { count: 'exact', head: true });
    filters.forEach(f => { query = query[f.method](...f.args); });
    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  };

  const fetchStats = useCallback(async () => {
    if (!session) return;
    setLoading(true); setError(null);
    try {
      const filtersProposals = effectiveScope === 'personal' ? [{ method: 'eq', args: ['user_id', session.user.id] }] : [];
      const filtersPayments = effectiveScope === 'personal' ? [{ method: 'eq', args: ['user_id', session.user.id] }] : [];
      const filtersTickets = effectiveScope === 'personal' ? [{ method: 'eq', args: ['user_id', session.user.id] }] : [];
      const today = new Date();
      today.setHours(0,0,0,0);
      const isoStart = today.toISOString();
      // Mensagens do dia: para admin (global), contar apenas mensagens de visitantes (não-admins)
      // Estratégia: buscar IDs de admins e subtrair contagem de mensagens deles
      // Conta apenas mensagens de visitantes: total - mensagens de admins, considerando room_type='global'
      const adminsRes = isAdmin
        ? await supabase.from('profiles').select('id').eq('role', 'admin')
        : { data: [] };
      const adminIds = (adminsRes.data || []).map(a => a.id);

      const totalQ = supabase
        .from('messages')
        .select('id', { count: 'exact', head: true })
        .eq('room_type', 'global')
        .gte('created_at', isoStart);

      const adminQ = adminIds.length > 0
        ? supabase
            .from('messages')
            .select('id', { count: 'exact', head: true })
            .eq('room_type', 'global')
            .gte('created_at', isoStart)
            .in('user_id', adminIds)
        : Promise.resolve({ count: 0 });

      const [proposalsC, paymentsC, ticketsC, totalRes, adminRes] = await Promise.all([
        countHead('proposals', filtersProposals),
        countHead('payments', filtersPayments).catch(() => 0), // tabela pode ainda não existir
        countHead('tickets', filtersTickets).catch(() => 0),
        totalQ,
        adminQ
      ]);
      const visitorMessages = Math.max(0, (totalRes.count || 0) - (adminRes.count || 0));
      setStats({ proposals: proposalsC, payments: paymentsC, tickets: ticketsC, messagesToday: visitorMessages });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [session, effectiveScope]);

  useEffect(() => { fetchStats(); }, [fetchStats]);

  useEffect(() => {
    if (!session) return;
    // Realtime atualização simples: qualquer mudança refaz contagens (debounce simplificado)
    const channel = supabase.channel('dashboard-stats');
    const tables = ['proposals','payments','tickets','messages'];
    tables.forEach(t => {
      channel.on('postgres_changes', { event: '*', schema: 'public', table: t }, () => {
        // refetch leve
        fetchStats();
      });
    });
    channel.subscribe();
    return () => { channel.unsubscribe(); };
  }, [session, fetchStats]);

  return { stats, loading, error, refresh: fetchStats, scope: effectiveScope };
}
