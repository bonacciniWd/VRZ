import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/supabase.js';
import { useAuth } from '../app/AuthContext.jsx';
import { mapProposalStatus, mapObjectFromDB } from '../utils/enumMapping.js';
import { centsToCurrency } from '../utils/currency.js';

// Hook para carregar e acompanhar uma única proposta por id
export function useProposal(id) {
  const { session } = useAuth();
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProposal = useCallback(async () => {
    if (!session || !id) return;
    setLoading(true); setError(null);
    const { data, error: err } = await supabase
      .from('proposals')
      .select('*')
      .eq('id', id)
      .single();
    if (err) setError(err.message);
    
    if (data) {
      const mapped = {
        ...mapObjectFromDB(data, { status: mapProposalStatus }),
        amount: centsToCurrency(data.amount_cents),
      };
      setProposal(mapped);
    } else {
      setProposal(null);
    }
    setLoading(false);
  }, [session, id]);

  useEffect(() => { fetchProposal(); }, [fetchProposal]);

  useEffect(() => {
    if (!id) return;
    const channel = supabase.channel(`proposal-${id}`);
    channel.on('postgres_changes', { event: '*', schema: 'public', table: 'proposals', filter: `id=eq.${id}` }, payload => {
      if (payload.eventType === 'UPDATE') {
        const mapped = {
          ...mapObjectFromDB(payload.new, { status: mapProposalStatus }),
          amount: centsToCurrency(payload.new.amount_cents),
        };
        setProposal(mapped);
      } else if (payload.eventType === 'DELETE') {
        setProposal(null);
      } else if (payload.eventType === 'INSERT' && payload.new.id === id) {
        const mapped = {
          ...mapObjectFromDB(payload.new, { status: mapProposalStatus }),
          amount: centsToCurrency(payload.new.amount_cents),
        };
        setProposal(mapped);
      }
    });
    channel.subscribe();
    return () => channel.unsubscribe();
  }, [id]);

  return { proposal, loading, error, refresh: fetchProposal };
}
